import { Holy } from '../levels/Holy';
import { BunnyLevel } from '../levels/BunnyLevel';
import { FlowerLevel } from '../levels/FlowerLevel';
import * as PIXI from 'pixi.js';

export class Pack {
    constructor(app) {
        this.app = app;
        this.loader = new PIXI.Loader();
        this.allLevels = [
            new BunnyLevel(),
            new FlowerLevel()
        ]
    }

    afterLoad() {
        this.bunnyTex = this.loader.resources.bunny.texture;
        this.flowerTex = this.loader.resources.flowerTop.texture;
    }

    start() {
        const {app} = this;
        const {game} = app;
        const options = {
            crossOrigin: ''
        }
        //cross-origin ritual sacrifice

        game.initLevel(new Holy());

        this.loader
            .add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png', options)
            .add('flowerTop', 'https://pixijs.io/examples/examples/assets/flowerTop.png', options)
            .load(() => {
                setTimeout(() => {
                    this.afterLoad();
                    this.app.menu.afterLoad();
                    game.initLevel(this.allLevels[1]);
                }, 2000)
        
            });

    }

}