import { SET_FETCH_RESULTS_LAB, SET_SERVER_RENDER_LAB, SELECT_LOCATION_OPD, SELECT_LOCATION_DIAGNOSIS, SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, APPEND_LABS, LAB_SEARCH, MERGE_SEARCH_STATE_LAB } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import { _getlocationFromLatLong, _getLocationFromPlaceId, _getNameFromLocation } from '../../helpers/mapHelpers.js'

export const getLabs = (state = {}, page = 1, from_server = false, searchByUrl = false, cb) => (dispatch) => {

	if (page == 1) {
		dispatch({
			type: LAB_SEARCH_START,
			payload: null
		})
	}

	// dispatch({
	// 	type: SET_SERVER_RENDER_LAB,
	// 	payload: from_server
	// })

	let { selectedLocation, selectedCriterias, filterCriteria, locationType } = state
	let testIds = selectedCriterias.map((x) => x.id)

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
	let min_distance = filterCriteria.distanceRange[0]
	let max_distance = filterCriteria.distanceRange[1]
	let min_price = filterCriteria.priceRange[0]
	let max_price = filterCriteria.priceRange[1]
	let sort_on = filterCriteria.sort_on || ""

	// do not check specialization_ids if doctor_name || hospital_name search
	if (!!filterCriteria.lab_name) {
		testIds = ""
	}

	let url = `/api/v1/diagnostic/lablist?`

	if (searchByUrl) {
		url = `/api/v1/diagnostic/lablist_by_url?url=${searchByUrl.split('/')[1]}&`
	}

	url += `ids=${testIds || ""}&long=${long || ""}&lat=${lat || ""}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&page=${page}`

	if (!!filterCriteria.lab_name) {
		url += `&name=${filterCriteria.lab_name || ""}`
	}

	return API_GET(url).then(function (response) {

		let tests = response.tests.map((x) => {
			x.type = 'test'
			return x
		})

		let selectedCriterias = tests || []

		dispatch({
			type: MERGE_SEARCH_STATE_LAB,
			payload: {
				selectedCriterias
			},
			fetchNewResults: false
		})

		dispatch({
			type: SET_FETCH_RESULTS_LAB,
			payload: false
		})

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

		if (cb) {
			// TODO: DO not hardcode page length
			if (response.result && response.result.length == 20) {
				cb(true, response.seo)
			}
		}
		cb(false, response.seo)

	}).catch(function (error) {
		throw error
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

export const getLabByUrl = (lab_url, testIds = [], cb) => (dispatch) => {
	let url = `/api/v1/diagnostic/lablistbyurl?url=${lab_url}&test_ids=${testIds.join(',')}`

	return API_GET(url).then(function (response) {
		dispatch({
			type: APPEND_LABS,
			payload: [response]
		})
		cb((response.lab ? response.lab.id : null), null)
	}).catch(function (error) {
		cb(null, error.url)
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
	return API_POST(`/api/v1/diagnostic/labappointment/create`, postData).then(function (response) {
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
