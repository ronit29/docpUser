// set env vars
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
global.document = null

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

app.set('views', path.join(__dirname, '/dist'));
app.get('/firebase-messaging-sw.js', function (req, res) {
    res.sendFile(__dirname + '/assets/firebase-messaging-sw.js')
});
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
                main: '#f78361'
            },
            secondary: {
                main: '#f78361'
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

        /** 
         * Check if a route is enabled for SSR , RENDER_ON_SERVER == true,
         * if enabled, check if it needs any data(async API) before rendering, if so
         * then wait for that data to resolve then render with proper data.
         */
        Routes.ROUTES.some(route => {
            // use `matchPath` here
            const match = matchPath(req.path, route)
            if (match && route.RENDER_ON_SERVER) {
                if (route.component.loadData) {
                    promises.push(route.component.loadData(store, match))
                } else {
                    promises.push(Promise.resolve({}))
                }
            }
            return match
        })

        /** 
         * Only when a route matches all criteria for SSR, we do SSR
         */
        if (promises && promises.length) {

            Promise.all(promises).then(data => {

                // set a timeout to check if SSR is talking too long, if it does , just render the normal page.
                let SSR_TIMER = setTimeout(() => {
                    res.render('index.ejs', {
                        html: "", css: "", storeData: "{}"
                    })
                }, 2000)

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

                // clear timer to mark success in SSR
                clearTimeout(SSR_TIMER)
                res.render('index.ejs', {
                    html, css, storeData
                })

            })
        } else {
            res.render('index.ejs', {
                html: "", css: "", storeData: "{}"
            })
        }

    }

});


app.use(function (req, res) {
    res.sendFile('index.html', { root: './dist/' })
})

server.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${process.env.PORT || 3000}`);
});