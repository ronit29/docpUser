import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './reducers';
import App from './App.js'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

require('../css/style.scss')

const logger = createLogger();

const store = createStore(
    allReducers,
    applyMiddleware(thunk, logger)
);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00b7b0'
        },
        secondary: {
            main: '#00b7b0'
        },
    },
    status: {
        danger: 'orange',
    },
})


ReactDOM.hydrate(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
