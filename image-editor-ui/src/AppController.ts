import { AppFactory } from './AppFactory';
import { DocumentJSON } from './DocumentModel';
import { ImageBuilder } from './ImageBuilder';
import { ScriptApp } from './script/ScriptApp';
import { ScriptDoc } from './script/ScriptDoc';

export enum Stragegy {
    INIT_FROM_APP = 'INIT_FROM_APP',
    INIT_FROM_STORAGE = 'INIT_FROM_STORAGE'
}

export class AppController {
    factory: AppFactory = null;

    constructor() {
        this.factory = new AppFactory();
    }

    go = (strategy: Stragegy) => {
        this.factory.createModel();
        const appStorage = this.factory.createStorage();
        const document = this.factory.createDocument();
        if (strategy === Stragegy.INIT_FROM_APP) {
            document.setSize(800, 400);

            this.factory.createImageResource('sprites', 'sprite.png');

            this.factory.createLayer().setSprite('sprites', 0, 0, 40, 40).moveTo(0, 0);
            this.factory.createLayer().setSprite('sprites', 0, 0, 480, 200).moveTo(320, 200);

            this.updateStorage();
        } else {
            const docString = appStorage.getDocument();
            console.log('docString=', docString);

            let doc = null;
            if (typeof docString === 'string') {
                try {
                    doc = JSON.parse(docString);
                } catch {
                    console.log('error parsing document');
                }
            } else {
                console.log('error getting document from storage');
                return;
            }

            if (!this.isDocValid(doc)) {
                console.log('document is not valid', doc);
                return;
            }
            console.log('doc=', doc);

            this.factory.initFromDocument(doc);
        }

        this.renderImage();

        window['app'] = new ScriptApp(this.factory, this);
        window['doc'] = new ScriptDoc(this.factory, this);
    };

    isDocValid = (doc: DocumentJSON) => true;

    onDocumentUpdate = () => {
        this.renderImage();
        this.updateStorage();
    };

    updateStorage = () => {
        const appStorage = this.factory.getStorage();
        const doc = this.factory.getModel().toJSON();

        appStorage.setDocument(doc);
    };

    renderImage = () => {
        let graph = ImageBuilder.create().setDomTarget('UI');
        const document = this.factory.getDocument();
        document.render(graph).then((graph) => {
            graph.lineColor('black').lineWidth(1).border();
            graph.printActions().buildImage();
        });
    };
}
