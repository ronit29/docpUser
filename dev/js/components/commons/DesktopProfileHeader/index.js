import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchNotifications, getUserProfile } from '../../../actions/index.js'
import STORAGE from '../../../helpers/storage'
import { withRouter } from 'react-router'

import DesktopProfileHeaderView from './DesktopProfileHeader'

class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.fetchNotifications()
            /* Fectch user profile if logged in and user profile is not loaded i.e(public pages) */
            if (!this.props.profiles[this.props.selectedProfile]) {
                this.props.getUserProfile()
            }
        }
    }

    render() {

        return (
            <DesktopProfileHeaderView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile, defaultProfile, notifications, newNotification } = state.USER
    return {
        profiles, selectedProfile, defaultProfile, notifications, newNotification
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        fetchNotifications: (cb) => dispatch(fetchNotifications(cb)),
        getUserProfile: () => dispatch(getUserProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DesktopProfileHeader))
