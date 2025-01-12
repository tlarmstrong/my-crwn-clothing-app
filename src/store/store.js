// where all redux happens -- where our state lives, actions are received/dispatched

import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// example of custom middleware for logger
// uses curried functions

/*const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) {
    return next();
  }
  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());

  next(action);

  console.log('nextState', store.getState());
}
*/

// middlewares: catch actions before they hit our reducers and log out state
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
