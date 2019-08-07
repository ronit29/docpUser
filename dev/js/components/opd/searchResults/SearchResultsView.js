import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './newTopBar'
import CONFIG from '../../../config'
import GTM from '../../../helpers/gtm'
import HelmetTags from '../../commons/HelmetTags'
import NAVIGATE from '../../../helpers/navigate'
import Footer from '../../commons/Home/footer'
import ResultCount from './topBar/result_count.js'
const queryString = require('query-string');
import SCROLL from '../../../helpers/scrollHelper.js'

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        let seoData = null
        let footerData = null
        if (this.props.initialServerData) {
            seoData = this.props.initialServerData.seoData
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            //seoData, 
            footerData,
            seoFriendly: this.props.match.url.includes('-sptcit') || this.props.match.url.includes('-sptlitcit') || this.props.match.url.includes('-ipddp'),
            clinic_card: this.props.location.search.includes('clinic_card') || null,
            showError: false,
            search_id: '',
            setSearchId: false,
            scrollPosition: 0,
            quickFilter: {},
            detectLocation: false
        }
    }

    componentDidMount() {
        /*let aa = {...SCROLL}
        //aa.init()
        aa.addEvents('map')*/
        const parsed = queryString.parse(this.props.location.search)
        if (this.props.mergeUrlState) {
            let getSearchId = true
            if (this.props.location.search.includes('search_id')) {

                if (this.props.search_id_data && this.props.search_id_data[parsed.search_id] && this.props.search_id_data[parsed.search_id].data) {

                    getSearchId = false
                    if (this.props.search_id_data[parsed.search_id].data.result && this.props.search_id_data[parsed.search_id].data.result.length && !this.props.fetchNewResults) {

                        this.setState({ search_id: parsed.search_id }, () => {
                            this.props.getSearchIdResults(parsed.search_id, this.props.search_id_data[parsed.search_id])

                        })

                    } else {
                        let filters = {}
                        filters.commonSelectedCriterias = this.props.search_id_data[parsed.search_id].commonSelectedCriterias
                        filters.filterCriteria = this.props.search_id_data[parsed.search_id].filterCriteria
                        this.setState({ search_id: parsed.search_id }, () => {
                            let page = 1
                            if (!this.props.fetchNewResults) {
                                page = parsed.page || 1
                            }
                            this.props.setSearchId(parsed.search_id, filters, page)
                        })
                    }

                }
            }

            if (getSearchId) {
                let filters = {}
                filters.commonSelectedCriterias = this.props.nextSelectedCriterias
                filters.filterCriteria = this.props.nextFilterCriteria
                let search_id = this.generateSearchId()
                if (window) {
                    window.scrollTo(0, 0)
                }
                this.setState({ search_id: search_id }, () => {
                    //Check for insured user
                    if (this.props.is_login_user_insured && this.props.insurance_status == 1) {
                        filters.filterCriteria = { ...filters.filterCriteria }
                        filters.filterCriteria.is_insured = true
                    }
                    let new_url = this.buildURI(this.props)
                    this.props.history.replace(new_url)
                    this.props.setSearchId(search_id, filters, parsed.page || 1)
                })

            }


            if (this.props.fetchNewResults) {
                //this.getDoctorList(this.props)
                if (window) {
                    window.scrollTo(0, 0)
                }
            }
        }

        if (this.state.seoFriendly) {
            //this.props.mergeSelectedCriterias()
            let page = 1
            if (parsed && parsed.page) {
                page = parsed.page || 1
            }
            this.props.getFooterData(this.props.match.url.split('/')[1], page).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }
        // if (window) {
        //     window.scrollTo(0, 0)
        // }
    }

    componentWillReceiveProps(props) {
        let search_id = ''
        let page = 1
        const parsed = queryString.parse(props.location.search)
        if (props.location.search.includes('search_id')) {
            search_id = parsed.search_id
        } else if (this.state.search_id) {
            search_id = this.state.search_id
        }
        if (parsed.page) {
            page = parsed.page || 1
        }

        if (props.mergeUrlState && props.mergeUrlState != this.props.mergeUrlState) {
            let filters = {}
            filters.commonSelectedCriterias = props.commonSelectedCriterias
            filters.filterCriteria = props.filterCriteria
            if (search_id) {
                this.setState({ search_id: search_id }, () => {
                    let new_url = this.buildURI(props)
                    this.props.history.replace(new_url)
                    this.props.setSearchId(search_id, filters, page)
                })
            } else {
                search_id = this.generateSearchId()
                this.setState({ search_id: search_id }, () => {
                    let new_url = this.buildURI(props)
                    this.props.history.replace(new_url)
                    //Check if user insured
                    if (props.is_login_user_insured && props.insurance_status == 1) {
                        filters.filterCriteria = { ...filters.filterCriteria }
                        filters.filterCriteria.is_insured = true
                    }

                    this.props.setSearchId(search_id, filters, page)
                })
            }
            if (window) {
                window.scrollTo(0, 0)
            }

        }

        if (props.getNewUrl && props.getNewUrl != this.props.getNewUrl && this.state.search_id) {
            if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
                this.getDoctorList(props)
                // if (window) {
                //     window.scrollTo(0, 0)
                // }
            }
            this.buildURI(props)
        } else if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults && this.state.search_id)) {
            if (this.state.detectLocation && this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) {
                this.props.cloneCommonSelectedCriterias(this.props.commonSelectedCriterias[0])
                let doctor_name = '', hospital_name = '', hospital_id = ''
                let state = {
                    filterCriteria: {
                        ...this.props.nextFilterCriteria,
                        sort_on: "distance",
                        doctor_name, hospital_name, hospital_id
                    },
                    nextFilterCriteria: {
                        ...this.props.nextFilterCriteria,
                        sort_on: "distance",
                        doctor_name, hospital_name, hospital_id
                    }
                }

                this.props.mergeOPDState(state, true)

                this.props.history.push({ pathname: '/opd/searchresults' })
            } else {
                this.setState({ setSearchId: true })
                this.getDoctorList(props)
            }
            // if (window) {
            //     window.scrollTo(0, 0)
            // }
        } else if (props.fetchNewResults && this.state.search_id == search_id && !this.state.setSearchId && this.state.search_id) {
            this.setState({ setSearchId: true })
            this.getDoctorList(props)
            if (window) {
                window.scrollTo(0, 0)
            }
        } else {
            if (props.selectedLocation != this.props.selectedLocation && props.mergeUrlState) {
                let new_url = this.buildURI(props)
                this.props.history.replace(new_url)
            }
        }
    }

    detectLocationClick() {
        this.setState({ detectLocation: true })
    }

    generateSearchId(uid_string) {
        uid_string = 'xxyyxxxx-xxyx-4xxx-yxxx-xxxyyyxxxxxx'
        var dt = new Date().getTime();
        var uuid = uid_string.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    applyFilters(filterState) {
        // clear LANDING_PAGE to enable loader
        if (typeof window == 'object') {
            window.ON_LANDING_PAGE = false
        }
        this.resetQuickFilters()
        let search_id_data = Object.assign({}, this.props.search_id_data)
        const parsed = queryString.parse(this.props.location.search)

        if (this.props.search_id_data && this.state.search_id && this.props.search_id_data[this.state.search_id]) {
            search_id_data[this.state.search_id].filterCriteria = filterState
            search_id_data[this.state.search_id].page = 1
        }
        this.props.mergeOPDState({ filterCriteria: filterState, search_id_data: search_id_data, page: 1 })
        // this.props.setSearchId(this.state.search_id, filterState, false)
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    buildURI(state) {

        const parsed = queryString.parse(this.props.location.search)

        let { selectedLocation, commonSelectedCriterias, filterCriteria, locationType, page } = state
        let specializations_ids = commonSelectedCriterias.filter(x => x.type == 'speciality').map(x => x.id)
        let condition_ids = commonSelectedCriterias.filter(x => x.type == 'condition').map(x => x.id)
        let procedures_ids = commonSelectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)
        let category_ids = commonSelectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.id)

        let ipd_ids = commonSelectedCriterias.filter(x => x.type == 'ipd').map(x => x.id)

        let group_ids = commonSelectedCriterias.filter(x => x.type == 'group_ids').map(x => x.id)

        let lat = 28.644800
        let long = 77.216721
        let place_id = ""
        let locality = 'Delhi'
        let sub_locality = ''

        if (selectedLocation) {
            place_id = selectedLocation.place_id || ""
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))

            locality = selectedLocation.locality || ''
            sub_locality = selectedLocation.sub_locality || ''
        }
