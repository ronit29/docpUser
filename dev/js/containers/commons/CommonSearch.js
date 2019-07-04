import React from 'react'
import { connect } from 'react-redux'
import CommonSearchView from '../../components/commons/commonSearch'
import { getElasticCriteriaResults, cloneCommonSelectedCriterias, mergeOPDState, clearExtraTests, clearAllTests, mergeLABState, toggleDiagnosisCriteria, toggleIPDCriteria, selectLocation } from '../../actions/index.js'

class CommonSearch extends React.Component {

	componentDidMount() {
		setTimeout(() => {
		//	this.props.setFetchResults(true)
		}, 1000)
	}

	render() {

		return (
			<CommonSearchView {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	
	let OPD_STATE = (()=> {

		const {
        selectedLocation,
        filterCriteria

    	} = state.SEARCH_CRITERIA_OPD

    return {
    	selectedLocation,
        filterCriteria
    	}

	})()

	let LAB_STATE = (()=>{

		const {
        selectedLocation,
        filterCriteria,
        selectedCriterias

    	} = state.SEARCH_CRITERIA_LABS

    return {
    	selectedLocation,
        filterCriteria,
        selectedCriterias
    	}

	})()

	let IPD_STATE = (()=>{

		const {
        selectedCriterias

    	} = state.SEARCH_CRITERIA_IPD

    return {
    	selectedCriterias
    	}

	})()

	return {
		OPD_STATE, LAB_STATE, IPD_STATE
	}
}


const mapDispatchToProps = (dispatch) => {

	return {
		getElasticCriteriaResults: (searchString, type, location, extraSearchParams) => dispatch(getElasticCriteriaResults(searchString, type, location, extraSearchParams)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
		clearExtraTests: () => dispatch(clearExtraTests()),
        clearAllTests: () => dispatch(clearAllTests()),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
        selectLocation: (location, type, fetchNewResults) => dispatch(selectLocation(location, type, fetchNewResults))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CommonSearch)