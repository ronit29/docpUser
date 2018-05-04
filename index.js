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


app.use('/dist', Express.static(path.join(__dirname, 'dist')));

app.use('/api', Express.static(path.join(__dirname, 'dummy_api')));


app.get('*', function(req, res){

    const context = {}

    const store = createStore(
        allReducers
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
            if (match && route.loadData)
                promises.push(route.loadData())
            return match
        })

        Promise.all(promises).then(data => {
            res.render('./index.template.ejs', {
                html, css
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