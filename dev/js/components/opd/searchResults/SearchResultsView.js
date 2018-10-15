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
            seoData: this.props.initialServerData,
            seoFriendly: this.props.match.url.includes('-sptcit') || this.props.match.url.includes('-sptlitcit')
        }
    }

    componentDidMount() {
        if (this.props.fetchNewResults) {
            this.getDoctorList(this.props)
            if (window) {
                window.scrollTo(0, 0)
            }
        }
    }

    componentWillReceiveProps(props) {
        if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
            this.getDoctorList(props)
            if (window) {
                window.scrollTo(0, 0)
            }
        } else {
            if (props.selectedLocation != this.props.selectedLocation) {
                let new_url = this.buildURI(props)
                this.props.history.replace(new_url)
            }
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    applyFilters(filterState) {
        this.props.mergeOPDState({ filterCriteria: filterState })
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    buildURI(state) {

        let { selectedLocation, selectedCriterias, filterCriteria, locationType } = state
        let specializations_ids = selectedCriterias.filter(x => x.type == 'speciality').map(x => x.id)
        let condition_ids = selectedCriterias.filter(x => x.type == 'condition').map(x => x.id)

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
        let hospital_name = filterCriteria.hospital_name || ""
        let doctor_name = filterCriteria.doctor_name || ""

        let url = `${window.location.pathname}?specializations=${specializations_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&doctor_name=${doctor_name || ""}&hospital_name=${hospital_name || ""}&place_id=${place_id}&locationType=${locationType || ""}`

        return url
    }

    getDoctorList(state = null, page = 1, cb = null) {
        let searchUrl = null
        if (this.props.match.url.includes('-sptcit') || this.props.match.url.includes('-sptlitcit')) {
            searchUrl = this.props.match.url
        }
        if (!state) {
            state = this.props
        }

        this.props.getDoctors(state, page, false, searchUrl, (...args) => {
            let new_url = this.buildURI(state)
            this.props.history.replace(new_url)
            if (cb) {
                cb(...args)
            }
        })
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

    getMetaTagsData(seoData) {
        let title = "Doctor Search"
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
                    title: this.getMetaTagsData(this.state.seoData).title,
                    description: this.getMetaTagsData(this.state.seoData).description,
                    seoFriendly: this.state.seoFriendly
                }} />
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_DOCTOR_SEARCH} title="Search For Disease or Doctor." type="opd" goBack={true}>
                    {
                        this.isSelectedLocationNearDelhi() ? <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                            {/* <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                                <img src={ASSETS_BASE_URL + "/img/banners/banner_doc.png"} className="banner-img" />
                            </div> */}
                            <DoctorsList {...this.props} getDoctorList={this.getDoctorList.bind(this)} />
                        </div> : <div className="noopDiv"><img src={ASSETS_BASE_URL + "/images/nonop.png"} className="noop" /></div>
                    }
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
