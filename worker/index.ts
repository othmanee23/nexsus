const allowedDivisions = new Set(['group', 'amaris', 'projects', 'technology', 'ventures']);
const retiredInsightSlugs = new Set([
  'sustainable-brand-identity',
  'brand-storytelling-success',
]);
const maxBodyBytes = 12_000;

type ContactPayload = {
  division?: string;
  name?: string;
  organization?: string;
  email?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
};

type Env = {
  ASSETS: {fetch(request: Request): Promise<Response>};
  APP_URL: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
};

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

const json = (status: number, body: unknown, extraHeaders: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...securityHeaders,
      ...extraHeaders,
    },
  });

const clean = (value: unknown, maxLength: number) =>
  String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const originAllowed = (request: Request, configuredOrigin: string) => {
  const origin = request.headers.get('Origin');
  if (!origin) return true;

  const requestOrigin = new URL(request.url).origin;
  return origin === requestOrigin || origin === configuredOrigin;
};

const verifyTurnstile = async (token: string, ip: string, secret?: string) => {
  if (!secret) return true;
  if (!token) return false;

  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const result = (await response.json()) as {success?: boolean};
  return Boolean(result.success);
};

const sendEmail = async (
  env: Env,
  payload: Required<Pick<ContactPayload, 'division' | 'name' | 'email' | 'message'>> & {
    organization: string;
  },
) => {
  if (!env.RESEND_API_KEY) throw new Error('RESEND_NOT_CONFIGURED');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      reply_to: payload.email,
      subject: `NEXSUS inquiry - ${payload.division}`,
      text: [
        `Division: ${payload.division}`,
        `Name: ${payload.name}`,
        `Organization: ${payload.organization || 'Not provided'}`,
        `Email: ${payload.email}`,
        '',
        payload.message,
      ].join('\n'),
    }),
  });

  const responseBody = await response.text();
  if (!response.ok) {
    console.error('Resend rejected contact email', {
      status: response.status,
      body: responseBody.slice(0, 1000),
    });
    throw new Error(`RESEND_${response.status}`);
  }
};

const parseBody = async (request: Request) => {
  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > maxBodyBytes) throw new Error('BODY_TOO_LARGE');

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
    throw new Error('BODY_TOO_LARGE');
  }

  return JSON.parse(rawBody) as ContactPayload;
};

const handleContact = async (request: Request, env: Env) => {
  if (request.method !== 'POST') {
    return json(405, {error: 'Method not allowed'}, {Allow: 'POST'});
  }

  if (!originAllowed(request, env.APP_URL)) {
    return json(403, {error: 'Origin not allowed'});
  }

  try {
    const body = await parseBody(request);

    if (clean(body.website, 120)) return json(200, {ok: true});

    const division = clean(body.division, 32);
    const name = clean(body.name, 120);
    const organization = clean(body.organization, 160);
    const email = clean(body.email, 180).toLowerCase();
    const message = clean(body.message, 3000);

    if (!allowedDivisions.has(division)) {
      return json(400, {error: 'Please select an area of interest.'});
    }
    if (name.length < 2) return json(400, {error: 'Please enter your name.'});
    if (!isEmail(email)) return json(400, {error: 'Please enter a valid email address.'});
    if (message.length < 2) return json(400, {error: 'Please enter a message.'});

    const ip = clean(request.headers.get('CF-Connecting-IP') || 'unknown', 80);
    const turnstileValid = await verifyTurnstile(
      clean(body.turnstileToken, 3000),
      ip,
      env.TURNSTILE_SECRET_KEY,
    );
    if (!turnstileValid) {
      return json(400, {error: 'Spam verification failed. Please try again.'});
    }

    await sendEmail(env, {division, name, organization, email, message});
    return json(200, {ok: true});
  } catch (error) {
    if (error instanceof SyntaxError) return json(400, {error: 'Invalid request body.'});
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      return json(413, {error: 'Request body is too large.'});
    }

    console.error('Contact API error', error);
    return json(500, {error: 'Unable to send your inquiry right now.'});
  }
};

const legacyRedirect = (url: URL) => {
  const match = url.pathname.match(/^\/(?:fr\/|ar\/)?insight(?:\/(.+))?\/?$/);
  if (!match) return null;

  const slug = match[1];
  const destinationPath = slug && !retiredInsightSlugs.has(slug)
    ? `/insights/${slug}`
    : '/insights';
  const destination = new URL(destinationPath, url);
  destination.search = url.search;
  return Response.redirect(destination, 308);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === 'www.nexsus.ma') {
      url.hostname = 'nexsus.ma';
      return Response.redirect(url, 308);
    }

    if (url.pathname === '/api/contact') return handleContact(request, env);
    if (url.pathname.startsWith('/api/')) return json(404, {error: 'Not found'});

    const redirect = legacyRedirect(url);
    if (redirect) return redirect;

    return env.ASSETS.fetch(request);
  },
};
