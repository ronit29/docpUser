import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById } from '../actions/index.js'

import PatientDetailsView from '../components/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <PatientDetailsView {...this.props} />
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
        getDoctorById : (doctorId) => dispatch(getDoctorById(doctorId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
