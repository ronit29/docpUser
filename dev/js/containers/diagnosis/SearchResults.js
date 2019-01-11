import React from 'react';
import { connect } from 'react-redux';

import { mergeLABState, urlShortner, getLabs, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, getFooterData, setLabSearchId, getLabSearchIdResults, selectSearchType } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder } from '../../helpers/urltoState'
import SearchResultsView from '../../components/diagnosis/searchResults/index.js'

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
                    return store.dispatch(getLabs(state, page, true, searchUrl, (loadMore) => {
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
        nextFilterCriteria
    } = state.SEARCH_CRITERIA_LABS

    const LABS = state.LAB_SEARCH_DATA
    const { labList, LOADED_LABS_SEARCH, count, SET_FROM_SERVER, curr_page, seoData } = state.LAB_SEARCH
    const { setMergeState } = state.SEARCH_CRITERIA_OPD

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
        setMergeState
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
        selectSearchType: (type) => dispatch(selectSearchType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
