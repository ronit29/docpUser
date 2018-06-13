import React from 'react';
import { connect } from 'react-redux';

import { appendNotifications } from '../../actions/index.js'

import SOCKET from '../../helpers/socket'
import FCM from '../../helpers/fcm'
import STORAGE from '../../helpers/storage'

class Notifications extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.initSocket(this.props)
        this.initFCM(this.props)
    }

    componentWillReceiveProps(props) {
        this.initSocket(props)
        this.initFCM(props)
    }

    initSocket(props) {
        if (STORAGE.checkAuth() && !SOCKET.getInstance()) {
            SOCKET.init(() => {
                let _socket = SOCKET.getInstance()
                if (_socket) {
                    _socket.on('notification', (data) => {
                        this.props.appendNotifications([data], false)
                    })
                }
            })
        }
    }

    initFCM(props) {
        if (STORAGE.checkAuth() && !FCM.checkInit()) {
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
        appendNotifications: (notifications, replace, cb) => dispatch(appendNotifications(notifications, replace, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
