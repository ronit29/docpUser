import React from 'react';

import LabsList from '../searchResults/labsList/index.js'
import CriteriaSearch from '../criteriaSearch'
import TopBar from './topBar'

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.getLabs()
    }

    getLabs() {
        let {
            selectedLocation,
            selectedCriterias,
            filterCriteria,
            LOADED_SEARCH_CRITERIA_LAB
        } = this.props

        try {
            let searchState = this.getLocationParam('search')
            let filterCriteria = this.getLocationParam('filter')
            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }
            searchState = JSON.parse(searchState)
            this.getLabList(searchState, filterCriteria, true)
        } catch (e) {
            console.error(e)
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getLabList(searchState, filterCriteria, mergeState) {
        this.props.getLabs(searchState, filterCriteria, mergeState);
    }

    applyFilters(filterState) {
        let searchState = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        let searchData = encodeURIComponent(JSON.stringify(searchState))
        let filterData = encodeURIComponent(JSON.stringify(filterState))
        this.props.history.replace(`/dx/searchresults?search=${searchData}&filter=${filterData}`)

        this.getLabList(searchState, filterState, false)
    }

    render() {

        return (
            <div className="searchResults">
                {
                    this.props.LOADED_LABS_SEARCH ?
                        <CriteriaSearch {...this.props} >
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)}/>
                            <LabsList {...this.props} />
                        </CriteriaSearch> : ""
                }
            </div>
        );
    }
}

export default SearchResultsView
