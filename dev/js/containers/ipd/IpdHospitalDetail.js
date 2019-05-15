import React from 'react'
import { connect } from 'react-redux'
import { getHospitaDetails , selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, toggleIPDCriteria, mergeOPDState } from '../../actions/index.js'

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
		this.state = {
			specialization_id: null
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

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
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
		this.props.getHospitaDetails(hospitalId, this.props.selectedLocation, searchUrl, specialization_id)
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

			this.props.getHospitaDetails(this.props.match.params.hospitalId, nextProps.selectedLocation, searchUrl, specialization_id)
			if(window){
				window.scrollTo(0,0)
			}
		}
	}

	getMetaTagsData(seoData) {
		let title = "Hospital Profile Page"
		if (this.state.seoFriendly) {
			title = ""
		}
		let description = ""
		if (seoData) {
			title = seoData.title ? seoData.title : title
			description = seoData.description || ""
		}
		return { title, description }
	}

	render(){

		return(
				<div className="profile-body-wrap">
					<ProfileHeader showSearch={true} />
					<HelmetTags tagsData={{
						canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
						title: this.getMetaTagsData(this.props.ipd_hospital_detail ? this.props.ipd_hospital_detail.seo : null).title,
						description: this.getMetaTagsData(this.props.ipd_hospital_detail ? this.props.ipd_hospital_detail.seo : null).description
					}} noIndex={!this.state.seoFriendly} />
					<section className="container parent-section book-appointment-section breadcrumb-mrgn">
						{
							this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.breadcrumb ?
								<BreadCrumbView breadcrumb={this.props.ipd_hospital_detail.breadcrumb} {...this.props} />
								: ''
						}
						<div className="row main-row parent-section-row">
							<LeftBar />
							<div className="col-12 col-md-7 col-lg-7 center-column">
							{
								this.props.HOSPITAL_DETAIL_LOADED?
								<IpdHospitalDetailView {...this.props} {...this.state}/>
								:<Loader />		
							}
						</div>
						<RightBar extraClass=" chat-float-btn-2" />
						</div>
					</section>
				</div>
				
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
        selectedLocation,
        locationType,
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD

	const {
		ipd_hospital_detail,
		HOSPITAL_DETAIL_LOADED,
		commonSelectedCriterias,
		locationFetched,
		selectedCriterias
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
        locationType,
        ipd_hospital_detail,
        HOSPITAL_DETAIL_LOADED,
        commonSelectedCriterias,
        locationFetched,
        selectedCriterias,
        filterCriteria
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getHospitaDetails:(hospitalId, selectedLocation, searchByUrl, specialization_id) => dispatch(getHospitaDetails(hospitalId, selectedLocation, searchByUrl, specialization_id)),
		saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
		selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
		mergeOPDState: (state) => dispatch(mergeOPDState(state))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(HospitalDetail)