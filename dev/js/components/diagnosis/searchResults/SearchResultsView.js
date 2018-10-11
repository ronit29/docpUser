import React from 'react';

import LabsList from '../searchResults/labsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'
import NAVIGATE from '../../../helpers/navigate/index.js';
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'


class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seoData: this.props.initialServerData,
            seoFriendly: this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit')
        }
    }

    componentDidMount() {
        if (this.props.fetchNewResults) {
            this.getLabList(this.props)
            if (window) {
                window.scrollTo(0, 0)
            }
        }
    }

    componentWillReceiveProps(props) {
        if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
            this.getLabList(props)
            if (window) {
                window.scrollTo(0, 0)
            }
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getLabList(state = null, page = 1, cb = null) {
        let searchUrl = null
        if (this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit')) {
            searchUrl = this.props.match.url
        }
        if (!state) {
            state = this.props
        }

        this.props.getLabs(state, page, false, searchUrl, (...args) => {
            let new_url = this.buildURI(state)
            this.props.history.replace(new_url)
            if (cb) {
                cb(...args)
            }
        })
    }

    applyFilters(filterState) {
        this.props.mergeLABState({ filterCriteria: filterState })
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    buildURI(state) {
        let { selectedLocation, selectedCriterias, filterCriteria, locationType } = state
        let testIds = selectedCriterias.filter(x => x.type == 'test').map(x => x.id)

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

        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let min_price = filterCriteria.priceRange[0]
        let max_price = filterCriteria.priceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let lab_name = filterCriteria.lab_name || ""

        let url = `${window.location.pathname}?test_ids=${testIds || ""}&min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}`

        return url
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
        let title = "Lab Search"
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
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_LABS_SEARCH} title="Search for Test and Labs." goBack={true}>
                    <div>
                        <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                        {/*
                        <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                            <img src={ASSETS_BASE_URL + "/img/banners/banner_lab.png"} className="banner-img" />
                        </div>
                        */}
                        <LabsList {...this.props} getLabList={this.getLabList.bind(this)} />
                    </div>
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
