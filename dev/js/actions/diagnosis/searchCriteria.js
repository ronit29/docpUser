import { TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA } from '../../constants/types';
import { API_GET } from '../../api/api.js';


export const toggleTest = (id) => (dispatch) => {
    dispatch({
        type: TOGGLE_TESTS,
        payload: {
            id
        }
    })

}

export const toggleDiagnosisCriteria = (criteria) => (dispatch) => {
    dispatch({
        type: TOGGLE_DIAGNOSIS_CRITERIA,
        payload: criteria
    })

}

export const getDiagnosisCriteriaResults = (searchString, callback) => (dispatch) => {
	API_GET('/generic_search.json').then(function (response) {
		callback(response)
	}).catch(function (error) {
        
	})
}


