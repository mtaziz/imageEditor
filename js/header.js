"use strict";

/* create new project */


function createNewProject() {
  editor.innerHTML = '';
  states.layer.layers.length = 0;
  states.width = Number(document.getElementById('setWidth').value);
  states.height = Number(document.getElementById('setHeight').value);
  new CreateLayer(1);
  removePopup();
}

function createPopup(callback, data) {
  var el = document.createElement('div');
  el.id = 'popup';
  el.innerHTML = callback(data);
  body.append(el);
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
        if (Object.keys(states.layer.layers).length === 0) {
          // load image offscreen to get dimensions
          (function (img) {
            // RESETS - REFACTOR
            resetApp();
            console.log("here");
            states.width = img.width;
            states.height = img.height; // END RESETS
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
  editor.innerHTML = '';
  layersList.innerHTML = '';
  states.layer.layers.length = 0;
  states.layer.last = -1;
  states.zoom = 1;
  states.width = 1280;
  states.height = 720;
  states.bordersWidth = 4;
}