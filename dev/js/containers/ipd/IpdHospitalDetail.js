import React from 'react'
import { connect } from 'react-redux'
import { getHospitaDetails } from '../../actions/index.js'
import IpdHospitalDetailView from '../../components/ipd/IpdHospitalDetailView.js'
const queryString = require('query-string')

class HospitalDetail extends React.Component {

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
		this.props.getHospitaDetails(this.props.match.params.hospitalId, this.props.selectedLocation)
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
		HOSPITAL_DETAIL_LOADED
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
        locationType,
        ipd_hospital_detail,
        HOSPITAL_DETAIL_LOADED
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getHospitaDetails:(hospitalId, selectedLocation) => dispatch(getHospitaDetails(hospitalId, selectedLocation))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(HospitalDetail)