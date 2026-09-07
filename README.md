# ManaRythu Web

Customer storefront for [ManaRythu](https://github.com/thummasreddy/manarythu) — the farm-to-consumer marketplace for Telangana.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- TanStack Query
- Zustand (cart & location)
- i18n (English / Telugu)

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the [manarythu-api](../manarythu-api) and Postgres/Redis (see `../manarythu-infrastructure`).

3. Copy `.env.example` to `.env.local` and adjust if needed.

4. Run the dev server (port will auto-select if 3000 is busy):

```bash
npm run dev
```

5. Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Notes

- The app proxies `/api/v1/*` to `http://localhost:8081` via Next.js rewrites (see `next.config.mjs`).
- `MANARYTHU_API_URL` overrides the backend base URL.
- The first visit prompts for a 6-digit PIN code to set the delivery location.
