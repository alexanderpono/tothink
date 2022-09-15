import * as PIXI from 'pixi.js';

export class Entity {
    constructor(props) {
        this.props = props;

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.rotation = props.rotation || 0;
        this.size = props.size || 1;

        if  (props.spriteTex) {
            this.pixi = new PIXI.Sprite(props.spriteTex)
            this.pixi.position.set(this.x, this.y);
            this.pixi.anchor.set(0.5, 0.5);
            this.pixi.scale.set(this.size);
            this.pixi.rotation = this.rotation;
        }
    }

    syncPixi() {
        if (this.pixi) {
            this.pixi.position.set(this.x, this.y);
            this.pixi.rotation = this.rotation;
        }
    }
}