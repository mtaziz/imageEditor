"use strict";

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

var CreateLayer =
/** @class */
function () {
  function CreateLayer(opacity, image) {
    if (opacity === void 0) {
      opacity = 0;
    }

    this.image = image;
    this.opacity = opacity; // update layer id to match current

    __states.totalLayers++;
    __states.layer.last = "layer-" + __states.totalLayers;
    this.createCanvas();
    this.addLayerToQueue(); // this is the first layer

    if (__states.totalLayers === 1) {
      var layerObj = new EditorProps(getScreenSize(), this.getImageObj());
      this.props = layerObj.getConfig();
      this.setStyleOnEditor();
    } // add layer to view


    __elements.editor().append(this.canvas); // add new layer to layers pane list


    if (this.image) {
      var addTolayers = new AddTolayers(__states.layer.last, this.image);
      addTolayers.addToDom();
    } else {
      var addTolayers = new AddTolayers(__states.layer.last);
      addTolayers.addToDom();
    }
  }

  CreateLayer.prototype.createCanvas = function () {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas-layer');
    this.addStylesToLayer();
  };

  CreateLayer.prototype.addLayerToQueue = function () {
    var layerObj = {
      w: __states.width,
      h: __states.height,
      op: this.opacity,
      x: 0,
      y: 0,
      img: this.image.src || null
    };
    __states.layer.layers[__states.layer.last] = layerObj;
  };

  CreateLayer.prototype.addStylesToLayer = function () {
    this.canvas.id = "" + __states.layer.last;
    this.canvas.width = __states.width;
    this.canvas.height = __states.height;
    this.canvas.style.opacity = this.opacity.toString();
  };

  CreateLayer.prototype.getImageObj = function () {
    return {
      width: __states.width,
      height: __states.height
    };
  };

  CreateLayer.prototype.setStyleOnEditor = function () {
    __elements.editor().style.display = 'block';
    __elements.editor().style.width = __states.width + __states.bordersWidth + "px";
    __elements.editor().style.height = __states.height + __states.bordersWidth + "px";

    if (this.props.scale > 0 && this.props.scale < 1) {
      __elements.editor().style.transform = "scale(" + this.props.scale + ")";
    }
  };

  CreateLayer.prototype.getId = function () {
    return this.canvas.id;
  };

  return CreateLayer;
}();

var AddTolayers =
/** @class */
function () {
  function AddTolayers(canvasId, image) {
    this.canvasId = canvasId;

    if (image) {
      this.image = image;
      this.image.classList.add('layer-image');
    }

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = 'rgba(0,0,0,0)';
    this.ctx.fillRect(0, 0, __states.width, __states.height);
    this.layersPanel = __elements.layersList();
    this.container = this.createContainer();
    this.screenshot = this.image ? this.image : this.screenshotCanvas();
    this.nameBox = this.createNameBox();
  }

  AddTolayers.prototype.createContainer = function () {
    var div = document.createElement('div');
    div.classList.add('layer-item');
    div.id = "item-" + this.canvasId;
    div.classList.add('active-layer');
    __states.activeLayer = this.canvasId;
    this.resetList();
    return div;
  };

  AddTolayers.prototype.resetList = function () {
    var listItems = document.querySelectorAll(".layer-item");

    __spreadArrays(listItems).forEach(function (item) {
      item.classList.remove('active-layer');
    });
  };

  AddTolayers.prototype.listenForEvents = function () {
    var self = this;
    var listItems = document.querySelectorAll(".layer-item");

    __spreadArrays(listItems).forEach(function (item) {
      item.addEventListener('click', function () {
        self.resetList();
        __states.activeLayer = this.id.replace('item-', '');
        this.classList.add('active-layer');
      });
    });
  };

  AddTolayers.prototype.screenshotCanvas = function () {
    var screenShotImage = new Image();
    screenShotImage.classList.add('layer-image');
    screenShotImage.src = this.canvas.toDataURL();
    return screenShotImage;
  };

  AddTolayers.prototype.createNameBox = function () {
    var name = document.createElement('span');
    name.classList.add('layer-title');
    name.innerHTML = this.canvasId;
    console.log(this.canvasId);
    return name;
  };

  AddTolayers.prototype.hideLayer = function () {
    var i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add('fa-eye');
    i.classList.add('layers-eye');
    i.dataset.layer = this.canvasId;
    return i;
  };

  AddTolayers.prototype.addToDom = function () {
    this.container.append(this.hideLayer());
    this.container.append(this.screenshot);
    this.container.append(this.nameBox);
    this.layersPanel.append(this.container);
    this.listenForEvents();
  };

  return AddTolayers;
}();

function adjustLayerOpacity(value) {
  if (!__states.activeLayer) return;
  if (!(value >= 0 || value <= 100)) return;
  var layer = document.getElementById(__states.activeLayer);
  var displayOpacity = document.getElementById('currentOpacity');
  var screenShotImage = new Image();
  screenShotImage.classList.add('layer-image');
  screenShotImage.src = __states.layer.layers[__states.activeLayer].img.src; // need to replicate position here;

  var context = layer.getContext('2d');
  context.clearRect(0, 0, layer.width, layer.height);
  displayOpacity.innerHTML = value + "%";
  context.globalAlpha = value / 100;
  context.drawImage(screenShotImage, 0, 0);
}