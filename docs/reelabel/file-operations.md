---
title: File Operations and Recovery
description: Understand tagged copies, rename undo, tagging backups, conversion history, and restart recovery.
---

## Choose the right action

| Action | Result | Original |
| --- | --- | --- |
| Preview paths | Lists planned video and sidecar paths | Unchanged |
| Tag, rename and copy | Creates tagged copies under planned names | Bytes and filenames unchanged |
| Rename selected | Moves/renames videos and matching sidecars | Path changes; recovery recorded |
| Tag with backup | Writes embedded metadata | Edited after a backup is saved |
| Convert selected | Creates an MP4 using assigned encoding settings | Retained |

## Tagged copies

Set a naming-profile destination different from the source, select files, and
choose **Tag, rename and copy**. Review every row before **Create tagged copies**.
MP4, M4V, and MKV are supported. This action does not re-encode video. Enabled
subtitle sidecars are copied with their planned names.

The app checks source/copy hashes, tags staged copies, verifies metadata and
media stream integrity, rechecks sources, then places outputs without overwrite.
Normal failures and cancellation remove owned partial outputs. Files changed
by another process remain for manual review.

**Settings > Copy history** records completions, failures, staging paths, and
interrupted operations in `organize-history.json`. Restart never retries or
deletes interrupted work automatically. Review leftover staging/output files
after a crash. A corrupt history file is preserved and blocks new combined jobs.

## Rename and undo

Rename confirms a complete batch of paths and collision checks. Matching
subtitle sidecars follow the video. Same-volume moves use filesystem rename;
cross-volume moves use a temporary copy and SHA256 verification before removing
the source. Real network shares and a second physical volume still need local
testing.

`rename-journal.json` records recovery before mutations. **Tools > Undo rename**
works after restart and confirms paths. Missing, changed, ambiguous, or occupied
paths block undo. **Discard rename recovery...** explicitly accepts current
filenames before a new batch. Keep the journal until the result is settled.

## Tagging and backups

MP4/M4V tagging uses AtomicParsley; MKV uses mkvpropedit. The first backup is
kept as `.reelabel-backup`, with unique backups for later edits. **Tools > Restore
tag backup...** previews the newest backup and backs up the current file before
restoring it. Backups are not automatically deleted.

Read-back and media packet integrity checks follow tagging. Failure or normal
cancellation restores the pre-operation file. A crash during an external tool
edit requires explicit recovery. Unrelated MKV global, nested, and track tags
are preserved. Player support for artwork, cast, genre, and certifications varies.

## Conversion queue and local data

**Tools > View queue/history** shows the latest 30 jobs; full records remain in
`library.json`. Interrupted work requires **Retry unfinished queue...** and a
review. Existing outputs and changed source size/modified time produce errors
instead of overwrite. No file mutation silently resumes after restart.

Normal files are under `%LOCALAPPDATA%\Reelabel`:

| File | Purpose |
| --- | --- |
| `library.json` | Imported details/artwork, settings, watch rules, encoding snapshots, queue/history |
| `naming-profiles.json` | Saved movie/TV naming profiles |
| `encoding-presets.json` | Saved encoding presets and defaults |
| `credentials.json` | Windows-user encrypted provider credentials |
| `rename-journal.json` | Rename recovery |
| `organize-history.json` | Combined tagged-copy history |

Corrupt state is preserved for review. Back up these records before manual
recovery; do not delete history to bypass an unresolved operation.
