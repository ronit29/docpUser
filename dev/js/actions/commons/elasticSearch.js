import { GET_ELASTIC_RESULTS } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import CONFIG from '../../config'
import GTM from '../../helpers/gtm.js'

export const getElasticCriteriaResults = (searchString, type, location, cb='') => (dispatch) => {
	
	let visitor_info = GTM.getVisitorInfo()
	let visit_id = ''
	if(visitor_info && visitor_info.visit_id){
		visit_id = visitor_info.visit_id
	}
	let url = `${CONFIG.API_BASE_URL_ELASTIC_SEARCH}?query=${searchString}&type=${type}&max_distance=15&lat=${location.lat}&long=${location.long}&visitId=${visit_id}`
	
	return API_GET(url).then(response=> response.body)
	.catch(function (error) {

	})

}
