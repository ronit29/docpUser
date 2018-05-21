import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './reducers';
import App from './App.js'

const logger = createLogger();

const store = createStore(
    allReducers,
    window.__INITIAL_STATE__,
    applyMiddleware(thunk, logger)
);

ReactDOM.hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
