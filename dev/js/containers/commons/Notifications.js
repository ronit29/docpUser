import React from 'react';
import { connect } from 'react-redux';

import { fetchNotifications } from '../../actions/index.js'

import NotificationsView from '../../components/commons/Notifications/index.js'


class Notifications extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchNotifications()
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        return (
            <NotificationsView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const { notifications, newNotification } = state.USER

    return {
        notifications, newNotification
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotifications: () => dispatch(fetchNotifications())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);