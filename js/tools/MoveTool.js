"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


var MoveTool =
/** @class */
function (_super) {
  __extends(MoveTool, _super);

  function MoveTool(element) {
    var _this = this;

    if (!__states.activeLayer) return;
    _this = _super.call(this, element) || this;

    _this.canvasEditMode();

    _this.currentCursorX = null;
    _this.currentCursorY = null;
    _this.currentX = 0;
    _this.currentY = 0;

    _this.run();

    return _this;
  }

  MoveTool.prototype.quit = function () {
    document.getElementById(__states.activeLayer).style.cursor = 'pointer';
    return this.active = false;
  };

  MoveTool.prototype.canvasEditMode = function () {
    this.canvas.style.cursor = 'crosshair';
  };

  MoveTool.prototype.run = function () {
    var _this = this;

    this.isDraggable = false;

    this.canvas.onmousedown = function (event) {
      return _this.mouseDown(event);
    };

    this.canvas.onmousemove = function (event) {
      return _this.mouseMove(event);
    };

    this.canvas.onmouseup = function (event) {
      return _this.mouseUp(event);
    };
  };

  MoveTool.prototype.mouseDown = function (event) {
    this.isDraggable = true;
    this.entry = this.getCursorPosition(event);
    this.startCursorX = parseFloat(this.entry.x);
    this.startCursorY = parseFloat(this.entry.y);
  };

  MoveTool.prototype.mouseUp = function (event) {
    this.isDraggable = false;
    this.canvas.removeEventListener('mousemove', this.mouseMove);
  };

  MoveTool.prototype.mouseMove = function (event) {
    if (this.isDraggable) {
      this.entry = this.getCursorPosition(event);
      this.currentCursorX = parseFloat(this.entry.x);
      this.currentCursorY = parseFloat(this.entry.y);
      this.originalDistanceCusorX = this.startCursorX > this.currentCursorX ? this.currentX - Math.abs(this.startCursorX - this.currentCursorX) : this.currentX + Math.abs(this.startCursorX + this.currentX);
      this.originalDistanceCusorY = this.startCursorY > this.currentCursorY ? this.currentY - Math.abs(this.startCursorY - this.currentCursorY) : this.currentY + Math.abs(this.startCursorY + this.currentCursorY);
      this.clearCanvas();
      this.context.drawImage(this.image, this.originalDistanceCusorX, this.originalDistanceCusorY);
      //this.currentX = this.originalDistanceCusorX;
      //this.currentY = this.originalDistanceCusorY;
    }

    return event;
  };

  return MoveTool;
}(Tool);