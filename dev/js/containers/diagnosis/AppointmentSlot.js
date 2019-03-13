import React from 'react';
import { connect } from 'react-redux';

import { getLabById, getLabTimeSlots, selectLabTimeSLot } from '../../actions/index.js'

import AppointmentSlotView from '../../components/diagnosis/appointmentSlot'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return store.dispatch(getLabById(match.params.id))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.props.getLabById(this.props.match.params.id)
    }

    render() {

        return (
            <AppointmentSlotView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let LABS = state.LABS
    let { pincode } = state.SEARCH_CRITERIA_LABS
    let { selectedSlot } = state.LAB_SEARCH

    return {
        LABS, selectedSlot, pincode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId) => dispatch(getLabById(labId)),
        getLabTimeSlots: (labId, pickup, pincode, date, callback) => dispatch(getLabTimeSlots(labId, pickup, pincode, date, callback)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
