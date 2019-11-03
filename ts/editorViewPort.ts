class Zoom {

    private zoomInc: number;
    private currentZoom: number;

    public constructor() {
        this.currentZoom = __states.zoom;
        this.zoomInc = 0.05;
    }

    public increaseZoom() {
        __states.zoom = __states.zoom > this.zoomInc 
            ? this.currentZoom + this.zoomInc 
            : __states.zoom;         
            __elements.editor().style.transform = `scale(${__states.zoom})`;
    }

    public decreaseZoom() {
        __states.zoom = __states.zoom > this.zoomInc 
            ? this.currentZoom - this.zoomInc 
            : __states.zoom;         
            __elements.editor().style.transform = `scale(${__states.zoom})`;
    }
}

interface ScreenSizeInterface {
    width: number;
    height: number;
}

interface ImageObjectInterface {
    width: number;
    height: number;
}

class EditorProps {
    
    sizeObj: ScreenSizeInterface;
    imgObj: ImageObjectInterface;
    panelsWidth: number;
    headerHeight: number;
    sidePadd: number;

    public constructor(screenSizeObj: ScreenSizeInterface, imgObj: ImageObjectInterface) {

        this.sizeObj = screenSizeObj;
        this.imgObj = imgObj;
        this.panelsWidth = 250 * 2;
        this.headerHeight = 30;
        this.sidePadd = 40;

    }

    private isScreenWideEnough() : boolean {
        return (this.sizeObj.width - this.panelsWidth) > this.imgObj.width
    }

    private isScreenHighEnough() : boolean {
        return (this.sizeObj.height - this.headerHeight) > this.imgObj.height
    }

    private calculateScale() : number {
        return this.isScreenWideEnough()
            ? (this.sizeObj.width - this.panelsWidth - (this.sidePadd * 2)) / this.imgObj.width
            :  0
    }

    public getConfig() : object {
        return {
            scale: this.calculateScale()            
        }
    }

}