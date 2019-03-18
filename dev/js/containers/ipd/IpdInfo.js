import React from 'react'
import { connect } from 'react-redux';
import { getIpdInfo, selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, mergeIpdCriteria } from '../../actions/index.js'
import IpdInfoView from '../../components/ipd/IpdInfoView.js'
const queryString = require('query-string')

class IpdInfoContainer extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			ipd_id: ''
		}
	}

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
		if(parsed.ipd_id){
			this.setState({ipd_id: parsed.ipd_id})
			this.props.getIpdInfo(parsed.ipd_id, this.props.selectedLocation)
		}else if(this.props.commonSelectedCriterias.length){
			this.setState({ipd_id: this.props.commonSelectedCriterias[0].id})
			this.props.getIpdInfo(this.props.commonSelectedCriterias[0].id, this.props.selectedLocation)	
		}
		if(window){
			window.scrollTo(0,0)
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.locationFetched != nextProps.locationFetched){

			const parsed = queryString.parse(nextProps.location.search)
			if(parsed.ipd_id){
				this.setState({ipd_id: parsed.ipd_id})
				this.props.getIpdInfo(parsed.ipd_id, nextProps.selectedLocation)
			}else if(nextProps.commonSelectedCriterias.length){
				this.setState({ipd_id: nextProps.commonSelectedCriterias[0].id})
				this.props.getIpdInfo(nextProps.commonSelectedCriterias[0].id, nextProps.selectedLocation)	
			}
			if(window){
				window.scrollTo(0,0)
			}

		}
	}

	render(){

		return(
			<IpdInfoView {...this.props} {...this.state}/>
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
		commonSelectedCriterias,
		locationFetched
	} = state.SEARCH_CRITERIA_IPD

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED, commonSelectedCriterias, locationFetched
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