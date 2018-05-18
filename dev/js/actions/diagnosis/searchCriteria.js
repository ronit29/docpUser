import { APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB } from '../../constants/types';
import { API_GET } from '../../api/api.js';

export const loadLabCommonCriterias = () => (dispatch) => {

    API_GET('/diagnostic/v1/search-pg').then(function (response) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_LAB,
            payload: response
        })
    }).catch(function (error) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_LAB,
            payload: null
        })
    })

}

export const toggleDiagnosisCriteria = (type, criteria) => (dispatch) => {
    dispatch({
        type: TOGGLE_DIAGNOSIS_CRITERIA,
        payload: {
            type, criteria
        }
    })

}

export const getDiagnosisCriteriaResults = (searchString, callback) => (dispatch) => {
    API_GET(`/diagnostic/v1/test?name=${searchString}`).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(null)
    })
}


