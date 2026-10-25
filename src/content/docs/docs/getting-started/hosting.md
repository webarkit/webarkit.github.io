---
title: 'Hosting: HTTPS, camera and COOP/COEP'
description: What a server needs to run WebARKit apps — HTTPS, camera permissions and cross-origin isolation for threaded builds.
sidebar:
  order: 3
---

## HTTPS

`getUserMedia` (the camera) only works on **HTTPS** pages or on `localhost`. Any static host with HTTPS works: Netlify, GitHub Pages, Vercel, your own server.

## Camera inside an iframe

If you embed a demo in an `<iframe>`, the parent page must allow the camera:

```html
<iframe src="/my-ar-app/" allow="camera; xr-spatial-tracking; fullscreen"></iframe>
```

## Threaded builds need cross-origin isolation

The threaded (pthread) builds of jsartoolkitNFT use `SharedArrayBuffer`, which browsers only enable on **cross-origin isolated** pages. The page must be served with:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

and every resource it loads from another origin must allow it (CORS or `Cross-Origin-Resource-Policy`). Check it in the console with `self.crossOriginIsolated`.

On Netlify this is a few lines in `netlify.toml` — this is how webarkit.org serves its threaded example:

```toml
[[headers]]
  for = "/examples/ARToolkitNFT_ES6_threading_example*"
  [headers.values]
    Cross-Origin-Opener-Policy = "same-origin"
    Cross-Origin-Embedder-Policy = "require-corp"
```

:::caution
A cross-origin isolated page can't be embedded in a page that isn't, which is why the [examples gallery](/examples/) opens the threaded demo in a new tab.
:::

## JavaScript modules

Some servers send `.mjs` files with the wrong MIME type. Make sure they are served as `application/javascript`.
