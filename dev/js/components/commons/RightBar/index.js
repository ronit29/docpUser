import React from 'react';
import { connect } from 'react-redux';
import { getUpcomingAppointments, fetchHeatlhTip, fetchOrderHistory } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import STORAGE from '../../../helpers/storage'

import RightBarView from './RightBar'

class RightBar extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        this.props.fetchHeatlhTip()
        if (STORAGE.checkAuth()) {
            this.props.getUpcomingAppointments()
            this.props.fetchOrderHistory()
        }
    }

    render() {

        return (
            <RightBarView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile, userUpcomingAppointments, healthTips } = state.USER
    return {
        profiles, selectedProfile, userUpcomingAppointments, healthTips
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUpcomingAppointments: () => dispatch(getUpcomingAppointments()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchOrderHistory: () => dispatch(fetchOrderHistory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightBar))
