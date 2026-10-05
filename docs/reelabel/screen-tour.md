---
title: Screen Tour
description: A guide to Reelabel's menus, workspace tabs, details editor, naming profiles, and encoding previews.
---

## Main workspace

The images below are current-build WPF UI-check renders from 2026-10-04.
They use synthetic test data, omit desktop window chrome and open menu popups,
and include deliberately invalid review rows to show disabled confirmations.
They contain no provider credentials or personal media.

![Metadata workspace](/img/reelabel/main-metadata.png)

The file list stays on the left; the selected file's settings are on the right.
Add files or folders, select one or more rows, and use the bottom action bar.
Expand **Activity log** for session progress and errors.

| Tab | Contents |
| --- | --- |
| Metadata | Provider selection, saved credentials, search/match review, artwork, and editable movie/TV details |
| Output | Active naming profile, profile editor, selected rename/MP4 paths, and Open output folder |
| Conversion | Encoding preset, editor, batch application, and inspected audio/subtitle choices |
| Settings | Automatic lookup options, credentials shortcut, Copy history, tool/watch folders, and local IMDb folder |

![Output workspace](/img/reelabel/main-output.png)

![Conversion workspace](/img/reelabel/main-conversion.png)

![Settings workspace](/img/reelabel/main-settings.png)

## Menus

| Menu | Commands |
| --- | --- |
| File | Add files, Add folder, Remove selected |
| Tools | Inspect selected, Preview paths, Undo rename, Restore tag backup, Discard rename recovery, View queue/history, Retry unfinished queue |
| Help | About / credits |

Remove selected removes a library entry, not its underlying video. Inspect
reads streams. Recovery and retry commands require review; see
[file operations](./file-operations.md). About / credits includes provider
attributions and tool/license information.

## Selected file details

![Selected file information editor](/img/reelabel/file-details.png)

**File details...** opens a larger editor. **Information** holds movie/TV fields
and artwork. **Audio and video streams** shows inspection results. **Online
sources** refreshes configured sources and loads a chosen candidate into the
draft. **Apply to preview** saves staged details to the library; **Cancel**
discards them. Embedded tags require a separate file action.

## Naming profile editor

![Movie naming profile](/img/reelabel/naming-movies.png)

![TV naming profile](/img/reelabel/naming-tv.png)

**Output > Naming profiles...** manages named profiles, separate **Movies** and
**TV shows** roots and patterns, replacements, and live examples. The token
helper explains available fields. **Preview selected files** opens the complete
path review. See [Naming profiles](./naming-profiles.md).

## Encoding preset editor and preview

![Video settings](/img/reelabel/encoding-video.png)

![Dimensions and processed synthetic frame](/img/reelabel/encoding-dimensions.png)

![Audio and subtitle rules](/img/reelabel/encoding-audio.png)

**Conversion > Encoding presets...** manages saved presets and movie/TV
defaults. **Video** controls codec, encoder, quality/bitrate, speed, and frame
rate. **Dimensions** controls resolution bounds and manual crop.
**Audio/subtitles** sets track rules. The preview area provides real source or
processed stills and short test encodes.

**Larger preview** supports source video, encoded clip, and still-frame views,
fit or actual-size viewing, playback, seeking, and volume. The external-player
option handles clips Windows cannot decode. See [Encoding](./encoding.md).

## Batch reviews and history

![Duplicate naming destination blocks rename](/img/reelabel/naming-validation.png)

![Missing source blocks queue confirmation](/img/reelabel/encoding-validation.png)

**Preview paths** reviews names without mutations. Rename and tagged-copy
reviews include full source/destination paths and sidecars. **Review encoding
batch** includes actual dimensions, selected/omitted tracks, and validation
errors. Confirmation remains disabled when planning fails.

**Tools > View queue/history** shows conversion work. **Settings > Copy history**
shows combined tagged-copy work. Retry and backup recovery remain explicit
actions after restart.
