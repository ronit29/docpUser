import CONFIG from '../config'
import STORAGE from './storage/storage'

const GTM = {
    sendEvent: ({ data }) => {
        try {
            /**
             * dataLayer is expected to be a global variable set by gtm - not to be used on server-side
             */
            if (dataLayer) {
                data.UAID=CONFIG.UAID
                data.Tracker=CONFIG.Tracker
                dataLayer.push(data)
            }
        } catch (e) {
            //
        }
    },

    getUserId:() => {
        let user_id = STORAGE.getUserId() || ''
        return user_id

    }
}

export default GTM