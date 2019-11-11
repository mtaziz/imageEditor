export interface Coords {
    x : number;
    y : number;
}

export class Tool {
    element: MouseEvent;
    targetId: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    canvasScreenshot: string;
    image: HTMLImageElement;    
    currentX: number;
    currentY: number;

    public constructor(element : MouseEvent) {

        if(!__states.activeLayer) return;

        this.element  = element;
        this.targetId = (<HTMLInputElement>this.element.target).id;
        this.currentX = __states.layer.layers[__states.activeLayer].x;
        this.currentY = __states.layer.layers[__states.activeLayer].y;
        this.canvas   = <HTMLCanvasElement>document.getElementById(__states.activeLayer);
        this.context  = this.canvas.getContext('2d');
        this.image    = new Image();

        if(!__states.layer.layers[__states.activeLayer].img) {
            this.canvasScreenshot = this.canvas.toDataURL();
            this.image.src = this.canvasScreenshot;
        } else {
            this.image.src = __states.layer.layers[__states.activeLayer].img;
        }    

    }

    public getContext() : CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    public getOffset() : Coords{
        const rect = this.canvas.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { 
            x: rect.top + scrollTop, 
            y: rect.left + scrollLeft 
        }
    }

    public getCursorPosition(event : MouseEvent) : Coords {
        const offsets = this.getOffset();
        return {
            x: event.pageX - offsets.x,
            y: event.pageY - offsets.y 
        }
    }

    public clearCanvas() : void {
        this.context.clearRect(0, 0, __states.width, __states.height);
    }
    
}
