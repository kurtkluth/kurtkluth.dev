---
title: Backups and Maintenance
description: Back up and recover lnk.run links and understand deployment checks.
---

## Back up links

The production Worker is configured to create a daily logical link snapshot at 00:00 UTC unless automatic backups are disabled. Check the private R2 bucket for a recent object and inspect Worker logs if one is missing. A schedule alone does not prove a backup succeeded.

For a manual snapshot, open **Import/Export**, select **Manual Backup**, start the backup, and confirm the new object in the private R2 bucket. Alternatively, download a JSON export from **Export Links**. Keep snapshots private: they contain destinations and password material.

These snapshots are logical link exports, not full database backups. They exclude analytics, schema, deletion markers, migration history, and separately uploaded images.

## Recover links

Preserve the current state and test recovery in the separate preview environment when possible. Download the chosen snapshot securely, then use **Import Links** to review and import it. Check the imported, skipped, and failed counts and test representative links. Import skips existing active slug conflicts and does not restore analytics or images.

For database-level recovery, assess [D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) and the implications for the KV cache before making changes.

## Deploy and verify

The repository requires Node.js 24 or newer and the pnpm version specified in its package file. Changes merged to the production branch trigger Cloudflare Workers Builds. The deployment command applies remote D1 migrations before publishing, so it changes production resources.

Confirm the actual build and active deployment, then check dashboard access, analytics, privacy, and representative redirects. A Worker rollback does not undo D1, KV, R2, or analytics changes. The [repository maintenance guide](https://github.com/KluthStudios/lnk.run/blob/main/LNK-RUN-GUIDE.md) contains the operational checklist.
