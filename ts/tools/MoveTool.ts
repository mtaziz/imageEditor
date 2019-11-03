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
    isDraggable: boolean;

    public constructor(element : MouseEvent) {

        if(!__states.activeLayer) return;

        super(element);
        this.canvasEditMode();
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
        var self = this;
        this.isDraggable = false;

        this.canvas.onmousedown = (event : MouseEvent) => {
            self.isDraggable = true;
            self.entry = this.getCursorPosition(event);
            self.currentX = parseFloat(self.entry.x);
            self.currentY = parseFloat(self.entry.Y)
        };    

        this.canvas.onmousemove = (event : MouseEvent) => {
            if(self.isDraggable) {
                let pos = self.getCursorPosition(event);
                self.clearCanvas();
                self.context.drawImage(self.image, pos.x, pos.y);
            };
        }

        this.canvas.onmouseup = (event : MouseEvent) => {
            var cursorX = self.getCursorPosition(event).x;
            var cursorY = self.getCursorPosition(event).y;

            var movedX = self.getCoordsDistance(cursorX, self.currentX);
            var movedY = self.getCoordsDistance(cursorY, self.currentY);
            
            self.currentX = self.currentX > cursorX 
                ? self.currentX + movedX 
                : self.currentX - movedX;
            self.currentY = movedY;
            self.isDraggable = false;
        };
    }



    private getCoordsDistance(a : number, b : number) : number {
        return a === b ? 0 : a > b ? a - b : b - a        
    }

    private moveContext() {}
}