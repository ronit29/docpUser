import React from 'react';
import { connect } from 'react-redux';
const queryString = require('query-string');

import { OTTLogin, fetchOrderById, getUpcomingAppointments, fetchHeatlhTip, fetchOrderHistory, toggleDiagnosisCriteria, selectProfile, selectLabTimeSLot, selectOpdTimeSLot, clearAllTests } from '../../actions/index.js'
import Loader from '../../components/commons/Loader'

class DirectBooking extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        let OTT = parsed.token
        let order_id = parsed.order_id

        if (OTT && order_id) {
            this.props.OTTLogin(OTT).then(() => {
                return this.props.fetchOrderById()
            }).then((order_data) => {
                debugger
            }).catch(() => {
                debugger
            })
        } else {
            this.props.history.push('/')
        }

    }

    render() {

        return (
            <Loader />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile } = state.USER
    return {
        profiles, selectedProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OTTLogin: (ott) => dispatch(OTTLogin(ott)),
        fetchOrderById: (order_id) => dispatch(fetchOrderById(order_id)),
        clearAllTests: () => dispatch(clearAllTests()),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectBooking);
