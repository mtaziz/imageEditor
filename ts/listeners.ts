const states = require('./states');

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
        toolsSingleton('MoveTool', event);
        break; 
    }
});

const toolInstances = (function() : any {
    return {
      MoveTool: (event : MouseEvent) : MoveTool => new MoveTool(event)  
    }
})();

// Ensure only one tool is operating at a time
function toolsSingleton(tool : string, event : MouseEvent) : void {
      if(__states.tools.currentTool === tool) {
        __states.tools.currentTool = null;
        (<HTMLInputElement>event.target).parentElement.classList.remove('tool-focus');
        return __states.tools.toolObject.quit();
      }

      (<HTMLInputElement>event.target).parentElement.classList.add('tool-focus');
      __states.tools.toolObject = toolInstances[tool](event);
      __states.tools.currentTool = tool;
}

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


const __elements = (function() {
  return {
      editor : () => <HTMLElement>document.getElementById('editor-view'),
      body : () => <HTMLElement>document.querySelector('body'),
      layersList : () => <HTMLElement>document.getElementById('layersList')      
    }    
})();