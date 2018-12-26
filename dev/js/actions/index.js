import * as SEARCH_CRITERIA_OPD from './opd/searchCriteria.js'
import * as SEARCH_CRITERIA_LABS from './diagnosis/searchCriteria.js'
import * as DOCTORS_ACTIONS from './opd/doctorSearch.js'
import * as LABS_ACTIONS from './diagnosis/labSearch.js'
import * as USER_ACTIONS from './commons/user.js'
import * as AUTH_ACTIONS from './commons/auth.js'
import * as SITE_MAP from './commons/siteMap.js'
import * as ELASTIC_SEARCH from './commons/elasticSearch.js'
import * as ADS_BOOKING from './commons/adsBooking.js'
module.exports = Object.assign({},
    SEARCH_CRITERIA_OPD,
    SEARCH_CRITERIA_LABS,
    DOCTORS_ACTIONS,
    LABS_ACTIONS,
    USER_ACTIONS,
    AUTH_ACTIONS,
    SITE_MAP,
    ELASTIC_SEARCH,
    ADS_BOOKING
)