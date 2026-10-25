---
title: jsartoolkitNFT
description: Emscripten port of WebARKitLib, NFT image tracking compiled to WebAssembly, with TypeScript types.
---

**jsartoolkitNFT** is the Emscripten port of [WebARKitLib](https://github.com/webarkit/WebARKitLib) to JavaScript and TypeScript, compiled to WebAssembly: a modified, lighter version of jsartoolkit5 with only NFT (natural feature tracking) markerless support. It has TypeScript types and runs in browsers. Node.js support and the Python bindings are experimental.

- Repository: [webarkit/jsartoolkitNFT](https://github.com/webarkit/jsartoolkitNFT)
- npm: [`@webarkit/jsartoolkit-nft`](https://www.npmjs.com/package/@webarkit/jsartoolkit-nft)
- PyPI: [`artoolkitnft`](https://pypi.org/project/artoolkitnft/) (Python bindings)
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

## Python bindings

The same WebARKitLib C/C++ core is also available from Python, through [pybind11](https://github.com/pybind/pybind11) bindings published on [PyPI](https://pypi.org/project/artoolkitnft/):

```sh
pip install artoolkitnft
```

They expose a high-level `ARControllerNFT` class and a lower-level `artoolkitnft_core` extension module, so you can run NFT marker detection from Python. What works today: loading NFT markers (`.iset`, `.fset`, `.fset3`), KPM detection, AR2 tracking with the pose matrix, and the `getNFTMarker` / `lostNFTMarker` events. There is no live-camera example yet: the bundled one processes a still image.

:::caution
The Python bindings are experimental. The API may change without notice and they are not recommended for production yet.
:::

Wheels for CPython 3.9–3.13 are available for Linux x86_64, macOS on Apple silicon and Windows x86_64. There is no source distribution and no Intel macOS build, so on an unsupported platform `pip` reports "no matching distribution found". To build from source, see the [Python bindings README](https://github.com/webarkit/jsartoolkitNFT/blob/master/python-bindings/README.md).

## API reference

The full API reference can be generated from the repository with `npm run docs`. Publishing it here is planned.
