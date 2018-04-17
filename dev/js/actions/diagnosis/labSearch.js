import { APPEND_LABS, LAB_SEARCH, MERGE_SEARCH_STATE } from '../../constants/types';
import { API_GET } from '../../api/api.js';


export const getLabs = (searchState = {}, filterState = {}) => (dispatch) => {
	API_GET('/labs.json').then(function (response) {

		dispatch({
			type: APPEND_LABS,
			payload: response.labs
		})

		dispatch({
			type: LAB_SEARCH,
			payload: response.labs
		})

		dispatch({
			type: MERGE_SEARCH_STATE,
			payload: searchState
		})

	}).catch(function (error) {

	})
}

export const getLabById = (labId) => (dispatch) => {
	// this API should return detailed lab
	API_GET('/labs.json').then(function (response) {
		// mocking API , TODO : remove
		response.lab = response.labs.filter(lab => lab.id == labId)[0]

		dispatch({
			type: APPEND_LABS,
			payload: [response.lab]
		})

	}).catch(function (error) {

	})
}

// export const getTimeSlots = (doctorId,clinicId, callback) => (dispatch) => {
// 	API_GET('/availability.json').then(function (response) {
		
// 		callback(response)

// 	}).catch(function (error) {

// 	})
// }
