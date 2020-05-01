import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import SEARCH_CRITERIA_OPD from './opd/searchCriteria.js'
import SEARCH_CRITERIA_LABS from './diagnosis/searchCriteria.js'
import DOCTORS from './opd/doctors.js'
import HOSPITALS from './opd/hospitals.js'
import DOCTOR_PROFILES from './opd/doctorProfiles.js'
import DOCTOR_SEARCH from './opd/doctorSearch.js'
import LABS from './diagnosis/labs.js'
import LAB_SEARCH from './diagnosis/labsSearch.js'
import USER from './commons/user.js'
import AUTH from './commons/auth.js'
import SITE_MAP from './commons/siteMap.js'
import LAB_SEARCH_DATA from './diagnosis/labSearchData.js'
import ELASTIC_SEARCH from './commons/elasticSearch.js'
import INSURANCE from './insurance/insuranceCriteria.js'
import SEARCH_CRITERIA_IPD from './ipd/searchCriteria.js'
import VIPCLUB from './vipClub/vipClubCriteria.js'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const DOCTOR_LIST_PRESIST = {
    key: 'DOCTOR_SEARCH',
    storage: storage,
    whitelist: ['selectedSlot', 'rescheduleSlot', 'selectedDoctorProcedure', 'commonProfileSelectedProcedures', 'payment_type', 'selectedDateFormat', 'doctorCoupons']
}

const LAB_LIST_PRESIST = {
    key: 'LAB_SEARCH',
    storage: storage,
    whitelist: ['selectedSlot', 'rescheduleSlot', 'selectedAppointmentType', 'selectedAddress', 'user_prescriptions', 'is_prescription_needed', 'selectedDateFormat', 'labCoupons', 'payment_type']
}

const USER_PERSIST = {
    key: 'USER',
    storage: storage,
    whitelist: ['summary_utm_validity', 'summary_utm', 'chatDoctors', 'chatRoomIds', 'currentRoomId', 'liveChatStarted', 'userPhoneNo', 'selectedSearchType', 'common_utm_tags', 'app_download_list', 'ipd_chat', 'user_cities', 'iFrameUrls', 'chatPaymentStatus', 'defaultProfile', 'profiles', 'mobileVerificationDone','user_loggedIn_number']
}

const OPD_SEARCH_PERSIST = {
    key: 'SEARCH_CRITERIA_OPD',
    storage: storage,
    blacklist: ['fetchNewResults', 'getNewUrl', 'commonProcedurers', 'page', 'mergeUrlState', 'specializations', 'commonSelectedCriterias', 'common_settings', 'nearbyHospitals']
}

const LAB_SEARCH_PERSIST = {
    key: 'SEARCH_CRITERIA_LABS',
    storage: storage,
    blacklist: ['fetchNewResults', 'page', 'common_tests', 'common_package', 'currentSearchedCriterias', 'filterCriteriaPackages']
}

const AUTH_PERSIST = {
    key: 'AUTH',
    storage: storage,
    whitelist: []
}

const INSURANCE_LIST_PRESIST = {
    key: 'INSURANCE',
    storage: storage,
    whitelist: ['insurnaceData', 'self_data_values', 'selected_plan', 'currentSelectedInsuredMembersId', 'create_payment_resp', 'members_proofs', 'insurer_bank_details', 'avail_now_data', 'cancel_reason']
}
const VIP_CLUB_CRITERIA_PRESIST = {
    key: 'VIPCLUB',
    storage: storage,
    whitelist: ['vipClubList', 'selected_vip_plan', 'vipClubMemberDetails', 'currentSelectedVipMembersId', 'LOAD_VIP_CLUB_DASHBOARD', 'vip_club_db_data', 'members_proofs', 'showVipDetailsView','savedMemberData', 'odpGoldPredictedPrice', 'labGoldPredictedPrice', 'vipCoupons','selected_digit_plan','currentSelectedDigitMembersId', 'digitPlans','digit_self_details']
}
const IPD_SEARCH_PERSIST = {
    key: 'SEARCH_CRITERIA_IPD',
    storage: storage,
    blacklist: ['page', 'getNewResults', 'fetchNewResults', 'locationFetched', 'HOSPITAL_DETAIL_LOADED', 'IPD_INFO_LOADED', 'ipd_hospital_detail_info', 'ipdPopupData', 'hospital_list']
}

const allReducers = combineReducers({
    SEARCH_CRITERIA_OPD: persistReducer(OPD_SEARCH_PERSIST, SEARCH_CRITERIA_OPD),
    SEARCH_CRITERIA_LABS: persistReducer(LAB_SEARCH_PERSIST, SEARCH_CRITERIA_LABS),
    DOCTORS,
    HOSPITALS,
    DOCTOR_SEARCH: persistReducer(DOCTOR_LIST_PRESIST, DOCTOR_SEARCH),
    LABS,
    LAB_SEARCH: persistReducer(LAB_LIST_PRESIST, LAB_SEARCH),
    USER: persistReducer(USER_PERSIST, USER),
    AUTH: persistReducer(AUTH_PERSIST, AUTH),
    SITE_MAP,
    DOCTOR_PROFILES,
    LAB_SEARCH_DATA,
    ELASTIC_SEARCH,
    INSURANCE: persistReducer(INSURANCE_LIST_PRESIST, INSURANCE),
    SEARCH_CRITERIA_IPD: persistReducer(IPD_SEARCH_PERSIST, SEARCH_CRITERIA_IPD),
    VIPCLUB: persistReducer(VIP_CLUB_CRITERIA_PRESIST, VIPCLUB)
});

const persistedReducer = persistReducer(persistConfig, allReducers)

export default persistedReducer
