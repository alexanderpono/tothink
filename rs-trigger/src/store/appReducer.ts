import {
    AndNotElementState,
    ConnectorState,
    defaultAndNotElementState,
    defaultConnectorState,
    defaultRSTriggerState,
    RSTriggerState
} from '@src/sim/sim.types';

export enum AppActions {
    DEFAULT = 'DEFAULT',
    APP_STATE = 'APP_STATE'
}

export interface AppState {
    event: AppActions;
    stepNo: number;
    rsTrigger: RSTriggerState;
    andNot1: AndNotElementState;
    andNot2: AndNotElementState;
    out1To2: ConnectorState;
    out2To1: ConnectorState;
}

export const defaultSimState: AppState = {
    event: AppActions.DEFAULT,
    stepNo: 0,
    rsTrigger: defaultRSTriggerState,
    andNot1: defaultAndNotElementState,
    andNot2: defaultAndNotElementState,
    out1To2: defaultConnectorState,
    out2To1: defaultConnectorState
};

export interface SetAppStateAction {
    type: AppActions.APP_STATE;
    payload: {
        stepNo: number;
        rsTrigger: RSTriggerState;
        andNot1: AndNotElementState;
        andNot2: AndNotElementState;
        out1To2: ConnectorState;
        out2To1: ConnectorState;
    };
}

export const app = {
    setSimState: (state: {
        stepNo: number;
        rsTrigger: RSTriggerState;
        andNot1: AndNotElementState;
        andNot2: AndNotElementState;
        out1To2: ConnectorState;
        out2To1: ConnectorState;
    }): SetAppStateAction => ({ type: AppActions.APP_STATE, payload: state })
};

interface Action {
    type: AppActions;
}

export function appReducer(state: AppState = defaultSimState, action: Action): AppState {
    switch (action.type) {
        case AppActions.APP_STATE: {
            return {
                ...state,
                event: AppActions.APP_STATE,
                stepNo: (action as SetAppStateAction).payload.stepNo,
                rsTrigger: (action as SetAppStateAction).payload.rsTrigger,
                andNot1: (action as SetAppStateAction).payload.andNot1,
                andNot2: (action as SetAppStateAction).payload.andNot2,
                out1To2: (action as SetAppStateAction).payload.out1To2,
                out2To1: (action as SetAppStateAction).payload.out2To1
            };
        }
    }
    return state;
}
