"use strict";

exports.__esModule = true;

var Tool =
/** @class */
function () {
  function Tool(element) {
    if (!states.activeLayer) return;
    this.element = element;
    this.targetId = this.element.target.id;

    if (this.element.target.classList.contains('tool-focus')) {
      this.element.target.classList.remove('tool-focus');
    } else {
      this.element.target.classList.add('tool-focus');
    }

    this.canvas = document.getElementById(states.activeLayer);
    this.currentX = this.canvas.width / 2;
    this.currentY = this.canvas.height / 2;
    var self = this;

    this.canvas.onmousedown = function (e) {
      var offsets = self.getOffset();
      var mouseX = e.pageX - offsets.left;
      var mouseY = e.pageY - offsets.top;
      console.log(mouseX + " " + mouseY);
    };
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

  return Tool;
}();

exports.Tool = Tool;