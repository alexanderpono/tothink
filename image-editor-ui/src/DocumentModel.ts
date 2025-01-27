import { defaultDocument, Document, Layer } from './docStructures/docStructures.types';

interface DocumentJSON {
    width: number;
    height: number;
    layers: Layer[];
}

export class DocumentModel {
    document: Document = defaultDocument;
    layers: Record<string, Layer> = {};
    objects: Record<string, Document | Layer> = {};

    constructor() {}

    onCreateDocument = (document: Document) => {
        this.document = document;
        this.objects[document.id] = document;
    };

    onCreateLayer = (layer: Layer) => {
        this.layers[layer.id] = layer;
        this.objects[layer.id] = layer;
    };

    getDocument = () => this.document;
    getLayer = (id: number) => this.layers[id];

    toJSON = (): DocumentJSON => {
        const model: DocumentJSON = {
            width: this.document.width,
            height: this.document.height,
            layers: Object.keys(this.layers).map((id) => this.layers[id])
        };
        return model;
    };
}
