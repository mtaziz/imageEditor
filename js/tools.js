"use strict";

exports.__esModule = true;

var Tool =
/** @class */
function () {
  function Tool(element) {
    if (!__states.activeLayer) return;
    this.element = element;
    this.targetId = this.element.target.id;

    if (this.element.target.classList.contains('tool-focus')) {
      this.element.target.classList.remove('tool-focus');
      return;
    } else {
      this.element.target.classList.add('tool-focus');
    }

    this.canvas = document.getElementById(__states.activeLayer);
    this.context = this.canvas.getContext('2d');
    this.canvasScreenshot = this.canvas.toDataURL();
    this.image = new Image();
    this.image.src = this.canvasScreenshot;
    this.currentX = this.canvas.width / 2;
    this.currentY = this.canvas.height / 2;
  }

  Tool.prototype.getContext = function () {
    return this.canvas.getContext('2d');
  };

  Tool.prototype.getOffset = function () {
    var rect = this.canvas.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  };

  Tool.prototype.getCursorPosition = function (event) {
    var offsets = this.getOffset();
    return {
      x: event.pageX - offsets.left,
      y: event.pageY - offsets.top
    };
  };

  Tool.prototype.clearCanvas = function () {
    this.context.clearRect(0, 0, __states.width, __states.height);
  };

  return Tool;
}();

exports.Tool = Tool;