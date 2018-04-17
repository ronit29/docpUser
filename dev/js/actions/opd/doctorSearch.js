import { APPEND_DOCTORS, DOCTOR_SEARCH, SELECT_DOCTOR, MERGE_SEARCH_STATE } from '../../constants/types';
import { API_GET } from '../../api/api.js';


export const getDoctors = (searchState = {}, filterState = {}, mergeState = false) => (dispatch) => {
	API_GET('/doctors.json').then(function (response) {

		dispatch({
			type: APPEND_DOCTORS,
			payload: response.doctors
		})

		dispatch({
			type: DOCTOR_SEARCH,
			payload: response.doctors
		})

		if (mergeState) {
			dispatch({
				type: MERGE_SEARCH_STATE,
				payload: searchState
			})
		}


		let searchStateParam = encodeURIComponent(JSON.stringify(searchState))
		let filterStateParam = encodeURIComponent(JSON.stringify(filterState))
		history.replaceState(null, 'hello', `/searchresults?search=${searchStateParam}&filter=${filterStateParam}`)

	}).catch(function (error) {

	})
}

export const getDoctorById = (doctorId) => (dispatch) => {
	// this API should return detailed doctor
	API_GET('/doctors.json').then(function (response) {
		// mocking API , TODO : remove
		response.doctor = response.doctors.filter(doc => doc.id == doctorId)[0]

		dispatch({
			type: APPEND_DOCTORS,
			payload: [response.doctor]
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
