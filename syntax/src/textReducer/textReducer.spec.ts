import { getFromState, getVal, rndAr, rndSize, str } from '@src/testFramework';
import { defaultTextState, text, TextEvent, textReducer, TextState } from './textReducer';
describe('LexicAnalyzer', () => {
    const rndCanvas = str();
    const rndText = str();
    const set = (txt: string) => text.setText(rndCanvas, txt);
    const rep = (point: string, txt: string) => text.replaceByText(rndCanvas, point, txt);

    test.each`
        actions                               | testName                                         | event                        | stateSelector | value
        ${[text.setText(rndCanvas, rndText)]} | ${'sets .canvases[canvas] from SET_TEXT action'} | ${TextEvent.SET_TEXT}        | ${'canvases'} | ${{ [rndCanvas]: rndText }}
        ${[set('@a;'), rep('@a;', 'b')]}      | ${'sets .canvases[canvas] = "b" from actions'}   | ${TextEvent.REPLACE_BY_TEXT} | ${'canvases'} | ${{ [rndCanvas]: 'b' }}
        ${[set('@a; @a;'), rep('@a;', 'b')]}  | ${'sets .canvases[canvas] = "b b" from actions'} | ${TextEvent.REPLACE_BY_TEXT} | ${'canvases'} | ${{ [rndCanvas]: 'b b' }}
    `('$testName', async ({ actions, event, stateSelector, value }) => {
        let state: TextState = { ...defaultTextState };
        actions.forEach((action) => {
            state = textReducer(state, action);
        });
        expect(state.event).toEqual(event);
        if (stateSelector !== null) {
            expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
        }
    });
});
