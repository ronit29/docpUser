import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchNotifications } from '../../../actions/index.js'

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
        this.props.fetchNotifications()
    }

    render() {

        return (
            <DesktopProfileHeaderView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile, newNotification, notifications } = state.USER
    return {
        profiles, selectedProfile, newNotification, notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        fetchNotifications: (cb) => dispatch(fetchNotifications(cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DesktopProfileHeader))
