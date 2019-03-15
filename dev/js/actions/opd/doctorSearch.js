import { SET_FETCH_RESULTS_OPD, SET_SERVER_RENDER_OPD, SELECT_LOCATION_OPD, SELECT_LOCATION_DIAGNOSIS, SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH_START, APPEND_DOCTORS, DOCTOR_SEARCH, MERGE_SEARCH_STATE_OPD, ADD_OPD_COUPONS, REMOVE_OPD_COUPONS, APPLY_OPD_COUPONS, RESET_OPD_COUPONS, SET_PROCEDURES, TOGGLE_PROFILE_PROCEDURES, SAVE_COMMON_PROCEDURES, APPEND_DOCTORS_PROFILE, SAVE_PROFILE_PROCEDURES, APPEND_HOSPITALS, HOSPITAL_SEARCH, SET_SEARCH_ID, GET_SEARCH_ID_RESULTS, SAVE_RESULTS_WITH_SEARCHID, MERGE_URL_STATE, SET_URL_PAGE, SET_NEXT_SEARCH_CRITERIA, TOGGLE_404, CLEAR_OPD_SEARCH_ID, SELECT_OPD_PAYMENT_TYPE } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm.js'
import { _getlocationFromLatLong, _getLocationFromPlaceId, _getNameFromLocation } from '../../helpers/mapHelpers.js'

export const getDoctors = (state = {}, page = 1, from_server = false, searchByUrl = false, cb, clinic_card = false) => (dispatch) => {

	if (page == 1) {
		dispatch({
			type: DOCTOR_SEARCH_START,
			payload: null
		})
	}

	// dispatch({
	// 	type: SET_SERVER_RENDER_OPD,
	// 	payload: from_server
	// })

	let { selectedLocation, commonSelectedCriterias, filterCriteria, locationType } = state
	let specializations_ids = commonSelectedCriterias.filter(x => x.type == 'speciality').map(x => x.id)
	let condition_ids = commonSelectedCriterias.filter(x => x.type == 'condition').map(x => x.id)
	let procedures_ids = commonSelectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)
	let category_ids = commonSelectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.id)
	let ipd_ids = commonSelectedCriterias.filter(x => x.type == 'ipd').map(x => x.id)

	let sits_at = []
	// if(filterCriteria.sits_at_clinic) sits_at.push('clinic');
	// if(filterCriteria.sits_at_hospital) sits_at.push('hospital');
	// if(sits_at.length == 0) sits_at = ['clinic','hospital'];
	sits_at = sits_at.join(',')

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
	let min_fees = filterCriteria.priceRange[0]
	let max_fees = filterCriteria.priceRange[1]
	let sort_on = filterCriteria.sort_on || ""
	let is_available = filterCriteria.is_available
	let is_female = filterCriteria.is_female

	// do not check specialization_ids if doctor_name || hospital_name search
	if (!!filterCriteria.doctor_name || !!filterCriteria.hospital_name) {
		specializations_ids = ""
		condition_ids = ""
		procedures_ids = ""
		category_ids = "",
			ipd_ids = ""
	}

	let url = `/api/v1/doctor/doctorsearch?`

	if (searchByUrl) {
		url = `/api/v1/doctor/doctorsearch_by_url?url=${searchByUrl.split('/')[1]}&`
	}

	if (clinic_card) {
		url = `/api/v1/doctor/doctorsearchbyhospital?`
	}

	url += `specialization_ids=${specializations_ids || ""}&condition_ids=${condition_ids || ""}&sits_at=${sits_at}&latitude=${lat || ""}&longitude=${long || ""}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&page=${page}&procedure_ids=${procedures_ids || ""}&procedure_category_ids=${category_ids || ""}&ipd_procedure_ids=${ipd_ids || ""}`

	if (!!filterCriteria.doctor_name) {
		url += `&doctor_name=${filterCriteria.doctor_name || ""}`
	}

	if (!!filterCriteria.hospital_name) {
		url += `&hospital_name=${filterCriteria.hospital_name || ""}`
	}

	if (!!filterCriteria.hospital_id) {
		url += `&hospital_id=${filterCriteria.hospital_id || ''}`
	}

	return API_GET(url).then(function (response) {

		let specializations = response.specializations.map((x) => {
			x.type = 'speciality'
			return x
		})

		let conditions = response.conditions.map((x) => {
			x.type = 'condition'
			return x
		})

		let procedures = response.procedures.map((x) => {
			x.type = 'procedures'
			return x
		})

		let procedure_category = response.procedure_categories.map((x) => {
			x.type = 'procedures_category'
			return x
		})

		let ipd_data = response.ipd_procedures ? response.ipd_procedures.map((x) => {
			x.type = 'ipd'
			return x
		}) : []

		let commonSelectedCriterias = [...specializations, ...conditions, ...procedure_category, ...procedures, ...ipd_data]

		let show404 = false
		// show 404 on server when no resultd
		if (response.result && response.result.length == 0 && from_server && searchByUrl) {
			show404 = true
		}

		dispatch({
			type: MERGE_SEARCH_STATE_OPD,
			payload: {
				commonSelectedCriterias
			},
			fetchNewResults: false
		})

		dispatch({
			type: SAVE_RESULTS_WITH_SEARCHID,
			payload: response,
			page: page,
			clinic_card: clinic_card
		})
		if (clinic_card) {
			dispatch({
				type: APPEND_HOSPITALS,
				payload: response.result || []
			})
		} else {
			dispatch({
				type: APPEND_DOCTORS,
				payload: response.result || []
			})
		}

		if (clinic_card) {
			dispatch({
				type: HOSPITAL_SEARCH,
				payload: {
					show404,
					page,
					...response
				}

			})
		} else {
			dispatch({
				type: DOCTOR_SEARCH,
				payload: {
					show404,
					page,
					...response
				}

			})
		}

		let specialization_ids = specializations && specializations.length ? specializations.map(x => x.id).join(',') : ''
		let condition_ids = conditions && conditions.length ? conditions.map(x => x.id).join(',') : ''
		let procedure_ids = procedures && procedures.length ? procedures.map(x => x.id).join(',') : ''
		let procedure_category_ids = procedure_category && procedure_category.length ? procedure_category.map(x => x.id).join(',') : ''

		let ipd_ids = ipd_data && ipd_data.length ? ipd_data.map(x => x.id).join(',') : ''

		if (page == 1) {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'DoctorSearchCount', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-search-count', 'DoctorSearchCount': response.count || 0, 'specializations': specialization_ids, 'conditions': condition_ids, 'procedures': procedure_ids, 'procedure_category': procedure_category_ids, 'doctor_name': filterCriteria.doctor_name || '', 'hospital_name': filterCriteria.hospital_name || '', 'hospital_id': filterCriteria.hospital_id || '', 'ipd_ids': ipd_ids || ''
			}
			GTM.sendEvent({ data: data })
		}

		if (cb) {
			// if no results redirect to 404 page
			if (response.result && response.result.length == 0) {
				cb(false, true)
			}
			// TODO: DO not hardcode page length
			if (response.result && response.result.length == 20) {
				cb(true)
			}
		}

		cb(false)

	}).catch(function (error) {
		throw error
	})
}

