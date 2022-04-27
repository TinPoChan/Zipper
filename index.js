// variable setup
const fileSelect = document.getElementById("fileSelect")
const fileElem = document.getElementById("fileElem")
const result = document.getElementById("result");

// Handle dropped files
function dropHandler(ev) {
    var dt = ev.dataTransfer;
    var files = dt.files;
    ev.preventDefault();
    zipFiles(files);
}

// Handle dragover
function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

// Setup the add file button listeners.
fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", function (e) {
    zipFiles(this.files);
    e.preventDefault();
}, false);

// Compress files and exported as a zip file
function zipFiles(files) {
    var sumSize = 0;
    const zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
        zip.file(files[i].name, files[i]);
        sumSize += files[i].size;
    }
    result.innerHTML = "<br />" + "Original size: " + sizeToMB(sumSize) + " MB" + "<br />";
    const loading = document.createElement("span");
    loading.innerHTML = "Zipping...";
    result.appendChild(loading);

    zip.generateAsync({
        type: "blob", compression: "DEFLATE", compressionOptions: {
            level: 9
        }
    }).then(function (content) {
        saveAs(content, "hkzipper.zip");
        result.removeChild(loading);
        result.innerHTML += "Zipped Size: " + sizeToMB(content.size) + " MB" + "<br />" + "Done!";
    });
}

function sizeToMB(size) {
    return (size * 0.000001).toFixed(2);
}
