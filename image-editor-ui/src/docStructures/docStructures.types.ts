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

export interface Sprite {
    sourceId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export const defaultSprite: Sprite = {
    sourceId: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0
};

export enum LayerContent {
    DEFAULT = '',
    SPRITE = 'SPRITE'
}

export interface Layer {
    id: number;
    contentType: LayerContent;
    sprite: Sprite;
    x: number;
    y: number;
}

export const defaultLayer: Layer = {
    id: 0,
    contentType: LayerContent.DEFAULT,
    sprite: defaultSprite,
    x: 0,
    y: 0
};

export interface ImageResource {
    path: string;
    id: string;
}

export const defaultImageResource: ImageResource = {
    path: '',
    id: ''
};
