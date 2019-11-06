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
    _this.currentX = _this.getCursorPosition(event).x;
    _this.currentY = _this.getCursorPosition(event).y;

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
    this.originalDistanceCusorX = this.currentX > this.cursorX ? 0 - Math.abs(this.currentX - this.cursorX) : Math.abs(this.cursorX - this.currentX);
    this.originalDistanceCusorY = this.currentY > this.cursorY ? 0 - Math.abs(this.currentY - this.cursorY) : Math.abs(this.cursorY - this.currentY);
    console.log(this.originalDistanceCusorX + '  ' + this.originalDistanceCusorY);
    this.clearCanvas();
    this.context.drawImage(this.image, this.originalDistanceCusorX, this.originalDistanceCusorY);
  };

  MoveTool.prototype.mouseUp = function (event) {
    this.currentX = this.getCursorPosition(event).x;
    this.currentY = this.getCursorPosition(event).y;
    this.isDraggable = false;
    this.canvas.removeEventListener('mousemove', this.mouseMove);
    /*
            __states.layer.layers[__states.activeLayer].x =
                this.getDrawPosition(
                    this.originalDistanceCusorX ,
                    this.cursorX,
                    this.getCoordsDistance(this.cursorX, this.currentX)
                );
    
            __states.layer.layers[__states.activeLayer].y =
                this.getDrawPosition(
                    this.originalDistanceCusorY ,
                    this.cursorY,
                    this.getCoordsDistance(this.cursorY, this.currentY)
                );
    */
  };

  MoveTool.prototype.mouseMove = function (event) {
    if (this.isDraggable) {
      /*
      let pos = this.getCursorPosition(event);
      let distanceX = this.getCoordsDistance(this.cursorX, pos.x);
      let distanceY = this.getCoordsDistance(this.cursorY, pos.y);
      */
      this.clearCanvas();
      this.context.drawImage(this.image, this.originalDistanceCusorX, this.originalDistanceCusorY);
    }

    return event;
  }; // @return larger number minus the smaller number or 0


  MoveTool.prototype.getCoordsDistance = function (a, b) {
    return a === b ? 0 : a > b ? a - b : b - a;
  };

  return MoveTool;
}(Tool);