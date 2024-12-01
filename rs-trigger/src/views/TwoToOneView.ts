import { ImageBuilder } from '@src/ImageBuilder';
import { ConnectorViewState } from './views.types';

export class TwoToOneView {
    constructor(private state: ConnectorViewState) {}

    draw = (graph: ImageBuilder) => {
        const state = this.state;
        const h2 = state.boxH / 2;
        return graph
            .lineColor(state.color)
            .vLine(state.boxX + state.boxW + 20, state.box2Y + h2, -h2 - 10)
            .line(
                state.boxX + state.boxW + 20,
                state.box2Y - 10,
                state.boxX - 20,
                state.boxY + state.boxH + 10
            )
            .vLine(state.boxX - 20, state.boxY + state.boxH + 10, -30);
    };
}
