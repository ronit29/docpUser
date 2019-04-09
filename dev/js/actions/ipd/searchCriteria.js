import { TOGGLE_IPD, LOADED_IPD_INFO, GET_IPD_HOSPITALS, MERGE_IPD_CRITERIA, SET_IPD_SEARCH_ID, SAVE_IPD_RESULTS_WITH_SEARCHID, GET_IPD_SEARCH_ID_RESULTS, GET_IPD_HOSPITAL_DETAIL, CLEAR_IPD_SEARCH_IDS, GET_IPD_HOSPITAL_DETAIL_START, LOADED_IPD_INFO_START } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm'

export const getIpdInfo = (ipd_id, selectedLocation) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""

    dispatch({
        type: LOADED_IPD_INFO_START
    })

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
    }

    return API_GET(`/api/v1/doctor/ipd_procedure/${ipd_id}?long=${long}&lat=${lat}`).then(function (response) {
        dispatch({
            type: LOADED_IPD_INFO,
            payload: response
        })
    }).catch( function(error) {
        
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

export const getIpdHospitals = (state, page=1, fromServer, searchByUrl, cb) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""

    let { selectedLocation, filterCriteria, commonSelectedCriterias } = state

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
    }
    
    let min_distance = filterCriteria.distance[0]
    let max_distance = filterCriteria.distance[1]
    let provider_ids = filterCriteria.provider_ids

    let ipd_id = commonSelectedCriterias.map(x=>x.id)

    let url = `/api/v1/doctor/ipd_procedure/${ipd_id}/hospitals?`
    
    if (searchByUrl) {
        url = `/api/v1/doctor/doctorsearch_by_url?url=${searchByUrl.split('/')[1]}&`
    }

    url+= `long=${long}&lat=${lat}&min_distance=${min_distance}&max_distance=${max_distance}&provider_ids=${provider_ids}&page=${page}`

    return API_GET(url).then( function (response) {

        let commonCriteria = [response.ipd_procedure]

        dispatch({
            type: MERGE_IPD_CRITERIA,
            payload: {
                commonSelectedCriterias: commonCriteria,
                ...filterCriteria
            }
        })
        
        dispatch({
            type: SAVE_IPD_RESULTS_WITH_SEARCHID,
            payload: response,
            page: page
        })

        dispatch({
            type: GET_IPD_HOSPITALS,
            payload: response
        })

        if(cb){

            if(response.result && response.result.length == 0){
                cb(false,false)

            }else if(response.result && response.result.length == 20){
                cb(true, true)
            }

            cb(false, true)
        }

    }).catch( function (error) {
        dispatch({
            type: GET_IPD_HOSPITALS,
            payload: []
        })
    })
}


export const mergeIpdCriteria = (filterCriteria) => (dispatch) => {
    dispatch({
        type: MERGE_IPD_CRITERIA,
        payload: filterCriteria
    })
} 

export const setIpdSearchId = (search_id, filters, page=1) => (dispatch) => {

    dispatch({
        type: SET_IPD_SEARCH_ID,
        payload: filters,
        searchId: search_id,
        page: page
    })
}

export const getIpdSearchIdResults = (search_id, response) => (dispatch) => {
    
    dispatch({
        type: GET_IPD_SEARCH_ID_RESULTS,
        searchId: search_id
    })

    dispatch({
        type: GET_IPD_HOSPITALS,
        payload: response.data
    })
}

export const getHospitaDetails = (hospitalId, selectedLocation) => (dispatch) => {

    dispatch({
        type: GET_IPD_HOSPITAL_DETAIL_START
    })

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

    return API_GET(`/api/v1/doctor/hospital/${hospitalId}?long=${long}&lat=${lat}`).then( function( response) {
        dispatch({
            type: GET_IPD_HOSPITAL_DETAIL,
            payload: response
        })

    }).catch( function( error) {

    })

}

export const clearIpdSearchId = () => (dispatch) => {
    dispatch({
        type: CLEAR_IPD_SEARCH_IDS
    })
}