/*
        let min_fees = filterCriteria.priceRange[0]
        let max_fees = filterCriteria.priceRange[1]
        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let is_available = filterCriteria.is_available
        let is_female = filterCriteria.is_female

*/      
        let sort_on = filterCriteria.sort_on || ""
        let sort_order = filterCriteria.sort_order || ""
        let availability = filterCriteria.availability || []
        let avg_ratings = filterCriteria.avg_ratings || []
        let gender = filterCriteria.gender || ''
        let sits_at_hospital = filterCriteria.sits_at_hospital
        let sits_at_clinic = filterCriteria.sits_at_clinic


        let hospital_name = filterCriteria.hospital_name || ""
        let doctor_name = filterCriteria.doctor_name || ""
        let hospital_id = filterCriteria.hospital_id || ""
        let is_insured = filterCriteria.is_insured || false



        let url = ''

        //Check if any filter applied 
        let is_filter_applied = false

        if (sort_on) {
            is_filter_applied = true
        }
        if (availability && availability.length) {
            is_filter_applied = true
        }

        if (avg_ratings && avg_ratings.length) {
            is_filter_applied = true
        }

        if (gender) {
            is_filter_applied = true
        }
        if (hospital_name) {
            is_filter_applied = true
        }
        if (doctor_name) {
            is_filter_applied = true
        }
        if (hospital_id) {
            is_filter_applied = true
        }

        let is_params_exist = false

        if (is_filter_applied || !this.state.seoFriendly) {

            url = `${window.location.pathname}?specializations=${specializations_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&sort_on=${sort_on}&sort_order=${sort_order}&availability=${availability}&gender=${gender}&avg_ratings=${avg_ratings}&doctor_name=${doctor_name || ""}&hospital_name=${hospital_name || ""}&place_id=${place_id}&locationType=${locationType || ""}&procedure_ids=${procedures_ids || ""}&procedure_category_ids=${category_ids || ""}&hospital_id=${hospital_id}&ipd_procedures=${ipd_ids || ''}&search_id=${this.state.search_id}&is_insured=${is_insured}&locality=${locality}&sub_locality=${sub_locality}&sits_at_hospital=${sits_at_hospital}&sits_at_clinic=${sits_at_clinic}&group_ids=${group_ids}`

            is_params_exist = true

        } else if (this.state.seoFriendly) {

            url = `${window.location.pathname}`
        }

        if (page > 1) {
            url += `${is_params_exist ? '&' : '?'}page=${page}`
            is_params_exist = true
        }

        if (this.state.clinic_card) {
            url += `${is_params_exist ? '&' : '?'}clinic_card=true`
            is_params_exist = true
        }

        if (parsed.get_feedback) {
            url += `${is_params_exist ? '&' : '?'}get_feedback=${parsed.get_feedback}`
            is_params_exist = true
        }

        if (parsed.showPopup) {
            url += `${is_params_exist ? '&' : '?'}showPopup=${parsed.showPopup}`
            is_params_exist = true
        }

        return url
    }

    getDoctorList(state = null, page = null, cb = null) {
        let searchUrl = null
        if (this.props.match.url.includes('-sptcit') || this.props.match.url.includes('-sptlitcit') || this.props.match.url.includes('-ipddp')) {
            searchUrl = this.props.match.url.toLowerCase()
        }
        if (page === null) {
            page = this.props.page
        }
        if (!state) {
            state = this.props
        } else if (state.page) {
            page = state.page
        }
        this.props.getDoctors(state, page, false, searchUrl, (...args) => {
            // this.setState({ seoData: args[1] })
            if (cb) {
                cb(...args)
                let new_url = this.buildURI(state)
                this.props.history.replace(new_url)
            } else {
                let new_url = this.buildURI(state)
                this.props.history.replace(new_url)
            }
        }, this.state.clinic_card).catch((e) => {
            this.setState({ showError: true })
        })
    }

    getMetaTagsData(seoData) {
        let title = ''
        let description = ""
        if (this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) {
            title = `${this.props.commonSelectedCriterias[0].name} : Book Best ${this.props.commonSelectedCriterias[0].name} Doctors Near You`
            description = `${this.props.commonSelectedCriterias[0].name}: Book appointment with the best ${this.props.commonSelectedCriterias[0].name} from top hospitals and clinics near you at discounted price. Check doctor reviews and more.`
        }
        let schema = {}
        if (seoData) {
            title = seoData.title || title
            description = seoData.description || description
            schema = seoData.schema || schema
        }
        if (parseInt(this.props.page) != 1) {
            title = 'Page ' + this.props.page + ' - ' + title
        }
        return { title, description, schema }
    }

    resetQuickFilters() {
        this.setState({ quickFilter: {} })
    }

    applyQuickFilter(filter) {
        this.setState({ quickFilter: filter })
    }

    isFilterApplied(filterCriteria) {
        //Check if any filter applied 
        let is_filter_applied = false
        if (filterCriteria) {
            let sort_on = filterCriteria.sort_on || ""
            let sort_order = filterCriteria.sort_order || ""
            let availability = filterCriteria.availability || []
            let avg_ratings = filterCriteria.avg_ratings || []
            let gender = filterCriteria.gender || ''
            let sits_at_hospital = filterCriteria.sits_at_hospital
            let sits_at_clinic = filterCriteria.sits_at_clinic


            let hospital_name = filterCriteria.hospital_name || ""
            let doctor_name = filterCriteria.doctor_name || ""
            let hospital_id = filterCriteria.hospital_id || ""
            let is_insured = filterCriteria.is_insured || false

            if (sort_on) {
                is_filter_applied = true
            }
            if (availability && availability.length) {
                is_filter_applied = true
            }

            if (avg_ratings && avg_ratings.length) {
                is_filter_applied = true
            }

            if (gender) {
                is_filter_applied = true
            }
        }

        return is_filter_applied
    }

    searchDoctorSpecialization(speciality,isViewAll) {

        let specialityData={}
        let ViewAllData=[]
        if(isViewAll){
            console.log(speciality)
            speciality.map((spec, i) => {
                ViewAllData.push({id:spec.specialization_id,type:'speciality'})
            })
        
            let state = {}
            let hospital_id =''
            let doctor_name = ''
            let hospital_name = ''
            if (ViewAllData.length) {
                this.props.cloneCommonSelectedCriterias(ViewAllData)
            }

            state = {
                filterCriteria: {
                    ...this.props.filterCriteria,
                    hospital_id, doctor_name, hospital_name
                },
                nextFilterCriteria: {
                    ...this.props.filterCriteria,
                    hospital_id, doctor_name, hospital_name
                }
            }
            let data = {
                'Category': 'ConsumerApp', 'Action': 'SimilarSpecializationsViewAll', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'similar-specializations-viewall'
            }
            GTM.sendEvent({ data: data })
            this.props.mergeOPDState(state)
            this.props.history.push(`/opd/searchresults`)
        }else{
            specialityData.type = 'speciality'
            specialityData.name = speciality.specialization_name
            specialityData.id = speciality.specialization_id
            this.props.toggleOPDCriteria('speciality', specialityData, true)
            setTimeout(() => {
                this.props.history.push('/opd/searchresults')
            }, 100)
            let data = {
                'Category': 'ConsumerApp', 'Action': 'SimilarSpecializations', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'similar-specializations'
            }
            GTM.sendEvent({ data: data })
        }
    }

    SimilarSpecialization(flag){
        let dataLength = parseInt(this.props.similar_specializations.length/2)
        let count = 0
        if (!flag) {
            count = dataLength;
            dataLength = this.props.similar_specializations.length
        }
        let dataModel = []
        for (let i = count; i < dataLength; i++) {
            dataModel.push(<span id={this.props.similar_specializations[i].specialization_id} onClick={this.searchDoctorSpecialization.bind(this,this.props.similar_specializations[i],false)}>
                {this.props.similar_specializations[i].specialization_name}
            </span>)
        }
        return dataModel
    }

    SimilarSpecializationData(){
        let data=(<div className="sort-sub-filter-container mb-3 pb-0">
            <p>Looking for other related   
                <span className="fw-700"> specializations? </span>
                <span className="fw-500 sort-more-filter" onClick={this.searchDoctorSpecialization.bind(this,this.props.similar_specializations,true)}>Search all</span>
            </p>
            <div className="doc-sld-container">
                <div className="sm-chips-container">
                    {this.SimilarSpecialization(true)}
                </div>
                <div className="sm-chips-container">
                    {this.SimilarSpecialization(false)}
                </div>
            </div>
        </div>)
        return data
    }

    render() {
        let show_pagination = this.props.doctorList && this.props.doctorList.length > 0
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
        if (this.props.count > curr_page * 20) {
            next = url + `?page=${curr_page + 1}`
        }

        // do not set rel next/prev for non seoFriendly pages
        if (!this.state.seoFriendly) {
            next = ""
            prev = ""
        }

        // check if this was the landing page
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }
        
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.canonical_url ? `/${this.props.canonical_url}` : this.props.match.url}${page}`,
                    title: this.getMetaTagsData(this.props.seoData).title,
                    description: this.getMetaTagsData(this.props.seoData).description,
                    schema: this.getMetaTagsData(this.props.seoData).schema,
                    seoFriendly: this.state.seoFriendly,
                    prev: prev,
                    next: next,
                    ogType: 'Website',
                    ogSiteName: 'Docprime',
                    ogTitle: this.getMetaTagsData(this.props.seoData).title,
                    ogDescription: this.getMetaTagsData(this.props.seoData).description
                }} />

                <CriteriaSearch {...this.props} checkForLoad={landing_page || this.props.LOADED_DOCTOR_SEARCH || this.state.showError} title="Search For Disease or Doctor." type="opd" goBack={true} clinic_card={!!this.state.clinic_card} newChatBtn={true} searchDoctors={true}>
                    {
                        this.state.showError ? <div className="norf">No Results Found!!</div> : <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={this.props.seoData} clinic_card={!!this.state.clinic_card} seoFriendly={this.state.seoFriendly} resetQuickFilters={this.resetQuickFilters.bind(this)} quickFilter={this.state.quickFilter}/>
                            {/*<ResultCount {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={this.props.seoData} clinic_card={!!this.state.clinic_card} seoFriendly={this.state.seoFriendly} />*/}
                            {/* <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                                <img src={ASSETS_BASE_URL + "/img/banners/banner_doc.png"} className="banner-img" />
                            </div> */}
                            {
                                (this.state.clinic_card && this.props.hospitalList && this.props.hospitalList.length==0) || this.props.doctorList && this.props.doctorList.length ==0?
                                <React.Fragment>
                                <div className="container-fluid cardMainPaddingRmv">
                                    <div className="pkg-card-container mt-20 mb-3">
                                        <div className="pkg-no-result">
                                            <p className="pkg-n-rslt">No result found!</p>
                                            {
                                                this.isFilterApplied(this.props.filterCriteria)?
                                                <React.Fragment>
                                                    <img className="n-rslt-img" src={ASSETS_BASE_URL + '/img/no-result.png'} />
                                                    <p className="pkg-ty-agn cursor-pntr" onClick={this.applyQuickFilter.bind(this, {viewMore: true})}>Try again with fewer filters</p>
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <img style={{width:'130px'}} className="n-rslt-img" src={ASSETS_BASE_URL + '/img/vct-no.png'} />
                                                    <p className="pkg-ty-agn text-dark text-center">Can’t find your doctor here?<br></br>Help us to list your doctor</p>
                                                    <button className="referDoctorbtn" onClick={()=>{this.props.history.push('/doctorsignup?member_type=1')}}>Refer your Doctor</button>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                    {this.props.similar_specializations && this.props.similar_specializations.length && !this.state.sort_order && (!this.state.availability || !this.state.availability.length) && this.props.count ==0 ?
                                    this.SimilarSpecializationData()
                                : ''
                                }
                                </div>
                                
                                </React.Fragment>
                                :<React.Fragment>
                                    <DoctorsList {...this.props} applyFilters={this.applyFilters.bind(this)}  getDoctorList={this.getDoctorList.bind(this)} clinic_card={!!this.state.clinic_card} seoFriendly={this.state.seoFriendly} detectLocationClick={() => this.detectLocationClick()}  applyQuickFilter={this.applyQuickFilter.bind(this)} SimilarSpecializationData={this.SimilarSpecializationData.bind(this)}/>

                                    {
                                        this.state.seoFriendly && show_pagination ? <div className="art-pagination-div">
                                            {
                                                prev ? <a href={prev} >
                                                    <div className="art-pagination-btn">
                                                        <span className="fw-500">{curr_page - 1}</span>
                                                    </div>
                                                </a> : ""
                                            }

                                            <div className="art-pagination-btn">
                                                <span className="fw-500" style={{ color: '#000' }}>{curr_page}</span>
                                            </div>

                                            {
                                                next ? <a href={next} >
                                                    <div className="art-pagination-btn">
                                                        <span className="fw-500">{curr_page + 1}</span>
                                                    </div>
                                                </a> : ""
                                            }

                                        </div> : ""
                                    }
                                </React.Fragment>
                            }

                        </div>
                    }
                </CriteriaSearch>


                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default SearchResultsView
