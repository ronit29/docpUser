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

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const DOCTOR_LIST_PRESIST = {
    key: 'DOCTOR_SEARCH',
    storage: storage,
    whitelist: ['selectedSlot', 'rescheduleSlot', 'doctorCoupons', 'selectedDoctorProcedure', 'commonProfileSelectedProcedures', 'payment_type']
}

const LAB_LIST_PRESIST = {
    key: 'LAB_SEARCH',
    storage: storage,
    whitelist: ['selectedSlot', 'rescheduleSlot', 'selectedAppointmentType', 'selectedAddress', 'labCoupons']
}

const USER_PERSIST = {
    key: 'USER',
    storage: storage,
    whitelist: ['summary_utm_validity', 'summary_utm', 'chatDoctors', 'chatRoomIds', 'currentRoomId', 'liveChatStarted', 'userPhoneNo', 'selectedSearchType']
}

const OPD_SEARCH_PERSIST = {
    key: 'SEARCH_CRITERIA_OPD',
    storage: storage,
    blacklist: ['fetchNewResults', 'getNewUrl', 'commonProcedurers', 'page', 'mergeUrlState']
}

const LAB_SEARCH_PERSIST = {
    key: 'SEARCH_CRITERIA_LABS',
    storage: storage,
    blacklist: ['fetchNewResults', 'page']
}

const AUTH_PERSIST = {
    key: 'AUTH',
    storage: storage,
    whitelist: []
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
    ELASTIC_SEARCH
});

const persistedReducer = persistReducer(persistConfig, allReducers)

export default persistedReducer
