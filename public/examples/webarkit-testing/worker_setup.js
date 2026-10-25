var oWidth = window.innerWidth;
var oHeight = window.innerHeight;

var videoEl;
var arElem;
var grayScaleVideo;
var grayScaleImage;
var grayVideoData;
var overlayCanvas;
var videoCanvas;
var stats;
var loadingPopUp;
var worker;

var type = setTrackerType();

window.onload = async function () {
  videoEl = createVideo();
  createVideoCanvas();
  createOverlayCanvas();
  loadingPopUp = document.getElementById("loading");
  loadingPopUp.className = "show";

  const refIm = document.getElementById("refIm");
  grayScaleImage = new GrayScale.GrayScaleMedia(
    refIm,
    refIm.width,
    refIm.height
  );
  const grayImageData = grayScaleImage.getFrame();
  arElem = document.getElementById("arElem");
  grayScaleVideo = new GrayScale.GrayScaleMedia(videoEl, oWidth, oHeight);
  var videoSource = await initVideo();

  worker = new Worker("./worker.js");

  initStats();

  worker.postMessage({
    type: "initTracker",
    trackerType: type,
    imageData: grayImageData,
    imgWidth: refIm.width,
    imgHeight: refIm.height,
    videoWidth: oWidth,
    videoHeight: oHeight,
  });

  arElem.style["transform-origin"] = "top left"; // default is center
  arElem.style.zIndex = 2;

  worker.onmessage = function (ev) {
    var msg = ev.data;
    switch (msg.type) {
      case "loadedTracker": {
        hideLoading();
        process();
        break;
      }
      case "found": {
        found(msg);
        process();
        break;
      }
      case "not found": {
        found(null);
        process();
        break;
      }
    }
    //process();
  };

  let update = () => {
    stats.begin();
    grayVideoData = grayScaleVideo.getFrame();
    const videoCanvasCtx = videoCanvas.getContext("2d");
    videoCanvasCtx.drawImage(videoSource, 0, 0, oWidth, oHeight);
    stats.end();
    requestAnimationFrame(update);
  };
  update();

  function hideLoading() {
    loadingPopUp.className = "hide";
  }

  function found(msg) {
    if (!msg) {
      clearOverlayCtx();
      arElem.style.display = "none";
    } else {
      arElem.style.display = "block";
      drawCorners(JSON.parse(msg.corners));
      transformElem(JSON.parse(msg.matrix), arElem);
    }
  }

  function process() {
    if (grayVideoData) {
      worker.postMessage({ type: "process", data: grayVideoData });
    }
  }
  update();
};

async function initVideo() {
  return await grayScaleVideo.requestStream().catch((err) => {
    console.error(err);
  });
}

function initStats() {
  stats = new Stats();
  stats.showPanel(0);
  document.getElementById("stats").appendChild(stats.domElement);
}

function setVideoStyle(elem) {
  elem.style.position = "absolute";
  elem.style.top = 0;
  elem.style.left = 0;
}

function createVideo() {
  var video = document.createElement("video");
  video.id = "video";
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  return video;
}

function createVideoCanvas() {
  videoCanvas = document.createElement("canvas");
  setVideoStyle(videoCanvas);
  videoCanvas.id = "video-canvas";
  videoCanvas.width = oWidth;
  videoCanvas.height = oHeight;
  document.body.appendChild(videoCanvas);
}

function createOverlayCanvas() {
  overlayCanvas = document.createElement("canvas");
  setVideoStyle(overlayCanvas);
  overlayCanvas.id = "overlay";
  overlayCanvas.width = oWidth;
  overlayCanvas.height = oHeight;
  overlayCanvas.style.zIndex = 1;
  document.body.appendChild(overlayCanvas);
}

function transformElem(h, elem) {
  // column major order
  let transform = [
    h[0],
    h[3],
    0,
    h[6],
    h[1],
    h[4],
    0,
    h[7],
    0,
    0,
    1,
    0,
    h[2],
    h[5],
    0,
    h[8],
  ];
  transform = "matrix3d(" + transform.join(",") + ")";
  elem.style["-ms-transform"] = transform;
  elem.style["-webkit-transform"] = transform;
  elem.style["-moz-transform"] = transform;
  elem.style["-o-transform"] = transform;
  elem.style.transform = transform;
  elem.style.display = "block";
}

function clearOverlayCtx() {
  const overlayCtx = overlayCanvas.getContext("2d");
  overlayCtx.clearRect(0, 0, oWidth, oHeight);
}

function drawCorners(corners) {
  const overlayCtx = overlayCanvas.getContext("2d");
  clearOverlayCtx();

  overlayCtx.beginPath();
  overlayCtx.strokeStyle = "blue";
  overlayCtx.lineWidth = 3;

  // [x1,y1,x2,y2,x3,y3,x4,y4]
  overlayCtx.moveTo(corners[0], corners[1]);
  overlayCtx.lineTo(corners[2], corners[3]);
  overlayCtx.lineTo(corners[4], corners[5]);
  overlayCtx.lineTo(corners[6], corners[7]);
  overlayCtx.lineTo(corners[0], corners[1]);

  overlayCtx.stroke();
}
