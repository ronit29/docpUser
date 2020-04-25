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
import { set_summary_utm, getUnratedAppointment, updateAppointmentRating, createAppointmentRating, closeAppointmentPopUp, closeAppointmentRating, getRatingCompliments, setFetchResults, setUTMTags, selectLocation, getGeoIpLocation, saveDeviceInfo, mergeOPDState, mergeLABState, mergeUrlState, getCartItems, loadLabCommonCriterias, toggleLeftMenuBar, clearLabSearchId, clearOpdSearchId, clearIpdSearchId, setCommonUtmTags, OTTExchangeLogin, setRefreshTokenTime, saveNewRefreshedToken, getReferAmnt } from './actions/index.js'
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
require('../css/CommonHeader.css');
require('../css/home-new-view.css');
require('../css/gold-view.css');
require('../css/style.css')

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

        this.state={
            toCallRefreshToken:false
        }
    }

    componentDidMount() {
        //Cache Assets
        STORAGE.unregisterServiceWorker();
        const parsed = queryString.parse(window.location.search)
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

        //Add UTM tags for building url
        try{
            if(parsed.utm_source){
                let sessionId = Math.floor(Math.random() * 103)*21 + 1050
                if(sessionStorage) {
                    sessionStorage.setItem('sessionIdVal',sessionId)   
                }
                let common_xtra_tags = {
                    utm_tags: {
                        utm_source: parsed.utm_source||'',
                        utm_term: parsed.utm_term||'',
                        utm_medium: parsed.utm_medium||'',
                        utm_campaign: parsed.utm_campaign||''
                    },
                    time: new Date().getTime(),
                    currentSessionId: sessionId
                }
                this.props.setCommonUtmTags('common_xtra_tags', common_xtra_tags)
            }
        }catch(e) {

        }

        //Clear Utm tags for SPO, after 15 minutes
        let currentTime = new Date().getTime()
        if(sessionStorage && sessionStorage.getItem('sessionIdVal') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x=>x.type=='common_xtra_tags').length) {
            let common_xtra_tags = this.props.common_utm_tags.filter(x=>x.type=='common_xtra_tags')[0]
            let sessionVal = parseInt(sessionStorage.getItem('sessionIdVal'))
            if(spo_tags.time && sessionVal == parseInt(common_xtra_tags.currentSessionId)){
                let time_offset = (currentTime - common_xtra_tags.time)/60000
                this.props.unSetCommonUtmTags('common_xtra_tags')
            }
        }

        this.props.getReferAmnt()

    }

    componentWillReceiveProps(props){
        //this.tokenRefresh(props)
    }

    toggleLeftMenu(toggle, defaultVal) {
        if (document.getElementById('is_header') && document.getElementById('is_header').offsetHeight) {
            this.props.toggleLeftMenuBar(toggle, defaultVal)
        }
    }

    tokenRefresh(props){
        //Toekn Refresh to keep updating user token at regular intervals
        if (STORAGE.checkAuth() && !this.state.toCallRefreshToken && props.profiles && Object.keys(props.profiles).length > 0) {
            props.getCartItems()
            this.setState({toCallRefreshToken: true})
            this.refreshApi();
            let intervalId = setInterval(() => {
                if(STORAGE.checkAuth()){
                    this.refreshApi()
                }else{
                    clearInterval(intervalId)
                    this.setState({toCallRefreshToken: false})
                }
            }, 300000)
        }
    }

    refreshApi(){
        STORAGE.getAuthToken().then((token) => {
            if (token) {
                STORAGE.refreshTokenCall({ token:token, fromWhere:'FromAPP', isForceUpdate: true }).then((newToken)=>{
                    this.props.saveNewRefreshedToken(newToken);
                })
            }
        })
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
        OTTExchangeLogin: (ott) => dispatch(OTTExchangeLogin(ott)),
        setRefreshTokenTime:(data) =>dispatch(setRefreshTokenTime(data)),
        saveNewRefreshedToken: (token) => dispatch(saveNewRefreshedToken(token)),
        getReferAmnt:() => dispatch(getReferAmnt())
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
