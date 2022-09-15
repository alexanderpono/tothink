import * as PIXI from 'pixi.js';

export class Entity {
    constructor(props) {
        this.props = props;

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.rotation = props.rotation || 0;
        this.size = props.size || 1;
        this.width = props.width || 0;
        this.height = props.height || 0;

        if  (props.spriteTex) {
            this.pixi = new PIXI.Sprite(props.spriteTex)
            this.pixi.position.set(this.x, this.y);
            this.pixi.anchor.set(0.5, 0.5);
            this.pixi.scale.set(this.size);
            this.pixi.rotation = this.rotation;
        }

        if (props.script) {
            this.script = props.script;
        }

        if (props.dummy) {
            if (props.dummy.v) {
                this.dummy = {
                    vx: Math.cos(props.dummy.ang) * props.dummy.v,
                    vy: Math.sin(props.dummy.ang) * props.dummy.v
                }
            } else {
                this.dummy = {
                    vx: props.dummy.vx,
                    vy: props.dummy.vy
                }

            }
        }
    }

    syncPixi() {
        if (this.pixi) {
            this.pixi.position.set(this.x, this.y);
            this.pixi.rotation = this.rotation;
        }
    }

    updatePhys(delta) {
        const {dummy} = this;
        // console.log('updatePhys() dummy=', dummy);
        if (dummy) {
            this.x += dummy.vx * delta;
            this.y += dummy.vy * delta;

            if (this.x < 0) {
                this.x = -this.x;
                dummy.vx = -dummy.vx;
            }

            if (this.x > this.width) {
                this.x = this.width * 2 - this.x;
                dummy.vx = -dummy.vx;
            }

            if (this.y < 0) {
                this.y = -this.y;
                dummy.vy = -dummy.vy;
            }

            if (this.y > this.height) {
                this.y = this.height * 2 - this.y;
                dummy.vy = -dummy.vy;
            }
        }
    }
}