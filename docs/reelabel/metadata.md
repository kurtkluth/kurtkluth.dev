---
title: Metadata and Credentials
description: Configure TMDB, TheTVDB, and local IMDb lookup, then review movie and episode matches.
---

## Choose a source

Expand **Metadata > Find metadata online**, or use **Settings > Manage API
credentials**. Select a provider before entering and saving its values.

| Source | Access | What to expect |
| --- | --- | --- |
| TMDB | API Read Access Token | Movie and TV details, artwork, and aired-order episode lookup |
| TheTVDB | Registered project API key; subscriber PIN when the key requires one | Movie and TV details, including Aired, DVD, and Absolute episode order |
| IMDb datasets | Local non-commercial dataset folder; no API key | Titles, years, genres, IDs, and episode mappings |

**A TheTVDB subscriber PIN does not replace a project API key.** Enter the key
in its API-key field and the PIN in its separate subscriber field when using a
user-supported key. Use **Validate access** to test the selected configuration.
Live access depends on the account and key's entitlements.

Choose **Save credentials** to retain that provider's key and optional PIN.
Changes after saving require Save again. **Forget saved** removes the saved
values for that provider. Windows DPAPI encrypts saved credentials for the
current Windows user in `credentials.json`; unsaved edits are session-only.
Do not include that file or unredacted credential screens in bug reports.

## Automatic lookup and manual review

Settings offers **Search metadata automatically on import** and **Load exact
matches into preview automatically**. Both start enabled. New file, folder,
drag-and-drop, and stable watched-folder imports search configured sources in
the background. Restoring a saved library does not repeat lookup.

An automatic match requires exact title agreement, the parsed year when
available, a single exact identity per responding provider, and agreement on
a known year. Ambiguity, conflicting results, multi-episode files, and alternate
episode orders require review. Matching rules help narrow candidates; check the
loaded details before writing files.

Manual **Search provider** uses the selected provider. **File details > Online
sources > Refresh sources** searches all configured services and the local IMDb
folder. A successful source can retain its results when another source fails.
Load a candidate into the draft, review it, then choose **Apply to preview**.
Cancel discards staged details. Neither action writes tags into the video.

TV year means the series premiere year. TMDB uses aired order; DVD or absolute
numbers need manual mapping. TheTVDB supports the selected ordering. Complete
episode ranges must be resolved before metadata applies. Editing search fields,
credentials, the selected file, or filters clears stale results.

## Local IMDb data

Review [IMDb's dataset documentation](https://data.imdb.com/non-commercial-datasets/)
and its [usage conditions](https://help.imdb.com/article/imdb/general-information/can-i-use-imdb-data-in-my-software/G5JTRESSHJBBHTGX).
Download `title.basics.tsv.gz` and, for episode lookup, `title.episode.tsv.gz`
from the same release. Compressed or extracted TSV files are accepted. Keep
them outside the source repository and select their folder in **Settings >
IMDb non-commercial dataset folder**.

This source provides no plots, artwork, cast, content certifications, or
audience ratings. Applying its result preserves those existing fields. There
is no automatic dataset download or index; scanning large files can take time.

Information courtesy of IMDb (https://www.imdb.com). Used with permission.

Reelabel uses the TMDB API but is not endorsed or certified by TMDB.
Metadata provided by TheTVDB. Please consider adding missing information or
subscribing at [TheTVDB](https://thetvdb.com).

If lookup fails, expand **Activity log**. Missing credentials, year filters,
episode order, and local dataset paths are the first checks. See [FAQ](./faq.md).
