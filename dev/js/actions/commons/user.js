import { SET_SUMMARY_UTM, SELECT_SEARCH_TYPE, APPEND_CITIES, SET_CHATROOM_ID, APPEND_CHAT_HISTORY, APPEND_CHAT_DOCTOR, APPEND_ARTICLES, APPEND_ORDER_HISTORY, APPEND_USER_TRANSACTIONS, APPEND_UPCOMING_APPOINTMENTS, APPEND_NOTIFICATIONS, APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE, APPEND_HEALTH_TIP, APPEND_ARTICLE_LIST, SAVE_UTM_TAGS, SAVE_DEVICE_INFO, GET_APPLICABLE_COUPONS, GET_USER_PRESCRIPTION, ADD_OPD_COUPONS, ADD_LAB_COUPONS, START_LIVE_CHAT, SELECT_TESTS, GET_OFFER_LIST, SET_COUPON_SPECIFIC_PAYMENT } from '../../constants/types';
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
	let url = `/api/v1/diagnostic/lab-report-file?labappointment=${appointmentId}`
	if (type == 'opd') {
		url = `/api/v1/doctor/prescription-file?appointment=${appointmentId}`
	}
	API_GET(url).then(function (response) {
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
				replace: true, notifications: response.data, unread_count: response.unread_count || ''
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
	let url = `/api/v1/article/detail?url=${id}`
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

export const fetchOrderById = (orderId) => (dispatch) => {
	return API_GET(`/api/v1/user/order/${orderId}`)
}

export const sendAgentBookingURL = (orderId, type, cb) => (dispatch) => {
	API_POST(`/api/v1/user/order/${orderId}/send`, { order_id: orderId, type }).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const setChatRoomId = (roomId) => (dispatch) => {
	dispatch({
		type: SET_CHATROOM_ID,
		payload: roomId || null
	})
}

export const submitCareerProfile = (postCareerData, cb) => (dispatch) => {
	API_POST('/api/v1/user/careers/upload', postCareerData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const submitContactMessage = (postContactData, cb) => (dispatch) => {
	API_POST('/api/v1/user/contactus', postContactData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const signupDoctor = (signupDoctorData, cb) => (dispatch) => {
	API_POST('/api/v1/user/onlinelead/create', signupDoctorData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const urlShortner = (url, cb) => (dispatch) => {
	API_POST('api/v1/web/createurl', { url: url }).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const getCities = (filterText) => (dispatch) => {
	API_GET(`/api/v1/common/cities/list?filter=${filterText}`).then(function (response) {
		dispatch({
			type: APPEND_CITIES,
			payload: response
		})
	}).catch(function (error) {

	})
}

export const getArticleList = (title, page = 1, replaceList, searchString = '', callback) => (dispatch) => {
	let url = `/api/v1/article/list?categoryUrl=${title}&page=${page}`;
	if (searchString) {
		url = url + `&contains=${searchString}`
	}
	return API_GET(url).then(function (response) {
		dispatch({
			type: APPEND_ARTICLE_LIST,
			payload: response,
			page: page,
			replaceList: replaceList
		})
		if (callback) callback(response.result);
	}).catch(function (error) {
		if (callback) callback(error, null);
	})
}

export const setUTMTags = (utmTags) => (dispatch) => {
	dispatch({
		type: SAVE_UTM_TAGS,
		payload: utmTags
	})
}

export const getGeoIpLocation = () => (dispatch) => {
	return API_GET(`/api/v1/geoip/detect?detect_ip=1`)
}

export const saveDeviceInfo = (device) => (dispatch) => {
	dispatch({
		type: SAVE_DEVICE_INFO,
		payload: device
	})
}

export const loc_physical_ms = (loc) => (dispatch) => {
	return API_GET(`/api/v1/geoip/adword/${loc}`)
}

export const startLiveChat = (started = true, deleteRoomId = false) => (dispatch) => {
	dispatch({
		type: START_LIVE_CHAT,
		payload: started,
		deleteRoomId: deleteRoomId
	})
}

export const getCoupons = ({ productId = '', deal_price = 0, cb = null, lab_id = null, test_ids = null, coupon_code = null, save_in_store = true, profile_id = null, doctor_id = null, hospital_id = null, procedures_ids = null }) => (dispatch) => {

	let url = `/api/v1/coupon/applicablecoupons?`
	if (productId) {
		url += `product_id=${productId}`
	}
	if (deal_price) {
		url += `&deal_price=${deal_price}`
	}

	if (lab_id && test_ids) {
		url += `&lab_id=${lab_id}&test_ids=${test_ids}`
	}

	if (coupon_code) {
		url += `&coupon_code=${coupon_code}`
	}

	if (profile_id) {
		url += `&profile_id=${profile_id}`
	}

	if (doctor_id) {
		url += `&doctor_id=${doctor_id}`
	}

	if (hospital_id) {
		url += `&hospital_id=${hospital_id}`
	}

	if (procedures_ids) {
		url += `&procedures_ids=${procedures_ids}`
	}

	API_GET(url).then(function (response) {
		if (save_in_store) {
			dispatch({
				type: GET_APPLICABLE_COUPONS,
				payload: response
			})
		}

		if (cb) {
			cb(response)
		}
	}).catch((e) => {
		if (cb) {
			cb(null)
		}
	})
}

export const getUserPrescription = (mobile) => (dispatch) => {
	//mobile = '9582557400'
	API_GET(`/api/v1/chat/chatprescription?mobile=${mobile}`).then(function (response) {

		dispatch({
			type: GET_USER_PRESCRIPTION,
			payload: response
		})
	})
}

export const applyCoupons = (productId = '', couponData, couponId, hospitalId) => (dispatch) => {

	couponData.couponApplied = true

	if (productId == 1) {
		dispatch({
			type: ADD_OPD_COUPONS,
			payload: couponData,
			hospitalId: hospitalId
		})
	} else {
		dispatch({
			type: ADD_LAB_COUPONS,
			payload: couponData,
			labId: hospitalId
		})
	}

}

export const selectSearchType = (type) => (dispatch) => {

	dispatch({
		type: SELECT_SEARCH_TYPE,
		payload: type
	})

}

export const fetchTestList = (testIds, cb) => (dispatch) => {
	let url = `/api/v1/diagnostic/test/category`
	if (testIds) {
		url += `?lab_tests=${testIds}`
	}
	API_GET(url).then(function (response) {
		dispatch({
			type: SELECT_TESTS,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const set_summary_utm = (toggle = false, validity = null) => (dispatch) => {
	dispatch({
		type: SET_SUMMARY_UTM,
		payload: {
			toggle,
			validity
		}
	})
}

export const getOfferList = () => (dispatch) => {
	API_GET(`/api/v1/banner/list`).then(function (response) {
		dispatch({
			type: GET_OFFER_LIST,
			payload: response
		})
	})
}

export const fetchReferralCode = (code = null) => (dispatch) => {
	let url = `/api/v1/user/referral`
	if (code) {
		url += `/${code}`
	}
	return API_GET(url)
}

export const fetchPaymentOptions = (cb) => (dispatch) => {
	API_GET(`/api/v1/common/payment-options`).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}


export const setCouponsSpecificPaymentOption = (orderId, paymentOption) => (dispatch) => {
	dispatch({
		type: SET_COUPON_SPECIFIC_PAYMENT,
		payload: paymentOption,
		orderId: orderId
	})
}