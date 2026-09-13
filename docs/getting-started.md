---
title: Getting Started
description: Find your path into kurtkluth.dev in about a minute, whether that is SQLCLR documentation, browser games, or troubleshooting help.
---

kurtkluth.dev is three things in one place. It is a portfolio of everything I
build, the documentation for each project, and the practical instructions to
launch, understand, and use every one of them. You can enjoy the
[project cards](/projects) without ever opening the docs, but the moment you
want to know how something actually works, this side of the site has the
answers.

## Pick your path

Most people show up here for one of four reasons. Find yours below.

### You're here for SQLCLR

SQLCLR is the developer tool of the family. It runs .NET code inside SQL
Server, with governed and auditable boundaries. If that's your world, skip
the games entirely. Start with the [SQLCLR Overview](./sqlclr/overview.md)
for the lay of the land, then follow the
[Quick Start](./sqlclr/quick-start.md) to load and run your first assembly.
From there, the SQLCLR section covers installation, configuration, security,
deployment, and troubleshooting in depth.

### You're here to arrange your iPhone apps

[IconTiller](./icontiller/overview.md) is a Windows desktop development preview.
Start with [Quick Start](./icontiller/quick-start.md), try Demo without a phone,
then read the [editing and Apply guide](./icontiller/editing-and-apply.md)
before making changes over USB.

### You're here to play

Kluth Studios ships seven browser games and interactive experiences. All of
them run instantly in the browser. No install, no account, and free. Pick
one and go:

- [Lisa Climber](./lisa-climber/overview.md) is Summit Smash, a pixel-art
  arcade climbing platformer.
- [Lisetris](./lisetris/overview.md) is a romantic neon falling-block puzzle
  game, made for Lisa.
- [Lisa's Tapistry](./lisas-tapistry/overview.md) is a cozy tap-away mosaic
  puzzle game, made for Lisa.
- [Lisa's Hexscape](./lisas-hexscape/overview.md) is a strategic hexagon
  puzzle in a twilight garden, made for Lisa.
- [Diamond Dynasty](./diamond-dynasty/overview.md) is an original baseball
  franchise sim. Build the roster, call the pitches, become a legend.
- [Skyroute](./skyroute/overview.md) is SkyRoute Infinite, an open-world
  browser flight simulator.
- [Spindrift](./spindrift/overview.md) is a vector-style arcade space
  shooter in the Asteroids tradition.

If you'd like the shared basics first (common keys, where scores are saved,
touch support), read [How to Play](./guides/how-to-play.md).

### Something's broken

Start with the cross-project
[Troubleshooting guide](./guides/troubleshooting.md). It walks the checks
that fix most browser problems, from hard refreshes to muted tabs. Each
project also keeps its own troubleshooting and FAQ material in its docs
section for project-specific quirks, and database-side issues have a
dedicated home in [SQLCLR Troubleshooting](./sqlclr/troubleshooting.md).

## What you need

Honestly, not much.

| If you want to... | You need |
|---|---|
| Arrange iPhone Home Screens | Windows, Python 3.12 for source use, and Apple mobile device drivers plus a USB cable for phone access |
| Play the games | A current version of Chrome, Edge, Firefox, or Safari (desktop or mobile) |
| Fly Skyroute comfortably | A keyboard (Skyroute strongly prefers one; the other three games also support touch) |
| Work with SQLCLR | Access to a SQL Server instance you can administer, plus .NET build tooling |

The games need no download or account. Desktop and database projects have
their own setup steps: [IconTiller Quick Start](./icontiller/quick-start.md)
and [SQLCLR Installation](./sqlclr/installation.md).
