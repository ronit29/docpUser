import React from 'react';
import { connect } from 'react-redux';
import { getUpcomingAppointments, fetchHeatlhTip, fetchOrderHistory, toggleDiagnosisCriteria, selectProfile, selectLabTimeSLot, selectOpdTimeSLot, clearAllTests } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import STORAGE from '../../../helpers/storage'

import RightBarView from './RightBar'
import ChatPanel from '../ChatPanel'

class RightBar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.fetchHeatlhTip()
        // if (STORAGE.checkAuth()) {
        //     this.props.getUpcomingAppointments()
        //     this.props.fetchOrderHistory()
        // }
    }

    render() {
        return (
            <ChatPanel {...this.props} />
            // <RightBarView {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps = {}) => {
    let { profiles, selectedProfile, userUpcomingAppointments, healthTips, orderHistory } = state.USER
    return {
        profiles, selectedProfile, userUpcomingAppointments, healthTips, orderHistory, passedProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearAllTests: () => dispatch(clearAllTests()),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        getUpcomingAppointments: () => dispatch(getUpcomingAppointments()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchOrderHistory: () => dispatch(fetchOrderHistory()),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightBar))
export default RightBar
