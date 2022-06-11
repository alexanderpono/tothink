import { defaultLexState, lex, lexReducer } from './lexReducer';

let state = { ...defaultLexState };
const actions = [
    lex.spaces([' ']),
    lex.limiters([';', '(', ')']),
    lex.compile(),
    lex.parseLine('function a(b);')
];

actions.forEach((action) => {
    state = lexReducer(state, action);
});

console.log('state=', state);
