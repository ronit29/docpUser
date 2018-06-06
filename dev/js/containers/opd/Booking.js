import React from 'react';
import { connect } from 'react-redux';

import { getOPDBookingSummary, updateOPDAppointment, selectOpdTimeSLot, retryPaymentOPD } from '../../actions/index.js'

import BookingView from '../../components/opd/booking/BookingView.js'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <BookingView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.DOCTOR_SEARCH

    return {
        rescheduleSlot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOPDBookingSummary: (appointmentID, callback) => dispatch(getOPDBookingSummary(appointmentID, callback)),
        updateOPDAppointment: (appointmentData, callback) => dispatch(updateOPDAppointment(appointmentData, callback)),
        selectOpdTimeSLot: (slot, reschedule) => dispatch(selectOpdTimeSLot(slot, reschedule)),
        retryPaymentOPD: (appointmentId, callback) => dispatch(retryPaymentOPD(appointmentId, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
