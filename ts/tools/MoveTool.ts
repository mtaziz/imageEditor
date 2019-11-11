const Tool = require('../tools');

interface Coords {
    x : number;
    y : number;
}

class MoveTool extends Tool {

    button: HTMLElement;
    canvas: HTMLCanvasElement;  
    isDraggable: boolean;

    public constructor(element : MouseEvent) {
        if(!__states.activeLayer) return;
        super(element);
        this.canvasEditMode();
    }    

    public quit() {
        document.getElementById(__states.activeLayer).style.cursor = 'pointer';
        this.canvas.removeEventListener('mousedown', this.mouseD);
        this.canvas.removeEventListener('mousemove', this.mouseM);
        this.canvas.removeEventListener('mouseup', this.mouseU);
    }

    private canvasEditMode() {
        if(!this.canvas) return;
        this.canvas.style.cursor = 'crosshair';        
    }
    
    public run() {
        this.isDraggable = false;
        this.mouseD = this.mouseDown.bind(this);
        this.mouseM = this.mouseMove.bind(this);
        this.mouseU = this.mouseUp.bind(this);
        this.canvas.addEventListener('mousedown', this.mouseD);
        this.canvas.addEventListener('mousemove', this.mouseM); 
        this.canvas.addEventListener('mouseup', this.mouseU);
    }

    public mouseDown(event : MouseEvent) : void {
        this.isDraggable = true;
        this.startCur = this.getCursorPosition(event);
    }

    public mouseUp() : void {
        __states.layer.layers[__states.activeLayer].x = this.currentX;
        __states.layer.layers[__states.activeLayer].y = this.currentY;
        this.isDraggable = false;
    }

    public mouseMove(event: MouseEvent) : MouseEvent {

        if(this.isDraggable) {
            this.current = this.getCursorPosition(event);
            if(!(this.isInBounds(this.current, this.canvas, this.image))) return;
            this.currentX = this.coordsDist(this.startCur.x, this.current.x); 
            this.currentY = this.coordsDist(this.startCur.y, this.current.y);  
            this.clearCanvas();
            this.context.drawImage(this.image, this.currentX, this.currentY);
        }

        return event;

    }

    // srt : start co-ordinate,  cnt : current co-ordinate
    private coordsDist(srt : number, cnt : number) {
        return srt === cnt ? cnt : srt > cnt ? cnt - (srt - cnt) : cnt + (cnt - srt); 
    }

    private isInBounds(crnt : Coords, can : HTMLCanvasElement, img : HTMLImageElement) : boolean {
        return crnt.x > 0 - img.width && crnt.x < can.width + img.width && 
               crnt.y > 0 - img.height && crnt.y < can.height + img.height;           
    }
}