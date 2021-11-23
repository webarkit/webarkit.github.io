var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
const reader = new FileReader();

var name;
var nameWithExt;

function handleImage(e) {
    nameWithExt = e.target.files[0].name;
    console.log(e);
    console.log(e.target.files[0]);
    console.log(nameWithExt);
    console.log("Image uploaded: " + nameWithExt);

    name = nameWithExt.substr(0, nameWithExt.lastIndexOf('.'));

    let ext = nameWithExt.substr(nameWithExt.lastIndexOf('.'));

    if (ext == '.iset' || ext == '.fset' || ext == '.fset3') {
        console.log('featureSet detected!');
        fileReader(e)
    }
    else {
        console.log("Invalid image format!");
    }
}

function loadFset(url) {
    var ar = new ARFset.ARFset();
    console.log(ar);
    ar.initialize()
        .then((e) => {
            console.log(e);
            ar.loadNFTMarker(url, (nft) => {
                console.log(nft);
            });
            document.addEventListener('nftMarker', (ev) => {

            })
            ar.display();
        })
}

function fileReader(ev) {
    const selectedFile = ev.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
        reader.onload = function (event) {
            var dataURL = event.target.result;
            //console.log(dataURL);
            loadFset(dataURL)
        };
        reader.readAsDataURL(selectedFile);
    }
}