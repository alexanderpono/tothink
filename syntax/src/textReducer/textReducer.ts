import { handleActions } from 'redux-actions';

export enum TextEvent {
    DEFAULT = '',
    SET_TEXT = 'TEXT/SET_TEXT',
    SET_TEXT_FROM = 'TEXT/SET_TEXT_FROM',
    ADD_TEXT = 'TEXT/ADD_TEXT',
    REPLACE_BY_TEXT = 'TEXT/REPLACE_BY_TEXT',
    REPLACE_BY_CANVAS = 'TEXT/REPLACE_BY_CANVAS'
}

export interface TextState {
    event: TextEvent;
    canvases: Record<string, string>;
}

export const defaultTextState: TextState = {
    event: TextEvent.DEFAULT,
    canvases: {}
};

export interface SetTextAction {
    type: TextEvent.SET_TEXT;
    payload: {
        canvas: string;
        text: string;
    };
}

export interface ReplaceByTextAction {
    type: TextEvent.REPLACE_BY_TEXT;
    payload: {
        canvas: string;
        point: string;
        text: string;
    };
}

export const text = {
    setText: (canvas: string, text: string): SetTextAction => ({
        type: TextEvent.SET_TEXT,
        payload: {
            canvas,
            text
        }
    }),
    replaceByText: (canvas: string, point: string, text: string): ReplaceByTextAction => ({
        type: TextEvent.REPLACE_BY_TEXT,
        payload: {
            canvas,
            point,
            text
        }
    })
};

export const textReducer = handleActions(
    {
        [TextEvent.SET_TEXT]: (state: TextState, action: SetTextAction) => ({
            ...state,
            event: TextEvent.SET_TEXT,
            canvases: { ...state.canvases, [action.payload.canvas]: action.payload.text }
        }),
        [TextEvent.REPLACE_BY_TEXT]: (state: TextState, action: ReplaceByTextAction) => ({
            ...state,
            event: TextEvent.REPLACE_BY_TEXT,
            canvases: {
                ...state.canvases,
                [action.payload.canvas]: state.canvases[action.payload.canvas].replace(
                    new RegExp(action.payload.point, 'g'),
                    action.payload.text
                )
            }
        })
    },
    defaultTextState
);
