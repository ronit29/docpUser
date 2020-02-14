import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import IpdHospitalList from './IpdHospitalList.js'
import Loader from '../commons/Loader'
import Footer from '../commons/Home/footer'
import StickyTopBarFilter from './StickyTopBarFilter.js'
const queryString = require('query-string')
import GTM from '../../helpers/gtm.js'
import HelmetTags from '../commons/HelmetTags'
import CONFIG from '../../config'
import BreadCrumbView from './breadCrumb.js'

class IpdHospitalView extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			search_id: '',
            setSearchId: false,
            seoFriendly: this.props.match.url.includes('-ipdhp') || this.props.match.url.includes('-hspcit') || this.props.match.url.includes('-hsplitcit')

		}
	}

	componentDidMount(){

        let ipd_id = ''
        if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) {
            ipd_id = this.props.commonSelectedCriterias.map(x=>x.id)[0]    
        }
        
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'IpdHospitalSearchPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-search-page-landed', selectedId: ipd_id
        }
        GTM.sendEvent({ data: gtmData })

		const parsed = queryString.parse(this.props.location.search)
       // if (this.props.mergeUrlState) {
            let getSearchId = true
            if (this.props.location.search.includes('search_id')) {
                //if search id exist in url then we get data for that search id from store
                if (this.props.search_id_data && this.props.search_id_data[parsed.search_id] && this.props.search_id_data[parsed.search_id].data && Object.values(this.props.search_id_data[parsed.search_id].data).length) {

                    getSearchId = false
                    if (this.props.search_id_data[parsed.search_id].data.result && this.props.search_id_data[parsed.search_id].data.result.length && !this.props.getNewResults && !this.props.fetchNewResults) {

                        this.setState({ search_id: parsed.search_id }, () => {
                            this.props.getIpdSearchIdResults(parsed.search_id, this.props.search_id_data[parsed.search_id])

                        })

                    } else {
                        let filterCriteria = {}
                        let { criteria, filters } = this.buildUrlState(this.props.search_id_data[parsed.search_id].commonSelectedCriterias, this.props.search_id_data[parsed.search_id].filterCriteria)

                        filterCriteria.commonSelectedCriterias = criteria
                        filterCriteria.filterCriteria = filters
                        this.setState({ search_id: parsed.search_id }, () => {
                            let page = 1
                            page = parsed.page || 1

                            this.props.setIpdSearchId(parsed.search_id, filterCriteria, page)
                        })
                    }

                }
            }

            if (getSearchId) {
                //If no searchId in url then we create search id and store data corresponding to that search id
                let filterCriteria = {}
                let { criteria, filters } = this.buildUrlState(this.props.nextSelectedCriterias, this.props.nextFilterCriteria)
                filterCriteria.commonSelectedCriterias = criteria
                filterCriteria.filterCriteria = filters
                let search_id = this.generateSearchId()
                if (window) {
                    window.scrollTo(0, 0)
                }
                this.props.mergeIpdCriteria({fetchNewResults:false})
                this.setState({ search_id: search_id }, () => {
                    let new_url = this.buildURI(this.props)
                    this.props.history.replace(new_url)
                    this.props.setIpdSearchId(search_id, filterCriteria, parsed.page || 1)
                })
            }
	}

    buildUrlState(selectedCriteria, filterCriteria){
        const parsed = queryString.parse(this.props.location.search)
        let criteria =[]
        let filters = {
            distance: [],
            provider_ids: [],
            network_id :''
        }

        if(parsed.ipd_id){
            criteria.push({id: parsed.ipd_id, name: ''})
        }else if(selectedCriteria.length){
            criteria.push({id: selectedCriteria[0].id, name: ''})
        }

        if(parsed.min_distance){
            filters.distance.push(parseInt(parsed.min_distance))
        }else{
            filters.distance.push(filterCriteria.distance[0])
        }

        if(parsed.max_distance){
            filters.distance.push(parseInt(parsed.max_distance))
        }else{
            filters.distance.push(filterCriteria.distance[1])
        }

        if(parsed.provider_ids){
            let providers = []
            parsed.provider_ids.split(',').map((x)=>{
                providers.push(parseInt(x))
            })
            filters.provider_ids = providers
        }else{
            filters.provider_ids.concat(filterCriteria.provider_ids)
        }

        if(parsed.network_id) {
            filters.network_id = parsed.network_id
        }else {
            filters.network_id = filterCriteria.network_id
        }

        return({criteria, filters})

    }

    componentWillReceiveProps(nextProps){

        const parsed = queryString.parse(nextProps.location.search)
        let search_id = ''
        if(parsed.search_id){
            search_id = parsed.search_id
        }
        if(nextProps.fetchNewResults && (nextProps.fetchNewResults != this.props.fetchNewResults && this.state.search_id)){
            this.setState({setSearchId: true}, ()=>{
                this.getIpdHospitalList(nextProps)    
            })
        }else if (nextProps.fetchNewResults && this.state.search_id && (this.state.search_id == search_id) && !this.state.setSearchId) {
            this.setState({ setSearchId: true }, ()=> {
                this.getIpdHospitalList(nextProps)    
            })
            
        }else if(nextProps.locationFetched != this.props.locationFetched){
            //Whenever location changes make api calls
            this.getIpdHospitalList(nextProps)
        }
    }

    getIpdHospitalList(state, page=null, cb=null){
        //apply filters and get updated data
        const parsed = queryString.parse(this.props.location.search)
        
        if (!state) {
            state = this.props
        }

        if(!page && parsed.page){
            page = parsed.page || 1
        }else{
            page = page || 1
        }

        let searchUrl = null
        if (state.match.url.includes('-ipdhp') || state.match.url.includes('-hspcit') || state.match.url.includes('-hsplitcit')) {
            searchUrl = state.match.url.toLowerCase()
        }

        this.props.getIpdHospitals(state, page, false, searchUrl, (...args) => {

            if(cb)cb(...args)
            let new_url = this.buildURI(state)
            this.props.history.replace(new_url)
        })
    }

	buildURI(state) {
        //keep on updating url with the updated filters 
        const parsed = queryString.parse(this.props.location.search)

        let { selectedLocation, commonSelectedCriterias, filterCriteria, locationType } = state
        
        let page = 1
        let ipd_id = commonSelectedCriterias.map(x=>x.id)
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

        let min_distance = filterCriteria.distance[0]
        let max_distance = filterCriteria.distance[1]
        let provider_ids = filterCriteria.provider_ids
        let network_id = filterCriteria.network_id

        let url = ''

        //Check if any filter applied 
        let is_filter_applied = false
        let is_params_exist = false

        
        if (parseInt(min_distance) != 0) {
            is_filter_applied = true
        }
        if (parseInt(max_distance) != 20) {
            is_filter_applied = true
        }
        if (provider_ids && provider_ids.length) {
            is_filter_applied = true
        }

        if(is_filter_applied || !this.state.seoFriendly) {

            url = `${window.location.pathname}?ipd_id=${ipd_id}&min_distance=${min_distance}&max_distance=${max_distance}&provider_ids=${provider_ids}&search_id=${this.state.search_id}&lat=${lat}&long=${long}&place_id=${place_id}&network_id=${network_id}`

            is_params_exist = true


        }else if(this.state.seoFriendly) {

            url = `${window.location.pathname}`
        }

        if (parsed.page) {
            url += `${is_params_exist ? '&' : '?'}page=${parsed.page}`
            is_params_exist = true
        }

        if(parsed.utm_source) {
            url+= `${is_params_exist ? '&' : '?'}utm_source=${parsed.utm_source||''}`
            is_params_exist = true
        }

        if(parsed.utm_medium) {
            url+= `${is_params_exist ? '&' : '?'}utm_medium=${parsed.utm_medium||''}`
            is_params_exist = true
        }

        if(parsed.utm_campaign) {
            url+= `${is_params_exist ? '&' : '?'}utm_campaign=${parsed.utm_campaign||''}`
            is_params_exist = true
        }

        return url
    }

    generateSearchId(uid_string) {
        //method to generate search id
        uid_string = 'xyyyxxyx-xxyx-4xxx-yxxx-xxxyyyxxxxxx'
        var dt = new Date().getTime();
        var uuid = uid_string.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

	getMoreResults(){
		this.getIpdHospitalList(this.props)
	}

    getMetaTagsData(seoData) {
        let title = "Hospital Search"
        if (this.state.seoFriendly) {
            title = ""
        }
        let description = ""
        if (seoData) {
            title = seoData.title?seoData.title:title
            description = seoData.description || ""
        }
        return { title, description }
    }

	render(){
		let { hospital_list } = this.props
        let url = `${CONFIG.API_BASE_URL}${this.props.location.pathname}`
        url = url.replace(/&page=\d{1,}/, "")
        let page = ""
        let curr_page = parseInt(this.props.page)
        let prev = ""
        if (curr_page > 1) {
            page = `?page=${curr_page}`
            prev = url
            if (curr_page > 2) {
                prev += `?page=${curr_page - 1}`
            }
        }
        let next = ""
        let count = this.props.hospital_search_results && this.props.hospital_search_results.count?parseInt(this.props.hospital_search_results.count):0

        if (count > curr_page * 20) {
            next = url + `?page=${curr_page + 1}`
        }

        // do not set rel next/prev for non seoFriendly pages
        if (!this.state.seoFriendly) {
            next = ""
            prev = ""
        }

		return(
				<div className="profile-body-wrap">
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}${page}`,
                    title: this.getMetaTagsData(this.props.hospitalSearchSeoData).title,
                    description: this.getMetaTagsData(this.props.hospitalSearchSeoData).description,
                    prev: prev,
                    next: next
                }} />
                <ProfileHeader showSearch={true} />
                    {
                        this.props.HOSPITAL_SEARCH_DATA_LOADED?
                        <section className="container parent-section book-appointment-section breadcrumb-mrgn">
                            {
                                this.props.hospitalBreadcrumb && this.props.hospitalBreadcrumb.length?
                                <BreadCrumbView breadcrumb={this.props.hospitalBreadcrumb} {...this.props}/>
                                :''
                            }
                            <div className="row main-row parent-section-row">
                                <LeftBar />
                                <div className="col-12 col-md-7 col-lg-7 center-column">
                                    <StickyTopBarFilter {...this.props} fetchNewResults={this.getMoreResults.bind(this)}/>
                                    <div className ="ipd-section">
                                        {
                                            hospital_list.length>0?
                                            <div className="tab-content">
                                                <div className="tab-pane fade" id="nav-hospital">
                                                    <IpdHospitalList {...this.props} getIpdHospitalList={this.getIpdHospitalList.bind(this)}/>
                                                </div>
                                            </div>
                                            :''
                                        }
                                        
                                    </div>
                                </div>
                                <RightBar extraClass=" chat-float-btn-2" msgTemplate="gold_general_template"/>
                            </div>
                        </section>
                        :<Loader />
                    }
	                
                    {
                        this.props.hospital_bottom_content && this.props.hospital_bottom_content.length && parseInt(this.props.page) == 1 ?
                            <div className="col-12 mrt-20">
                                <div className="search-result-card-collpase" dangerouslySetInnerHTML={{ __html: this.props.hospital_bottom_content }}>
                                </div>
                            </div>
                            : ''
                    }
		            <Footer />
	           	</div>

			)
	}
}

export default IpdHospitalView