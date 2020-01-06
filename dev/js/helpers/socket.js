import { API_GET } from '../api/api'
import CONFIG from '../config'
// import io from 'socket.io-client';
import STORAGE from '../helpers/storage'

const SOCKET = (() => {

    let _initialized = false
    let _instance = null

    const init = (cb) => {

        if (!_initialized || !_instance) {
            if (typeof io == "undefined") {
                return
            }
            console.log(' ======== INITIALIZING SOCKET FOR IN-APP NOTIFICATIONS ==========')

            //Fetch userid with auth token to create a seperate room
            STORAGE.getAuthToken().then((token) => {
                if (token) {
                    console.log('CONNECTIONNNNNNNNN', token);
                    const socket = io(CONFIG.SOCKET_BASE_URL, {
                        path: CONFIG.SOCKET_BASE_PATH
                        // query: {
                        //     token: token
                        // }
                    });
                    socket.on('reqData', (socketData)=>{
                        console.log('REINITIALIZE TOKEN', token);
                        socket.emit('getData', {token: token})
                    })
                    // socket.on('disconnect', ()=>{
                    //     console.log(_instance);
                    //     console.log('CLEAR DISCONNECT TOKEN')
                    //     _instance = null
                    //     init(() => {
                    //             console.log('REconect reconnect');
                    //             console.log(_instance);
                    //         if (_instance) {
                    //             _instance.on('notification', (data) => {
                    //                 console.log('AFDADSFADSFFJDAFJASDJFJ FJASDFJSDAFJASDJFJSADJFJASDF JFJASDJFAJSDFJAS');
                    //             })
                    //         }
                    //     })
                    // })
                    //socket.emit('getData', {token: token})
                    _initialized = true
                    _instance = socket
                    cb()
                } else {
                    _initialized = false
                    _instance = null
                }
            }).catch((e) => {
                _initialized = false
                _instance = null
            })

        }
    }

    const getInstance = () => {
        return _instance
    }

    const refreshSocketConnection =()=>{
        if(_instance) {
            _instance.disconnect();
             _instance = null;
        }
        // init(() => {
                
        //     if (_instance) {
        //         _instance.on('notification', (data) => {
        //             fetchNotifications();
        //         })
        //     }
        // })
    }

    return { init, getInstance: getInstance.bind(this), refreshSocketConnection: refreshSocketConnection.bind(this) }

})()

export default SOCKET