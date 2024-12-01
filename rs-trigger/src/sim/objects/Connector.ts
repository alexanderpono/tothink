import { ConnectorState, Status } from '@src/sim/sim.types';
import { SimObject } from './SimObject';

export class Connector extends SimObject {
    recalc(state: ConnectorState, stepNo: number) {
        if (state.in.in !== state.out.out) {
            console.log(`#${stepNo} ${this.name} calc()`);
            return { ...state, out: { out: state.in.in }, status: Status.STABLE };
        }
        return state;
    }
}
