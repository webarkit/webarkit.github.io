---
title: jsfeatNext
description: "A TypeScript port of jsfeat: FAST and ORB features, matching, homography and pose estimation, with type definitions."
---

**jsfeatNext** is a TypeScript port of [jsfeat](https://github.com/inspirit/jsfeat), a JavaScript computer-vision library, made for WebARKit. It covers the natural-feature pipeline from end to end, in plain JavaScript with no WebAssembly:

FAST or YAPE detection → ORB descriptors → brute-force Hamming matching → GMS filtering → RANSAC homography → camera pose `(R, t)`

Its algorithms are checked against the original jsfeat with an automated test suite, every public class and method has TSDoc comments, and it comes as both a UMD and an ES module build.

- Repository: [webarkit/jsfeatNext](https://github.com/webarkit/jsfeatNext)
- npm: [`@webarkit/jsfeat-next`](https://www.npmjs.com/package/@webarkit/jsfeat-next), current version 1.1.0
- Releases: [GitHub releases](https://github.com/webarkit/jsfeatNext/releases)
- TypeScript examples: [jsfeatNext-examples](https://github.com/webarkit/jsfeatNext-examples)

## Install

```sh
npm install @webarkit/jsfeat-next
```

The package ships `dist/` and the type declarations already built. Use the npm package for production installs: installing from a git reference builds it on install, and needs the dev dependencies.

## Use

```js
import jsfeatNext from '@webarkit/jsfeat-next';

// The algorithm modules are singletons: call them directly, no `new`.
const src = new jsfeatNext.matrix_t(width, height, jsfeatNext.U8_t | jsfeatNext.C1_t);
jsfeatNext.imgproc.grayscale(rgbaPixelData, width, height, src);
```

In a plain page, load the UMD build and use the `jsfeatNext` global:

```html
<script src="dist/jsfeatNext.js"></script>
<script>
  const m = new jsfeatNext.matrix_t(320, 240, jsfeatNext.U8_t | jsfeatNext.C1_t);
</script>
```

The modules are attached to the `jsfeatNext` namespace: `imgproc`, `fast_corners`, `yape`, `yape06`, `orb`, `bfmatcher`, `gms`, `homography2d`, `affine2d`, `pose_estimator`, `optical_flow_lk`, `linalg`, `matmath` and the data structures such as `matrix_t` and `keypoint_t`. `pose_estimator` is a constructor (`new jsfeatNext.pose_estimator(K)`), because it keeps the inverted camera intrinsics.

The repository has runnable camera demos for most modules (blur, Canny, FAST, YAPE, optical flow, ORB matching with a reference image, warps). The ES module demos must be served over HTTP.

## Limits

- Not every class of the original jsfeat is ported yet: the Haar-cascade and BBF object detectors are missing.
- The `transform` module takes `matrix_t` arguments where the original used raw arrays.
- Coming from 0.8 or older? The `jsfeatNext.jsfeatNext` double namespace and `new jsfeatNext.imgproc()` were removed in 0.9: see the [migration guide](https://github.com/webarkit/jsfeatNext/blob/main/docs/migration-0.9.md).
- A hosted API reference is not available yet; it is tracked in [webarkit.github.io#49](https://github.com/webarkit/webarkit.github.io/issues/49). Meanwhile `npm run docs` builds it locally.

## See also

- [nft-tracker](/docs/libraries/nft-tracker/): the tracker that uses jsfeatNext as its computer-vision backend
- [Choosing a library](/docs/getting-started/choosing-a-library/)
