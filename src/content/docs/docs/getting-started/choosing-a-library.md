---
title: Choosing a library
description: Which WebARKit package to use for your project.
sidebar:
  order: 2
---

## Where the libraries come from

Most of WebARKit descends from **ARToolKit**, the C library for augmented reality. Knowing the lineage tells you what each package is, and why there are two stacks.

```text
ARToolKit5 / artoolkitX (C)
  |
WebARKitLib (C/C++)
  |-- port to Rust: WebARKitLib-rs
  |
jsartoolkitNFT (WASM + TS)
  |
ARnft (JavaScript library)
```

- **[WebARKitLib](https://github.com/webarkit/WebARKitLib)** is the C/C++ core: a simplified and partly modified version of ARToolKit, adapted for Emscripten and the web. It is not tied to the browser: the same core also builds natively.
- **[jsartoolkitNFT](/docs/libraries/jsartoolkitnft/)** is the Emscripten port of WebARKitLib to JavaScript and TypeScript, a modified and lighter version of jsartoolkit5 with only NFT (natural feature tracking) support.
- **[ARnft](/docs/libraries/arnft/)** is a JavaScript library built on jsartoolkitNFT.
- **[WebARKitLib-rs](/docs/libraries/webarkitlib-rs/)** is a Rust port of WebARKitLib, for native targets and WebAssembly. It belongs to the [next-generation stack](#the-next-generation-stack) below.

## Which one should I use?

| You want to… | Use |
|---|---|
| Put 3D content on an image with as little code as possible | [**ARnft**](/docs/libraries/arnft/) |
| Control the tracking loop yourself (your own renderer, a worker, Node.js) | [**jsartoolkitNFT**](/docs/libraries/jsartoolkitnft/) |
| Build new trackers or CV pipelines in Rust or TypeScript | [**WebARKitLib-rs**](/docs/libraries/webarkitlib-rs/), [**purecv**](/docs/libraries/purecv/), [**jsfeatNext**](/docs/libraries/jsfeatnext/) |
| Compose a scene visually, without code | **WebARKit Studio** (in development) |

## ARnft

A JavaScript library built on jsartoolkitNFT. It creates the video and canvas for you, runs tracking in a Web Worker, smooths the pose and hands it to a renderer ([ARnft-threejs](https://github.com/webarkit/ARnft-threejs) for Three.js). Configuration lives in a JSON file.

## jsartoolkitNFT

The tracking core: an Emscripten port of [WebARKitLib](https://github.com/webarkit/WebARKitLib), compiled to WebAssembly, with TypeScript types. You feed it RGBA frames and get back the marker pose. It ships a SIMD build and an experimental threaded (pthread) build, and runs in browsers (Node.js support is experimental). There are also experimental [Python bindings](/docs/libraries/jsartoolkitnft/#python-bindings), on PyPI as `artoolkitnft`.

## The next-generation stack

[WebARKitLib-rs](/docs/libraries/webarkitlib-rs/) (WebARKitLib ported to Rust), [purecv](/docs/libraries/purecv/) (OpenCV modules in pure Rust) and [jsfeatNext](/docs/libraries/jsfeatnext/) (jsfeat in TypeScript) are the new computer-vision building blocks, and the [webarkit monorepo](https://github.com/webarkit/webarkit) hosts [nft-tracker](/docs/libraries/nft-tracker/), the new NFT tracker with the `.wnft` marker format (pre-release, not on npm yet). They are under active development: great if you want to contribute, not yet the default for production apps.
