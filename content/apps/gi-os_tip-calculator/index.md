---
title: "Tip Calculator"
date_added: 2026-08-06
repo: "https://github.com/gi-os/BrightTip"
download: "https://github.com/gi-os/BrightTip/releases"
author: "gi-os"
author_url: "https://github.com/gi-os"
category: "Utility"
light_sdk: false
images:
  - A.png
  - B.png
  - C.png
description: "A tip calculator for the Light Phone III, with an optional AI receipt splitter for group meals."
---

The Tip tab works offline. Punch the bill into the keypad, pick a preset or type your own percentage, and read the tip and the total.

The Split tab is for a table. Photograph the receipt, and the items come back as a list you assign to people by tapping. Tax and tip are shared out in proportion, and each person gets their own total.

Every amount is held in cents, never as a decimal, and tax and tip are apportioned by largest remainder. Per-person totals add back up to the bill exactly. I checked that against 20,000 random bills.

Splitting needs an Anthropic API key, which you scan in from a QR on a page that runs entirely in your browser. The key never leaves the phone after that. Tipping needs no key and no network.
