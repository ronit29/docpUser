import React from 'react';

import PackagesLists from '../searchPackages/packagesList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'
import NAVIGATE from '../../../helpers/navigate/index.js';
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import Footer from '../../commons/Home/footer'

class SearchPackagesView extends React.Component {
    constructor(props) {
        super(props)
        let seoData = null
        let footerData = null
        if (this.props.initialServerData) {
            seoData = this.props.initialServerData.seoData
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            seoData, footerData,
            seoFriendly: this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit'),
            lab_card: this.props.location.search.includes('lab_card') || null,
            showError: false,
            showChatWithus: false
        }
    }

    componentDidMount() {
        if (true) {
            this.getLabList(this.props)
            if (window) {
                window.scrollTo(0, 0)
            }
        }
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }

        this.setState({ showChatWithus: true })
    }

    componentWillReceiveProps(props) {
        if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
            this.getLabList(props)
            // if (window) {
            //     window.scrollTo(0, 0)
            // }
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

    getLabList(state = null, page = 1, cb = null) {
        let searchUrl = null
        if (this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit')) {
            searchUrl = this.props.match.url.toLowerCase()
        }
        if (!state) {
            state = this.props
        }

        this.props.getPackages(state, page, false, searchUrl, (...args) => {
            this.setState({ seoData: args[1] })
            if (cb) {
                cb(...args)
            } else {
                let new_url = this.buildURI(state)
                this.props.history.replace(new_url)
            }
        }).catch((e) => {
            this.setState({ showError: true })
        })
    }

    applyFilters(filterState) {
        // this.props.mergeLABState({ filterCriteria: filterState })
        this.props.mergeLABState({ filterCriteriaPackages: filterState })
        if (window) {
            window.scrollTo(0, 0)
        }
    }
    applyCategories(categoryState,filterstate) {
        let newCategoryState = {}
        newCategoryState['catIds'] = categoryState
        newCategoryState['distanceRange']=filterstate.distanceRange
        newCategoryState['priceRange']=filterstate.priceRange
        newCategoryState['sort_on']=filterstate.sort_on
        newCategoryState['max_age'] = filterstate.max_age
        newCategoryState['max_price'] = filterstate.max_price
        newCategoryState['min_age'] = filterstate.min_age
        newCategoryState['gender'] = filterstate.gender
        newCategoryState['packageType'] = filterstate.packageType
        newCategoryState['test_ids'] = filterstate.test_ids

        // this.props.mergeLABState({ filterCriteria: newCategoryState })
        this.props.mergeLABState({ filterCriteriaPackages: newCategoryState })
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    buildURI(state) {
        let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType, filterCriteriaPackages } = state
        // let testIds = selectedCriterias.filter(x => x.type == 'test').map(x => x.id)
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
        let cat_ids = filterCriteriaPackages.catIds || ""

        let min_distance = filterCriteriaPackages.distanceRange[0]
        let max_distance = filterCriteriaPackages.distanceRange[1]
        let min_price = filterCriteriaPackages.priceRange[0]
        let max_price = filterCriteriaPackages.priceRange[1]
        let sort_on = filterCriteriaPackages.sort_on || ""
        let lab_name = filterCriteriaPackages.lab_name || ""
        let network_id = filterCriteriaPackages.network_id || ""
        let max_age=filterCriteriaPackages.max_age || ""
        let min_age=filterCriteriaPackages.min_age || ""
        let gender=filterCriteriaPackages.gender || ""
        let package_type=filterCriteriaPackages.packageType || ""
        let test_ids = filterCriteriaPackages.test_ids || ""
        let page=1
        
        let url
        alert(this.props.forTaxSaver)
        if(this.props.forSeo){
            url = `${window.location.pathname}`
        }else if(this.props.forTaxSaver){
            url = `${window.location.pathname}?forTaxSaver=true&lat=${lat}&long=${long}&category_ids=${cat_ids}`
        }else{
            // url = `${window.location.pathname}?lat=${lat}&long=${long}&category_ids=${cat_ids}`
            url = `${window.location.pathname}?min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}&locationType=${locationType || ""}&network_id=${network_id}&category_ids=${cat_ids}&min_age=${min_age}&max_age=${max_age}&gender=${gender}&package_type=${package_type}&test_ids=${test_ids}&page=${page}`
        }
        
        if (this.state.lab_card) {
            url += `&lab_card=true`
        }

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
        if (this.state.seoFriendly) {
            title = ""
        }
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {
        let LOADED_LABS_SEARCH = true
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}/full-body-checkup-health-packages`,
                    title: 'Full Body Checkup - Book Health Checkup Packages & get 50% off - docprime',
                    description: 'Book Full Body Checkup Packages and get 50% off. Health Checkup packages includes &#10003 60Plus Tests & &#10003 Free Home Sample Collection starting at Rs. 499.'
                }} noIndex={false} />                
                <CriteriaSearch {...this.props} checkForLoad={LOADED_LABS_SEARCH || this.state.showError} title="Search for Test and Labs." goBack={true} lab_card={!!this.state.lab_card} newChatBtn={true} searchPackages={true} >
                    <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} applyCategories={this.applyCategories.bind(this)}seoData={this.state.seoData} lab_card={!!this.state.lab_card} />
                    <PackagesLists {...this.props} getLabList={this.getLabList.bind(this)} lab_card={!!this.state.lab_card} />
                </CriteriaSearch>
                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default SearchPackagesView
