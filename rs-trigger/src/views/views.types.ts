export interface RenderSettings {
    boxW: number;
    boxH: number;
    boxX: number;
    boxY: number;
    box2Y: number;
}
const renderSettings: RenderSettings = {
    boxW: 60,
    boxH: 100,
    boxX: 100,
    boxY: 80,
    box2Y: 250
};

export interface AndNotViewState {
    x: number;
    y: number;
    w: number;
    h: number;
    in1: number;
    in2: number;
    out: number;
    showInOut: boolean;
    color: string;
}

export const defaultAndNotViewState: AndNotViewState = {
    x: 0,
    y: 0,
    w: 60,
    h: 100,
    in1: null,
    in2: null,
    out: null,
    showInOut: false,
    color: 'black'
};

export interface ConnectorViewState {
    boxX: number;
    boxY: number;
    boxW: number;
    boxH: number;
    box2Y: number;
    color: string;
}

export const defaultConnectorViewState: ConnectorViewState = {
    boxX: 0,
    boxY: 0,
    boxW: 60,
    boxH: 100,
    box2Y: 0,
    color: 'black'
};
