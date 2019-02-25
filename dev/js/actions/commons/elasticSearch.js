import { GET_ELASTIC_RESULTS } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import CONFIG from '../../config'

export const getElasticCriteriaResults = (searchString, type, location, cb='') => (dispatch) => {
	
	let url = `${CONFIG.API_BASE_URL_ELASTIC_SEARCH}?query=${searchString}&type=${type}&max_distance=15&lat=${location.lat}&long=${location.long}`
	
	return API_GET(url).then(response=> response.body)
	.catch(function (error) {

	})

}
