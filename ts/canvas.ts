// draw image to canvas
class DrawToCanvas {

    canvasId : string; 
    canvas: any;
    ctx: CanvasRenderingContext2D;
    image : HTMLImageElement;
    x: number;
    y: number;       
 
    public constructor(canvasId : string, image : HTMLImageElement, x : number, y : number) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);
        this.ctx  = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.image = image;
        this.x = x;
        this.y = y;
    }

    public drawImage() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }

}


class CanvasMousePosition {

    canvasId: string;
    canvas: HTMLCanvasElement;
    rect: ClientRect;
    event: MouseEvent;

    public constructor(canvasId: string, event: MouseEvent ) {
        this.canvasId = canvasId;
        this.event = event;
        this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
        this.rect = this.canvas.getBoundingClientRect(); 
    }

    public getPositions() : { x : number, y : number} {
        return {
            x: this.event.clientX,
            y: this.event.clientY
        }
    }

}