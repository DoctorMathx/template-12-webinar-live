# Kola Live — Template 12

A premium FinStore template for **webinar hosts and live event organizers**. Dark cinematic hero, real-time countdowns, upcoming events & on-demand replays.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**.
Design: **Manrope** (display) + **Inter** (body). Deep plum ink + electric lavender accent.

## Pages
`/` Home (live-next-up + upcoming + season pass + replays) · `/events` Filterable event index (upcoming, replays, topics) · `/events/[slug]` Event detail with agenda, countdown, seats-left · `/about` · `/contact` · `/faq` · `/register` (registration checkout with team pricing) · `/thank-you`

## Customise
- **Brand & host** → `lib/site-config.ts`
- **Events, replays, season pass** → `mock/products.ts`
- **Testimonials** → `mock/testimonials.ts`
- **FAQs** → `mock/faqs.ts`
- **Design tokens** → `app/globals.css`

## Run
```bash
npm install && npm run dev
```
