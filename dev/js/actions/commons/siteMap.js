import { GET_CITIES_MAP, GET_CITIES_SPECIALITIES, GET_SPECIALITIES_CITIES, GET_SPECIALITIES_MAP } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';

export const getCitiesMap = (city = "", page = 0) => (dispatch) => {
	let url = '/api/v1/location/city-inventory'
	
	if(city){
		url+= `/${city}`
	}

	if(page) {
		url+= '?page=${page}'
	}

	return API_GET(url).then(function (response) {
		
		if(city){

			dispatch({
				type: GET_CITIES_SPECIALITIES,
				payload: response
			})

		}else{
			
			dispatch({
				type: GET_CITIES_MAP,
				payload: response.cities
			})
		}
		
	}).catch(function (error) {

	})
}

export const getSpecialitiesMap = (speciality = "", page = 0) => (dispatch) => {
	let url = '/api/v1/location/speciality-inventory'
	
	if(speciality){
		url+= `/${speciality}`
	}

	if(page) {
		url+= `?page_no=${page}`
	}

	return API_GET(url).then(function (response) {
		
		if(speciality){

			dispatch({
				type: GET_SPECIALITIES_CITIES,
				payload: response
			})

		}else{
			
			dispatch({
				type: GET_SPECIALITIES_MAP,
				payload: response
			})
		}
		
	}).catch(function (error) {

	})
}