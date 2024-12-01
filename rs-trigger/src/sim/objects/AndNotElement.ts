import { AndNotElementState, Status } from '@src/sim/sim.types';
import { SimObject } from './SimObject';

export class AndNotElement extends SimObject {
    private prevInA: number = null;
    private prevInB: number = null;
    recalc(state: AndNotElementState, stepNo: number) {
        let recalc = false;
        if (state.in.A !== this.prevInA) {
            this.prevInA = state.in.A;
            recalc = true;
        }
        if (state.in.B !== this.prevInB) {
            this.prevInB = state.in.B;
            recalc = true;
        }
        if (state.in.A !== null && state.in.B !== null && recalc) {
            console.log(`#${stepNo} ${this.name} calc()`);
            const result = state.in.A & state.in.B ? 0 : 1;
            return { ...state, out: { out: result }, status: Status.STABLE };
        }
        return state;
    }
}
