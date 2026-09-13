---
title: IconTiller Quick Start
description: Set up IconTiller on Windows, try Demo, and read an iPhone layout over USB.
---

## Requirements

- Windows and Python **3.12** with Tkinter for running from source.
- Apple's mobile device software/drivers for phone access.
- A USB data cable and one connected iPhone, unlocked and trusted.

You can try **Demo** without a phone. Python 3.14 is not the supported
project environment. Compatibility testing is limited to one phone
reporting iOS 27.0.

## Run from source

Download or clone the [public repository](https://github.com/kurtkluth/IconTiller).
Open PowerShell in its extracted or cloned project folder:

```powershell
py -3.12 -m venv .venv312
.\.venv312\Scripts\python.exe -m pip install -r requirements-lock.txt
.\launch.cmd
```

Setup downloads dependencies from PyPI. The running application uses local
files and the USB device connection.

## Portable Windows package

You can build a Windows x64 package from the repository using `build.ps1`.
See the [repository build instructions](https://github.com/kurtkluth/IconTiller#windows-executable).
If you have a portable package, extract the entire folder and run
`IconTiller.exe`. Keep it with its `_internal` folder, `README.txt`, and
`LICENSE.txt`. Python is bundled; Apple device drivers are still required.
This is an unsigned development preview, not a signed installer.

The repository is the source entry point. This guide does not assume a
published binary release is available. Packaged smoke checks do not establish
live USB compatibility on your computer.

## Your first session

1. Launch IconTiller and choose **Demo** to explore sample data.
2. When ready, connect one iPhone by USB, unlock it, and accept its Trust prompt.
3. Choose **Read iPhone** and wait for the layout and artwork to load.
4. Make a supported edit and use **Save draft** if you want a local copy.
5. Follow [Editing and Apply](./editing-and-apply.md) to review and confirm it.

Edits stay local until you confirm **Apply to iPhone**. Keep the phone
connected while reading or applying. For connection problems, see
[Tips and Troubleshooting](./tips.md).
