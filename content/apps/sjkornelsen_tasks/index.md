---
title: "Tasks"
date_added: 2026-08-23
repo: "https://github.com/sjkornelsen/tasks"
download: "https://github.com/sjkornelsen/tasks/releases"
author: "sjkornelsen"
author_url: "https://github.com/sjkornelsen"
category: "Productivity"
images:
  - "A.png"
  - "B.png"
  - "C.png"
description: "Tasks is a minimal native Todoist client for the Light Phone III."
---

Tasks is a minimal native Todoist client for the Light Phone III. It is written in
Kotlin and Compose and uses the Light SDK's native screen, navigation, theme,
text-input, and action-bar components.

## Features

- Today, Inbox, All Tasks, and project views
- Overdue grouping and bulk rescheduling to today
- Add, complete, reopen, and reschedule actions
- Recursive Todoist-backed subtasks with completed-state display and reopening
- Completed-today history with checked, struck-through task rows
- Swipe calendar and recurring due-date options
- Pull-to-refresh and last-successful-sync status
- Room-backed offline viewing
- Personal API token encrypted with an Android Keystore AES-GCM key

The token is kept separate from the task database. Disconnecting clears both the
encrypted token record and cached account data. Offline mutations and OAuth are
intentionally outside version 0.1.0.

## Connect Todoist

Create or copy a personal API token from your Todoist account's Integrations
settings, then paste it into the connection screen on first launch. Never place a
real token in source files, Gradle configuration, test fixtures, or Git history.

## Todoist API

This version uses the official Todoist API v1 at
`https://api.todoist.com/api/v1`. It sends the personal API token only as a
Bearer authorization header and redacts tokens and authorization headers from
errors.

## Acknowledgements

The interaction design adapts patterns from
[reminders-tool](https://awesome-light.garado.dev/apps/zacksimpson_reminders/), particularly its
native Kotlin `native-rewrite` branch. Todoist remains the source of truth for
tasks and projects.

Tasks is an independent client and is not affiliated with or endorsed by Doist.
