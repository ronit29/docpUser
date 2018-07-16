import React from 'react';
import { connect } from 'react-redux';
import { getUpcomingAppointments, fetchHeatlhTip, fetchOrderHistory, toggleDiagnosisCriteria, selectProfile } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import STORAGE from '../../../helpers/storage'

import RightBarView from './RightBar'

class RightBar extends React.Component {
    constructor(props) {
        super(props)
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
    let { profiles, selectedProfile, userUpcomingAppointments, healthTips, orderHistory } = state.USER
    return {
        profiles, selectedProfile, userUpcomingAppointments, healthTips, orderHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUpcomingAppointments: () => dispatch(getUpcomingAppointments()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchOrderHistory: () => dispatch(fetchOrderHistory()),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightBar))
