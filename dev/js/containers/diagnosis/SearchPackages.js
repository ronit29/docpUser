import React from 'react';
import { connect } from 'react-redux';

import { mergeLABState, urlShortner, getPackages, toggleDiagnosisCriteria, getDiagnosisCriteriaResults, clearExtraTests, getFooterData, selectSearchType } from '../../actions/index.js'
import { opdSearchStateBuilder, labSearchStateBuilder, PackageSearchStateBuilder } from '../../helpers/urltoState'
import SearchPackagesView from '../../components/diagnosis/searchPackages/index.js'

const queryString = require('query-string')

class SearchPackages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setForSeo:true,
            forSeo:false
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

                PackageSearchStateBuilder(null, queryParams, true, location_ms).then((state) => {
                    store.dispatch(mergeLABState(state))

                    let searchUrl = null
                    if (match.url.includes('-lbcit') || match.url.includes('-lblitcit')) {
                        searchUrl = match.url.toLowerCase()
                    }

                    return store.dispatch(getPackages(state, 1, true, searchUrl, (loadMore, seoData) => {
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

    render() {
        const parsed = queryString.parse(this.props.location.search)
        if(parsed.fromFooter && this.state.setForSeo){
            this.setState({forSeo:parsed.fromFooter,setForSeo:false})
        }
        if(parsed.forSeo && this.state.setForSeo){
            this.setState({forSeo:parsed.forSeo,setForSeo:false})
        }
        
        return (
            <SearchPackagesView {...this.props} forSeo={this.state.forSeo}/>
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
        filterCriteriaPackages
        
    } = state.SEARCH_CRITERIA_LABS

    const LABS = state.LAB_SEARCH_DATA
    const { labList, LOADED_LABS_SEARCH, count, SET_FROM_SERVER, packagesList } = state.LAB_SEARCH

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
        filterCriteriaPackages
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        getPackages: (state, page, from_server, searchByUrl, cb) => dispatch(getPackages(state, page, from_server, searchByUrl, cb)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        getFooterData: (url) => dispatch(getFooterData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPackages);
