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

        if (this.props.location.state && this.props.location.state.scrollTop) {
            // setTimeout(() => {
            //     if (window) {
            //         window.scrollTo(0, 0)
            //         window.LAB_SCROLL_POS = 0
            //     }
            // }, 100)
        }
    }

    getLabs() {
        let {
            selectedLocation
        } = this.props

        try {
            let searchState = this.getLocationParam('search')
            let filterCriteria = this.getLocationParam('filter')
            let lab_name = this.getLocationParam('lab_name')
            lab_name = lab_name || ""
            let force_location_fromUrl = !!this.getLocationParam('force_location')

            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }

            if (lab_name) {
                filterCriteria.lab_name = lab_name
            }

            searchState = JSON.parse(searchState)

            // if location found in store , use that instead of the one in URL
            if (selectedLocation) {
                // if location is changed then update url with new locatiobs
                if (searchState.selectedLocation && searchState.selectedLocation.place_id && selectedLocation.place_id != searchState.selectedLocation.place_id) {
                    // skip location pick from store if force location from url is set
                    if (!force_location_fromUrl) {
                        searchState.selectedLocation = selectedLocation
                    }
                    let searchData = encodeURIComponent(JSON.stringify(searchState))
                    let filterData = encodeURIComponent(JSON.stringify(filterCriteria))
                    this.props.history.replace(`/lab/searchresults?search=${searchData}&filter=${filterData}&lab_name=${lab_name}`)
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

        let lab_name = this.getLocationParam('lab_name')
        lab_name = lab_name || ""
        if (lab_name) {
            filterState.lab_name = lab_name
        }

        let searchData = encodeURIComponent(JSON.stringify(searchState))
        let filterData = encodeURIComponent(JSON.stringify(filterState))
        this.props.history.replace(`/lab/searchresults?search=${searchData}&filter=${filterData}&lab_name=${lab_name}`)

        this.getLabList(searchState, filterState, true, 1)

        if (window) {
            window.scrollTo(0, 0)
            window.LAB_SCROLL_POS = 0
        }
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
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_LABS_SEARCH} title="Search for Test and Labs." goBack={true}>
                    {
                        this.isSelectedLocationNearDelhi() ? <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} />
                            <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                                <img src={ASSETS_BASE_URL + "/img/banners/banner_lab.png"} className="banner-img" />
                            </div>
                            <LabsList {...this.props} />
                        </div> : <div className="noopDiv"><img src={ASSETS_BASE_URL + "/images/nonop.png"} className="noop" /></div>
                    }
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchResultsView
