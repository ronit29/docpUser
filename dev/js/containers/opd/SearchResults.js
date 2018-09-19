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

    static loadData(store, match, queryParams = {}) {
        try {

            let specializations_ids = queryParams['specializations'] || ""
            let condition_ids = queryParams['conditions'] || ""
            let lat = queryParams['lat']
            let long = queryParams['long']
            let place_id = queryParams['place_id'] || ""
            let min_distance = parseInt(queryParams['min_distance']) || 0
            let max_distance = parseInt(queryParams['max_distance']) || 35
            let min_fees = parseInt(queryParams['min_fees']) || 0
            let max_fees = parseInt(queryParams['max_fees']) || 1500
            let sort_on = queryParams['sort_on'] || ""
            let is_available = queryParams['is_available'] === "true"
            let is_female = queryParams['is_female'] === "true"
            let doctor_name = queryParams['doctor_name']
            doctor_name = doctor_name || ""
            let hospital_name = queryParams['hospital_name']
            hospital_name = hospital_name || ""
            let force_location_fromUrl = !!queryParams['force_location']

            let searchState = {
                specializations_ids, condition_ids
            }
            searchState.selectedLocation = {
                geometry: { location: { lat, lng: long } }, place_id
            }
            let filterCriteria = {
                min_fees, max_fees, sort_on, is_available, is_female, min_distance, max_distance
            }
            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }
            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            filterCriteria.priceRange = [0, 1500]
            filterCriteria.priceRange[0] = filterCriteria.min_fees
            filterCriteria.priceRange[1] = filterCriteria.max_fees

            filterCriteria.distanceRange = [0, 35]
            filterCriteria.distanceRange[0] = filterCriteria.min_distance
            filterCriteria.distanceRange[1] = filterCriteria.max_distance

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
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getDoctors: (searchState, filterCriteria, mergeState, page, cb) => dispatch(getDoctors(searchState, filterCriteria, mergeState, page, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
