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

        this.runners = {
            'entityAdded': new PIXI.Runner('entityAdded'),
            'entityRemoved': new PIXI.Runner('entityRemoved'),
            'loop': new PIXI.Runner('loop')
        };

        this.addSystem(this.game = new Game(this));
        this.pack = new Pack(this);
        this.menu = new Menu(this);
        this.addSystem(this.visual = new Visual(this));
        this.addSystem(this.dummyPhis = new DummyPhis(this));
    }

    addSystem(system) {
        for (let key in this.runners) {
            this.runners[key].add(system);
        }
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
