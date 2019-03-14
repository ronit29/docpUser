import { } from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getCareDetails = (callback) => (dispatch) => {

	API_GET('/api/v1/insurance/list').then(function (response) {
    	if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}