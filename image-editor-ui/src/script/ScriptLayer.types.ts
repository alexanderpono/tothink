export enum LayerEvent {
    DEFAULT = '',
    MOVE_TO = 'LAYER/MOVE_TO'
}

export interface MoveToAction {
    type: LayerEvent.MOVE_TO;
    id: number;
    x: number;
    y: number;
}
