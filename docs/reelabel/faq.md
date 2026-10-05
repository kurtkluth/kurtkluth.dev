---
title: FAQ
description: Answers about Reelabel availability, API keys, originals, presets, logs, and limitations.
---

## Can I download Reelabel?

There is no public release. This is a private Windows x64 development preview,
and its source is private. These pages document its current workflow rather
than offering a download.

## Does importing a video change it?

No. Optional lookup can load metadata into the preview. File writes require a
separate action. Review identification even when an exact match was loaded.

## Can I use only a TheTVDB PIN?

No. Reelabel's TheTVDB integration needs a registered project API key. Enter a
subscriber PIN in the additional field when that key requires it. See
[metadata setup](./metadata.md).

## Are credentials remembered?

Choose Save credentials for each provider. Windows DPAPI encrypts the values
for the current Windows user; unsaved changes are session-only. Credentials
are separate from library and history records.

## Where is the log?

Expand Activity log at the bottom of the main window. It shows session errors
and progress; there is no separate automatic text-log file. Queue/history and
Copy history provide persisted operation records.

## Which action keeps my originals?

Conversion and Tag, rename and copy retain source files. Rename changes their
paths and records recovery; Tag with backup edits them after backing up.

## Can all 50 files use the same encoding settings?

Yes. Select the batch and apply a saved preset. Separate movie/TV defaults
handle new imports. Already assigned or queued files keep snapshots until
explicitly reassigned. Per-file track overrides can be retained.

## Will a 1080p preset stretch everything to 1920x1080?

No. The dimensions are aspect-preserving limits. Smaller videos stay smaller
unless upscaling is enabled; wide films may have fewer vertical pixels.

## Does IMDb provide posters or plots here?

No. The local dataset adapter supplies titles, years, genres, IDs, and episode
mappings. It preserves existing richer fields when applying its results.

## Does conversion also tag the output?

Conversion does not run the metadata tagging step automatically. Import and
tag converted outputs separately when needed. The combined tagged-copy action
does tag copies but does not re-encode them.

## What remains limited?

No public installer, signing, or updates; no automatic crop; no HDR-to-SDR
workflow. Extra video, bitmap subtitles, attachments, and data are omitted from
MP4 conversion. Text-subtitle styling may change. Account access, all drivers,
large IMDb datasets, and real network-volume behavior need further testing.
