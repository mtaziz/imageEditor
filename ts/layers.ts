
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

    form: any;
    canvas: HTMLCanvasElement;
    canvasId: string;
    image?: HTMLImageElement;
    layersPanel: HTMLElement;
    container: HTMLElement;
    nameBox: HTMLElement;
    ctx: CanvasRenderingContext2D;
    screenshot: HTMLImageElement;

    public constructor(canvasId: string, image ?: HTMLImageElement) {
        this.form = document.querySelectorAll<HTMLInputElement>("#layersList input[name='layerRadio']")
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
        this.createNameBox();
    }

    private createContainer() : HTMLElement {
        const div = document.createElement('div');
        div.classList.add('layer-item');
        div.id = `item-${this.canvasId}`;        
        const input = document.createElement('input');
        input.type = 'radio';
        input.value = `${this.canvasId}`;
        input.classList.add('layer-radio-button');
        input.name = 'layerRadio'
        input.checked = true;
        div.append(input);
        __states.activeLayer = this.canvasId;
        return div;        
    }

    private resetBulletsList() {
        [...this.form].forEach((radio: HTMLInputElement) => { 
            radio.checked = false;
        });
    }

    private listenForEvents() {
        const form = <any>document.querySelectorAll("#layersList input[name='layerRadio']");
        [...form].forEach((radio: HTMLInputElement) => { 
            radio.addEventListener('change', (event: Event) => {
                this.resetBulletsList();
                __states.activeLayer = (<HTMLInputElement>event.target).value;
                (<HTMLInputElement>event.target).checked = true;
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
        return name;      
    }

    public addToDom() : void {
        this.container.append(this.screenshot);
        this.container.append(this.nameBox);
        this.layersPanel.append(this.container);       
        this.resetBulletsList();
        this.listenForEvents();
    }

}

function adjustLayerOpacity(value : number) {
    if(!__states.activeLayer) return;
    if(!(value >= 0 || value <= 100) ) return;
    const layer = document.getElementById(__states.activeLayer);
    layer.style.opacity = (value / 100).toString();

}