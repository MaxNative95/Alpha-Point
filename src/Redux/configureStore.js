import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import {AsyncStorage} from 'react-native';
import { persistStore, persistReducer } from 'redux-persist'

import reducers from './Reducers/index.js';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);