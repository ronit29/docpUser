import React from 'react';

import PackagesLists from '../searchPackages/packagesList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar/newTopBar.js'
import NAVIGATE from '../../../helpers/navigate/index.js';
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import Footer from '../../commons/Home/footer'
import ResultCount from './topBar/result_count.js'
import GTM from '../../../helpers/gtm.js'
import NonIpdPopupView from '../../commons/nonIpdPopup.js'
const queryString = require('query-string');
import STORAGE from '../../../helpers/storage'

class SearchPackagesView extends React.Component {
    constructor(props) {
        super(props)
        let seoData = null
        let footerData = null
        if (this.props.initialServerData) {
            seoData = this.props.initialServerData.seoData
            footerData = this.props.initialServerData.footerData
        }
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            seoData, footerData,
            showError: false,
            showChatWithus: false,
            isScroll: true,
            isCompare: false,
            quickFilter: {},
            showNonIpdPopup: parsed.show_popup,
            to_be_force:1,
            is_lead_enabled:true
        }
    }

    componentDidMount() {
        if (true) {
            this.getLabList(this.props)
        }
        const parsed = queryString.parse(this.props.location.search)
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }

        if (window) {
            window.scrollTo(0, 0)
        }

        try{ // save utm params if exists
            if(parsed.utm_source && parsed.utm_source=='OfflineAffiliate'){
                let sessionId = Math.floor(Math.random() * 103)*21 + 1050
                if(sessionStorage) {
                    sessionStorage.setItem('sessionIdVal',sessionId)   
                }
                let spo_tags = {
                    utm_tags: {
                        utm_source: parsed.utm_source||'',
                        utm_term: parsed.utm_term||'',
                        utm_medium: parsed.utm_medium||'',
                        utm_campaign: parsed.utm_campaign||''
                    },
                    time: new Date().getTime(),
                    currentSessionId: sessionId
                }
                this.props.setCommonUtmTags('spo', spo_tags)
            }
        }catch(e) {

        }

        //Clear Utm tags for SPO, after 15 minutes
        let currentTime = new Date().getTime()
        if(sessionStorage && sessionStorage.getItem('sessionIdVal') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x=>x.type=='spo').length) {

            let spo_tags = this.props.common_utm_tags.filter(x=>x.type=='spo')[0]
            let sessionVal = parseInt(sessionStorage.getItem('sessionIdVal'))
            if(spo_tags.time && sessionVal == parseInt(spo_tags.currentSessionId)){
                let time_offset = (currentTime - spo_tags.time)/60000
                //Clear SPO utm tags after 15minutes
                //900
                if(time_offset>180) { // remove spo utm params if exists
                    this.props.unSetCommonUtmTags('spo') 
                }
            }
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

    getLabList(state = null, page = null, cb = null) { 
        const parsed = queryString.parse(this.props.location.search)
        if (page === null) {
            page = this.props.page
        }
        if (!state) {
            state = this.props
        } else if (state.page) {
            page = state.page
        }
        let extra_params = {}

        if(parsed.utm_term){
            extra_params.utm_term = parsed.utm_term || ""
        }

        if(parsed.utm_medium){
            extra_params.utm_medium = parsed.utm_medium || ""
        }

        if(parsed.utm_campaign){
            extra_params.utm_campaign = parsed.utm_campaign || ""
        }

        if(parsed.utm_source){
           extra_params.utm_source = parsed.utm_source || ""
        }
        this.props.getPackages(state, page, false, null,extra_params, (...args) => { //get searched packages result
            // this.setState({ seoData: args[1] })
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

    applyFilters(filterState) { // apply filters
        // this.props.mergeLABState({ filterCriteria: filterState })
        this.resetQuickFilters()
        this.props.mergeLABState({ filterCriteriaPackages: filterState })
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    resetQuickFilters() {
        this.setState({ quickFilter: {} })
    }

    applyCategories(categoryState, filterstate) { // apply category filter
        let newCategoryState = {}
        newCategoryState['catIds'] = categoryState

        /*newCategoryState['distanceRange']=filterstate.distanceRange
        newCategoryState['priceRange']=filterstate.priceRange
        newCategoryState['sort_on']=filterstate.sort_on
        newCategoryState['max_price'] = filterstate.max_price
        
        */
        newCategoryState['sort_on'] = filterstate.sort_on
        newCategoryState['sort_order'] = filterstate.sort_order
        newCategoryState['avg_ratings'] = filterstate.avg_ratings
        newCategoryState['home_visit'] = filterstate.home_visit
        newCategoryState['lab_visit'] = filterstate.lab_visit
        newCategoryState['max_age'] = filterstate.max_age
        newCategoryState['min_age'] = filterstate.min_age
        newCategoryState['gender'] = filterstate.gender
        newCategoryState['packageType'] = filterstate.packageType
        newCategoryState['test_ids'] = filterstate.test_ids
        newCategoryState['package_ids'] = filterstate.package_ids

        // this.props.mergeLABState({ filterCriteria: newCategoryState })
        this.props.mergeLABState({ filterCriteriaPackages: newCategoryState })
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    comparePackage() { // to compare differnt packages 
        let data = {
            'Category': 'ConsumerApp', 'Action': 'CompareButton', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'compare-button-click'
        }
        GTM.sendEvent({ data: data })
        if(this.props.packagesList.count == 1){
            if(this.props.packagesList.result){
                let packages={}
                let selectedPkgCompareIds=[]
                packages.id=this.props.packagesList.result[0].id
                packages.lab_id=this.props.packagesList.result[0].lab.id
                packages.img=this.props.packagesList.result[0].lab.lab_thumbnail
                packages.name=this.props.packagesList.result[0].name
                this.props.togglecompareCriteria(packages)
                if(this.props.compare_packages && this.props.compare_packages.length >0){
                      this.props.compare_packages.map((packages, i) => {
                        if(packages.id != this.props.packagesList.result[0].id && packages.lab_id != this.props.packagesList.result[0].lab.id){ 
                          selectedPkgCompareIds.push(packages.id+'-'+packages.lab_id)
                        }
                      })
                }
                selectedPkgCompareIds.push(this.props.packagesList.result[0].id+'-'+this.props.packagesList.result[0].lab.id)
                this.props.history.push('/package/compare?package_ids='+selectedPkgCompareIds)
            }
        } else {
            this.setState({ isCompare: !this.state.isCompare }, () => {
                if (this.props.compare_packages && this.props.compare_packages.length > 0) {
                    this.props.resetPkgCompare() 
                }
            })
        }
    }

    toggleComparePackages(packageId, labId, pckImg, pckName) { // toggle packages for comparision
        let packages = {}
        packages.id = packageId
        packages.lab_id = labId
        packages.img = pckImg
        packages.name = pckName
        this.props.togglecompareCriteria(packages)
    }

    buildURI(state) { // build url with differnt params or differnt filters
        let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType, filterCriteriaPackages, page } = state
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

        /*let min_distance = filterCriteriaPackages.distanceRange[0]
        let max_distance = filterCriteriaPackages.distanceRange[1]
        let min_price = filterCriteriaPackages.priceRange[0]
        let max_price = filterCriteriaPackages.priceRange[1]
        */
        let sort_on = filterCriteriaPackages.sort_on || ""
        let sort_order = filterCriteriaPackages.sort_order || ""
        let avg_ratings = filterCriteriaPackages.avg_ratings || ""
        let home_visit = filterCriteriaPackages.home_visit || false
        let lab_visit = filterCriteriaPackages.lab_visit || false
        let lab_name = filterCriteriaPackages.lab_name || ""
        let network_id = filterCriteriaPackages.network_id || ""
        let max_age = filterCriteriaPackages.max_age || ""
        let min_age = filterCriteriaPackages.min_age || ""
        let gender = filterCriteriaPackages.gender || ""
        let package_type = filterCriteriaPackages.packageType || ""
        let test_ids = filterCriteriaPackages.test_ids || ""
        let package_ids = filterCriteriaPackages.package_ids || ""       
        // let package_category_ids = filterCriteriaPackages.package_category_ids || ""

        let url
        const parsed = queryString.parse(this.props.location.search)
        let package_category_ids = parsed.package_category_ids
        if (this.props.forTaxSaver) {
            url = `${window.location.pathname}?lat=${lat}&long=${long}`
        } else {
            url = `${window.location.pathname}?lat=${lat}&long=${long}&sort_on=${sort_on}&sort_order=${sort_order}&avg_ratings=${avg_ratings}&home_visit=${home_visit}&lab_visit=${lab_visit}&lab_name=${lab_name}&place_id=${place_id}&locationType=${locationType || ""}&network_id=${network_id}&category_ids=${cat_ids}&min_age=${min_age}&max_age=${max_age}&gender=${gender}&package_type=${package_type}&test_ids=${test_ids}&package_ids=${package_ids}`
        }

        if (page > 1) {
            url += `&page=${page}`
        }
        
        if(parsed.package_category_ids){
            url += `&package_category_ids=${package_category_ids}`
        }

        if (parsed.scrollbyid) {
            let scrollby_test_id = parseInt(parsed.scrollbyid)
            let scrollby_lab_id = parseInt(parsed.scrollbylabid)
            // url += `&scrollbyid=${scrollby_test_id || ""}&scrollbylabid=${scrollby_lab_id || ""}`
            url += `&scrollbyid=${scrollby_test_id || ""}`
        }

        if (parsed.isComparable) {
            url += '&isComparable=true'
        }
        
        if(parsed.utm_term){
            url += `&utm_term=${parsed.utm_term || ""}`
        }

        if(parsed.utm_medium){
            url += `&utm_medium=${parsed.utm_medium || ""}`
        }

        if(parsed.utm_campaign){
            url += `&utm_campaign=${parsed.utm_campaign || ""}`
        }

        if(parsed.utm_source){
            url += `&utm_source=${parsed.utm_source || ""}`
        }

        if(this.state.showNonIpdPopup){
            url += `${'&show_popup='+ this.state.showNonIpdPopup}`
        }

        return url
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

    applyQuickFilter(filter) {
        this.setState({ quickFilter: filter })
    }

    nonIpdLeads(phone_number){ // create of non ipd packages leads
        const parsed = queryString.parse(this.props.location.search)
        let package_name = null
        if(this.props.packagesList && this.props.packagesList.result && this.props.packagesList.result.length>1){
            package_name = this.props.packagesList.result[0].name
        }else{
            package_name = 'Health Packages'
        }
        let data =({phone_number:phone_number,lead_source:'Labads',source:parsed,lead_type:'LABADS',test_name:package_name,exitpoint_url : 'http://docprime.com' + this.props.location.pathname})
        if(this.props.common_utm_tags && this.props.common_utm_tags.length){
            data.utm_tags = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
        }
        let visitor_info = GTM.getVisitorInfo()
            if(visitor_info && visitor_info.visit_id){
                data.visit_id = visitor_info.visit_id
                data.visitor_id = visitor_info.visitor_id
            }
        let gtm_data = {
            'Category': 'ConsumerApp', 'Action': 'NonIpdPackageListingSubmitClick', 'CustomerID': GTM.getUserId() || '', 'event': 'non-ipd-package-listing-submit-click'
        }
        GTM.sendEvent({ data: gtm_data })
        this.props.saveLeadPhnNumber(phone_number)
       if(this.state.is_lead_enabled && !STORAGE.isAgent()){
            this.setState({is_lead_enabled:false})
            this.props.NonIpdBookingLead(data)
            setTimeout(() => {
                this.setState({is_lead_enabled:true})
            }, 5000)
        }
       this.setState({to_be_force:0})
    }

    closeIpdLeadPopup(from){
        if(from){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'NonIpdPackageListingCrossClick', 'CustomerID': GTM.getUserId() || '', 'event': 'non-ipd-package-listing-cross-click'
        }
        GTM.sendEvent({ data: data })
            this.setState({to_be_force:0})
        }
    }

    render() {
        let self = this
        const parsed = queryString.parse(this.props.location.search)
        if(this.state.isScroll){
            let scrollby_test_id = parseInt(parsed.scrollbyid)
            let scrollby_lab_id = parseInt(parsed.scrollbylabid)
            // let url_id= `scrollById_${scrollby_test_id}_${scrollby_lab_id}`
            let url_id= `scrollById_${scrollby_test_id}`
            if ( typeof window == "object" && typeof document == "object" && document.getElementById(url_id) ) {
               window.scrollTo(0, document.getElementById(url_id).offsetTop+250)
               self.setState({isScroll:false})
            }
        }
        let isCompared = false

        if (parsed.isComparable) {
            isCompared = true
        }
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}/full-body-checkup-health-packages`,
                    title: `${this.props.packagesList.title || ''}`,
                    description: `${this.props.packagesList.description || ''}`
                }} noIndex={false} />
                {
                    /*(this.state.showNonIpdPopup == 1 || this.state.showNonIpdPopup == 2) && this.props.LOADED_LABS_SEARCH && this.state.to_be_force == 1?
                    <NonIpdPopupView {...this.props} nonIpdLeads={this.nonIpdLeads.bind(this)} closeIpdLeadPopup = {this.closeIpdLeadPopup.bind(this)} is_force={this.state.showNonIpdPopup} is_lab={false}  is_package={true}/>
                    :''*/
                }
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_LABS_SEARCH || this.state.showError} title="Search for Test and Labs." goBack={true} lab_card={!!this.state.lab_card} newChatBtn={true} searchPackages={true} bottom_content={this.props.packagesList && this.props.packagesList.count > 0 && this.props.packagesList.bottom_content && this.props.packagesList.bottom_content != null && this.props.forOrganicSearch ? this.props.packagesList.bottom_content : ''} page={1} isPackage={true}>
                    <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} applyCategories={this.applyCategories.bind(this)} seoData={this.state.seoData} lab_card={!!this.state.lab_card} comparePackage={this.comparePackage.bind(this)} isCompare={this.state.isCompare} isCompared={isCompared} quickFilter={this.state.quickFilter} resetQuickFilters={this.resetQuickFilters.bind(this)} />
                    {
                        this.props.packagesList && this.props.packagesList.result && this.props.packagesList.result.length==0?
                        <div className="container-fluid cardMainPaddingRmv">
                            <div className="pkg-card-container mt-20 mb-3">
                                <div className="pkg-no-result">
                                    <p className="pkg-n-rslt">No result found!</p>
                                    <img className="n-rslt-img" src={ASSETS_BASE_URL + '/img/no-result.png'} />
                                    <p className="pkg-ty-agn cursor-pntr" onClick={this.applyQuickFilter.bind(this, {catId: [],viewMore: true})}>Try again with fewer filters</p>
                                </div>
                            </div>
                        </div>
                        :<React.Fragment>
                            
                            <ResultCount {...this.props} applyFilters={this.applyFilters.bind(this)} applyCategories={this.applyCategories.bind(this)} seoData={this.state.seoData} lab_card={!!this.state.lab_card} />
                            <PackagesLists {...this.props} applyFilters={this.applyFilters.bind(this)} getLabList={this.getLabList.bind(this)} lab_card={!!this.state.lab_card} isCompare={this.state.isCompare} toggleComparePackages={this.toggleComparePackages.bind(this)} isCompared={isCompared} applyQuickFilter={this.applyQuickFilter.bind(this)} />
                    
                        </React.Fragment>    
                    }
                </CriteriaSearch>
                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default SearchPackagesView
