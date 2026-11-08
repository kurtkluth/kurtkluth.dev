---
title: lnk.run Overview
description: A personal link shortener with redirect controls and analytics.
image: /img/lnk-run/social-card.png
---

lnk.run is Kurt Kluth's personal link shortener, built on [Sink](https://github.com/miantiao-me/Sink) and hosted on Cloudflare Workers. Short links redirect visitors to their destinations; the management dashboard is available to authorized users.

## What it does

- Create short links with custom slugs, tags, comments, and expiration dates.
- Add optional passwords, device or country redirects, UTM parameters, and social previews.
- Generate QR codes, inspect link analytics, and export access data.
- Import or export links and create logical backups.

The dashboard uses Cloudflare D1 as the authoritative link store and Workers KV as a read cache. Analytics are stored separately from link records.

## Start here

- [Quick Start](./quick-start.md) covers sign-in and your first link.
- [Links and Analytics](./links-and-analytics.md) explains management and reporting.
- [Backups and Maintenance](./backups-and-maintenance.md) covers recovery and deployment.
- [FAQ and Troubleshooting](./faq.md) addresses common questions.

Visit [lnk.run](https://lnk.run), the [portfolio page](/projects/lnk-run), or the [source repository](https://github.com/KluthStudios/lnk.run).
