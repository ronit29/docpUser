import { SET_SUMMARY_UTM, SELECT_SEARCH_TYPE, APPEND_CITIES, SET_CHATROOM_ID, APPEND_CHAT_HISTORY, APPEND_CHAT_DOCTOR, APPEND_ARTICLES, APPEND_ORDER_HISTORY, APPEND_USER_TRANSACTIONS, APPEND_UPCOMING_APPOINTMENTS, APPEND_NOTIFICATIONS, APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE, APPEND_HEALTH_TIP, APPEND_ARTICLE_LIST, SAVE_UTM_TAGS, SAVE_DEVICE_INFO, GET_APPLICABLE_COUPONS, GET_USER_PRESCRIPTION, ADD_OPD_COUPONS, ADD_LAB_COUPONS, START_LIVE_CHAT, SELECT_TESTS, GET_OFFER_LIST, APPEND_CART, TOGGLE_LEFT_MENU, UPCOMING_APPOINTMENTS, SET_COMMON_UTM_TAGS, UNSET_COMMON_UTM_TAGS, APPEND_ARTICLE_DATA, GET_APP_DOWNLOAD_BANNER_LIST, SAVE_CHAT_FEEDBACK, SUBMIT_CHAT_FEEDBACK, SAVE_CHAT_FEEDBACK_ROOMID, IPD_CHAT_START, IPD_POPUP_FIRED, USER_CITIES, PHARMEASY_IFRAME, SET_CHAT_PAYMENT_STATUS, ADD_VIP_COUPONS, GET_REFRESH_NEW_TOKEN, GET_REFER_AMOUNT } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import GTM from '../../helpers/gtm.js'
import CONFIG from '../../config'

export const getUserProfile = () => (dispatch) => {
	return API_GET('/api/v1/user/userprofile').then(function (response) {
		dispatch({
			type: APPEND_USER_PROFILES,
			payload: response,
			allUsers: true
		})

	}).catch(function (error) {

	})
}

