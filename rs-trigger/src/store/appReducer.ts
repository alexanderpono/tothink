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

export interface SimState {
    event: AppActions;
    rsTrigger: RSTriggerState;
    andNot1: AndNotElementState;
    andNot2: AndNotElementState;
    out1To2: ConnectorState;
    out2To1: ConnectorState;
}

export const defaultSimState: SimState = {
    event: AppActions.DEFAULT,
    rsTrigger: defaultRSTriggerState,
    andNot1: defaultAndNotElementState,
    andNot2: defaultAndNotElementState,
    out1To2: defaultConnectorState,
    out2To1: defaultConnectorState
};

export interface SetSimStateAction {
    type: AppActions.APP_STATE;
    payload: {
        rsTrigger: RSTriggerState;
        andNot1: AndNotElementState;
        andNot2: AndNotElementState;
        out1To2: ConnectorState;
        out2To1: ConnectorState;
    };
}

export const app = {
    setSimState: (state: {
        rsTrigger: RSTriggerState;
        andNot1: AndNotElementState;
        andNot2: AndNotElementState;
        out1To2: ConnectorState;
        out2To1: ConnectorState;
    }): SetSimStateAction => ({ type: AppActions.APP_STATE, payload: state })
};
interface Action {
    type: AppActions;
}

export function appReducer(state: SimState = defaultSimState, action: Action): SimState {
    switch (action.type) {
        case AppActions.APP_STATE: {
            return {
                ...state,
                event: AppActions.APP_STATE,
                rsTrigger: (action as SetSimStateAction).payload.rsTrigger,
                andNot1: (action as SetSimStateAction).payload.andNot1,
                andNot2: (action as SetSimStateAction).payload.andNot2,
                out1To2: (action as SetSimStateAction).payload.out1To2,
                out2To1: (action as SetSimStateAction).payload.out2To1
            };
        }
    }
    return state;
}
