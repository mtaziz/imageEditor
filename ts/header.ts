const __states = require('./states');
   
/* create new project */
function createNewProject() : void {

    __elements.editor().innerHTML = '';
    __states.layer.layers.length = 0;
    __states.width = Number((<HTMLInputElement> document.getElementById('setWidth')).value);
    __states.height = Number((<HTMLInputElement> document.getElementById('setHeight')).value);
    new CreateLayer(1);
    removePopup();

}

interface ICallback {
    (data : object) : string;
}

function createPopup(callback: ICallback, data ?: Object) : void {

    const el = document.createElement('div');
    el.id = 'popup';
    el.innerHTML = callback(data);
    __elements.body().append(el);

}

/* remove config popup */
function removePopup() {
    return document.getElementById('popup').remove();
}

class CreateByUpload {

    files: any;

    public constructor(files: any) {

        this.files = files;
        const reader = new FileReader();
        const name = files.name

        reader.onload = function(e) {
            const img : HTMLImageElement = new Image();
            // @ts-ignore
            img.src  = e.target.result;

            img.onload = function() {
                if(Object.keys(__states.layer.layers).length === 0) {
                    // load image offscreen to get dimensions
                    (function(img) {
                        // RESETS - REFACTOR
                        resetApp();    
                        __states.width = img.width;
                        __states.height = img.height;
                        // END RESETS
                    })(img);    
                }
                const Layer = new CreateLayer(1, img);
                const canvasId = Layer.getId();    
                const draw = new DrawToCanvas(canvasId, img, 0, 0);
                draw.drawImage();
            }

        }
        // img.src = imageBlob
        reader.readAsDataURL(files);       
    
    }
}

function quit() {
    console.log("quit application")
}


interface ScreenSizeInterface {
    width: number;
    height: number;
}

// @return object - available screen width and height
function getScreenSize() : ScreenSizeInterface {
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }
}

function resetApp() {

    __elements.editor().innerHTML = '';
    __elements.layersList().innerHTML = '';
    __states.layer.layers.length = 0;
    __states.layer.last = -1;
    __states.zoom = 1;
    __states.width = 1280;
    __states.height = 720;
    __states.bordersWidth = 4;

}
