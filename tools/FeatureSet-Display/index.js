var markerLoader = document.getElementById('markerLoader');
markerLoader.addEventListener('change', handleImage, false);
var name;

function handleImage(e) {
    nameWithExt = e.target.files[0].name;
    if (e.target.files.length == 3) {
        console.log("NFT marker uploaded: " + nameWithExt);

        name = nameWithExt.substr(0, nameWithExt.lastIndexOf('.'));

        let ext = nameWithExt.substr(nameWithExt.lastIndexOf('.'));

        if (ext == '.iset' || ext == '.fset' || ext == '.fset3') {
            console.log('FeatureSet detected!');
            fileReader(e)
        }
        else {
            console.log("Invalid file format!");
        }
    }
}

function loadFset(url) {
    var ar = new ARFset.ARFset();
    
    ar.initialize()
        .then((ar) => {
            ar.loadNFTMarkerBlob(url, (nft) => {
                console.log(nft);
            });
            document.addEventListener('nftMarker', (ev) => {
            })
            ar.display();
        })
}

function fileReader(ev) {
    var dataURLs = [];
    for (var i = 0; i < 3; i++) {
        let reader = new FileReader();
        reader.onload = function (event) {
            var dataURL = event.target.result;
            dataURLs.push(dataURL);
        };
        reader.readAsDataURL(ev.target.files[i]);
    }
    loadFset(dataURLs)
}