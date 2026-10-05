---
title: Naming Profiles
description: Save movie and TV destination roots, folder patterns, and filenames with full batch previews.
---

Open **Output > Naming profiles...**. Create or duplicate a profile, configure
its Movies and TV shows tabs, and choose **Save profile**. Select the saved
profile in Output to use it. Saving settings does not rename files.

| Setting | Movies | TV shows |
| --- | --- | --- |
| Destination root | `D:\Movies` | `D:\TV` |
| Movie/show folder | `{title}[[ ({year})]]` | `{showTitle}[[ ({showYear})]]` |
| Season folder | Not applicable | `Season {season:00}` |
| Filename | `{title}[[ ({year})]]` | `{showTitle} - {episodeRange}[[ - {episodeTitle}]]` |

```text
D:\Movies\Aurora Passage (2026)\Aurora Passage (2026).mp4
D:\TV\Harbor Lights (2024)\Season 01\Harbor Lights - S01E02 - The Beacon.mkv
```

These are illustrative titles. The extension comes from the operation, so
omit it from the filename pattern. Each pattern produces one path component;
do not enter directory separators. Blank roots use each file's current source
folder, and blank folder patterns skip that level.

## Tokens and optional values

Available tokens are `{title}`, `{year}`, `{showTitle}`, `{showYear}`, `{season}`,
`{episode}`, `{episodeEnd}`, `{episodeRange}`, and `{episodeTitle}`. TV title/year
refer to the edited series title and premiere year. Number formats such as
`{season:00}` or `{episode:000}` set padding.

Double brackets make a segment optional: `[[ - {episodeTitle}]]` disappears,
including punctuation, when its value is missing. Missing values outside an
optional segment block planning. Unknown tokens and nested optional segments
are rejected. The editor's token helper and live examples explain the result.

Profiles also store season 0 **Specials**, multi-episode range style, separate
space replacements for each level, colon replacement, and whether to include
matching subtitle sidecars. Range, repeated, and full styles can produce
`S01E02-E04`, `S01E02E03E04`, or `S01E02 S01E03 S01E04`.

## Review the batch

Choose **Preview selected files** in the editor or **Preview paths** in the main
window. Review every source/destination and included sidecar. Matching SRT,
ASS, SSA, VTT, SUB, and IDX sidecars follow the same stem, including language
suffixes. Differently named sidecars stay untouched.

The planner sanitizes Windows-invalid characters and reserved names, rejects
unknown tokens and paths of 260 characters or more, and checks missing sources,
duplicates, existing destinations, and blocked folders. Rename requires a clean
review. Network and cross-volume behavior still needs real-environment testing.

Profiles persist in `naming-profiles.json` under the app's data folder. The active
profile is remembered. Queued conversions retain their final path and profile
snapshot, so later profile edits do not redirect them. See
[file operations](./file-operations.md) for rename recovery and tagged copies.
