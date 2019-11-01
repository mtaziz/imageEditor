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
      new MoveTool(event);
      break;
  }
});
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
var editor = document.getElementById('editor-view');
var editorPane = document.getElementById('editor-pane');
var body = document.querySelector('body');
var layersList = document.getElementById('layersList');