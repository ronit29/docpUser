import React from 'react'
import { connect } from 'react-redux'
import SpecializationMapRoutes from '../../components/commons/SpecializationMapRoutes'
import {  getSpecialitiesMap } from '../../actions/index.js'

class SpecializationMap extends React.Component {

	render(){
		
		return(
			<SpecializationMapRoutes {...this.props} />
			)
	}
}

const mapStateToProps = (state) => {
	const {
		specialitiesMap,
		specialitiesMapCities
	} = state.SITE_MAP

	return{
		specialitiesMap,
		specialitiesMapCities
	}
}


const mapDispatchToProps = (dispatch) => {

	return{
		getSpecialitiesMap: (speciality, page) => dispatch(getSpecialitiesMap(speciality, page))
	}

}

export default connect(mapStateToProps, mapDispatchToProps) (SpecializationMap)