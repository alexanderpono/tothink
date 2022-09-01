import * as PIXI from 'pixi.js';
import { Game } from './systems/Game';

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

        this.game = new Game(this);
    }

    get view() {
        return this.renderer.view;
    }

    start() {
        this.ticker.start();
        this.game.start();
    }

    render() {
        this.renderer.render(this.root);
    }

    destroy() {
        this.ticker.destroy();
        this.render.destroy();
    }
}
