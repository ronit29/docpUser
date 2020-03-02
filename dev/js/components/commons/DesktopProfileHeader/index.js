import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchNotifications, getUserProfile, toggleLeftMenuBar, getIsCareDetails, selectSearchType, loadOPDInsurance, iFrameState, clearVipSelectedPlan } from '../../../actions/index.js'
import STORAGE from '../../../helpers/storage'
import { withRouter } from 'react-router'

import DesktopProfileHeaderView from './CommonHeader.js'

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
            //this.props.getIsCareDetails() // get user subscription plan details
        }
        // this.props.loadOPDInsurance(this.props.selectedLocation)
    }

    render() {

        return (
            <DesktopProfileHeaderView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let { profiles, selectedProfile, defaultProfile, notifications, newNotification, currentRoomId, cart, unread_count, toggleLeftMenu, isUserCared, leftMenuOpenFirstTime, ipd_chat, iFrameUrls, refer_amount } = state.USER

    let {
        selectedLocation,
        common_settings
    } = state.SEARCH_CRITERIA_OPD

    return {
        profiles, selectedProfile, defaultProfile, notifications, newNotification, selectedLocation, currentRoomId, cart, unread_count, toggleLeftMenu, isUserCared, leftMenuOpenFirstTime, ipd_chat,common_settings, iFrameUrls, refer_amount
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
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city)),
        iFrameState: (url, emptyUrls, leftMenuClick) => dispatch(iFrameState(url, emptyUrls, leftMenuClick)),
        clearVipSelectedPlan:() => dispatch(clearVipSelectedPlan())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DesktopProfileHeader))
