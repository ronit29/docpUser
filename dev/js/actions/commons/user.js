import { APPEND_USER_PROFILES } from '../../constants/types';
import { API_GET } from '../../api/api.js';


export const getUserProfile = () => (dispatch) => {
	API_GET('/user.json').then(function (response) {
		
		dispatch({
			type: APPEND_USER_PROFILES,
			payload: response.profiles
		})

	}).catch(function (error) {

	})
}

export const getUserProfileWithAppointments = () => (dispatch) => {
	API_GET('/user_profile_appointments.json').then(function (response) {
		
		dispatch({
			type: APPEND_USER_PROFILES,
			payload: response.profiles
		})

	}).catch(function (error) {

	})
}

export const getUserProfileWithTests = () => (dispatch) => {
	API_GET('/user_profile_tests.json').then(function (response) {
		
		dispatch({
			type: APPEND_USER_PROFILES,
			payload: response.profiles
		})

	}).catch(function (error) {

	})
}

