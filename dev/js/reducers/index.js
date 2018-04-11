import {combineReducers} from 'redux';

import USER from './user.js';
import SEARCH_CRITERIA from './searchCriteria.js'
import DOCTORS from './doctors.js'
import DOCTOR_SEARCH from './doctorSearch.js'

const allReducers = combineReducers({
    USER,
    SEARCH_CRITERIA,
    DOCTORS,
    DOCTOR_SEARCH
});

export default allReducers
