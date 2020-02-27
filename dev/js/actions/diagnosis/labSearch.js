import { SET_FETCH_RESULTS_LAB, SET_SERVER_RENDER_LAB, SELECT_LOCATION_OPD, SELECT_LOCATION_DIAGNOSIS, SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, APPEND_LABS, LAB_SEARCH, MERGE_SEARCH_STATE_LAB, APPLY_LAB_COUPONS, REMOVE_LAB_COUPONS, RESET_LAB_COUPONS, SAVE_CURRENT_LAB_PROFILE_TESTS, APPEND_LABS_SEARCH, SEARCH_HEALTH_PACKAGES, GET_LAB_SEARCH_ID_RESULTS, SET_LAB_SEARCH_ID, SAVE_LAB_RESULTS_WITH_SEARCHID, SET_LAB_URL_PAGE, CLEAR_LAB_SEARCH_ID, TOGGLE_PACKAGE_ID, TOGGLE_SEARCH_PACKAGES, SAVE_PRESCRIPTION, DELETE_PRESCRIPTION, CLEAR_PRESCRIPTION, SAVE_IS_PRESCRIPTION_NEED, TOGGLE_DIAGNOSIS_CRITERIA,
SHOW_RETAIL_VIP_CARD_LAB_SUMMARY, SELECT_LAB_PAYMENT_TYPE } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import { _getlocationFromLatLong, _getLocationFromPlaceId, _getNameFromLocation } from '../../helpers/mapHelpers.js'
import GTM from '../../helpers/gtm.js'
const queryString = require('query-string');

export const getLabs = (state = {}, page = 1, from_server = false, searchByUrl = false, cb) => (dispatch) => {

	if (page == 1) {
		dispatch({
			type: LAB_SEARCH_START,
			payload: null
		})
	}

	// dispatch({
	// 	type: SET_SERVER_RENDER_LAB,
	// 	payload: from_server
	// })

	let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType } = state
	let testIds = currentSearchedCriterias.map((x) => x.id)

	let lat = 28.644800
	let long = 77.216721
	let place_id = ""

	if (selectedLocation) {
		lat = selectedLocation.geometry.location.lat
		long = selectedLocation.geometry.location.lng
		place_id = selectedLocation.place_id || ""

		if (typeof lat === 'function') lat = lat()
		if (typeof long === 'function') long = long()

	}
	/*let min_distance = filterCriteria.distanceRange[0]
	let max_distance = filterCriteria.distanceRange[1]
	let min_price = filterCriteria.priceRange[0]
	let max_price = filterCriteria.priceRange[1]
	let sort_on = filterCriteria.sort_on || ""
	*/
	let sort_on = filterCriteria.sort_on || ""
	let sort_order = filterCriteria.sort_order || ""
    let availability = filterCriteria.availability || []
    let avg_ratings = filterCriteria.avg_ratings || []
    let home_visit = filterCriteria.home_visit || false
    let lab_visit = filterCriteria.lab_visit || false

	let is_insured = filterCriteria.is_insured || false

	// do not check specialization_ids if doctor_name || hospital_name search
	if (!!filterCriteria.lab_name) {
		testIds = ""
	}

	let url = `/api/v1/diagnostic/labnetworksearch?`

	if (searchByUrl) {
		url = `/api/v1/diagnostic/labnetworksearchbyurl?url=${searchByUrl.split('/')[1]}&`
	}

	url += `ids=${testIds || ""}&long=${long || ""}&lat=${lat || ""}&sort_on=${sort_on}&sort_order=${sort_order}&avg_ratings=${avg_ratings}&availability=${availability}&home_visit=${home_visit}&lab_visit=${lab_visit}&page=${page}&is_insurance=${is_insured}`

	if (!!filterCriteria.lab_name) {
		url += `&name=${filterCriteria.lab_name || ""}`
	}

	if (!!filterCriteria.network_id) {
		url += `&network_id=${filterCriteria.network_id || ""}`
	}

	return API_GET(url).then(function (response) {

		let tests = response.tests.map((x) => {
			x.type = 'test'
			return x
		})

		let currentSearchedCriterias = tests || []

		let show404 = false
		// show 404 on server when no resultd
		if (response.result && response.result.length == 0 && from_server && searchByUrl) {
			show404 = true
		}

		dispatch({
			type: MERGE_SEARCH_STATE_LAB,
			payload: {
				currentSearchedCriterias
			},
			fetchNewResults: false
		})
		let searchIdData = Object.assign({}, response)
		searchIdData.currentSearchedCriterias = currentSearchedCriterias
		dispatch({
			type: SAVE_LAB_RESULTS_WITH_SEARCHID,
			payload: searchIdData,
			page: page
		})

		dispatch({
			type: SET_FETCH_RESULTS_LAB,
			payload: false
		})

		dispatch({
			type: APPEND_LABS_SEARCH,
			payload: response.result
		})

		dispatch({
			type: LAB_SEARCH,
			payload: {
				show404, page, ...response
			}

		})

		if (page == 1) {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'LabSearchCount', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-search-count', 'LabSearchCount': response.count || 0
			}
			GTM.sendEvent({ data: data })
		}

		if (cb) {
			// if no results redirect to 404 page
			if (response.result && response.result.length == 0) {
				cb(false, true)
			}
			// TODO: DO not hardcode page length
			if (response.result && response.result.length == 20) {
				cb(true)
			}
		}
		cb(false)

	}).catch(function (error) {
		throw error
	})
}

