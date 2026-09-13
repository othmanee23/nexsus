# NEXSUS - Operating Company

Production React/Vite site for [nexsus.ma](https://nexsus.ma), prepared for Vercel hosting with a protected serverless contact form, SEO metadata, sitemap, robots file, and security headers.

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Vercel Setup

Add these environment variables in Vercel:

- `APP_URL=https://nexsus.ma`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL=contact@nexsus.ma`
- `CONTACT_FROM_EMAIL=NEXSUS <contact@nexsus.ma>`
- Optional spam protection: `TURNSTILE_SECRET_KEY` and `VITE_TURNSTILE_SITE_KEY`

Then connect the Git repository to Vercel, set the production domain to `nexsus.ma`, and configure DNS at your domain provider with Vercel's records.

## Production Checklist

- Verify `nexsus.ma` as a sending domain in Resend.
- Add Vercel environment variables from `.env.example`.
- Add `nexsus.ma` and `www.nexsus.ma` in Vercel Domains.
- Point DNS records from the domain provider to Vercel.
- Submit `https://nexsus.ma/sitemap.xml` in Google Search Console.
