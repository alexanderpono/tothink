import * as PIXI from 'pixi.js';

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

export class Menu {
    constructor(app) {
        this.app = app;
        this.ui = new PIXI.Container();
        this.app.root.addChild(this.ui);
    }

    afterLoad() {
        const { allLevels } = this.app.pack;
        for (let i = 0; i<allLevels.length; i++) {
            const btn = new PIXI.Text(`Level ${i+1}`, style);
            btn.y = 300;
            btn.x = (i + 1) / (allLevels.length + 2) * 700;
            this.app.root.addChild(btn);

            btn.interactive = true;
            btn.click = () => {
                this.app.game.initLevel(allLevels[i])
            }
        }
    }
}