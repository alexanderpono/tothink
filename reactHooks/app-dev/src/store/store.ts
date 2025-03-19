import { combineReducers, createStore, applyMiddleware, Store, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer } from './appReducer';

const rootReducer = combineReducers({ app: appReducer });

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
