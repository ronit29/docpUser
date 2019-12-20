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

var CryptoJS = require("crypto-js");
const logPageView = () => {

    GTM.send_boot_events()
    
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
    }

    componentDidMount() {
        let user_profile_id = null
        var ciphertext = null
        const parsed = queryString.parse(window.location.search)
        if (STORAGE.checkAuth()) {
            this.props.getCartItems()
            if(this.props.profiles && Object.keys(this.props.profiles).length > 0){
                user_profile_id = this.props.profiles[this.props.defaultProfile].id
                ciphertext =  this.encrypt(user_profile_id)
            }
            debugger
            let intervalId = setInterval(() => {
                STORAGE.getAuthToken().then((token) => {
                    if (token) {
                        API_POST('/api/v1/user/api-token-refresh', {
                            token: token,
                            reset : ciphertext
                        }).then((data) => {
                            // STORAGE.setAuthToken(data.token)
                        })
                    }
                })
            }, 5000)
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

        let { utm_tags, device } = GTM.send_boot_events(true)

        if (utm_tags.utm_source && utm_tags.utm_source.includes('religare')) {
            let tags = {
                utm_source: utm_tags.utm_source,
                visitorId: parsed.visitid || ''
            }
            this.props.setCommonUtmTags('chat', tags)
        }

        //save UTM Tags for SBI
        if(parsed.utm_source && parsed.utm_source=='sbi_utm'){
            let sessionId = Math.floor(Math.random() * 103)*21 + 1050
            if(sessionStorage) {
               // sessionStorage.setItem('sbiSessionIdVal',sessionId)   
            }
            STORAGE.setAnyCookie('sbi_utm', true, 30);
            let tags = {
                utm_tags: {
                    utm_source: parsed.utm_source||'',
                    utm_term: parsed.utm_term||'',
                    utm_medium: parsed.utm_medium||'',
                    utm_campaign: parsed.utm_campaign||''
                },
                time: new Date().getTime(),
                currentSessionId: sessionId
            }
            this.props.setCommonUtmTags('sbi_utm', tags)
        }

        // set summary page utm_source
        if (utm_tags.utm_source == 'alpha_december_18') {
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

    encrypt(user_profile_id) {
    let encryptedData = `${user_profile_id}.${new Date().getTime()}`;
      let msgString = encryptedData.toString();
      var key = 'hpDqwzdpoQY8ymm5';
      var iv = CryptoJS.lib.WordArray.random(16);
      var encrypted = CryptoJS.AES.encrypt(msgString, key, {
        iv: iv
      });
      return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
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
        profiles, selectedProfile, summary_utm, summary_utm_validity, defaultProfile
    } = state.USER

    let {
        token
    } = state.AUTH

    const {
        common_tests,
        common_package
    } = state.SEARCH_CRITERIA_LABS

    return {
        selectedLocation, profiles, selectedProfile, token, summary_utm, summary_utm_validity, common_tests, common_package, defaultProfile
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
