import { AppFactory } from '@src/AppFactory';
import { defaultImageResource } from '@src/docStructures/docStructures.types';
import { DocumentModel } from '@src/DocumentModel';

export class ImageResourceController {
    constructor(
        private id: string,
        path: string,
        private factory: AppFactory,
        private model: DocumentModel
    ) {
        this.model.onCreateImageResource({ ...defaultImageResource, id, path });
    }

    getId = () => this.id;
}
