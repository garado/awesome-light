---
title: "LightPass"
date_added: 2026-07-28
repo: "https://github.com/gi-os/BrightPasses"
download: "https://github.com/gi-os/BrightPasses/releases"
author: "gi-os"
author_url: "https://github.com/gi-os"
category: "Utility"
light_sdk: false
images:
  - A.png
  - B.png
  - C.png
description: "A movie ticket stub collector for the Light Phone III, which reads the title, theater, date, time and seat off a photo of the stub using your own Anthropic API key."
---

Point the camera at a ticket stub, or import a photo of one. The app reads the fields off
the paper, crops the stub, and files it by showtime. Stubs move to an archive once the film
has ended. Every field stays editable, and a search list fixes the film when the parser
picks the wrong one. Tickets live in a local database, with no account and no server.

**You bring your own API keys.** Reading a stub needs an
[Anthropic](https://console.anthropic.com/) key, because Claude does the parsing; without
one the app cannot read a ticket, though you can still enter a stub by hand. A
[TMDb](https://www.themoviedb.org/settings/api) key is optional and only adds posters and
the film search list. Enter both in Settings, or scan them from a QR code so you do not
have to type a long key on the phone keyboard. The keys stay on the device.

Two things are worth knowing before you install it. This is a plain sideloaded Android app
rather than a Light SDK tool, so it uses CameraX and the standard keyboard. And the detail
page turns the system grayscale filter off while a stub is open, which is why the posters
in the screenshots show color. The filter returns when you close the page. That behavior
needs one `adb` permission grant and does nothing without it.
