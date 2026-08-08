---
title: "LightNYCSubway"
date_added: 2026-07-28
repo: "https://github.com/gi-os/BrightTransit"
download: "https://github.com/gi-os/BrightTransit/releases"
author: "gi-os"
author_url: "https://github.com/gi-os"
category: "Navigation"
light_sdk: true
images:
  - A.png
  - B.png
description: "Live New York City subway arrival times for the Light Phone III, read straight from the MTA feeds with no API key and no middle server."
---

LightOS lists it as **Subway Times**. Star the stations you use and the app opens on them,
uptown in one column and downtown in the other, soonest train first. It draws the real
route bullets, so a 6 reads as a 6 rather than a letter in a box.

It reads the MTA GTFS-realtime feeds directly. There is no key to get and no server of mine
in the path. Each station maps to the feeds that serve it, and those are fetched together,
so a feed that fails leaves the rest of the board standing rather than emptying it.

A bundled catalog of 445 stations covers the whole system. Stations are merged by MTA
complex ID, so a transfer station appears once instead of four times. **Near me** sorts by
distance, and the borough chips filter the list.

Built with the Light SDK, in the `tool` module the SDK reserves for it. It asks for network
access, and for location so that **Near me** works.
