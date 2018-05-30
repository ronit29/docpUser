import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'


class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.getDcotors()
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getDcotors() {
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
                searchState.selectedLocation = selectedLocation
            }

            this.getDoctorList(searchState, filterCriteria, true)
        } catch (e) {
            console.error(e)
        }

    }

    applyFilters(filterState) {
        let searchState = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        let searchData = encodeURIComponent(JSON.stringify(searchState))
        let filterData = encodeURIComponent(JSON.stringify(filterState))
        this.props.history.replace(`/opd/searchresults?search=${searchData}&filter=${filterData}`)

        this.getDoctorList(searchState, filterState, true)
    }

    getDoctorList(searchState, filterCriteria, mergeState) {
        this.props.getDoctors(searchState, filterCriteria, mergeState, 1);
    }

    render() {
        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_DOCTOR_SEARCH} title="Search For Disease or Doctor." type="opd" goBack={true}>
                    <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                    <DoctorsList {...this.props} />
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
