import { getFromState, getVal, rndAr, rndSize, str } from '@src/testFramework';
import { defaultLexState, lex, LexEvent, lexReducer, LexState } from './lexReducer';
describe('LexicAnalyzer', () => {
    const rndTable: string[] = rndAr(rndSize(1, 4), () => str()) as string[];
    test.each`
        actions                     | testName                                 | event                | stateSelector | value
        ${[lex.limiters(rndTable)]} | ${'sets .tables.l from LIMITERS action'} | ${LexEvent.LIMITERS} | ${'tables'}   | ${{ i: [], s: [], l: rndTable }}
        ${[lex.spaces(rndTable)]}   | ${'sets .tables.l from SPACES action'}   | ${LexEvent.SPACES}   | ${'tables'}   | ${{ i: [], s: rndTable, l: [] }}
        ${[lex.ids(rndTable)]}      | ${'sets .tables.l from IDS action'}      | ${LexEvent.IDS}      | ${'tables'}   | ${{ i: rndTable, s: [], l: [] }}
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
