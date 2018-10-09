import { RESET_FILTER_STATE, SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD, SELECT_LOCATION_DIAGNOSIS } from '../../constants/types';
import { API_GET } from '../../api/api.js';

export const loadOPDCommonCriteria = () => (dispatch) => {

    return API_GET('/api/v1/doctor/commonconditions').then(function (response) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_OPD,
            payload: response
        })
    }).catch(function (error) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_OPD,
            payload: null
        })
        throw error
    })

}

export const toggleOPDCriteria = (type, criteria, forceAdd = false) => (dispatch) => {
    dispatch({
        type: TOGGLE_OPD_CRITERIA,
        payload: {
            type, criteria, forceAdd
        }
    })

}

export const selectLocation = (location, type = 'geo', fetchNewResults = true) => (dispatch) => {
    return Promise.all([
        dispatch({
            type: SELECT_LOCATION_OPD,
            payload: location,
            range: type,
            fetchNewResults
        }),
        dispatch({
            type: SELECT_LOCATION_DIAGNOSIS,
            payload: location,
            range: type,
            fetchNewResults
        })

    ])
}

export const getOPDCriteriaResults = (searchString, callback) => (dispatch) => {

    API_GET(`/api/v1/doctor/searcheditems?name=${searchString}`).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(null)
    })
}

export const resetFilters = () => (dispatch) => {

    dispatch({
        type: RESET_FILTER_STATE,
        payload: null
    })
}

export const mergeOPDState = (state, fetchNewResults = true) => (dispatch) => {

    dispatch({
        type: MERGE_SEARCH_STATE_OPD,
        payload: state,
        fetchNewResults
    })
}
