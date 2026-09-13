---
title: Tips and Troubleshooting
description: Navigate large layouts and resolve connection, artwork, and Apply problems in IconTiller.
---

## Work comfortably

- Try **Demo** first to learn drag targets without connecting a phone.
- Use **Find app** for a distant app or a folder whose location you forgot.
- Hover over a page number during a drag to jump directly to it.
- Save a draft before experimenting with folder creation or added pages.
  These edits remain local and can prevent Apply.
- The app remembers window size and position. If a saved display is missing,
  it reopens on the primary display.

## The phone is not detected

Connect one phone with a USB data cable, unlock it, and accept Trust if asked.
Check that Apple's installed software can recognize the phone. Try another
USB port or cable, reconnect, and choose **Read iPhone**. Drivers are not
included in the portable package. Demo remains available without USB.

## Apply is blocked

Check the [supported operations](./editing-and-apply.md#what-can-be-applied).
Undo added pages, folder creation or renaming, dock edits, or other draft-only
changes. An exchange involving folder contents must be one exact app swap.
Save a draft you want to keep before starting over with a fresh read.

If the phone's layout changed after the baseline read, read it again and make
your intended edits from that state. If backup creation fails, resolve the
reported storage or access problem before attempting a write.

## The result is mismatched or uncertain

Inspect the phone and choose **Read iPhone** to load what is actually there.
Do not assume the intended layout was applied. IconTiller retains the
observations and disables Apply until a fresh read; it does not automatically
retry or restore. Do not treat a layout snapshot as a full-device backup.

## Artwork is missing or looks different

Unavailable artwork and web clips use fallback tiles. The view is an ordered
layout editor rather than a pixel-perfect phone replica. The icon cache is
scoped by device, app identifier, and app version; theme or alternate-icon
changes without a version change do not automatically invalidate it.

## Report a problem

Use [GitHub issues](https://github.com/kurtkluth/IconTiller/issues). Include
the build or commit, Windows version, and steps using Demo or synthetic data
when possible. Do not upload personal layouts, device identifiers, pairing
records, caches, or private screenshots. See [FAQ](./faq.md) for local data.
