import { getFromState, getVal, rndAr, rndSize, str } from '@src/testFramework';
import {
    CanonicText,
    CanonicTextItem,
    defaultLexState,
    lex,
    LexEvent,
    lexReducer,
    LexState,
    Table
} from './lexReducer';
describe('LexicAnalyzer', () => {
    const rndTable: string[] = rndAr(rndSize(1, 4), () => str()) as string[];
    const txtSemi: CanonicTextItem = {
        tableId: Table.LIMITERS,
        tableIndex: 0,
        lineNo: 0,
        pos: 0
    };
    const txtFunc: CanonicTextItem = {
        tableId: Table.IDS,
        tableIndex: 0,
        lineNo: 0,
        pos: 0
    };
    const txtA: CanonicTextItem = {
        tableId: Table.IDS,
        tableIndex: 1,
        lineNo: 0,
        pos: 0
    };
    const txtB: CanonicTextItem = {
        tableId: Table.IDS,
        tableIndex: 2,
        lineNo: 0,
        pos: 0
    };
    const txtBrO: CanonicTextItem = {
        tableId: Table.LIMITERS,
        tableIndex: 1,
        lineNo: 0,
        pos: 0
    };
    const txtBrC: CanonicTextItem = {
        tableId: Table.LIMITERS,
        tableIndex: 2,
        lineNo: 0,
        pos: 0
    };
    const txtSpace: CanonicTextItem = {
        tableId: Table.SPACES,
        tableIndex: 0,
        lineNo: 0,
        pos: 0
    };
    const text1: CanonicText = [txtSemi];
    const text2: CanonicText = [txtFunc, { ...txtSemi, pos: 8 }];
    const text3: CanonicText = [
        txtFunc,
        { ...txtSpace, pos: 8 },
        { ...txtA, pos: 9 },
        { ...txtBrO, pos: 10 },
        { ...txtB, pos: 11 },
        { ...txtBrC, pos: 12 },
        { ...txtSemi, pos: 13 }
    ];
    const text4: CanonicText = [txtFunc];
    const text5: CanonicText = [txtFunc, { ...txtSpace, pos: 8 }, { ...txtFunc, pos: 9 }];
    const cmpSemi = { tableId: Table.LIMITERS, tableIndex: 0, lexem: ';' };
    const cmpBracketO = { tableId: Table.LIMITERS, tableIndex: 1, lexem: '(' };
    const cmpBracketC = { tableId: Table.LIMITERS, tableIndex: 2, lexem: ')' };
    const compiled1 = [cmpSemi, cmpBracketO, cmpBracketC];
    const compiled2 = [
        cmpSemi,
        cmpBracketO,
        cmpBracketC,
        { tableId: Table.SPACES, tableIndex: 0, lexem: ' ' }
    ];
    const limiters = lex.limiters([';', '(', ')']);
    const spaces = lex.spaces([' ']);
    const compile = lex.compile();

    test.each`
        actions                                                            | testName                                          | event                  | stateSelector | value
        ${[lex.limiters(rndTable)]}                                        | ${'sets .tables.l from LIMITERS action'}          | ${LexEvent.LIMITERS}   | ${'tables'}   | ${{ i: [], s: [], l: rndTable }}
        ${[lex.spaces(rndTable)]}                                          | ${'sets .tables.s from SPACES action'}            | ${LexEvent.SPACES}     | ${'tables'}   | ${{ i: [], s: rndTable, l: [] }}
        ${[lex.ids(rndTable)]}                                             | ${'sets .tables.i from IDS action'}               | ${LexEvent.IDS}        | ${'tables'}   | ${{ i: rndTable, s: [], l: [] }}
        ${[lex.parseLine('')]}                                             | ${'sets .text from PARSE_LINE action'}            | ${LexEvent.PARSE_LINE} | ${'text'}     | ${[]}
        ${[limiters, compile]}                                             | ${'sets .compiled from COMPILE action'}           | ${LexEvent.COMPILE}    | ${'compiled'} | ${compiled1}
        ${[limiters, spaces, compile]}                                     | ${'sets .compiled from COMPILE action'}           | ${LexEvent.COMPILE}    | ${'compiled'} | ${compiled2}
        ${[limiters, spaces, compile, lex.parseLine(';')]}                 | ${'sets .text from PARSE_LINE action (;)'}        | ${LexEvent.PARSE_LINE} | ${'text'}     | ${text1}
        ${[limiters, spaces, compile, lex.parseLine('function;')]}         | ${'sets .text from PARSE_LINE action (function)'} | ${LexEvent.PARSE_LINE} | ${'text'}     | ${text2}
        ${[limiters, spaces, compile, lex.parseLine('function a(b);')]}    | ${'sets .text from PARSE_LINE action (function)'} | ${LexEvent.PARSE_LINE} | ${'text'}     | ${text3}
        ${[limiters, spaces, compile, lex.parseLine('function')]}          | ${'sets .text from PARSE_LINE action (function)'} | ${LexEvent.PARSE_LINE} | ${'text'}     | ${text4}
        ${[limiters, spaces, compile, lex.parseLine('function function')]} | ${'sets .text from PARSE_LINE action (function)'} | ${LexEvent.PARSE_LINE} | ${'text'}     | ${text5}
    `('$testName', async ({ actions, event, stateSelector, value }) => {
        let state: LexState = { ...defaultLexState };
        actions.forEach((action) => {
            state = lexReducer(state, action);
        });
        expect(state.event).toEqual(event);
        if (stateSelector !== null) {
            expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
        }
    });
});
