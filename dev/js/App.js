import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CONFIG from './config'
import STORAGE from './helpers/storage'
const Raven = require('raven-js')
import { API_POST } from './api/api.js';
import GTM from './helpers/gtm'
const queryString = require('query-string');
import { setUTMTags, selectLocation, getGeoIpLocation, saveDeviceInfo, loc_physical_ms } from './actions/index.js'
import { _getlocationFromLatLong } from './helpers/mapHelpers.js'

require('../css/custom-bootstrap.css')
require('../css/carousel.css')
require('../css/normalize.css')
require('../css/layout.css')
require('../css/custom.css')
require('../css/customer.css')
require('../css/responsive.css')
// require('../css/online-consultation.css')
require('../css/payment_screen.css')
require('../css/profile.css')
require('../css/transaction.css')
require('../css/error.css')
require('../css/more.css')
require('../css/static.css')

require('../css/slider.css')
require('../css/snackbar.css')
require('../css/cropper.css')
require('./helpers/lightbox/style.css')

require('../css/style.css')

const logPageView = () => {
    // window.location.pathname -> changed route
    let data = {
        'Category': 'ConsumerApp', 'Action': 'RouteChange', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'route-changed', url: window.location.pathname
    }
    GTM.sendEvent({ data: data })
    return null;
};

import NotificationsBoot from './containers/commons/NotificationsBoot'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

        if (STORAGE.checkAuth()) {
            STORAGE.getAuthToken().then((token) => {
                if (token) {
                    API_POST('/api/v1/user/api-token-refresh', {
                        token: token
                    }).then((data) => {
                        // STORAGE.setAuthToken(data.token)
                    })
                }
            })
        }

        const parsed = queryString.parse(window.location.search)

        /** 
         * Select a default location, if no location is selected and lat,long are not provided in url
         */
        if (!this.props.selectedLocation && parsed && !parsed.lat && !parsed.location) {
            this.props.getGeoIpLocation().then((data) => {
                let { latitude, longitude } = data
                if (latitude && longitude) {
                    _getlocationFromLatLong(latitude, longitude, 'locality', (locationData) => {
                        if (locationData) {
                            this.props.selectLocation(locationData, 'geo')
                        }
                    })
                }
            })
        }

        if (parsed.location) {
            this.props.loc_physical_ms(parsed.location).then((loc) => {
                if (loc && loc.longitude && loc.latitude) {
                    _getlocationFromLatLong(loc.latitude, loc.longitude, 'locality', (locationData) => {
                        if (locationData) {
                            this.props.selectLocation(locationData, 'adwords')
                        }
                    })
                }
            })
        }


        if (parsed) {

            if (parsed.utm_source || parsed.utm_medium || parsed.utm_term || parsed.utm_campaign) {

                let data = {
                    'Category': 'ConsumerApp', 'Action': 'UTMevents', 'event': 'utm-events', 'utm_source': parsed.utm_source || '', 'utm_medium': parsed.utm_medium || '', 'utm_term': parsed.utm_term || '', 'utm_campaign': parsed.utm_campaign || '', 'addToGA': false
                }

                GTM.sendEvent({ data: data })

                let utm_tags = {
                    utm_source: parsed.utm_source || '',
                    utm_medium: parsed.utm_medium || '',
                    utm_term: parsed.utm_term || '',
                    utm_campaign: parsed.utm_campaign || ''
                }

                this.props.setUTMTags(utm_tags)
            }
        }

        let isMobile = false
        let device = 'desktop'
        if (navigator) {

            if (/mobile/i.test(navigator.userAgent)) {
                isMobile = true
                device = 'mobile'
            }

            if (navigator.userAgent.match(/iPad/i)) {
                device = 'ipad'
            }

            if (navigator.userAgent.match(/iPhone/i)) {
                device = 'iphone'
            }


            if (navigator.userAgent.match(/Android/i)) {
                device = 'Android'
            }

            if (navigator.userAgent.match(/BlackBerry/i)) {
                device = 'BlackBerry'
            }

            /*
            if(navigator.userAgent.match(/webOS/i)){
                    device = 'desktop'
            }*/

            let data = {
                'Category': 'ConsumerApp', 'Action': 'VisitorInfo', 'event': 'visitor-info', 'Device': device, 'Mobile': isMobile, 'platform': navigator.platform || '', 'addToGA': false
            }

            GTM.sendEvent({ data: data })


        }
        this.props.saveDeviceInfo(device)

        //Save Organic Search on DB
        if(document && document.referrer){
            if(document.referrer.match('google')){
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'OrganicSearch', 'event': 'organic-search', 'addToGA': false
                }

                GTM.sendEvent({ data: data })
            }
        }

        // boot Raven(Sentry logger)
        if (CONFIG.RAVEN_DSN_KEY) {

            Raven.config(CONFIG.RAVEN_DSN_KEY, {
                environment: CONFIG.env
            }).install()
        }

    }

    render() {

        return (
            <div>
                <NotificationsBoot />
                <BrowserRouter>
                    <div>
                        <Route path="/" component={logPageView} />
                        <Routes />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    return {
        selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        setUTMTags: (utmTags) => dispatch(setUTMTags(utmTags)),
        selectLocation: (location, type) => dispatch(selectLocation(location, type)),
        getGeoIpLocation: () => dispatch(getGeoIpLocation()),
        saveDeviceInfo: (device) => dispatch(saveDeviceInfo(device)),
        loc_physical_ms: (loc) => dispatch(loc_physical_ms(loc))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
