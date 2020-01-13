import React from 'react';
import { connect } from 'react-redux';

import { fetchNotifications } from '../../actions/index.js'

import SOCKET from '../../helpers/socket'
import FCM from '../../helpers/fcm'
import STORAGE from '../../helpers/storage'

class Notifications extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.boot(this.props)
    }

    componentWillReceiveProps(props) {
        this.boot(props)
    }

    boot(props) {
        if (STORAGE.checkAuth()) {

            if (typeof io == "undefined" || typeof firebase == "undefined") {
                var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                var msie = navigator.userAgent.indexOf("MSIE ");
                if (isSafari || msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                    console.log("PUSH NOTIFICATIONS NOT SUPPORTED ON SAFARI")
                }
                else {
                    // DOM: Create the script element
                    var jsElm1 = document.createElement("script");
                    // set the type attribute
                    jsElm1.type = "application/javascript";
                    // make the script element load file
                    jsElm1.src = 'https://www.gstatic.com/firebasejs/5.0.1/firebase-app.js';
                    jsElm1.async = false;
                    // finally insert the element to the body element in order to load the script
                    document.body.appendChild(jsElm1);

                    // DOM: Create the script element
                    var jsElm = document.createElement("script");
                    // set the type attribute
                    jsElm.type = "application/javascript";
                    // make the script element load file
                    jsElm.src = 'https://www.gstatic.com/firebasejs/5.0.1/firebase-messaging.js';
                    jsElm.async = false;
                    // finally insert the element to the body element in order to load the script
                    document.body.appendChild(jsElm);
                }

                // DOM: Create the script element
                var jsElm3 = document.createElement("script");
                // set the type attribute
                jsElm3.type = "application/javascript";
                // make the script element load file
                jsElm3.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.slim.js';
                jsElm3.async = false;
                // finally insert the element to the body element in order to load the script
                document.body.appendChild(jsElm3);

            }
            //Check for Socket connection and initiate if required
            this.initSocket(props)
            //Check for FCM connection and initiate if required
            this.initFCM(props)
        }
    }

    initSocket(props) {
        if (STORAGE.checkAuth() && !SOCKET.getInstance() && !STORAGE.isAgent()) {
            SOCKET.init(() => {
                let _socket = SOCKET.getInstance()
                if (_socket) {
                    _socket.on('notification', (data) => {
                        this.props.fetchNotifications()
                    })
                }
            })
        }
    }

    initFCM(props) {
        if (STORAGE.checkAuth() && !FCM.checkInit() && !STORAGE.isAgent()) {
            FCM.init()
        }
    }

    render() {

        return (
            ""
        );
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    const AUTH = state.AUTH

    return {
        USER, AUTH
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotifications: (cb) => dispatch(fetchNotifications(cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
