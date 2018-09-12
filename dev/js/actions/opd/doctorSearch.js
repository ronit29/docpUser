import { SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH_START, APPEND_DOCTORS, DOCTOR_SEARCH, MERGE_SEARCH_STATE_OPD } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm.js'

export const getDoctors = (searchState = {}, filterCriteria = {}, mergeState = false, page = 1, cb) => (dispatch) => {
	let dedupe_ids = {}
	let specialization_ids = searchState.selectedCriterias
		.reduce((final, x) => {
			final = final || []
			if (x.specialization && x.type == "condition") {
				final = [...final, ...x.specialization]
			} else if (x.type == "speciality") {
				final.push(x.id)
			}
			return final
		}, [])
		.filter((x) => {
			if (dedupe_ids[x]) {
				return false
			} else {
				dedupe_ids[x] = true
				return true
			}
		})
		.reduce((finalStr, curr, i) => {
			if (i != 0) {
				finalStr += ','
			}
			finalStr += `${curr}`
			return finalStr
		}, "")

	let sits_at = []
	// if(filterCriteria.sits_at_clinic) sits_at.push('clinic');
	// if(filterCriteria.sits_at_hospital) sits_at.push('hospital');
	// if(sits_at.length == 0) sits_at = ['clinic','hospital'];
	sits_at = sits_at.join(',')

	let lat = 28.644800
	let long = 77.216721
	if (searchState.selectedLocation) {
		lat = searchState.selectedLocation.geometry.location.lat
		long = searchState.selectedLocation.geometry.location.lng

		if (typeof lat === 'function') lat = lat()
		if (typeof long === 'function') long = long()
	}

	let min_fees = filterCriteria.priceRange[0]
	let max_fees = filterCriteria.priceRange[1]
	let sort_on = filterCriteria.sort_on || ""
	let is_available = filterCriteria.is_available
	let is_female = filterCriteria.is_female

	// do not check specialization_ids if doctor_name || hospital_name search
	if (!!filterCriteria.doctor_name || !!filterCriteria.hospital_name) {
		specialization_ids = ""
	}

	let url = `/api/v1/doctor/doctorsearch?specialization_ids=${specialization_ids}&sits_at=${sits_at}&latitude=${lat}&longitude=${long}&min_fees=${min_fees}&max_fees=${max_fees}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&page=${page}`

	if (!!filterCriteria.doctor_name) {
		url += `&doctor_name=${filterCriteria.doctor_name}`
		delete filterCriteria.doctor_name
	}

	if (!!filterCriteria.hospital_name) {
		url += `&hospital_name=${filterCriteria.hospital_name}`
		delete filterCriteria.hospital_name
	}

	if (page == 1) {
		dispatch({
			type: DOCTOR_SEARCH_START,
			payload: null
		})
	}

	return API_GET(url).then(function (response) {

		dispatch({
			type: APPEND_DOCTORS,
			payload: response.result || []
		})

		dispatch({
			type: DOCTOR_SEARCH,
			payload: {
				page,
				...response
			}

		})

		if (page ==1) {

			let data = {
                'Category':'ConsumerApp','Action':'DoctorSearchCount','CustomerID':GTM.getUserId()||'','leadid':0,'event':'doctor-search-count' ,'selected':response.count||''}
            GTM.sendEvent({ data: data })

		}

		if (mergeState) {
			dispatch({
				type: MERGE_SEARCH_STATE_OPD,
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

export const getDoctorById = (doctorId) => (dispatch) => {

	return API_GET(`/api/v1/doctor/profileuserview/${doctorId}`).then(function (response) {

		dispatch({
			type: APPEND_DOCTORS,
			payload: [response]
		})

	}).catch(function (error) {

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