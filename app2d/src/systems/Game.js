import { Holy } from '../levels/Holy';
import { BunnyLevel } from '../levels/BunnyLevel';

export class Game {
    constructor(app) {
        this.app = app;

        this.level = new Holy();
    }

    initScene() {

    }

    start() {
        const { app } = this;
        this.level.init(app);
        setTimeout(() => {
            this.level = new BunnyLevel()
            this.level.init(app);
        }, 3000)
    }
}