import * as PIXI from 'pixi.js';

export class Game {
    constructor(app) {
        this.app = app;

        this.level = null;
        this.app.ticker.add(() => {
            if (this.ticker) {
                this.ticker.update();
            }
        })
        this.reset();
    }

    reset() {
        if (this.world) {
            this.app.root.removeChild(this.world);
            this.world.destroy({ children: true })
        }
        this.world = new PIXI.Container();
        this.ticker = new PIXI.Ticker();
        this.app.root.addChild(this.world);

        this.ticker.add(() => {
            for (let i=0; i<this.entities.length; i++) {
                const entity = this.entities[i];
                entity.updatePhys(1);
            }
            for (let i=0; i<this.entities.length; i++) {
                const entity = this.entities[i];
                entity.script && entity.script();
            }
            for (let i=0; i<this.entities.length; i++) {
                const entity = this.entities[i];
                entity.syncPixi();
            }
        });
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);

        if (entity.pixi) {
            this.world.addChild(entity.pixi);
        }
    }

    remove(entity) {
        const ind = this.entities.indexOf(entity);
        if (ind >= 0) {
            this.entities.splice(ind, 1);
        }

        if (entity.pixi) {
            this.world.removeChild(entity.pixi);
        }
    }

    initLevel(level) {
        this.level = level;
        this.reset();
        this.level.init(this.app)
    }
}