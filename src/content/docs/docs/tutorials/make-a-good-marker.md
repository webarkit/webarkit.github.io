---
title: Make a good NFT marker
description: What makes an image track well with NFT, and how to create and check a marker.
sidebar:
  order: 1
---

NFT (Natural Feature Tracking) recognises an image by its **feature points**: corners and small high-contrast details. The more distinctive points an image has, spread over the whole surface, the more stable the tracking.

## Choose the image

Good targets:

- lots of detail and texture everywhere (photos, illustrations, busy posters)
- strong local contrast
- no large flat areas of one colour
- not repetitive (tiles, regular patterns and text grids confuse the matcher)

## Create the marker

1. Open the [NFT Marker Creator](/tools/NFT_Marker_Creator/) and upload a JPG or PNG.
2. Check the **confidence** stars: they estimate how well the image will track.
3. Press **Generate**: you get three files, `.iset`, `.fset` and `.fset3`.

Images above about 1000 px per side can take a long time in the browser; for those use a threaded [command-line version](/docs/tools/nft-marker-creator/#command-line-versions) (Node.js, Python or Docker).

## Check it

Load the three files in [FeatureSet Display](/tools/FeatureSet-Display/) ([how to read it](/docs/tools/featureset-display/)). Feature points should cover the whole image. Areas with no points are areas the tracker can't see: if the camera only frames those, tracking is lost.

## Print it

Print at the size you will use it, on matte paper if you can: glossy paper reflects light and hides features.
