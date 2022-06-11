import { defaultLexState, lex, lexReducer } from './lexReducer';

let state = { ...defaultLexState };
const text = `
function a(b) {
    return b;
}
`;
const actions = [
    lex.spaces([' ']),
    lex.limiters([';', '(', ')', '{', '}']),
    lex.compile(),
    lex.parseText(text)
];

actions.forEach((action) => {
    state = lexReducer(state, action);
});

console.log('state=', state);
