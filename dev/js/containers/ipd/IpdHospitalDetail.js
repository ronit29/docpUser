import React from 'react'
import { connect } from 'react-redux'
import { getHospitaDetails , selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, toggleIPDCriteria, mergeOPDState, ipdChatView, checkIpdChatAgentStatus, getHospitalComments, postHospitalComments, mergeIpdCriteria, clearVipSelectedPlan, NonIpdBookingLead } from '../../actions/index.js'

import IpdHospitalDetailView from '../../components/ipd/IpdHospitalDetailView.js'
const queryString = require('query-string')
import Loader from '../../components/commons/Loader'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'
import HelmetTags from '../../components/commons/HelmetTags'
import CONFIG from '../../config'
import BreadCrumbView from '../../components/ipd/breadCrumb.js'
import Disclaimer from '../../components/commons/Home/staticDisclaimer.js'



class HospitalDetail extends React.Component {

	constructor(props) {
		super(props)
		let h_id = this.props.match.params.hospitalId || this.get_hospital_id_by_url(this.props.match.url)
		this.state = {
			specialization_id: null,
			hospital_id: h_id,
			is_seo: this.props.match.url.includes('-hpp'),
			showIpdChat: false
		}
	}

	static loadData(store, match, query){
		let searchUrl = null
        if (match.url.includes('-hpp') ) {
            searchUrl = match.url.toLowerCase()
        }
        return new Promise((resolve, reject)=>{
        	try{
        		
        		return store.dispatch(getHospitaDetails(match.params.hospitalId, null, searchUrl, query.specialization_id || '', (resp)=>{
        			if(resp && resp.id){
        				store.dispatch(getHospitalComments(resp.id))
        			}
        			if(resp && resp.status && resp.status==301){
        				resolve({ status: 301 })
        			}else{
        				resolve({})
        			}
        		}) )
        	}catch(e){
        		reject()
        	}
        })
	}

	static contextTypes = {
        router: () => null
    }

    get_hospital_id_by_url(url) {
        for (let d_id in this.props.ipd_hospital_detail_info) {
            if (this.props.ipd_hospital_detail_info[d_id].canonical_url && url && url.includes(this.props.ipd_hospital_detail_info[d_id].canonical_url)) {
                return d_id
            }
        }
        return null
    }

