process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const path = require('path');
const http = require('http');
const Express = require('express');
const app = new Express();
const server = new http.Server(app);

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Routes from './dev/js/routes.js'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';

import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './dev/js/reducers/index.js';
import { matchPath } from 'react-router-dom'


app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use('/dist', Express.static(path.join(__dirname, 'dist')));


app.all('*', function (req, res) {

    const context = {}

    const store = createStore(
        allReducers, applyMiddleware(thunk)
    );

    const sheetsRegistry = new SheetsRegistry();
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
    const generateClassName = createGenerateClassName();

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        })
        res.end()
    } else {

        // inside a request
        const promises = []

        Routes.ROUTES.some(route => {
            // use `matchPath` here
            const match = matchPath(req.path, route)
            if (match && route.component.loadData)
                promises.push(route.component.loadData(store, match))
            return match
        })

        Promise.all(promises).then(data => {
            const storeData = JSON.stringify(store.getState())
            const html = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                        <MuiThemeProvider theme={theme}>
                            <StaticRouter
                                location={req.url}
                                context={context}
                            >
                                <Routes />
                            </StaticRouter>
                        </MuiThemeProvider>
                    </JssProvider>
                </Provider>
            )
            const css = sheetsRegistry.toString()

            // res.render('./index.template.ejs', {
            //     html, css, storeData
            // })

            res.render('./index.template.ejs', {
                html:"", css:"", storeData:"{}"
            })
        })

    }

});


app.use(function (req, res) {
    res.sendFile('index.html', { root: './dist/' })
})

server.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info('Server running on http://localhost:3000');
});