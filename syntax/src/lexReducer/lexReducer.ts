import { handleActions } from 'redux-actions';

export enum LexEvent {
    DEFAULT = '',
    LIMITERS = 'LEX/LIMITERS',
    IDS = 'LEX/IDS',
    SPACES = 'LEX/SPACES',
    PARSE_LINE = 'LEX/PARSE_LINE',
    COMPILE = 'LEX/COMPILE',
    PARSE_TEXT = 'LEX/PARSE_TEXT'
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

export interface ParseLineAction {
    type: LexEvent.PARSE_LINE;
    payload: {
        line: string;
    };
}

export interface ParseTextAction {
    type: LexEvent.PARSE_TEXT;
    payload: {
        text: string;
    };
}

export interface CompileAction {
    type: LexEvent.COMPILE;
    payload: {};
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
    }),
    parseLine: (line: string): ParseLineAction => ({
        type: LexEvent.PARSE_LINE,
        payload: { line }
    }),
    compile: (): CompileAction => ({
        type: LexEvent.COMPILE,
        payload: {}
    }),
    parseText: (text: string): ParseTextAction => ({
        type: LexEvent.PARSE_TEXT,
        payload: { text }
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
    compiled: CompiledLine[];

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
    compiled: [],
    text: []
};

export interface CanonicTextItem {
    tableId: Table;
    tableIndex: number;
    lineNo: number;
    pos: number;
    lexem: string;
}

export const defaultCanonicTextItem: CanonicTextItem = {
    tableId: Table.DEFAULT,
    tableIndex: -1,
    lineNo: -1,
    pos: -1,
    lexem: ''
};

export type CanonicText = CanonicTextItem[];

export interface CompiledLine {
    tableId: Table;
    tableIndex: number;
    lexem: string;
}
const defaultCompiledLine: CompiledLine = {
    tableId: Table.DEFAULT,
    tableIndex: -1,
    lexem: ''
};

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
        }),
        [LexEvent.PARSE_LINE]: (state: LexState, action: ParseLineAction) => {
            const stateUpdate = parseLine(state, action.payload.line, 0);
            return {
                ...state,
                event: LexEvent.PARSE_LINE,
                text: stateUpdate.text,
                tables: state.tables
            };
        },
        [LexEvent.COMPILE]: (state: LexState, action: CompileAction) => ({
            ...state,
            event: LexEvent.COMPILE,
            compiled: compile(state)
        }),
        [LexEvent.PARSE_TEXT]: (state: LexState, action: ParseTextAction) => {
            const stateUpdate = parseText(state, action.payload.text);
            return {
                ...state,
                event: LexEvent.PARSE_TEXT,
                text: stateUpdate.text,
                tables: state.tables
            };
        }
    },
    defaultLexState
);

const NOT_FOUND = 10000;
interface IndexData {
    pos: number;
    lexem: CompiledLine;
}

const getIndex = (s: string, compiled: CompiledLine[]): IndexData => {
    let bestIndex = NOT_FOUND;
    let bestCompiledLine = defaultCompiledLine;
    compiled.forEach((line: CompiledLine) => {
        const index = s.indexOf(line.lexem);
        if (index >= 0) {
            if (index < bestIndex) {
                bestIndex = index;
                bestCompiledLine = line;
            }
        }
    });

    return { pos: bestIndex, lexem: bestCompiledLine };
};

export const parseLine = (state: LexState, line: string, lineNo: number): LexState => {
    let iter = 0;
    const MAX_ITER = 10;
    let buf = line;
    let currentPosInLine = 0;
    const text: CanonicTextItem[] = [...state.text];
    const idsTable = [...state.tables.i];

    const addIdToText = (newId: string) => {
        const posInIds = idsTable.findIndex((id: string) => id === newId);
        if (posInIds >= 0) {
            const newTextItem: CanonicTextItem = {
                tableId: Table.IDS,
                tableIndex: posInIds,
                lineNo,
                pos: currentPosInLine,
                lexem: newId
            };
            text.push(newTextItem);
        } else {
            idsTable.push(newId);
            const newTextItem: CanonicTextItem = {
                tableId: Table.IDS,
                tableIndex: idsTable.length - 1,
                lineNo,
                pos: currentPosInLine,
                lexem: newId
            };
            text.push(newTextItem);
        }
    };

    const addLimiterOrSpaceToText = (indexData: IndexData) => {
        const newTextItem: CanonicTextItem = {
            tableId: indexData.lexem.tableId,
            tableIndex: indexData.lexem.tableIndex,
            lineNo,
            pos: currentPosInLine,
            lexem: indexData.lexem.lexem
        };
        text.push(newTextItem);
    };

    while (buf.length > 0 && iter < MAX_ITER) {
        const indexData = getIndex(buf, state.compiled);
        if (indexData.pos !== NOT_FOUND) {
            const limiterOrSpaceNotInBufStart = indexData.pos > 0;
            if (limiterOrSpaceNotInBufStart) {
                const newId = buf.substring(0, indexData.pos);
                addIdToText(newId);
                currentPosInLine += newId.length;
            }
            addLimiterOrSpaceToText(indexData);
            currentPosInLine += indexData.lexem.lexem.length;
            buf = buf.substring(indexData.pos + indexData.lexem.lexem.length);
        } else {
            addIdToText(buf);
            buf = '';
        }
        iter++;
    }
    const newTables =
        idsTable.length === state.tables.i.length ? state.tables : { ...state.tables, i: idsTable };
    return { ...state, text, tables: newTables };
};

export const compile = (state: LexState): CompiledLine[] => {
    let result: CompiledLine[] = [];
    result = [
        ...state.tables[Table.LIMITERS].map(
            (lexem: string, index: number): CompiledLine => ({
                tableId: Table.LIMITERS,
                tableIndex: index,
                lexem
            })
        ),
        ...state.tables[Table.SPACES].map(
            (lexem: string, index: number): CompiledLine => ({
                tableId: Table.SPACES,
                tableIndex: index,
                lexem
            })
        )
    ];
    return result;
};

export const parseText = (state: LexState, srcText: string): LexState => {
    let lines = srcText.split('\n');
    lines = lines.map((line: string, index: number) =>
        index < lines.length - 1 ? line + '\n' : line
    );
    let newState = { ...state, tables: { ...state.tables, i: [...state.tables.i] } };

    lines.forEach((line: string, currentLineNo: number) => {
        newState = parseLine(newState, line, currentLineNo);
    });

    return newState;
};
