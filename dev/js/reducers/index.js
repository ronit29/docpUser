import {combineReducers} from 'redux';

import SEARCH_CRITERIA_OPD from './opd/searchCriteria.js'
import SEARCH_CRITERIA_LABS from './diagnosis/searchCriteria.js'
import DOCTORS from './opd/doctors.js'
import DOCTOR_SEARCH from './opd/doctorSearch.js'
import LABS from './diagnosis/labs.js'
import LAB_SEARCH from './diagnosis/labsSearch.js'
import USER from './commons/user.js'
import AUTH from './commons/auth.js'

const allReducers = combineReducers({
    SEARCH_CRITERIA_OPD,
    SEARCH_CRITERIA_LABS,
    DOCTORS,
    DOCTOR_SEARCH,
    LABS,
    LAB_SEARCH,
    USER,
    AUTH
});

export default allReducers
