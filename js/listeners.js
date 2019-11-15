"use strict";


document.addEventListener('click', function (event) {
  switch (event.target.id) {
    case 'file-new':
      createPopup(newProject);
      break;

    case 'cancelNew':
      removePopup();
      break;

    case 'createNewProject':
      createNewProject();
      break;

    case 'file-open':
      createPopup(openFileTemplate, {
        id: 'file-upload'
      });
      break;

    case 'file-quit':
      quit();
      break;

    case 'file-open-as-layer':
      createPopup(openFileTemplate, {
        id: 'file-upload'
      });
      break;

    case 'increaseZoom':
      var zoom = new Zoom();
      zoom.increaseZoom();
      break;

    case 'decreaseZoom':
      var zoom = new Zoom();
      zoom.decreaseZoom();
      break;
    // tools

    case 'move-tool':
      toolsSingleton('MoveTool', event);
      break;
  }
});

var toolInstances = function () {
  return {
    MoveTool: function (event) {
      return new MoveTool(event);
    }
  };
}(); // Ensure only one tool is operating at a time


function toolsSingleton(tool, event) {
  if (__states.tools.currentTool === tool) {
    __states.tools.currentTool = null;
    event.target.parentElement.classList.remove('tool-focus');
    return __states.tools.toolObject.quit();
  }

  event.target.parentElement.classList.add('tool-focus');
  __states.tools.toolObject = toolInstances[tool](event);
  __states.tools.currentTool = tool;
}

document.addEventListener('change', function (event) {
  switch (event.target.id) {
    case 'file-upload':
      new CreateByUpload(event.target.files[0]);
      removePopup();
      break;

    case 'layerOpacity':
      adjustLayerOpacity(Number(event.target.value));
  }
});

var __elements = function () {
  return {
    editor: function () {
      return document.getElementById('editor-view');
    },
    body: function () {
      return document.querySelector('body');
    },
    layersList: function () {
      return document.getElementById('layersList');
    }
  };
}();