# Release rollback runbook

## Trigger

Rollback for severe booking, authentication, payment, data-integrity, security, accessibility or availability regressions. Pause payment and campaign entry points when continued processing could increase harm.

## Procedure

1. Declare the incident, assign an incident lead and preserve correlation IDs and provider event IDs.
2. Stop promotion and background jobs that depend on the affected schema or behavior.
3. In Vercel, promote the last verified deployment; do not rebuild an old commit with new dependencies.
4. Roll back Firebase rules only to a reviewed version that does not broaden access.
5. Do not reverse a destructive data migration. Apply a tested forward repair or restore into an isolated project first.
6. Re-run smoke checks for locale pages, authentication, booking, payment webhooks, support and safety escalation.
7. Reconcile transactions received during the incident before reopening checkout.
8. Notify internal owners and customers according to the incident and privacy plans.
9. Record timeline, impact, recovery evidence and corrective actions.
