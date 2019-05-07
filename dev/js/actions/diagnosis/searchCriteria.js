import { MERGE_SEARCH_STATE_LAB, CLEAR_ALL_TESTS, CLEAR_EXTRA_TESTS, APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB, ADD_LAB_PROFILE_TESTS, SET_CORPORATE_COUPON, SEARCH_TEST_INFO, SAVE_PINCODE, TOGGLE_COMPARE_PACKAGE, RESET_COMPARE_STATE, STORE_PATIENT_DETAILS } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';

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

export const getLabTests = (lab_id, searchString, callback, page = 1) => (dispatch) => {
    API_GET(`/api/v1/diagnostic/labtest/${lab_id}?test_name=${searchString}&page=${page}`).then(function (response) {
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

export const setCorporateCoupon = (coupon = "") => (dispatch) => {

    dispatch({
        type: SET_CORPORATE_COUPON,
        payload: coupon
    })
}
export const searchTestData = (test_ids, test_url, lab_id, state,no_labs, callback) => (dispatch) => {

    let url
    let lat = 28.644800
    let long = 77.216721

    let { selectedLocation } = state

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng

        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

    }


    if (test_url) {
        url = '/api/v1/diagnostic/test/details_by_url?url=' + test_url + '&long=' + long + '&lat=' + lat
    } else {
        url = '/api/v1/diagnostic/test/details?test_ids=' + test_ids + '&long=' + long + '&lat=' + lat
    }

    if (lab_id) {
        url += '&lab_id=' + lab_id
    }

    if(no_labs){
        url += '&no_labs=true'
    }

    return API_GET(url).then(function (response) {
        dispatch({
            type: SEARCH_TEST_INFO,
            payload: response

        })
        if (callback) callback(response);
    }).catch(function (error) {
        dispatch({
            type: SEARCH_TEST_INFO,
            payload: null
        })
        throw error
    })
}

export const savePincode = (pincode) => (dispatch) => {
    dispatch({
        type: SAVE_PINCODE,
        payload: pincode
    })
}

export const togglecompareCriteria = (criteria,reset) => (dispatch) => {
    dispatch({
        type: TOGGLE_COMPARE_PACKAGE,
        reset:reset,
        payload: {
            criteria
        }
    })
}

export const resetPkgCompare = () => (dispatch) => {

    dispatch({
        type: RESET_COMPARE_STATE,
        payload: null
    })
}

export const getCompareList = (selectedIds,selectedLocation,callback) => (dispatch) => {
    let lat = 28.644800
    let long = 77.216721
    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng

        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

    }
    let postData={}
    postData.package_lab_ids = selectedIds
    postData['lat'] = lat
    postData['long'] = long
    API_POST('/api/v1/diagnostic/compare_lab_packages', postData).then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const patientDetails = (criteria) => (dispatch) => {
    dispatch({
        type: STORE_PATIENT_DETAILS,
        payload: {
            criteria
        }
    })

}