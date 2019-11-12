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

    private canvasEditMode() : void {
        if(!this.canvas) return;
        this.canvas.style.cursor = 'crosshair';
    }
    
    public run() : void {
        this.isDraggable = false;
        this.mouseD = this.mouseDown.bind(this);
        this.mouseM = this.mouseMove.bind(this);
        this.mouseU = this.mouseUp.bind(this);
        this.canvas.addEventListener('mousedown', this.mouseD);
        this.canvas.addEventListener('mousemove', this.mouseM); 
        this.canvas.addEventListener('mouseup', this.mouseU);

        setInterval(function() {
            this.clearCanvas();
            this.context.drawImage(this.image, this.currentX, this.currentY);
        }.bind(this), 1000 / 30);
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
        console.log(this.startCur)
        console.log(this.currentX)
        console.log(this.currentY)
        console.log("------------")

    }

    public mouseUp(event : MouseEvent) : void {
        event.preventDefault();
        __states.layer.layers[__states.activeLayer].x = this.currentX;
        __states.layer.layers[__states.activeLayer].y = this.currentY;
        this.isDraggable = false;
    }

    public mouseMove(event: MouseEvent) {
        event.preventDefault();

        if(this.isDraggable) {

            this.cursor = this.getCursorPosition(event);

            if (!this.isInBounds(this.currentX, this.currentY, this.canvas, this.image)) return;
            if (!this.cursorOnImg(this.currentX, this.currentY, this.cursor, this.image)) return;

            this.currentX = this.calcCurrent(this.currentX, this.cursor.x, this.coordsDist(this.startCur.x, this.cursor.x)); 
            this.currentY = this.calcCurrent(this.currentY, this.cursor.y, this.coordsDist(this.startCur.y, this.cursor.y));

        }

    }

    // srt : start co-ordinate,  cnt : current co-ordinate
    private coordsDist(srt : number, cnt : number) : number {
        return srt === cnt ? 0 : srt > cnt ? srt - cnt : cnt - srt; 
    }

    // distance between cursor at mousedown and current position
    private calcCurrent(origCoord : number , currentCoord : number, cursorTravel : number) : number {
        return origCoord > currentCoord ? origCoord - cursorTravel : origCoord + cursorTravel;
    }

    // is the cursor inside the boundries of the image
    private cursorOnImg(x : number, y : number, cursor : Coords, img : HTMLImageElement) : boolean {
        if (cursor.x > x + img.width && cursor.x < x + img.width) return false;  
        if (cursor.y > y + img.height && cursor.y < y + img.height) return false;  
        return true;
    }

    // is the image inside the canvas
    private isInBounds(crntX : number, crntY : number, canvas : HTMLCanvasElement, img : HTMLImageElement) : boolean {
        return (crntX >= 0 - img.width ) && crntX < canvas.width && (crntY >= 0 - img.height ) && crntY < canvas.height;           
    }

}