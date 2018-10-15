import React from 'react';
import { connect } from 'react-redux';

import { mergeOPDState, urlShortner, getDoctors, getOPDCriteriaResults, toggleOPDCriteria } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder } from '../../helpers/urltoState'
import SearchResultsView from '../../components/opd/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static loadData(store, match, queryParams = {}) {
        try {
            return new Promise((resolve, reject) => {
                let location_ms = null
                if (match.url.includes('location=')) {
                    location_ms = match.url.split('location=')[1]
                    location_ms = parseInt(location_ms)
                }

                opdSearchStateBuilder(null, queryParams, true, location_ms).then((state) => {
                    store.dispatch(mergeOPDState(state))

                    let searchUrl = null
                    if (match.url.includes('-sptcit') || match.url.includes('-sptlitcit')) {
                        searchUrl = match.url
                    }

                    store.dispatch(getDoctors(state, 1, true, searchUrl, (loadMore, seoData) => {
                        resolve(seoData)
                    }))
                })
            })
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

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        locationType,
        fetchNewResults
    } = state.SEARCH_CRITERIA_OPD

    let DOCTORS = state.DOCTORS
    let { doctorList, LOADED_DOCTOR_SEARCH, count, SET_FROM_SERVER } = state.DOCTOR_SEARCH

    return {
        DOCTORS, doctorList, LOADED_DOCTOR_SEARCH,
        LOADED_SEARCH_CRITERIA_OPD,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        count,
        SET_FROM_SERVER,
        initialServerData,
        locationType,
        fetchNewResults
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getDoctors: (state, page, from_server, searchByUrl, cb) => dispatch(getDoctors(state, page, from_server, searchByUrl, cb)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
