import NftMC from './wasm/NftMarkerCreator_ES6_wasm.js'

const nftMC = await NftMC();

const imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

const canvas = document.getElementById('imageCanvas');
const hideCanvas = document.getElementById('hideCanvas');
hideCanvas.style.display = "none";

const ctx = canvas.getContext('2d');
ctx.fillStyle = "#949494";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const ctxHide = hideCanvas.getContext('2d');

const reader = new FileReader();

let name;
let nameWithExt;

const globalObj = {
    dpi: 0,
    nc: 0,
    w: 0,
    h: 0,
    arr: []
};

function handleImage(e) {
    nameWithExt = e.target.files[0].name;
    console.log("Image uploaded: " + nameWithExt);

    name = nameWithExt.substring(0, nameWithExt.lastIndexOf('.'));

    let extJpg = nameWithExt.substring(nameWithExt.lastIndexOf('.'));

    let confidenceEl = document.getElementById("confidenceLevel");
    let childEls = confidenceEl.getElementsByClassName("confidenceEl");
    for(let i = 0; i < childEls.length; i++){
        childEls[i].src = "./icons/star2.svg";
    }

    if (extJpg === '.jpg' || extJpg === '.jpeg' || extJpg === '.JPG' || extJpg === '.JPEG') {
        useJpeg(e);
    } else if (extJpg === '.png' || extJpg === '.PNG') {
        globalObj.dpi = 72;
        readImage(e)
    } else {
        console.error("Invalid image format!");
    }

    document.getElementById("generateBt").disabled = false;
}

function generate() {
    const imageCanvas = document.querySelector('#imageCanvas');
    imageCanvas.style.opacity = 0.25;

    const okSign = document.querySelector('.checkmark-cover');
    okSign.style.display = 'none';

    const spinner = document.querySelector('.spinner-container');
    spinner.style.display = 'block';

    setTimeout(() => {
        let cmdArr = [0, name];

        let paramStr = cmdArr.join(' ');
        console.log(paramStr)

        nftMC.createNftDataSet(globalObj.arr, globalObj.dpi, globalObj.w, globalObj.h, globalObj.nc, paramStr);
        
        downloadIset();
    }, 500);
}

window.generate = generate;

function downloadIset() {
    let mime = "application/octet-stream";

    let filenameIset = "tempFilename.iset";
    let filenameFset = "tempFilename.fset";
    let filenameFset3 = "tempFilename.fset3";

    let ext = ".iset";
    let ext2 = ".fset";
    let ext3 = ".fset3";

    let content = nftMC.FS.readFile(filenameIset);
    let contentFset = nftMC.FS.readFile(filenameFset);
    let contentFset3 = nftMC.FS.readFile(filenameFset3);

    const isetFile = document.createElement('a');
    isetFile.download = name + ext;
    isetFile.href = URL.createObjectURL(new Blob([content], { type: mime }));
    isetFile.style.display = 'none';

    const fsetFile = document.createElement('a');
    fsetFile.download = name + ext2;
    fsetFile.href = URL.createObjectURL(new Blob([contentFset], { type: mime }));
    fsetFile.style.display = 'none';

    const fset3File = document.createElement('a');
    fset3File.download = name + ext3;
    fset3File.href = URL.createObjectURL(new Blob([contentFset3], { type: mime }));
    fset3File.style.display = 'none';

    document.body.appendChild(isetFile);
    isetFile.click();

    document.body.appendChild(fsetFile);
    fsetFile.click();

    document.body.appendChild(fset3File);
    fset3File.click();

    const spinner = document.querySelector('.spinner-container');
    spinner.style.display = 'none';

    const okSign = document.querySelector('.checkmark-cover');
    okSign.style.display = 'block';
}

function getUint8(str) {
    const base64 = str.substring(23);
    const raw = atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    // console.log("arr", array)
    return array;
}

function openModal() {
    let modalWrapper = document.getElementById("modal");
    modalWrapper.style.display = "block";
}

function closeModal() {
    let modalWrapper = document.getElementById("modal");
    modalWrapper.style.display = "none";
}

