---
title: "Dugout"
date_added: 2026-08-23
repo: "https://github.com/craigeley/dugout"
download: "https://github.com/craigeley/dugout/releases"
author: "craigeley"
author_url: "https://github.com/craigeley"
category: "Utility"
images:
  - "A.png"
  - "B.png"
  - "C.png"
description: "MLB scores, box scores, and standings for the Light Phone III."
---

This is an app for MLB scores, box scores, and standings for the Light Phone III, based on the style of [vandamd](https://github.com/vandamd)'s LightOS tools.

The data comes from a public API, so there is no login required. (And therefore also no MLB.com features, including streaming game audio, etc.)

## Features

- **Scores** - the full slate for any date, with `‹ date ›` arrows to browse
  and a tap on the date to jump back to today. Live games show the inning
  ("Bot 2nd"), finished games the final ("Final/11"), upcoming games the
  start time. Auto-refreshes every 60 seconds while games are live.
- **Box scores** - tap any started game for a box score; you may have to side scroll if a came goes into extra innings. For live games you can see the current count, runners, and outs, which auto-refreshes every 45 seconds while the game is live.
- **Standings** - all six divisions with W-L, games back ("GB"), wild card games
  back ("WCGB"), and the team's record over the last 10 games ("L10").

Everything is drawn in Public Sans on pure black, matching the LightOS look: no images, no color, no scrollbars — just text you can read at a glance.

## Data

All data comes from MLB's free, public Stats API (`statsapi.mlb.com`) — no account, no API key. Per MLB Advanced Media's terms this data is for **personal, non-commercial use only**. This project is not affiliated with or endorsed by Major League Baseball. Major League Baseball data ©MLB Advanced Media, LP.

## Credits

Inspired by the Light Phone community tools from [vandamd](https://github.com/vandamd). Typeface is [Public Sans](https://public-sans.digital.gov/).
