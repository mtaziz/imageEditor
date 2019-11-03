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

  MoveTool.prototype.quit = function () {
    document.getElementById(__states.activeLayer).style.cursor = 'pointer';
    return this.active = false;
  };

  MoveTool.prototype.canvasEditMode = function () {
    this.canvas.style.cursor = 'crosshair';
  };

  MoveTool.prototype.run = function () {
    var _this = this;

    var self = this;
    this.isDraggable = false;

    this.canvas.onmousedown = function (event) {
      self.isDraggable = true;
      self.entry = _this.getCursorPosition(event);
      self.currentX = parseFloat(self.entry.x);
      self.currentY = parseFloat(self.entry.Y);
    };

    this.canvas.onmousemove = function (event) {
      if (self.isDraggable) {
        var pos = self.getCursorPosition(event);
        self.clearCanvas();
        self.context.drawImage(self.image, pos.x, pos.y);
      }

      ;
    }; // record to


    this.canvas.onmouseup = function (event) {
      var cursorX = self.getCursorPosition(event).x;
      var cursorY = self.getCursorPosition(event).y;

      var movedX = function () {
        return cursorX === self.currentX ? 0 : cursorX > self.currentX ? cursorX - self.currentX : self.currentX - cursorX;
      };

      var movedY = function () {
        return cursorY === self.currentY ? 0 : cursorY > self.currentY ? cursorY - self.currentY : self.currentY - cursorY;
      };

      console.log(cursorX + " " + _this.currentX);
      self.currentX = movedX();
      self.currentY = movedY();
      self.isDraggable = false;
    };
  };

  MoveTool.prototype.moveContext = function () {};

  return MoveTool;
}(Tool);