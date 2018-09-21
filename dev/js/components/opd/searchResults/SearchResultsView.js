import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
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

        // this.getDcotors()

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
            let specializations_ids = this.getLocationParam('specializations') || ""
            let condition_ids = this.getLocationParam('conditions') || ""
            let lat = this.getLocationParam('lat')
            let long = this.getLocationParam('long')
            let place_id = this.getLocationParam('place_id') || ""
            let min_distance = parseInt(this.getLocationParam('min_distance')) || 0
            let max_distance = parseInt(this.getLocationParam('max_distance')) || 35
            let min_fees = parseInt(this.getLocationParam('min_fees')) || 0
            let max_fees = parseInt(this.getLocationParam('max_fees')) || 1500
            let sort_on = this.getLocationParam('sort_on') || ""
            let is_available = this.getLocationParam('is_available') === "true"
            let is_female = this.getLocationParam('is_female') === "true"
            let doctor_name = this.getLocationParam('doctor_name')
            doctor_name = doctor_name || ""
            let hospital_name = this.getLocationParam('hospital_name')
            hospital_name = hospital_name || ""
            let force_location_fromUrl = !!this.getLocationParam('force_location')

            let searchState = {
                specializations_ids, condition_ids
            }
            searchState.selectedLocation = {
                geometry: { location: { lat, lng: long } }, place_id
            }
            let filterCriteria = {
                min_fees, max_fees, sort_on, is_available, is_female, min_distance, max_distance
            }
            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }
            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            filterCriteria.priceRange = [0, 1500]
            filterCriteria.priceRange[0] = filterCriteria.min_fees
            filterCriteria.priceRange[1] = filterCriteria.max_fees

            filterCriteria.distanceRange = [0, 35]
            filterCriteria.distanceRange[0] = filterCriteria.min_distance
            filterCriteria.distanceRange[1] = filterCriteria.max_distance

            // if location found in store , use that instead of the one in URL
            if (selectedLocation && selectedLocation.geometry) {

                // if location is changed then update url with new locations
                if (!!!searchState.selectedLocation || (searchState.selectedLocation && searchState.selectedLocation.geometry && selectedLocation.geometry.location.lat != searchState.selectedLocation.geometry.location.lat)) {
                    // skip location pick from store if force location from url is set
                    if (!force_location_fromUrl) {
                        searchState.selectedLocation = selectedLocation
                    }

                    let sel_cri_s = specializations_ids ? specializations_ids.split(',').map((x) => {
                        return {
                            type: 'speciality',
                            id: x,
                            name: ""
                        }
                    }) : []

                    let sel_cri_c = condition_ids ? condition_ids.split(',').map((x) => {
                        return {
                            type: 'condition',
                            id: x,
                            name: ""
                        }
                    }) : []

                    let url = this.buildURI([...sel_cri_s, ...sel_cri_c], searchState.selectedLocation, filterCriteria, doctor_name, hospital_name)
                    this.props.history.replace(url)
                }

            }

            this.getDoctorList(searchState, filterCriteria, true)
        } catch (e) {
            console.error(e)
        }

    }

    applyFilters(filterState) {
        let specializations_ids = this.getLocationParam('specializations')
        let condition_ids = this.getLocationParam('conditions')
        let lat = this.getLocationParam('lat')
        let long = this.getLocationParam('long')
        let place_id = this.getLocationParam('place_id') || ""

        let searchState = {
            specializations_ids, condition_ids, selectedCriterias: this.props.selectedCriterias
        }
        searchState.selectedLocation = {
            geometry: { location: { lat, lng: long } }, place_id
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

        let url = this.buildURI(this.props.selectedCriterias, this.props.selectedLocation, filterState, doctor_name, hospital_name)
        this.props.history.replace(url)
        this.getDoctorList(searchState, filterState, true)

        if (window) {
            window.scrollTo(0, 0)
            window.OPD_SCROLL_POS = 0
        }
    }

    buildURI(selectedCriterias, selectedLocation, filterCriteria, doctor_name, hospital_name) {
        let specialization_ids = selectedCriterias
            .filter((x) => {
                return x.type == "speciality"
            }).map((x) => {
                return x.id
            }).join(',')

        let condition_ids = selectedCriterias
            .filter((x) => {
                return x.type == "condition"
            }).map((x) => {
                return x.id
            }).join(',')


        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (selectedLocation) {
            place_id = selectedLocation.place_id || ""
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let min_fees = filterCriteria.priceRange[0]
        let max_fees = filterCriteria.priceRange[1]
        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let is_available = filterCriteria.is_available
        let is_female = filterCriteria.is_female

        let url = `/opd/searchresults?specializations=${specialization_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&doctor_name=${doctor_name}&hospital_name=${hospital_name}&place_id=${place_id}`

        return url
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
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
                }} setDefault={true} />
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
