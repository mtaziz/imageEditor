document.addEventListener('click', function (event) {
    switch ((<HTMLInputElement>event.target).id) {
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
          id : 'file-upload'
        });
        break;
  
      case 'file-quit':
        quit();
        break;
  
      case 'file-open-as-layer':
        createPopup(openFileTemplate, {
          id : 'file-upload'
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

document.addEventListener('change', function(event) {
    switch ((<HTMLInputElement>event.target).id) {
      case 'file-upload':
        new CreateByUpload((<HTMLInputElement>event.target).files[0]);
        removePopup();
        break;

      case 'layerOpacity':
        adjustLayerOpacity(Number((<HTMLInputElement>event.target).value));
    }    
});

const editor = <HTMLElement>document.getElementById('editor-view');
const editorPane = <HTMLElement>document.getElementById('editor-pane');
const body = <HTMLElement>document.querySelector('body');
const layersList = <HTMLElement>document.getElementById('layersList');