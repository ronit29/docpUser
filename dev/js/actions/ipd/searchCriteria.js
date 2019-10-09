import { TOGGLE_IPD, LOADED_IPD_INFO, GET_IPD_HOSPITALS, MERGE_IPD_CRITERIA, SET_IPD_SEARCH_ID, SAVE_IPD_RESULTS_WITH_SEARCHID, GET_IPD_SEARCH_ID_RESULTS, GET_IPD_HOSPITAL_DETAIL, CLEAR_IPD_SEARCH_IDS, GET_IPD_HOSPITAL_DETAIL_START, LOADED_IPD_INFO_START, START_HOSPITAL_SEARCH, SAVE_IPD_POPUP_DATA, GET_HOSP_COMMENTS } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm'

export const getIpdInfo = (ipd_id, selectedLocation, url=null, cb) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""


    dispatch({
        type: LOADED_IPD_INFO_START
    })

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = 'Delhi'
    }

    let api_url = ''

    if(url) {
        api_url = `api/v1/doctor/ipd_procedure_by_url/${url}?city=${locality}`
    }else{
        api_url = `/api/v1/doctor/ipd_procedure/${ipd_id}?long=${long}&lat=${lat}&city=${locality}`
    }

    return API_GET(api_url).then(function (response) {
        dispatch({
            type: LOADED_IPD_INFO,
            payload: response
        })
        if(cb) cb(response)
    }).catch( function(error) {
        if(cb) cb(null)
    })
}

export const toggleIPDCriteria = (criteria, forceAdd= false) => (dispatch) => {

	dispatch({
		type: TOGGLE_IPD,
		payload: criteria,
		forceAdd: forceAdd
	})
} 

export const submitIPDForm = (formData, selectedLocation, cb) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = 'Delhi'
    }

    if(formData) {
        formData.lat = lat
        formData.long = long
        formData.locality = locality
        formData.sub_locality = sub_locality
    }


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
    let network_id = filterCriteria.network_id || ''

    let ipd_id = commonSelectedCriterias.map(x=>x.id)

    let url = ''
    
    if(ipd_id && ipd_id.length){
        url = `/api/v1/doctor/ipd_procedure/${ipd_id}/hospitals?`
    }else if (searchByUrl) {
        url = `/api/v1/doctor/hospitalsearch_by_url/${searchByUrl.split('/')[1]}?`
    }else {
        url = `/api/v1/doctor/hospitals?`
    }

    url+= `long=${long}&lat=${lat}&min_distance=${min_distance}&max_distance=${max_distance}&provider_ids=${provider_ids}&page=${page}&network=${network_id}`

    if(parseInt(page)==1) {
        dispatch({
            type: START_HOSPITAL_SEARCH
        })    
    }
    

    return API_GET(url).then( function (response) {
        let commonCriteria = []

        if(response.ipd_procedure && response.ipd_procedure.id) {
            commonCriteria = [response.ipd_procedure]
        }

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
            payload: response,
            page: page
        })

        if(cb){

            if(response.result && response.result.length == 0){
                if(cb) cb(false,false)

            }else if(response.result && response.result.length == 50){
                if(cb) cb(true, true)
            }

            if(cb) cb(false, true)
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

export const getHospitaDetails = (hospitalId, selectedLocation, searchByUrl=null, specialization_id='', cb) => (dispatch) => {

    dispatch({
        type: GET_IPD_HOSPITAL_DETAIL_START
    })

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }
    
    let url = `/api/v1/doctor/hospital/${hospitalId}?long=${long}&lat=${lat}&city=${locality}&specialization_ids=${specialization_id}`

    if (searchByUrl) {
        url = `/api/v1/doctor/hospital_by_url?url=${searchByUrl.split('/')[1]}&city=${locality}&specialization_ids=${specialization_id}`
    }

    return API_GET(url).then( function( response) {
        if(response.status){
        }else {
            dispatch({
                type: GET_IPD_HOSPITAL_DETAIL,
                payload: response
            })
                
        }
        if(cb)cb(response)
    }).catch( function( error) {
        if(error && error.status) {
            if(cb)cb(error)
        }
    })

}

export const clearIpdSearchId = () => (dispatch) => {
    dispatch({
        type: CLEAR_IPD_SEARCH_IDS
    })
}

export const submitSecondIPDForm = (formData, selectedLocation, cb) => (dispatch) => {

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""
    let locality = ""
    let sub_locality = ""

    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        place_id = selectedLocation.place_id || ""
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()
        locality = selectedLocation.locality || ""
        sub_locality = selectedLocation.sub_locality || ""
    }else{
        locality = 'Delhi'
    }

    if(formData) {
        formData.lat = lat
        formData.long = long
        formData.locality = locality
        formData.sub_locality = sub_locality
    }


    return API_POST('/api/v1/doctor/ipd_procedure/update_lead', formData).then(function(response) {
        if(cb) cb(null, response)
    }).catch(function(error){
        if(cb) cb(error, null)
    })
}

export const saveIpdPopupData = (type, data) => (dispatch) => {
    dispatch({
        type: SAVE_IPD_POPUP_DATA,
        payload: data,
        dataType: type
    })
}

export const getHospitalComments = (hospitalId) => (dispatch) => {
    return API_GET(`api/v1/common/comment/list?type=hospital&id=${hospitalId}`).then((response)=>{
        dispatch({
            type: GET_HOSP_COMMENTS,
            payload: response
        })
    })
}

export const postHospitalComments = (postData, cb) => (dispatch) => {
    return API_POST(`/api/v1/common/comment/post`, postData).then((response)=>{
        
        if(response){
            if(cb) cb(null, response)
        }
    }).catch((e)=>{
        if(cb) cb(e, null)
    })
}