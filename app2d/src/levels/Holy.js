import { Level } from './Level';
import * as PIXI from 'pixi.js';
import logoImg from "/assets/logo.svg";

export class Holy extends Level {
    constructor(json) {
        super(json);

        this.image = new Image();
        this.image.src = logoImg;
    }

    init(app) {
        const { game } = app;
        this.phase = 0;

        const { width, height } = app.view;
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(this.image))
        this.sprite.position.set(width/2, height/2);
        this.sprite.scale.set(0.9, 0.9);
        this.sprite.anchor.set(0.5, 0.5);
        game.world.addChild(this.sprite);

        game.ticker.add(() => {
            this.phase += 0.01;
            this.sprite.rotation = this.phase;
        })
    }
}