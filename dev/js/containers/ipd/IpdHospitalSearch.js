import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, getIpdHospitals, mergeIpdCriteria, urlShortner, setIpdSearchId, getIpdSearchIdResults } from '../../actions/index.js'
import IpdHospitalSearchView from '../../components/ipd/IpdHospitalSearchView.js'

class IpdHospitals extends React.Component {

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
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
		HOSPITAL_DATA,
		nextFilterCriteria,
		page,
		search_id_data,
		commonSelectedCriterias,
		nextSelectedCriterias,
		fetchNewResults,
		getNewResults,
		locationFetched
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
		locationType,
		filterCriteria,
		provider_ids,
		hospital_list,
		hospital_search_results,
		HOSPITAL_DATA,
		nextFilterCriteria,
		page,
		search_id_data,
		commonSelectedCriterias,
		nextSelectedCriterias,
		fetchNewResults,
		getNewResults,
		locationFetched
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getIpdHospitals: (state, cb)=> dispatch(getIpdHospitals(state, cb)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria)),
		urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
		setIpdSearchId: (search_id, filters, page) => dispatch(setIpdSearchId(search_id, filters, page)),
		getIpdSearchIdResults: (search_id, data) => dispatch(getIpdSearchIdResults(search_id, data))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(IpdHospitals)