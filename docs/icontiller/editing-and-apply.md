---
title: Editing and Apply
description: Arrange a local IconTiller draft, understand supported writes, and review the independently verified result.
---

## Arrange your draft

**Insert and shift** is the default mode. Drag an app before or after another
tile; the gold insertion marker shows the destination. Intervening entries
shift across pages while each page keeps its existing item count. Whole
folders can shift with their contents intact. No new capacity is created.

Choose **Swap positions** to exchange two apps. You can also select an app
and use **Swap selected with** to choose its partner. Exchanges can be within
a page, across pages, or between a page and an existing folder.

While dragging, hover over a number in **Go to page** for about half a second
to jump there. Drag near the top or bottom edge to scroll. Press **Escape**
to cancel. Reordering closes folder windows because their locations may change.

Use **Find app** to search names and identifiers, including apps inside
folders. **Undo** and **Redo** revise the local draft. **Save draft** writes
a new file where you choose; **Open layout** reopens one.

## What can be applied

| Operation | Current status |
|---|---|
| One exact ordinary-app exchange outside the dock, including page/folder exchanges | Supported |
| Reorder complete Home Screen entries with unchanged dock, page sizes, and entry data | Supported; multiple page reorders can accumulate |
| Create or rename folders, add pages, or insert into a folder without an exchange | Local draft only |
| Remove an icon to the App Library | Not supported; this does not mean uninstalling the app |
| Change the dock, edit widgets, or restore a full layout | Not enabled |
| Preserve or edit hidden-page visibility | Not supported; pages may become visible |

Unsupported entries must remain stationary. A combination of local edits may
fail the write validator. A folder-content exchange is limited to one exact
app swap. Undo draft-only operations to return to a supported change.

## Review and confirm

1. Start with a fresh **Read iPhone**, then make a supported edit.
2. Click **Apply to iPhone** to open the review. Check the phone, all affected
   positions in the scrollable list, and the backup location.
3. Choose **Apply to iPhone** in the dialog to confirm, or **Cancel** to keep editing.
4. IconTiller checks device identity and whether the layout has changed since
   your baseline. It must save a fresh layout backup before writing.
5. Wait for the independent full-layout read-back and comparison.

A successful API reply alone is not a verified change. A mismatched or uncertain
result is reported and disables further Apply until a fresh read. Inspect the
phone, then use **Read iPhone** to see its actual state. There is no automatic
retry or restore. A layout snapshot is **not a full-device backup**.

See [Tips and Troubleshooting](./tips.md) for blocked Apply and
[FAQ](./faq.md) for where backups and drafts are stored.
