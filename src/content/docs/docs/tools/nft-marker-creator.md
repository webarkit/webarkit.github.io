---
title: NFT Marker Creator
description: Create NFT markers (.iset, .fset, .fset3) from any image, in the browser or from the command line with Node.js, Python or Docker.
---

[Open the NFT Marker Creator →](/tools/NFT_Marker_Creator/)

The NFT Marker Creator turns a JPG or PNG into the three files of an NFT marker — `.iset` (image set), `.fset` (feature set) and `.fset3` — used by jsartoolkitNFT, ARnft, jsartoolkit5 and AR.js. It runs entirely in your browser: the image is not uploaded.

The same marker generator is also available for the command line, with threads, as a Node.js app, a Python package and a Docker image: see [Command-line versions](#command-line-versions).

## Steps

1. **Upload image** and wait for the preview.
2. Read the **confidence** stars (an estimate based on the image's detail).
3. If the image has no colour information you are asked for the **number of channels**: 1 for black and white, 3 for colour.
4. **Generate**. When it's done the three files download automatically.

The browser version runs on a single thread, so large images (over about 1000 px per side) can take 20 minutes or more. For those, or for batch work, use one of the [command-line versions](#command-line-versions).

See also: [Make a good NFT marker](/docs/tutorials/make-a-good-marker/).

## Command-line versions

All three live in [webarkit/Nft-Marker-Creator-App](https://github.com/webarkit/Nft-Marker-Creator-App), are built on the same [WebARKitLib](https://github.com/webarkit/WebARKitLib) code as the browser tool, and write the same three files. They can use several threads, which is what makes large images fast.

| Version | You need | Threads |
|---|---|---|
| [Node.js app](#nodejs-app) | Node.js 22 | `--threaded <n>` |
| [Python package](#python-package) | Python 3.8 or later and `pip` | `--threads <n>` |
| [Docker image](#docker-image) | Docker | `--threaded <n>`, same app inside the container |

### Node.js app

Get the code (or the prebuilt `NFTMarkerCreator.js` and `build/` bundle from the [releases](https://github.com/webarkit/Nft-Marker-Creator-App/releases)), install it, and run it on an image placed in the `src` folder:

```sh
git clone https://github.com/webarkit/Nft-Marker-Creator-App.git
cd Nft-Marker-Creator-App
npm install
cd src
node NFTMarkerCreator.js -i pinball.jpg --threaded 4
```

The files are written to `src/output`. Start `--threaded` with the number of physical CPU cores and adjust from there: laptops may peak at 4 threads, workstations can go higher.

Useful options: `-level=0` to `-level=4` sets the feature density (default 2), `-zft` creates only the compressed `.zft` file, and `-o <folder>` sets the output folder. The README lists all of them.

### Python package

A native Python package, published on [PyPI](https://pypi.org/project/nft-marker-creator/), with a command-line tool and a Python API:

```sh
pip install nft-marker-creator
nft-marker-creator -i pinball.jpg -o ./markers --threads 4
```

```python
import nft_marker_creator as nmc

paths = nmc.create("pinball.jpg", output_dir="markers", threads=4)
print(paths)  # ['markers/pinball.iset', 'markers/pinball.fset', 'markers/pinball.fset3']
```

Prebuilt wheels are available for Linux (x86_64) and Windows (64-bit), CPython 3.8–3.13, so you don't need a compiler. The output is identical whatever the number of threads. See the [Python README](https://github.com/webarkit/Nft-Marker-Creator-App/blob/main/python/README.md) for the full API and for building from source.

### Docker image

If you'd rather not install Node.js, the [`webarkit/nft-marker-creator-app`](https://hub.docker.com/r/webarkit/nft-marker-creator-app) image on Docker Hub has the app ready. From the folder that holds your image:

```sh
docker run -dit --name nft-app -v "$(pwd):/src" webarkit/nft-marker-creator-app:0.4.0 bash
docker exec nft-app node ../Nft-Marker-Creator-App/src/NFTMarkerCreator.js -i /src/pinball.jpg -o /src/markers
```

On Windows PowerShell use `"${PWD}:/src"` for the volume. Your folder is mounted at `/src` inside the container, so paths start with `/src/`; with `-o /src/markers` the files are written to a `markers` folder next to your image. Check [Docker Hub](https://hub.docker.com/r/webarkit/nft-marker-creator-app/tags) for newer tags.
