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
        this.run();
    }    

    private canvasEditMode() : void {
        if(!this.canvas) return;
        this.canvas.style.cursor = 'crosshair';
    }
    
    public run() : void {
        this.isDraggable = false;
        this.mouseEvents();

        setInterval(function() {
           this.tick();
        }.bind(this), 1000/ 10)
    }


    public mouseEvents() {
        this.mouseD = this.mouseDown.bind(this);
        this.mouseM = this.mouseMove.bind(this);
        this.mouseU = this.mouseUp.bind(this);
        this.canvas.addEventListener('mousedown', this.mouseD);
        this.canvas.addEventListener('mousemove', this.mouseM); 
        this.canvas.addEventListener('mouseup', this.mouseU);
    }

    public tick() {
        this.clearCanvas();
        this.context.drawImage(this.image, this.currentX, this.currentY);
    }


    public quit() : void {
        document.getElementById(__states.activeLayer).style.cursor = 'pointer';
        this.canvas.removeEventListener('mousedown', this.mouseD);
        this.canvas.removeEventListener('mousemove', this.mouseM);
        this.canvas.removeEventListener('mouseup', this.mouseU);
    }
    

    public mouseDown(event : MouseEvent) : void {
        event.preventDefault();
        this.isDraggable = true;
        this.startCur = this.getCursorPosition(event);
    }

    public mouseUp(event : MouseEvent) : void {
        event.preventDefault();
        __states.layer.layers[__states.activeLayer].x = this.currentX;
        __states.layer.layers[__states.activeLayer].y = this.currentY;
        this.isDraggable = false;
    }

    public mouseMove(event: MouseEvent) {
        event.preventDefault();

        if (!this.isDraggable) return;
        this.cursor = this.getCursorPosition(event);
        if (!this.cursorOnImg(this.currentX, this.currentY, this.cursor, this.image)) return;
        var tempX = this.currentX;
        var tempY = this.currentY;
        this.currentX = this.currentX - this.startCur.x + this.cursor.x;
        this.currentY = this.currentY - this.startCur.y + this.cursor.y;
        if (!this.isInBounds()) {
            this.currentX = tempX;
            this.currentY = tempY;
        }

    }

    // is the cursor inside the boundries of the image
    private cursorOnImg(x : number, y : number, cursor : Coords, img : HTMLImageElement) : boolean {
        if (cursor.x > x + img.width && cursor.x < x) return false;  
        if (cursor.y > y + img.height && cursor.y < y) return false;  
        return true;
    }

    // is the image inside the canvas
    private isInBounds() : boolean {
        return this.currentX > 20 - this.image.width && this.currentX < this.canvas.width - 20 &&
            this.currentY > 20 - this.image.height && this.currentY < this.canvas.height - 20    
    }

}