export const getDoctorById = (doctorId, hospitalId = "", procedure_ids = "", category_ids = "") => (dispatch) => {
	procedure_ids = ''
	category_ids = ''
	return API_GET(`/api/v1/doctor/profileuserview/${doctorId}?hospital_id=${hospitalId || ""}&procedure_ids=${procedure_ids || ""}&procedure_category_ids=${category_ids || ""}`).then(function (response) {

		dispatch({
			type: APPEND_DOCTORS_PROFILE,
			payload: [response]
		})

		dispatch({
			type: SET_PROCEDURES,
			payload: response,
			doctorId: doctorId,
			commonProcedurers: procedure_ids
		})

	}).catch(function (error) {

	})
}

export const getDoctorByUrl = (doctor_url, hospitalId = "", procedure_ids = "", category_ids = "", cb) => (dispatch) => {
	procedure_ids = ''
	category_ids = ''
	return API_GET(`/api/v1/doctor/profileuserviewbyurl?url=${doctor_url}&hospital_id=${hospitalId}&procedure_ids=${procedure_ids || ""}&procedure_category_ids=${category_ids || ""}`).then(function (response) {
		dispatch({
			type: APPEND_DOCTORS_PROFILE,
			payload: [response]
		})

		dispatch({
			type: SET_PROCEDURES,
			payload: response,
			doctorId: response.id,
			commonProcedurers: procedure_ids
		})

		cb((response.id ? response.id : null), null)
	}).catch(function (error) {
		cb(null, error.url)
	})
}

export const selectOpdTimeSLot = (slot, reschedule = false, appointmentId = null) => (dispatch) => {
	dispatch({
		type: SELECT_OPD_TIME_SLOT,
		payload: {
			reschedule,
			slot,
			appointmentId
		}
	})
}

export const getTimeSlots = (doctorId, clinicId, callback) => (dispatch) => {
	return API_GET(`/api/v1/doctor/doctortiming?doctor_id=${doctorId}&hospital_id=${clinicId}`).then(function (response) {
		callback(response)
	}).catch(function (error) {

	})
}

