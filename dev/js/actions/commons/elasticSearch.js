import { GET_ELASTIC_RESULTS } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import CONFIG from '../../config'

export const getElasticCriteriaResults = (searchString, type, location, cb) => (dispatch) => {
	//let url = `http://10.0.8.46:4000/typeahead?query=${searchString}`
	let url = `${CONFIG.API_BASE_URL_ELASTIC_SEARCH}?query=${searchString}&type=${type}&max_distance=15&lat=${location.lat}&long=${location.long}`
	API_GET(url).then(function (response) {
		
		if(cb) cb(response.body)
	}).catch(function (error) {

	})

}
