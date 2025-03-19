import { ImageBuilder } from '@src/ImageBuilder';
import { AndNotViewState } from './views.types';

export class RSTriggerView {
    constructor(private state: AndNotViewState) {}

    draw(graph: ImageBuilder) {
        const h2 = this.state.h / 2;
        const LH = 15;
        const LH2 = 6;
        const LW2 = 5;
        const state = this.state;
        const getVal = (val: number): string => (val === null ? '?' : '' + val);

        let newGraph = graph
            .lineColor(state.color)
            .box(state.x, state.y, state.w, state.h)
            .hLine(state.x - 20, state.y + 20, 20)
            .hLine(state.x + state.w, state.y + h2, 20)
            .hLine(state.x - 20, state.y + state.h - 20, 20)
            .fillColor('white')
            .drawCircle(state.x + state.w, state.y + h2, 5)
            .fillColor(state.color)
            .text(state.x + state.w - 20, state.y + 20, '&');

        if (this.state.showInOut) {
            newGraph = newGraph
                .text(state.x - 20 + LW2, state.y + LH, getVal(state.in1))
                .text(state.x - 20 + LW2, state.y + state.h - 20 - LH2, getVal(state.in2))
                .text(state.x + state.w + LW2 + 2, state.y + h2 - LH2, getVal(state.out));
        }
        return newGraph;
    }
}
