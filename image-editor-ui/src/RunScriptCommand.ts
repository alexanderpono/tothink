import { AbstractAction } from './AppController.types';
import { AppFactory } from './AppFactory';
import { LayerEvent, MoveToAction } from './script/ScriptLayer.types';

export class RunScriptCommand {
    constructor(private factory: AppFactory) {}

    runScript = (script: object[]) => {
        script.forEach((unknownObj: object) => {
            const unknownAction = unknownObj as AbstractAction;
            switch (unknownAction?.type) {
                case LayerEvent.MOVE_TO: {
                    const action = unknownAction as MoveToAction;
                    console.log('runScript() action=', action);
                    this.factory.getLayer(action?.id).moveTo(action.x, action.y);
                    break;
                }

                default: {
                    console.error('runScript(): unknown action', unknownObj);
                }
            }
        });
    };
}
