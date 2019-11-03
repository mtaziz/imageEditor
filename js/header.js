"use strict";

/* create new project */


function createNewProject() {
  __elements.editor().innerHTML = '';
  __states.layer.layers.length = 0;
  __states.width = Number(document.getElementById('setWidth').value);
  __states.height = Number(document.getElementById('setHeight').value);
  new CreateLayer(1);
  removePopup();
}

function createPopup(callback, data) {
  var el = document.createElement('div');
  el.id = 'popup';
  el.innerHTML = callback(data);

  __elements.body().append(el);
}
/* remove config popup */


function removePopup() {
  return document.getElementById('popup').remove();
}

var CreateByUpload =
/** @class */
function () {
  function CreateByUpload(files) {
    this.files = files;
    var reader = new FileReader();
    var name = files.name;

    reader.onload = function (e) {
      var img = new Image(); // @ts-ignore

      img.src = e.target.result;

      img.onload = function () {
        if (Object.keys(__states.layer.layers).length === 0) {
          // load image offscreen to get dimensions
          (function (img) {
            // RESETS - REFACTOR
            resetApp();
            __states.width = img.width;
            __states.height = img.height; // END RESETS
          })(img);
        }

        var Layer = new CreateLayer(1, img);
        var canvasId = Layer.getId();
        var draw = new DrawToCanvas(canvasId, img, 0, 0);
        draw.drawImage();
      };
    }; // img.src = imageBlob


    reader.readAsDataURL(files);
  }

  return CreateByUpload;
}();

function quit() {
  console.log("quit application");
} // @return object - available screen width and height


function getScreenSize() {
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  };
}

function resetApp() {
  __elements.editor().innerHTML = '';
  __elements.layersList().innerHTML = '';
  __states.layer.layers.length = 0;
  __states.layer.last = -1;
  __states.zoom = 1;
  __states.width = 1280;
  __states.height = 720;
  __states.bordersWidth = 4;
}