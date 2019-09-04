import * as SEARCH_CRITERIA_OPD from './opd/searchCriteria.js'
import * as SEARCH_CRITERIA_LABS from './diagnosis/searchCriteria.js'
import * as DOCTORS_ACTIONS from './opd/doctorSearch.js'
import * as LABS_ACTIONS from './diagnosis/labSearch.js'
import * as USER_ACTIONS from './commons/user.js'
import * as AUTH_ACTIONS from './commons/auth.js'
import * as SITE_MAP from './commons/siteMap.js'
import * as ELASTIC_SEARCH from './commons/elasticSearch.js'
import * as ADS_BOOKING from './commons/adsBooking.js'
import * as INSURANCE_ACTIONS from './insurance/insuranceCriteria.js'
import * as CARE_DETAILS from './commons/primeCare.js'
import * as SEARCH_CRITERIA_IPD from './ipd/searchCriteria.js'
import * as VIP_CLUB_CRITERIA from './vipClub/vipClubCriteria.js'

module.exports = Object.assign({},
    SEARCH_CRITERIA_OPD,
    SEARCH_CRITERIA_LABS,
    DOCTORS_ACTIONS,
    LABS_ACTIONS,
    USER_ACTIONS,
    AUTH_ACTIONS,
    SITE_MAP,
    ELASTIC_SEARCH,
    ADS_BOOKING,
    INSURANCE_ACTIONS,
    CARE_DETAILS,
    SEARCH_CRITERIA_IPD,
    VIP_CLUB_CRITERIA
)