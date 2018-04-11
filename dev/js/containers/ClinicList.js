import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import ClinicListView from '../components/clinicList/index.js'

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


export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);
