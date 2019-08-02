import { GET_CITIES_MAP, GET_CITIES_SPECIALITIES, GET_SPECIALITIES_CITIES, GET_SPECIALITIES_MAP, GET_TESTS_ALPHABETICALLY, GET_TESTS_FLAG, GET_INSURANCE_NETWORK, SET_NETWORK_TYPE, START_FETCHING_IPD_LIST, GET_IPD_ALPHABETICALLY, START_FETCHING_HOSPITAL_LIST, GET_HOSPITAL_LIST_DATA, GET_HOSPITAL_LOCALITY_LIST, START_FETCHING_HOSPITAL_LOCALITY_LIST } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';

export const getCitiesMap = (city = "", page = 0) => (dispatch) => {
	let url = '/api/v1/location/city-inventory'

	if (city) {
		url += `/${city}`
	}

	if (page) {
		url += '?page=${page}'
	}

	return API_GET(url).then(function (response) {

		if (city) {

			dispatch({
				type: GET_CITIES_SPECIALITIES,
				payload: response
			})

		} else {

			dispatch({
				type: GET_CITIES_MAP,
				payload: response.cities
			})
		}

	}).catch(function (error) {

	})
}

export const getSpecialitiesMap = (speciality = "", page = 0, cb) => (dispatch) => {
	let url = '/api/v1/location/speciality-inventory'

	if (speciality) {
		url += `/${speciality}`
	}

	if (page) {
		url += `?page_no=${page}`
	}

	return API_GET(url).then(function (response) {

		if (speciality) {

			dispatch({
				type: GET_SPECIALITIES_CITIES,
				payload: response
			})
			if (cb) cb(response)

		} else {

			dispatch({
				type: GET_SPECIALITIES_MAP,
				payload: response
			})
		}

	}).catch(function (error) {

	})
}

export const getTestsAlphabetically = (character) => (dispatch) => {
	let url = `/api/v1/diagnostic/test/list_by_alphabet?alphabet=${character}`
	dispatch({
		type: GET_TESTS_FLAG,
		flag: true
	})
	return API_GET(url).then(function (response) {
		dispatch({
			type: GET_TESTS_ALPHABETICALLY,
			payload: response,
			flag: false
		})
	}).catch(function (error) {

	})
}

export const getInsuranceNetworks = (lat, long, type, searchString, searchBy) => (dispatch) => {
	let url = `/api/v1/insurance/network/search?latitude=${lat}&longitude=${long}&type=${type}&search=${searchBy}&starts_with=${searchString}`
	return API_GET(url).then(function (response) {
		dispatch({
			type: GET_INSURANCE_NETWORK,
			payload: response
		})
	}).catch(function (error) {

	})
}

export const setNetworkType = (type) => (dispatch) => {
	dispatch({
		type: SET_NETWORK_TYPE,
		payload: type
	})
}

export const getIPDAlphabetically = (character, selectedLocation) => (dispatch) => {

	let lat = 28.644800
	let long = 77.216721
	let place_id = ""
	let locality = ""
	let sub_locality = ""

	if (selectedLocation && (selectedLocation.geometry || selectedLocation.place_id)) {
		lat = selectedLocation.geometry.location.lat
		long = selectedLocation.geometry.location.lng
		place_id = selectedLocation.place_id || ""
		if (typeof lat === 'function') lat = lat()
		if (typeof long === 'function') long = long()
		locality = selectedLocation.locality || ""
		sub_locality = selectedLocation.sub_locality || ""
	} else {
		locality = "Delhi"
	}

	let url = `/api/v1/doctor/ipd_procedure/list_by_alphabet?alphabet=${character}&city=${locality}&lat=${lat}&long=${long}`
	dispatch({
		type: START_FETCHING_IPD_LIST,
		flag: true
	})
	return API_GET(url).then(function (response) {
		dispatch({
			type: GET_IPD_ALPHABETICALLY,
			payload: response,
			flag: false,
			character: character
		})
	}).catch(function (error) {

	})
}

export const getHospitalList = (selectedLocation = null, page = 1) => (dispatch) => {

	let lat = 28.644800
	let long = 77.216721
	let place_id = ""
	let locality = ""
	let sub_locality = ""

	if (selectedLocation && (selectedLocation.geometry || selectedLocation.place_id)) {
		lat = selectedLocation.geometry.location.lat
		long = selectedLocation.geometry.location.lng
		place_id = selectedLocation.place_id || ""
		if (typeof lat === 'function') lat = lat()
		if (typeof long === 'function') long = long()
		locality = selectedLocation.locality || ""
		sub_locality = selectedLocation.sub_locality || ""
	} else {
		locality = "Delhi"
	}

	let url = `/api/v1/location/city-inventory-hospitals?city=${locality}&lat=${lat}&long=${long}&page=1`
	dispatch({
		type: START_FETCHING_HOSPITAL_LIST,
		flag: true
	})
	return API_GET(url).then(function (response) {
		dispatch({
			type: GET_HOSPITAL_LIST_DATA,
			payload: response,
			flag: false
		})
	}).catch(function (error) {

	})
}

export const getHospitalInventoryList = (city) => (dispatch) => {
	let url = `/api/v1/location/locality-inventory-hospitals?city=${city}`
	dispatch({
		type: START_FETCHING_HOSPITAL_LOCALITY_LIST,
		flag: true
	})
	return API_GET(url).then(function (response) {
		dispatch({
			type: GET_HOSPITAL_LOCALITY_LIST,
			payload: response,
			flag: false
		})
	}).catch(function (error) {

	})
}