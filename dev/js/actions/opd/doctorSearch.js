import { DOCTOR_SEARCH_START, APPEND_DOCTORS, DOCTOR_SEARCH, MERGE_SEARCH_STATE_OPD } from '../../constants/types';
import { API_GET } from '../../api/api.js';


export const getDoctors = (searchState = {}, filterCriteria = {}, mergeState = false) => (dispatch) => {
	// let testIds = searchState.selectedCriterias
	// 	.filter(x => x.type == 'test')
	// 	.reduce((finalStr, curr, i) => {
	// 		if (i != 0) {
	// 			finalStr += ','
	// 		}
	// 		finalStr += `${curr.id}`
	// 		return finalStr
	// 	}, "")

	// let lat = 28.4595
	// let long = 77.0226
	// if (searchState.selectedLocation) {
	// 	lat = searchState.selectedLocation.geometry.location.lat
	// 	long = searchState.selectedLocation.geometry.location.lng
	// }
	// let min_distance = filterCriteria.distanceRange[0]
	// let max_distance = filterCriteria.distanceRange[1]
	// let min_price = filterCriteria.priceRange[0]
	// let max_price = filterCriteria.priceRange[1]
	// let order_by = filterCriteria.sortBy

	// let url = `/api/v1/diagnostic/lablist?ids=${testIds}&long=${lat}&lat=${long}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&order_by=${order_by}`

	let url = `/api/v1/doctor/doctorsearch`

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

	API_GET(`/api/v1/doctor/profileuserview/${doctorId}`).then(function (response) {

		dispatch({
			type: APPEND_DOCTORS,
			payload: [response]
		})

	}).catch(function (error) {

	})
}

export const getTimeSlots = (doctorId, clinicId, callback) => (dispatch) => {
	API_GET('/availability.json').then(function (response) {

		callback(response)

	}).catch(function (error) {

	})
}
