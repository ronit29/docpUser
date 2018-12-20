import { GET_INSURANCE} from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

// export const getInsurance = () => (dispatch) => {

//     return API_GET('/api/v1/insurance/list').then(function (response) {
//         dispatch({
//             type: GET_INSURANCE,
//             payload: response
//         })
//     }).catch(function (error) {
//         dispatch({
//             type: GET_INSURANCE,
//             payload: error
//         })
//         throw error
//     })

// }
// export const insurancePay = (postData,criteria,forceadd,callback) => (dispatch) => {
//     return API_POST('/api/v1/insurance/create',criteria).then(function (response) {
//         dispatch({
//             type: INSURANCE_PAY,
//             payload: response
//         })
//         if(callback) callback(response);
//     }).catch(function (error) {
//         dispatch({
//             type: INSURANCE_PAY,
//             payload: error,
//         })
//         if(callback) callback(error);
//         throw error
//     })

// }