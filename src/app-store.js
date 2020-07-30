import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './app-reducer';

export const appStore= createStore(combineReducers(appReducer), applyMiddleware(thunk))