export const getLabById = (labId, testIds = [], forceAddTestids=false, dataParams={}) => (dispatch) => {
	let url = `/api/v1/diagnostic/lablist/${labId}?test_ids=${testIds.join(',')}`
		if(dataParams && dataParams.booking_page) {
			url+=`&booking_page=true`
		}
		dispatch({
			type: SHOW_RETAIL_VIP_CARD_LAB_SUMMARY,
			payload: false
		})
	return API_GET(url).then(function (response) {

		dispatch({
			type: APPEND_LABS,
			payload: [response]
		})
		dispatch({
			type: SAVE_CURRENT_LAB_PROFILE_TESTS,
			payload: response,
			forceAdd: true
		})
		dispatch({
			type: SHOW_RETAIL_VIP_CARD_LAB_SUMMARY,
			payload: true
		})
		if(forceAddTestids){
			dispatch({
				type: TOGGLE_DIAGNOSIS_CRITERIA,
				payload: {
					forceAddTestids: true,
					tests: response.tests,
					labId: labId
				}
			})
		}

	}).catch(function (error) {

	})
}

export const getLabByUrl = (lab_url, testIds = [], cb) => (dispatch) => {
	let url = `/api/v1/diagnostic/lablistbyurl?url=${lab_url}&test_ids=${testIds.join(',')}`
		dispatch({
			type: SHOW_RETAIL_VIP_CARD_LAB_SUMMARY,
			payload: false
		})
	return API_GET(url).then(function (response) {
		dispatch({
			type: APPEND_LABS,
			payload: [response]
		})
		dispatch({
			type: SAVE_CURRENT_LAB_PROFILE_TESTS,
			payload: response,
			forceAdd: true
		})
		dispatch({
			type: SHOW_RETAIL_VIP_CARD_LAB_SUMMARY,
			payload: true
		})
		cb((response.lab ? response.lab.id : null), null)
	}).catch(function (error) {
		cb(null, error.url)
	})
}

export const getLabTimeSlots = (labId, pickup, pincode, date, extraParams, callback) => (dispatch) => {
	let url = `/api/v1/diagnostic/labtiming_v3?lab=${labId}&pickup=${pickup}&pincode=${pincode}&date=${date}`
	if(extraParams){
		url+= `&test_ids=${extraParams.test_ids||''}&r_pickup=${extraParams.r_pickup||0}&p_pickup=${extraParams.p_pickup||0}`	
	}
	
	return API_GET(url).then(function (response) {
		if(callback)callback(response)
	}).catch(function (error) {

	})
}

export const selectLabTimeSLot = (slot, reschedule = false, dateParams=null) => (dispatch) => {
	dispatch({
		type: SELECT_LAB_TIME_SLOT,
		payload: {
			reschedule,
			slot,
			dateParams
		}
	})
}

export const selectLabAppointmentType = (type) => (dispatch) => {
	dispatch({
		type: SELECR_APPOINTMENT_TYPE_LAB,
		payload: type
	})
}

export const selectPickupAddress = (address) => (dispatch) => {
	dispatch({
		type: SELECT_USER_ADDRESS,
		payload: address
	})
}

