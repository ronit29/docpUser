import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './reducers';
import App from './App.js'

require('../css/style.scss')

const logger = createLogger();

const store = createStore(
    allReducers,
    applyMiddleware(thunk, logger)
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
