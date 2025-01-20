import logger from 'redux-logger';

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
// only use in development
export const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
