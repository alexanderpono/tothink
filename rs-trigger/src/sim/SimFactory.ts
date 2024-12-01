import { AppController } from '@src/AppController';
import { AndNot1 } from './objects/AndNot1';
import { AndNot2 } from './objects/AndNot2';
import { Out1To2 } from './objects/Out1To2';
import { Out2To1 } from './objects/Out2To1';
import { RSTrigger } from './objects/RSTrigger';
import { StateManager } from './StateManager';

export class SimFactory {
    private stateManager: StateManager = null;

    getStateManager = () => {
        if (this.stateManager === null) {
            this.stateManager = new StateManager();
        }
        return this.stateManager;
    };

    createAppController = () => {
        return new AppController(this.getStateManager(), this.createSimObjects());
    };
    createSimObjects = () => {
        const stateManager = this.getStateManager();
        const rsTrigger = new RSTrigger(stateManager);
        const andNot1 = new AndNot1(stateManager);
        const andNot2 = new AndNot2(stateManager);
        const out1To2 = new Out1To2(stateManager);
        const out2To1 = new Out2To1(stateManager);

        const objects = { rsTrigger, andNot1, andNot2, out1To2, out2To1 };

        return objects;
    };

    static create() {
        return new SimFactory();
    }
}
