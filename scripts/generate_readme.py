#!/usr/bin/env python3
"""
Regenerate README.md from the front matter of content/apps/*/index.md.

The static parts of the README (title, blurb, note, Links section) live in
scripts/readme_template.md and are left untouched. This script only fills
in the <!-- TOC --> and <!-- APPS --> markers.

Usage:
    python3 scripts/generate_readme.py [--check]

    --check   Prints if README.md needs to be updated. (exits 1)
"""

import argparse
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
APPS_DIR = REPO_ROOT / "content" / "apps"
TEMPLATE_PATH = REPO_ROOT / "scripts" / "readme_template.md"
OUTPUT_PATH = REPO_ROOT / "README.md"

# for building raw.githubusercontent.com links for locally-stored hero images
GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "garado/awesome-light")
GITHUB_BRANCH = os.environ.get("GITHUB_REF_NAME", "hugo")

CATEGORY_ORDER = [
    "General",
    "Launchers",
    "Music/Audio",
    "Photos",
    "Productivity",
    "Utility",
    "Navigation",
    "Entertainment",
    "Keyboard",
]

TOC_MARKER = "<!-- TOC -->"
APPS_MARKER = "<!-- APPS -->"

FRONT_MATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
KV_RE = re.compile(r"^(\w+):\s*(.*)$")
LIST_ITEM_RE = re.compile(r"^\s+-\s+(.*)$")


def _unquote(value):
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def parse_front_matter(text, source):
    match = FRONT_MATTER_RE.match(text)
    if not match:
        raise ValueError(f"{source}: missing front matter")

    data = {}
    key = None
    for line in match.group(1).splitlines():
        if not line.strip():
            continue

        list_item = LIST_ITEM_RE.match(line)
        if list_item and key:
            data.setdefault(key, []).append(_unquote(list_item.group(1)))
            continue

        kv = KV_RE.match(line)
        if kv:
            key, value = kv.group(1), kv.group(2).strip()
            if value == "":
                data[key] = []  # list items follow on subsequent lines
            elif value.lower() in ("true", "false"):
                data[key] = value.lower() == "true"
            else:
                data[key] = _unquote(value)

    return data


def load_apps():
    apps = []
    for app_dir in sorted(APPS_DIR.iterdir()):
        index = app_dir / "index.md"
        if not index.is_file():
            continue
        fm = parse_front_matter(index.read_text(), index)
        for required in ("title", "repo", "category", "description"):
            if required not in fm:
                raise ValueError(f"{index}: missing required field '{required}'")
        fm["_slug"] = app_dir.name
        apps.append(fm)
    return apps


def hero_image_url(app):
    hero_path = APPS_DIR / app["_slug"] / "hero.png"
    if hero_path.is_file():
        return (
            f"https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}"
            f"/content/apps/{app['_slug']}/hero.png"
        )

    images = app.get("images") or []
    if not images:
        return None
    image = images[0]
    if image.startswith("http://") or image.startswith("https://"):
        return image
    return (
        f"https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}"
        f"/content/apps/{app['_slug']}/{image}"
    )


def slugify(heading):
    slug = re.sub(r"[^\w\- ]", "", heading.lower())
    return slug.strip().replace(" ", "-")


def render_app(app):
    title = app["title"]
    repo = app["repo"]

    heading = f"### [{title}]({repo})"
    if app.get("author_url"):
        heading += f" ([{app['author']}]({app['author_url']}))"

    lines = [heading, "", app["description"]]

    image = hero_image_url(app)
    if image:
        lines.append("")
        lines.append(
            f'<a href="{repo}" target="_blank" rel="noopener">'
            f'<img alt="{title}" src="{image}" />'
            f"</a>"
        )

    return "\n".join(lines)


def group_by_category(apps):
    by_category = {}
    for app in apps:
        by_category.setdefault(app["category"], []).append(app)

    categories = list(CATEGORY_ORDER)
    for category in sorted(by_category):
        if category not in categories:
            categories.append(category)

    return [(c, by_category[c]) for c in categories if c in by_category]


def render_readme():
    apps = load_apps()
    grouped = group_by_category(apps)

    toc_lines = ["- [Links](#links)"]
    section_blocks = []

    for category, cat_apps in grouped:
        toc_lines.append(f"- [{category}]({'#' + slugify(category)})")
        cat_apps.sort(key=lambda a: a["title"].lower())

        block = [f"## {category}", ""]
        for app in cat_apps:
            block.append(render_app(app))
            block.append("")
        section_blocks.append("\n".join(block).rstrip())

    toc = "## Table of Contents\n\n" + "\n".join(toc_lines)
    apps_body = "\n\n".join(section_blocks)

    template = TEMPLATE_PATH.read_text()
    if TOC_MARKER not in template or APPS_MARKER not in template:
        raise ValueError(
            f"{TEMPLATE_PATH} must contain both {TOC_MARKER} and {APPS_MARKER}"
        )

    output = template.replace(TOC_MARKER, toc).replace(APPS_MARKER, apps_body)
    if not output.endswith("\n"):
        output += "\n"
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="exit 1 if README.md would change, without writing it",
    )
    args = parser.parse_args()

    output = render_readme()

    if args.check:
        current = OUTPUT_PATH.read_text() if OUTPUT_PATH.is_file() else ""
        if current != output:
            print(f"{OUTPUT_PATH.relative_to(REPO_ROOT)} is out of date", file=sys.stderr)
            sys.exit(1)
        print(f"{OUTPUT_PATH.relative_to(REPO_ROOT)} is up to date")
        return

    OUTPUT_PATH.write_text(output)
    print(f"Wrote {OUTPUT_PATH.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
