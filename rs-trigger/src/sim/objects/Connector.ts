import { ConnectorState, Status } from '@src/sim/sim.types';
import { SimObject } from './SimObject';

export class Connector extends SimObject {
    recalc(state: ConnectorState) {
        if (state.in.in !== state.out.out) {
            return { ...state, out: { out: state.in.in }, status: Status.STABLE };
        }
        return state;
    }
}
