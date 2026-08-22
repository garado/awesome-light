---
title: "Light Phone Manager"
date_added: 2026-08-22
repo: "https://github.com/greghare/light-phone-manager"
download: "https://github.com/greghare/light-phone-manager/releases"
author: "greghare"
author_url: "https://github.com/greghare"
category: "Companion Tools"
images:
  - "A.png"
  - "B.png"
  - "C.png"
  - "D.png"
description: "A cross-platform desktop tool for managing your Light Phone III."
---

A cross-platform desktop tool for managing sideloaded tools on your Light Phone III and providing automatic media backups. Track community tool repos on GitHub, install and update them over USB with one click, or drag-and-drop an .apk file directly onto the tool. adb (Android Debug Bridge) is bundled in - no separate Android SDK install required.

## Features

- **Track GitHub repos** — paste a `github.com/author/tool` URL and the tool reads its GitHub Releases, figures out the Android package name/version by parsing the APK itself (no `aapt`/Android SDK needed), and shows install status.
- **Install / update / uninstall** over USB via bundled `adb`, with live command output. Uninstalling asks for confirmation first, since it can't be undone.
- **Update all** installed tools that have a newer release in one click.
- **Drag-and-drop** an `.apk` anywhere on the window (or use "Install APK file…") to sideload it — automatically matched against a tracked repo if the package ID matches, otherwise added as a standalone sideloaded tool.
- Live device status (connected/unauthorized/model/Android version/free storage), polled automatically — no manual "connect" step.
- Tools already on the phone (sideloaded before you started using this tool) are auto-discovered and listed under the "On Device" category.
- **Media** — Photos, Screenshots, Zero, and Videos galleries, with automatic backup to a folder you choose on your PC every time the phone is connected.
- **Notes** — browse, create, edit, and delete notes on your Light Account, synced the same way the official Light tools do. Audio notes are listed but can't yet be played or edited from here.
- **Podcasts** — browse the podcasts you follow on your Light Account, search for new ones (via Apple's Search API) or add one directly by its RSS feed URL, and remove ones you no longer want.
