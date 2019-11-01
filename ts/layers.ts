
interface LayerObj {
    w: number;
    h: number;
    op: number;
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
        states.totalLayers++;
        states.layer.last = `layer-${states.totalLayers}`;
        this.createCanvas();
        this.addLayerToQueue();

        // this is the first layer
        if (states.totalLayers === 1) {
            var layerObj = new EditorProps(getScreenSize(), this.getImageObj());
            this.props = layerObj.getConfig();
            this.setStyleOnEditor();
        }
        // add layer to view
        editor.append(this.canvas);

        // add new layer to layers pane list

        if(this.image) {
            const addTolayers = new AddTolayers(states.layer.last, this.image);
            addTolayers.addToDom();
        } else {    
            const addTolayers = new AddTolayers(states.layer.last);
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
             w: states.width,
             h: states.height,
            op: this.opacity,
        };

        states.layer.layers[states.layer.last] = layerObj;

    }

    private addStylesToLayer() : void {
        this.canvas.id = `${states.layer.last}`;
        this.canvas.width = states.width;
        this.canvas.height = states.height;
        this.canvas.style.opacity = this.opacity.toString();  
      
    }

    public getImageObj() : ImageObjectInterface {
        return {
            width: states.width, 
            height: states.height
        }
    }

    private setStyleOnEditor() : void {

        editor.style.display = 'block';
        editor.style.width = states.width + states.bordersWidth + "px";
        editor.style.height = states.height + states.bordersWidth + "px";

        if(this.props.scale > 0 && this.props.scale < 1) {
            editor.style.transform = `scale(${this.props.scale})`;
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
        this.ctx.fillRect(0, 0, states.width, states.height);
        this.layersPanel = layersList;
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
        states.activeLayer = this.canvasId;
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
                states.activeLayer = (<HTMLInputElement>event.target).value;
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
    if(!states.activeLayer) return;
    if(!(value >= 0 || value <= 100) ) return;
    const layer = document.getElementById(states.activeLayer);
    layer.style.opacity = (value / 100).toString();

}