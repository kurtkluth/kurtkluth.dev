---
sidebar_position: 5
title: Troubleshooting
description: Fixes for common problems running Lisetris in the browser.
---

# Troubleshooting

## The game will not load

1. Confirm you can reach [lisetris.kluthstudios.com](https://lisetris.kluthstudios.com) at all — if not,
   check your connection or firewall.
2. Do a hard refresh (`Ctrl+Shift+R`, or `Cmd+Shift+R` on macOS) to bypass
   a stale cache.
3. Try a private/incognito window. If that works, a browser extension
   (usually an aggressive content blocker) is interfering.

## It loads but runs poorly

- Close other heavy tabs — browser games share your machine with everything
  else the browser is doing.
- Make sure hardware acceleration is enabled in your browser settings.
- On laptops, plugged-in power modes often lift GPU/CPU throttling.

## Controls are not responding

- Click or tap the game area once so it has keyboard focus.
- If you use a browser extension that captures keyboard shortcuts, try
  disabling it for lisetris.kluthstudios.com.

## Progress or high score disappeared

Saved state lives in your browser's local storage for lisetris.kluthstudios.com. It is removed if
you clear site data, browse privately, or switch devices. That is expected
behavior rather than a bug.

## Still stuck?

Check the [general troubleshooting guide](/docs/guides/troubleshooting) or
reach out via [GitHub](https://github.com/kurtkluth).
