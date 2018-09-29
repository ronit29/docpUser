// set env vars
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
global.document = null

const path = require('path');
const http = require('http');
const Express = require('express');
const app = new Express();
const server = new http.Server(app);
const axios = require('axios')
const fs = require('fs');
const DIST_FOLDER = './dist/';
const Sentry = require('@sentry/node');

import { Helmet } from "react-helmet";
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Routes from './dev/js/routes.js'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import allReducers from './dev/js/reducers/index.js';
import { matchPath } from 'react-router-dom'
import CONFIG from './dev/js/config'

if (CONFIG.RAVEN_SERVER_DSN_KEY) {
    Sentry.init({ dsn: CONFIG.RAVEN_SERVER_DSN_KEY })
    app.use(Sentry.Handlers.requestHandler())
}

app.disable('etag');
app.set('views', path.join(__dirname, '/dist'));
app.get('/firebase-messaging-sw.js', function (req, res) {
    res.sendFile(__dirname + '/assets/firebase-messaging-sw.js')
});
app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use('/dist', Express.static(path.join(__dirname, 'dist')));


app.all('*', function (req, res) {
    /**
     * Fetch Css files
     */
    _readStyles().then((styleFiles) => {

        let css_file = styleFiles[0]
        let bootstrap_file = styleFiles[1]

        /** 
         *  Track API calls for funneling 
         */
        _serverHit(req, 'server')

        /**
         * Initialized store with persisted reducer and all middlewares
         * TODO: use persisted data for inital render
         */
        const store = createStore(
            allReducers, applyMiddleware(thunk)
        );
        /** 
         * Check if a route is enabled for SSR , RENDER_ON_SERVER == true,
         * if enabled, check if it needs any data(async API) before rendering, if so
         * then wait for that data to resolve then render with proper data.
         */
        const promises = []
        Routes.ROUTES.some(route => {
            // use `matchPath` here
            const match = matchPath(req.path, route)
            if (match && route.RENDER_ON_SERVER) {
                if (route.component.loadData) {
                    promises.push(route.component.loadData(store, match, req.query))
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

            // set a timeout to check if SSR is taking too long, if it does , just render the normal page.
            let SSR_TIMER = setTimeout(() => {
                _serverHit(req, 'server_done')
                res.render('index.ejs', {
                    html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file
                })
            }, 5000)

            Promise.all(promises).then(data => {
                try {
                    /**
                     * Context for async data loading -> mimic componentDidMount actions.
                     */
                    let context = {}
                    if (data && data[0]) {
                        context.data = data[0]
                    }

                    const storeData = JSON.stringify(store.getState())
                    const html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                            <div>
                                <StaticRouter
                                    location={req.url}
                                    context={context}
                                >
                                    <div>
                                        <Routes />
                                    </div>
                                </StaticRouter>
                            </div>
                        </Provider>
                    )
                    const helmet = Helmet.renderStatic()

                    // clear timer to mark success in SSR
                    clearTimeout(SSR_TIMER)

                    _serverHit(req, 'server_done')
                    _serverHit(req, 'server_done_ssr')
                    res.render('index.ejs', {
                        html, storeData, helmet, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file
                    })

                } catch (e) {

                    if (CONFIG.RAVEN_SERVER_DSN_KEY) {
                        Sentry.captureException(e)
                    }

                    _serverHit(req, 'server_done')
                    res.render('index.ejs', {
                        html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file
                    })
                }

            }).catch((error) => {
                /** 
                 * If a new url is sent via any API call, then redirect client.
                 */
                if (error && error.url) {
                    res.redirect(`/${error.url}`);
                } else {

                    if (CONFIG.RAVEN_SERVER_DSN_KEY) {
                        Sentry.captureException(error)
                    }

                    _serverHit(req, 'server_done')
                    res.render('index.ejs', {
                        html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file
                    })
                }
            })
        } else {
            _serverHit(req, 'server_done')
            res.render('index.ejs', {
                html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file
            })
        }

    }).catch((e) => {
        if (CONFIG.RAVEN_SERVER_DSN_KEY) {
            Sentry.captureException(error)
        }
    })

});


if (CONFIG.RAVEN_SERVER_DSN_KEY) {
    app.use(Sentry.Handlers.errorHandler())
}

server.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${process.env.PORT || 3000}`);
});


function _readStyles() {
    return new Promise((resolve, reject) => {
        fs.readdir(DIST_FOLDER, (err, files) => {
            let stylePromises = []
            for (let file of files) {
                if (file.includes('.css')) {
                    stylePromises.push(_readFileAsync(`${DIST_FOLDER}${file}`))
                    break
                }
            }
            stylePromises.push(_readFileAsync(`./assets/css/bootstrap-grid.min.css`))

            Promise.all(stylePromises).then((styleFilesData) => {
                resolve(styleFilesData)
            }).catch((e) => {
                if (CONFIG.RAVEN_SERVER_DSN_KEY) {
                    Sentry.captureException(error)
                }
                reject(e)
            })
        })
    })
}

function _readFileAsync(filename) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filename, 'utf-8', (err, data) => {
                if (err) reject(err); else resolve(data);
            })
        } catch (err) {
            reject(err)
        }
    })
}

function _serverHit(req, type = 'server') {
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    axios.post(CONFIG.API_BASE_URL + '/api/v1/tracking/serverhit', {
        url: req.url,
        refferar: req.headers.referer,
        ip: ip,
        type: type
    }).then((res) => {
        // console.log(res)
    }).catch((e) => {
        // console.log(e)
    })
}