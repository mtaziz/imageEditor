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

        this.element = element;
        this.targetId = (<HTMLInputElement>this.element.target).id;

        if((<HTMLInputElement>this.element.target).parentElement.classList.contains('tool-focus')) {
            (<HTMLInputElement>this.element.target).parentElement.classList.remove('tool-focus');
            return;
        } else {
            (<HTMLInputElement>this.element.target).parentElement.classList.add('tool-focus');
        }

        this.canvas = <HTMLCanvasElement>document.getElementById(__states.activeLayer);
        this.context = this.canvas.getContext('2d');
        this.canvasScreenshot = this.canvas.toDataURL();
        this.image = new Image();
        this.image.src = this.canvasScreenshot;

    }

    public getContext() : CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    public getOffset() : { top: number, left: number } {
        const rect = this.canvas.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { 
            top: rect.top + scrollTop, 
            left: rect.left + scrollLeft 
        }
    }

    public getCursorPosition(event : MouseEvent) {
        const offsets = this.getOffset();
        return {
            x: event.pageX - offsets.left,
            y: event.pageY - offsets.top 
        }
    }

    public clearCanvas() {
        this.context.clearRect(0, 0, __states.width, __states.height);

    }
    
}
