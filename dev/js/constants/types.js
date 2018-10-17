//AUTH ACTIONS
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST'
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS'
export const SEND_OTP_FAIL = 'SEND_OTP_FAIL'
export const SUBMIT_OTP_REQUEST = 'SUBMIT_OTP_REQUEST'
export const SUBMIT_OTP_SUCCESS = 'SUBMIT_OTP_SUCCESS'
export const SUBMIT_OTP_FAIL = 'SUBMIT_OTP_FAIL'
export const RESET_AUTH = 'RESET_AUTH'

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
export const SAVE_USER_PHONE_NO = 'SAVE_USER_PHONE_NO'