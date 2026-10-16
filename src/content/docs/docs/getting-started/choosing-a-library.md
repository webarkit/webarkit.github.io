---
title: Choosing a library
description: Which WebARKit package to use for your project.
sidebar:
  order: 2
---

| You want to… | Use |
|---|---|
| Put 3D content on an image with as little code as possible | [**ARnft**](/docs/libraries/arnft/) |
| Control the tracking loop yourself (your own renderer, a worker, Node.js) | [**jsartoolkitNFT**](/docs/libraries/jsartoolkitnft/) |
| Build new trackers or CV pipelines in Rust or TypeScript | **WebARKitLib-rs**, **purecv**, **jsfeatNext** |
| Compose a scene visually, without code | **WebARKit Studio** (in development) |

## ARnft

A JavaScript library built on jsartoolkitNFT. It creates the video and canvas for you, runs tracking in a Web Worker, smooths the pose and hands it to a renderer ([ARnft-threejs](https://github.com/webarkit/ARnft-threejs) for Three.js). Configuration lives in a JSON file.

## jsartoolkitNFT

The tracking core: ARToolKit5's NFT tracker compiled to WebAssembly, with TypeScript types. You feed it RGBA frames and get back the marker pose. It ships SIMD and threaded (pthread) builds, and runs in browsers and Node.js.

## The next-generation stack

[WebARKitLib-rs](https://github.com/webarkit/WebARKitLib-rs), [purecv](https://github.com/webarkit/purecv) and [jsfeatNext](https://github.com/webarkit/jsfeatNext) are the new computer-vision building blocks, and the [webarkit monorepo](https://github.com/webarkit/webarkit) hosts the new NFT tracker with the `.wnft` marker format. They are under active development: great if you want to contribute, not yet the default for production apps.
