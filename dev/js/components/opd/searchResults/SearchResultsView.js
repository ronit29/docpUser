import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import TopBar from '../searchResults/topBar/index.js'


class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {


        let {
            selectedConditions,
            selectedSpecialities,
            selectedLocation,
            selectedCriteria,
            CRITERIA_LOADED
        } = this.props

        if (CRITERIA_LOADED) {
            let searchState = {
                selectedConditions,
                selectedSpecialities,
                selectedLocation,
                selectedCriteria
            }
            let filterState = this.props.filterCriteria
            this.getDoctorList(searchState, filterState, false)
        } else {
            try {
                let searchState = this.getLocationParam('search')
                let filterState = this.getLocationParam('filter')
                if (filterState) {
                    filterState = JSON.parse(filterState)
                } else {
                    filterState = {}
                }
                searchState = JSON.parse(searchState)
                this.getDoctorList(searchState, filterState, true)
            } catch (e) {
                console.error(e)
            }
        }

    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getDoctorList(searchState, filterState, mergeState) {
        this.props.getDoctors(searchState, filterState, mergeState);
    }

    render() {
        return (
            <div className="searchResults">
                {
                    this.props.LOADING ? "" :
                        <div>
                            <TopBar />
                            <DoctorsList {...this.props} />
                        </div>
                }
            </div>
        );
    }
}

export default SearchResultsView
