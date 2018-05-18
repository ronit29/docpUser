import React from 'react';
import { connect } from 'react-redux';

import { getLabById } from '../../actions/index.js'

import LabView from '../../components/diagnosis/lab/index.js'

class Lab extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <LabView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS

    let LABS = state.LABS

    return {
        selectedCriterias,
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId) => dispatch(getLabById(labId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lab);
