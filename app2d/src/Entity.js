export class Entity {
    constructor(props) {
        this.props = props;

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.rotation = props.rotation || 0;
        this.size = props.size || 1;
        this.width = props.width || 0;
        this.height = props.height || 0;

        this.pixi = null;

        if (props.script) {
            this.script = props.script;
        }
    }
}