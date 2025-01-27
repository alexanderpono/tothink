import { AppFactory } from './AppFactory';
import { DocumentJSON } from './DocumentModel';
import { ImageBuilder } from './ImageBuilder';
import { ScriptApp } from './script/ScriptApp';

export enum Stragegy {
    INIT_FROM_APP = 'INIT_FROM_APP',
    INIT_FROM_STORAGE = 'INIT_FROM_STORAGE'
}

export class AppController {
    go = (strategy: Stragegy) => {
        const factory = new AppFactory();
        factory.createModel();
        const appStorage = factory.createStorage();
        const document = factory.createDocument();
        if (strategy === Stragegy.INIT_FROM_APP) {
            document.setSize(800, 400);

            factory.createImageResource('sprites', 'sprite.png');

            factory.createLayer().setSprite('sprites', 0, 0, 40, 40).moveTo(0, 0);
            factory.createLayer().setSprite('sprites', 0, 0, 480, 200).moveTo(320, 200);

            console.log('model=', factory.getModel());
            const doc = factory.getModel().toJSON();
            console.log('doc=', JSON.stringify(doc, null, 4));

            appStorage.setDocument(doc);
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

            factory.initFromDocument(doc);
        }

        let graph = ImageBuilder.create().setDomTarget('UI');
        document.render(graph).then((graph) => {
            graph.lineColor('black').lineWidth(1).border();
            graph.printActions().buildImage();
        });

        const scriptApp = new ScriptApp(factory);
        window['app'] = scriptApp;
    };

    isDocValid = (doc: DocumentJSON) => true;
}
