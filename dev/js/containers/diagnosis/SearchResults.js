import React from 'react';
import { connect } from 'react-redux';

import { getLabs, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests } from '../../actions/index.js'

import SearchResultsView from '../../components/diagnosis/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.clearExtraTests()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <SearchResultsView {...this.props} />
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

    const LABS = state.LABS
    const { labList, LOADED_LABS_SEARCH, count } = state.LAB_SEARCH

    return {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        LABS,
        labList, LOADED_LABS_SEARCH,
        count
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabs: (searchState, filterCriteria, mergeState, page, cb) => dispatch(getLabs(searchState, filterCriteria, mergeState, page, cb)),
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
