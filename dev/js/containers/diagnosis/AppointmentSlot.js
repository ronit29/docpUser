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
    let { selectedSlot } = state.LAB_SEARCH

    return {
        LABS, selectedSlot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId) => dispatch(getLabById(labId)),
        getLabTimeSlots: (labId, pickup, callback) => dispatch(getLabTimeSlots(labId, pickup, callback)),
        selectLabTimeSLot: (slot) => dispatch(selectLabTimeSLot(slot))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
