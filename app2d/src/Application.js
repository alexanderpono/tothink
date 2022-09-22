import * as PIXI from 'pixi.js';
import { Game } from './systems/Game';
import { Menu } from './systems/Menu';
import { Pack } from './systems/Pack';
import { Visual } from './systems/Visual';
import { DummyPhis } from './systems/DummyPhis';

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
        this.pack = new Pack(this);
        this.menu = new Menu(this);
        this.visual = new Visual(this);
        this.dummyPhis = new DummyPhis(this);
    }

    get view() {
        return this.renderer.view;
    }

    start() {
        this.ticker.start();
        this.pack.start();
    }

    render() {
        this.renderer.render(this.root);
    }

    destroy() {
        this.ticker.destroy();
        this.render.destroy();
    }
}
