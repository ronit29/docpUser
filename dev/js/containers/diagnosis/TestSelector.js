import React from 'react';
import { connect } from 'react-redux';

import { getLabById, toggleDiagnosisCriteria } from '../../actions/index.js'

import TestSelectorView from '../../components/diagnosis/testSelector'

class TestSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <TestSelectorView {...this.props} />
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
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getLabById: (labId) => dispatch(getLabById(labId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestSelector);
