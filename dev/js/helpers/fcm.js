import { API_POST } from '../api/api'
import CONFIG from '../config'

var messaging = null

const FCM = (() => {

    let _initialized = false

    const init = () => {
        try {

            if (window.firebase && messaging == null) {
                firebase.initializeApp(CONFIG.FCM_CONFIG)
                if (firebase && firebase.messaging) {
                    messaging = firebase.messaging()
                    messaging.usePublicVapidKey(CONFIG.FCM_PUBLIC_VAPID_KEYL);
                }
            }

            if (!_initialized && messaging) {
                console.log(' ======== INITIALIZING FCM FOR PUSH NOTIFICATIONS ==========')
                messaging.requestPermission().then(function () {
                    messaging.getToken().then(function (currentToken) {
                        console.log("FCM TOKEN - ", currentToken)

                        if (!_initialized) {
                            API_POST('/api/v1/user/notification/endpoint/save', {
                                token: currentToken,
                                platform: 'web',
                                app_name: "doc_prime"
                            })
                        }

                        // set init to true , to stop fetching token again
                        _initialized = true

                    }).catch(function (err) {
                        console.log(err)
                        _initialized = false
                    });
                }).catch(function (err) {
                    _initialized = false
                })

                messaging.onTokenRefresh(function () {
                    messaging.getToken().then(function (refreshedToken) {
                        console.log("FCM TOKEN refreshed- ", refreshedToken)

                        API_POST('/api/v1/user/notification/endpoint/save', {
                            token: refreshedToken,
                            platform: 'web',
                            app_name: "doc_prime"
                        })

                        // set init to true , to stop fetching token again
                        _initialized = true
                    }).catch(function (err) {
                        _initialized = false
                    });
                });
            }

        } catch (e) {
            console.log(e)
        }
    }

    const checkInit = () => {
        return _initialized
    }

    return { init, checkInit: checkInit.bind(this) }

})()

export default FCM