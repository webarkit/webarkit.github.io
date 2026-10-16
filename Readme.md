[![Netlify Status](https://api.netlify.com/api/v1/badges/bd7e62f3-1f14-425c-9773-44183617924f/deploy-status)](https://app.netlify.com/sites/webarkit/deploys)

# webarkit.github.io

Source of [www.webarkit.org](https://www.webarkit.org), the official WebARKit website, hosted on [Netlify](https://www.netlify.com/).

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) (docs at `/docs`).
Design decisions, tokens and logo usage are in [DESIGN.md](DESIGN.md).

Join us on [Discord](https://discord.gg/2jK5sYSKbD), or follow [@WebarkitO](https://twitter.com/WebarkitO) and [webarkit on Facebook](https://www.facebook.com/webarkit).

## Develop

Requires Node.js 22.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output in dist/
npm run preview   # serve dist/
```

`npm run dev` adds the COOP/COEP headers to the threaded jsartoolkitNFT example, like Netlify does, so it works locally too (`npm run preview` doesn't). To test the camera on a phone you need HTTPS: `npm run dev -- --host` and a tunnel (or a local certificate).

## Where things are

| Path | What |
|---|---|
| `src/pages/` | Site pages: home, blog, examples gallery, tools, project, about, contact |
| `src/content/blog/` | Blog posts (Markdown). File name `YYYY-MM-DD-slug.md`, URL `/blog/YYYY/MM/DD/slug/` |
| `src/content/docs/docs/` | Documentation (Starlight), served at `/docs/` |
| `src/data/` | Data for the home page and gallery: `ecosystem.ts` (packages), `examples.ts` (demos), `site.ts` (links, nav) |
| `src/styles/tokens.css` | Colours, fonts and spacing for the site; `starlight.css` maps them onto the docs theme |
| `public/examples/`, `public/tools/`, `public/dist/`, `public/js/` | The live demos and tools as static files. They keep their old URLs |
| `public/brand/` | Logo files (SVG) and icons |
| `netlify.toml` | Build settings, COOP/COEP headers, redirects from old URLs |

## Add a blog post

Create `src/content/blog/2026-10-20-my-post.md`:

```md
---
title: My post
description: One or two sentences for the blog list, RSS and social cards.
date: 2026-10-20
tags: [release, jsartoolkitNFT]
image: /blog/my-post/cover.jpg # optional, file in public/
---

Text in Markdown.
```

## Add an example

Put the demo in `public/examples/`, then add an entry to `src/data/examples.ts`. Set `isolated: true` if it uses WebAssembly threads (it then opens in a new tab), and add its path to the COOP/COEP headers in `netlify.toml` and `astro.config.mjs`.
