import { FILTER_SEARCH_CRITERIA_OPD, SET_FETCH_RESULTS_OPD, SET_FETCH_RESULTS_LAB, RESET_FILTER_STATE, SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD, SELECT_LOCATION_DIAGNOSIS, APPEND_DOCTORS, SAVE_COMMON_PROCEDURES, RESET_PROCEDURE_URL, CLONE_SELECTED_CRITERIAS, MERGE_SELECTED_CRITERIAS } from '../../constants/types';
import { API_GET } from '../../api/api.js';
import GTM from '../../helpers/gtm'

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

export const toggleOPDCriteria = (type, criteria, forceAdd = false, filters = {}) => (dispatch) => {
    dispatch({
        type: TOGGLE_OPD_CRITERIA,
        payload: {
            type, criteria, forceAdd, filters
        }
    })

}

export const selectLocation = (location, type = 'geo', fetchNewResults = true) => (dispatch) => {

    let lat = ""
    let long = ""
    let place_id = ""
    let location_name = ""
    let userAgent = ""

    if (location) {
        place_id = location.place_id || ""
        lat = location.geometry.location.lat
        long = location.geometry.location.lng
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

        lat = parseFloat(parseFloat(lat).toFixed(6))
        long = parseFloat(parseFloat(long).toFixed(6))
        location_name = location.name || location.formatted_address
    }

    if (navigator) {
        userAgent = navigator.userAgent
    }

    let data = {
        'Category': 'ConsumerApp', 'Action': 'ChangeLocation', 'event': 'change-location', location: {
            lat, long, place_id, location_name, type
        }, userAgent
    }

    GTM.sendEvent({ data: data })

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

export const setFetchResults = (fetchNewResults = true) => (dispatch) => {

    dispatch({
        type: SET_FETCH_RESULTS_OPD,
        payload: fetchNewResults
    })

    dispatch({
        type: SET_FETCH_RESULTS_LAB,
        payload: fetchNewResults
    })
}

export const saveCommonProcedures = (procedure_ids = []) => (dispatch) => {
    dispatch({
        type: SAVE_COMMON_PROCEDURES,
        payload: procedure_ids,
        category_ids: [],
        forceAdd: true
    })
}

export const resetProcedureURl = () => (dispatch) => {
    dispatch({
        type: RESET_PROCEDURE_URL
    })
}

export const cloneCommonSelectedCriterias = (selectedCriterias) => (dispatch) => {
    dispatch({
        type: CLONE_SELECTED_CRITERIAS,
        payload: selectedCriterias
    })
}

export const mergeSelectedCriterias = () => (dispatch) => {
    dispatch({
        type: MERGE_SELECTED_CRITERIAS,
        payload: true
    })
}

export const filterSelectedCriteria = (type) => (dispatch) => {
    dispatch({
        type: FILTER_SEARCH_CRITERIA_OPD,
        payload: type
    })
}