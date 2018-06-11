import { API_POST } from '../api/api'

let config = {
    apiKey: "AIzaSyBJ1VRIJd33At0MVcs8jr7guREZ8ARi2-I",
    authDomain: "panacea-ondoc.firebaseapp.com",
    databaseURL: "https://panacea-ondoc.firebaseio.com",
    projectId: "panacea-ondoc",
    storageBucket: "panacea-ondoc.appspot.com",
    messagingSenderId: "553214005281"
}

firebase.initializeApp(config)
const messaging = firebase.messaging()
messaging.usePublicVapidKey("BLx7NZrgK8dSjbUjycqyv0_KQfgnHj5_e108RsX9aD45q_3EOPtYbV32u7S5WbBW2eDodGmzaX5QlNWLQStt7bE");

const FCM = (() => {

    let _initialized = false

    const init = () => {
        if (!_initialized) {
            console.log(' ======== INITIALIZING FCM FOR PUSH NOTIFICATIONS ==========')
            messaging.requestPermission().then(function () {
                messaging.getToken().then(function (currentToken) {
                    console.log("FCM TOKEN - ", currentToken)
                    API_POST('/api/v1/user/notification/endpoint/save', {
                        token: currentToken
                    })

                    // set init to true , to stop fetching token again
                    _initialized = true

                }).catch(function (err) {
                    _initialized = false
                });
            }).catch(function (err) {
                _initialized = false
            })

            messaging.onTokenRefresh(function () {
                messaging.getToken().then(function (refreshedToken) {
                    console.log("FCM TOKEN refreshed- ", refreshedToken)

                    API_POST('/api/v1/user/notification/endpoint/save', {
                        token: refreshedToken
                    })
                    
                    // set init to true , to stop fetching token again
                    _initialized = true
                }).catch(function (err) {
                    _initialized = false
                });
            });
        }
    }

    return { init }

})()

export default FCM