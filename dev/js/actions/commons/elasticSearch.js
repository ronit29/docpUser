import { GET_ELASTIC_RESULTS } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';

export const getElasticCriteriaResults = (searchString, cb) => (dispatch) => {

	//let url = `http://10.0.8.46:4000/typeahead?query=${searchString}`
	let url = `https://l74e1dhn67.execute-api.ap-south-1.amazonaws.com/default?query=${searchString}&max_distance=15&lat=12&long=23`
	API_GET(url).then(function (response) {
		/*dispatch({
			type: GET_ELASTIC_RESULTS,
			payload: response
		})*/
		if(cb) cb(response.body)
	}).catch(function (error) {

	})

}
