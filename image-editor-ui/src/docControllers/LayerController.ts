import { AppFactory } from '@src/AppFactory';
import { defaultLayer, defaultSprite, LayerContent } from '@src/docStructures/docStructures.types';
import { DocumentModel } from '@src/DocumentModel';

export class LayerController {
    constructor(private id: number, private factory: AppFactory, private model: DocumentModel) {
        this.model.onCreateLayer({ ...defaultLayer, id });
    }

    getId = () => this.id;

    setSprite = (
        libraryId: string,
        x: number,
        y: number,
        width: number,
        height: number
    ): LayerController => {
        const layer = this.model.getLayer(this.id);
        layer.contentType = LayerContent.SPRITE;
        layer.sprite = { ...defaultSprite, sourceId: libraryId, x, y, width, height };
        return this;
    };

    moveTo = (x: number, y: number): LayerController => {
        const layer = this.model.getLayer(this.id);
        layer.x = x;
        layer.y = y;
        return this;
    };
}
