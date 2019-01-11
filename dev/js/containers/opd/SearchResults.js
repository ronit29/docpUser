import React from 'react';
import { connect } from 'react-redux';

import { getDoctorNumber, mergeOPDState, urlShortner, getDoctors, getOPDCriteriaResults, toggleOPDCriteria, getFooterData, saveCommonProcedures, resetProcedureURl, setSearchId, getSearchIdResults } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder, mergeSelectedCriterias } from '../../helpers/urltoState'
import SearchResultsView from '../../components/opd/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static loadData(store, match, queryParams = {}) {
        return new Promise((resolve, reject) => {
            try {
                let location_ms = null
                if (match.url.includes('location=')) {
                    location_ms = match.url.split('location=')[1]
                    location_ms = parseInt(location_ms)
                }

                opdSearchStateBuilder(null, queryParams, true, location_ms).then((state) => {
                    store.dispatch(mergeOPDState(state))

                    let searchUrl = null
                    if (match.url.includes('-sptcit') || match.url.includes('-sptlitcit')) {
                        searchUrl = match.url.toLowerCase()
                    }
                    let clinic_card = false
                    if (queryParams.clinic_card) {
                        clinic_card = true
                    }
                    let page = 1
                    if (queryParams.page) {
                        page = parseInt(queryParams.page)
                    }
                    return store.dispatch(getDoctors(state, page, true, searchUrl, (loadMore) => {
                        if (match.url.includes('-sptcit') || match.url.includes('-sptlitcit')) {
                            getFooterData(match.url.split("/")[1])().then((footerData) => {
                                footerData = footerData || null
                                resolve({ footerData })
                            }).catch((e) => {
                                resolve({  })
                            })
                        } else {
                            resolve({  })
                        }
                    }, clinic_card))
                }).catch((e) => {
                    reject()
                })
            } catch (e) {
                reject()
            }
        })
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
        commonSelectedCriterias,
        selectedLocation,
        filterCriteria,
        locationType,
        fetchNewResults,
        getNewUrl,
        selectedCriterias,
        page,
        search_id_data,
        nextSelectedCriterias,
        nextFilterCriteria
    } = state.SEARCH_CRITERIA_OPD

    let DOCTORS = state.DOCTORS
    let HOSPITALS = state.HOSPITALS

    let { hospitalList, doctorList, LOADED_DOCTOR_SEARCH, count, SET_FROM_SERVER, search_content, curr_page, ratings, reviews, ratings_title, bottom_content, breadcrumb, seoData } = state.DOCTOR_SEARCH

    return {
        DOCTORS, doctorList, LOADED_DOCTOR_SEARCH,
        LOADED_SEARCH_CRITERIA_OPD,
        commonSelectedCriterias,
        selectedLocation,
        filterCriteria,
        count,
        SET_FROM_SERVER,
        initialServerData,
        locationType,
        fetchNewResults,
        search_content,
        getNewUrl,
        selectedCriterias,
        page,
        curr_page,
        HOSPITALS,
        hospitalList, ratings, reviews, ratings_title,
        search_id_data,
        nextSelectedCriterias,
        nextFilterCriteria,
        bottom_content,
        breadcrumb,
        seoData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getDoctors: (state, page, from_server, searchByUrl, cb, clinic_card) => dispatch(getDoctors(state, page, from_server, searchByUrl, cb, clinic_card)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        getDoctorNumber: (doctorId, callback) => dispatch(getDoctorNumber(doctorId, callback)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        saveCommonProcedures: (procedure_ids) => dispatch(saveCommonProcedures(procedure_ids)),
        resetProcedureURl: () => dispatch(resetProcedureURl()),
        mergeSelectedCriterias: () => dispatch(mergeSelectedCriterias()),
        setSearchId: (searchId, filters, setDefault) => dispatch(setSearchId(searchId, filters, setDefault)),
        getSearchIdResults: (searchId, searchResults) => dispatch(getSearchIdResults(searchId, searchResults))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
