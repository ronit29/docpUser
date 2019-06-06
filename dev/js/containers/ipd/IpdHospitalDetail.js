import React from 'react'
import { connect } from 'react-redux'
import { getHospitaDetails , selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, toggleIPDCriteria, mergeOPDState, ipdChatView, checkIpdChatAgentStatus } from '../../actions/index.js'

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
		return store.dispatch(getHospitaDetails(match.params.hospitalId, null, searchUrl, query.specialization_id || ''))
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
        if(!this.state.hospital_id || !this.props.ipd_hospital_detail_info || !this.props.ipd_hospital_detail_info[this.state.hospital_id]) {
        	this.props.getHospitaDetails(hospitalId, this.props.selectedLocation, searchUrl, specialization_id, (resp) => {
        		if(resp && resp.id) {
        			this.setState({hospital_id: resp.id})
        		}
        	})	
        }
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

	        if(!this.state.hospital_id || !nextProps.ipd_hospital_detail_info || !nextProps.ipd_hospital_detail_info[this.state.hospital_id]) {
	        	this.props.getHospitaDetails(this.props.match.params.hospitalId, nextProps.selectedLocation, searchUrl, specialization_id, (resp) => {

	        		if(resp && resp.id) {
	        			this.setState({hospital_id: resp.id})
	        		}
	        	})
	        }
		}
	}

	getMetaTagsData(seoData) {
		let title = "Hospital Profile Page"
		if (this.state.is_seo) {
			title = ""
		}
		let description = ""
		if (seoData) {
			title = seoData.title ? seoData.title : title
			description = seoData.description || ""
		}
		return { title, description }
	}

	showChatView(showIpd=false){
		
		this.setState({showIpdChat: true})
	}

	render(){

		let ipd_hospital_detail = this.state.hospital_id && this.props.ipd_hospital_detail_info && this.props.ipd_hospital_detail_info[this.state.hospital_id]?this.props.ipd_hospital_detail_info[this.state.hospital_id]:{}

		return(
				<div className="profile-body-wrap">
					<ProfileHeader showSearch={true} />
					<HelmetTags tagsData={{
						canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
						title: this.getMetaTagsData(ipd_hospital_detail ? ipd_hospital_detail.seo : null).title,
						description: this.getMetaTagsData(ipd_hospital_detail ? ipd_hospital_detail.seo : null).description
					}} noIndex={!this.state.is_seo} />
					<section className="container parent-section book-appointment-section breadcrumb-mrgn">
						{
							ipd_hospital_detail && ipd_hospital_detail.breadcrumb ?
								<BreadCrumbView breadcrumb={ipd_hospital_detail.breadcrumb} {...this.props} />
								: ''
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
						<RightBar extraClass=" chat-float-btn-2" showHalfScreenChat={false && this.props.ipd_chat && this.props.ipd_chat.showIpdChat?true:false} showDesktopIpd={true} ipdFormParams={this.state.showIpdChat ?true:false}/>
						</div>
					</section>
				</div>
				
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
		ipd_chat,
		is_ipd_form_submitted
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
		selectedCriterias
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
        is_ipd_form_submitted
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
		checkIpdChatAgentStatus: (cb) => dispatch(checkIpdChatAgentStatus(cb))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(HospitalDetail)