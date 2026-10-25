---
title: nft-tracker
description: Natural-feature tracking for planar image targets in TypeScript, with the new .wnft target format. Pre-release, not on npm.
---

**nft-tracker** (`@webarkit/nft-tracker`) tracks a flat image in a camera feed. It lives in the [webarkit monorepo](https://github.com/webarkit/webarkit) and is written **above** a computer-vision contract (`CvBackend`): the caller injects the backend, so it runs on any implementation of it. The reference one is [jsfeatNext](/docs/libraries/jsfeatnext/).

It has three parts:

- the **`.wnft` format**: an in-memory description of a trained target and a codec (`decode` and `encode`) for the files that store it
- **`compile-target`**: a command-line script that turns an image into a `.wnft`
- **`NftTracker`**: a tracker with three states, `LOST`, `DETECT` and `TRACK`

:::note[Pre-release]
It is not published to npm, and its version is the monorepo's release version. You use it from a clone of the repository. The API and the `.wnft` format (currently 0.3) may still change.
:::

- Package: [`packages/nft-tracker`](https://github.com/webarkit/webarkit/tree/master/packages/nft-tracker)
- Repository: [webarkit/webarkit](https://github.com/webarkit/webarkit)
- Design: [ADR-0001](https://github.com/webarkit/webarkit/blob/master/docs/adr/0001-nft-tracker-ts-reference-above-cvbackend.md) and the [`.wnft` format specification](https://github.com/webarkit/webarkit/blob/master/docs/specs/nft-target-format.md)

## Try it

```sh
git clone https://github.com/webarkit/webarkit.git
cd webarkit
npm install   # links the workspace packages together
npm run build
```

Compile an image into a target, with its size in millimetres:

```sh
node packages/nft-tracker/bin/compile-target.mjs examples/images/pinball.jpg \
    -o examples/targets/pinball.wnft --physical-size 210x262.5
```

This script is a development tool of the repository, not part of the package.

## The tracker

```ts
import { NftTracker } from '@webarkit/nft-tracker';

const tracker = new NftTracker(cv, target, K); // cv: the CvBackend, K: camera intrinsics
const result = tracker.process(frame, timestampMs); // frame: a GrayImage
console.log(result.state, result.quality);
if (result.ok) {
  // result.H maps the target's pixels into the frame (3×3, row-major)
}
```

`process` does not throw on a frame it cannot use: check `result.ok`. Every result has a `state` and a `quality` between 0 and 1:

| `state` | Meaning |
|---|---|
| `DETECT` | The pose comes from the detection pipeline: detect, describe, match, homography |
| `TRACK` | The pose comes from tracking the target's patches, without running detection |
| `LOST` | No pose, and `reason` says why |

A frame without a lock runs detection; once it succeeds, the next frames track the target's patches and detect again only if the lock is lost. A target without patches is detected on every frame.

Detection is the expensive step (about 79 ms on the reference device, against a 33 ms frame budget). The tracker owns no worker: run `prepareDetection` and `detectTarget` in a worker of your own, and hand the result back to `process` with the `externalDetection` option.

## See also

- [jsfeatNext](/docs/libraries/jsfeatnext/): the computer-vision backend it is developed against
- [Choosing a library](/docs/getting-started/choosing-a-library/): why the next-generation stack is not the default yet
