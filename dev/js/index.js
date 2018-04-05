import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './reducers';
import Routes from './routes.js'

require('../css/style.css')

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, logger)
);


ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
