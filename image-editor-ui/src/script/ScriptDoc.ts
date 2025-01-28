import { AppControllerForScript } from '@src/AppController.types';
import { AppFactory } from '@src/AppFactory';
import { ScriptLayer } from './ScriptLayer';
import { DocumentJSON } from '@src/DocumentModel';

export class ScriptDoc {
    constructor(private _factory: AppFactory, private _ctrl: AppControllerForScript) {}

    setSize = (width: number, height: number) => {
        const docController = this._factory.getDocument();
        docController.setSize(width, height);

        this._ctrl.onDocumentUpdate();
    };

    layer = (id: number) => new ScriptLayer(this._factory.getLayer(id), this._ctrl);

    print = () => {
        console.log(JSON.stringify(this._factory.getModel().toJSON(), null, 4));
    };

    loadFromJSON = (doc: DocumentJSON) => {
        this._factory.initFromDocument(doc);
        this._ctrl.onDocumentUpdate();
    };
}
