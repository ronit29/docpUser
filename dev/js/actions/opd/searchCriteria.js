import { TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, SET_OPD_FILTERS } from '../../constants/types';
import { API_GET } from '../../api/api.js';

export const toggleCondition = (id) => (dispatch) => {
    dispatch({
        type: TOGGLE_CONDITIONS,
        payload: {
            id
        }
    })

}

export const toggleSpeciality = (id) => (dispatch) => {
    dispatch({
        type: TOGGLE_SPECIALITIES,
        payload: {
            id
        }
    })

}

export const toggleCriteria = (criteria) => (dispatch) => {
    dispatch({
        type: TOGGLE_CRITERIA,
        payload: criteria
    })

}

export const selectLocation = (location) => (dispatch) => {
    dispatch({
        type: SELECT_LOCATION,
        payload: location
    })

}

export const mergeSearchState = (state) => (dispatch) => {
    dispatch({
        type: MERGE_SEARCH_STATE,
        payload: state
    })

}

export const getCriteriaResults = (searchString, callback) => (dispatch) => {
	API_GET('/generic_search.json').then(function (response) {
		callback(response)
	}).catch(function (error) {
        
	})
}

export const setOPDFilters = (filterData) => (dispatch) => {
    dispatch({
        type: SET_OPD_FILTERS,
        payload: filterData
    })

} 
