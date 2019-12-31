import React from 'react';
import { connect } from 'react-redux';

import { getLabById, toggleDiagnosisCriteria, getLabTests } from '../../actions/index.js'
const queryString = require('query-string');

import TestSelectorView from '../../components/diagnosis/testSelector'

class TestSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
        let lab_id = this.props.selectedLab || this.props.match.params.id || parsed.lab_id

        return (
            <TestSelectorView {...this.props} selectedLab={lab_id} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        lab_test_data,
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        currentLabSelectedTests
    } = state.SEARCH_CRITERIA_LABS

    const { selectedProfile, profiles, defaultProfile, is_any_user_buy_gold } = state.USER


    let LABS = state.LABS

    return {
        lab_test_data,
        selectedCriterias,
        selectedLocation,
        LABS,
        currentLabSelectedTests,
        selectedProfile, profiles, defaultProfile, is_any_user_buy_gold
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        getLabTests: (labid, search_string, callback, page) => dispatch(getLabTests(labid, search_string, callback, page))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestSelector);
