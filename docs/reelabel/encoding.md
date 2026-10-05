---
title: Encoding and Previews
description: Save batch video settings, choose dimensions and tracks, and test a short encoding preview.
---

Open **Conversion > Encoding presets...**. Select or duplicate a preset,
configure its tabs, and save it. Independent defaults for movies and TV episodes
apply to newly imported files. To give an existing batch the same settings,
select its files and use **Apply preset to selected files**.

Editing a saved preset does not change existing per-file snapshots or queued
jobs. **Keep inspected per-file track selections** retains manual track choices
when applying a preset; clear it to resolve the preset's rules again.

## Video and encoder

H.264 uses software x264; H.265 uses x265. **Detect compatible encoders** tests
locally available Intel Quick Sync, NVIDIA NVENC, AMD AMF, and Windows Media
Foundation options on a generated clip. A successful test does not guarantee
every input or driver configuration. Failed hardware jobs remain visible and
do not silently switch to software.

Constant quality is the default; average bitrate is another option. Software
CRF and hardware quality scales are different. Lower CRF, ICQ, CQ, or QP
generally means higher quality; Media Foundation's 0-100 Quality scale runs
the other way. Do not compare numbers across different encoders.

**Balanced 1080p** starts with H.264 software, CRF 22, medium speed, source frame
rate, a 1920x1080 limit, no crop, and no upscaling. Compact 720p and Original
size provide editable starting points. Encoding produces 8-bit SDR; HDR or
wide-color sources need another color workflow and are blocked for SDR encoding.

Compatible stream copy avoids re-encoding, but requires MP4-compatible streams.
It disables crop, scale, quality, speed, and frame-rate changes. Compatibility
is checked, not guaranteed for every input.

## Dimensions and tracks

Choose Source size, SD 480p/576p, 720p, 1080p, 2160p/4K, or custom limits.
These are aspect-preserving bounding boxes. A widescreen film may have fewer
vertical pixels than the selected label. Smaller sources stay smaller unless
upscaling is enabled. Rotation and non-square source pixels are accounted for.
Manual crop uses even pixel counts; automatic crop and additional filters are
future work.

Audio rules can keep all, the preferred language with a first-track fallback,
the first track, or none. Supported text subtitles can keep all, a preferred
language, or none. AAC bitrate is configurable for transcoding. Inspect a file
to adjust its resolved per-file selections. Bitmap subtitles, extra video,
attachments, and data are disclosed as omitted; MP4 text-subtitle styling may
change.

## Try a real preview

1. Select a file, choose a position, and select Source frame or Processed frame.
2. Choose **Refresh frame**. The processed still demonstrates crop/scale
   geometry, not compression quality.
3. Choose 10, 30, or 60 seconds and **Encode preview**. The clip uses the same
   settings as full conversion and is clamped at the source end.
4. Play, seek, and adjust volume. **Larger preview** offers source video,
   encoded test clip, or still frame, with fit or actual-size viewing.
5. If Windows cannot decode the clip, use the explicit external-player option.

Changing settings, position, or source invalidates the encoded preview. Closing
cancels work and cleans its temporary session under `%TEMP%\Reelabel-previews`.
An external player can hold a file open; close it to allow cleanup. Preview
clips are not imported or queued.

## Convert a batch

**Convert selected** probes each source and opens **Review encoding batch**.
Check complete paths, actual dimensions, selected/omitted tracks, and errors.
**Queue and convert** is disabled until every row is valid. Original videos
remain unchanged. Temporary outputs are validated before final placement.

Validation checks codec/dimensions, explicit frame rate, duration tolerance,
track counts, and full-conversion chapter counts. It does not prove perceptual
quality or universal player compatibility. Interrupted jobs require explicit
retry. Presets persist in `encoding-presets.json`; see
[recovery](./file-operations.md) for the library and queue.
