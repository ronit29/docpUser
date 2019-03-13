import { CARE_DETAILS} from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';


// export const userCreate = (criteria,callback) => (dispatch) => {
//     return API_POST('/api/v1/user/userlead/create',criteria).then(function (response) {
//         dispatch({
//             type: ADS_BOOKING,
//             payload: response
//         })
//         if(callback) callback(response);
//     }).catch(function (error) {
//         dispatch({
//             type: ADS_BOOKING,
//             payload: error,
//         })
//         if(callback) callback(error);
//         throw error
//     })

// }

export const getCareDetails = (insuranceid,callback) => (dispatch) => {

    return API_GET('/api/v1/insurance/list').then(function (response) {
        dispatch({
            type: CARE_DETAILS,
            payload: response
        })
        if(callback) callback(response)
    }).catch(function (error) {
        dispatch({
            type: CARE_DETAILS,
            payload: error
        })
        if(callback) callback(error)
        throw error
    })

}