export const getProfileAppointments = (profile_id) => (dispatch) => { // get user appointments
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

export const editUserProfile = (profileData, profileId, cb) => (dispatch) => { // update profile
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
		dispatch({
			type: APPEND_ARTICLE_DATA,
			payload: response
		})
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const buildArticleStoreFromRedis = (data, cb) => (dispatch) => {
	dispatch({
		type: APPEND_ARTICLE_DATA,
		payload: data
	})
	if(cb) cb(true);
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

export const sendAgentBookingURL = (orderId, type, purchase_type,utm_spo_tags, extraParams={}, cb) => (dispatch) => { //send payment link in sms to user by agaent
	API_POST(`/api/v1/user/order/send`, { type, purchase_type,utm_spo_tags, ...extraParams }).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const sendAgentWhatsupPageURL = (extraParams={}, cb) => (dispatch) => { //send page links via whatsup to user by agaent
	return API_POST(`/api/v1/notification/send/whatsapp`, extraParams  ).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const setChatRoomId = (roomId, extraParams = {}) => (dispatch) => {
	dispatch({
		type: SET_CHATROOM_ID,
		payload: roomId || null,
		extraParams: extraParams
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
		return response.result
	}).catch(function (error) {
		if (callback) callback(error, null);
		return null
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

export const getCoupons = ({ productId = '', deal_price = 0, cb = null, lab_id = null, test_ids = null, coupon_code = null, save_in_store = true, profile_id = null, doctor_id = null, hospital_id = null, procedures_ids = null, cart_item = null, gold_plan_id = null }) => (dispatch) => {

	let url = `/api/v1/coupon/applicablecoupons?`
	if (productId) {
		url += `product_id=${productId}`
	}

	if (deal_price >= 0) {
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

	if (cart_item) {
		url += `&cart_item=${cart_item}`
	}

	if (gold_plan_id) {
		url += `&plan_id=${gold_plan_id}`
	}

	url += `&show_all=${true}`

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

export const applyCoupons = (productId = '', couponData, couponId, hospitalId, callback) => (dispatch) => {

	couponData.couponApplied = true

	if (productId == 1) {
		dispatch({
			type: ADD_OPD_COUPONS,
			payload: couponData,
			hospitalId: hospitalId
		})
	}else if(productId == 3){
		dispatch({
			type: ADD_VIP_COUPONS,
			payload: couponData
		})
	} else {
		dispatch({
			type: ADD_LAB_COUPONS,
			payload: couponData,
			labId: hospitalId
		})
	}
	if (callback) {
		callback(true)
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

export const getOfferList = (lat, long) => (dispatch) => {
	API_GET(`/api/v1/banner/list?lat=${lat}&long=${long}`).then(function (response) {
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

export const getCartItems = () => (dispatch) => {
	return API_GET('/api/v1/cart/all').then(function (response) {
		dispatch({
			type: APPEND_CART,
			payload: response
		})

	}).catch(function (error) {

	})
}

export const addToCart = (product_id, data) => (dispatch) => {
	return API_POST('/api/v1/cart/add', {
		product_id, data
	})
}

export const removeFromCart = (id) => (dispatch) => {
	return API_POST('/api/v1/cart/remove', {
		id
	}).then((res) => {
		return getCartItems()(dispatch)
	}).catch((e) => {

	})
}

export const processCartItems = (use_wallet = true, extraParams={}) => (dispatch) => {
	let postData = {}
	postData['visitor_info'] = GTM.getVisitorInfo()
	postData['utm_spo_tags'] = extraParams
	postData['from_web'] = true
	use_wallet = use_wallet ? 1 : 0
	return API_POST(`/api/v1/cart/process?use_wallet=${use_wallet}`, postData)
}

export const fetchOrderSummary = (order_id) => (dispatch) => {
	return API_GET(`/api/v1/user/order/summary/${order_id}`)
}

export const postComment = (postData, cb) => (dispatch) => {

	API_POST("/api/v1/article/comment/post", postData).then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const getAllRatings = (content_type, object_id, page = 1, cb) => (dispatch) => {
	API_GET(`/api/v1/ratings/list?page=${page}&content_type=` + parseInt(content_type) + '&object_id=' + parseInt(object_id)).then(function (response) {
		let hasmore = false
		if (response && response.rating && response.rating.length) {
			hasmore = true
		}
		if (cb) cb(null, response, hasmore);
	}).catch(function (error) {
		if (cb) cb(error, null, false);
	})
}

export const getUserReviews = (cb) => (dispatch) => {
	API_GET("/api/v1/user/myratings").then(function (response) {
		if (cb) cb(null, response);
	}).catch(function (error) {
		if (cb) cb(error, null);
	})
}

export const toggleLeftMenuBar = (toggle, defaultVal = false) => (dispatch) => {

	dispatch({
		type: TOGGLE_LEFT_MENU,
		toggle: toggle,
		defaultVal: defaultVal
	})
}

export const getUpComingAppointment = () => (dispatch) => {
	return API_GET('/api/v1/user/upcoming/appointments').then(function (response) {
		dispatch({
			type: UPCOMING_APPOINTMENTS,
			payload: response
		})

	}).catch(function (error) {

	})
}

export const saveChatFeedBack = (ques, data) => (dispatch) => {
	dispatch({
		type: SAVE_CHAT_FEEDBACK,
		data: data,
		ques: ques
	})
}

export const submitChatFeedback = (postData) => (dispatch) => {

	return API_POST(`${CONFIG.CHAT_API_UTILITY_API}/postfeedback`, postData).then(function (response) {

		let gtmData = {

			'Category': 'Chat', 'Action': 'ChatFeedBackSubmittedSuccess', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-feedback-submitted-success'
		}
		GTM.sendEvent({ data: gtmData })

		dispatch({
			type: SUBMIT_CHAT_FEEDBACK
		})
	}).catch(function (e) {
		let gtmData = {

			'Category': 'Chat', 'Action': 'ChatFeedBackApiSumittedError', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-feedback-api-failed'
		}
		GTM.sendEvent({ data: gtmData })
	})
}

export const saveChatFeedbackRoomId = (roomId) => (dispatch) => {
	dispatch({
		type: SAVE_CHAT_FEEDBACK_ROOMID,
		payload: roomId
	})
}

export const setCommonUtmTags = (type = 'chat', tag) => (dispatch) => {
	dispatch({
		type: SET_COMMON_UTM_TAGS,
		payload: tag,
		actionType: type
	})
}

export const unSetCommonUtmTags = (type, tags) => (dispatch) => {
	dispatch({
		type: UNSET_COMMON_UTM_TAGS,
		payload: tags,
		actionType: type
	})
}

export const getDownloadAppBannerList = (cb) => (dispatch) => {

	return API_GET('/api/v1/common/get_key_data?key=AppInstall').then(function (response) {
		dispatch({
			type: GET_APP_DOWNLOAD_BANNER_LIST,
			payload: response
		})
		if (cb) cb(response)

	}).catch(function (e) {
		if (cb) cb(null)
	})
}

export const ipdChatView = (data = false) => (dispatch) => {
	dispatch({
		type: IPD_CHAT_START,
		payload: data
	})
}

export const checkIpdChatAgentStatus = (cb) => (dispatch) => {
	return API_GET(`${CONFIG.CHAT_API_UTILITY_API}/getOnlineUsers?departmentId=etmum62FLjZckHpvx`).then(function (response) {

		if (cb) cb(response)

	}).catch(function (e) {
		if (cb) cb(null)
	})
}

export const ipdPopupFired = () => (dispatch) => {
	dispatch({
		type: IPD_POPUP_FIRED
	})
}

export const sendSPOAgentBooking = (postData, cb) => (dispatch) => {
	return API_POST(`/api/v1/user/send_cart_url`, postData).then((data)=> {
		if(cb)cb(null, data)
	}).catch((e)=>{
 		if(cb)cb(e, null)
	})
}
export const citiesData = () => (dispatch) => {
	return API_GET('/api/v1/diagnostic/allmatrixcities').then(function (response) {
		dispatch({
			type: USER_CITIES,
			payload: response
		})
	})
}

export const iFrameState = (url, emptyUrls, leftMenuClick = false) => (dispatch) => {
	dispatch({
		type: PHARMEASY_IFRAME,
		url: url,
		emptyUrls: emptyUrls,
		leftMenuClick: leftMenuClick
	})
}

export const setPaymentStatus = (status = null) => (dispatch) => {
	dispatch({
		type: SET_CHAT_PAYMENT_STATUS,
		payload: status
	})
}

export const SendIpdBookingEmail = (data,cb) => (dispatch)=>{
	return API_POST('/api/v1/notification/ipd/emailnotifications', data).then((data)=> {
		if(cb)cb(null, data)
	}).catch((e)=>{
 		if(cb)cb(e, null)
	})
}

export const NonIpdBookingLead = (data,cb) => (dispatch)=>{
	return API_POST('/api/v1/common/push-leads', data).then((data)=> {
		if(cb)cb(null, data)
	}).catch((e)=>{
 		if(cb)cb(e, null)
	})
}

export const getBannerInfo = (dataParams, cb) => (dispatch)=>{
	
	if(dataParams && dataParams.id) {
		let url = `/api/v1/banner/detail/${dataParams.id}`
	
		return API_GET(url).then((data)=> {
			if(cb)cb(null, data)
		}).catch((e)=>{
	 		if(cb)cb(e, null)
		})
	}
	if(cb)cb(null);
}

export const saveNewRefreshedToken = (token) => (dispatch) =>{
	dispatch({
            type: 'GET_REFRESH_NEW_TOKEN',
            payload: token
        })
}

export const getReferAmnt = () => (dispatch) =>{
    API_GET(`/api/v1/user/get_referral_amt`).then(function (response) {
        dispatch({
            type:GET_REFER_AMOUNT,
            payload:response
        })  
    }).catch(function (error) {
    })
}
export const covidData = (data,cb) => (dispatch) =>{
    API_GET(`http://api.policybazaar.com/mobile/covid/data`).then(function (response) {
        if(cb){
			cb(response);
		} 
    }).catch(function (error) {
    })
}

export const submitReportReview = (dataParams, cb) => (dispatch) => {
	API_POST(`/api/v1/diagnostic/feedback_to_matrix?appointment_id=${dataParams.appointment_id}`, dataParams).then((data)=>{
		if(cb)cb(true, null);
	}).catch((e)=>{
		if(cb)cb(null, true);
	})
}