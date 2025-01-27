import { DocumentController } from './docControllers/DocumentController';
import { LayerController } from './docControllers/LayerController';
import { DocumentModel } from './DocumentModel';

export class AppFactory {
    private maxObjectId: number = 0;
    private docModel: DocumentModel = null;
    private document: DocumentController = null;

    newObjectId = (): number => {
        return ++this.maxObjectId;
    };

    createDocument = (): DocumentController => {
        this.document = new DocumentController(this.newObjectId(), this, this.docModel);
        return this.document;
    };

    getDocument = (): DocumentController => this.document;

    createModel = (): DocumentModel => {
        this.docModel = new DocumentModel();
        return this.docModel;
    };

    createLayer = () => new LayerController(this.newObjectId(), this, this.docModel);

    getModel = (): DocumentModel => this.docModel;
}
