import * as PIXI from 'pixi.js';
import { Holy } from './levels/Holy';

export class Application {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: 640,
            height: 480,
            backgroundColor: 0xffc0cb
        })
        this.root = new PIXI.Container();

        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => {
            this.render();
        }, -25)

        this.level = new Holy();
    }

    get view() {
        return this.renderer.view;
    }

    start() {
        this.ticker.start();
        this.level.init(this);
    }

    render() {
        this.renderer.render(this.root);
    }

    destroy() {
        this.ticker.destroy();
        this.render.destroy();
    }
}
