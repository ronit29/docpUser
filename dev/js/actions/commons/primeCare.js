import { } from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm.js'

export const getCareDetails = (callback) => (dispatch) => {

	API_GET('/api/v1/subscription_plan/list').then(function (response) {
    	if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const createCareBooking = (selectedPlan, callback) => (dispatch) => {
	return API_POST(`/api/v1/subscription_plan/buy`, selectedPlan).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}
