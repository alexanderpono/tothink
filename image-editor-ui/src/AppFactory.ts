import { DocumentController } from './docControllers/DocumentController';
import { ImageResourceController } from './docControllers/ImageResourceController';
import { LayerController } from './docControllers/LayerController';
import { ImageResource, Layer, LayerContent } from './docStructures/docStructures.types';
import { DocumentJSON, DocumentModel } from './DocumentModel';
import { AppStorage } from './ports/AppStorage';

export class AppFactory {
    private maxObjectId: number = 0;
    private docModel: DocumentModel = null;
    private document: DocumentController = null;
    private storage: AppStorage = null;
    private layers: Record<number, LayerController> = {};

    newObjectId = (): number => {
        return ++this.maxObjectId;
    };

    createStorage = (): AppStorage => {
        this.storage = new AppStorage();
        return this.storage;
    };

    getStorage = () => this.storage;

    createDocument = (): DocumentController => {
        this.document = new DocumentController(this.newObjectId(), this, this.docModel);
        return this.document;
    };

    getDocument = (): DocumentController => this.document;

    createModel = (): DocumentModel => {
        this.docModel = new DocumentModel();
        return this.docModel;
    };

    createLayer = () => {
        const layer = new LayerController(this.newObjectId(), this, this.docModel);
        this.layers[layer.getId()] = layer;
        return layer;
    };

    getLayer = (id: number) => this.layers[id];

    createImageResource = (id: string, path: string) =>
        new ImageResourceController(id, path, this, this.docModel);

    getModel = (): DocumentModel => this.docModel;

    initFromDocument = (doc: DocumentJSON) => {
        this.maxObjectId = 0;
        this.createDocument();
        this.document.setSize(doc.width, doc.height);

        doc.images.forEach((image: ImageResource) => {
            this.createImageResource(image.id, image.path);
        });

        doc.layers.forEach((layer: Layer) => {
            if (layer.contentType === LayerContent.SPRITE) {
                const sprite = layer.sprite;
                this.createLayer()
                    .setSprite(sprite.sourceId, sprite.x, sprite.y, sprite.width, sprite.height)
                    .moveTo(layer.x, layer.y);
            }
        });
    };
}
