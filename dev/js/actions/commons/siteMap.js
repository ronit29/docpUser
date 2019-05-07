import { GET_CITIES_MAP, GET_CITIES_SPECIALITIES, GET_SPECIALITIES_CITIES, GET_SPECIALITIES_MAP, GET_TESTS_ALPHABETICALLY, GET_TESTS_FLAG, START_FETCHING_IPD_LIST, GET_IPD_ALPHABETICALLY } from '../../constants/types';
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

export const getIPDAlphabetically = (character) => (dispatch) => {
	let url = `/api/v1/doctor/ipd_procedure/list_by_alphabet?alphabet=${character}`
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