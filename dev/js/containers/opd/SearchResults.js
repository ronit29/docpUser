import React from 'react';
import { connect } from 'react-redux';

import { urlShortner, getDoctors, getOPDCriteriaResults, toggleOPDCriteria } from '../../actions/index.js'

import SearchResultsView from '../../components/opd/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <SearchResultsView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD

    let DOCTORS = state.DOCTORS
    let { doctorList, LOADED_DOCTOR_SEARCH, count } = state.DOCTOR_SEARCH

    return {
        DOCTORS, doctorList, LOADED_DOCTOR_SEARCH,
        LOADED_SEARCH_CRITERIA_OPD,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getDoctors: (searchState, filterCriteria, mergeState, page, cb) => dispatch(getDoctors(searchState, filterCriteria, mergeState, page, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
