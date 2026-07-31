---
title: "Chirp"
date_added: 2026-07-31
repo: "https://github.com/barry7007/LightBirdIdentifier"
download: "https://github.com/barry7007/LightBirdIdentifier/releases"
author: "barry7007"
author_url: "https://github.com/barry7007"
category: "Utility"
light_sdk: false
images:
  - A.png
  - B.png
  - C.png
description: "Identify bird sounds in real time, entirely on the phone. A restyled fork of whoBIRD."
---

LightOS menu lists it as Chirp. Leave it listening and it names what it hears, with the bird's
photo as the one bit of colour in an otherwise black and white app.

It is a fork of [whoBIRD](https://github.com/woheller69/whoBIRD) by woheller69, rebuilt with
Light's own UI components so every screen belongs on the phone. The identification is untouched:
BirdNET running on the device, over 6,000 species, no internet once the model has downloaded.

Everything heard goes into a Collection, a full-bleed photo grid you can open or delete from.
Settings are cut back to the three that matter on a phone you carry for this: location, detection
threshold, and whether to keep the recordings.

GPLv3, like the original. The BirdNET models are CC BY-NC-SA, non-commercial, and download at
first start rather than shipping in the APK. It installs alongside whoBIRD rather than replacing
it.
