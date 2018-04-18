import React from 'react';
import { connect } from 'react-redux';

import { getLabById } from '../../actions/index.js'

import PatientDetailsView from '../../components/diagnosis/patientDetails/index.js'

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

    let LABS = state.LABS

    return {
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById : (labId, testIds) => dispatch(getLabById(labId, testIds))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
