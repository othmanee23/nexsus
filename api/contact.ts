const allowedDivisions = new Set(['group', 'amaris', 'projects', 'technology', 'ventures']);
const maxBodyBytes = 12_000;
const windowMs = 60_000;
const maxRequestsPerWindow = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  division?: string;
  name?: string;
  organization?: string;
  email?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
};

const json = (res: any, status: number, body: unknown) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
};

const clean = (value: unknown, maxLength: number) =>
  String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const readBody = async (req: any) => {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > maxBodyBytes) {
      throw new Error('BODY_TOO_LARGE');
    }
    chunks.push(buffer);
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as ContactPayload;
};

const getClientIp = (req: any) =>
  clean(req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown', 80);

const rateLimit = (ip: string) => {
  const now = Date.now();
  const current = attempts.get(ip);

  if (!current || current.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  current.count += 1;
  return current.count <= maxRequestsPerWindow;
};

const originAllowed = (req: any) => {
  const configuredOrigin = process.env.APP_URL || 'https://nexsus.ma';
  const origin = req.headers.origin;
  const host = req.headers.host ? `https://${req.headers.host}` : '';

  if (!origin) return true;
  return origin === configuredOrigin || origin === host;
};

const verifyTurnstile = async (token: string, ip: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
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
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
};

const sendEmail = async (payload: Required<Pick<ContactPayload, 'division' | 'name' | 'email' | 'message'>> & { organization: string }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'contact@nexsus.ma';
  const from = process.env.CONTACT_FROM_EMAIL || 'NEXSUS <contact@nexsus.ma>';

  if (!apiKey) {
    console.info('Contact inquiry received without RESEND_API_KEY configured:', {
      division: payload.division,
      name: payload.name,
      email: payload.email,
    });
    return { id: 'logged-only' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
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
    console.error('Resend rejected contact email:', {
      status: response.status,
      body: responseBody.slice(0, 1000),
    });
    throw new Error(`RESEND_${response.status}`);
  }

  return responseBody ? JSON.parse(responseBody) : { id: 'accepted' };
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!originAllowed(req)) {
    return json(res, 403, { error: 'Origin not allowed' });
  }

  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return json(res, 429, { error: 'Too many requests. Please try again shortly.' });
  }

  try {
    const body = await readBody(req);

    if (clean(body.website, 120)) {
      return json(res, 200, { ok: true });
    }

    const division = clean(body.division, 32);
    const name = clean(body.name, 120);
    const organization = clean(body.organization, 160);
    const email = clean(body.email, 180).toLowerCase();
    const message = clean(body.message, 3000);

    if (!allowedDivisions.has(division)) {
      return json(res, 400, { error: 'Please select an area of interest.' });
    }

    if (name.length < 2) {
      return json(res, 400, { error: 'Please enter your name.' });
    }

    if (!isEmail(email)) {
      return json(res, 400, { error: 'Please enter a valid email address.' });
    }

    if (message.length < 2) {
      return json(res, 400, { error: 'Please enter a message.' });
    }

    const turnstileValid = await verifyTurnstile(clean(body.turnstileToken, 3000), ip);
    if (!turnstileValid) {
      return json(res, 400, { error: 'Spam verification failed. Please try again.' });
    }

    await sendEmail({ division, name, organization, email, message });
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return json(res, 500, { error: 'Unable to send your inquiry right now.' });
  }
}
