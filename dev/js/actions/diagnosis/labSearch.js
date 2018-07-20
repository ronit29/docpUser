import { SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, APPEND_LABS, LAB_SEARCH, MERGE_SEARCH_STATE_LAB } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';


export const getLabs = (searchState = {}, filterCriteria = {}, mergeState = false, page = 1, cb) => (dispatch) => {

	let testIds = searchState.selectedCriterias
		.filter(x => x.type == 'test')
		.reduce((finalStr, curr, i) => {
			if (i != 0) {
				finalStr += ','
			}
			finalStr += `${curr.id}`
			return finalStr
		}, "")

	let lat = 28.4595
	let long = 77.0226
	if (searchState.selectedLocation) {
		lat = searchState.selectedLocation.geometry.location.lat
		long = searchState.selectedLocation.geometry.location.lng

		if (typeof lat === 'function') lat = lat()
		if (typeof long === 'function') long = long()

	}
	let min_distance = filterCriteria.distanceRange[0]
	let max_distance = filterCriteria.distanceRange[1]
	let min_price = filterCriteria.priceRange[0]
	let max_price = filterCriteria.priceRange[1]
	let order_by = filterCriteria.sortBy

	let url = `/api/v1/diagnostic/lablist?ids=${testIds}&long=${long}&lat=${lat}&min_distance=${min_distance}&max_distance=${1000000000}&min_price=${min_price}&max_price=${max_price}&order_by=${order_by}&page=${page}`

	if (page == 1) {
		dispatch({
			type: LAB_SEARCH_START,
			payload: null
		})
	}

	return API_GET(url).then(function (response) {

		dispatch({
			type: APPEND_LABS,
			payload: response.result
		})

		dispatch({
			type: LAB_SEARCH,
			payload: {
				page, ...response
			}

		})

		if (mergeState) {
			dispatch({
				type: MERGE_SEARCH_STATE_LAB,
				payload: {
					searchState,
					filterCriteria
				}
			})
		}

		if (cb) {
			// TODO: DO not hardcode page length
			if (response.result && response.result.length == 20) {
				cb(true)
			}
		}
		cb(false)

	}).catch(function (error) {

	})
}

export const getLabById = (labId, testIds = []) => (dispatch) => {
	let url = `/api/v1/diagnostic/lablist/${labId}?test_ids=${testIds.join(',')}`

	return API_GET(url).then(function (response) {

		dispatch({
			type: APPEND_LABS,
			payload: [response]
		})

	}).catch(function (error) {

	})
}

export const getLabTimeSlots = (labId, pickup, callback) => (dispatch) => {
	let url = `/api/v1/diagnostic/labtiming?lab=${labId}&pickup=${pickup}`
	return API_GET(url).then(function (response) {
		callback(response)
	}).catch(function (error) {

	})
}

export const selectLabTimeSLot = (slot, reschedule = false) => (dispatch) => {
	dispatch({
		type: SELECT_LAB_TIME_SLOT,
		payload: {
			reschedule,
			slot
		}
	})
}

export const selectLabAppointmentType = (type) => (dispatch) => {
	dispatch({
		type: SELECR_APPOINTMENT_TYPE_LAB,
		payload: type
	})
}

export const selectPickupAddress = (address) => (dispatch) => {
	dispatch({
		type: SELECT_USER_ADDRESS,
		payload: address
	})
}

export const createLABAppointment = (postData, callback) => (dispatch) => {
	return API_POST(`/api/v1/diagnostic/labappointment`, postData).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const retryPaymentLAB = (appointmentId, callback) => (dispatch) => {
	return API_GET(`/api/v1/diagnostic/appointment/payment/retry/${appointmentId}`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}


export const getLabBookingSummary = (appointmentID, callback) => (dispatch) => {
	API_GET(`/api/v1/user/appointment/${appointmentID}?type=lab`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const updateLabAppointment = (appointmentData, callback) => (dispatch) => {
	API_POST(`/api/v1/user/appointment/${appointmentData.id}/update?type=lab`, appointmentData).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}
