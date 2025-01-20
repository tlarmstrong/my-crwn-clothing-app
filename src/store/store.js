// where all redux happens -- where our state lives, actions are received/dispatched

import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

import { middleWares } from './middleware/logger';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
