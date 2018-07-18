import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, selectOpdTimeSLot } from '../../actions/index.js'

import DoctorProfileView from '../../components/opd/doctorProfile/index.js'

class DoctorProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return store.dispatch(getDoctorById(match.params.id))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        this.props.getDoctorById(this.props.match.params.id)

        //always clear selected time at doctor profile
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)
    }

    render() {

        return (
            <DoctorProfileView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTORS

    return {
        DOCTORS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById: (doctorId) => dispatch(getDoctorById(doctorId)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
