import { AppFactory } from '@src/AppFactory';
import {
    defaultDocument,
    ImageResource,
    Layer,
    LayerContent
} from '@src/docStructures/docStructures.types';
import { DocumentModel } from '@src/DocumentModel';
import { ImageBuilder } from '@src/ImageBuilder';
import { EditorWindow } from '@src/WindowController.types';

export class DocumentController {
    constructor(private id: number, private factory: AppFactory, private model: DocumentModel) {
        this.model.onCreateDocument({ ...defaultDocument, id });
    }

    setSize = (width: number, height: number): DocumentController => {
        const document = this.model.getDocument();
        document.width = width;
        document.height = height;
        return this;
    };

    render = (graph: ImageBuilder, win: EditorWindow): Promise<ImageBuilder> => {
        const images = this.model.getImagesList();
        const document = this.model.getDocument();
        graph.setSize(win.width, win.height);
        graph.createContext();
        graph.clear();

        const loadImagesPromises = images.map((image: ImageResource) =>
            graph.loadPic(image.path, image.id)
        );
        return Promise.all(loadImagesPromises)
            .then(() => {
                const layers = this.model.getLayersList();
                layers.forEach((layer: Layer) => {
                    if (layer.contentType === LayerContent.SPRITE) {
                        graph.drawSprite(
                            layer.sprite.sourceId,
                            layer.sprite.x,
                            layer.sprite.y,
                            layer.x - win.scrollX,
                            layer.y - win.scrollY,
                            layer.sprite.width,
                            layer.sprite.height
                        );
                    }
                });

                return graph;
            })
            .catch(() => {
                console.error('error load images');
                return graph;
            });
    };
}
