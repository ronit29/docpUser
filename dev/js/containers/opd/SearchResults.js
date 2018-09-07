import React from 'react';
import { connect } from 'react-redux';

import { getDoctors, getOPDCriteriaResults, toggleOPDCriteria } from '../../actions/index.js'

import SearchResultsView from '../../components/opd/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static loadData(store, match, queryParams = {}) {
        try {
            let searchState = queryParams['search']
            let filterCriteria = queryParams['filter']
            let doctor_name = queryParams['doctor_name']
            doctor_name = doctor_name || ""
            let hospital_name = queryParams['hospital_name']
            hospital_name = hospital_name || ""

            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }

            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }

            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            searchState = JSON.parse(searchState)

            return store.dispatch(getDoctors(searchState, filterCriteria, false))
        } catch (e) {
            console.error(e)
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
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getDoctors: (searchState, filterCriteria, mergeState, page, cb) => dispatch(getDoctors(searchState, filterCriteria, mergeState, page, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
