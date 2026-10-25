// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

/**
 * Mirrors the COOP/COEP headers of netlify.toml in `astro dev`, so the threaded
 * (pthread) example also works locally. (`astro preview` ignores Vite plugins.)
 * @returns {import('vite').Plugin}
 */
function crossOriginIsolation() {
  /** @param {import('vite').Connect.Server} middlewares */
  const use = (middlewares) =>
    middlewares.use((req, res, next) => {
      const url = req.url ?? '';
      if (url.startsWith('/examples/ARToolkitNFT_ES6_threading_example')) {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      } else if (url.startsWith('/dist/')) {
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
      }
      next();
    });
  return {
    name: 'webarkit:cross-origin-isolation',
    // Block bodies: returning a value from these hooks would register it as a post-middleware.
    configureServer(server) {
      use(server.middlewares);
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.webarkit.org',
  vite: {
    plugins: [crossOriginIsolation()],
  },
  // Old Jekyll URLs used a trailing slash; keep them working.
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'WebARKit Docs',
      description: 'Documentation and tutorials for the WebARKit open-source WebAR toolkit.',
      logo: {
        dark: './src/assets/webarkit-mark-dark.svg',
        light: './src/assets/webarkit-mark-light.svg',
        alt: 'WebARKit',
      },
      favicon: '/favicon.svg',
      // The site has its own 404 page (src/pages/404.astro).
      disable404Route: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/webarkit' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/2jK5sYSKbD' },
      ],
      editLink: {
        baseUrl: 'https://github.com/webarkit/webarkit.github.io/edit/master/',
      },
      customCss: [
        '@fontsource/sora/600.css',
        '@fontsource/sora/700.css',
        '@fontsource/ibm-plex-sans/400.css',
        '@fontsource/ibm-plex-sans/500.css',
        '@fontsource/ibm-plex-sans/600.css',
        '@fontsource/ibm-plex-mono/400.css',
        './src/styles/starlight.css',
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Your first image-tracking app', slug: 'docs/getting-started/first-app' },
            { label: 'Choosing a library', slug: 'docs/getting-started/choosing-a-library' },
            { label: 'Hosting: HTTPS, camera and COOP/COEP', slug: 'docs/getting-started/hosting' },
          ],
        },
        {
          label: 'Tutorials',
          items: [{ autogenerate: { directory: 'docs/tutorials' } }],
        },
        {
          label: 'Libraries',
          items: [{ autogenerate: { directory: 'docs/libraries' } }],
        },
        {
          label: 'Tools',
          items: [{ autogenerate: { directory: 'docs/tools' } }],
        },
      ],
    }),
    sitemap(),
  ],
});
