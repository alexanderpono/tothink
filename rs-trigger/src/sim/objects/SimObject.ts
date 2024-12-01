import { StateManager } from '@src/sim/StateManager';
import { defaultObjectState, ObjectState } from '@src/sim/sim.types';

export class SimObject {
    constructor(protected stateManager: StateManager, protected name: string) {}

    recalc(state: ObjectState, stepNo: number): ObjectState {
        return state;
    }
}
