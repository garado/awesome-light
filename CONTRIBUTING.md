# Contributing to awesome-light

Thanks for contributing to the Light community!

## Submission guidelines

1. **Apps should make an effort to match the Light aesthetic as closely as possible.** This doesn't mean just black-and-white. This means adhering to the design language as well.

2. **Apps should preferably match the Light ethos as closely as possible.** Everyone's definition of going Light is different so it's difficult to draw a line, but it's worth a reminder.

## Submission process

- All entries should go in `content/apps`. Create a new directory there.
- The directory name format is `${author-name}_${app-name}`.
- In that directory, create a new file `index.md`. Data for your app should be entered as YAML frontmatter following the format below. (Use existing entries as a reference.)
- If you would like to preview your submission locally before submitting, refer to the "Building locally" section of the README.

### Empty template

```yaml
---
title: 
date_added: 
repo: 
download: 
author: 
author_url: 
category: 
light_sdk:
images:
  - 
description: 
---

```

### Template description

For YAML frontmatter fields:

| Field | Description | Example |
|---|---|---|
| `title` | Name of your app | `"Light Keyboard"` |
| `date_added` | Today's date, to enable sorting by recently added on the site | `2026-07-26` |
| `repo` | Link to your repo | `"https://github.com/adam-weber/light-keyboard"` |
| `download` | Link to your Releases page | `"https://github.com/adam-weber/light-keyboard/releases"` |
| `author` | Your Github username | `"adam-weber"` |
| `author_url` | Link to your Github profile | `"https://github.com/adam-weber"` |
| `category` | One of: `Communication`, `Entertainment`, `General`, `Keyboard`, `Launchers`, `Music/Audio`, `Navigation`, `Photos`, `Productivity`, `Utility` | `"Keyboard"` |
| `images` | Screenshots of your app, in the order they should be displayed. The first image is used as the cover/thumbnail; try to pick one which will look best in the "Grid" view of the site.<br><br>Images can be added to this repo directly in your PR (preferred), or you can use external links here. | `- A.png`<br>`- B.png`<br>`- C.png` |
| `description` | Short, one-sentence description of your app for the 'List' view of the site. | - |
| `light_sdk` | Set to `true` if your app is built with the Light SDK. Set to `false` or omit this field otherwise. | `true` |

The `editor_pick` field is present for some entries in awesome-light. **In your PR, it should be omitted**. This field is manually set by awesome-light maintainers.

Below the frontmatter, you can optionally put a longer-form description with more screenshots, features, information etc. that will display in the popup for your app. Use this section to show off more cool stuff! If this is left blank, the popup will default to displaying your short description from the frontmatter.
