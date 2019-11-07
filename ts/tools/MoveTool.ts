const Tool = require('../tools');

interface Coords {
    x: number;
    y: number;
    startCursorX: number;
    startCursorY: number;
}

class MoveTool extends Tool {

    button: HTMLElement;
    canvas: HTMLCanvasElement;
    currentCursorX: number;
    currentCursorY: number;
    // distance between initial cursor position set at onmousedown
    // and the current cursor position
    distanceCusorX: number;
    distanceCusorY: number;     
    isDraggable: boolean;

    public constructor(element : MouseEvent) {

        if(!__states.activeLayer) return;

        super(element);
        this.canvasEditMode();
        this.currentCursorX = null;
        this.currentCursorY = null;     
        this.run();
    }    

    public quit(this : this) {
        document.getElementById(__states.activeLayer).style.cursor = 'pointer';
        return this.active = false;
    }

    private canvasEditMode() {
        this.canvas.style.cursor = 'crosshair';        
    }
    
    private run() {
        this.isDraggable = false;
        this.canvas.onmousedown = (event) => this.mouseDown(event);
        this.canvas.onmousemove = (event) => this.mouseMove(event); 
        this.canvas.onmouseup   = (event) => this.mouseUp(event);
    }

    private mouseDown(event : MouseEvent) : void {
        this.isDraggable = true;
        this.entry = this.getCursorPosition(event);
        this.startCursorX = parseFloat(this.entry.x);
        this.startCursorY =  parseFloat(this.entry.y);
    }

    private mouseUp(event : MouseEvent) : void {
        this.isDraggable = false;
        this.canvas.removeEventListener('mousemove', this.mouseMove);
        
    }

    private mouseMove(event: MouseEvent) : MouseEvent {
        if(this.isDraggable) {
            this.entry = this.getCursorPosition(event);
            this.currentCursorX = parseFloat(this.entry.x);
            this.currentCursorY = parseFloat(this.entry.y);
            this.distanceCusorX = 
                this.startCursorX > this.currentCursorX 
                    ? this.currentX - Math.abs(this.startCursorX - this.currentCursorX) 
                    : this.currentX + Math.abs(this.startCursorX + this.currentX);
            this.distanceCusorY = 
                this.startCursorY > this.currentCursorY 
                    ? this.currentY - Math.abs(this.startCursorY - this.currentCursorY) 
                    : this.currentY + Math.abs(this.startCursorY + this.currentCursorY);            
            this.clearCanvas();
            this.context.drawImage(this.image, this.distanceCusorX, this.distanceCusorY);
        }
        return event;
    }
}