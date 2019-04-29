import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchNotifications, getUserProfile, toggleLeftMenuBar, getIsCareDetails, selectSearchType } from '../../../actions/index.js'
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
            this.props.getIsCareDetails()
        }
    }

    render() {

        return (
            <DesktopProfileHeaderView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let { profiles, selectedProfile, defaultProfile, notifications, newNotification, currentRoomId, cart, unread_count, toggleLeftMenu, isUserCared, leftMenuOpenFirstTime } = state.USER

    let {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    return {
        profiles, selectedProfile, defaultProfile, notifications, newNotification, selectedLocation, currentRoomId, cart, unread_count, toggleLeftMenu, isUserCared, leftMenuOpenFirstTime
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (chatRoomId) => dispatch(logout(chatRoomId)),
        fetchNotifications: (cb) => dispatch(fetchNotifications(cb)),
        getUserProfile: () => dispatch(getUserProfile()),
        getIsCareDetails: () => dispatch(getIsCareDetails()),
        toggleLeftMenuBar: (toggle, defaultVal) => dispatch(toggleLeftMenuBar(toggle, defaultVal)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DesktopProfileHeader))
