import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import persistedReducer from './reducers';
import App from './App.js'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


const logger = createLogger();
const store = createStore(
    persistedReducer,
    window.__INITIAL_STATE__,
    applyMiddleware(thunk, logger)
);
let persistor = persistStore(store)

ReactDOM.hydrate(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
