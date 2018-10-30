import React from 'react'
import { connect } from 'react-redux'
import SpecializationMapRoutes from '../../components/commons/SpecializationMapRoutes'
import { setFetchResults, getSpecialitiesMap } from '../../actions/index.js'

class SpecializationMap extends React.Component {

	static loadData(store, match, query) {
        if(match.params.speciality){
        	return store.dispatch(getSpecialitiesMap(match.params.speciality, query.page))
        }else{
            return store.dispatch(getSpecialitiesMap())
        }
        
    }

    static contextTypes = {
        router: () => null
    }

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

	return {
		specialitiesMap,
		specialitiesMapCities
	}
}


const mapDispatchToProps = (dispatch) => {

	return{
		getSpecialitiesMap: (speciality, page, cb) => dispatch(getSpecialitiesMap(speciality, page, cb))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(SpecializationMap)