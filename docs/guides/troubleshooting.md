---
title: Troubleshooting
description: The cross-project checklist to run when a game or page won't load, stutters, goes silent, or loses your scores.
---

When something won't load or behaves badly, run this checklist top to bottom.
It resolves the large majority of problems in a couple of minutes.

## The two fixes that solve most things

1. **Hard refresh.** Press `Ctrl` + `F5` (or `Cmd` + `Shift` + `R` on a Mac).
   This bypasses the cache and pulls a completely fresh copy of the page.
2. **Try a private window.** Private and incognito windows run with
   extensions off and a clean slate. If the game works there, an extension
   (usually an ad or privacy blocker) is interfering in your normal window.

## Still broken? Work down the list

### The page won't load or renders wrong

- **Is your browser current?** The games target current Chrome, Edge,
  Firefox, and Safari. An outdated browser is the most common cause of a
  blank or garbled screen.
- **Are WebGL and canvas rendering enabled?** The games draw to a canvas,
  and some setups disable hardware acceleration or WebGL. Re-enable
  hardware acceleration in the browser settings and reload.

### No sound

- Press the game's mute key (`M` in most games, `V` in Skyroute). It's
  remarkably easy to have muted a game weeks ago and forgotten.
- Check the tab and the system. Browsers can mute individual tabs, and the
  OS can mute the browser. Also click into the page once; browsers hold
  audio back until you've interacted.

### Slow or stuttering

- Close other tabs and heavyweight apps. The games are light, but a starved
  browser stutters anyway.
- Use the built-in performance options. Skyroute has a "Fast" graphics
  setting, and Spindrift's `G` key toggles the glow effect, which is the
  expensive part of its look.

### Scores or progress disappeared

Scores, settings, and progress live in your browser's local storage, on
that browser, on that device. If they've vanished, one of these happened:

- Browsing data was cleared (site data and cookies), which wipes local
  storage too.
- You're playing in a different browser, on a different device, or in a
  private window.

There's no account or cloud sync, so a wiped high score can't be restored.
The silver lining is that the record chase starts again.

## SQLCLR issues

Database-side problems (assemblies that won't load, permission errors,
strict security surprises) have their own dedicated page:
[SQLCLR Troubleshooting](../sqlclr/troubleshooting.md).

## Report a problem

Found a genuine bug, or something this page doesn't fix? I'd like to know.

- GitHub: [github.com/kurtkluth](https://github.com/kurtkluth)
- Email: [kurt@kurtkluth.dev](mailto:kurt@kurtkluth.dev)

Include which project, which browser and device, and what happened right
before things went wrong. That's usually enough for me to reproduce it.
