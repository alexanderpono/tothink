import logoImg from "../assets/logo.svg";
import * as PIXI from 'pixi.js';

export class Application {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: 640,
            height: 480,
            backgroundColor: 0xffc0cb
        })
        this.root = new PIXI.Container();

        this.image = new Image();
        this.image.src = logoImg;
    }

    get view() {
        return this.renderer.view;
    }

    start() {
        this.phase = 0;

        const { width, height } = this.view;
        this.sprite = new PIXI.Sprite(PIXI.Texture.from(this.image))
        this.sprite.position.set(width/2, height/2);
        this.sprite.scale.set(0.9, 0.9);
        this.sprite.anchor.set(0.5, 0.5);
        this.root.addChild(this.sprite);

        const gameLoop = () => {
            this.phase += 0.01;
            this.sprite.rotation = this.phase;
            this.render();
            requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
    }

    render() {
        this.renderer.render(this.root);
    }
}
