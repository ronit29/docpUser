const GTM = {
    sendEvent: ({ event, data }) => {
        try {
            /**
             * dataLayer is expected to be a global variable set by gtm - not to be used on server-side
             */
            if (dataLayer) {
                console.log(event, data)
            }
        } catch (e) {
            //
        }
    }
}

export default GTM