export const createLABAppointment = (postData, callback) => (dispatch) => {
	postData['visitor_info'] = GTM.getVisitorInfo()
	return API_POST(`/api/v1/diagnostic/labappointment/create`, postData).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const retryPaymentLAB = (appointmentId, callback) => (dispatch) => {
	return API_GET(`/api/v1/diagnostic/appointment/payment/retry/${appointmentId}`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const getLabBookingSummary = (appointmentID, callback) => (dispatch) => {
	API_GET(`/api/v1/user/appointment/${appointmentID}?type=lab`).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const updateLabAppointment = (appointmentData, callback) => (dispatch) => {
	API_POST(`/api/v1/user/appointment/${appointmentData.id}/update?type=lab`, appointmentData).then(function (response) {
		callback(null, response)
	}).catch(function (error) {
		callback(error, null)
	})
}

export const applyLabCoupons = (productId = '', couponCode, couponId, labId = null, dealPrice, test_ids = [], profile_id = null, cart_item = null, callback) => (dispatch) => {

	API_POST(`/api/v1/coupon/discount`, {
		coupon_code: [couponCode],
		deal_price: dealPrice,
		product_id: productId,
		tests: test_ids,
		lab: labId,
		profile: profile_id || null,
		cart_item
	}).then(function (response) {
		let analyticData = {
			'Category': 'ConsumerApp', 'Action': 'LabCouponApplied', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-coupon-applied', 'couponId': couponId
		}
		GTM.sendEvent({ data: analyticData })
		if (response && response.status == 1) {
			dispatch({
				type: APPLY_LAB_COUPONS,
				payload: response
			})
			if (callback) {
				callback(null, response)
			}
		} else {
			dispatch({
				type: REMOVE_LAB_COUPONS,
				labId: labId,
				couponId: couponId
			})
			if (callback) {
				callback('Not applicable', null)
			}
		}
	}).catch(function (error) {
		dispatch({
			type: REMOVE_LAB_COUPONS,
			labId: labId,
			couponId: couponId
		})
		if (callback) {
			callback(error, null)
		}
	})

}

export const removeLabCoupons = (labId, couponId) => (dispatch) => {

	dispatch({
		type: REMOVE_LAB_COUPONS,
		labId: labId,
		couponId: couponId
	})
}

export const resetLabCoupons = () => (dispatch) => {
	dispatch({
		type: RESET_LAB_COUPONS
	})
}

export const getPackages = (state = {}, page = 1, from_server = false, searchByUrl = false,extra_params, cb) => (dispatch) => { //get searched packages result
	let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType, filterCriteriaPackages } = state
	if (page == 1) {
		dispatch({
			type: LAB_SEARCH_START,
			payload: null
		})
	}
	let lat = 28.644800
	let long = 77.216721
	let place_id = ""
	let url_string
	let new_url
	let forTaxSaver = false
	let parsed= {}

	if (typeof window == "object") {
		url_string = window.location.href
		new_url = new URL(url_string)
		forTaxSaver = window.location.pathname.includes("tax-saver-health-packages")
		parsed = queryString.parse(window.location.search)
	}

	if (selectedLocation) {
		lat = selectedLocation.geometry.location.lat
		long = selectedLocation.geometry.location.lng
		place_id = selectedLocation.place_id || ""

		if (typeof lat === 'function') lat = lat()
		if (typeof long === 'function') long = long()

	}

	/*let min_distance = filterCriteriaPackages.distanceRange[0]
	let max_distance = filterCriteriaPackages.distanceRange[1]
	let min_price = filterCriteriaPackages.priceRange[0]
	let max_price = filterCriteriaPackages.priceRange[1]
	let sort_on = filterCriteriaPackages.sort_on || ""
	*/
	let sort_on = filterCriteriaPackages.sort_on || ""
	let sort_order = filterCriteriaPackages.sort_order || ""
	let avg_ratings = filterCriteriaPackages.avg_ratings || ""
	let home_visit = filterCriteriaPackages.home_visit || false
	let lab_visit = filterCriteriaPackages.lab_visit || false

	let catIds = filterCriteriaPackages.catIds || ""
	let max_age = filterCriteriaPackages.max_age || ""
	let min_age = filterCriteriaPackages.min_age || ""
	let gender = filterCriteriaPackages.gender || ""
	let package_type = filterCriteriaPackages.packageType || ""
	let test_ids = filterCriteriaPackages.test_ids || ""
	let package_ids = filterCriteriaPackages.package_ids || ""
	let package_category_ids = parsed.package_category_ids || ""
	// let package_category_ids = filterCriteriaPackages.package_category_ids || ""
	let url = `/api/v1/diagnostic/packagelist?`

	if (searchByUrl) {
		url = `/api/v1/diagnostic/packagelist?url=${searchByUrl.split('/')[1]}&`
	}

	if (forTaxSaver) {
		// package_category_id = parsed.package_category_ids
		url += `long=${long || ""}&lat=${lat || ""}&page=${page}`
	}

	if (!forTaxSaver) {
		// package_category_id = parsed.package_category_ids
		url += `long=${long || ""}&lat=${lat || ""}&sort_on=${sort_on}&sort_order=${sort_order}&avg_ratings=${avg_ratings}&home_visit=${home_visit}&lab_visit=${lab_visit}&category_ids=${catIds || ""}&max_age=${max_age || ""}&min_age=${min_age || ""}&gender=${gender || ""}&package_type=${package_type || ""}&test_ids=${test_ids || ""}&page=${page}&package_ids=${package_ids}`
	}

	if (!!filterCriteriaPackages.lab_name) {
		url += `&name=${filterCriteria.lab_name || ""}`
	}

	if(parsed.package_category_ids){
		url += `&package_category_ids=${package_category_ids}`
	}

	if (!!filterCriteriaPackages.network_id) {
		url += `&network_id=${filterCriteria.network_id || ""}`
	}

	if(extra_params && Object.keys(extra_params).length > 0){
		if(extra_params.utm_term){
	        url += `&utm_term=${parsed.utm_term || ""}`
	    }

	    if(extra_params.utm_medium){
	        url += `&utm_medium=${extra_params.utm_medium || ""}`
	    }

	    if(extra_params.utm_campaign){
	        url += `&utm_campaign=${extra_params.utm_campaign || ""}`
	    }

	    if(extra_params.utm_source){
	        url += `&utm_source=${extra_params.utm_source || ""}`
	    }
	}

	return API_GET(url).then(function (response) {
		if (response) {
			let tests = ''
			let currentSearchedCriterias = tests || []

			dispatch({
				type: MERGE_SEARCH_STATE_LAB,
				payload: {
					currentSearchedCriterias
				},
				fetchNewResults: false
			})

			dispatch({
				type: SEARCH_HEALTH_PACKAGES,
				page: page,
				payload: response,
			})
		}

		if (page == 1) {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'LabSearchCount', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-search-count', 'LabSearchCount': response.count || 0
			}
			GTM.sendEvent({ data: data })
		}

		if (cb) {
			// if no results redirect to 404 page
			if (response.result && response.result.length == 0) {
				cb(false, true)
			}
			// TODO: DO not hardcode page length
			if (response.result && response.result.length == 30) {
				cb(true)
			}
		}
		cb(false)

	}).catch(function (error) {
		throw error
	})
}

export const setLabSearchId = (searchId, filters, page = 1) => (dispatch) => {
	dispatch({
		type: SET_LAB_SEARCH_ID,
		payload: filters,
		searchId: searchId,
		page: page
	})
}

export const getLabSearchIdResults = (searchId, response) => (dispatch) => {
	dispatch({
		type: GET_LAB_SEARCH_ID_RESULTS,
		searchId: searchId
	})
	dispatch({
		type: SET_LAB_URL_PAGE,
		payload: response.page
	})
	dispatch({
		type: APPEND_LABS_SEARCH,
		payload: response.data.result
	})

	dispatch({
		type: LAB_SEARCH,
		payload: {
			page: response.page, ...response.data
		}

	})

}

export const setPackageId = (package_id, isHomePage) =>(dispatch) =>{

	dispatch({
		type: TOGGLE_PACKAGE_ID,
		package_id: package_id,
		isHomePage: isHomePage
	})
}

export const toggleSearchPackages = (healthPackage) => (dispatch) => {
	dispatch({
		type: TOGGLE_SEARCH_PACKAGES,
		healthPackage: healthPackage
	})
}

export const clearLabSearchId = () => (dispatch) => {
	dispatch({
		type: CLEAR_LAB_SEARCH_ID
	})
}

export const uploadPrescription = (profileData,callback) => (dispatch) => {
    API_POST(`/api/v1/prescription/upload_prescription`,profileData).then(function (response) {
        if (callback) callback(response,null)
    }).catch(function (error) {
        if (callback) callback(error, null)
    })
}

export const savePrescription = (imgUrl,cb) => (dispatch) => {
    dispatch({
        type:SAVE_PRESCRIPTION,
        payload:imgUrl
    })
}

export const removePrescription = (criteria) => (dispatch) => {
    dispatch({
        type:DELETE_PRESCRIPTION,
        payload:criteria
    })
}

export const clearPrescriptions = () => (dispatch) => {
    dispatch({
        type:CLEAR_PRESCRIPTION
    })
}

export const preBooking = (selectedTime) => (dispatch) => {
    API_POST(`/api/v1/common/pre-booking`,selectedTime).then(function (response) {
		dispatch({
	    	type:SAVE_IS_PRESCRIPTION_NEED,
	        payload:response
	    })
	})
}

export const getTestCategoryList = (state = {}, page = 1, from_server = false, searchByUrl = false, callback) => (dispatch) => {

	return API_GET(`/api/v1/diagnostic/lab-test-category-landing-urls?url=${searchByUrl.split('/')[1]}&page=${page}`).then(function (response) {
        if(callback) callback(response)
    }).catch(function (error) {
        if(callback) callback(error)
        throw error
    })
}

export const select_lab_payment_type = (type = 1) => (dispatch) => {
	dispatch({
		type: SELECT_LAB_PAYMENT_TYPE,
		payload: type
	})
}

export const uploadCommonPrescription = (profileData,callback) => (dispatch) => {
    API_POST(`api/v1/diagnostic/lab_test_prescription/upload`,profileData).then(function (response) {
        if (callback) callback(response,null)
    }).catch(function (error) {
        if (callback) callback(null, error)
    })
}


