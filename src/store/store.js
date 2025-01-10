// where all redux happens -- where our state lives, actions are received/dispatched

import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// middlewares: catch actions before they hit our reducers and log out state
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