function setValueFromModal() {
    let input = document.getElementById("modalInput").value;
    globalObj.nc = parseInt(input);
    closeModal();
}
window.setValueFromModal = setValueFromModal;

function detectColorSpace(arr) {
    let target = parseInt(arr.length / 4);

    let counter = 0;

    for (let j = 0; j < arr.length; j += 4) {
        let r = arr[j];
        let g = arr[j + 1];
        let b = arr[j + 2];

        if (r === g && r === b) {
            counter++;
        }
    }

    if (target === counter) {
        return 1;
    } else {
        return 3;
    }
}

function useJpeg(e) {
    EXIF.getData(e.target.files[0], function () {
        var dpi1 = parseFloat(EXIF.getTag(this, "XResolution"));

        if (isNaN(dpi1) || dpi1 == null) {
            globalObj.dpi = 72
        } else {
            globalObj.dpi = dpi1;
        }

        const nc1 = EXIF.getTag(this, "ComponentsConfiguration");

        if (isNaN(nc1) || nc1 == null) {
            const nc2 = parseFloat(EXIF.getTag(this, "SamplesPerPixel"));
            if (isNaN(nc2) || nc2 == null) {
                // openModal();
            } else {
                globalObj.nc = nc2;
            }
        } else {
            globalObj.nc = nc1;
        }

        readImage(e);
    });

}

function readImage(e) {
    reader.onload = function (event) {

        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;

            canvas.style.width = img.width > 1200 ? '1200px' : img.width + 'px';
            canvas.style.height = img.height > 1200 ? '1200px' : img.height + 'px';


            hideCanvas.width = img.width;
            hideCanvas.height = img.height;

            globalObj.w = img.width;
            globalObj.h = img.height;

            ctxHide.drawImage(img, 0, 0);

            ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                0, 0, canvas.width, canvas.height); // destination rectangle

            const imgData = ctxHide.getImageData(0, 0, hideCanvas.width, hideCanvas.height);

            let newArr = [];

            let verifyColorSpace = detectColorSpace(imgData.data);

            if (verifyColorSpace === 1) {
                for (let j = 0; j < imgData.data.length; j += 4) {
                    newArr.push(imgData.data[j]);
                }
            } else if (verifyColorSpace === 3) {
                for (let j = 0; j < imgData.data.length; j += 4) {
                    newArr.push(imgData.data[j]);
                    newArr.push(imgData.data[j + 1]);
                    newArr.push(imgData.data[j + 2]);
                }
            }

            globalObj.nc = verifyColorSpace;

            globalObj.arr = new Uint8Array(newArr);

            let confidence = calculateQuality();
            let confidenceEl = document.getElementById("confidenceLevel");
            let childEls = confidenceEl.getElementsByClassName("confidenceEl");
            for(let i = 0; i < parseInt(confidence.l); i++){
                childEls[i].src = "./icons/star.svg";
            }
            confidenceEl.scrollIntoView();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function calculateQuality(){
    let gray = toGrayscale(globalObj.arr);
    let hist = getHistogram(gray);
    let ent = 0;
    let totSize = globalObj.w * globalObj.h;
    for(let i = 0; i < 255; i++){ 
        if(hist[i] > 0){
            let temp = (hist[i]/totSize)*(Math.log(hist[i]/totSize));
            ent += temp;
        }
    }
    
    let entropy = (-1 * ent).toFixed(2);
    let oldRange = (5.17 - 4.6);  
    let newRange = (5 - 0);  
    let level = (((entropy - 4.6) * newRange) / oldRange);
    
    if(level > 5){
        level = 5;
    }else if(level < 0){
        level = 0;
    }
    return {l:level.toFixed(2), e: entropy};
}

function toGrayscale(arr){
    let gray = [];
    for(let i = 0; i < arr.length; i+=3){
        let avg = (arr[i] + arr[i+1] + arr[i+2])/3;
        gray.push(parseInt(avg));
    }
    return gray;
}

function getHistogram(arr){
    let hist = [256];
    for(let i = 0; i < arr.length; i++){
        hist[i] = 0;
    }
    for(let i = 0; i < arr.length; i++){
        hist[arr[i]]++;
    }
    return hist;
}
