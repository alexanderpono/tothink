import { Level } from './Level';
import * as PIXI from 'pixi.js';

export class BunnyLevel extends Level {
    constructor(json) {
        super(json);

        this.image = new Image();
        this.image.src = 'https://pixijs.io/examples/examples/assets/bunny.png';
        this.image.crossOrigin = '*';
    }

    init(app) {
        this.phase = 0;

        const { width, height } = app.view;
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(this.image))
        this.sprite.position.set(width/2, height/2);
        this.sprite.scale.set(5, 5);
        this.sprite.anchor.set(0.5, 0.5);
        app.root.addChild(this.sprite);

        app.ticker.add(() => {
            this.phase += 0.01;
            this.sprite.rotation = this.phase;
        })
    }
}