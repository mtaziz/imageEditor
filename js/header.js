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
    var self = this;

    reader.onload = function (e) {
      self.img = new Image(); // @ts-ignore

      self.img.src = e.target.result;
      self.imgWidth = self.img.width;
      self.imgHeight = self.img.height;

      self.img.onload = function () {
        if (Object.keys(__states.layer.layers).length === 0) {
          // load image offscreen to get dimensions
          (function (img) {
            resetApp();
            __states.width = img.width;
            __states.height = img.height; // END RESETS
          })(self.img);
        } else {
          if (self.imgWidth > __states.width || self.imgHeight > __states.height) {
            var diffWidth = self.imgWidth / (self.imgWidth / __states.width);
          }

          if (self.imgHeight > __states.height) {
            var diffHeight = self.imgHeight / (self.imgHeight / __states.height);
          }

          if (diffWidth > diffHeight) {
            self.imgWidth = diffWidth;
            self.imgHeight = self.imgHeight / (self.imgWidth / __states.width);
          }
        }

        var Layer = new CreateLayer(1, self.img);
        var canvasId = Layer.getId();
        var draw = new DrawToCanvas(canvasId, self.img, 0, 0, self.imgWidth, self.imgHeight);
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