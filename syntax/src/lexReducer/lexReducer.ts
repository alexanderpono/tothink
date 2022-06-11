import { handleActions } from 'redux-actions';

export enum LexEvent {
    DEFAULT = '',
    LIMITERS = 'LEX/LIMITERS',
    IDS = 'LEX/IDS',
    SPACES = 'LEX/SPACES'
}
export interface LimitersAction {
    type: LexEvent.LIMITERS;
    payload: {
        table: string[];
    };
}
export interface IdsAction {
    type: LexEvent.IDS;
    payload: {
        table: string[];
    };
}
export interface SpacesAction {
    type: LexEvent.SPACES;
    payload: {
        table: string[];
    };
}

export const lex = {
    limiters: (table: string[]): LimitersAction => ({
        type: LexEvent.LIMITERS,
        payload: { table }
    }),
    ids: (table: string[]): IdsAction => ({
        type: LexEvent.IDS,
        payload: { table }
    }),
    spaces: (table: string[]): SpacesAction => ({
        type: LexEvent.SPACES,
        payload: { table }
    })
};

export enum Table {
    DEFAULT = '',
    LIMITERS = 'l',
    SPACES = 's',
    IDS = 'i'
}

export interface LexState {
    event: LexEvent;
    tables: Tables;

    text: CanonicText;
}

export interface Tables {
    [Table.LIMITERS]: string[];
    [Table.SPACES]: string[];
    [Table.IDS]: string[];
}

export const defaultTables: Tables = {
    [Table.LIMITERS]: [],
    [Table.SPACES]: [],
    [Table.IDS]: []
};

export const defaultLexState: LexState = {
    event: LexEvent.DEFAULT,
    tables: defaultTables,
    text: []
};

export interface CanonicTextItem {
    table: Table;
    tableIndex: number;
    lineNo: number;
    pos: number;
}

export const defaultCanonicTextItem: CanonicTextItem = {
    table: Table.DEFAULT,
    tableIndex: -1,
    lineNo: -1,
    pos: -1
};

export type CanonicText = CanonicTextItem[];

export const lexReducer = handleActions(
    {
        [LexEvent.LIMITERS]: (state: LexState, action: LimitersAction) => ({
            ...state,
            event: LexEvent.LIMITERS,
            tables: { ...state.tables, [Table.LIMITERS]: action.payload.table }
        }),
        [LexEvent.SPACES]: (state: LexState, action: SpacesAction) => ({
            ...state,
            event: LexEvent.SPACES,
            tables: { ...state.tables, [Table.SPACES]: action.payload.table }
        }),
        [LexEvent.IDS]: (state: LexState, action: LimitersAction) => ({
            ...state,
            event: LexEvent.IDS,
            tables: { ...state.tables, [Table.IDS]: action.payload.table }
        })
    },
    defaultLexState
);
