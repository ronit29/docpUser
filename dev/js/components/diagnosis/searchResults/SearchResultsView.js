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
        const path = this.props.location.pathname
        let location = null
        if (path.includes('location=')) {
            location = path.split('location=')[1]
            if (location) {
                location = parseInt(location)
            }
        }

        if ((NAVIGATE.refreshLabSearchResults(this.props) && !location) || this.props.locationType == 'adwords') {
            this.getLabs(this.props)
        }

        // this.getLabs()
        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.props.location.state && this.props.location.state.scrollTop) {
            // setTimeout(() => {
            //     if (window) {
            //         window.scrollTo(0, 0)
            //         window.LAB_SCROLL_POS = 0
            //     }
            // }, 100)
        }
    }

    componentWillReceiveProps(props) {

        let prev_lat = null
        if (this.props.selectedLocation) {
            prev_lat = this.props.selectedLocation.geometry.location.lat
            if (typeof prev_lat === 'function') prev_lat = prev_lat()
            prev_lat = parseFloat(parseFloat(prev_lat).toFixed(6))
        }

        let nex_lat = null
        if (props.selectedLocation) {
            nex_lat = props.selectedLocation.geometry.location.lat
            if (typeof nex_lat === 'function') nex_lat = nex_lat()
            nex_lat = parseFloat(parseFloat(nex_lat).toFixed(6))
        }

        if (prev_lat != nex_lat) {
            this.getLabs(props, 0)
        }
    }

    getLabs(props, showLocation = 1) {
        let {
            selectedLocation
        } = props

        try {

            let test_ids = this.getLocationParam('test_ids') || ""
            let lat = this.getLocationParam('lat')
            let long = this.getLocationParam('long')
            let place_id = this.getLocationParam('place_id') || ""
            let min_distance = parseInt(this.getLocationParam('min_distance')) || 0
            let max_distance = parseInt(this.getLocationParam('max_distance')) || 35
            let min_price = parseInt(this.getLocationParam('min_price')) || 0
            let max_price = parseInt(this.getLocationParam('max_price')) || 20000
            let sort_on = this.getLocationParam('sort_on') || null
            let lab_name = this.getLocationParam('lab_name') || ""
            lab_name = lab_name || ""
            let force_location_fromUrl = !!this.getLocationParam('force_location')

            let searchState = {
                selectedCriterias: test_ids
            }
            searchState.selectedLocation = {
                geometry: { location: { lat, lng: long } }, place_id
            }
            let filterCriteria = {
                min_price, max_price, min_distance, max_distance, sort_on
            }
            if (lab_name) {
                filterCriteria.lab_name = lab_name
            }

            filterCriteria.priceRange = [0, 20000]
            filterCriteria.priceRange[0] = filterCriteria.min_price
            filterCriteria.priceRange[1] = filterCriteria.max_price

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

                    let sel_cri = test_ids ? test_ids.split(',').map((x) => {
                        return {
                            type: 'test',
                            id: x,
                            name: ""
                        }
                    }) : []

                    let url = this.buildURI([...sel_cri], searchState.selectedLocation, filterCriteria, lab_name)
                    this.props.history.replace(url)
                }

            }

            this.getLabList(searchState, filterCriteria, true, showLocation)
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

    getLabList(searchState, filterCriteria, mergeState, showLocation = 1) {
        let searchUrl = null
        if (this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit')) {
            searchUrl = this.props.match.url
        }

        this.props.getLabs(searchState, filterCriteria, mergeState, 1, (loadMore, seoData) => {
            if (seoData) {
                this.setState({ seoData: seoData })
            }
        }, false, searchUrl, showLocation);
    }

    applyFilters(filterState) {

        let test_ids = this.getLocationParam('test_ids')
        let lat = this.getLocationParam('lat')
        let long = this.getLocationParam('long')
        let place_id = this.getLocationParam('place_id') || ""

        let searchState = {
            selectedCriterias: test_ids
        }
        searchState.selectedLocation = {
            geometry: { location: { lat, lng: long } }, place_id
        }

        let lab_name = this.getLocationParam('lab_name')
        lab_name = lab_name || ""
        if (lab_name) {
            filterState.lab_name = lab_name
        }

        let url = this.buildURI(this.props.selectedCriterias, this.props.selectedLocation, filterState, lab_name)
        this.props.history.replace(url)
        this.getLabList(searchState, filterState, true)

        if (window) {
            window.scrollTo(0, 0)
            window.LAB_SCROLL_POS = 0
        }
    }

    buildURI(selectedCriterias, selectedLocation, filterCriteria, lab_name) {
        let specialization_ids = selectedCriterias
            .filter((x) => {
                return x.type == "test"
            })
            .map((x) => {
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

        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let min_price = filterCriteria.priceRange[0]
        let max_price = filterCriteria.priceRange[1]
        let sort_on = filterCriteria.sort_on || ""

        let url = `${window.location.pathname}?test_ids=${specialization_ids}&min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}`

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
                    {
                        this.isSelectedLocationNearDelhi() ? <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                            {/* <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                                <img src={ASSETS_BASE_URL + "/img/banners/banner_lab.png"} className="banner-img" />
                            </div> */}
                            <LabsList {...this.props} />
                        </div> : <div className="noopDiv"><img src={ASSETS_BASE_URL + "/images/nonop.png"} className="noop" /></div>
                    }
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
