---
title: ARnft with Three.js
description: Anchor a Three.js object on an image with ARnft and ARnft-threejs.
sidebar:
  order: 2
---

:::note[Draft]
This tutorial is being written. Until it's complete, the [first app guide](/docs/getting-started/first-app/) shows the full minimal code, and the ARnft repository has [many examples](https://github.com/webarkit/ARnft/tree/master/examples): glTF models, video, multiple markers.
:::

## Outline

1. Set up an import map for `three`, `arnft` and `arnft-threejs`.
2. Write `config.json` (camera calibration, video settings, loading screen).
3. Call `ARnft.init()` with your marker.
4. Create a `SceneRendererTJS` and add objects with `NFTaddTJS`.
5. React to `getNFTData` / tracking-lost events.
