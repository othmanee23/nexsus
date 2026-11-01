# NEXSUS Legal, Privacy and Transparency Audit

Audit date: 2026-11-01  
Production domain: https://nexsus.ma

This audit documents the behavior visible in the repository and current production delivery. It is an implementation record, not formal legal advice.

## Implementation status

- Public trust pages implemented at `/privacy`, `/terms`, and `/ai-transparency`.
- All three pages use unique metadata, self-canonicals, `index, follow`, visible and structured breadcrumbs, and are included in the XML and HTML sitemaps.
- Crawlable footer links are present for Privacy Policy, Terms of Use, AI Transparency, and Sitemap.
- Privacy notices linking to `/privacy` are present beside the submit action in the contact page form and contact modal.
- No cookie banner is present by design because the current site has no optional cookie-based analytics, marketing tracker, or application browser storage.
- Before adding Google Analytics, GTM, Meta Pixel, LinkedIn Insight Tag, marketing cookies, remarketing, personalization storage, or tracking embeds, the Privacy Policy and consent requirements must be reviewed.

## Data collected

| Source | Data | Purpose | Destination | Processor | Retention known? |
| --- | --- | --- | --- | --- | --- |
| Contact page form | Area of interest, name, email, message; organization is optional; hidden honeypot field | Respond to enquiries and route them to the relevant division | `POST /api/contact`, then the NEXSUS business mailbox | Cloudflare Workers; Resend | No exact mailbox or provider retention period is defined in code |
| Contact modal | Same fields as the contact page plus a short-lived Turnstile token | Respond to enquiries and prevent automated abuse | `POST /api/contact`; Turnstile Siteverify; NEXSUS business mailbox | Cloudflare; Resend | Turnstile token lifetime is provider-controlled; no exact mailbox retention period is defined in code |
| Contact API security check | Request IP from `CF-Connecting-IP` | Remote IP input for Turnstile verification | Cloudflare Turnstile Siteverify | Cloudflare | Not defined in application code |
| Cloudflare delivery and observability | Request and operational metadata; error/invocation/trace information | Host, secure, diagnose, and monitor the site | Cloudflare infrastructure and observability | Cloudflare | Account/provider configuration; not defined in repository |
| Cloudflare Web Analytics | Aggregate page views and browser performance/timing metrics | Understand site usage and real-user performance | Cloudflare Web Analytics / RUM endpoint | Cloudflare | Account/provider configuration; not defined in repository |

The deployed Cloudflare Worker validates and normalizes form fields, applies size limits, checks origin and spam controls, and sends the enquiry through Resend. It does not write submissions to a database, KV, D1, R2, or another application data store. The repository also retains a legacy Vercel-style `api/contact.ts` implementation with equivalent external services, but production Cloudflare routing uses `worker/index.ts`.

No newsletter, account registration, file upload, payment, CRM, or third-party embedded form was found.

## Tracking

| Service | Purpose | Cookies? | Essential? | Domain |
| --- | --- | --- | --- | --- |
| Cloudflare Web Analytics | Aggregate usage and Core Web Vitals/performance measurement | Cookieless according to Cloudflare documentation; no application cookie or storage call found | Optional analytics, implemented without cookies | `static.cloudflareinsights.com`, same-site `/cdn-cgi/rum` or Cloudflare RUM endpoints |
| Cloudflare Turnstile | Spam and abuse prevention on the modal contact form | No application cookie is set by NEXSUS; provider challenge behavior is controlled by Cloudflare | Security control used when the widget is displayed | `challenges.cloudflare.com` |
| Cloudflare CDN/Workers/security | Site delivery, routing, protection, and operational monitoring | No application cookie found | Strictly necessary infrastructure | `nexsus.ma`, Cloudflare infrastructure |

No Google Analytics, Google Tag Manager, Meta Pixel, LinkedIn Insight Tag, Hotjar, Microsoft Clarity, Vercel Analytics, advertising tracker, or custom behavioral analytics implementation was found.

