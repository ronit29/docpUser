import { DOCTOR_SEARCH_START, APPEND_DOCTORS, DOCTOR_SEARCH, MERGE_SEARCH_STATE_OPD } from '../../constants/types';
import { API_GET } from '../../api/api.js';


export const getDoctors = (searchState = {}, filterCriteria = {}, mergeState = false) => (dispatch) => {
	let specialization_ids = searchState.selectedCriterias
		.filter(x => x.type == 'speciality')
		.reduce((finalStr, curr, i) => {
			if (i != 0) {
				finalStr += ','
			}
			finalStr += `${curr.id}`
			return finalStr
		}, "")

	let sits_at = []
	// if(filterCriteria.sits_at_clinic) sits_at.push('clinic');
	// if(filterCriteria.sits_at_hospital) sits_at.push('hospital');
	// if(sits_at.length == 0) sits_at = ['clinic','hospital'];
	sits_at = sits_at.join(',')

	let lat = 28.4595
	let long = 77.0226
	if (searchState.selectedLocation) {
		lat = searchState.selectedLocation.geometry.location.lat
		long = searchState.selectedLocation.geometry.location.lng
	}

	let min_fees = filterCriteria.priceRange[0]
	let max_fees = filterCriteria.priceRange[1]
	let sort_on = filterCriteria.sort_on || ""
	let is_available = filterCriteria.is_available
	let is_female = filterCriteria.is_female

	let url = `/api/v1/doctor/doctorsearch?specialization_ids=${specialization_ids}&sits_at=${sits_at}&latitude=${lat}&longitude=${long}&min_fees=${min_fees}&max_fees=${max_fees}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}`

	dispatch({
		type: DOCTOR_SEARCH_START,
		payload: null
	})

	return API_GET(url).then(function (response) {

		dispatch({
			type: APPEND_DOCTORS,
			payload: response
		})

		dispatch({
			type: DOCTOR_SEARCH,
			payload: response
		})

		if (mergeState) {
			dispatch({
				type: MERGE_SEARCH_STATE_OPD,
				payload: {
					searchState,
					filterCriteria
				}
			})
		}

	}).catch(function (error) {

	})
}

export const getDoctorById = (doctorId) => (dispatch) => {

	return API_GET(`/api/v1/doctor/profileuserview/${doctorId}`).then(function (response) {

		dispatch({
			type: APPEND_DOCTORS,
			payload: [response]
		})

	}).catch(function (error) {

	})
}

export const getTimeSlots = (doctorId, clinicId, callback) => (dispatch) => {
	return API_GET(`/api/v1/doctor/doctortiming?doctor_id=${doctorId}&hospital_id=${clinicId}`).then(function (response) {
		callback(response)
	}).catch(function (error) {

	})
}
