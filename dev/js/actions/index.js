import * as USER_ACTIONS from './opd/user.js';
import * as SEARCH_CRITERIA from './opd/searchCriteria.js'
import * as DOCTORS_ACTIONS from './opd/doctorSearch.js'

module.exports = Object.assign({},
    USER_ACTIONS,
    SEARCH_CRITERIA,
    DOCTORS_ACTIONS
)