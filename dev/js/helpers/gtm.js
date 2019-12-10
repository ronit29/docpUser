import CONFIG from '../config'
import STORAGE from './storage/storage'
import { setGTMSession } from '../actions/commons/auth.js'
const queryString = require('query-string');

function getVisitorId() {
    let uid_string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    let visitor_id = createUUID(uid_string);
    return visitor_id;

}

function createUUID(uid_string) {
    var dt = new Date().getTime();
    var uuid = uid_string.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function getVisitId() {
    let uid_string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxyyyxxxxxx'
    let visit_id = createUUID(uid_string);
    return visit_id;
}

const GTM = {

    send_boot_events: (isUtmTags=false) => {

        let def_data = {
            utm_tags: {
                utm_source: '',
                utm_medium: '',
                utm_term: '',
                utm_campaign: '',
                source: "",
                referrer: ''
            }, device: 'desktop'
        }

        if (typeof window == "undefined" || typeof navigator == "undefined") {
            return def_data
        }

        if (window.SENT_BOOT_UP_DATA  && !isUtmTags) {
            return def_data
        }

        let parsed = null
        try {
            parsed = queryString.parse(window.location.search)
        } catch (e) {

        }

        let utm_tags = def_data.utm_tags

        if (parsed) {
            let source = ''
            if (parsed.utm_source) {
                source = parsed.utm_source
            } else if (document.referrer) {
                source = document.referrer
            }

            utm_tags = {
                utm_source: parsed.utm_source || '',
                utm_medium: parsed.utm_medium || '',
                utm_term: parsed.utm_term || '',
                utm_campaign: parsed.utm_campaign || '',
                source: source,
                referrer: document.referrer || ''
            }
        }



        let data1 = {
            'Category': 'ConsumerApp', 'Action': 'UTMevents', 'event': 'utm-events', 'utm_source': utm_tags.utm_source || '', 'utm_medium': utm_tags.utm_medium || '', 'utm_term': utm_tags.utm_term || '', 'utm_campaign': utm_tags.utm_campaign || '', 'addToGA': false, 'source': utm_tags.source, 'referrer': document.referrer || ''
        }

        GTM.sendEvent({ data: data1 })


        let isMobile = false
        let device = 'desktop'
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

        let data2 = {
            'Category': 'ConsumerApp', 'Action': 'VisitorInfo', 'event': 'visitor-info', 'Device': device, 'Mobile': isMobile, 'platform': navigator.platform || '', 'addToGA': false
        }

        GTM.sendEvent({ data: data2 })

        window.SENT_BOOT_UP_DATA = true

        return { utm_tags, device }

    },

    sendEvent: ({ data }, send_to_GA = true, send_to_backend = true) => {
        try {
            /**
             * dataLayer is expected to be a global variable set by gtm - not to be used on server-side
             */

            if (dataLayer && send_to_GA) {
                data.UAID = CONFIG.UAID
                data.Tracker = CONFIG.Tracker
                let gtmData = JSON.parse(JSON.stringify(data))
                if (data.addToGA == undefined) {
                    dataLayer.push(gtmData)
                }

            }

            if (navigator) {
                data.userAgent = navigator.userAgent
            }

            data.visitor_info = GTM.getVisitorInfo()
            data.triggered_at = Math.floor((new Date()).getTime())
            if (send_to_backend && CONFIG.env=="production") {
                setGTMSession(data);
            }

        } catch (e) {
            //
        }
    },

    getVisitorInfo: () => {
        let visitor_info = ""

        if (typeof window == "object") {
            if (window.VISITOR_INFO && typeof window.VISITOR_INFO == 'string') {
                visitor_info = window.VISITOR_INFO
            }
        }

        if (!visitor_info) {
            visitor_info = STORAGE.getVisitorInfo()
        }

        if (visitor_info && visitor_info.length) {
            try{
                visitor_info = JSON.parse(visitor_info)
            }catch(e){

            }
        }

        if (visitor_info && visitor_info.visit_id && visitor_info.visitor_id) {
            let last_visit_difference = new Date().getTime() - visitor_info.last_visit_time;

            if (last_visit_difference > 3600000) {
                visitor_info.visit_id = getVisitId()
            }
            visitor_info.last_visit_time = new Date().getTime()

        } else {
            let visitor_id = getVisitorId();
            let visit_id = getVisitId();
            visitor_info = {
                visit_id: visit_id,
                visitor_id: visitor_id,
                last_visit_time: new Date().getTime()
            }
        }

        let updated_cookie_val = JSON.stringify(visitor_info)

        if (typeof window == "object") {
            window.VISITOR_INFO = updated_cookie_val
        }
        STORAGE.setVisitorInfo(updated_cookie_val)

        return visitor_info
    },

    getUserId: () => {
        let user_id = STORAGE.getUserId() || ''
        return user_id

    }
}

export default GTM
