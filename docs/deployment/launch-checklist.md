# Production launch checklist

No item is complete merely because this repository contains configuration. Record an owner, evidence link and completion time for every gate.

## Vercel and domain

- Connect the production GitHub repository to Vercel and require the Quality Gate workflow.
- Configure separate Preview and Production environments; never copy production secrets into Preview.
- Add the canonical domain and www redirect, then verify ownership, TLS, HSTS and both locale routes.
- Set every variable from .env.example in the correct Vercel environment.
- Run npm run check:production-env with the production variable set before promotion.

## Firebase

- Create separate development, staging and production projects.
- Copy .firebaserc.example to .firebaserc, replace the placeholder, and confirm firebase use.
- Enable only required Authentication providers; add the canonical and Vercel domains.
- Deploy and test Firestore and Storage rules with the Emulator Suite before production.
- Configure App Check, least-privilege service accounts, budget alerts, point-in-time recovery and scheduled exports.
- Verify custom claims for roles, permissions and organisation scope.

## Email and DNS

- Verify the sending domain with the selected email provider.
- Publish and validate SPF, DKIM and DMARC; begin DMARC in reporting mode before enforcement.
- Configure a monitored reply-to and bounce/complaint handling.
- Test Hindi and English transactional templates without real customer data.

## Payments

- Complete Razorpay business/KYC approval and use live keys only in Production.
- Register the exact HTTPS webhook URL and verify its signing secret.
- Restrict dashboard access with MFA and least privilege.
- Execute approved low-value live payment, failure, duplicate webhook, cancellation, refund, invoice, commission, payout and reconciliation tests.
- Confirm no client-controlled price, discount, tax, commission or status reaches settlement.

## Google Maps and external providers

- Use separate browser and server keys with API, referrer, IP and quota restrictions.
- Enable only required Maps APIs and configure billing alerts.
- Restrict Algolia admin keys to servers; issue search-only keys to clients.
- Configure Upstash TLS, least privilege, quotas and alerts.
- Validate MSG91, Resend, Firebase Messaging, GA4 and Sentry consent behavior.

## Monitoring and launch

- Configure Sentry releases and source maps without exposing auth tokens to the client.
- Create alerts for error rate, payment failures, webhook backlog, booking failures, latency and safety escalations.
- Confirm logs exclude OTPs, tokens, card data, identity numbers and precise location history.
- Run E2E, Firestore/Storage rules, accessibility and Lighthouse suites against staging.
- Meet the agreed Core Web Vitals and Lighthouse budgets before promotion.
- Complete backup restore and rollback rehearsals using the companion runbooks.
- Obtain product, engineering, operations, support, finance, privacy and security sign-off.
