import * as PIXI from 'pixi.js';

export class Visual {
    constructor(app) {
        this.app = app;
    }

    get world() {
        return this.app.game.world;
    }

    entityAdded(entity) {
        const {props} = entity;
        if  (props.spriteTex) {
            entity.pixi = new PIXI.Sprite(props.spriteTex)
            entity.pixi.position.set(entity.x, entity.y);
            entity.pixi.anchor.set(0.5, 0.5);
            entity.pixi.scale.set(entity.size);
            entity.pixi.rotation = entity.rotation;
        }

        if (entity.pixi) {
            this.world.addChild(entity.pixi);
        }

    }

    entityRemoved(entity) {
        if (entity.pixi) {
            this.world.removeChild(entity.pixi);
        }

    }
}