---
title: purecv
description: "A pure-Rust reimplementation of OpenCV modules: memory-safe, SIMD-accelerated, from WebAssembly to no_std."
---

**PureCV** reimplements the `core`, `imgproc`, `features2d`, `video` and `calib3d` modules of OpenCV in pure Rust. There is no C++ binding and no C++ toolchain: it is memory-safe, can use several cores and SIMD, and runs from desktops and WebAssembly down to `no_std` microcontrollers.

:::caution[Work in progress]
Most of the five modules are implemented, but the library is not stable yet and bugs may occur. It is being optimised and extended all the time.
:::

- Repository: [webarkit/purecv](https://github.com/webarkit/purecv)
- crates.io: [`purecv`](https://crates.io/crates/purecv)
- npm (WebAssembly build): [`@webarkit/purecv-wasm`](https://www.npmjs.com/package/@webarkit/purecv-wasm)
- Releases: [GitHub releases](https://github.com/webarkit/purecv/releases)

## Install

In a Rust project (the minimum supported Rust version is 1.88):

```toml
[dependencies]
purecv = "0.11"
```

Cargo features:

| Feature | Default | What it does |
|---|---|---|
| `std` | yes | Standard library. Turn it off for `no_std` |
| `parallel` | yes | Multi-core parallelism with Rayon |
| `simd` | no | SIMD with [`pulp`](https://crates.io/crates/pulp): x86 SSE and AVX, ARM NEON, WebAssembly `simd128` |
| `ndarray` | no | Interoperability with the `ndarray` crate |
| `wasm` | no | WebAssembly-specific optimisations |

For SIMD and threads together: `purecv = { version = "0.11", features = ["parallel", "simd"] }`.

## First steps

```rust
use purecv::core::{Matrix, Scalar};

fn main() {
    // A 480x640 matrix with 3 channels, filled with ones
    let mat = Matrix::<f32>::ones(480, 640, 3);

    // Another one, filled with a constant value
    let mut gray = Matrix::<f32>::zeros(480, 640, 3);
    gray.set_to(Scalar::all(128.0f32));

    println!("{}x{}", mat.cols, mat.rows);
}
```

The repository has runnable examples for filters, thresholds, histograms, FAST and ORB keypoints, feature matching, optical flow, `solve_pnp` and camera undistortion: `cargo run --example <name>`.

## In the browser and Node.js

```sh
npm install @webarkit/purecv-wasm
```

The package has two builds, standard (`dist-std`) for maximum compatibility and SIMD (`dist-simd`) for browsers with WebAssembly `simd128`. It covers most of `core` and `imgproc`, and has started on `video` (optical flow) and `calib3d` (`solve_pnp`, `find_homography`, `rodrigues`).

```js
import init, { Mat, gaussian_blur, CV_8UC3, BORDER_DEFAULT } from '@webarkit/purecv-wasm/dist-std/purecv_wasm.js';

await init();

const mat = Mat.new(480, 640, CV_8UC3);
// ... fill `mat` with your image data
const blurred = gaussian_blur(mat, 5, 5, 0.0, 0.0, BORDER_DEFAULT);

// JavaScript doesn't free WebAssembly memory for you
mat.free();
blurred.free();
```

## `no_std` and microcontrollers

Build with `default-features = false` to run without the standard library, for example on an ESP32. `core`, `imgproc`, `calib3d` and `video` work this way; `features2d` still needs `std`. See the [ESP32 examples](https://github.com/webarkit/purecv-esp32-examples).

## See also

- [WebARKitLib-rs](/docs/libraries/webarkitlib-rs/): the Rust port of the tracking engine that purecv is meant to underpin
- [Choosing a library](/docs/getting-started/choosing-a-library/)
