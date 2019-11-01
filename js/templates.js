"use strict";

function newProject() {
  return "\n        <div class=\"settingsPopup\">\n            <h3 class=\"\">Image Size</h3>\n            <div class=\"config-item margLeft15\">\n                <span class=\"label\">Width</span>\n                <input type=\"number\" id=\"setWidth\">\n                <span>px</span>\n            </div>\n            <div class=\"config-item margLeft15\">\n                <span class=\"label\">Height</span>\n                <input type=\"number\" id=\"setHeight\">\n                <span>px</span>\n            </div>  \n            <div class=\"popupBtns\">\n                <button id=\"createNewProject\" class=\"btns\">\n                    Ready\n                </button> \n                <button id=\"cancelNew\" class=\"btns\">\n                    Cancel\n                </button>               \n            </div>      \n        </div>  \n    ";
}

function openFileTemplate(data) {
  return "\n        <div class=\"settingsPopup\">\n            <h3>Upload image</h3>\n            <div class=\"config-item margLeft15\">\n                <input type=\"file\" id=\"" + data.id + "\">\n            </div>\n        </div>\n    ";
}

;