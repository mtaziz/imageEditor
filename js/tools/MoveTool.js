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

    _this.cursorX = null;
    _this.cursorY = null;
    _this.currentX = __states.layer.layers[__states.activeLayer].x;
    _this.currentY = __states.layer.layers[__states.activeLayer].y;

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
    this.cursorX = parseFloat(this.entry.x);
    this.cursorY = parseFloat(this.entry.y);
    this.originalDistanceCusorX = Math.abs(this.currentX - this.cursorX);
    this.originalDistanceCusorY = Math.abs(this.currentY - this.cursorY);
  };

  MoveTool.prototype.mouseUp = function (event) {
    this.currentX = this.getCursorPosition(event).x;
    this.currentY = this.getCursorPosition(event).y;
    this.isDraggable = false;
    this.canvas.removeEventListener('mousemove', this.mouseMove);
    __states.layer.layers[__states.activeLayer].x = this.getDrawPosition(this.originalDistanceCusorX, this.cursorX, this.getCoordsDistance(this.cursorX, this.currentX));
    __states.layer.layers[__states.activeLayer].y = this.getDrawPosition(this.originalDistanceCusorY, this.cursorY, this.getCoordsDistance(this.cursorY, this.currentY));
  };

  MoveTool.prototype.mouseMove = function (event) {
    if (this.isDraggable) {
      var pos = this.getCursorPosition(event);
      var distanceX = this.getCoordsDistance(this.cursorX, pos.x);
      var distanceY = this.getCoordsDistance(this.cursorY, pos.y);
      this.clearCanvas();
      this.context.drawImage(this.image, this.getDrawPosition(this.originalDistanceCusorX, this.cursorX, distanceX), this.getDrawPosition(this.originalDistanceCusorY, this.cursorY, distanceY));
    }

    return event;
  }; // @return larger number minus the smaller number or 0


  MoveTool.prototype.getCoordsDistance = function (a, b) {
    return a === b ? 0 : a > b ? a - b : b - a;
  }; // @return negative number of c if a < b or 0


  MoveTool.prototype.getDrawPosition = function (a, b, c) {
    return a === b ? 0 : a < b ? -Math.abs(c) : Math.abs(c);
  };

  return MoveTool;
}(Tool);