## Browser storage

- `document.cookie`: no usage found.
- `localStorage`: no usage found.
- `sessionStorage`: no usage found.
- Application cookie/storage keys: none.
- A transitive `cookie` package exists in the lockfile, but no site code imports or uses it.

## Cookie / consent decision

No consent banner is implemented because the current site does not use optional cookie-based analytics, advertising, or preference storage. Cloudflare Web Analytics is cookieless, and Turnstile is a security measure presented with enquiry submission. The Privacy Policy documents both.

This decision must be reassessed before adding Google Analytics, advertising pixels, remarketing, personalization storage, embedded media that tracks visitors, or any other optional tracking technology. Optional trackers must not run before any consent required by applicable law.

## Third-party services

- **Cloudflare** — hosting, CDN, DNS/proxy delivery, security headers, Workers, Turnstile, Web Analytics, and operational observability. Receives request/technical data and, for Turnstile verification, the submitted token and IP input.
- **Resend** — transactional email delivery. Receives the submitted enquiry fields needed to deliver the message to NEXSUS.
- **Google Fonts** — externally hosted Instrument Serif stylesheet/font resources. Receives ordinary web-request metadata when the browser requests those resources.
- **rsms.me** — externally hosted Inter stylesheet/font resources. Receives ordinary web-request metadata when the browser requests those resources.

Instagram and editorial-source URLs are ordinary outbound links, not embedded processors. No map, video, payment, CRM, chatbot, or AI API embed was found.

## AI usage

- **User-facing website AI:** none found. There is no chatbot, automated recommendation system, AI-generated response flow, or AI API in the application.
- **Internal NEXSUS workflows:** the requested transparency position states that AI-enabled tools may assist selected research, drafting, creative, analytical, technical, or operational work with human responsibility. This is a business-policy statement supplied for this implementation, not behavior independently provable from runtime code.
- **Client services:** the Technology division may evaluate or implement AI where appropriate, but the site does not promise AI in every engagement.
- **Insights repository:** articles are stored as authored content objects. The repository does not preserve prompt, model, provenance, or review records sufficient to prove how each article was produced.

## Existing verified public information

- Legal name: `NEXSUS PROJECT SARL`
- Published address: `LOT ALWAHDA FATH AL KHIR N 60, Temara, Maroc`
- Email: `contact@nexsus.ma`
- Phones: `+212 708 019 109`, `+212 627 901 859`
- Country/jurisdictional context: Morocco
- Founded: 2025

## Missing information / business input required

- RC, ICE, tax identifiers, and any other registration numbers.
- Confirmation that the published address may be described as the formal registered office rather than simply the published business address.
- Named legal representative or DPO, if NEXSUS intends to publish one.
- Business/legal follow-up: determine whether the current contact-form processing requires a CNDP declaration/authorization and record the applicable reference if completed.
- Formal retention schedule for the NEXSUS mailbox, Resend records, Cloudflare logs, and enquiry follow-up records.
- Executed data-processing terms, subprocessors, data locations, and transfer safeguards for each provider.
- Internal approved-AI-tool, confidential-data, human-review, and recordkeeping rules.
- Counsel-approved governing-law, jurisdiction, liability, and intellectual-property wording if stronger contractual certainty is required.

## Primary evidence reviewed

- `src/components/ContactPage.tsx`
- `src/components/ContactModal.tsx`
- `worker/index.ts`
- `api/contact.ts`
- `cloudflare.config.ts`
- `src/config.ts`
- `index.html`
- `public/_headers`
- Repository-wide searches for analytics, cookies, storage, forms, embeds, and AI APIs
- Cloudflare documentation for Web Analytics data collection and Turnstile Siteverify
- Morocco CNDP Law 09-08 materials and rights guidance

These pages are operational website drafts and should be reviewed by qualified Moroccan legal counsel if NEXSUS requires formal legal/compliance assurance.
