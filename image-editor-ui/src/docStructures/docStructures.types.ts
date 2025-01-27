export interface Document {
    id: number;
    width: number;
    height: number;
}

export const defaultDocument: Document = {
    id: 0,
    width: 0,
    height: 0
};

export enum LayerContent {
    DEFAULT = '',
    IMAGE = 'IMAGE'
}

export interface Layer {
    id: number;
    contentType: LayerContent;
    src: string;
    x: number;
    y: number;
}

export const defaultLayer: Layer = {
    id: 0,
    contentType: LayerContent.DEFAULT,
    src: '',
    x: 0,
    y: 0
};
