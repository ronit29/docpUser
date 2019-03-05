import { TOGGLE_IPD, LOADED_IPD_INFO, GET_IPD_HOSPITALS, MERGE_IPD_CRITERIA } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm'

export const getIpdInfo = (ipd_id) => (dispatch) => {
    return API_GET(`/api/v1/doctor/ipd_procedure/1`).then(function (response) {
        dispatch({
            type: LOADED_IPD_INFO,
            payload: response
        })
    })
}

export const toggleIPDCriteria = (criteria, forceAdd= false) => (dispatch) => {

	dispatch({
		type: TOGGLE_IPD,
		payload: criteria,
		forceAdd: forceAdd
	})
} 

export const submitIPDForm = (formData, cb) => (dispatch) => {
    return API_POST('/api/v1/doctor/ipd_procedure/create_lead', formData).then(function(response) {
        if(cb) cb(null, response)
    }).catch(function(error){
        if(cb) cb(error, null)
    })
}

export const getIpdHospitals = (ipdId, selectedLocation, filterCriteria, provider_ids) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
    }
    
    let min_distance = filterCriteria.distance[0]
    let max_distance = filterCriteria.distance[0]
    let provider_ids = []

    let url = `/api/v1/doctor/ipd_procedure/${ipdId}/hospitals?long=${long}&lat=${lat}&min_distance=${min_distance}&max_distance=${max_distance}&provider_ids=${provider_ids}`
    return API_GET(url).then( function (response) {
        
        dispatch({
            type: GET_IPD_HOSPITALS,
            payload: response
        })

    }).catch( function (error) {

    })
}


export const mergeIpdCriteria = (filterCriteria) => (dispatch) => {
    dispatch({
        type: MERGE_IPD_CRITERIA,
        payload: filterCriteria
    })
} 