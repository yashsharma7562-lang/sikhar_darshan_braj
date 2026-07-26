# Backup and restore runbook

## Scope

Back up Firestore, Storage metadata and objects, authentication exports where legally permitted, provider configuration, and reconciliation reports. Never place backups or keys in this repository.

## Procedure

1. Use a dedicated least-privilege backup service account and an encrypted, access-logged bucket in a separate failure domain.
2. Enable Firestore point-in-time recovery and scheduled exports with documented retention.
3. Enable object versioning and lifecycle retention for required Storage paths.
4. Export configuration metadata without secrets; keep secrets in the approved secret manager.
5. Monitor job completion and alert on missed recovery-point objectives.
6. Quarterly, restore into an isolated non-production project, validate counts and referential integrity, and destroy the test environment under the retention policy.
7. Record recovery point, recovery time, operator, evidence and exceptions.

Customer deletion and retention obligations apply to backups. Legal/privacy owners must approve retention periods.
