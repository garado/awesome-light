---
title: "LightQR"
date_added: 2026-07-28
repo: "https://github.com/gi-os/LightQR"
download: "https://github.com/gi-os/LightQR/releases"
author: "gi-os"
author_url: "https://github.com/gi-os"
category: "Utility"
light_sdk: false
images:
  - A.png
  - B.png
description: "A QR scanner for the Light Phone III, with a companion web page for turning text into a code to scan."
---

Point it at a code. The result screen shows the decoded text, with **OPEN** for an address
and **COPY** for anything else. Everything scanned goes into a local history you can clear.
There is no account and no cloud, and the history lives in the app's own preferences.

You can also type or paste an address instead of scanning, which is sometimes the shorter
route.

ZXing does the decoding, off the camera's luminance plane. It is pure Java, so it works on
a phone with no Google Play Services. The companion generator at
[gi-os.github.io/LightQR](https://gi-os.github.io/LightQR/) encodes in the browser and
sends nothing anywhere. It exists so a long address can reach the phone without being
typed on the phone.

This is a plain sideloaded Android app rather than a Light SDK tool, so it uses CameraX and
the standard soft keyboard. It asks for the camera and for network access, and nothing
else.
