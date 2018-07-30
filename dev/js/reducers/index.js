import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import SEARCH_CRITERIA_OPD from './opd/searchCriteria.js'
import SEARCH_CRITERIA_LABS from './diagnosis/searchCriteria.js'
import DOCTORS from './opd/doctors.js'
import DOCTOR_SEARCH from './opd/doctorSearch.js'
import LABS from './diagnosis/labs.js'
import LAB_SEARCH from './diagnosis/labsSearch.js'
import USER from './commons/user.js'
import AUTH from './commons/auth.js'

const DOCTOR_LIST_PRESIST = {
    key: 'DOCTOR_SEARCH',
    storage: storage,
    whitelist: ['selectedSlot', 'rescheduleSlot']
}

const LAB_LIST_PRESIST = {
    key: 'LAB_SEARCH',
    storage: storage,
    whitelist: ['selectedSlot', 'rescheduleSlot', 'selectedAppointmentType', 'selectedAddress']
}

const USER_PERSIST = {
    key: 'USER',
    storage: storage,
    whitelist: ['chatDoctors', 'chatRoomIds']
}

const allReducers = combineReducers({
    SEARCH_CRITERIA_OPD,
    SEARCH_CRITERIA_LABS,
    DOCTORS,
    DOCTOR_SEARCH: persistReducer(DOCTOR_LIST_PRESIST, DOCTOR_SEARCH),
    LABS,
    LAB_SEARCH: persistReducer(LAB_LIST_PRESIST, LAB_SEARCH),
    USER,
    AUTH
});

export default allReducers
