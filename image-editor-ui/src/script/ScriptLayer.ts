import { AppControllerForScript } from '@src/AppController.types';
import { LayerController } from '@src/docControllers/LayerController';

export class ScriptLayer {
    constructor(private _layer: LayerController, private _ctrl: AppControllerForScript) {}

    moveTo = (x: number, y: number) => {
        this._layer.moveTo(x, y);
        this._ctrl.onDocumentUpdate();
    };
}
