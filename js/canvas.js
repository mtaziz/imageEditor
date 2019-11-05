"use strict";

// draw image to canvas
var DrawToCanvas =
/** @class */
function () {
  function DrawToCanvas(canvasId, image, x, y, width, height) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  DrawToCanvas.prototype.drawImage = function () {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  return DrawToCanvas;
}();

var CanvasMousePosition =
/** @class */
function () {
  function CanvasMousePosition(canvasId, event) {
    this.canvasId = canvasId;
    this.event = event;
    this.canvas = document.getElementById(this.canvasId);
    this.rect = this.canvas.getBoundingClientRect();
  }

  CanvasMousePosition.prototype.getPositions = function () {
    return {
      x: this.event.clientX,
      y: this.event.clientY
    };
  };

  return CanvasMousePosition;
}();