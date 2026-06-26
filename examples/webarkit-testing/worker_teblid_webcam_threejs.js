// Dedicated worker for the live-webcam Teblid example (issue #36).
// Same bufferCopy ping-pong as worker_bufferCopy_threejs.js (it transfers the
// frame ArrayBuffer BACK to the main thread each reply so a single buffer is
// recycled), but it emits the corrected GL pose `matrixGL_RH` (post
// webarkit/WebARKitLib#45) so the example needs no render-side pose correction.
importScripts("./dist/WebARKit.js");

var ar;
let next = null;
let markerResult = null;

self.onmessage = (e) => {
  const msg = e.data;
  switch (msg.type) {
    case "initTracker": {
      initTracker(msg);
      return;
    }
    case "process": {
      next = msg.imagedata;
      processFrame();
      return;
    }
  }
};

function initTracker(msg) {
  const trackerType = msg.trackerType;

  const onLoad = function (wark) {
    ar = wark;
    wark.setLogLevel(WebARKit.WebARKitController.WEBARKIT_LOG_LEVEL_DEBUG);
    // Marker is handed in as decoded RGBA pixels; the tracker converts to gray
    // internally (convert2Grayscale).
    wark.loadTrackerGrayImage(msg.imageData, msg.imgWidth, msg.imgHeight, WebARKit.WebARKitController.RGBA);
    // Allocate the persistent WASM frame buffer once.
    wark.initFrameBuffer(WebARKit.WebARKitController.RGBA);
    // WebARKitLib#38: anchor AR content at the marker centre (opt-in; default is
    // the reference image's top-left corner).
    wark.setOriginCentered(true);

    const cameraProjMat = wark.getCameraProjectionMatrix();
    console.log("camera proj Mat: ", cameraProjMat);

    postMessage({
      type: "loadedTracker",
      cameraProjMat: JSON.stringify(cameraProjMat),
    });

    postMessage({ type: "endLoading", end: true });

    wark.addEventListener("getMarker", function (event) {
      markerResult = {
        type: "found",
        // Corrected GL modelview (D*R*D + standard projection) — consume directly.
        matrixGL_RH: JSON.stringify(event.data.matrixGL_RH),
        // Hand the frame buffer back so the main thread can recycle it.
        buffer: next.buffer,
      };
    });
  };

  const onError = function (error) {
    console.error(error);
  };

  WebARKit.WebARKitController.init_raw(msg.videoWidth, msg.videoHeight, trackerType)
    .then(onLoad)
    .catch(onError);
}

function processFrame() {
  markerResult = null;
  if (ar && ar.process_raw) {
    // RGBA in; tracker converts to grayscale internally.
    ar.process_raw(next, WebARKit.WebARKitController.RGBA);
  }
  if (markerResult) {
    postMessage(markerResult, [next.buffer]);
  } else {
    postMessage({ type: "not found", buffer: next.buffer }, [next.buffer]);
  }
  next = null;
}
