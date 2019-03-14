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
import Loadable from 'react-loadable';

const middlewares = [thunk]
/**
 * Only log in DEV MODE.
 */
if (!DOCPRIME_PRODUCTION) {
    const logger = createLogger();
    middlewares.push(logger)
}

const store = createStore(
    persistedReducer,
    window.__INITIAL_STATE__,
    applyMiddleware(...middlewares)
);

/**
 * Wait for all chunks to get merged and then bootstarp the application.
 */
Loadable.preloadReady().then(() => {
    /**
     * Wait for persisStore to finish rehydrating, before trying to hydrate client side DOM.
     * This will only re-render nodes which are changed after merging persisted store on the
     * client side.
     */
    let persistor = persistStore(store, null, () => {
        ReactDOM.hydrate(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        );
    })
});

