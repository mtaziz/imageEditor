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

    _this.run();

    return _this;
  }

  MoveTool.prototype.canvasEditMode = function () {
    if (!this.canvas) return;
    this.canvas.style.cursor = 'crosshair';
  };

  MoveTool.prototype.run = function () {
    this.isDraggable = false;
    this.mouseEvents();
    setInterval(function () {
      this.tick();
    }.bind(this), 1000 / 10);
  };

  MoveTool.prototype.mouseEvents = function () {
    this.mouseD = this.mouseDown.bind(this);
    this.mouseM = this.mouseMove.bind(this);
    this.mouseU = this.mouseUp.bind(this);
    this.canvas.addEventListener('mousedown', this.mouseD);
    this.canvas.addEventListener('mousemove', this.mouseM);
    this.canvas.addEventListener('mouseup', this.mouseU);
  };

  MoveTool.prototype.tick = function () {
    if (!this.isInBounds()) return;
    this.clearCanvas();
    this.context.drawImage(this.image, this.currentX, this.currentY);
  };

  MoveTool.prototype.quit = function () {
    document.getElementById(__states.activeLayer).style.cursor = 'pointer';
    this.canvas.removeEventListener('mousedown', this.mouseD);
    this.canvas.removeEventListener('mousemove', this.mouseM);
    this.canvas.removeEventListener('mouseup', this.mouseU);
  };

  MoveTool.prototype.mouseDown = function (event) {
    event.preventDefault();
    this.isDraggable = true;
    this.startCur = this.getCursorPosition(event);
  };

  MoveTool.prototype.mouseUp = function (event) {
    event.preventDefault();
    __states.layer.layers[__states.activeLayer].x = this.currentX;
    __states.layer.layers[__states.activeLayer].y = this.currentY;
    this.isDraggable = false;
  };

  MoveTool.prototype.mouseMove = function (event) {
    event.preventDefault();
    if (!this.isDraggable) return;
    this.cursor = this.getCursorPosition(event);
    if (!this.cursorOnImg(this.currentX, this.currentY, this.cursor, this.image)) return;
    this.currentX = this.currentX - this.startCur.x + this.cursor.x;
    this.currentY = this.currentY - this.startCur.y + this.cursor.y;
  }; // is the cursor inside the boundries of the image


  MoveTool.prototype.cursorOnImg = function (x, y, cursor, img) {
    if (cursor.x > x + img.width && cursor.x < x + img.width) return false;
    if (cursor.y > y + img.height && cursor.y < y + img.height) return false;
    return true;
  }; // is the image inside the canvas


  MoveTool.prototype.isInBounds = function () {
    return this.currentX > 40 - this.image.width && this.currentX < this.canvas.width - 40 && this.currentY > 40 - this.image.height && this.currentY < this.canvas.height - 40;
  };

  return MoveTool;
}(Tool);