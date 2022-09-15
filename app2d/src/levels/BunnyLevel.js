import { Level } from './Level';
import { Entity } from '../Entity';

export class BunnyLevel extends Level {
    constructor(json) {
        super(json);
    }

    init(app) {
        const { game } = app;
        this.phase = 0;

        const { width, height } = app.view;

        const bunny = new Entity({
            x: width/2,
            y: height/2,
            size: 5,
            spriteTex: app.pack.bunnyTex
        })

        game.add(bunny);

        game.ticker.add(() => {
            this.phase += 0.01;
            bunny.rotation = this.phase;
            bunny.syncPixi();
        })
    }
}