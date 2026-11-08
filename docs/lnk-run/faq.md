---
title: lnk.run FAQ and Troubleshooting
description: Answers about dashboard access, redirects, analytics, and backups.
---

## Who can manage links?

The dashboard requires an authorized site token. Public short links redirect visitors without dashboard sign-in. If sign-in fails, confirm you have the correct production or preview token.

## Why does a short link return 404?

Check the slug, whether the link was deleted or expired, and its destination and configured redirect rules. Changes to a slug can break previously shared URLs.

## Why are analytics missing?

Follow a known link, allow time for processing, and check the date range and filters. If charts still fail, an operator can check the Analytics Engine binding, dataset, account configuration, token permissions, and Worker logs.

## Are backups complete database backups?

No. Link snapshots are logical JSON exports. They exclude analytics, schema, deletion markers, migration history, and separately uploaded images. See [Backups and Maintenance](./backups-and-maintenance.md) before restoring data.

## What if link storage is not ready?

Check the migration status under **Import/Export > KV to D1 Migration** and review Worker logs. Do not rerun migration or import over production data without understanding the current state.
