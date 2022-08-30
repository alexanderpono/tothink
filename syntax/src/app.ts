import { createReducerSpec, lexReducerSpecModel } from './cards';
import { createReducerSpec2, lexReducerSpecModel2 } from './cards/reducerModel2';
import { defaultLexState, lex, lexReducer } from './lexReducer';
import { defaultTextState, textReducer, TextState } from './textReducer';

let state0 = { ...defaultLexState };

[
    lex.spaces([' ']),
    lex.limiters([';', '(', ')', '{', '}']),
    lex.compile(),
    lex.parseText(`
    function a(b) {
        return b;
    }
    `)
].forEach((action) => {
    state0 = lexReducer(state0, action);
});

// console.log('state=', state);

const state: TextState = createReducerSpec(lexReducerSpecModel).reduce(
    (state: TextState, action) => textReducer(state, action),
    { ...defaultTextState }
);
// console.log('=============== createLexReducerSpec ===============');
// console.log(state.canvases.result);

const state2: TextState = createReducerSpec2(lexReducerSpecModel2).reduce(
    (state: TextState, action) => textReducer(state, action),
    { ...defaultTextState }
);
console.log(state2.canvases.result);
