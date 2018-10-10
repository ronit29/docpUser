import React from 'react';
import { connect } from 'react-redux';

import { mergeLABState, clearAllTests, resetFilters, loadLabCommonCriterias, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests } from '../../actions/index.js'
import SearchCriteriaView from '../../components/diagnosis/searchCriteria/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
    }

    // static loadData(store) {
    //     return store.dispatch(loadLabCommonCriterias())
    // }

    componentDidMount() {
        this.props.loadLabCommonCriterias()
        this.props.resetFilters()
        this.props.clearExtraTests()
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        return (
            <SearchCriteriaView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_conditions,
        preferred_labs,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        locationType
    } = state.SEARCH_CRITERIA_LABS

    return {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_conditions,
        preferred_labs,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        locationType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        resetFilters: () => dispatch(resetFilters()),
        clearExtraTests: () => dispatch(clearExtraTests()),
        clearAllTests: () => dispatch(clearAllTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
