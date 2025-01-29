import { AppControllerForScript } from '@src/AppController.types';
import { LayerController } from '@src/docControllers/LayerController';
import { LayerEvent, MoveToAction } from './ScriptLayer.types';

export const layer = {
    moveTo: (id: number, x: number, y: number): MoveToAction => ({
        type: LayerEvent.MOVE_TO,
        id,
        x,
        y
    })
};

export class ScriptLayer {
    constructor(private _layer: LayerController, private _ctrl: AppControllerForScript) {}

    moveTo = (x: number, y: number) => {
        this._ctrl.storeUndo(JSON.stringify(layer.moveTo(this._layer.getId(), x, y)));
        this._layer.moveTo(x, y);
        this._ctrl.onDocumentUpdate();
    };
}
