#!/usr/bin/env python3
"""
Resolves the raw "Screenshots" field lines from a submission issue into direct image URLs.

Reads submission.json (written by the issue-parsing workflow step), accepts each screenshotLines entry in any of these forms:
  - a plain URL on its own line
  - a markdown image: ![alt](url "optional title")
  - an HTML <img> tag with a src= (or href=, a common typo) attribute

and writes the resolved "screenshots" list back into submission.json
"""

import json
import re

IMG_TAG_RE = re.compile(
    r'<img\b[^>]*?(?:src|href)\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE
)
MD_IMAGE_RE = re.compile(r'!\[[^\]]*\]\(\s*"?([^"\s)]+)"?(?:\s+"[^"]*")?\s*\)')
GITHUB_BLOB_RE = re.compile(r"^https://github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)$")


def extract_url(line: str) -> str:
    line = line.strip()

    html_match = IMG_TAG_RE.search(line)
    if html_match:
        return html_match.group(1).strip()

    md_match = MD_IMAGE_RE.search(line)
    if md_match:
        return md_match.group(1).strip()

    return line


def to_raw_url(url: str) -> str:
    """GitHub "blob" view URLs point at an HTML page, not raw bytes."""
    match = GITHUB_BLOB_RE.match(url)
    if not match:
        return url
    owner, repo, ref, path = match.groups()
    return f"https://raw.githubusercontent.com/{owner}/{repo}/{ref}/{path}"


def main():
    with open("submission.json") as f:
        data = json.load(f)

    data["screenshots"] = [
        to_raw_url(extract_url(line)) for line in data["screenshotLines"]
    ]

    with open("submission.json", "w") as f:
        json.dump(data, f)


if __name__ == "__main__":
    main()
