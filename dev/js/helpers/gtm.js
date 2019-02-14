import CONFIG from '../config'
import STORAGE from './storage/storage'
import { setGTMSession } from '../actions/commons/auth.js'


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
            data.triggered_at = Math.floor((new Date()).getTime() / 1000)
            if (send_to_backend) {
                setGTMSession(data);
            }

        } catch (e) {
            //
        }
    },

    getVisitorInfo: () => {
        let visitor_info = STORAGE.getVisitorInfo()

        if (visitor_info) {
            visitor_info = JSON.parse(visitor_info)
            let last_visit_difference = new Date().getTime() - visitor_info.last_visit_time;

            if (last_visit_difference > 1800000) {
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
        STORAGE.setVisitorInfo(updated_cookie_val)

        return visitor_info
    },

    getUserId: () => {
        let user_id = STORAGE.getUserId() || ''
        return user_id

    }
}

export default GTM