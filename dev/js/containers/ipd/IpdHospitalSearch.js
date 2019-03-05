import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, getIpdHospitals, mergeIpdCriteria } from '../../actions/index.js'
import IpdHospitalSearchView from '../../components/ipd/IpdHospitalSearchView.js'

class IpdHospitals extends React.Component {

	componentDidMount(){
		this.props.getIpdHospitals(this.props.match.params.id, this.props.selectedLocation, this.props.filterCriteria, this.props.provider_ids)
	}
	render(){

		return(
				<IpdHospitalSearchView {...this.props} />
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
        selectedLocation,
        locationType
    } = state.SEARCH_CRITERIA_OPD

	const {
		filterCriteria,
		provider_ids,
		hospital_list,
		hospital_search_results,
		HOSPITAL_DATA
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
		locationType,
		filterCriteria,
		provider_ids,
		hospital_list,
		hospital_search_results,
		HOSPITAL_DATA
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getIpdHospitals: (ipdId, selectedLocation, filterCriteria, provider_ids)=> dispatch(getIpdHospitals(ipdId, selectedLocation, filterCriteria, provider_ids)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(IpdHospitals)