import { TOGGLE_IPD } from '../../constants/types';
import { API_GET } from '../../api/api.js';
import GTM from '../../helpers/gtm'

/*export const loadOPDCommonCriteria = () => (dispatch) => {

    return API_GET('/api/v1/doctor/commonconditions').then(function (response) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_OPD,
            payload: response
        })
    }).catch(function (error) {
        dispatch({
            type: LOAD_SEARCH_CRITERIA_OPD,
            payload: null
        })
        throw error
    })

}
*/
export const toggleIPDCriteria = (criteria, forceAdd= false) => (dispatch) => {

	dispatch({
		type: TOGGLE_IPD,
		payload: criteria,
		forceAdd: forceAdd
	})
} 