import {combineReducers} from 'redux';

import USER from './user.js';
import SEARCH_CRITERIA from './searchCriteria.js'
import DOCTORS from './doctors.js'

const allReducers = combineReducers({
    USER,
    SEARCH_CRITERIA,
    DOCTORS
});

export default allReducers
