import { combineReducers, createStore, applyMiddleware, Store, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { simReducer } from './simReducer';

const rootReducer = combineReducers({ sim: simReducer });

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
