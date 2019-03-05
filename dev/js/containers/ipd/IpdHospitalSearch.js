import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, getIpdHospitals } from '../../actions/index.js'

class IpdHospitals extends React.Component {

	componentDidMount(){
		this.props.getIpdHospitals(this.props.match.params.id, this.props.selectedLocation, this.props.filterCriteria, this.props.provider_ids)
	}
	render(){

		return(
				<div>Prince</div>
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	const {
		filterCriteria,
		provider_ids
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
		filterCriteria,
		provider_ids
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getIpdHospitals: (ipdId, selectedLocation, filterCriteria, provider_ids)=> dispatch(getIpdHospitals(ipdId, selectedLocation, filterCriteria, provider_ids))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(IpdHospitals)