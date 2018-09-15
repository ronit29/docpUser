import { SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH_START, APPEND_DOCTORS, DOCTOR_SEARCH, MERGE_SEARCH_STATE_OPD } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm.js'
import { debug } from 'util';

export const getDoctors = (searchState = {}, filterCriteria = {}, mergeState = false, page = 1, cb) => (dispatch) => {
	let sits_at = []
	// if(filterCriteria.sits_at_clinic) sits_at.push('clinic');
	// if(filterCriteria.sits_at_hospital) sits_at.push('hospital');
	// if(sits_at.length == 0) sits_at = ['clinic','hospital'];
	sits_at = sits_at.join(',')

	let lat = 28.644800
	let long = 77.216721
	let place_id = ""

	if (searchState.selectedLocation) {
		lat = searchState.selectedLocation.geometry.location.lat
		long = searchState.selectedLocation.geometry.location.lng
		place_id = searchState.selectedLocation.place_id || ""
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
		searchState.specializations_ids = ""
		searchState.condition_ids = ""
	}

	let url = `/api/v1/doctor/doctorsearch?specialization_ids=${searchState.specializations_ids}&condition_ids=${searchState.condition_ids}&sits_at=${sits_at}&latitude=${lat}&longitude=${long}&min_fees=${min_fees}&max_fees=${max_fees}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&page=${page}`

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

		if (page == 1) {

			let data = {
				'Category': 'ConsumerApp', 'Action': 'DoctorSearchCount', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-search-count', 'DoctorSearchCount': response.count || 0
			}
			GTM.sendEvent({ data: data })

		}

		if (mergeState) {

			let specialization_criterias = response.specializations.map((x) => {
				x.type = 'speciality'
				return x
			})
			let condition_criterias = response.conditions.map((x) => {
				x.type = 'condition'
				return x
			})

			if (place_id) {
				_getLocationFromPlaceId(place_id, (locationData) => {
					searchState.selectedLocation = locationData
					searchState.selectedCriterias = [...specialization_criterias, ...condition_criterias]

					dispatch({
						type: MERGE_SEARCH_STATE_OPD,
						payload: {
							searchState,
							filterCriteria
						}
					})
				})
			} else {
				_getlocationFromLatLong(lat, long, (locationData) => {
					searchState.selectedLocation = locationData
					searchState.selectedCriterias = []

					dispatch({
						type: MERGE_SEARCH_STATE_OPD,
						payload: {
							searchState,
							filterCriteria
						}
					})
				})
			}
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

function _getlocationFromLatLong(lat, long, cb) {
	if (google) {
		var latlng = { lat: parseFloat(parseFloat(lat).toFixed(6)), lng: parseFloat(parseFloat(long).toFixed(6)) };

		let geocoder = new google.maps.Geocoder
		geocoder.geocode({ 'location': latlng }, (results, status) => {
			if (results && results[0]) {
				let location_type = "sublocality"
				if (lat == "28.6448") {
					location_type = 'locality'
				}
				let location_object = {
					formatted_address: _getNameFromLocation(results[0], location_type),
					name: _getNameFromLocation(results[0], location_type),
					place_id: results[0].place_id,
					geometry: results[0].geometry
				}
				cb(location_object)
			}
		})
	}
}

function _getLocationFromPlaceId(placeId, cb) {
	if (google) {
		let map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: 28, lng: 77 },
			zoom: 15
		})
		let service = new google.maps.places.PlacesService(map);
		service.getDetails({
			reference: placeId
		}, function (place, status) {
			let location_object = {
				formatted_address: place.formatted_address,
				name: place.name,
				place_id: place.place_id,
				geometry: place.geometry
			}

			cb(location_object)

		}.bind(this))
	}
}

function _getNameFromLocation(result, type) {
	let name = result.formatted_address
	if (result.address_components && result.address_components.length) {
		for (let i = result.address_components.length - 1; i >= 0; i--) {
			if (result.address_components[i].types) {
				for (let x of result.address_components[i].types) {
					if (x == type) {
						name = result.address_components[i].long_name
					}
				}
			}
		}
	}
	return name
}