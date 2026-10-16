---
title: NFT Marker Creator
description: Create NFT markers (.iset, .fset, .fset3) from any image, in the browser.
---

[Open the NFT Marker Creator →](/tools/NFT_Marker_Creator/)

The NFT Marker Creator turns a JPG or PNG into the three files of an NFT marker — `.iset` (image set), `.fset` (feature set) and `.fset3` — used by jsartoolkitNFT, ARnft, jsartoolkit5 and AR.js. It runs entirely in your browser: the image is not uploaded.

## Steps

1. **Upload image** and wait for the preview.
2. Read the **confidence** stars (an estimate based on the image's detail).
3. If the image has no colour information you are asked for the **number of channels**: 1 for black and white, 3 for colour.
4. **Generate**. When it's done the three files download automatically.

Large images (over about 1000 px per side) can take 20 minutes or more. For those, or for batch work, use the Node version: [webarkit/Nft-Marker-Creator-App](https://github.com/webarkit/Nft-Marker-Creator-App).

See also: [Make a good NFT marker](/docs/tutorials/make-a-good-marker/).
