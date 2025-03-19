export enum AppActions {
    DEFAULT = 'DEFAULT',
    APP_STATE = 'APP_STATE'
}

export interface AppState {
    event: AppActions;
    stepNo: number;
}

export const defaultSimState: AppState = {
    event: AppActions.DEFAULT,
    stepNo: 0
};

export interface SetAppStateAction {
    type: AppActions.APP_STATE;
    payload: {
        stepNo: number;
    };
}

export const app = {
    setSimState: (state: { stepNo: number }): SetAppStateAction => ({
        type: AppActions.APP_STATE,
        payload: state
    })
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
                stepNo: (action as SetAppStateAction).payload.stepNo
            };
        }
    }
    return state;
}
