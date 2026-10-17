---
title: "The new jsartoolkitNFT with TypeScript support"
description: "jsartoolkitNFT was converted to the typesrcipt language, in this flash article we illustrate this feature and what's the next plans."
date: 2021-04-07T12:04:00+02:00
author: Walter Perdan
image: /examples/Data/JsartoolkitNFT-logo.gif
tags: ["jsartoolkitNFT", "release"]
# Keeps the URL published by the old Jekyll site.
slug: jsartoolkitnft-typescript-version
---

We started to develop a **Typescript** version of [jsartoolkitNFT](https://github.com/webarkit/jsartoolkitNFT)  because we plan to transcode our libraries with this language. That was the first step, the next one will be transcoding [ARnft](https://github.com/webarkit/ARnft), the process is on the way see the [PR](https://github.com/webarkit/ARnft/pull/158), but this wasn't possible without before porting  jsartoolkitNFT. 

**JsartoolkitNFT** our small libraries for **WebAR** has arrived to [0.9.1](https://github.com/webarkit/jsartoolkitNFT/releases/tag/0.9.1) version, and you can install as a module with npm:

`npm install @kalwalt/jsartoolkit-nft`

We will publish in the webarkit scoped name when it will be almost stable. We will advise you in our blog with all the informations.

We didn't make any improve apart the Typescript langauage conversion, there are still some little refinements to do in the code, that is planned to realize.

In regards of the new Typescript feature, you don't need to download any other typed library, `types` folder is present  in the root folder, so everything you need to do is to install the package and import it in you project:

`import AR from "@kalwalt/jsartoolkit-nft"`

If you are developing on a Javascript or Typescript ambient this does the same. But in a Typescript environnment you will get all of the advantages, let say intellisense support and type checking. 

We are sure that you will develop many interesting projects with it. Let us know on what are you working!

See you in a next Blog article!