---
title: Changelog
description: Release history and status for the SQLCLR documentation hub on kurtkluth.dev.
---

:::note

**Status: Active.** These docs are maintained, not archived. Pages are
revised as SQL Server versions ship and as the guidance sharpens; changes
land here with a date, newest first. A revision that would change what you
deploy always gets an entry, never a silent edit.

:::

## 2026-07-18: SQLCLR documentation hub launched

The SQLCLR documentation hub goes live on kurtkluth.dev. The companion site
at [sqlclr.com](https://sqlclr.com) carries the practice. That is the 25-year
story, the engagement areas, the consulting side. This hub carries the
reference: how CLR integration works, and how to run it like you mean it.

Shipped in this release:

- [Overview](./overview.md) explains what SQLCLR is, and when in-engine code
  earns its place.
- [Quick Start](./quick-start.md) gets a working C# function inside SQL
  Server in five steps, strict security on.
- [Installation](./installation.md) covers requirements, platforms, and the
  modern trust model.
- [Configuration](./configuration.md) covers permission sets, instance
  options, trusted assemblies, signing.
- [Core Concepts](./core-concepts.md) explains the hosted runtime (app
  domains, memory, threading, SqlTypes).
- [Examples](./examples.md) walks a regex scalar function, a streaming TVF,
  and a median aggregate, complete with C# and T-SQL.
- [Security](./security.md) treats strict security in depth, with both
  signing routes, allowlisting, and auditing.
- [Deployment](./deployment.md) covers repeatable scripts, embedded
  binaries, CI/CD, engine upgrades, Linux and containers.
- [Troubleshooting](./troubleshooting.md) lists the real errors, with
  causes and fixes.
- [FAQ](./faq.md) answers deprecation rumors, Azure, performance, debugging.

Every example targets SQL Server 2017 or later with `clr strict security`
enabled, and everything marked `SAFE` runs unchanged on Windows, Linux, and
containers. There is no `TRUSTWORTHY ON` anywhere in these pages, and there
never will be.

## What gets logged here

Documentation changes that would alter what you do: new pages, revised
guidance, corrections. Typo fixes and wording polish are not logged. Engine
news that changes the guidance (a new SQL Server release, a behavior
change in CLR hosting) gets an entry when the affected pages are revised.
Security-relevant changes, like a shift in the trust model or a new engine
default, are called out explicitly rather than buried in a bullet.

For the portfolio view of the project (the positioning, the three eras,
the practice areas), see the [SQLCLR project page](/projects/sqlclr). The
reference material stays here.
