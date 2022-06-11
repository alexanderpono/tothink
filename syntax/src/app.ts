import { defaultLexState, lex, lexReducer as r } from './lexReducer';

const state = { ...defaultLexState };
console.log(
    'state(useTable)=',
    r(r(r(state, lex.ids(['1'])), lex.spaces([' '])), lex.limiters([';']))
);
