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
import { getUnratedAppointment, updateAppointmentRating, createAppointmentRating, closeAppointmentPopUp, closeAppointmentRating, getRatingCompliments, setFetchResults, setUTMTags, selectLocation, getGeoIpLocation, saveDeviceInfo, mergeOPDState, mergeLABState } from './actions/index.js'
import { _getlocationFromLatLong } from './helpers/mapHelpers.js'
import { opdSearchStateBuilder, labSearchStateBuilder } from './helpers/urltoState.js'

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
    let ch_route = window.location.pathname
    // window.location.pathname -> changed route
    if (window.ch_route == ch_route) {
        return null
    }
    let data = {
        'Category': 'ConsumerApp', 'Action': 'RouteChange', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'page-view', 'VPageName': window.location.pathname + window.location.search, url: window.location.pathname + window.location.search
    }
    GTM.sendEvent({ data: data })
    window.ch_route = ch_route
    return null
};

import NotificationsBoot from './containers/commons/NotificationsBoot'
import RatingsPopUp from './components/commons/ratingsProfileView/RatingsPopUp.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

        const parsed = queryString.parse(window.location.search)
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

        let location_ms = null
        if (window.location.pathname.includes('location=')) {
            location_ms = window.location.pathname.split('location=')[1]
            location_ms = parseInt(location_ms)
        }

        /** /
         * Select a default location, if no location is selected and lat,long are not provided in url
         */
        if (!this.props.selectedLocation && parsed && !parsed.lat && !location_ms) {
            this.props.getGeoIpLocation().then((data) => {
                let { latitude, longitude } = data
                if (latitude && longitude) {
                    _getlocationFromLatLong(latitude, longitude, 'city', (locationData) => {
                        if (locationData) {
                            this.props.selectLocation(locationData, 'geoip', true)
                        }
                    })
                }
            }).catch((e) => {

            })
        }


        /**
         * Tracking code
         * TODO : refactor
         */
        if (parsed) {

            let source = ''

            if(parsed.utm_source){
                source = parsed.utm_source
            }else if(document.referrer){
                source = document.referrer 
            }

            let data = {
                'Category': 'ConsumerApp', 'Action': 'UTMevents', 'event': 'utm-events', 'utm_source': parsed.utm_source || '', 'utm_medium': parsed.utm_medium || '', 'utm_term': parsed.utm_term || '', 'utm_campaign': parsed.utm_campaign || '', 'addToGA': false,'source' : source, 'referrer': document.referrer || ''
            }
            GTM.sendEvent({ data: data })

            let utm_tags = {
                    utm_source: parsed.utm_source || '',
                    utm_medium: parsed.utm_medium || '',
                    utm_term: parsed.utm_term || '',
                    utm_campaign: parsed.utm_campaign || '',
                    source:source,
                    referrer:document.referrer || ''
            }
            this.props.setUTMTags(utm_tags)

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
            let data = {
                'Category': 'ConsumerApp', 'Action': 'VisitorInfo', 'event': 'visitor-info', 'Device': device, 'Mobile': isMobile, 'platform': navigator.platform || '', 'addToGA': false
            }
            GTM.sendEvent({ data: data })
        }
        this.props.saveDeviceInfo(device)


        /**  
         * Boot Raven(Sentry logger)
         */
        if (CONFIG.RAVEN_DSN_KEY) {
            Raven.config(CONFIG.RAVEN_DSN_KEY, {
                environment: CONFIG.env
            }).install()
        }

        if (window.location.pathname.includes('/opd/searchresults')) {
            opdSearchStateBuilder(this.props.selectLocation.bind(this), window.location.search, false, location_ms).then((state) => {
                this.props.mergeOPDState(state, true)
            })
        }

        if (window.location.pathname.includes('/lab/searchresults')) {
            labSearchStateBuilder(this.props.selectLocation.bind(this), window.location.search, false, location_ms).then((state) => {
                this.props.mergeLABState(state, true)
            })
        }

        if (!window.location.pathname.includes('/opd/searchresults') && !window.location.pathname.includes('/lab/searchresults')) {
            this.props.setFetchResults(true)
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
                <RatingsPopUp {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    let {
        profiles, selectedProfile
    } = state.USER

    return {
        selectedLocation, profiles, selectedProfile
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        setUTMTags: (utmTags) => dispatch(setUTMTags(utmTags)),
        selectLocation: (location, type, fetchNewResults) => dispatch(selectLocation(location, type, fetchNewResults)),
        getGeoIpLocation: () => dispatch(getGeoIpLocation()),
        saveDeviceInfo: (device) => dispatch(saveDeviceInfo(device)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        setFetchResults: (fetchNewResults) => dispatch(setFetchResults(fetchNewResults)),
        getUnratedAppointment: (callback) => dispatch(getUnratedAppointment(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        closeAppointmentRating: (appointmentData, callback) => dispatch(closeAppointmentRating(appointmentData, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
