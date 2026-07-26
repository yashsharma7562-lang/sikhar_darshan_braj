# Shikhar Darshan Braj

Production-oriented foundation for a trusted, accessible Braj pilgrimage planning platform.

## Local setup

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/hi`.

## Verification

```powershell
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

The full local gate is available as npm run check. Deployment configuration
and operational gates are documented in docs/deployment. Repository files do
not mean that Firebase, Vercel, DNS, payments or monitoring are connected.

## Architecture

- `src/app`: App Router entry points, locale layouts and route-level states.
- `src/components`: reusable UI, layout, forms, booking and accessibility components.
- `src/features`: bounded product features such as temples, stays, payments and support.
- `src/domain`: provider-independent entities, value objects, policies and services.
- `src/infrastructure`: Firebase, Razorpay, Redis, maps, search and messaging adapters.
- `src/config`: environment and application configuration.
- `src/i18n` and `messages`: locale routing and English/Hindi message catalogues.
- `src/lib`: validation, security, logging, errors and shared utilities.
- `src/tests`: shared test configuration.

## Delivery status

Phases 1–19 provide the application architecture, public and role-based
experiences, booking and payment boundaries, domain tests, security hardening,
CI, provider policy files and deployment runbooks. Real persistence and external
provider behavior remain fail-closed until their production credentials,
infrastructure and operational approvals are configured.

The platform does not sell VIP darshan, guaranteed temple entry or unauthorised priority access.
# sikhar_darshan_braj
