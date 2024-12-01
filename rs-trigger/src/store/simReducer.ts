import {
    AndNotElementState,
    ConnectorState,
    defaultAndNotElementState,
    defaultConnectorState,
    defaultRSTriggerState,
    RSTriggerState
} from '@src/sim/sim.types';

export enum SimActions {
    DEFAULT = 'DEFAULT',
    SET_SIM_STATE = 'SET_SIM_STATE'
}

export interface SimState {
    event: SimActions;
    rsTrigger: RSTriggerState;
    andNot1: AndNotElementState;
    andNot2: AndNotElementState;
    out1To2: ConnectorState;
    out2To1: ConnectorState;
}

export const defaultSimState: SimState = {
    event: SimActions.DEFAULT,
    rsTrigger: defaultRSTriggerState,
    andNot1: defaultAndNotElementState,
    andNot2: defaultAndNotElementState,
    out1To2: defaultConnectorState,
    out2To1: defaultConnectorState
};

export interface SetSimStateAction {
    type: SimActions.SET_SIM_STATE;
    payload: {
        rsTrigger: RSTriggerState;
        andNot1: AndNotElementState;
        andNot2: AndNotElementState;
        out1To2: ConnectorState;
        out2To1: ConnectorState;
    };
}

export const sim = {
    setSimState: (state: {
        rsTrigger: RSTriggerState;
        andNot1: AndNotElementState;
        andNot2: AndNotElementState;
        out1To2: ConnectorState;
        out2To1: ConnectorState;
    }): SetSimStateAction => ({ type: SimActions.SET_SIM_STATE, payload: state })
};
interface Action {
    type: SimActions;
}

export function simReducer(state: SimState = defaultSimState, action: Action): SimState {
    switch (action.type) {
        case SimActions.SET_SIM_STATE: {
            return {
                ...state,
                event: SimActions.SET_SIM_STATE,
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
