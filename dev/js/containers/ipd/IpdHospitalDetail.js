import React from 'react'
import { connect } from 'react-redux'
import { getHospitaDetails , selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, toggleIPDCriteria, mergeOPDState } from '../../actions/index.js'

import IpdHospitalDetailView from '../../components/ipd/IpdHospitalDetailView.js'
const queryString = require('query-string')
import Loader from '../../components/commons/Loader'


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

	render(){

		return(
				<React.Fragment>
					{
						this.props.HOSPITAL_DETAIL_LOADED?
						<IpdHospitalDetailView {...this.props} {...this.state}/>
						:<Loader />		
					}
				</React.Fragment>
				
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