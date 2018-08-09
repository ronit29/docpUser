import { APPEND_CHAT_HISTORY, APPEND_CHAT_DOCTOR, APPEND_ARTICLES, APPEND_ORDER_HISTORY, APPEND_USER_TRANSACTIONS, APPEND_UPCOMING_APPOINTMENTS, APPEND_NOTIFICATIONS, APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE, APPEND_HEALTH_TIP } from '../../constants/types';
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
	API_GET(`/api/v1/user/appointment`).then(function (response) {

		dispatch({
			type: APPEND_USER_APPOINTMENTS,
			payload: {
				profile_id, appointments: response
			}
		})

	}).catch(function (error) {

	})
}

export const getUpcomingAppointments = () => (dispatch) => {
	API_GET(`/api/v1/user/appointment?range=upcoming`).then(function (response) {

		dispatch({
			type: APPEND_UPCOMING_APPOINTMENTS,
			payload: {
				appointments: response
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

export const editUserProfile = (profileData, profileId, cb) => (dispatch) => {
	API_POST(`/api/v1/user/userprofile/${profileId}/edit`, profileData).then(function (response) {
		dispatch({
			type: APPEND_USER_PROFILES,
			payload: [response]
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const editUserProfileImage = (profileData, profileId, cb) => (dispatch) => {
	API_POST(`/api/v1/user/userprofile/${profileId}/upload`, profileData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
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

export const getAppointmentReports = (appointmentId, type, cb) => (dispatch) => {
	API_GET(`/api/v1/doctor/prescription-file?appointment=${appointmentId}`).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchNotifications = (cb) => (dispatch) => {
	API_GET(`/api/v1/notification/appnotifications`).then(function (response) {
		dispatch({
			type: APPEND_NOTIFICATIONS,
			payload: {
				replace: true, notifications: response.data
			}
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const markNotificationsAsViewed = (cb) => (dispatch) => {
	API_POST(`/api/v1/notification/marknotificationsasviewed`, {}).then(function (response) {
		dispatch({
			type: APPEND_NOTIFICATIONS,
			payload: {
				replace: true, notifications: response.data
			}
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const markNotificationsAsRead = (notificationid = "", cb) => (dispatch) => {
	API_POST(`/api/v1/notification/marknotificationsasread`, { notificationids: notificationid.toString() }).then(function (response) {
		dispatch({
			type: APPEND_NOTIFICATIONS,
			payload: {
				replace: true, notifications: response.data
			}
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchTransactions = (cb) => (dispatch) => {
	API_GET(`/api/v1/user/transaction/detail`).then(function (response) {
		dispatch({
			type: APPEND_USER_TRANSACTIONS,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const refundWallet = (cb) => (dispatch) => {
	API_POST(`/api/v1/user/refund`, {}).then(function (response) {
		fetchTransactions(cb)(dispatch)
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchHeatlhTip = (cb) => (dispatch) => {
	API_GET(`/api/v1/doctor/healthtips`).then(function (response) {
		dispatch({
			type: APPEND_HEALTH_TIP,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchOrderHistory = (cb) => (dispatch) => {
	API_GET(`/api/v1/user/orderhistory`).then(function (response) {
		dispatch({
			type: APPEND_ORDER_HISTORY,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchArticles = (cb) => (dispatch) => {
	API_GET(`/api/v1/article/list`).then(function (response) {
		dispatch({
			type: APPEND_ARTICLES,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchArticle = (id, preview = null, cb) => (dispatch) => {
	let url = `/api/v1/article/detail/${id}`
	if (preview) {
		url += `?preview=1`
	}
	API_GET(url).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const fetchPgData = (id, cb) => (dispatch) => {
	API_GET(`/api/v1/user/pgdata/${id}`).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const getChatDoctorById = (doctorId, roomId, cb) => (dispatch) => {
	return API_GET(`/api/v1/chat/doctor/profile/${doctorId}`).then(function (response) {

		dispatch({
			type: APPEND_CHAT_DOCTOR,
			payload: {
				data: response,
				doctorId,
				roomId
			}
		})

		if (cb) cb(response)

	}).catch(function (error) {

	})
}

export const fetchChatHistory = (cb) => (dispatch) => {
	API_GET(`api/v1/chat/user/profile`).then(function (response) {
		dispatch({
			type: APPEND_CHAT_HISTORY,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}