---
title: "Light RSS"
date_added: 2026-08-19
repo: "https://github.com/zachattack323/LightRSS"
download: "https://github.com/zachattack323/LightRSS/releases"
author: "zachattack323"
author_url: "https://github.com/zachattack323"
category: "Reading & Reference"
images:
  - "A.png"
  - "B.png"
  - "C.png"
  - "D.png"
description: "A quiet, full-featured RSS and Atom reader."
---

## Features

- Parses RSS 2.0, Atom, and RDF/RSS feeds, including namespaced content and common date formats.
- Accepts a direct feed URL or a normal website URL and discovers RSS/Atom metadata.
- Starts with removable NASA, BBC World, and Hacker News subscriptions.
- Refreshes efficiently with `ETag` and `Last-Modified` conditional requests.
- Stores subscriptions, articles, unread state, saved items, and archive state in a local Room database.
- Supports unread/all views, per-feed timelines, local search, saved articles, mark-all-read, archive, and unfollow.
- Keeps feed-provided text available offline after it has been downloaded.
- Uses defensive XML parsing with DTD processing and external entities disabled.
- Includes light/dark appearance switching and local cleanup controls.

Light RSS does not use a WebView or open article pages. It turns feed-provided HTML into a focused text view without loading embedded images, scripts, or tracking pixels.
