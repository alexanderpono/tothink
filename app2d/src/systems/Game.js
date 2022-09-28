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
        this.app.root.addChildAt(this.world, 0);

        this.ticker.add((delta) => {
            for (let i=0; i<this.entities.length; i++) {
                const entity = this.entities[i];
                entity.script && entity.script.call(entity);
            }
            this.app.runners.loop.run(delta);
        });
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);
        this.app.runners.entityAdded.run(entity);
    }

    remove(entity) {
        const ind = this.entities.indexOf(entity);
        if (ind >= 0) {
            this.entities.splice(ind, 1);
        }
        this.app.runners.entityRemoved.run(entity);
    }

    initLevel(level) {
        this.level = level;
        this.reset();
        this.level.init(this.app)
    }
}