---
title: Reelabel Overview
description: Identify, review, rename, tag, and convert movie and TV videos in a Windows workspace.
---

Reelabel is my personal Windows desktop application for organizing movie and
TV videos. It combines metadata lookup, editable details, saved naming profiles,
embedded tagging, and video conversion. The workflow starts with a preview:
importing a file never writes tags, renames it, or starts conversion.

**Status:** private development preview, built with C# / WPF and .NET 10 for
Windows x64. There is no public download, installer, signing, or automatic
update service. The source repository is private.

![Reelabel main workspace with metadata and batch actions](/img/reelabel/main-metadata.png)

Desktop capture with disposable synthetic media and manually supplied demo metadata/artwork. Explore the
[screen tour](./screen-tour.md) for workspace tabs and editors.

## What you can do

| Task | Where to learn more |
| --- | --- |
| Find movie and episode details through TMDB, TheTVDB, or local IMDb datasets | [Metadata and credentials](./metadata.md) |
| Save separate movie and TV folder and filename conventions | [Naming profiles](./naming-profiles.md) |
| Set batch encoding defaults and test a short clip | [Encoding and previews](./encoding.md) |
| Create tagged copies, rename files, or restore backups | [File operations and recovery](./file-operations.md) |
| Find every menu, tab, and editor | [Screen tour](./screen-tour.md) |

## A typical session

1. Add videos, a folder, or drag files into the workspace.
2. Review identification, episode order, artwork, and track selections.
3. Choose a naming profile and inspect complete destination paths.
4. Create tagged copies, or choose the separate rename, tag, or conversion action.
5. Check the activity log and output folder after completion.

Conversion and the combined tagged-copy action preserve source videos. A
standalone rename changes source paths and records recovery information;
standalone tagging edits a source file after making a backup.

Live authenticated provider coverage, real network shares, and every hardware
driver have not been comprehensively validated. Synthetic tests verify many
file-preservation, metadata, preview, and recovery paths; they do not guarantee
identification or playback in every player.

Start with [Quick Start](./quick-start.md), or visit the
[portfolio page](/projects/reelabel).
