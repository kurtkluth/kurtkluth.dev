---
title: Quick Start
description: Set up the private Windows build and review your first Reelabel operation.
---

## Open the application

Use the complete private Windows x64 package supplied for development testing.
Keep `Reelabel.exe`, its accompanying files, and the bundled `tools` directory
together. The self-contained package includes its .NET runtime. There is no
public release to download from this site.

If you have private source access, install the .NET 10 SDK matching the
repository's `global.json`, then use these commands from its root:

```powershell
./scripts/setup-tools.ps1
dotnet build src/Reelabel/Reelabel.csproj -c Release
dotnet run --project src/Reelabel -c Release
```

FFmpeg and FFprobe provide inspection and conversion. AtomicParsley tags
MP4/M4V, and mkvpropedit tags MKV. Tools resolve from **Settings > Media tools
folder**, the `tools` directory beside the executable, then PATH. Follow the
repository's pinned setup and license instructions when building a package.

## Try one disposable sample

1. Choose **Add files**, **Add folder**, or drag a video into the app.
2. Select it and check **Metadata**. Open **File details...** for the larger
   information, streams, and online-sources editor.
3. Configure optional [provider access](./metadata.md). Disable automatic
   import lookup in Settings if you want to enter details manually.
4. Open **Output > Naming profiles...**. Set a destination root different
   from the source folder for a tagged-copy test. Save and select the profile.
5. Choose **Preview paths** and check the full filename, folder, and sidecars.
6. Choose **Tag, rename and copy**, review the batch, and confirm **Create
   tagged copies**. Check the activity log and resulting file.

The combined action accepts MP4, M4V, and MKV. Other containers need conversion
first. Existing destinations block the operation rather than being overwritten.

## Try encoding

Open **Conversion > Encoding presets...**, choose a source file and a preset,
and use **Refresh frame** followed by **Encode preview**. Review the short clip
before applying that preset to a larger selection. [Encoding and previews](./encoding.md)
explains dimensions, hardware detection, and track rules.

## Where settings live

The normal data folder is `%LOCALAPPDATA%\Reelabel`. It contains the library,
naming profiles, encoding presets, encrypted credentials, and recovery/history
records. API credentials are separate from the library. See
[recovery](./file-operations.md) before moving or editing these files.
