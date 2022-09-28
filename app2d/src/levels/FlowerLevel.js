import { Level } from './Level';
import { Entity } from '../Entity';

export class FlowerLevel extends Level {
    constructor(json) {
        super(json);
    }

    init(app) {
        const { game } = app;
        this.phase = 0;

        const { width, height } = app.view;

        const flower = new Entity({
            x: width/2,
            y: height/2,
            size: 1,
            spriteTex: app.pack.flowerTex,
            rotation: 0,
            script: function () {
                this.rotation += 0.01;
            }
        })

        game.add(flower);
    }
}