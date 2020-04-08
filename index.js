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
const stats = JSON.parse(_readFileSync(`${DIST_FOLDER}asset-loadable.json`))
const index_bundle = _find_index_bundle()
const compression = require('compression')


let cache = {
    html: "",
    storeData: "",
    helmet: null,
    split_bundles: []
}

let last_cache_time = null

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
import Loadable from 'react-loadable';
const helmet = require('helmet')
//import STORAGE from './dev/js/helpers/storage'
import CookieHelper from './dev/js/helpers/storage/cookie.js'
import RedisCacheHelper from './dev/js/helpers/storage/redis-helper.js'

import { getSpecialityFooterData } from './dev/js/actions/index.js'

// import { getBundles } from 'react-loadable/webpack'
// import { getBundles } from 'react-loadable-ssr-addon';

// GZIP Compression
app.use(compression())

if (CONFIG.RAVEN_SERVER_DSN_KEY && false) {
    Sentry.init({ dsn: CONFIG.RAVEN_SERVER_DSN_KEY })
    app.use(Sentry.Handlers.requestHandler())
    app.use(helmet.hsts({
      maxAge: 5184000,
      includeSubDomains: true,
      preload: true
    }))
}

app.disable('etag');
app.set('views', path.join(__dirname, '../dist'));
app.get('/firebase-messaging-sw.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../assets/firebase-messaging-sw.js'))
});
app.get('/disbaled-apple-app-site-association', function (req, res) {
    res.json({
        "applinks": {
            "apps": [],
            "details": [
                {
                    "appID": "29VUWR4N68.com.docprime",
                    "paths": [
                        "*"
                    ]
                },
            ]
        },
        "webcredentials": {
            "apps": [
                "29VUWR4N68.com.docprime",
            ]
        },
        "activitycontinuation": {
            "apps": [
                "29VUWR4N68.com.docprime",
            ]
        }
    })
});
app.use('/assets', Express.static(path.join(__dirname, '../assets')));
app.use('/dist', Express.static(path.join(__dirname, '../dist')));
app.use('/sw.js', Express.static('sw.js'));
app.use('/offline.html', Express.static('offline.html'));

function getUtmParams(req, res){
    try{
        if(req && req.query && req.query.utm_source=='sbi_utm'){
            res.cookie('sbi_utm',true, { maxAge: 900000});
        }
    }catch(e) {

    }
}

