import {
    defaultDocument,
    Document,
    ImageResource,
    Layer
} from './docStructures/docStructures.types';

export interface DocumentJSON {
    width: number;
    height: number;
    images: ImageResource[];
    layers: Layer[];
}

export class DocumentModel {
    document: Document = defaultDocument;
    images: Record<string, ImageResource> = {};
    layers: Record<string, Layer> = {};
    objects: Record<string, Document | Layer | ImageResource> = {};

    constructor() {}

    onCreateDocument = (document: Document) => {
        this.images = {};
        this.layers = {};
        this.objects = {};
        this.document = document;
        this.objects[document.id] = document;
    };

    onCreateImageResource = (imageResource: ImageResource) => {
        this.images[imageResource.id] = imageResource;
        this.objects[imageResource.id] = imageResource;
    };

    onCreateLayer = (layer: Layer) => {
        this.layers[layer.id] = layer;
        this.objects[layer.id] = layer;
    };

    getDocument = () => this.document;
    getLayer = (id: number) => this.layers[id];
    getImagesList = (): ImageResource[] => Object.keys(this.images).map((id) => this.images[id]);
    getLayersList = (): Layer[] => Object.keys(this.layers).map((id) => this.layers[id]);

    toJSON = (): DocumentJSON => {
        const model: DocumentJSON = {
            width: this.document.width,
            height: this.document.height,
            images: this.getImagesList(),
            layers: this.getLayersList()
        };
        return model;
    };
}
