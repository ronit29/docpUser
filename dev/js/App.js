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
import { set_summary_utm, getUnratedAppointment, updateAppointmentRating, createAppointmentRating, closeAppointmentPopUp, closeAppointmentRating, getRatingCompliments, setFetchResults, setUTMTags, selectLocation, getGeoIpLocation, saveDeviceInfo, mergeOPDState, mergeLABState, mergeUrlState, getCartItems, loadLabCommonCriterias, toggleLeftMenuBar, clearLabSearchId, clearOpdSearchId, clearIpdSearchId, setCommonUtmTags, OTTExchangeLogin } from './actions/index.js'
import { _getlocationFromLatLong } from './helpers/mapHelpers.js'
import { opdSearchStateBuilder, labSearchStateBuilder } from './helpers/urltoState.js'

import { Swipeable } from 'react-swipeable'

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
require('react-image-lightbox/style.css')
// require('./helpers/lightbox/style.css')
require('../css/date.css')
require('../css/style.css')

const logPageView = () => {

    // change landing page status
    if (window.location.pathname != window.LANDING_PATHNAME) {
        window.ON_LANDING_PAGE = false
    }

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

        const parsed = queryString.parse(window.location.search)

        let source = ''
        if (parsed.utm_source) {
            source = parsed.utm_source
        } else if (document.referrer) {
            source = document.referrer
        }

        let utm_tags = {
            utm_source: parsed.utm_source || '',
            utm_medium: parsed.utm_medium || '',
            utm_term: parsed.utm_term || '',
            utm_campaign: parsed.utm_campaign || '',
            source: source,
            referrer: document.referrer || ''
        }

        this.state = {
            utm_tags, utm_source: source
        }
    }

    componentDidMount() {

        const parsed = queryString.parse(window.location.search)
        if (STORAGE.checkAuth()) {
            this.props.getCartItems()
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

        let OTT = parsed.access_token
        if (OTT && !STORAGE.checkAuth()) {
            this.props.OTTExchangeLogin(OTT).then(() => {
                // do something
            }).catch(() => {
                this.props.history.push('/')
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

            let data = {
                'Category': 'ConsumerApp', 'Action': 'UTMevents', 'event': 'utm-events', 'utm_source': this.state.utm_tags.utm_source || '', 'utm_medium': this.state.utm_tags.utm_medium || '', 'utm_term': this.state.utm_tags.utm_term || '', 'utm_campaign': this.state.utm_tags.utm_campaign || '', 'addToGA': false, 'source': this.state.utm_source, 'referrer': document.referrer || ''
            }
            GTM.sendEvent({ data: data })


            this.props.setUTMTags(this.state.utm_tags)

            //Set UTM Source for Chat

            if (this.state.utm_source && this.state.utm_source.includes('religare')) {
                let tags = {
                    utm_source: this.state.utm_source,
                    visitorId: parsed.visitid || ''
                }
                this.props.setCommonUtmTags('chat', tags)
            }

            // set summary page utm_source
            if (this.state.utm_source == 'alpha_december_18') {
                let validity = new Date()
                validity.setDate(validity.getDate() + 7)
                this.props.set_summary_utm(true, validity)
            }
            // remove if validity exceeded
            if (this.props.summary_utm_validity && this.props.summary_utm) {
                if ((new Date) > (new Date(this.props.summary_utm_validity))) {
                    this.props.set_summary_utm(false, null)
                }
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
            let data = {
                'Category': 'ConsumerApp', 'Action': 'VisitorInfo', 'event': 'visitor-info', 'Device': device, 'Mobile': isMobile, 'platform': navigator.platform || '', 'addToGA': false
            }
            GTM.sendEvent({ data: data })
        }
        this.props.saveDeviceInfo(device)
        this.props.clearOpdSearchId()
        this.props.clearLabSearchId()
        this.props.clearIpdSearchId()

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
                this.props.mergeUrlState(true)
            })
        }

        if (window.location.pathname.includes('/lab/searchresults')) {
            labSearchStateBuilder(this.props.selectLocation.bind(this), window.location.search, false, location_ms).then((state) => {
                this.props.mergeLABState(state, true)
                this.props.mergeUrlState(true)
            })
        }

        if (!window.location.pathname.includes('/opd/searchresults') && !window.location.pathname.includes('/lab/searchresults')) {
            this.props.setFetchResults(true)
            this.props.mergeUrlState(true)
        }

        if (!this.props.common_tests.length || !this.props.common_package.length) {
            this.props.loadLabCommonCriterias()
        }

    }

    toggleLeftMenu(toggle, defaultVal) {
        if (document.getElementById('is_header') && document.getElementById('is_header').offsetHeight) {
            this.props.toggleLeftMenuBar(toggle, defaultVal)
        }
    }


    render() {

        return (
            <Swipeable onSwipedLeft={(eventData) => this.toggleLeftMenu(false, true)}>
                <NotificationsBoot />
                <BrowserRouter>
                    <div>
                        <Route path="/" component={logPageView} />
                        <Routes />
                    </div>
                </BrowserRouter>
                <RatingsPopUp {...this.props} />
            </Swipeable>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    let {
        profiles, selectedProfile, summary_utm, summary_utm_validity
    } = state.USER

    let {
        token
    } = state.AUTH

    const {
        common_tests,
        common_package
    } = state.SEARCH_CRITERIA_LABS

    return {
        selectedLocation, profiles, selectedProfile, token, summary_utm, summary_utm_validity, common_tests, common_package
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
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        set_summary_utm: (toggle, validity) => dispatch(set_summary_utm(toggle, validity)),
        mergeUrlState: (flag) => dispatch(mergeUrlState(flag)),
        getCartItems: () => dispatch(getCartItems()),
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        toggleLeftMenuBar: (toggle, defaultVal) => dispatch(toggleLeftMenuBar(toggle, defaultVal)),
        clearLabSearchId: () => dispatch(clearLabSearchId()),
        clearOpdSearchId: () => dispatch(clearOpdSearchId()),
        clearIpdSearchId: () => dispatch(clearIpdSearchId()),
        setCommonUtmTags: (type, tag) => dispatch(setCommonUtmTags(type, tag)),
        OTTExchangeLogin: (ott) => dispatch(OTTExchangeLogin(ott))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
