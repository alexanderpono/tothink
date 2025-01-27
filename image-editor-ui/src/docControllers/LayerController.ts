import { AppFactory } from '@src/AppFactory';
import { defaultLayer, LayerContent } from '@src/docStructures/docStructures.types';
import { DocumentModel } from '@src/DocumentModel';

export class LayerController {
    constructor(private id: number, private factory: AppFactory, private model: DocumentModel) {
        this.model.onCreateLayer({ ...defaultLayer, id });
    }

    getId = () => this.id;

    loadImage = (path: string) => {
        const layer = this.model.getLayer(this.id);
        layer.contentType = LayerContent.IMAGE;
        layer.src = path;
    };

    moveTo = (x: number, y: number) => {
        const layer = this.model.getLayer(this.id);
        layer.x = x;
        layer.y = y;
    };
}
