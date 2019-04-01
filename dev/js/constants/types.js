
//AUTH ACTIONS
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST'
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS'
export const SEND_OTP_FAIL = 'SEND_OTP_FAIL'
export const SUBMIT_OTP_REQUEST = 'SUBMIT_OTP_REQUEST'
export const SUBMIT_OTP_SUCCESS = 'SUBMIT_OTP_SUCCESS'
export const SUBMIT_OTP_FAIL = 'SUBMIT_OTP_FAIL'
export const RESET_AUTH = 'RESET_AUTH'
export const SET_SUMMARY_UTM = 'SET_SUMMARY_UTM'

// OPD FLOW
export const APPEND_DOCTORS = 'APPEND_DOCTORS';
export const DOCTOR_SEARCH = 'DOCTOR_SEARCH';
export const DOCTOR_SEARCH_START = 'DOCTOR_SEARCH_START';
export const SELECT_LOCATION_OPD = 'SELECT_LOCATION_OPD';
export const MERGE_SEARCH_STATE_OPD = 'MERGE_SEARCH_STATE_OPD';
export const TOGGLE_OPD_CRITERIA = 'TOGGLE_OPD_CRITERIA';
export const SET_OPD_FILTERS = 'SET_OPD_FILTERS'
export const LOAD_SEARCH_CRITERIA_OPD = 'LOAD_SEARCH_CRITERIA_OPD'
export const SELECT_OPD_TIME_SLOT = 'SELECT_OPD_TIME_SLOT'
export const RESET_FILTER_STATE = 'RESET_FILTER_STATE'
export const SET_SERVER_RENDER_OPD = 'SET_SERVER_RENDER_OPD'
export const SET_FETCH_RESULTS_OPD = 'SET_FETCH_RESULTS_OPD'
export const APPEND_DOCTORS_PROFILE = 'APPEND_DOCTORS_PROFILE'
export const CLONE_SELECTED_CRITERIAS = 'CLONE_SELECTED_CRITERIAS'
export const APPEND_HOSPITALS = 'APPEND_HOSPITALS'
export const HOSPITAL_SEARCH = 'HOSPITAL_SEARCH'
export const SELECT_OPD_PAYMENT_TYPE = 'SELECT_OPD_PAYMENT_TYPE'

// DIAG FLOW
export const TOGGLE_DIAGNOSIS_CRITERIA = 'TOGGLE_DIAGNOSIS_CRITERIA';
export const MERGE_SEARCH_STATE_LAB = 'MERGE_SEARCH_STATE_LAB';
export const LOAD_SEARCH_CRITERIA_LAB = 'LOAD_SEARCH_CRITERIA_LAB'
export const APPEND_LABS = 'APPEND_LABS';
export const LAB_SEARCH = 'LAB_SEARCH';
export const SELECT_LOCATION_DIAGNOSIS = 'SELECT_LOCATION_DIAGNOSIS';
export const APPEND_FILTERS_DIAGNOSIS = 'APPEND_FILTERS_DIAGNOSIS';
export const LAB_SEARCH_START = 'LAB_SEARCH_START';
export const SELECT_LAB_TIME_SLOT = 'SELECT_LAB_TIME_SLOT'
export const SELECR_APPOINTMENT_TYPE_LAB = 'SELECR_APPOINTMENT_TYPE_LAB'
export const CLEAR_EXTRA_TESTS = 'CLEAR_EXTRA_TESTS'
export const CLEAR_ALL_TESTS = 'CLEAR_ALL_TESTS'
export const SET_SERVER_RENDER_LAB = 'SET_SERVER_RENDER_LAB'
export const SET_FETCH_RESULTS_LAB = 'SET_FETCH_RESULTS_LAB'
export const SET_CORPORATE_COUPON = 'SET_CORPORATE_COUPON'
export const SELECT_TESTS = 'SELECT_TESTS'
export const APPEND_LABS_SEARCH = 'APPEND_LABS_SEARCH'

