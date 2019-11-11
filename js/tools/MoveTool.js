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

    return _this;
  }

  MoveTool.prototype.quit = function () {
    document.getElementById(__states.activeLayer).style.cursor = 'pointer';
    this.canvas.removeEventListener('mousedown', this.mouseD);
    this.canvas.removeEventListener('mousemove', this.mouseM);
    this.canvas.removeEventListener('mouseup', this.mouseU);
  };

  MoveTool.prototype.canvasEditMode = function () {
    if (!this.canvas) return;
    this.canvas.style.cursor = 'crosshair';
  };

  MoveTool.prototype.run = function () {
    this.isDraggable = false;
    this.mouseD = this.mouseDown.bind(this);
    this.mouseM = this.mouseMove.bind(this);
    this.mouseU = this.mouseUp.bind(this);
    this.canvas.addEventListener('mousedown', this.mouseD);
    this.canvas.addEventListener('mousemove', this.mouseM);
    this.canvas.addEventListener('mouseup', this.mouseU);
  };

  MoveTool.prototype.mouseDown = function (event) {
    this.isDraggable = true;
    this.startCur = this.getCursorPosition(event);
  };

  MoveTool.prototype.mouseUp = function (event) {
    __states.layer.layers[__states.activeLayer].x = this.currentX;
    __states.layer.layers[__states.activeLayer].y = this.currentY;
    this.isDraggable = false;
  };

  MoveTool.prototype.mouseMove = function (event) {
    if (this.isDraggable) {
      this.current = this.getCursorPosition(event);
      if (!this.isInBounds(this.current)) return;
      this.currentX = this.coordsDist(this.startCur.x, this.current.x);
      this.currentY = this.coordsDist(this.startCur.y, this.current.y);
      this.clearCanvas();
      this.context.drawImage(this.image, this.currentX, this.currentY);
    }

    return event;
  }; // srt : start co-ordinate
  // cnt : current co-ordinate


  MoveTool.prototype.coordsDist = function (srt, cnt) {
    return srt === cnt ? cnt : srt > cnt ? cnt - (srt - cnt) : cnt + (cnt - srt);
  };

  MoveTool.prototype.isInBounds = function (current) {
    return current.x > 0 - this.image.width && current.x < this.canvas.width + this.image.width && current.y > 0 - this.image.height && current.y < this.canvas.height + this.image.height;
  };

  return MoveTool;
}(Tool);