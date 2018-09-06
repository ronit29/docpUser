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

        if (this.props.location.state && this.props.location.state.scrollTop) {
            // setTimeout(() => {
            //     if (window) {
            //         window.scrollTo(0, 0)
            //         window.OPD_SCROLL_POS = 0
            //     }
            // }, 100)
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
            doctor_name = doctor_name || ""
            let hospital_name = this.getLocationParam('hospital_name')
            hospital_name = hospital_name || ""
            let force_location_fromUrl = !!this.getLocationParam('force_location')

            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }

            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }

            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            searchState = JSON.parse(searchState)
            // if location found in store , use that instead of the one in URL
            if (selectedLocation) {

                // if location is changed then update url with new locations
                if (searchState.selectedLocation && searchState.selectedLocation.place_id && selectedLocation.place_id != searchState.selectedLocation.place_id) {
                    // skip location pick from store if force location from url is set
                    if (!force_location_fromUrl) {
                        searchState.selectedLocation = selectedLocation
                    }
                    let searchData = encodeURIComponent(JSON.stringify(searchState))
                    let filterData = encodeURIComponent(JSON.stringify(filterCriteria))
                    this.props.history.replace(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${doctor_name}&hospital_name=${hospital_name}`)
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
        doctor_name = doctor_name || ""
        if (doctor_name) {
            filterState.doctor_name = doctor_name
        }

        let hospital_name = this.getLocationParam('hospital_name')
        hospital_name = hospital_name || ""
        if (hospital_name) {
            filterState.hospital_name = hospital_name
        }

        let searchData = encodeURIComponent(JSON.stringify(searchState))
        let filterData = encodeURIComponent(JSON.stringify(filterState))
        this.props.history.replace(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${doctor_name}&hospital_name=${hospital_name}`)

        this.getDoctorList(searchState, filterState, true)

        if (window) {
            window.scrollTo(0, 0)
            window.OPD_SCROLL_POS = 0
        }
    }

    getDoctorList(searchState, filterCriteria, mergeState) {
        this.props.getDoctors(searchState, filterCriteria, mergeState, 1);
    }

    isSelectedLocationNearDelhi() {
        try {
            if (this.props.selectedLocation) {
                let { geometry } = this.props.selectedLocation

                var latitude1 = 28.644800;
                var longitude1 = 77.216721;
                var latitude2 = geometry.location.lat;
                if (typeof geometry.location.lat == 'function') {
                    latitude2 = geometry.location.lat()
                }
                var longitude2 = geometry.location.lng;
                if (typeof geometry.location.lng == 'function') {
                    longitude2 = geometry.location.lng()
                }
                var distance = 0

                if (google) {
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
                }

                return (distance / 1000) < 50
            }
            return true
        } catch (e) {
            return true
        }
    }

    render() {
        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_DOCTOR_SEARCH} title="Search For Disease or Doctor." type="opd" goBack={true}>
                    {
                        this.isSelectedLocationNearDelhi() ? <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                            <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                                <img src={ASSETS_BASE_URL + "/img/banners/banner_doc.png"} className="banner-img" />
                            </div>
                            <DoctorsList {...this.props} />
                        </div> : <div className="noopDiv"><img src={ASSETS_BASE_URL + "/images/nonop.png"} className="noop" /></div>
                    }
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