// USER FLOW
export const APPEND_USER_PROFILES = 'APPEND_USER_PROFILES';
export const APPEND_USER_APPOINTMENTS = 'APPEND_USER_APPOINTMENTS';
export const SELECT_USER_PROFILE = 'SELECT_USER_PROFILE';
export const APPEND_ADDRESS = 'APPEND_ADDRESS';
export const SELECT_USER_ADDRESS = 'SELECT_USER_ADDRESS';
export const APPEND_NOTIFICATIONS = 'APPEND_NOTIFICATIONS';
export const APPEND_UPCOMING_APPOINTMENTS = 'APPEND_UPCOMING_APPOINTMENTS';
export const APPEND_USER_TRANSACTIONS = 'APPEND_USER_TRANSACTIONS';
export const APPEND_HEALTH_TIP = 'APPEND_HEALTH_TIP';
export const APPEND_ORDER_HISTORY = 'APPEND_ORDER_HISTORY';
export const APPEND_ARTICLES = 'APPEND_ARTICLES';
export const APPEND_CHAT_DOCTOR = 'APPEND_CHAT_DOCTOR'
export const APPEND_CHAT_HISTORY = 'APPEND_CHAT_HISTORY'
export const APPEND_CITIES = 'APPEND_CITIES'
export const SET_CHATROOM_ID = 'SET_CHATROOM_ID'
export const APPEND_ARTICLE_LIST = 'APPEND_ARTICLE_LIST'
export const SELECT_SEARCH_TYPE = 'SELECT_SEARCH_TYPE'
export const APPEND_CART = 'APPEND_CART'

//COMMON TAGS
export const SAVE_UTM_TAGS = 'SAVE_UTM_TAGS'
export const SAVE_DEVICE_INFO = 'SAVE_DEVICE_INFO'
export const START_LIVE_CHAT = 'START_LIVE_CHAT'
export const ADD_DEFAULT_LAB_TESTS = 'ADD_DEFAULT_LAB_TESTS'
export const ADD_LAB_PROFILE_TESTS = 'ADD_LAB_PROFILE_TESTS'
export const GET_APPLICABLE_COUPONS = 'GET_APPLICABLE_COUPONS'
export const GET_USER_PRESCRIPTION = 'GET_USER_PRESCRIPTION'
export const ADD_OPD_COUPONS = 'ADD_OPD_COUPONS'
export const REMOVE_OPD_COUPONS = 'REMOVE_OPD_COUPONS'
export const ADD_LAB_COUPONS = 'ADD_LAB_COUPONS'
export const REMOVE_LAB_COUPONS = 'REMOVE_LAB_COUPONS'
export const APPLY_OPD_COUPONS = 'APPLY_OPD_COUPONS'
export const APPLY_LAB_COUPONS = 'APPLY_LAB_COUPONS'
export const RESET_LAB_COUPONS = 'RESET_LAB_COUPONS'
export const RESET_OPD_COUPONS = 'RESET_OPD_COUPONS'
export const CLOSE_POPUP = 'CLOSE_POPUP'
export const FILTER_SEARCH_CRITERIA_OPD = 'FILTER_SEARCH_CRITERIA_OPD'

//Site Map
export const GET_CITIES_MAP = 'GET_CITIES_MAP'
export const GET_CITIES_SPECIALITIES = 'GET_CITIES_SPECIALITIES'
export const GET_SPECIALITIES_CITIES = 'GET_SPECIALITIES_CITIES'
export const GET_SPECIALITIES_MAP = 'GET_SPECIALITIES_MAP'

//Procedures
export const TOOGLE_PROCEDURE_CRITERIA = 'TOOGLE_PROCEDURE_CRITERIA'
export const SET_PROCEDURES = 'SET_PROCEDURES'
export const TOGGLE_PROFILE_PROCEDURES = 'TOGGLE_PROFILE_PROCEDURES'
export const SAVE_COMMON_PROCEDURES = 'SAVE_COMMON_PROCEDURES'
export const RESET_PROCEDURE_URL = 'RESET_PROCEDURE_URL'
export const MERGE_SELECTED_CRITERIAS = 'MERGE_SELECTED_CRITERIAS'
export const SAVE_PROFILE_PROCEDURES = 'SAVE_PROFILE_PROCEDURES'

export const SAVE_CURRENT_LAB_PROFILE_TESTS = 'SAVE_CURRENT_LAB_PROFILE_TESTS'

//Elastic Search
export const GET_ELASTIC_RESULTS = 'GET_ELASTIC_RESULTS'
export const SEARCH_TEST_INFO = 'SEARCH_TEST_INFO'


//Ads bookings
export const ADS_BOOKING = 'ADS_BOOKING'

//Search Health packages
export const SEARCH_HEALTH_PACKAGES = 'SEARCH_HEALTH_PACKAGES'

