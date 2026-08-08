---
title: "LightSolitaire"
date_added: 2026-07-28
repo: "https://github.com/gi-os/BrightSolitaire"
download: "https://github.com/gi-os/BrightSolitaire/releases"
author: "gi-os"
author_url: "https://github.com/gi-os"
category: "Entertainment"
light_sdk: true
images:
  - A.png
description: "Klondike solitaire for the Light Phone III, with a one-bit deck that carries suit color as shape."
---

LightOS lists it as **Solitaire**. Klondike, draw one, unlimited redeals.

The panel is black and white, so shape carries the suit color instead of hue. Spades and
clubs are drawn filled, hearts and diamonds as outlines. The alternating-color rule stays
readable at a glance and needs no legend.

Tap a card and it goes where it belongs, or drag it yourself. **Hint** ranks the available
moves and shows you one. Two different messages can appear when a game stalls, and the
difference is deliberate: **No moves left** is exact, and **This deal can't be won** is a
proof, shown only when the proof is cheap enough for a phone to finish. The app never claims
a deal is lost when it is not.

The game saves after every move, so leaving and coming back drops you on the same board.
Win, and the cards waterfall off the foundations.

Built with the Light SDK, in the `tool` module the SDK reserves for it. It asks for no
permissions at all.
