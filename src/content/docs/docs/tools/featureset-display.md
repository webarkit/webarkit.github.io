---
title: FeatureSet Display
description: See the feature points of an NFT marker before you print it, to check that it will track well.
---

[Open FeatureSet Display →](/tools/FeatureSet-Display/)

FeatureSet Display shows an NFT marker the way the tracker sees it: the marker image with its **feature points** drawn on top. At a glance you can tell whether the marker has enough detail to track, whether the points cover the whole image or crowd into one corner, and whether the image lost contrast when the marker was generated. Everything runs in your browser: your files are not uploaded.

## How to use it

1. Create a marker with the [NFT Marker Creator](/docs/tools/nft-marker-creator/), or with any tool that produces the three marker files.
2. Press **Upload NFT marker** and select `.iset`, `.fset` and `.fset3` **at once**: Ctrl-click (Cmd-click on a Mac) or Shift-click them in the file dialog. They are normally named the same, for example `pinball.iset`, `pinball.fset` and `pinball.fset3`.
3. The image appears with its feature points. To check another marker, press the button again.

If the selection is not exactly one file of each type, the tool says so and nothing is loaded.

## How to read it

- **Light green circles** are the **tracking** points, from the FeatureSet (`.fset`). Once the marker has been found, the tracker follows it by matching small patches around these points (AR2 tracking).
- **Small red circles** are the **detection** points, from FeatureSet3 (`.fset3`). They are what the tracker matches against the camera frame to recognise the image and start tracking (KPM detection). There are usually many more of them than green ones.

Look for:

- **Coverage.** Points should be spread over the whole image. Areas without points can't be used on their own: if the camera frames only those, the marker is not recognised or tracking is lost.
- **No lopsided clusters.** Many points in one corner and almost none elsewhere make the marker fragile when that corner is out of view.
- **Enough points of both colours.** Few red points mean the marker is hard to recognise when it comes into view; few green points mean the tracker has little to follow once it has found it. In both cases, choose a more detailed image, or regenerate the marker with a higher feature density (the `-level` option of the [command-line versions](/docs/tools/nft-marker-creator/#command-line-versions)).

Open the browser console to see the marker's size, its DPI and the number of feature points.

For what makes an image track well, see [Make a good NFT marker](/docs/tutorials/make-a-good-marker/).

## In your own page

The viewer is also published as an npm library, [`@webarkit/featureset-display`](https://www.npmjs.com/package/@webarkit/featureset-display), if you want to show a marker inside your own app. Source and API: [webarkit/FeatureSET-Display](https://github.com/webarkit/FeatureSET-Display).
