import React from 'react';
import { connect } from 'react-redux';

import { getLabById, getLabTimeSlots } from '../../actions/index.js'

import LabView from '../../components/diagnosis/lab/index.js'

class Lab extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <LabView {...this.props} />
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
        getLabById : (labId) => dispatch(getLabById(labId)),
        getLabTimeSlots : (labId, testIds, callback) => dispatch(getLabTimeSlots(labId, testIds, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lab);
