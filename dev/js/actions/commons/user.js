import { APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';


export const getUserProfile = () => (dispatch) => {
	return API_GET('/api/v1/user/userprofile').then(function (response) {
		dispatch({
			type: APPEND_USER_PROFILES,
			payload: response
		})

	}).catch(function (error) {

	})
}

export const getProfileAppointments = (profile_id) => (dispatch) => {
	API_GET(`/api/v1/user/appointment?profile_id=${profile_id}`).then(function (response) {

		dispatch({
			type: APPEND_USER_APPOINTMENTS,
			payload: {
				profile_id, appointments: response
			}
		})

	}).catch(function (error) {

	})
}

export const createProfile = (postData, cb) => (dispatch) => {

	API_POST('/api/v1/user/userprofile/add', postData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const selectProfile = (profile_id, cb) => (dispatch) => {
	dispatch({
		type: SELECT_USER_PROFILE,
		payload: profile_id
	})
}

export const getUserAddress = () => (dispatch) => {
	API_GET(`/api/v1/user/address`).then(function (response) {
		dispatch({
			type: APPEND_ADDRESS,
			payload: response
		})
	}).catch(function (error) {

	})
}

export const addUserAddress = (postData, cb) => (dispatch) => {
	API_POST('/api/v1/user/address/create', postData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const updateUserAddress = (postData, cb) => (dispatch) => {
	API_POST(`/api/v1/user/address/${postData.id}/update`, postData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
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