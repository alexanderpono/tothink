import { AppFactory } from '@src/AppFactory';
import { defaultDocument } from '@src/docStructures/docStructures.types';
import { DocumentModel } from '@src/DocumentModel';

export class DocumentController {
    constructor(private id: number, private factory: AppFactory, private model: DocumentModel) {
        this.model.onCreateDocument({ ...defaultDocument, id });
    }

    setSize = (width: number, height: number) => {
        const document = this.model.getDocument();
        document.width = width;
        document.height = height;
    };
}
