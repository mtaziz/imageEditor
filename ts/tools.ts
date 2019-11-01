export class Tool {
    element: MouseEvent;
    targetId: string;
    canvas: HTMLCanvasElement;
    currentX: number;
    currentY: number;

    public constructor(element : MouseEvent) {

        if(!states.activeLayer) return;

        this.element = element;
        this.targetId = (<HTMLInputElement>this.element.target).id;

        if((<HTMLInputElement>this.element.target).classList.contains('tool-focus')) {
            (<HTMLInputElement>this.element.target).classList.remove('tool-focus');
        } else {
            (<HTMLInputElement>this.element.target).classList.add('tool-focus');
        }

        this.canvas = <HTMLCanvasElement>document.getElementById(states.activeLayer);
        this.currentX = this.canvas.width / 2;
        this.currentY = this.canvas.height / 2;
        
        const self = this;

        this.canvas.onmousedown = function(e) {
            let offsets = self.getOffset();
            var mouseX = e.pageX - offsets.left;
            var mouseY = e.pageY - offsets.top;
            console.log(`${mouseX} ${mouseY}`)
        }   

    }

    public getContext() {
        return this.canvas.getContext('2d');
    }

    public getOffset() : { top: number, left: number } {
        var rect = this.canvas.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { 
            top: rect.top + scrollTop, 
            left: rect.left + scrollLeft 
        }
    }
    
}
