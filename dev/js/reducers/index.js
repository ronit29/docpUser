import {combineReducers} from 'redux';

import USER from './opd/user.js';
import SEARCH_CRITERIA from './opd/searchCriteria.js'
import DOCTORS from './opd/doctors.js'
import DOCTOR_SEARCH from './opd/doctorSearch.js'

const allReducers = combineReducers({
    USER,
    SEARCH_CRITERIA,
    DOCTORS,
    DOCTOR_SEARCH
});

export default allReducers
