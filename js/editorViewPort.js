"use strict";

var Zoom =
/** @class */
function () {
  function Zoom() {
    this.currentZoom = states.zoom;
    this.zoomInc = 0.05;
  }

  Zoom.prototype.increaseZoom = function () {
    states.zoom = states.zoom > this.zoomInc ? this.currentZoom + this.zoomInc : states.zoom;
    editor.style.transform = "scale(" + states.zoom + ")";
  };

  Zoom.prototype.decreaseZoom = function () {
    states.zoom = states.zoom > this.zoomInc ? this.currentZoom - this.zoomInc : states.zoom;
    editor.style.transform = "scale(" + states.zoom + ")";
  };

  return Zoom;
}();

var EditorProps =
/** @class */
function () {
  function EditorProps(screenSizeObj, imgObj) {
    this.sizeObj = screenSizeObj;
    this.imgObj = imgObj;
    this.panelsWidth = 250 * 2;
    this.headerHeight = 30;
    this.sidePadd = 40;
  }

  EditorProps.prototype.isScreenWideEnough = function () {
    return this.sizeObj.width - this.panelsWidth > this.imgObj.width;
  };

  EditorProps.prototype.isScreenHighEnough = function () {
    return this.sizeObj.height - this.headerHeight > this.imgObj.height;
  };

  EditorProps.prototype.calculateScale = function () {
    return this.isScreenWideEnough() ? (this.sizeObj.width - this.panelsWidth - this.sidePadd * 2) / this.imgObj.width : 0;
  };

  EditorProps.prototype.getConfig = function () {
    return {
      scale: this.calculateScale()
    };
  };

  return EditorProps;
}();