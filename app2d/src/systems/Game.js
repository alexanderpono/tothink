import * as PIXI from 'pixi.js';
import { Holy } from '../levels/Holy';
import { BunnyLevel } from '../levels/BunnyLevel';

export class Game {
    constructor(app) {
        this.app = app;

        this.level = new Holy();
        this.app.ticker.add(() => {
            if (this.ticker) {
                this.ticker.update();
            }
        })
        this.reset();
    }

    reset() {
        if (this.world) {
            this.app.root.removeChild(this.world);
            this.world.destroy({ children: true })
        }
        this.world = new PIXI.Container();
        this.ticker = new PIXI.Ticker();
        this.app.root.addChild(this.world);
    }

    initLevel(level) {
        this.level = level;
        this.reset();
        this.level.init(this.app)
    }

    start() {
        this.initLevel(new Holy());
        setTimeout(() => {
            this.initLevel(new BunnyLevel());
        }, 3000)
    }
}