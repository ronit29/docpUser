import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './reducers';
import App from './App.js'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['USER', 'SEARCH_CRITERIA_LABS', 'SEARCH_CRITERIA_OPD', 'LAB_SEARCH', 'DOCTOR_SEARCH']
}

const persistedReducer = persistReducer(persistConfig, allReducers)

// const store = createStore(
//     allReducers,
//     window.__INITIAL_STATE__,
//     applyMiddleware(thunk, logger)
// );

const logger = createLogger();
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, logger)
);
let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
