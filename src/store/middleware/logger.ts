// example of custom middleware for logger
// uses curried functions

// not currently using, but basic example of custom middleware

/*import { Middleware } from 'redux';

import { RootState } from '../store';*/

// pass an empty type to signify we're not extending the Middleware
/*const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
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


