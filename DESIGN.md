# WebARKit website — design notes

Decisions taken for the 2026 redesign of www.webarkit.org, and the rules to keep the site consistent.
Visual mockups: the "webarkit.org redesign" canvas (home dark/light, examples gallery, logo proposals A–D2).

## Direction

- **Audience, in order:** web developers who want to add image tracking → contributors (Rust / WASM / CV) → artists and creators (through Studio).
- **References:** three.js (examples gallery: list on the left, live demo on the right) and ComfyUI (dark UI, node graphs).
- **Language:** English for everything on the site and in the repository.
- **Hosting:** Netlify (unchanged).

## Stack

- **Astro** for the site, **Starlight** for `/docs` (search, sidebar, dark/light, edit links).
- Demos and tools stay **static apps** in `public/` with their old URLs; Astro only wraps the tool pages and builds the gallery around them.
- Fonts are **self-hosted** with Fontsource (no requests to Google).
- Old Jekyll URLs are kept (blog permalinks `/blog/YYYY/MM/DD/slug/`, `/feed.xml`, `/tools/...`, `/examples/*.html`); removed pages redirect in `netlify.toml`.

## Logo — proposal D2a

A translucent cube with a **W** inside, floating above an image target with tracking corners. It tells the core idea — a virtual object anchored on a tracked image — and the W ties it to the name. It came from a sketch made with Gemini, redrawn on an isometric grid.

Files in `public/brand/`:

| File | Use |
|---|---|
| `webarkit-logo-dark.svg` / `-light.svg` | Full symbol (cube + target), for large sizes: social cards, hero, README |
| `webarkit-mark-dark.svg` / `-light.svg` | Flat cube only, for small sizes (header, docs) |
| `webarkit-mark-white.svg` | One-colour outline, for print, stamps, merch |
| `/favicon.svg`, `icon-192/512.png`, `apple-touch-icon.png` | Cube on a brand-blue tile |
| `/og/webarkit-og.png` | Default social card (1200×630) |
| `social/webarkit-avatar-1024.png` | Profile picture for the GitHub organization (cube on brand blue, safe for round crops) |
| `social/webarkit-avatar-400.png` | Same, at the size X/Twitter asks for |
| `social/webarkit-x-header-1500x500.png` | X/Twitter header; content sits on the right, clear of the profile picture |

Rules:

- The **wordmark** is `WebARKit`, one word, set in Sora Bold, with **AR** in the accent colour. Not "WebAR Kit", not three colours.
- Below 48 px use the **flat mark**, never the translucent one (gradients turn to mud at small sizes).
- The translucent version needs room: at least the cube's width of clear space around it.

## Colour

Brand blue `#1E2A78` (kept from the old site) plus **magenta** as the single accent. Magenta marks what is "tracked" or "AR": the AR in the wordmark, tracking outlines, active states, the current nav item.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--wk-brand` | `#1E2A78` | `#1E2A78` | Primary buttons, community band, favicon tile |
| `--wk-accent` | `#E0559A` | `#B8336A` | AR, tracking, focus rings, highlights |
| `--wk-bg` | `#090C1A` | `#EEF1FB` | Page background |
| `--wk-surface` | `#10152B` | `#FFFFFF` | Cards |
| `--wk-text` | `#E8EBF7` | `#0F1638` | Body text |
| `--wk-link` | `#8C9BFF` | `#2F3FB8` | Links |

All values live in `src/styles/tokens.css` (site) and `src/styles/starlight.css` (docs). Use the tokens, not raw hex values.

- Both themes are supported. The theme follows the OS until the visitor picks one; the choice is stored under the same key the docs use (`starlight-theme`), so site and docs always match.
- Camera-feed panels (demo stages, the hero viewport) stay dark in both themes: they represent a camera image.
- The accent has two values because `#E0559A` is too light on white; `#B8336A` passes contrast on light backgrounds.

## Type

- **Sora** 600/700 — headings and the wordmark.
- **IBM Plex Sans** 400/500/600 — body.
- **IBM Plex Mono** 400/500 — code, labels, eyebrows ("01 / ECOSYSTEM"), package names.

## Layout and components

- Content width 1280 px, 24 px gutters; sections separated by a 1 px line, alternating `--wk-bg` / `--wk-bg-alt`.
- Cards: 14 px radius, 1 px border, no shadows.
- Buttons ≥ 44 px tall. Primary = brand blue; secondary = outline.
- Every page works at phone width; the header nav collapses into a menu below 820 px.

## Examples gallery

- The camera starts **only** when the visitor presses *Start demo* (the demo loads in an iframe with `allow="camera"`).
- Demos that use WebAssembly threads (`isolated: true` in `src/data/examples.ts`) open in a new tab, because a cross-origin isolated page can't be embedded.
- Each demo shows a QR code (generated at build time) to open it on a phone, and links to its printable marker.

## Open items

- Real screenshots or short looping clips for the example cards (now: the marker image with a tracking frame).
- Publish the generated API reference of jsartoolkitNFT and ARnft under `/docs`.
- Docs pages for WebARKitLib-rs, purecv, jsfeatNext and the new nft-tracker when they stabilise.
- A Studio page once webarkit-studio has a public demo.
- A first new blog post to announce the redesign.
