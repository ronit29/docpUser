import { SET_FETCH_RESULTS_LAB, SET_SERVER_RENDER_LAB, SELECT_LOCATION_OPD, SELECT_LOCATION_DIAGNOSIS, SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, APPEND_LABS, LAB_SEARCH, MERGE_SEARCH_STATE_LAB, APPLY_LAB_COUPONS, REMOVE_LAB_COUPONS, RESET_LAB_COUPONS, SAVE_CURRENT_LAB_PROFILE_TESTS, APPEND_LABS_SEARCH, SEARCH_HEALTH_PACKAGES, GET_LAB_SEARCH_ID_RESULTS, SET_LAB_SEARCH_ID, SAVE_LAB_RESULTS_WITH_SEARCHID } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import { _getlocationFromLatLong, _getLocationFromPlaceId, _getNameFromLocation } from '../../helpers/mapHelpers.js'
import GTM from '../../helpers/gtm.js'

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

	let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType } = state
	let testIds = currentSearchedCriterias.map((x) => x.id)

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

	let url = `/api/v1/diagnostic/labnetworksearch?`

	if (searchByUrl) {
		url = `/api/v1/diagnostic/labnetworksearchbyurl?url=${searchByUrl.split('/')[1]}&`
	}

	url += `ids=${testIds || ""}&long=${long || ""}&lat=${lat || ""}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&page=${page}`

	if (!!filterCriteria.lab_name) {
		url += `&name=${filterCriteria.lab_name || ""}`
	}

	if (!!filterCriteria.network_id) {
		url += `&network_id=${filterCriteria.network_id || ""}`
	}

	return API_GET(url).then(function (response) {

		let tests = response.tests.map((x) => {
			x.type = 'test'
			return x
		})

		let currentSearchedCriterias = tests || []

		dispatch({
			type: MERGE_SEARCH_STATE_LAB,
			payload: {
				currentSearchedCriterias
			},
			fetchNewResults: false
		})

		dispatch({
			type: SAVE_LAB_RESULTS_WITH_SEARCHID,
			payload: response,
			page:page
		})

		dispatch({
			type: SET_FETCH_RESULTS_LAB,
			payload: false
		})

		dispatch({
			type: APPEND_LABS_SEARCH,
			payload: response.result
		})

		dispatch({
			type: LAB_SEARCH,
			payload: {
				page, ...response
			}

		})

		if (page == 1) {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'LabSearchCount', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-search-count', 'LabSearchCount': response.count || 0
			}
			GTM.sendEvent({ data: data })
		}

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
		dispatch({
			type: SAVE_CURRENT_LAB_PROFILE_TESTS,
			payload: response,
			forceAdd: true
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
		dispatch({
			type: SAVE_CURRENT_LAB_PROFILE_TESTS,
			payload: response,
			forceAdd: true
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

export const applyLabCoupons = (productId = '', couponCode, couponId, labId = null, dealPrice, test_ids = [], profile_id = null) => (dispatch) => {

	API_POST(`/api/v1/coupon/discount`, {
		coupon_code: [couponCode],
		deal_price: dealPrice,
		product_id: productId,
		tests: test_ids,
		lab: labId,
		profile: profile_id || null
	}).then(function (response) {
		let analyticData = {
			'Category': 'ConsumerApp', 'Action': 'LabCouponApplied', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-coupon-applied', 'couponId': couponId
		}
		GTM.sendEvent({ data: analyticData })
		if (response && response.status == 1) {
			dispatch({
				type: APPLY_LAB_COUPONS,
				payload: response
			})
		} else {
			dispatch({
				type: REMOVE_LAB_COUPONS,
				labId: labId,
				couponId: couponId
			})
		}
	}).catch(function (error) {
		dispatch({
			type: REMOVE_LAB_COUPONS,
			labId: labId,
			couponId: couponId
		})
	})

}

export const removeLabCoupons = (labId, couponId) => (dispatch) => {

	dispatch({
		type: REMOVE_LAB_COUPONS,
		labId: labId,
		couponId: couponId
	})
}

export const resetLabCoupons = () => (dispatch) => {
	dispatch({
		type: RESET_LAB_COUPONS
	})
}
export const getPackages = (state = {}, page = 1, from_server = false, searchByUrl = false, cb) => (dispatch) => {

	// if (page == 1) {
	// 	dispatch({
	// 		type: SEARCH_HEALTH_PACKAGES,
	// 		payload: null
	// 	})
	// }
	let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType } = state
	let testIds = currentSearchedCriterias.map((x) => x.id)

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
	// let min_distance = filterCriteria.distanceRange[0]
	// let max_distance = filterCriteria.distanceRange[1]
	// let min_price = filterCriteria.priceRange[0]
	// let max_price = filterCriteria.priceRange[1]
	// let sort_on = filterCriteria.sort_on || ""

	// do not check specialization_ids if doctor_name || hospital_name search
	// if (!!filterCriteria.lab_name) {
	// 	testIds = ""
	// }
	let catIds = filterCriteria.catIds || ""
	let url = `/api/v1/diagnostic/packagelist?`

	if (searchByUrl) {
		url = `/api/v1/diagnostic/packagelist?url=${searchByUrl.split('/')[1]}&`
	}

	// url += `ids=${testIds || ""}&long=${long || ""}&lat=${lat || ""}&min_distance=${min_distance}&max_distance=${max_distance}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&page=${page}`
	url += `long=${long || ""}&lat=${lat || ""}&category_ids=${catIds || ""}`

	if (!!filterCriteria.lab_name) {
		url += `&name=${filterCriteria.lab_name || ""}`
	}

	if (!!filterCriteria.network_id) {
		url += `&network_id=${filterCriteria.network_id || ""}`
	}

	return API_GET(url).then(function (response) {
		if (response) {
		// let tests = response.tests.map((x) => {
		// 	x.type = 'test'
		// 	return x
		// })
			let tests=''
			let currentSearchedCriterias = tests || []

			dispatch({
				type: MERGE_SEARCH_STATE_LAB,
				payload: {
					currentSearchedCriterias
				},
				fetchNewResults: false
			})

			dispatch({
				type: SEARCH_HEALTH_PACKAGES,
				payload: response,
			})
		}

		// dispatch({
		// 	type: SET_FETCH_RESULTS_LAB,
		// 	payload: false
		// })

		// dispatch({
		// 	type: APPEND_LABS_SEARCH,
		// 	payload: response.result
		// })

		// dispatch({
		// 	type: LAB_SEARCH,
		// 	payload: {
		// 		page, ...response
		// 	}

		// })

		if (page == 1) {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'LabSearchCount', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-search-count', 'LabSearchCount': response.count || 0
			}
			GTM.sendEvent({ data: data })
		}

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

export const setLabSearchId = (searchId, filters, setDefault=true) => (dispatch) => {
	dispatch({
		type: SET_LAB_SEARCH_ID,
		payload: filters,
		searchId: searchId,
		setDefault: setDefault
	})
}

export const getLabSearchIdResults = (searchId, data) => (dispatch) => {
	dispatch({
		type: GET_LAB_SEARCH_ID_RESULTS,
		searchId: searchId
	})
	dispatch({
		type: APPEND_LABS_SEARCH,
		payload: data.result
	})

	dispatch({
		type: LAB_SEARCH,
		payload: {
			page:1, ...data
		}

	})

}






