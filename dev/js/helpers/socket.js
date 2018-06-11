import { API_GET } from '../api/api'

const SOCKET = (() => {

    let _initialized = false
    let _instance = null

    const init = (cb) => {
        if (!_initialized || !_instance) {
            console.log(' ======== INITIALIZING SOCKET FOR IN-APP NOTIFICATIONS ==========')

            //Fetch userid with auth token to create a seperate room
            API_GET("/api/v1/user/userid").then((data) => {
                const socket = io("https://qa.panaceatechno.com", {
                    path: '/io',
                    query: {
                        userId: data.user_id
                    }
                });

                _initialized = true
                _instance = socket
                cb()
            }, (err) => {
                _initialized = false
                _instance = null
            })
        }
    }

    const getInstance = () => {
        return _instance
    }

    return { init, getInstance: getInstance.bind(this) }

})()

export default SOCKET