app.all('*', function (req, res) {
    //console.log('Enter Requests');
    /**
     * Fetch Css files
     */

    if(CookieHelper && CookieHelper.init){
        CookieHelper.init(req);
    }

    //getUtmParams(req, res);

     if(req.get('host') && req.get('host').includes('www.')) {
        let redirect_url = "https://docprime.com" + req.originalUrl
        res.writeHead(301, { "Location": redirect_url })
        return res.end()
     }
     let show_sbi_theme = false

     try{
         // if( (req && req.query && req.query.utm_source=='sbi_utm') || (req && req.cookies && req.cookies.sbi_utm) || (req && req.headers && req.headers.cookie && req.headers.cookie.includes('sbi_utm') ) ) {
         //    show_sbi_theme = true;
         //    res.cookie('sbi_utm',true, { maxAge: 900000});
         // }
        if( (req.get('host') && req.get('host').includes('sbi'))){ 
            show_sbi_theme = true
            res.cookie('sbi_utm',true, { maxAge: 900000});
        }
     }catch(e){

     }

     //For local host
     if( (req && req.query && req.query.utm_source && req.query.utm_source=='sbi_utm' ) ) {
        show_sbi_theme = true
     }

    _readStyles().then((styleFiles) => {
        //console.log('read styles');

        let css_file = styleFiles[0]
        let bootstrap_file = styleFiles[1]

        // use cache
        // if (req.path == "/" && last_cache_time) {
        //     var startTime = last_cache_time
        //     var endTime = new Date()
        //     var difference = endTime.getTime() - startTime.getTime()
        //     var resultInMinutes = Math.round(difference / 60000)

        //     if (resultInMinutes > 30) {
        //         last_cache_time = null
        //         cache = {
        //             html: "",
        //             storeData: "",
        //             helmet: null,
        //             split_bundles: []
        //         }
        //     } else {
        //         res.render('index.ejs', {
        //             html: cache.html, storeData: cache.storeData, helmet: cache.helmet, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file, index_bundle, split_bundles: cache.split_bundles
        //         })
        //         return
        //     }
        // }

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
        let split_bundles = []
        let route_matched = false
        Routes.ROUTES.some((route) => {
            // use `matchPath` here
            const match = matchPath(req.path, route)
            if (match) {
                route_matched = route
            }

            // handle custome redirects
            if (match && route.redirect && route.redirectTo) {
                promises.push(Promise.reject({ url: route.redirectTo }))
            }

            if (match && route.RENDER_ON_SERVER) {
                try{
                    promises.push(store.dispatch(getSpecialityFooterData()));

                }catch(e){
                    //console.log(e);
                }
                
                /**
                 * If a component needs preloading, chain preload followed by loadData if required
                 */
                 //For Article Page,get/set props from REDIS
                if(req && req.path && ( req.path.match('-mddp') || req.path.match('-dsdp') || req.path.match('-mddp') ) ){
                    let article_url = match.url
                    article_url = article_url.toLowerCase().substring(1, article_url.length)
                    let dataParams = {
                        article_url: article_url
                    }
                    try{
                        promises.push(RedisCacheHelper.getArticle(dataParams).then((data)=>{
                            if (route.component.preload) {
                                route.component.preload().then(r => {
                                    return r.default || r
                                }).then((c) => {

                                    if(c.buildStateFromRedis){
                                        return c.buildStateFromRedis(data, store)
                                    }else if (c.loadData) {
                                        return c.loadData(store, match, req.query)
                                    }
                                    return {}
                                })
                            } else {
                                if(route.component.buildStateFromRedis){
                                    return route.component.buildStateFromRedis(data, store)
                                }else if (route.component.loadData) {
                                    return route.component.loadData(store, match, req.query)
                                } else {
                                    return Promise.resolve({})
                                }
                            } 
                        } )
                    )
                    }catch(e){

                        if (route.component.preload) {
                            promises.push(route.component.preload().then(r => {
                                return r.default || r
                            }).then((c) => {
                                if (c.loadData) {
                                    return c.loadData(store, match, req.query)
                                }
                                return {}
                            }))
                        } else {
                            if (route.component.loadData) {
                                promises.push(route.component.loadData(store, match, req.query))
                            } else {
                                promises.push(Promise.resolve({}))
                            }
                        }

                    }
                }else if (route.component.preload) {
                    promises.push(route.component.preload().then(r => {
                        return r.default || r
                    }).then((c) => {
                        if (c.loadData) {
                            return c.loadData(store, match, req.query)
                        }
                        return {}
                    }))
                } else {
                    if (route.component.loadData) {
                        promises.push(route.component.loadData(store, match, req.query))
                    } else {
                        promises.push(Promise.resolve({}))
                    }
                }
            }

            return match
        })

        /** 
         * Only when a route matches all criteria for SSR, we do SSR
         */
         // console.log(req.path);
         // console.log('Routes REad');
         // console.log(promises && promises.length);
        if (promises && promises.length) {

            // set a timeout to check if SSR is taking too long, if it does , just render the normal page.
            let SSR_TIMER = setTimeout(() => {
                //console.log('timeout error');
                _serverHit(req, 'server_done')
                res.set('X-Frame-Options', 'sameorigin');
                res.render('index.ejs', {
                    html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file, index_bundle, split_bundles, show_sbi_theme
                })
            }, 10000)

            Promise.all(promises).then(data => {
                //console.log('Inside PRomise');
                try {
                    /**
                     * Context for async data loading -> mimic componentDidMount actions.
                     */
                    let context = {}
                    if (data && data[0]) {
                        context.data = data[0]
                    }
                    //console.log('Befor frames PRomise');
                    res.set('X-Frame-Options', 'sameorigin')
                    //console.log('After Frames PRomise');
                    
                    if (context.data && context.data.status && context.data.status == 404) {

                        if(req && req.path && req.path.match('-mddp')) {
                            res.writeHead(302, {
                              'Location': '/all-medicines'
                            });
                            res.end();
                        }
                        
                        res.status(404)
                    }

                    if (context.data && context.data.status && context.data.status == 301) {
                        res.status(301)
                    }

                    const storeData = JSON.stringify(store.getState())

                    /**
                     * Store preloaded module's path- required while appending chunk in template
                     */
                    const modules = []
                    const html = ReactDOMServer.renderToString(
                        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
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
                        </Loadable.Capture>
                    )

                    // split bundles based on react-loadbale.json stats - built via webpack
                    split_bundles = _getBundles(stats, modules)
                    const helmet = Helmet.renderStatic()

                    // clear timer to mark success in SSR
                    clearTimeout(SSR_TIMER)

                    _serverHit(req, 'server_done')
                    _serverHit(req, 'server_done_ssr')

                    // populate cache
                    // if (req.path == "/") {
                    //     last_cache_time = new Date()
                    //     cache = {
                    //         storeData, html, helmet, split_bundles
                    //     }
                    // }

                    res.render('index.ejs', {
                        html, storeData, helmet, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file, index_bundle, split_bundles, show_sbi_theme
                    })

                } catch (e) {
                    if (CONFIG.RAVEN_SERVER_DSN_KEY) {
                       // Sentry.captureException(e)
                    }
                    // console.log('inside error');
                    // console.log(e);
                    clearTimeout(SSR_TIMER)

                    _serverHit(req, 'server_done')
                    res.render('index.ejs', {
                        html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file, index_bundle, split_bundles, show_sbi_theme
                    })
                }

            }).catch((error) => {
                   // console.log('inside GET. DDD error',error);

                clearTimeout(SSR_TIMER)

                /** 
                 * If a new url is sent via any API call, then redirect client.
                 */
                if (error && error.url) {
                    let status = error.status || 301
                    res.redirect(status, `/${error.url}`);
                } else {

                    if (CONFIG.RAVEN_SERVER_DSN_KEY) {
                        // Sentry.captureException(error)
                    }
                    if(req && req.path && req.path.match('-mddp')) {
                        res.writeHead(302, {
                          'Location': '/all-medicines'
                        });
                        res.end();
                    }

                    res.status(404)
                    _serverHit(req, 'server_done')
                    res.render('index.ejs', {
                        html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file, index_bundle, split_bundles, show_sbi_theme
                    })
                }
            })

        } else {
            // if not route is matched, send 404 status along with the page.
            if (route_matched.NO_MATCH) {
                res.status(404)
            }
            _serverHit(req, 'server_done')
            res.render('index.ejs', {
                html: "", storeData: "{}", helmet: null, ASSETS_BASE_URL: ASSETS_BASE_URL, css_file, bootstrap_file, index_bundle, split_bundles, show_sbi_theme
            })
        }

    }).catch((e) => {
        if (CONFIG.RAVEN_SERVER_DSN_KEY) {
           // Sentry.captureException(error)
        }
    })

});


