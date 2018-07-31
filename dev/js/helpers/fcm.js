import { API_POST } from '../api/api'
import CONFIG from '../config'

let config = CONFIG.FCM_CONFIG

var messaging = null

if (window.firebase) {
    firebase.initializeApp(config)
    messaging = firebase.messaging()
    messaging.usePublicVapidKey(CONFIG.FCM_PUBLIC_VAPID_KEYL);
}

const FCM = (() => {

    let _initialized = false

    const init = () => {
        if (!_initialized && messaging) {
            console.log(' ======== INITIALIZING FCM FOR PUSH NOTIFICATIONS ==========')
            messaging.requestPermission().then(function () {
                messaging.getToken().then(function (currentToken) {
                    console.log("FCM TOKEN - ", currentToken)

                    if (!_initialized) {
                        API_POST('/api/v1/user/notification/endpoint/save', {
                            token: currentToken,
                            platform: 'web'
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
                        platform: 'web'
                    })

                    // set init to true , to stop fetching token again
                    _initialized = true
                }).catch(function (err) {
                    _initialized = false
                });
            });
        }
    }

    const checkInit = () => {
        return _initialized
    }

    return { init, checkInit: checkInit.bind(this) }

})()

export default FCM