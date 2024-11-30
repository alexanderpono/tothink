import { ImageBuilder } from '@src/ImageBuilder';

export class AndNotView {
    constructor(
        protected x: number,
        protected y: number,
        protected w: number,
        protected h: number
    ) {}

    draw(graph: ImageBuilder) {
        const h2 = this.h / 2;
        return graph
            .box(this.x, this.y, this.w, this.h)
            .hLine(this.x - 20, this.y + 20, 20)
            .hLine(this.x + this.w, this.y + h2, 20)
            .hLine(this.x - 20, this.y + this.h - 20, 20)
            .fillColor('white')
            .drawCircle(this.x + this.w, this.y + h2, 5)
            .fillColor('black')
            .text(this.x + this.w - 20, this.y + 20, '&');
    }
}