export const createOPDAppointment = (postData, callback) => (dispatch) => {
	postData['visitor_info'] = GTM.getVisitorInfo()
	return API_POST(`/api/v1/doctor/appointment/create`, postData).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const retryPaymentOPD = (appointmentId, callback) => (dispatch) => {
	return API_GET(`/api/v1/doctor/appointment/payment/retry/${appointmentId}`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const getOPDBookingSummary = (appointmentID, callback) => (dispatch) => {
	API_GET(`/api/v1/user/appointment/${appointmentID}?type=doctor`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const updateOPDAppointment = (appointmentData, callback) => (dispatch) => {
	API_POST(`/api/v1/user/appointment/${appointmentData.id}/update?type=doctor`, appointmentData).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const getDoctorNumber = (doctorId, hospital_id, callback) => (dispatch) => {
	API_GET(`/api/v1/doctor/contact-number/${doctorId}?hospital_id=${hospital_id}`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const applyOpdCoupons = (productId = '', couponCode, couponId, doctor_id, dealPrice, hospitalId, profile_id = null, procedures_ids = [], cart_item = null) => (dispatch) => {

	API_POST(`/api/v1/coupon/discount`, {
		coupon_code: [couponCode],
		deal_price: dealPrice,
		product_id: productId,
		doctor: doctor_id,
		hospital: hospitalId,
		profile: profile_id,
		procedures: [],//procedures_ids || [],
		cart_item
	}).then(function (response) {
		let analyticData = {
			'Category': 'ConsumerApp', 'Action': 'OpdCouponApplied', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-coupon-applied', 'couponId': couponId
		}
		GTM.sendEvent({ data: analyticData })
		if (response && response.status == 1) {
			dispatch({
				type: APPLY_OPD_COUPONS,
				payload: response
			})
		} else {
			dispatch({
				type: REMOVE_OPD_COUPONS,
				hospitalId: doctor_id,
				couponId: couponId
			})
		}
	}).catch(function (error) {
		dispatch({
			type: REMOVE_OPD_COUPONS,
			hospitalId: doctor_id,
			couponId: couponId
		})
	})
}

export const removeCoupons = (hospitalId, couponId) => (dispatch) => {

	dispatch({
		type: REMOVE_OPD_COUPONS,
		hospitalId: hospitalId,
		couponId: couponId
	})
}

export const resetOpdCoupons = () => (dispatch) => {
	dispatch({
		type: RESET_OPD_COUPONS
	})
}

export const getFooterData = (url) => (dispatch) => {
	return API_GET(`/api/v1/location/dynamicfooters?url=${url}`).then(function (response) {
		return response
	}).catch(function (error) {

	})
}


export const toggleProfileProcedures = (procedure = [], doctor_id, hospital_id) => (dispatch) => {

	dispatch({
		type: TOGGLE_PROFILE_PROCEDURES,
		procedure: procedure,
		doctor_id: doctor_id,
		hospital_id: hospital_id
	})
}

export const getSpecialityFooterData = (cb) => (dispatch) => {
	return API_GET(`api/v1/location/static-speciality-footer`).then(function (response) {
		return cb(response)
	}).catch(function (error) {

	})
}

export const saveProfileProcedures = (doctor_id = '', clinic_id = '', selectedProcedures = [], forceAdd = false) => (dispatch) => {
	dispatch({
		type: SAVE_PROFILE_PROCEDURES,
		doctor_id: doctor_id,
		clinic_id: clinic_id,
		forceAdd: forceAdd,
		selectedProcedures: selectedProcedures
	})
}

export const getDoctorNo = (postData, cb) => (dispatch) => {
	return API_POST(`/api/v1/matrix/mask-number`, postData).then(function (response) {
		cb(null, response)
	}).catch(function (error) {
		cb(error, null)
	})
}

export const setSearchId = (searchId, filters, page = 1) => (dispatch) => {
	dispatch({
		type: SET_SEARCH_ID,
		payload: filters,
		searchId: searchId,
		page: page
	})
}

export const getSearchIdResults = (searchId, response) => (dispatch) => {
	dispatch({
		type: GET_SEARCH_ID_RESULTS,
		searchId: searchId
	})
	if (response.data.clinic_card) {
		dispatch({
			type: APPEND_HOSPITALS,
			payload: response.data.result || []
		})
	} else {
		dispatch({
			type: APPEND_DOCTORS,
			payload: response.data.result || []
		})
	}
	dispatch({
		type: SET_URL_PAGE,
		payload: response.page || 1
	})
	if (response.data.clinic_card) {
		dispatch({
			type: HOSPITAL_SEARCH,
			payload: {
				page: response.page || 1,
				...response.data
			}

		})
	} else {
		dispatch({
			type: DOCTOR_SEARCH,
			payload: {
				page: response.page || 1,
				...response.data
			}

		})
	}
}

export const mergeUrlState = (flag = false) => (dispatch) => {
	dispatch({
		type: MERGE_URL_STATE,
		payload: flag
	})
}

export const setNextSearchCriteria = () => (dispatch) => {
	dispatch({
		type: SET_NEXT_SEARCH_CRITERIA
	})
}

export const toggle404 = (status = false) => (dispatch) => {
	dispatch({
		type: TOGGLE_404,
		payload: status
	})
}

export const clearOpdSearchId = () => (dispatch) => {
	dispatch({
		type: CLEAR_OPD_SEARCH_ID
	})
}

export const select_opd_payment_type = (type = 1) => (dispatch) => {
	dispatch({
		type: SELECT_OPD_PAYMENT_TYPE,
		payload: type
	})
}