import React from 'react'
import { connect } from 'react-redux'
import { getHospitaDetails , selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, toggleIPDCriteria } from '../../actions/index.js'

import IpdHospitalDetailView from '../../components/ipd/IpdHospitalDetailView.js'
const queryString = require('query-string')

class HospitalDetail extends React.Component {

	
	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
		this.props.getHospitaDetails(this.props.match.params.hospitalId, this.props.selectedLocation)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.locationFetched != nextProps.locationFetched){
			this.props.getHospitaDetails(this.props.match.params.hospitalId, nextProps.selectedLocation)
			if(window){
				window.scrollTo(0,0)
			}
		}
	}

	render(){

		return(
				<IpdHospitalDetailView {...this.props} />
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
        selectedLocation,
        locationType
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
        selectedCriterias
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getHospitaDetails:(hospitalId, selectedLocation) => dispatch(getHospitaDetails(hospitalId, selectedLocation)),
		saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
		selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(HospitalDetail)