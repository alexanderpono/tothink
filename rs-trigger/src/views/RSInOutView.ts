import { ImageBuilder } from '@src/ImageBuilder';

const L2 = 5;

export class RSInOutView {
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
            .lineColor('black')
            .fillColor('black')

            .hLine(this.x - 40, this.y1 + 20, 20)
            .hLine(this.x + this.w + 20, this.y1 + h2, 40)
            .drawCircle(this.x + this.w + 20, this.y1 + h2, 3)

            .hLine(this.x - 40, this.y2 + this.h - 20, 20)
            .hLine(this.x + this.w + 20, this.y2 + h2, 40)
            .drawCircle(this.x + this.w + 20, this.y2 + h2, 3)

            .text(this.x - 60, this.y1 + 20 + L2, 'S')
            .text(this.x - 60, this.y2 + this.h - 20 + L2, 'R')
            .text(this.x + this.w + 70, this.y1 + h2 + L2, 'Q')
            .text(this.x + this.w + 70, this.y2 + h2 + L2, 'Q')
            .hLine(this.x + this.w + 70 + 1, this.y2 + h2 - L2 - 3, 10);
    };
}
