import React from 'react';
import { connect } from 'react-redux';

import { getLabBookingSummary, updateLabAppointment, selectLabTimeSLot } from '../../actions/index.js'

import BookingView from '../../components/diagnosis/booking/BookingView.js'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <BookingView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.LAB_SEARCH

    return {
        rescheduleSlot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabBookingSummary: (appointmentID, callback) => dispatch(getLabBookingSummary(appointmentID, callback)),
        updateLabAppointment: (appointmentData, callback) => dispatch(updateLabAppointment(appointmentData, callback)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
