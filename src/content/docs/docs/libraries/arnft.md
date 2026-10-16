---
title: ARnft
description: A small JavaScript library for WebAR with NFT markers, built on jsartoolkitNFT.
---

**ARnft** builds on [jsartoolkitNFT](/docs/libraries/jsartoolkitnft/): it creates the video and canvas, runs tracking in a Web Worker, smooths the pose with the One Euro Filter, and renders with [ARnft-threejs](https://github.com/webarkit/ARnft-threejs). It supports SIMD and compressed `.zft` markers.

- Repository: [webarkit/ARnft](https://github.com/webarkit/ARnft)
- npm: [`@webarkit/ar-nft`](https://www.npmjs.com/package/@webarkit/ar-nft)

## Install

```sh
npm i @webarkit/ar-nft
```

```js
import arnft from '@webarkit/ar-nft';
const { ARnft } = arnft;
```

Or with an import map, from a [release](https://github.com/webarkit/ARnft/releases):

```html
<script type="importmap">
  {
    "imports": {
      "three": "./js/third_party/three.js/three.module.min.js",
      "arnft-threejs": "./js/ARnftThreejs.mjs",
      "arnft": "./dist/ARnft.mjs"
    }
  }
</script>
```

For the SIMD build import `dist/ARnft.simd.mjs` instead of `dist/ARnft.mjs`.

## Configuration

`ARnft.init()` reads a JSON file. Unknown keys are ignored, so double-check the names.

| key | meaning |
|---|---|
| `cameraPara` | camera calibration file, a path from the site root (e.g. `examples/Data/camera_para.dat`) or an absolute URL |
| `addPath` | optional folder prefixed to `cameraPara` and marker paths |
| `container` | `create: true` lets ARnft create container, video and canvas; with `false` provide them (`containerName`, `canvasName`, and a `<video id="video">`) |
| `loading` | loading screen: `create`, `logo` (`src`, `alt`), `loadingMessage` |
| `stats` | `createHtml: true` adds stats panels |
| `oef` | smooth the pose with the One Euro Filter |
| `videoSettings` | `width`/`height` `{min, max}`, `facingMode`, `targetFrameRate`, `rotatePortrait`, `cameraLabel` |

## Examples

Start from the [first app guide](/docs/getting-started/first-app/), then see the [ARnft examples](https://github.com/webarkit/ARnft/tree/master/examples): glTF models, animated models, images, video, multiple markers, React.
