
interface LayerObj {
    w: number;
    h: number;
    op: number;
    x : number;
    y:number;
}

class CreateLayer {

    opacity: number;
    canvas: HTMLCanvasElement;
    props: any;
    image?: HTMLImageElement;

    public constructor(opacity: number=0, image ?: HTMLImageElement) {

        this.image = image;
        this.opacity = opacity;

        // update layer id to match current
        __states.totalLayers++;
        __states.layer.last = `layer-${__states.totalLayers}`;
        this.createCanvas();
        this.addLayerToQueue();

        // this is the first layer
        if (__states.totalLayers === 1) {
            var layerObj = new EditorProps(getScreenSize(), this.getImageObj());
            this.props = layerObj.getConfig();
            this.setStyleOnEditor();
        }
        // add layer to view
        __elements.editor().append(this.canvas);

        // add new layer to layers pane list

        if(this.image) {
            const addTolayers = new AddTolayers(__states.layer.last, this.image);
            addTolayers.addToDom();
        } else {    
            const addTolayers = new AddTolayers(__states.layer.last);
            addTolayers.addToDom();
        }    

    }

    private createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('canvas-layer');
        this.addStylesToLayer();
    }

    private addLayerToQueue() : void {

        const layerObj: LayerObj = {
             w: __states.width,
             h: __states.height,
            op: this.opacity,
             x: 0,
             y: 0
        };

        __states.layer.layers[__states.layer.last] = layerObj;

    }

    private addStylesToLayer() : void {
        this.canvas.id = `${__states.layer.last}`;
        this.canvas.width = __states.width;
        this.canvas.height = __states.height;
        this.canvas.style.opacity = this.opacity.toString();  
      
    }

    public getImageObj() : ImageObjectInterface {
        return {
            width: __states.width, 
            height: __states.height
        }
    }

    private setStyleOnEditor() : void {

        __elements.editor().style.display = 'block';
        __elements.editor().style.width = __states.width + __states.bordersWidth + "px";
        __elements.editor().style.height = __states.height + __states.bordersWidth + "px";

        if(this.props.scale > 0 && this.props.scale < 1) {
            __elements.editor().style.transform = `scale(${this.props.scale})`;
        }

    }

    public getId() : string {
        return this.canvas.id;
    }
}


class AddTolayers {

    canvas: HTMLCanvasElement;
    canvasId: string;
    image?: HTMLImageElement;
    layersPanel: HTMLElement;
    container: HTMLElement;
    nameBox: HTMLElement;
    ctx: CanvasRenderingContext2D;
    screenshot: HTMLImageElement;

    public constructor(canvasId: string, image ?: HTMLImageElement) {
        this.canvasId = canvasId;

        if(image) {
            this.image = image;
            this.image.classList.add('layer-image');
        }    

        this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.ctx  = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.ctx.fillStyle = 'rgba(0,0,0,0)';
        this.ctx.fillRect(0, 0, __states.width, __states.height);
        this.layersPanel = __elements.layersList();
        this.container = this.createContainer();
        this.screenshot = this.image 
            ? this.image
            : this.screenshotCanvas();
        this.nameBox = this.createNameBox();
    }

    private createContainer() : HTMLElement {
        const div = document.createElement('div');
        div.classList.add('layer-item');
        div.id = `item-${this.canvasId}`;
        div.classList.add('active-layer');  
        __states.activeLayer = this.canvasId;
        this.resetList();
        return div;        
    }

    private resetList() {
        var listItems = <any>document.querySelectorAll(".layer-item");
        [...listItems].forEach((item: HTMLElement) => { 
            item.classList.remove('active-layer');
        });
    }

    private listenForEvents() {
        var self = this;
        var listItems = <any>document.querySelectorAll(".layer-item");
        [...listItems].forEach((item: HTMLElement) => { 
            item.addEventListener('click', function() {
                self.resetList();
                __states.activeLayer = this.id.replace('item-', '');
                this.classList.add('active-layer');
            }); 
        });        
    }

    private screenshotCanvas() : HTMLImageElement {
        const screenShotImage = new Image();
        screenShotImage.classList.add('layer-image');
        screenShotImage.src = this.canvas.toDataURL();
        return screenShotImage;        
    }

    private createNameBox() : HTMLElement {
        const name = document.createElement('span');
        name.classList.add('layer-title');
        name.innerHTML = this.canvasId;
        console.log(this.canvasId)
        return name;      
    }

    private hideLayer() {
        const i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add('fa-eye');
        i.classList.add('layers-eye')
        i.dataset.layer = this.canvasId;
        return i;
    }

    public addToDom() : void {
        this.container.append(this.hideLayer())
        this.container.append(this.screenshot);
        this.container.append(this.nameBox);
        this.layersPanel.append(this.container);       
        this.listenForEvents();
    }

}

function adjustLayerOpacity(value : number) {
    if(!__states.activeLayer) return;
    if(!(value >= 0 || value <= 100) ) return;
    const layer = document.getElementById(__states.activeLayer);
    const displayOpacity = document.getElementById('currentOpacity');
    displayOpacity.innerHTML = `${value}%`;
    layer.style.opacity = (value / 100).toString();

}