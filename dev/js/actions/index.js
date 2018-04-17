import * as SEARCH_CRITERIA_OPD from './opd/searchCriteria.js'
import * as SEARCH_CRITERIA_LABS from './diagnosis/searchCriteria.js'
import * as DOCTORS_ACTIONS from './opd/doctorSearch.js'
import * as LABS_ACTIONS from './diagnosis/labSearch.js'

module.exports = Object.assign({},
    SEARCH_CRITERIA_OPD,
    SEARCH_CRITERIA_LABS,
    DOCTORS_ACTIONS,
    LABS_ACTIONS
)