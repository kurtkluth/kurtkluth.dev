---
title: IconTiller FAQ
description: Answers about platform support, local data, backups, supported edits, and the development preview.
---

## Is this a browser app or an iPhone app?

It is a Windows desktop application that connects to an iPhone over local
USB. The source uses Python 3.12, Tkinter, Pillow, and pymobiledevice3.
See [Quick Start](./quick-start.md) for setup.

## Which iPhones and iOS versions work?

Testing has covered one connected phone reporting iOS 27.0. Broader device
and iOS compatibility is not established. A packaged startup or import smoke
check is not proof of live USB compatibility.

## Can I remove an app from the Home Screen but keep it installed?

Not currently. App Library removal is unresolved. IconTiller does not
substitute uninstalling an app for removing its Home Screen placement.

## Can I create folders or add pages?

Yes, in local drafts. Creating or renaming folders, adding pages, and moving
an app into a folder without an exchange are not enabled for Apply.
See [Editing and Apply](./editing-and-apply.md) for the full boundary.

## Are hidden pages preserved?

Hidden-page visibility is not exposed by the current reader. Pages may
become visible after Apply. Dock changes and widget editing are not enabled.

## Does it upload my layout or require an account?

No account, telemetry, cloud uploads, advertising, or external image service
is built into the application. Artwork comes from the connected phone.
Downloading dependencies or Apple software can require internet access.

## Where is my data stored?

For compatibility, local data remains under
`%LOCALAPPDATA%\iPhoneScreenManager`. Paste that into File Explorer:

- `Backups`: pre-write layouts and mismatched read-backs.
- `Icons`: artwork cached by device identity, app identifier, and app version.
- `window.json`: window size, position, and maximized preference.

Drafts are saved wherever you choose. They can contain app inventories,
arrangements, device name, iOS version, a hashed device identifier, and baseline
layout data. These files are not encrypted by IconTiller. Pairing records
maintained by Apple software or the library are also sensitive. Keep personal
files out of public issues and source control.

## Is a layout backup a full iPhone backup?

No. It captures layout information, not the device's full contents.
Full-layout restoration is disabled. After a mismatch, the app does not
automatically retry or restore; inspect the phone and read its actual state.

## How do I update or remove a portable copy?

Close IconTiller and extract an updated package into a separate folder. Keep
each executable with its matching `_internal` folder. To remove a portable
copy, close it and delete its application folder. Saved drafts and the local
data directory remain on your computer.

## Is the source public?

Yes, at [kurtkluth/IconTiller](https://github.com/kurtkluth/IconTiller).
Original source and documentation are MIT licensed; dependencies retain their
own licenses. IconTiller is independent and not affiliated with Apple.
