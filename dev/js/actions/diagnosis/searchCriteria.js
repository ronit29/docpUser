import { MERGE_SEARCH_STATE_LAB, CLEAR_ALL_TESTS, CLEAR_EXTRA_TESTS, APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB, ADD_LAB_PROFILE_TESTS } from '../../constants/types';
import { API_GET } from '../../api/api.js';

export const loadLabCommonCriterias = () => (dispatch) => {

    return API_GET('/api/v1/diagnostic/labsearch').then(function (response) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_LAB,
            payload: response
        })
    }).catch(function (error) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_LAB,
            payload: null
        })
        throw error
    })

}

export const toggleDiagnosisCriteria = (type, criteria, forceAdd = false) => (dispatch) => {
    dispatch({
        type: TOGGLE_DIAGNOSIS_CRITERIA,
        payload: {
            type, criteria, forceAdd
        }
    })

}

export const getDiagnosisCriteriaResults = (searchString, callback) => (dispatch) => {
    API_GET(`/api/v1/diagnostic/test?name=${searchString}`).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(null)
    })
}

export const getLabTests = (lab_id, searchString, callback) => (dispatch) => {
    API_GET(`/api/v1/diagnostic/labtest/${lab_id}?test_name=${searchString}`).then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const clearAllTests = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALL_TESTS,
        payload: {}
    })
}

export const clearExtraTests = () => (dispatch) => {
    dispatch({
        type: CLEAR_EXTRA_TESTS,
        payload: {}
    })
}

export const mergeLABState = (state, fetchNewResults = true) => (dispatch) => {

    dispatch({
        type: MERGE_SEARCH_STATE_LAB,
        payload: state,
        fetchNewResults
    })
}
