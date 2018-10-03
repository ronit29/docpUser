import React from 'react';
import { connect } from 'react-redux';

import { getLabById, toggleDiagnosisCriteria, getLabTests } from '../../actions/index.js'

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
        lab_test_data,
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS

    let LABS = state.LABS

    return {
        lab_test_data,
        selectedCriterias,
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        getLabTests: (labid, search_string,defaultTest, callback) => dispatch(getLabTests(labid, search_string, defaultTest, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestSelector);
