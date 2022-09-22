import { Level } from './Level';
import { Entity } from '../Entity';

export class BunnyLevel extends Level {
    constructor(json) {
        super(json);
    }

    init(app) {
        const { game } = app;
        const { width, height } = app.view;

        for (let i = 0; i<10; i++) {
            const v = Math.random() * 4 + 3;
            const ang = Math.random() * Math.PI * 3;
    
            const bunny = new Entity({
                x: width * Math.random(),
                y: height * Math.random(),
                size: 5,
                spriteTex: app.pack.bunnyTex,
                dummy: { v, ang },
                width,
                height
            })

            game.add(bunny);
        }
    }
}