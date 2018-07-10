import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'

import NAVIGATE from '../../../helpers/navigate'

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (NAVIGATE.refreshDoctorSearchResults(this.props)) {
            this.getDcotors()
        }
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
            let doctor_name = this.getLocationParam('doctor_name')

            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }

            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }

            searchState = JSON.parse(searchState)

            // if location found in store , use that instead of the one in URL
            if (selectedLocation) {

                // if location is changed then update url with new locations
                if (searchState.selectedLocation && searchState.selectedLocation.place_id && selectedLocation.place_id != searchState.selectedLocation.place_id) {
                    searchState.selectedLocation = selectedLocation
                    let searchData = encodeURIComponent(JSON.stringify(searchState))
                    let filterData = encodeURIComponent(JSON.stringify(filterCriteria))
                    this.props.history.replace(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${filterCriteria.doctor_name}`)
                }

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

        let doctor_name = this.getLocationParam('doctor_name')
        if (doctor_name) {
            filterState.doctor_name = doctor_name
        }

        let searchData = encodeURIComponent(JSON.stringify(searchState))
        let filterData = encodeURIComponent(JSON.stringify(filterState))
        this.props.history.replace(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${doctor_name}`)
        
        this.getDoctorList(searchState, filterState, true)

        if (window) {
            window.scrollTo(0, 0)
            window.OPD_SCROLL_POS = 0
        }
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
