import React from 'react';
import { connect } from 'react-redux';

import { toggle404, mergeLABState, urlShortner, getLabs, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, getFooterData, setLabSearchId, getLabSearchIdResults, selectSearchType, selectLabTimeSLot, getOfferList, toggleOPDCriteria, selectLabAppointmentType, resetPkgCompare, loadOPDInsurance, NonIpdBookingLead, clearVipSelectedPlan,saveLeadPhnNumber } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder } from '../../helpers/urltoState'
import SearchResultsView from '../../components/diagnosis/searchResults/index.js'
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
        // this.props.loadOPDInsurance(this.props.selectedLocation)
    }

    static loadData(store, match, queryParams = {}) {
        return new Promise((resolve, reject) => {
            try {
                let location_ms = null
                if (match.url.includes('location=')) {
                    location_ms = match.url.split('location=')[1]
                    location_ms = parseInt(location_ms)
                }

                labSearchStateBuilder(null, queryParams, true, location_ms).then((state) => {
                    store.dispatch(mergeLABState(state))

                    let searchUrl = null
                    if (match.url.includes('-lbcit') || match.url.includes('-lblitcit')) {
                        searchUrl = match.url.toLowerCase()
                    }
                    let page = 1
                    if (queryParams.page) {
                        page = parseInt(queryParams.page)
                    }
                    return store.dispatch(getLabs(state, page, true, searchUrl, (loadMore, noResults = false) => {
                        if (noResults) {
                            resolve({ status: 404 })
                        }
                        if (match.url.includes('-lbcit') || match.url.includes('-lblitcit')) {
                            getFooterData(match.url.split("/")[1])().then((footerData) => {
                                footerData = footerData || null
                                resolve({ footerData })
                            }).catch((e) => {
                                resolve({})
                            })
                        } else {
                            resolve({})
                        }
                    }))
                }).catch((e) => {
                    reject()
                })
            } catch (e) {
                console.error(e)
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
        );
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
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        locationType,
        fetchNewResults,
        corporateCoupon,
        page,
        search_id_data,
        nextSelectedCriterias,
        currentSearchedCriterias,
        nextFilterCriteria,
        compare_packages,
    } = state.SEARCH_CRITERIA_LABS

    const {
        offerList
    } = state.USER

    const LABS = state.LAB_SEARCH_DATA
    const { show404, labList, LOADED_LABS_SEARCH, count, SET_FROM_SERVER, curr_page, seoData, test_data } = state.LAB_SEARCH
    const { mergeUrlState, common_settings } = state.SEARCH_CRITERIA_OPD

    const {
        is_login_user_insured,
        insurance_status,
        device_info,
        common_utm_tags
    } = state.USER

    return {
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB,
        LABS,
        labList, LOADED_LABS_SEARCH,
        count,
        SET_FROM_SERVER,
        initialServerData,
        locationType,
        fetchNewResults,
        corporateCoupon,
        page,
        curr_page,
        search_id_data,
        nextSelectedCriterias,
        currentSearchedCriterias,
        nextFilterCriteria,
        seoData,
        mergeUrlState,
        test_data,
        show404,
        offerList,
        is_login_user_insured,
        compare_packages,
        insurance_status,
        device_info,
        common_settings,
        common_utm_tags
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        getLabs: (state, page, from_server, searchByUrl, cb) => dispatch(getLabs(state, page, from_server, searchByUrl, cb)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        setLabSearchId: (searchId, filters, setDefault) => dispatch(setLabSearchId(searchId, filters, setDefault)),
        getLabSearchIdResults: (searchId, searchResults) => dispatch(getLabSearchIdResults(searchId, searchResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        toggle404: (status) => dispatch(toggle404(status)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        getOfferList: (lat,long) => dispatch(getOfferList(lat,long)),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        resetPkgCompare:() => dispatch(resetPkgCompare()),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city)),
        clearVipSelectedPlan:() =>dispatch(clearVipSelectedPlan()),
        NonIpdBookingLead:(data,cb) =>dispatch(NonIpdBookingLead(data, cb)),
        saveLeadPhnNumber:(number) =>dispatch(saveLeadPhnNumber(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
