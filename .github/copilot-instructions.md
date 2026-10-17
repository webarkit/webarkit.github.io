# Copilot instructions

This repo is the source of www.webarkit.org: an **Astro 7** + **Starlight** static site (docs at `/docs`), hosted on **Netlify**. The full instructions are in [AGENTS.md](../AGENTS.md); the design decisions are in [DESIGN.md](../DESIGN.md). The essentials:

- **Branches and PRs:** branch from `dev` and open PRs against `dev`. `master` is production. Never push to either directly.
- **Commits and PR titles:** [Conventional Commits](https://www.conventionalcommits.org/) (`feat(home): add studio teaser`). Small commits, English, imperative, lower case.
- **Check:** `npm run build` must pass with no errors (there is no test or lint script). Node.js 22.
- **Language:** everything in the repo is in English (code, comments, docs, commits, PR text).
- **Hosting:** Netlify. Headers and redirects are in `netlify.toml`. Do not break existing URLs: demos and tools in `public/` keep their paths, and removed pages get a 301 redirect. An example that uses WebAssembly threads also needs the COOP/COEP headers in `netlify.toml` and in the plugin in `astro.config.mjs`.
- **UI:** use the CSS tokens in `src/styles/tokens.css` (`var(--wk-…)`), never raw hex values. Every page must work at 390 px wide and in both dark and light themes. Fonts are self-hosted (Fontsource), with no third-party requests.
- **Content:** blog posts are Markdown in `src/content/blog/` (`YYYY-MM-DD-slug.md`); docs are in `src/content/docs/docs/`. Claims about WebARKit packages must match the real repos (README, `package.json` or `Cargo.toml`); mark experimental or pre-release features as such.
- **Dependencies:** exact versions in `package.json` (no `^` or `~`).
