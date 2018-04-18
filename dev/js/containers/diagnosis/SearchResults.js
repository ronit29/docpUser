import React from 'react';
import { connect } from 'react-redux';

import { getLabs, toggleTest, toggleDiagnosisCriteria } from '../../actions/index.js'

import SearchResultsView from '../../components/diagnosis/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <SearchResultsView { ...this.props } />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria,
        filterCriteria,
        CRITERIA_LOADED
    } = state.SEARCH_CRITERIA_LABS
    let LABS = state.LABS
    let { labList, LOADING, ERROR } = state.LAB_SEARCH

    return {
        LABS, labList, LOADING, ERROR,
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria,
        filterCriteria,
        CRITERIA_LOADED
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabs: (searchState,filterState,mergeState) => dispatch(getLabs(searchState,filterState,mergeState)),
        toggleTest: (id) => dispatch(toggleTest(id)),
        toggleDiagnosisCriteria : (criteria) => dispatch(toggleDiagnosisCriteria(criteria))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
