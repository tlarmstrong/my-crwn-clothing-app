// where all redux happens -- where our state lives, actions are received/dispatched
import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middlewares: catch actions before they hit our reducers and log out state
// only use in development
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk
].filter(Boolean);

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
