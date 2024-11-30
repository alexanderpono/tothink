import { ImageBuilder } from '@src/ImageBuilder';

export class TwoToOneView {
    constructor(
        private x: number,
        private y1: number,
        private w: number,
        private h: number,
        private y2: number
    ) {}

    draw = (graph: ImageBuilder) => {
        const h2 = this.h / 2;
        return graph
            .vLine(this.x + this.w + 20, this.y2 + h2, -h2 - 10)
            .line(this.x + this.w + 20, this.y2 - 10, this.x - 20, this.y1 + this.h + 10)
            .vLine(this.x - 20, this.y1 + this.h + 10, -30);
    };
}
