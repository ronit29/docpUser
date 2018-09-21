import React from 'react';
import { connect } from 'react-redux';

import { urlShortner, getLabs, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests } from '../../actions/index.js'

import SearchResultsView from '../../components/diagnosis/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static loadData(store, match, queryParams = {}) {
        try {
            let test_ids = queryParams['test_ids'] || ""
            let lat = queryParams['lat']
            let long = queryParams['long']
            let place_id = queryParams['place_id'] || ""
            let min_distance = parseInt(queryParams['min_distance']) || 0
            let max_distance = parseInt(queryParams['max_distance']) || 35
            let min_price = parseInt(queryParams['min_price']) || 0
            let max_price = parseInt(queryParams['max_price']) || 20000
            let sort_on = queryParams['sort_on'] || null
            let lab_name = queryParams['lab_name'] || ""
            lab_name = lab_name || ""
            let force_location_fromUrl = !!queryParams['force_location']

            let searchState = {
                selectedCriterias: test_ids
            }
            searchState.selectedLocation = {
                geometry: { location: { lat, lng: long } }, place_id
            }
            let filterCriteria = {
                min_price, max_price, min_distance, max_distance, sort_on
            }
            if (lab_name) {
                filterCriteria.lab_name = lab_name
            }

            filterCriteria.priceRange = [0, 20000]
            filterCriteria.priceRange[0] = filterCriteria.min_price
            filterCriteria.priceRange[1] = filterCriteria.max_price

            filterCriteria.distanceRange = [0, 35]
            filterCriteria.distanceRange[0] = filterCriteria.min_distance
            filterCriteria.distanceRange[1] = filterCriteria.max_distance

            return store.dispatch(getLabs(searchState, filterCriteria, false, 1, null, true))

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
    const { labList, LOADED_LABS_SEARCH, count, SET_FROM_SERVER } = state.LAB_SEARCH

    return {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        LABS,
        labList, LOADED_LABS_SEARCH,
        count,
        SET_FROM_SERVER
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        getLabs: (searchState, filterCriteria, mergeState, page, cb, from_server) => dispatch(getLabs(searchState, filterCriteria, mergeState, page, cb, from_server)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