if (CONFIG.RAVEN_SERVER_DSN_KEY && false) {
    app.use(Sentry.Handlers.errorHandler())
}

Loadable.preloadAll().then(() => {

    server.listen(process.env.PORT || 3000, (err) => {
        if (err) {
            return console.error(err);
        }
        console.info(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
}).catch((e)=>{
//console.log('erorror in preload');
//console.log(e);
})


function _find_index_bundle() {
    let files = fs.readdirSync(DIST_FOLDER)
    for (let file of files) {
        if (file.includes('.bundle.js') && file.includes('index')) {
            if (DOCPRIME_PRODUCTION || DOCPRIME_STAGING) {
                return process.env.CDN_BASE_URL + 'dist/' + `${file}`
            } else {
                return `/dist/${file}`
            }
        }
    }
}

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
                if (CONFIG.RAVEN_SERVER_DSN_KEY && false) {
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
    return;
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    let agent = req.headers['user-agent'] || null

    axios.post(CONFIG.API_BASE_URL + '/api/v1/tracking/serverhit', {
        url: req.url,
        refferar: req.headers.referer,
        ip: ip,
        type: type,
        agent: agent
    }).then((res) => {
        // console.log(res)
    }).catch((e) => {
        // console.log(e)
    })
}

function _readFileSync(filename) {
    return fs.readFileSync(filename, 'utf-8')
}

function _getBundles(stats, modules=[]){
    if(!modules.length){
        return []
    }

    let r_module = modules[0]
    let required_bundles = stats.origins[r_module]
    if(!required_bundles || !required_bundles.length){
        return []
    }

    let split_bundles = []
    for(let b of required_bundles){
        let curr_bundle = stats.assets[b]
        if(curr_bundle && curr_bundle.js && curr_bundle.js.length){
            split_bundles.push(curr_bundle.js[0])
        }
    }
    return split_bundles
}
