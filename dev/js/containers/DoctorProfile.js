import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import DoctorProfileView from '../components/doctorProfile/index.js'

class DoctorProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <DoctorProfileView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    
    let { selectedDoctor } = state.DOCTOR_SEARCH
    let DOCTORS = state.DOCTORS

    return {
        DOCTORS, selectedDoctor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
