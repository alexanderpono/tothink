import { createSpecForReducer, lexReducerSpec } from './cards';
import { defaultLexState, lex, lexReducer } from './lexReducer';
import { defaultTextState, textReducer, TextState } from './textReducer';

// let state = { ...defaultLexState };
// const text = `
// function a(b) {
//     return b;
// }
// `;
// const actions = [
//     lex.spaces([' ']),
//     lex.limiters([';', '(', ')', '{', '}']),
//     lex.compile(),
//     lex.parseText(text)
// ];

// actions.forEach((action) => {
//     state = lexReducer(state, action);
// });

// console.log('state=', state);

const state: TextState = createSpecForReducer(lexReducerSpec).reduce(
    (state: TextState, action) => textReducer(state, action),
    { ...defaultTextState }
);
console.log(state.canvases.result);