//Search via Search Id 
export const SET_SEARCH_ID = 'SET_SEARCH_ID'
export const GET_SEARCH_ID_RESULTS = 'GET_SEARCH_ID_RESULTS'
export const SET_LAB_SEARCH_ID = 'SET_LAB_SEARCH_ID'
export const GET_LAB_SEARCH_ID_RESULTS = 'GET_LAB_SEARCH_ID_RESULTS'
export const SAVE_RESULTS_WITH_SEARCHID = 'SAVE_RESULTS_WITH_SEARCHID'
export const SAVE_LAB_RESULTS_WITH_SEARCHID = 'SAVE_LAB_RESULTS_WITH_SEARCHID'
// Offers
export const GET_OFFER_LIST = 'GET_OFFER_LIST'
export const MERGE_URL_STATE = 'MERGE_URL_STATE'
export const SET_URL_PAGE = 'SET_URL_PAGE'
export const SET_LAB_URL_PAGE = 'SET_LAB_URL_PAGE'

export const SET_NEXT_SEARCH_CRITERIA = 'SET_NEXT_SEARCH_CRITERIA'
export const TOGGLE_404 = 'TOGGLE_404'
export const TOGGLE_LEFT_MENU = 'TOGGLE_LEFT_MENU'
export const SAVE_PINCODE = 'SAVE_PINCODE'

export const TOGGLE_PACKAGE_ID = 'TOGGLE_PACKAGE_ID'
export const TOGGLE_SEARCH_PACKAGES = 'TOGGLE_SEARCH_PACKAGES'

//Clear Search Ids
export const CLEAR_LAB_SEARCH_ID = 'CLEAR_LAB_SEARCH_ID'
export const CLEAR_OPD_SEARCH_ID = 'CLEAR_OPD_SEARCH_ID'

export const UPCOMING_APPOINTMENTS = 'UPCOMING_APPOINTMENTS'

//Insurance
export const GET_INSURANCE = 'GET_INSURANCE'
export const INSURANCE_PAY = 'INSURANCE_PAY'
export const SELECT_INSURANCE_PLAN = 'SELECT_INSURANCE_PLAN'
export const SELF_DATA = 'SELF_DATA'
export const SELECT_PROFILE = 'SELECT_PROFILE'
export const INSURE_MEMBER_LIST = 'INSURE_MEMBER_LIST'
export const UPDATE_MEMBER_LIST = 'UPDATE_MEMBER_LIST'
export const INSURED_PROFILE = 'INSURED_PROFILE'
export const SAVE_CURRENT_INSURED_MEMBERS = 'SAVE_CURRENT_INSURED_MEMBERS'
export const RESET_CURRENT_INSURED_MEMBERS = 'RESET_CURRENT_INSURED_MEMBERS'
export const RESET_INSURED_PLANS = 'RESET_INSURED_PLANS'
export const CLEAR_INSURANCE = 'CLEAR_INSURANCE'
export const TOOGLE_INSURANCE_CRITERIA = 'TOOGLE_INSURANCE_CRITERIA'
export const TOOGLE_LAB_INSURANCE_CRITERIA = 'TOOGLE_LAB_INSURANCE_CRITERIA'
//IPD SEARCH
export const TOGGLE_IPD = 'TOGGLE_IPD'
export const LOADED_IPD_INFO = 'LOADED_IPD_INFO'
export const GET_IPD_HOSPITALS = 'GET_IPD_HOSPITALS'
export const MERGE_IPD_CRITERIA = 'MERGE_IPD_CRITERIA'
export const SET_IPD_SEARCH_ID = 'SET_IPD_SEARCH_ID'
export const SAVE_IPD_RESULTS_WITH_SEARCHID = 'SAVE_IPD_RESULTS_WITH_SEARCHID'
export const GET_IPD_SEARCH_ID_RESULTS = 'GET_IPD_SEARCH_ID_RESULTS'
export const SELECT_IPD_LOCATION_STATUS = 'SELECT_IPD_LOCATION_STATUS'
export const GET_IPD_HOSPITAL_DETAIL = 'GET_IPD_HOSPITAL_DETAIL'
export const CLEAR_IPD_SEARCH_IDS = 'CLEAR_IPD_SEARCH_IDS'
export const GET_IPD_HOSPITAL_DETAIL_START = 'GET_IPD_HOSPITAL_DETAIL_START'
export const LOADED_IPD_INFO_START = 'LOADED_IPD_INFO_START'

//CARE
export const IS_USER_CARED = 'IS_USER_CARED'
