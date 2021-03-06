---
layout: post
title:  "Welcome to WebAR Kit Blog! | The official blog of WebAR Kit"
date:   2020-05-06 19:58:55 +0200
description: The welcome article of webarkit.org blog. We are pleased to present our new blog, we will talk here about the WebAR Kit development and about our projects, libraries and tools for WebAR.
author: Walter Perdan
image: /resources/webarkit-logo-social.jpg
seo:
   type: BlogPosting
   author: Walter Perdan
   datePublished: date
---
# Welcome to WebAR Kit Blog!
## News about the development

We are pleased to present our new **WebAR Kit** Blog page. In this blog we will keep you updated on the news that have happened within the **WebAR Kit** community. We will generally publish at least one article every three months and if possible more often to keep you updated.

What has happened so far in the **WebAR Kit** community?

I personally started creating a simplified version of Artoolkit with only NFT support, it's called [WebARKitLib](https://github.com/webarkit/WebARKitLib). The code is pretty much the same but it's very light because all unnecessary parts for **N**atural **F**eature **T**racking have been removed. That is, all the code for the old marker style was stripped away. The final code is only 19.7 mb against the almost 500 mb of the old repository. I have used this library with [JsartoolkitNFT](https://github.com/webarkit/jsartoolkitNFT) and [ARnft](https://github.com/webarkit/ARnft) with excellent results.
Thosten Bux instead added partial support for NFT markers and 2d tracking to the ArtoolkitX.js project, it is essential to complete the implementation for the NFT but we are on the right track.

Worth noting is the great work that Thorsten Bux and Daniel Fernandes have done for the online Web Service version of the [NFT-creator-WS](http://nftcreator.tripod-digital.co.nz/) [(here the repository of the code)](https://github.com/webarkit/NFT-Creator-WS) a very useful tool for those who want to work with this type of markers.

Unfortunately as regards **WebARStudio**, some improvements have been made but not yet for the NFT markers, it is in fact necessary to develop the part of the code to support the version with Web Worker required for Mobile devices. I hope to accomplish this upgrade in a timely, because it is a long awaited feature…

An interesting mention should be made for the CSS renderer developed by Daniel Fernandes based on the Threejs CSS3D renderer, many interesting possibilities open up with this project !!

Finally, the icing on the cake is the incredible work done by hiukim [mind-ar-js](https://github.com/webarkit/mind-ar-js), he has in fact translated the Artoolkit code concerning the NFT with gpu.js, creating a version completely made for the GPU!! For sure this will be the future of augmented reality... Obviously the code needs to be improved and most likely the algorithm needs to be changed. But in the meantime: Very good hiukim! Great!
If you are interested, follow us and subscribe to our web page or follow our Twitter profile [@WebarkitO](https://twitter.com/WebarkitO), and if you want to get in touch with us to participate and contribute to the project, let's meet in our [slack channel](https://join.slack.com/t/webarkit/shared_invite/zt-eupovakz-7e2spEifwn~rOHC0vpaWhw), we are open for collaborations.
Stay tuned!
