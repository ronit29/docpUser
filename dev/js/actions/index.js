import * as USER_ACTIONS from './user.js';
import * as SEARCH_CRITERIA from './searchCriteria.js'
import * as DOCTORS_ACTIONS from './doctors.js'

module.exports = Object.assign({},
    USER_ACTIONS,
    SEARCH_CRITERIA,
    DOCTORS_ACTIONS
)