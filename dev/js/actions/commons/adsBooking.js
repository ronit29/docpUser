import { ADS_BOOKING} from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';


export const userCreate = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/user/userlead/create',criteria).then(function (response) {
        dispatch({
            type: ADS_BOOKING,
            payload: response
        })
        if(callback) callback(response);
    }).catch(function (error) {
        dispatch({
            type: ADS_BOOKING,
            payload: error,
        })
        if(callback) callback(error);
        throw error
    })

}