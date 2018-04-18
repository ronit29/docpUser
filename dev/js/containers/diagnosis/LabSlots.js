import React from 'react';
import { connect } from 'react-redux';

import { getLabById, getLabTimeSlots } from '../../actions/index.js'

import LabSlotsView from '../../components/diagnosis/labSlots/index.js'

class LabSlots extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <LabSlotsView {...this.props} />
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
        getLabById : (labId, testIds) => dispatch(getLabById(labId, testIds)),
        getLabTimeSlots : (labId, testIds, callback) => dispatch(getLabTimeSlots(labId, testIds, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LabSlots);
