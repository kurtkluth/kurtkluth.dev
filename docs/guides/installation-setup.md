---
title: Installation & Setup
description: What you need for each project. Nothing for the games; a SQL Server instance plus .NET tooling for SQLCLR.
---

The short version is that the games need nothing, and SQLCLR needs a SQL Server.
Here's the slightly longer version.

## The games: nothing to install

Every Kluth Studios game runs entirely in the browser. There's no download,
no installer, no account, and nothing to keep updated; loading the page
always gets you the latest version.

All you need is a current version of one of these browsers:

- Chrome
- Edge
- Firefox
- Safari

Desktop or mobile both work for Lisa Climber, Lisetris, and Spindrift; all
three support touch. Skyroute is happiest on a desktop with a keyboard.

### Setup tips

- **Silent game?** Browsers block audio until you interact with the page,
  and tabs can be muted individually. Click or tap once, check the game's
  mute key (`M` in most games, `V` in Skyroute), and make sure the tab
  itself isn't muted.
- **Want fullscreen?** Spindrift has it built in on `F`. For the rest, your
  browser's fullscreen mode (`F11` on Windows) works fine.

:::tip

If a game loads but audio never comes back, check your browser's site
settings for a sound or autoplay block on the game's domain and set it to
allow.

:::

## SQLCLR: the one real prerequisite list

SQLCLR runs inside SQL Server, so it's the one project with actual
requirements:

- **A SQL Server 2017 or later instance you can administer.** The docs
  assume you can create databases and load assemblies on it.
- **`sysadmin` rights for server configuration.** Enabling CLR integration
  and working with strict security are server-level changes.
- **.NET build tooling.** You'll be compiling assemblies before SQL Server
  can load them.

That's the summary. The full treatment (exact steps, commands, and version
notes) lives in the [SQLCLR installation guide](../sqlclr/installation.md).

## Works offline?

Not really. The games are online web apps, not installed software. In
practice, a dropped connection mid-session generally keeps your current
session running, since everything is already loaded. But reloading the page,
starting fresh, or opening another game needs the network again. Your local
scores and settings survive the outage either way.
