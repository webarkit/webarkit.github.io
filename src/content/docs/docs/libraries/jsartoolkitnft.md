---
title: jsartoolkitNFT
description: ARToolKit5 NFT image tracking compiled to WebAssembly, with TypeScript types.
---

**jsartoolkitNFT** is ARToolKit5's natural-feature-tracking engine compiled to WebAssembly with Emscripten — a lighter jsartoolkit5 with only NFT markerless support. It has TypeScript types and runs in browsers; Node.js support is experimental.

- Repository: [webarkit/jsartoolkitNFT](https://github.com/webarkit/jsartoolkitNFT)
- npm: [`@webarkit/jsartoolkit-nft`](https://www.npmjs.com/package/@webarkit/jsartoolkit-nft)
- Releases: [GitHub releases](https://github.com/webarkit/jsartoolkitNFT/releases)

## Install

```sh
npm i @webarkit/jsartoolkit-nft
```

```js
import { ARToolkitNFT, ARControllerNFT } from '@webarkit/jsartoolkit-nft';
```

| Import | Build |
|---|---|
| `@webarkit/jsartoolkit-nft` | default (UMD in the browser, Node build in Node.js) |
| `@webarkit/jsartoolkit-nft/simd` | WebAssembly SIMD build |
| `@webarkit/jsartoolkit-nft/td` | threaded (pthread) build — experimental, needs [COOP/COEP](/docs/getting-started/hosting/) |
| `@webarkit/jsartoolkit-nft/node` | Node.js build (CommonJS) — experimental |

## The tracking loop

Run tracking in a **Web Worker**, not on the main thread. The typical flow is:

```js
const controller = await new ARControllerNFT(width, height, '/Data/camera_para.dat');
const ar = await controller._initialize();

ar.loadNFTMarker('DataNFT/pinball', (id) => {
  ar.trackNFTMarkerId(id);
});

// for every camera frame (RGBA ImageData):
ar.process(imageData);
```

When the marker is found the controller emits a `getNFTMarker` event with the pose; `lostNFTMarker` when it is lost. See the [ES6 example](/examples/#nft-es6) and its [worker source](https://github.com/webarkit/webarkit.github.io/blob/master/public/js/artoolkitNFT_ES6.worker.js) for a complete browser implementation, including pose smoothing with the One Euro Filter.

## API reference

The full API reference can be generated from the repository with `npm run docs`. Publishing it here is planned.
