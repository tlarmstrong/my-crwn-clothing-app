// where all redux happens -- where our state lives, actions are received/dispatched
import {
  compose,
  createStore,
  applyMiddleware,
  Middleware
} from 'redux';

import { 
  persistStore, 
  persistReducer, 
  PersistConfig 
} from 'redux-persist'; 

import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

// typeof = getting the type of whatever we're calling this on
// getting root reducer combined state (intersection of all states to corresponding slice keys)
export type RootState = ReturnType<typeof rootReducer>

// register dev tools
declare global {
  interface Windo {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// define what whitelist can contain -- narrow with intersection 
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

// middlewares: catch actions before they hit our reducers and log out state
// only use in development
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware)); // predicate type

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

// once store is instantiated, run the saga middleware
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
