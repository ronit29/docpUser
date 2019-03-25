import { IS_USER_CARED} from '../../constants/types';
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
		if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const retrieveCareDetails = (selectedPlan,callback) => (dispatch) => {

	API_GET('/api/v1/subscription_plan/retrieve?user_plan='+parseInt(selectedPlan)).then(function (response) {
    	if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const getIsCareDetails = () => (dispatch) => {

	return API_GET('/api/v1/subscription_plan/has_plan').then(function (response) {
		dispatch({
			type: IS_USER_CARED,
			payload: response
		})

	}).catch(function (error) {

	})

}