import React from 'react';
import { connect } from 'react-redux';

import { toggle404, getDoctorNumber, mergeOPDState, urlShortner, getDoctors, getOPDCriteriaResults, toggleOPDCriteria, getFooterData, saveCommonProcedures, resetProcedureURl, setSearchId, getSearchIdResults, selectSearchType, setNextSearchCriteria, getOfferList, toggleDiagnosisCriteria, selectOpdTimeSLot, saveProfileProcedures, resetPkgCompare, selectLocation, cloneCommonSelectedCriterias,loadOPDInsurance } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder, mergeSelectedCriterias } from '../../helpers/urltoState'
import SearchResultsView from '../../components/opd/searchResults/index.js'
import NotFoundView from '../../components/commons/notFound'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show404: false
        }
    }

    componentDidMount() {
        if (this.props.show404) {
            this.setState({ show404: true })
            this.props.toggle404(false)
        }
        this.props.loadOPDInsurance(this.props.selectedLocation)
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
                    if (match.url.includes('-sptcit') || match.url.includes('-sptlitcit') || match.url.includes('-ipddp')) {
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
                    return store.dispatch(getDoctors(state, page, true, searchUrl, (loadMore, noResults = false) => {
                        if (noResults) {
                            resolve({ status: 404 })
                        }
                        if (match.url.includes('-sptcit') || match.url.includes('-sptlitcit') || match.url.includes('-ipddp')) {
                            getFooterData(match.url.split("/")[1], queryParams.page || 1)().then((footerData) => {
                                footerData = footerData || null
                                resolve({ footerData })
                            }).catch((e) => {
                                resolve({})
                            })
                        } else {
                            resolve({})
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

        if (this.props.show404 || this.state.show404) {
            return <NotFoundView {...this.props} />
        }

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
        nextFilterCriteria,
        mergeUrlState,
        common_settings
    } = state.SEARCH_CRITERIA_OPD

    const {
        compare_packages

    } = state.SEARCH_CRITERIA_LABS

    let DOCTORS = state.DOCTORS
    let HOSPITALS = state.HOSPITALS

    let { hospitalList, doctorList, LOADED_DOCTOR_SEARCH, count, SET_FROM_SERVER, search_content, curr_page, ratings, reviews, ratings_title, bottom_content, breadcrumb, seoData, show404, canonical_url } = state.DOCTOR_SEARCH

    const {
        offerList,
        is_login_user_insured,
        insurance_status
    } = state.USER

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
        seoData,
        mergeUrlState,
        show404,
        offerList,
        is_login_user_insured,
        insurance_status,
        canonical_url,
        compare_packages,
        common_settings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        getDoctors: (state, page, from_server, searchByUrl, cb, clinic_card) => dispatch(getDoctors(state, page, from_server, searchByUrl, cb, clinic_card)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        getDoctorNumber: (doctorId, callback) => dispatch(getDoctorNumber(doctorId, callback)),
        getFooterData: (url, page) => dispatch(getFooterData(url, page)),
        saveCommonProcedures: (procedure_ids) => dispatch(saveCommonProcedures(procedure_ids)),
        resetProcedureURl: () => dispatch(resetProcedureURl()),
        mergeSelectedCriterias: () => dispatch(mergeSelectedCriterias()),
        setSearchId: (searchId, filters, setDefault) => dispatch(setSearchId(searchId, filters, setDefault)),
        getSearchIdResults: (searchId, searchResults) => dispatch(getSearchIdResults(searchId, searchResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        setNextSearchCriteria: () => dispatch(setNextSearchCriteria()),
        toggle404: (status) => dispatch(toggle404(status)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter)),
        resetPkgCompare:() => dispatch(resetPkgCompare()),
        selectLocation: (location, type) => dispatch(selectLocation(location, type)),
        cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
