# awesome-light

Source code for [awesome-light](https://awesome-light.garado.dev), a directory of community-developed apps and tools for the Light Phone.

## Curation
- Most submissions that do not egregiously violate the Light design language or ethos will be accepted.
- **Editor's Pick** - Personally curated by the maintainer ([@garado](https://github.com/garado)). Selections heavily emphasize stability and adherence to the Light design language, and moderately emphasize adherence to ethos.
    - No one person can decide what "going Light" means for everyone. This tier is a best-effort attempt at a useful signal rather than a definition of going Light or a verdict on an app's quality and value.
    - Editor's Pick selections must be thoroughly manually tested, so selections may lag behind submissions.
- **Light Approved** - The highest bar. These tools have been blessed by Light.

## Developing

### Building locally

The site is built using the [Hugo](https://gohugo.io/) static site generator (v0.152.2).

To build locally:

```sh
git clone https://github.com/garado/awesome-light.git
cd awesome-light
hugo server
```

### Deployment

The site is rebuilt and redeployed on every commit.

The site will automatically rebuild with the latest release information for all apps once per day at 09:00 UTC.