	componentDidMount(){
		
		let searchUrl = null
        if (this.props.match.url.includes('-hpp') ) {
            searchUrl = this.props.match.url.toLowerCase()
        }

        const parsed = queryString.parse(this.props.location.search)
        let specialization_id = ''
        if(parsed.specialization_id){
        	specialization_id = parsed.specialization_id
        	this.setState({specialization_id: parsed.specialization_id})
        }
        let hospitalId = searchUrl?'':this.props.match.params.hospitalId
        //if(!this.state.hospital_id || !this.props.ipd_hospital_detail_info || !this.props.ipd_hospital_detail_info[this.state.hospital_id]) {
        	this.props.getHospitaDetails(hospitalId, this.props.selectedLocation, searchUrl, specialization_id, (resp) => {
        		if(resp && resp.status && resp.status==301){
        			this.props.history.push(`/${resp.url}`)
        		}else if(resp && resp.id) {
        			this.props.getHospitalComments(resp.id)
        			this.setState({hospital_id: resp.id})
        		}
        	})	
        //}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.locationFetched != nextProps.locationFetched){
			let searchUrl = null
	        if (this.props.match.url.includes('-hpp') ) {
	            searchUrl = this.props.match.url.toLowerCase()
	        }

	        const parsed = queryString.parse(this.props.location.search)
	        let specialization_id = ''
	        if(parsed.specialization_id){
	        	specialization_id = parsed.specialization_id
	        	this.setState({specialization_id: parsed.specialization_id})
	        }

	       // if(!this.state.hospital_id || !nextProps.ipd_hospital_detail_info || !nextProps.ipd_hospital_detail_info[this.state.hospital_id]) {
	       		
	        	this.props.getHospitaDetails(this.props.match.params.hospitalId, nextProps.selectedLocation, searchUrl, specialization_id, (resp) => {
	        		if(resp && resp.status && resp.status==301){
	        			this.props.history.push(`/${resp.url}`)
	        		}else if(resp && resp.id) {
	        			this.props.getHospitalComments(resp.id)		
	        			this.setState({hospital_id: resp.id})
	        		}
	        	})
	        //}
		}
	}

	getMetaTagsData(seoData) {
		let title = "Hospital Profile Page"
		let description = ""
		let schema = {}
		if (seoData) {
			title = seoData && seoData.seo && seoData.seo.title?seoData.seo.title :seoData.name_city?`${seoData.name_city} | Book Appointment, Check Doctors List, Reviews, Contact Number`:''
			description = seoData && seoData.seo && seoData.seo.description?seoData.seo.description :seoData.name_city?`${seoData.name_city} : Get free booking on first appointment.Check ${seoData.name?seoData.name:''} Doctors List, Reviews, Contact Number, Address, Procedures and more.`:''
		}
		return { title, description, schema }
	}

	showChatView(showIpd=false){
		
		this.setState({showIpdChat: true})
	}

	getSchema(ipd_hospital_detail){
		let hospital_schema = "" 
        let breadcrumb_schema=""
        let itemList_schema=""
        if(ipd_hospital_detail && ipd_hospital_detail.seo && ipd_hospital_detail.seo.all_schema ){
        	ipd_hospital_detail.seo.all_schema.map((schema)=>{
        		try{
        			if(schema['@type']=="Hospital"){
	        			hospital_schema = JSON.stringify(schema)
	        		}
	        		if(schema['@type']=="BreadcrumbList"){
	        			breadcrumb_schema = JSON.stringify(schema)
	        		}
	        		if(schema['@type']=="ItemList"){
	        			itemList_schema = JSON.stringify(schema)
	        		}
        		}catch(e){
        			if(schema['@type']=="Hospital"){
	        			hospital_schema = ''
	        		}
	        		if(schema['@type']=="BreadcrumbList"){
	        			breadcrumb_schema = ''
	        		}
	        		if(schema['@type']=="ItemList"){
	        			itemList_schema = ''
	        		}
        		}
        	})
        }
        return { hospital_schema, breadcrumb_schema, itemList_schema }
	}

	render(){

		let ipd_hospital_detail = this.state.hospital_id && this.props.ipd_hospital_detail_info && this.props.ipd_hospital_detail_info[this.state.hospital_id]?this.props.ipd_hospital_detail_info[this.state.hospital_id]:{}

        let {hospital_schema, breadcrumb_schema, itemList_schema} = this.getSchema(ipd_hospital_detail)

		let isSeoValid= true
        if(CONFIG.SEO_FRIENDLY_HOSPITAL_IDS && this.state.hospital_id &&  CONFIG.SEO_FRIENDLY_HOSPITAL_IDS.indexOf(parseInt(this.state.hospital_id))> -1){
            isSeoValid = false
        }
		return(
				<div className="profile-body-wrap">
					<ProfileHeader showSearch={true} pageType='HospitalDetailPage' new_fixed_header={1}/>
					<HelmetTags tagsData={{
						canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
						title: this.getMetaTagsData(ipd_hospital_detail ? ipd_hospital_detail : null).title,
						description: this.getMetaTagsData(ipd_hospital_detail ? ipd_hospital_detail : null).description
					}} noIndex={!this.state.is_seo || !isSeoValid} />
					{
                        hospital_schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                            __html: hospital_schema
                        }} /> : ""
                    }
                    {
                        breadcrumb_schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                            __html: breadcrumb_schema
                        }} /> : ""
                    }
                    {
                        itemList_schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                            __html: itemList_schema
                        }} /> : ""
                    }
					<section className="container parent-section book-appointment-section breadcrumb-mrgn  hospital-view-section">
						{
							ipd_hospital_detail && ipd_hospital_detail.breadcrumb &&	
								<BreadCrumbView breadcrumb={ipd_hospital_detail.breadcrumb} {...this.props} />
						}


						<div className="row main-row parent-section-row">
							<LeftBar />
							<div className="col-12 col-md-7 col-lg-7 center-column">
							{
								ipd_hospital_detail && ipd_hospital_detail.id?
								<IpdHospitalDetailView {...this.props} {...this.state} ipd_hospital_detail={ipd_hospital_detail} showChatView={this.showChatView.bind(this)}/>
								:<Loader />		
							}
						</div>
						<RightBar extraClass=" chat-float-btn-2" showHalfScreenChat={false && this.props.ipd_chat && this.props.ipd_chat.showIpdChat?true:false} showDesktopIpd={true} ipdFormParams={this.state.showIpdChat ?true:false} msgTemplate="gold_general_template"/>
						</div>
					</section>
					<Disclaimer />
				</div>
				
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
		ipd_chat,
		is_ipd_form_submitted,
		profiles,
		defaultProfile
	} = state.USER

	const {
        selectedLocation,
        locationType,
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD

	const {
		ipd_hospital_detail_info,
		HOSPITAL_DETAIL_LOADED,
		commonSelectedCriterias,
		locationFetched,
		selectedCriterias,
		hospitalComments
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
        locationType,
        ipd_hospital_detail_info,
        HOSPITAL_DETAIL_LOADED,
        commonSelectedCriterias,
        locationFetched,
        selectedCriterias,
        filterCriteria,
        ipd_chat,
        is_ipd_form_submitted,
        hospitalComments,
        profiles,
        defaultProfile
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getHospitaDetails:(hospitalId, selectedLocation, searchByUrl, specialization_id, cb) => dispatch(getHospitaDetails(hospitalId, selectedLocation, searchByUrl, specialization_id, cb)),
		saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
		selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
		mergeOPDState: (state) => dispatch(mergeOPDState(state)),
		ipdChatView: (data) => dispatch(ipdChatView(data)),
		checkIpdChatAgentStatus: (cb) => dispatch(checkIpdChatAgentStatus(cb)),
		getHospitalComments: (hospitalId) => dispatch(getHospitalComments(hospitalId)),
		postHospitalComments: (postData, cb)=> dispatch(postHospitalComments(postData, cb)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria)),
		clearVipSelectedPlan:() => dispatch(clearVipSelectedPlan()),
		NonIpdBookingLead:(data,cb) =>dispatch(NonIpdBookingLead(data, cb)),
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(HospitalDetail)