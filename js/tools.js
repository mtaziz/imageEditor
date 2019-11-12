"use strict";

exports.__esModule = true;

var Tool =
/** @class */
function () {
  function Tool(element) {
    if (!__states.activeLayer) return;
    this.element = element;
    this.targetId = this.element.target.id;
    this.currentX = __states.layer.layers[__states.activeLayer].x;
    this.currentY = __states.layer.layers[__states.activeLayer].y;
    this.canvas = document.getElementById(__states.activeLayer);
    this.context = this.canvas.getContext('2d');
    this.image = new Image();

    if (!__states.layer.layers[__states.activeLayer].img) {
      this.canvasScreenshot = this.canvas.toDataURL();
      this.image.src = this.canvasScreenshot;
    } else {
      this.image.src = __states.layer.layers[__states.activeLayer].img;
    }
  }

  Tool.prototype.getContext = function () {
    return this.canvas.getContext('2d');
  };

  Tool.prototype.getCursorPosition = function (event) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  Tool.prototype.clearCanvas = function () {
    this.context.clearRect(0, 0, __states.width, __states.height);
  };

  return Tool;
}();

exports.Tool = Tool;