---
title: Tips and Troubleshooting
description: Practical checks for matching, names, encoding, logs, and watched-folder imports.
---

- Start with a disposable video and one file at a time. Preview names and a
  short encode before applying the settings to 50 movies or episodes.
- Keep series premiere year separate from an episode's broadcast year.
  Check season, episode range, and Aired/DVD/Absolute ordering before lookup.
- An empty naming root uses the source folder. Set a different root for
  **Tag, rename and copy** so its destination differs from the original.
- Check every selected file's resolved tracks. Keeping inspected selections
  preserves overrides when you apply an encoding preset.
- Hardware detection is local and session-specific. Re-test after driver
  changes and read visible failures rather than assuming software fallback.
- Expand **Activity log** at the bottom of the main window to read errors and
  progress. The app does not provide a separate automatic text-log file.
- Open **Tools > View queue/history** for conversions and **Settings > Copy
  history** for combined jobs. These histories complement the activity log.

## Watched folders

Set a folder in Settings and optionally enable subfolders. The app polls every
five seconds and waits for unchanged size/modified time across scans and readable
files. Reparse points and inaccessible entries are skipped. **Stop watching**
clears the rule.

Automatic metadata lookup can run on these imports when enabled. Rename, tag,
copy, and conversion still require an action. Stability checks cannot prove
that a paused download is complete; review the imported file before processing.

## When something fails

Check the activity log, tool folder, permissions, destination collisions,
available disk space, and source changes first. For metadata, verify provider
access and try the year filter off. For encoding, test a short software preview
and check HDR, dimensions, and selected tracks. For an interrupted mutation,
review [recovery records](./file-operations.md) before retrying.

Report the action, container type, visible error, and relevant preset settings.
Remove credentials and personal paths from shared logs or screenshots. Contact
[kurt@kurtkluth.dev](mailto:kurt@kurtkluth.dev).
