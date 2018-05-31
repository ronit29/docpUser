import React from 'react';

import LabsList from '../searchResults/labsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'
import NAVIGATE from '../../../helpers/navigate/index.js';

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (NAVIGATE.refreshLabSearchResults(this.props)) {
            this.getLabs()
        }
    }

    getLabs() {
        let {
            selectedLocation
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

            // if location found in store , use that instead of the one in URL
            if (selectedLocation) {
                // if location is changed then update url with new locatiobs
                if (searchState.selectedLocation && searchState.selectedLocation.place_id && selectedLocation.place_id != searchState.selectedLocation.place_id) {
                    searchState.selectedLocation = selectedLocation
                    let searchData = encodeURIComponent(JSON.stringify(searchState))
                    let filterData = encodeURIComponent(JSON.stringify(filterCriteria))
                    this.props.history.replace(`/dx/searchresults?search=${searchData}&filter=${filterData}`)
                }

            }

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

        this.getLabList(searchState, filterState, true, 1)
    }

    render() {

        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_LABS_SEARCH} title="Search for Test and Labs." goBack={true}>
                    <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                    <LabsList {...this.props} />
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
