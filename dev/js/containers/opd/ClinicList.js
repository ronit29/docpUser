import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById } from '../../actions/index.js'

import ClinicListView from '../../components/opd/clinicList/index.js'

class ClinicList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <ClinicListView {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);
