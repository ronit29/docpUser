import React from 'react'
import { connect } from 'react-redux';
import { getIpdInfo, selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, mergeIpdCriteria } from '../../actions/index.js'
import IpdInfoView from '../../components/ipd/IpdInfoView.js'
const queryString = require('query-string')

class IpdInfoContainer extends React.Component{

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
		if(parsed.ipd_id){
			this.props.getIpdInfo(parsed.ipd_id, this.props.selectedLocation)
		}else if(this.props.commonSelectedCriterias.length){
			this.props.getIpdInfo(this.props.commonSelectedCriterias[0].id, this.props.selectedLocation)	
		}
		
	}

	render(){

		return(
			<IpdInfoView {...this.props}/>
			)
	}
} 

const mapStateToProps = (state) => {

	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	const {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED,
		commonSelectedCriterias
	} = state.SEARCH_CRITERIA_IPD

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED, commonSelectedCriterias
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getIpdInfo: (ipd_id, selectedLocation) => dispatch(getIpdInfo(ipd_id, selectedLocation)),
		saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
		selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdInfoContainer)