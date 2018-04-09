import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import PatientDetailsView from '../components/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <PatientDetailsView />
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
