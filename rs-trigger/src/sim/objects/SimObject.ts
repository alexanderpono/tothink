import { StateManager } from '@src/sim/StateManager';
import { defaultObjectState, ObjectState } from '@src/sim/sim.types';

export class SimObject {
    constructor(protected stateManager: StateManager) {}

    recalc(state: ObjectState): ObjectState {
        return state;
    }
}
