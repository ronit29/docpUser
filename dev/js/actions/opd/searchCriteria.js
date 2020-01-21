import { FILTER_SEARCH_CRITERIA_OPD, SET_FETCH_RESULTS_OPD, SET_FETCH_RESULTS_LAB, RESET_FILTER_STATE, SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD, SELECT_LOCATION_DIAGNOSIS, APPEND_DOCTORS, SAVE_COMMON_PROCEDURES, RESET_PROCEDURE_URL, CLONE_SELECTED_CRITERIAS, MERGE_SELECTED_CRITERIAS, SELECT_IPD_LOCATION_STATUS, LOAD_INSURANCE_CRITERIA, SAVE_NEARBY_HOSPITALS, SAVE_TOP_HOSPITALS, CLEAR_OPD_PAGE_NUMBER } from '../../constants/types';
import { API_GET } from '../../api/api.js';
import GTM from '../../helpers/gtm'

export const loadOPDCommonCriteria = (selectedLocation) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""

    if (selectedLocation && (selectedLocation.geometry || selectedLocation.place_id) ) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = "Delhi"
    }

    return API_GET(`/api/v1/doctor/commonconditions?city=${locality}&lat=${lat}&long=${long}`).then(function (response) {
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

export const loadOPDInsurance = (selectedLocation) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""

    if (selectedLocation && (selectedLocation.geometry || selectedLocation.place_id) ) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = "Delhi"
    }

    return API_GET(`/api/v1/common/settings?latitude=${lat}&longitude=${long}`).then(function (response) {
        dispatch({
            type: LOAD_INSURANCE_CRITERIA,
            payload: response
        })
    }).catch(function (error) {
        dispatch({
            type: LOAD_INSURANCE_CRITERIA,
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
    let city_name = ""

    if (location) {
        place_id = location.place_id || ""
        lat = location.geometry.location.lat
        long = location.geometry.location.lng
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

        lat = parseFloat(parseFloat(lat).toFixed(6))
        long = parseFloat(parseFloat(long).toFixed(6))
        location_name = location.name || location.formatted_address
        city_name = location.locality
    }

    if (navigator) {
        userAgent = navigator.userAgent
    }

    let data = {
        'Category': 'ConsumerApp', 'Action': 'ChangeLocation', 'event': 'change-location', location: {
            lat, long, place_id, location_name, type, city_name
        }, userAgent
    }

    GTM.sendEvent({ data: data })

    loadOPDCommonCriteria(location)(dispatch)
    loadOPDInsurance(location)(dispatch)

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
        }),
        dispatch({
            type: SELECT_IPD_LOCATION_STATUS,
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

export const getNearbyHospitals = (extraParams={}, cb) => (dispatch) => { // to get near by hospitals covered under gold or vip or near by location

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""
    let { selectedLocation } = extraParams

    if (selectedLocation && (selectedLocation.geometry || selectedLocation.place_id) ) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = "Delhi"
    }
    let url = `/api/v1/doctor/hospitals_near_you?lat=${lat}&long=${long}&locality=${locality}`
    if(extraParams && extraParams.from_vip){
        url+= `&from_vip=${extraParams.from_vip}`    
    }
    return API_GET(url).then(function(response){

        dispatch({
            type: SAVE_NEARBY_HOSPITALS,
            payload: response
        })
    }).catch(function(e){
        
    })
}

export const getTopHospitals = (extraParams={}, cb) => (dispatch) => { // to get near by  top hospitals covered under gold or vip or near by location

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""
    let { selectedLocation } = extraParams

    if (selectedLocation && (selectedLocation.geometry || selectedLocation.place_id) ) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = "Delhi"
    }
    return API_GET(`/api/v1/doctor/top/hospitals?lat=${lat}&long=${long}&locality=${locality}`).then(function(response){

        dispatch({
            type: SAVE_TOP_HOSPITALS,
            payload: response
        })
    }).catch(function(e){
        
    })
}
export const clearOpdPage = ()=>(dispatch) =>{
    dispatch({
        type: CLEAR_OPD_PAGE_NUMBER,
        payload: ''
    })  
}