// FeatureSet Display: load the three files of an NFT marker and draw its feature points.
(function () {
  // ARFset.loadNFTMarkerBlob() needs the data URLs in this order, whatever order
  // the browser lists the selected files in (usually alphabetical: fset, fset3, iset).
  var MARKER_EXTENSIONS = ['iset', 'fset3', 'fset'];

  var markerLoader = document.getElementById('markerLoader');
  var statusEl = document.getElementById('fsdStatus');

  markerLoader.addEventListener('change', handleFiles, false);

  function extensionOf(file) {
    return file.name.split('.').pop().toLowerCase();
  }

  function showStatus(text) {
    statusEl.textContent = text;
  }

  function handleFiles(e) {
    var files = Array.from(e.target.files);
    // Allow selecting the same files again later.
    markerLoader.value = '';

    var ordered = MARKER_EXTENSIONS.map(function (ext) {
      return files.filter(function (file) {
        return extensionOf(file) === ext;
      })[0];
    });

    if (files.length !== 3 || ordered.indexOf(undefined) !== -1) {
      showStatus('Select exactly three files at once: one .iset, one .fset and one .fset3.');
      return;
    }

    showStatus('');
    console.log('NFT marker uploaded: ' + ordered[0].name.replace(/\.[^.]+$/, ''));

    Promise.all(ordered.map(readAsDataURL))
      .then(loadFset)
      .catch(function (err) {
        showStatus('Could not read the files: ' + err);
      });
  }

  function readAsDataURL(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  }

  function loadFset(dataURLs) {
    document.getElementById('cv').innerHTML = '';

    var ar = new ARFset.ARFset();
    ar.attachCanvas('cv');

    ar.initialize().then(function () {
      ar.loadNFTMarkerBlob(dataURLs, function (nft) {
        console.log(nft);
      });
      ar.display();
    });
  }
})();
