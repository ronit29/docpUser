import {combineReducers} from 'redux';

import USER from './user.js';
import SEARCH_CRITERIA from './searchCriteria.js'

const allReducers = combineReducers({
    USER,
    SEARCH_CRITERIA
});

export default allReducers
