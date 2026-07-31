---
title: "Sanntid"
date_added: 2026-07-31
repo: "https://github.com/barry7007/LightNorwayTransit"
download: "https://github.com/barry7007/LightNorwayTransit/releases"
author: "barry7007"
author_url: "https://github.com/barry7007"
category: "Navigation"
light_sdk: true
images:
  - A.png
  - B.png
  - C.png
description: "Departure times for any public transport stop in Norway, read straight from Entur's national feeds with no API key."
---

LightOS menu lists it as Sanntid, the Norwegian word on the departure boards ("live departure
time"). It opens on the stop you used last. Star the stops you use and they sit at the top of
the chooser.

It reads Entur's national APIs directly, so it covers every stop in Norway rather than one
city: bus, tram, metro, train, coach and ferry, with realtime delays as well as a symbol
for disruptions. No key to get, and no server of mine in the path.

Norwegian by default, English in settings; stop names come from Entur and stay Norwegian
either way. "Nær meg" (near me) sorts nearby stops by distance, and needs a one-off adb grant,
since LightOS does not hand tools location yet.
