---
sidebar_position: 3
title: Installation & Setup
description: What you need before using each project — usually nothing.
---

# Installation & Setup

## The games and experiences

**Nothing to install.** Lisa Climber, Lisetris, Skyroute, and Spindrift run
entirely in the browser. You need:

- A current version of Chrome, Edge, Firefox, or Safari
- JavaScript enabled
- A network connection for the initial load

That's the whole setup.

## SQLCLR

SQLCLR is developer tooling, so it has real prerequisites: a SQL Server
instance, the .NET Framework toolchain, and permissions to register
assemblies. The full, step-by-step version lives in
[SQLCLR Installation](/docs/sqlclr/installation) — the short version:

```sql
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

…then follow the [Quick Start](/docs/sqlclr/quick-start).

## This site

If you want to run **kurtkluth.dev itself** locally (it's a Docusaurus site):

```bash
git clone https://github.com/kurtkluth/kurtkluth.dev
cd kurtkluth.dev
npm install
npm run start
```

See the [Developer Guide](/docs/guides/developer-guide) for the site's
architecture and how to add a project.
