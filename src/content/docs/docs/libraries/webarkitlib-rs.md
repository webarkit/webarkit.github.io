---
title: WebARKitLib-rs
description: A memory-safe Rust port of WebARKitLib, with the full NFT pipeline, for native targets and WebAssembly.
---

**WebARKitLib-rs** is a memory-safe Rust port of [WebARKitLib](https://github.com/webarkit/WebARKitLib), the C/C++ core behind [jsartoolkitNFT](/docs/libraries/jsartoolkitnft/). It does square-marker detection and pose estimation, and the whole **NFT** pipeline in pure Rust: KPM detection, AR2 tracking and marker generation, with no C++ toolchain. It runs natively and in the browser through WebAssembly.

:::caution[Work in progress]
The core detection and the NFT pipeline work, but the project is still heading to 1.0: broader API docs, multi-marker support and a dedicated KPM benchmark are not there yet. For an app you ship today, [ARnft and jsartoolkitNFT](/docs/getting-started/choosing-a-library/) are the safer choice.
:::

- Repository: [webarkit/WebARKitLib-rs](https://github.com/webarkit/WebARKitLib-rs)
- crates.io: [`webarkitlib-rs`](https://crates.io/crates/webarkitlib-rs)
- npm (WebAssembly build): [`@webarkit/webarkitlib-wasm`](https://www.npmjs.com/package/@webarkit/webarkitlib-wasm)
- Releases: [GitHub releases](https://github.com/webarkit/WebARKitLib-rs/releases)

## Install

In a Rust project:

```toml
[dependencies]
webarkitlib-rs = "0.8"
```

The default backend is pure Rust, so a plain build needs no C++ compiler. The original C++ matcher is still there behind the opt-in `ffi-backend` feature, but it is only used to cross-check the Rust one.

In a web app:

```sh
npm install @webarkit/webarkitlib-wasm
```

The package ships two engines with the same API: the standard one (`@webarkit/webarkitlib-wasm`) and a faster one that needs WebAssembly SIMD (`@webarkit/webarkitlib-wasm/simd`).

## The handles

In the WebAssembly package you work with three handles:

| Handle | Purpose | Marker data |
|---|---|---|
| `WasmARHandle` | Square pattern and barcode markers: detection and pose | `.patt` file, or a matrix-code type |
| `WasmKpmHandle` | **NFT detection**: finds a natural-feature marker and returns its first pose | `.fset3` |
| `WasmNFTHandle` | **NFT tracking**: refines the pose frame after frame | `.iset` and `.fset` |

For NFT you use the last two together: KPM finds the marker, AR2 tracking keeps it cheaply. It's the same split as in the [FeatureSet Display](/docs/tools/featureset-display/) legend, where `.fset3` holds the detection points and `.fset` the tracking points.

## NFT in the browser

A minimal detect-then-track setup, with a marker made by the [NFT Marker Creator](/docs/tools/nft-marker-creator/):

```js
import init, { WasmKpmHandle, WasmNFTHandle } from '@webarkit/webarkitlib-wasm';

await init(); // instantiate the WebAssembly module

const bytes = async (url) => new Uint8Array(await (await fetch(url)).arrayBuffer());
const cameraParam = await bytes('assets/camera_para.dat');
const [fset3, iset, fset] = await Promise.all(
  ['pinball.fset3', 'pinball.iset', 'pinball.fset'].map((file) => bytes(`assets/${file}`)),
);

const width = 640;
const height = 480;

const kpm = new WasmKpmHandle(cameraParam, width, height);
kpm.load_ref_data(fset3);

const nft = new WasmNFTHandle(cameraParam, width, height);
nft.load_nft_marker(iset, fset);

// For every camera frame; `rgba` is a width*height*4 buffer, for example
// ctx.getImageData(0, 0, width, height).data
const found = kpm.detect(rgba); // null, or { pose, page, error }
if (found) {
  nft.set_initial_pose(found.pose);
  const tracked = nft.track(rgba, width, height); // { found, matrix, error, cont_num }
}
```

The usual loop runs the cheap `track()` while it holds and goes back to `detect()` when `found` turns false. Poses are 12 floats, a 3×4 row-major `[R | t]` matrix with the translation in millimetres. The [WebAssembly integration guide](https://github.com/webarkit/WebARKitLib-rs/blob/main/docs/wasm-js-integration.md) has the full loop, the pose layout, TypeScript usage and memory management.

## Native Rust

Two examples ship with the repository:

```sh
cargo run --example simple
```

detects a marker in a sample image and prints the pose, and

```sh
cargo run --release --example nft_marker_gen -- --input image.jpg --output marker --dpi 220
```

generates the three NFT marker files (`.iset`, `.fset`, `.fset3`), compatible with ARnft and the Nft-Marker-Creator-App. Always use `--release`: debug builds are 5 to 10 times slower.

## See also

- [Choosing a library](/docs/getting-started/choosing-a-library/): where WebARKitLib-rs comes from and how it relates to the other packages
- [purecv](/docs/libraries/purecv/): the computer-vision primitives it is meant to run on
