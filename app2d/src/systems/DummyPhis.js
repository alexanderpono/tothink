export class DummyPhis {
    constructor(app) {
        this.app = app;
    }
    
    loop(delta) {
        const {entities} = this.app.game;
        for (let i = 0; i<entities.length; i++) {
            const entity = entities[i];
            const { dummy } = entity;
            if (entity.dummy) {
                entity.x += dummy.vx * delta;
                entity.y += dummy.vy * delta;
    
                if (entity.x < 0) {
                    entity.x = -entity.x;
                    dummy.vx = -dummy.vx;
                }
    
                if (entity.x > entity.width) {
                    entity.x = entity.width * 2 - entity.x;
                    dummy.vx = -dummy.vx;
                }
    
                if (entity.y < 0) {
                    entity.y = -entity.y;
                    dummy.vy = -dummy.vy;
                }
    
                if (entity.y > entity.height) {
                    entity.y = entity.height * 2 - entity.y;
                    dummy.vy = -dummy.vy;
                }
    
            }
        }
    }

    entityAdded(entity) {
        const { props } = entity;
        if (props.dummy) {
            if (props.dummy.v) {
                entity.dummy = {
                    vx: Math.cos(props.dummy.ang) * props.dummy.v,
                    vy: Math.sin(props.dummy.ang) * props.dummy.v
                }
            } else {
                entity.dummy = {
                    vx: props.dummy.vx,
                    vy: props.dummy.vy
                }

            }
        }
    }

    entityRemoved(entity) {
    }
}