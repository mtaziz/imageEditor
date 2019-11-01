interface LayerInterface {
    layers: Array<object>;
}

interface FontInterface {
    family: string;
    size: number;
    color: string;
    style: string;
    weight: string;
}

interface StatesInterface  {
    layer: LayerInterface;
    activeLayer: string;
    zoom: number;
    width: number;
    height: number;
    bordersWidth: number;
    totalLayers : number;
    font: FontInterface;
}

export const states: StatesInterface = {
    // editor view port settings
    activeLayer: null,
    zoom: 1,
    width: 1280,
    height: 720,
    bordersWidth: 4,
    totalLayers: 0,
    // project layers
    layer: {
        layers: []
    },
    // font settings
    font: {
        family : 'sans-serif',
        size: 12,
        color: '#000',
        style: 'normal',
        weight: 'normal'
    }

};