import React from 'react';
import { connect } from 'react-redux';

import { mergeLABState, urlShortner, getPackages, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, getFooterData, selectSearchType, getOfferList, toggleOPDCriteria, selectLabAppointmentType, selectLabTimeSLot, resetPkgCompare, togglecompareCriteria, loadOPDInsurance, setCommonUtmTags, unSetCommonUtmTags, clearVipSelectedPlan, NonIpdBookingLead, saveLeadPhnNumber } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder, PackageSearchStateBuilder } from '../../helpers/urltoState'
import SearchPackagesView from '../../components/diagnosis/searchPackages/index.js'

const queryString = require('query-string')

class SearchPackages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            forTaxSaver: props.location.pathname.includes("tax-saver-health-packages"),
            forOrganicSearch: props.location.pathname.includes("full-body-checkup-health-packages")
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

                PackageSearchStateBuilder(null, queryParams, true, location_ms).then((state) => { // build state in case of ssr
                    store.dispatch(mergeLABState(state))

                    let searchUrl = null
                    if (match.url.includes('-lbcit') || match.url.includes('-lblitcit')) {
                        searchUrl = match.url.toLowerCase()
                    }
                    let page = 1
                    if (queryParams.page) {
                        page = parseInt(queryParams.page)
                    }
                    return store.dispatch(getPackages(state, page, true, searchUrl, {}, (loadMore, seoData) => { //get searched packages result
                        if (match.url.includes('-lbcit') || match.url.includes('-lblitcit')) {
                            getFooterData(match.url.split("/")[1])().then((footerData) => {
                                footerData = footerData || null
                                resolve({ seoData, footerData })
                            }).catch((e) => {
                                resolve({ seoData })
                            })
                        } else {
                            resolve({ seoData })
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

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        // this.props.loadOPDInsurance(this.props.selectedLocation)
    }

    render() {
        return (
            <SearchPackagesView {...this.props} forTaxSaver={this.state.forTaxSaver} forOrganicSearch={this.state.forOrganicSearch} />
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
        currentSearchedCriterias,
        filterCriteriaPackages,
        page,
        compare_packages

    } = state.SEARCH_CRITERIA_LABS

    const {
        common_settings
    } = state.SEARCH_CRITERIA_OPD

    const {
        offerList,
        is_login_user_insured,
        insurance_status,
        device_info,
        common_utm_tags
    } = state.USER

    const LABS = state.LAB_SEARCH_DATA
    const { labList, LOADED_LABS_SEARCH, count, SET_FROM_SERVER, packagesList, curr_page } = state.LAB_SEARCH

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
        packagesList,
        currentSearchedCriterias,
        filterCriteriaPackages,
        offerList,
        is_login_user_insured,
        page,
        curr_page,
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
        getPackages: (state, page, from_server, searchByUrl,extra_params, cb) => dispatch(getPackages(state, page, from_server, searchByUrl, extra_params, cb)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        togglecompareCriteria: (criteria) => dispatch(togglecompareCriteria(criteria)),
        resetPkgCompare:() => dispatch(resetPkgCompare()),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city)),
        setCommonUtmTags: (type, tag) => dispatch(setCommonUtmTags(type, tag)),
        unSetCommonUtmTags: (type, tag)=> dispatch(unSetCommonUtmTags(type, tag)),
        clearVipSelectedPlan:() =>dispatch(clearVipSelectedPlan()),
        NonIpdBookingLead:(data,cb) =>dispatch(NonIpdBookingLead(data, cb)),
        saveLeadPhnNumber:(number) =>dispatch(saveLeadPhnNumber(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPackages);
