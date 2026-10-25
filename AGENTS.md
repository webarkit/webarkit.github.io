# AGENTS.md

Instructions for AI coding agents working in this repository (Claude Code, Codex, GitHub Copilot, Gemini CLI, Cursor, Windsurf, …). Humans can read it too: it is the short version of [Readme.md](Readme.md) and [DESIGN.md](DESIGN.md).

`CLAUDE.md`, `GEMINI.md` and `.github/copilot-instructions.md` only point here. Edit this file, not those.

## What this repo is

Source of [www.webarkit.org](https://www.webarkit.org), the website of **WebARKit**: an open-source toolkit for markerless WebAR (NFT image tracking compiled to WebAssembly, computer-vision libraries in Rust and TypeScript, a node-based studio).

- **Astro 7** builds the site and **Starlight** builds the docs (`/docs`). The output is static; there is no server code.
- The live demos and the tools are plain static apps in `public/` and keep their old URLs.
- The site is hosted on **Netlify**.
- Everything in the repo is in **English**: code, comments, docs, commit messages, PR text.

## Commands

Node.js 22 (the version Netlify builds with).

```bash
npm install
npm run dev       # http://localhost:4321, adds COOP/COEP to the threaded example like Netlify does
npm run build     # static site in dist/
npm run preview   # serves dist/ (does not add COOP/COEP)
```

There is no test or lint script: **`npm run build` is the check.** It must finish without errors before every commit.

## Repository layout

| Path | What |
|---|---|
| `src/pages/` | Site pages: home, blog, examples gallery, tools, project, about, contact, 404 |
| `src/components/`, `src/layouts/` | Shared Astro components and page layouts |
| `src/content/blog/` | Blog posts (Markdown). Schema in `src/content.config.ts` |
| `src/content/docs/docs/` | Documentation (Starlight), served at `/docs/`. The sidebar is set in `astro.config.mjs` |
| `src/data/` | Data for the home page and the gallery: `ecosystem.ts` (packages), `examples.ts` (demos), `site.ts` (links, nav) |
| `src/styles/` | `tokens.css` (colours, fonts, spacing), `global.css`, `starlight.css` (maps the tokens onto the docs theme) |
| `src/lib/` | Helpers (blog list, URLs, dates) |
| `public/examples/`, `public/tools/`, `public/dist/`, `public/js/` | Live demos, tools and the library builds they load, as static files |
| `public/brand/` | Logo files (SVG) and icons |
| `astro.config.mjs` | Astro, Starlight and sitemap setup, plus the dev-server COOP/COEP plugin |
| `netlify.toml` | Build settings, headers (COOP/COEP, MIME types, cache) and redirects from old URLs |

## Git workflow

- **Branch from `dev` and open pull requests against `dev`.** `master` is production: only maintainers merge `dev` into it. Never push to `dev` or `master` directly.
- `dev` should always contain everything that is in `master`. If `origin/dev` is behind `origin/master`, tell the maintainer instead of working around it.
- Name branches `type/short-description`, for example `feat/studio-page` or `fix/mobile-nav`.
- Continuing on an open PR (for example a long-lived feature branch): keep committing to that branch.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`.
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
  - Scope is optional. Useful ones: `home`, `docs`, `examples`, `blog`, `tools`, `netlify`, `brand`, `deps`.
  - Subject: English, imperative, lower case, no final period, about 72 characters at most. Use the body to explain **why**.
  - Breaking changes: `!` after the type or a `BREAKING CHANGE:` footer.
- Make **small commits**, one logical change each, and run `npm run build` before each one.
- PR titles use the same Conventional Commits format. The description says what changed and why, and how it was checked (build, 390 px width, dark and light theme). Add screenshots for visible changes. Open PRs as drafts until they are ready.
- Never force-push a shared branch, merge a PR, or turn on auto-merge unless the maintainer asked for it.

## Hosting: Netlify

- `netlify.toml` sets the build (`npm run build`, publish `dist`, Node 22). Production at www.webarkit.org is published from `master`.
- Every PR gets a **deploy preview** at `https://deploy-preview-<PR number>--webarkit.netlify.app`. Check it before asking for a review.
- Headers, MIME types, cache rules and redirects live in `netlify.toml`.
- **WebAssembly threads need cross-origin isolation.** If you add an example that uses them, update **both** the `[[headers]]` in `netlify.toml` and the `crossOriginIsolation()` plugin in `astro.config.mjs`, and set `isolated: true` in `src/data/examples.ts`.
- **Do not break existing URLs.** Demos and tools in `public/` keep their paths. When a page is removed or moved, add a `301` redirect in `netlify.toml`.
- Hosting stays on Netlify: do not add configuration for other hosts or deploy workflows.

## Design rules

Full decisions are in [DESIGN.md](DESIGN.md). The ones agents break most often:

- Use the **CSS tokens** from `src/styles/tokens.css` (`var(--wk-…)`), never raw hex values.
- Every page works at **390 px wide** and in **both themes** (dark and light). Check both when you change the UI.
- Brand blue `#1E2A78` plus one magenta accent. The wordmark is `WebARKit` (one word, AR in the accent colour).
- Fonts are self-hosted with Fontsource (Sora, IBM Plex Sans, IBM Plex Mono): no requests to Google Fonts or other third-party hosts.
- Buttons are at least 44 px tall. Cards have a 14 px radius, a 1 px border and no shadow.
- The camera in the examples gallery starts only when the visitor presses *Start demo*.

## Content rules

- **Blog posts:** file `src/content/blog/YYYY-MM-DD-slug.md`, URL `/blog/YYYY/MM/DD/slug/`. Front matter: `title`, `description`, `date`, and optionally `tags`, `image`, `author`, `slug`, `draft`. Posts migrated from Jekyll set `slug` to keep their old URL.
- **Docs:** Markdown or MDX under `src/content/docs/docs/`. Tutorials, libraries and tools folders appear in the sidebar automatically; other pages need an entry in `astro.config.mjs`.
- **Examples:** put the demo in `public/examples/`, then add an entry to `src/data/examples.ts`.
- **Claims about packages must be true.** Before writing or editing copy about jsartoolkitNFT, ARnft, WebARKitLib-rs, purecv, jsfeatNext, nft-tracker, Studio or any other package, check the real repo (README, `package.json` or `Cargo.toml`) and the npm or crates.io page. Mark experimental or pre-release features as such. Do not invent features. If something cannot be confirmed, leave it out or ask.

## Dependencies

- Keep **exact versions** in `package.json` (no `^` or `~`) and commit `package-lock.json`.
- Do not add a dependency for something a few lines of code or CSS can do.

## Do not

- Hand-edit the library builds in `public/dist/` and `public/examples/webarkit-testing/dist/`. Replace them with a new build from the upstream repo.
- Commit `node_modules/`, `dist/` (the root one), `.astro/` or `.netlify/`.
- Commit secrets, tokens or personal data.
- Change `LICENSE` or `CODE_OF_CONDUCT.md`.
