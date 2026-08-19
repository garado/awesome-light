---
title: "Unofficial Light Phone API/CLI/TUI"
date_added: 2026-05-08
repo: "https://github.com/garado/light"
download: "https://github.com/garado/light/releases"
author: "garado"
author_url: "https://github.com/garado"
category: "Companion Tools"
description: "A community-built API, CLI, and TUI for managing music, notes, podcasts, and tools without the Light dashboard."
images:
- hero.png
- music-management.png
- notes-management.png
---

A community-built API, CLI, and TUI for managing music, notes, podcasts, and tools without the Light dashboard. Built by and for terminal enthusiasts and developers alike.

This was made by reverse-engineering the cloud API powering the official web dashboard. (With Light's permission!)

## Highlights
- Music
    - **Upload FLAC files without mangling your metadata.** The CLI pre-converts all FLAC files to MP3 before uploading, since Light's servers botch track metadata for non-MP3 files.
    - **Smarter uploads.** Auto-detect pre-existing duplicate tracks when uploading and choose to skip or overwrite.
    - **Sort tracks alphabetically by title.** The official dashboard only support sorting by artist.
    - **Regex search support.** Target tracks to delete with a regex filter for its title, artist, or album metadata, and optionally drop into an interactive picker to narrow the selection even further.
    - TUI: Vim binds. Reorder tracks individually or in visual block mode, and bulk-edit metadata.
- Notes
    - **Add new notes from the command line.** Specify its content from stdin or read it from file.
    - **Bulk download all notes.**
    - TUI: Vim binds. Copy text notes to clipboard, play/pause audio notes inline, and edit text notes in `$EDITOR`.

**NOTE:** This project is still early in development and somewhat unstable. Please report any issues!
