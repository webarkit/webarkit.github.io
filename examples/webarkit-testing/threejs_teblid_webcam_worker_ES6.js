function isMobile () {
  return /Android|mobile|iPad|iPhone/i.test(navigator.userAgent);
}

const setMatrix = function (matrix, value) {
  const array = [];
  for (const key in value) {
    array[key] = value[key];
  }
  if (typeof matrix.elements.set === "function") {
    matrix.elements.set(array);
  } else {
    matrix.elements = [].slice.call(array);
  }
};

// Live-webcam variant of the static-image example. `video` is a playing
// HTMLVideoElement. The frame is processed continuously via a bufferCopy
// main<->worker ping-pong (one recycled transferable ArrayBuffer); the worker
// emits the corrected GL pose (matrixGL_RH), so content attaches directly to
// the tracked root with no render-side correction (webarkit/WebARKitLib#45).
function start(markerUrl, video, input_width, input_height, render_update, track_update) {
  let vw, vh;
  let sw, sh;
  let sscale;
  let worker;

  // Recycled transferable frame buffer (bufferCopy ping-pong).
  let bufferCopy = null;
  let data = null;

  const canvas_process = document.createElement('canvas');
  const context_process = canvas_process.getContext('2d', {willReadFrequently: true});
  const targetCanvas = document.querySelector("#canvas");

  const renderer = new THREE.WebGLRenderer({canvas: targetCanvas, alpha: true, antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();

  let fov = (0.8 * 180) / Math.PI;
  let ratio = input_width / input_height;

  const cameraConfig = {
    fov: fov,
    aspect: ratio,
    near: 0.01,
    far: 1000,
  };

  const camera = new THREE.PerspectiveCamera(cameraConfig);
  camera.matrixAutoUpdate = false;

  scene.add(camera);

  const root = new THREE.Object3D();
  scene.add(root);
  root.matrixAutoUpdate = false;

  // WebARKitLib#42/#45: the library emits a correct D*R*D GL pose + standard
  // projection, so content is attached directly to the tracked root with NO
  // render-side compensation. WebARKitLib#38: the worker calls
  // setOriginCentered(true), so the pose origin is the marker CENTRE — content
  // at (0,0,0) sits in the middle (was the top-left corner). Cube + axes kept.
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.6, 0.6),
    new THREE.MeshNormalMaterial()
  );
  box.position.set(0, 0, 0.3); // rest on the +Z side of the marker (toward viewer)
  root.add(box);
  const axes = new THREE.AxesHelper(1.0); // X=red, Y=green, Z=blue
  root.add(axes);

  const load = function () {
    vw = input_width;
    vh = input_height;

    sscale = isMobile() ? window.outerWidth / input_width : 1;
    sw = vw * sscale;
    sh = vh * sscale;

    // Process at the capture resolution so the frame matches the tracker's
    // frame buffer size and the (as-is) projection.
    canvas_process.width = vw;
    canvas_process.height = vh;

    renderer.setSize(sw, sh);

    worker = new Worker('./worker_teblid_webcam_threejs.js');

    const type = setTrackerType();
    // Decode the marker JPEG into RGBA pixels with a 2D canvas (the tracker
    // treats the buffer as raw pixels, not a compressed file).
    const loadMarker = (URL) => {
      const markerImg = new Image();
      markerImg.onload = () => {
        const mw = markerImg.naturalWidth;
        const mh = markerImg.naturalHeight;
        const markerCanvas = document.createElement('canvas');
        markerCanvas.width = mw;
        markerCanvas.height = mh;
        const markerCtx = markerCanvas.getContext('2d', {willReadFrequently: true});
        markerCtx.drawImage(markerImg, 0, 0, mw, mh);
        const markerData = markerCtx.getImageData(0, 0, mw, mh);
        worker.postMessage({
          type: "initTracker",
          trackerType: type,
          imageData: markerData.data,
          imgWidth: mw,
          imgHeight: mh,
          videoWidth: vw,
          videoHeight: vh,
        });
      };
      markerImg.src = URL;
    }

    loadMarker(markerUrl)

    worker.onmessage = function (ev) {
      const msg = ev.data;
      switch (msg.type) {
        case "loadedTracker": {
          // Projection built for the capture resolution; used as-is (no scaling).
          const proj = JSON.parse(msg.cameraProjMat);
          setMatrix(camera.projectionMatrix, proj);
          // Kick off the continuous frame loop.
          process();
          break;
        }
        case "endLoading": {
          if (msg.end === true) {
            const loader = document.getElementById('loading');
            if (loader) {
              loader.querySelector('.loading-text').innerText = 'Start the tracking!';
              setTimeout(function(){
                if (loader.parentElement) loader.parentElement.removeChild(loader);
              }, 2000);
            }
          }
          break;
        }
        case 'found': {
          found(msg);
          bufferCopy = msg.buffer; // reclaim the recycled buffer
          process();               // feed the next frame
          break;
        }
        case 'not found': {
          found(null);
          bufferCopy = msg.buffer;
          process();
          break;
        }
      }
      track_update();
    };
  };

  let world;

  // On-screen tracking status. Updated only on transitions (cheap); the same
  // transitions are also logged to the console, alongside the worker's logs.
  //
  // NOTE: "found"/"tracked" reflects the library's isValid(). The tracker does
  // not reliably declare tracking lost when the marker leaves the frame, so this
  // status (and the rendered pose) can persist on a stale lock. This is a known
  // library limitation, not specific to this example -- see
  // webarkit/WebARKitLib#46.
  const statusEl = document.getElementById('status');
  let statusTracked = null;
  const setStatus = function (isTracked) {
    if (isTracked === statusTracked) return;
    statusTracked = isTracked;
    if (statusEl) {
      statusEl.textContent = isTracked ? 'Marker tracked' : 'Searching for marker…';
      statusEl.classList.toggle('tracked', isTracked);
    }
    console.log(isTracked ? '[track] marker FOUND' : '[track] marker LOST');
  };

  const found = function (msg) {
    if (!msg) {
      // Live tracking: hide content when the marker is not in frame.
      world = null;
      setStatus(false);
    } else {
      // WebARKitLib#45: use matrixGL_RH directly — no example-side correction.
      world = JSON.parse(msg.matrixGL_RH);
      setStatus(true);
    }
  };

  var lasttime = Date.now();
  var time = 0;

  const draw = function () {
    render_update();
    var now = Date.now();
    var dt = now - lasttime;
    time += dt;
    lasttime = now;

    if (!world) {
      root.visible = false;
    } else {
      root.visible = true;
      setMatrix(root.matrix, world);
    }
    renderer.render(scene, camera);
  };

  const process = function () {
    // Wait for the video to have a current frame before feeding the tracker.
    if (video.readyState < video.HAVE_CURRENT_DATA) {
      requestAnimationFrame(process);
      return;
    }

    context_process.fillStyle = 'black';
    context_process.fillRect(0, 0, vw, vh);
    // UNFLIPPED: never mirror the processed feed (keeps tracker handedness correct).
    context_process.drawImage(video, 0, 0, vw, vh);

    const imageData = context_process.getImageData(0, 0, vw, vh);

    if (!bufferCopy) {
      // First frame: allocate the recycled buffer once.
      bufferCopy = imageData.data.buffer.slice(0);
      data = new Uint8ClampedArray(bufferCopy);
    } else {
      // Reuse the buffer handed back by the worker.
      data = new Uint8ClampedArray(bufferCopy);
      data.set(imageData.data);
    }

    // Transfer the buffer to the worker; it returns it on the next reply.
    worker.postMessage({ type: 'process', imagedata: data }, [data.buffer]);
  }

  // Render loop; the processing cadence is driven by the worker ping-pong.
  const tick = function () {
    draw();
    requestAnimationFrame(tick);
  };

  load();
  tick();
}
