async function initCamera(width, height) {
    var aspect = width / height;
    const constraints = {
        audio: false,
        video: {
            // using the "environment" rear camera
            facingMode: "environment",
            // using the "user" front camera
            // facingMode: "user",
            aspectRatio: { ideal: aspect },
            width: width,
            height: height
        }
    };

    // initialize video source
    const video = document.querySelector("#video");
    console.log("video: ", video);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("stream: ", stream);
    video.srcObject = stream;

    return new Promise(resolve => {
        video.onloadedmetadata = () => {
            video.play();
            resolve(video);
        };
    });
};