import CONFIG from '../config'

const GTM = {
    sendEvent: ({ data }) => {
        try {
            /**
             * dataLayer is expected to be a global variable set by gtm - not to be used on server-side
             */
            if (dataLayer) {
                data.UAID=CONFIG.UAID
                data.Tracker=CONFIG.Tracker
                console.log(data)
            }
        } catch (e) {
            //
        }
    }
}

export default GTM