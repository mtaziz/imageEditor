const Tool = require('../tools');

interface Coords {
    x: number;
    y: number;
}

class MoveTool extends Tool {

    button: HTMLElement;
    canvas: HTMLCanvasElement;
    active: boolean;
    timer: any;
    entryCoords: Coords;
    exitCoords: Coords;
    cursorX: number;
    cursorY: number;
    // distance between the position of the last onmouseup
    // to the latest onmousedown
    originalDistanceCusorX: number;
    originalDistanceCusorY: number;     
    isDraggable: boolean;

    public constructor(element : MouseEvent) {

        if(!__states.activeLayer) return;

        super(element);
        this.canvasEditMode();
        this.cursorX = null;
        this.cursorY = null;
        this.currentX = __states.layer.layers[__states.activeLayer].x;
        this.currentY = __states.layer.layers[__states.activeLayer].y;        
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
        this.canvas.onmouseup = (event) => this.mouseUp(event);
    }

    private mouseDown(event : MouseEvent) : void {
        this.isDraggable = true;
        this.entry = this.getCursorPosition(event);
        this.cursorX = parseFloat(this.entry.x);
        this.cursorY = parseFloat(this.entry.y);
        this.originalDistanceCusorX = Math.abs(this.currentX - this.cursorX);
        this.originalDistanceCusorY = Math.abs(this.currentY - this.cursorY);
    }

    private mouseUp(event : MouseEvent) : void {
        this.currentX = this.getCursorPosition(event).x;
        this.currentY = this.getCursorPosition(event).y;
        this.isDraggable = false;
        this.canvas.removeEventListener('mousemove', this.mouseMove);

        __states.layer.layers[__states.activeLayer].x =                 
            this.getDrawPosition(
                this.originalDistanceCusorX , 
                this.cursorX, 
                this.getCoordsDistance(this.cursorX, this.currentX)
            );

        __states.layer.layers[__states.activeLayer].y = 
            this.getDrawPosition(
                this.originalDistanceCusorY , 
                this.cursorY, 
                this.getCoordsDistance(this.cursorY, this.currentY)
            );
    }

    private mouseMove(event: MouseEvent) : MouseEvent {
        if(this.isDraggable) {
            let pos = this.getCursorPosition(event);
            let distanceX = this.getCoordsDistance(this.cursorX, pos.x);
            let distanceY = this.getCoordsDistance(this.cursorY, pos.y); 

            this.clearCanvas();

            this.context.drawImage(
                this.image, 
                this.getDrawPosition(
                    this.originalDistanceCusorX , 
                    this.cursorX, 
                    distanceX
                ),
                this.getDrawPosition(
                    this.originalDistanceCusorY , 
                    this.cursorY, 
                    distanceY
                )
            );            
        }
        return event;
    }

    // @return larger number minus the smaller number or 0
    private getCoordsDistance(a : number, b : number) : number {
        return a === b ? 0 : a > b ? a - b : b - a        
    }

    // @return negative number of c if a < b or 0
    private getDrawPosition(a : number, b : number, c : number) : number {
        return a === b ? 0 : a < b ? -Math.abs(c) : Math.abs(c);
    }
}