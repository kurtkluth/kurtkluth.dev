---
sidebar_position: 5
title: Troubleshooting
description: Cross-project troubleshooting checklist for all kurtkluth.dev sites.
---

# Troubleshooting

The checklist below applies to every site in the family — kurtkluth.dev,
sqlclr.com, and the four kluthstudios.com games.

## A site won't load

1. **Check the URL** — all projects are HTTPS; the correct hosts are listed
   on the [projects page](/projects).
2. **Hard refresh** — `Ctrl+Shift+R` (`Cmd+Shift+R` on macOS) bypasses a
   stale cache.
3. **Try incognito/private mode** — if that fixes it, an extension (usually
   a content blocker) is interfering; allowlist the site.
4. **Try another network** — corporate firewalls and DNS filters sometimes
   block lesser-known domains.

## A game loads but misbehaves

See the game's own troubleshooting page — each covers focus, performance, and
saved-state issues:
[Lisa Climber](/docs/lisa-climber/troubleshooting) ·
[Lisetris](/docs/lisetris/troubleshooting) ·
[Skyroute](/docs/skyroute/troubleshooting) ·
[Spindrift](/docs/spindrift/troubleshooting)

## SQLCLR problems

CLR errors are their own world (strict security, permission sets, NULL
handling). Start at [SQLCLR Troubleshooting](/docs/sqlclr/troubleshooting).

## Something on this site is wrong

Broken link, stale screenshot, incorrect doc? File an issue on
[GitHub](https://github.com/kurtkluth/kurtkluth.dev) — the whole site lives
in that repository.
