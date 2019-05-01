import { GET_INSURANCE, SELECT_INSURANCE_PLAN, APPEND_USER_PROFILES, SELF_DATA, INSURANCE_PAY, SELECT_PROFILE, INSURE_MEMBER_LIST, UPDATE_MEMBER_LIST,INSURED_PROFILE , SAVE_CURRENT_INSURED_MEMBERS, RESET_CURRENT_INSURED_MEMBERS, RESET_INSURED_PLANS, CLEAR_INSURANCE, PUSH_USER_DATA, RESET_INSURED_DATA} from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getInsurance = (callback) => (dispatch) => {

    return API_GET('/api/v1/insurance/list').then(function (response) {
        dispatch({
            type: GET_INSURANCE,
            payload: response
        })
        if(callback) callback(response)
    }).catch(function (error) {
        dispatch({
            type: GET_INSURANCE,
            payload: error
        })
        if(callback) callback(error)
        throw error
    })

}
export const getInsuranceMemberList = (member_list_id) => (dispatch) => {
    return API_GET('/api/v1/insurance/members/list?id='+member_list_id).then(function (response) {
        dispatch({
            type: INSURE_MEMBER_LIST,
            payload: response
        })
    }).catch(function (error) {
        dispatch({
            type: INSURE_MEMBER_LIST,
            payload: null
        })
        throw error
    })

}
export const insurancePay = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/insurance/create',criteria).then(function (response) {
        dispatch({
            type: INSURANCE_PAY,
            payload: response
        })
        if(callback) callback(response);
    }).catch(function (error) {
        dispatch({
            type: INSURANCE_PAY,
            payload: error,
        })
        if(callback) callback(error);
        throw error
    })

}
export const updateMemberList = (postData,callback) => (dispatch) => {
    return API_POST('/api/v1/insurance/members/update',postData).then(function (response) {
        dispatch({
            type: UPDATE_MEMBER_LIST,
            payload: response
        })
        if(callback) callback(response);
    }).catch(function (error) {
        dispatch({
            type: UPDATE_MEMBER_LIST,
            payload: null
        })
        throw error
    })

}
export const selectInsurancePlan = (type, selected_plan) => (dispatch) => {
    dispatch({
        type: SELECT_INSURANCE_PLAN,
        payload: {
            type, selected_plan
        }
    })

}
export const userData = (type, self_data_values, forceAdd = false, previousProfile='') => (dispatch) => {
    dispatch({
        type: SELF_DATA,
        payload: {
            type, forceAdd
        },
        self_data_values:[self_data_values],
        previousProfile: previousProfile
    })

}
export const selectInsuranceProfile = (newProfileid,member_id,newProfile,param_id) => (dispatch) => {
    dispatch({
        type: SELECT_PROFILE,
        payload: {
            newProfileid,member_id,newProfile,param_id
        },
    })

}
export const getUserProfile = () => (dispatch) => {
    return API_GET('/api/v1/user/userprofile').then(function (response) {
        dispatch({
            type: APPEND_USER_PROFILES,
            payload: response
        })

    }).catch(function (error) {

    })
}
export const getInsuredProfile = (callback) => (dispatch) => {
    return API_GET('/api/v1/insurance/profile').then(function (response) {
        dispatch({
            type: INSURED_PROFILE,
            payload: response
        })
        if(callback) callback(response)
    }).catch(function (error) {
        if(callback) callback(error)
    })
}

export const saveCurrentSelectedMembers = (membersId) => (dispatch) => {
    dispatch({
        type: SAVE_CURRENT_INSURED_MEMBERS,
        payload: membersId
    })
}

export const resetSelectedInsuranceMembers = (member_id) => (dispatch) => {
    dispatch({
        type: RESET_CURRENT_INSURED_MEMBERS,
        payload :member_id
    })
}

export const resetSelectedPlans = () => (dispatch) => {
    dispatch({
        type:RESET_INSURED_PLANS
    })
}
export const clearInsurance = () => (dispatch) =>{
    dispatch({
            type: CLEAR_INSURANCE
        })
}
export const generateInsuranceLead = (selectedPlan, number,utm_source,callback) => (dispatch) => {
    let plan={}
        plan.plan_id= selectedPlan
        plan.phone_number = number
        plan.source = utm_source
    return API_POST(`/api/v1/insurance/lead/create`, plan).then(function (response) {
        if(callback) callback(null, response)
    }).catch(function (error) {
       if(callback) callback(error, null)
    })
}
export const pushUserData = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/insurance/push_insurance_data',criteria).then(function (response) {
        dispatch({
            type: PUSH_USER_DATA,
            payload: response
        })
        if(callback) callback(response);
    }).catch(function (error) {
        dispatch({
            type: PUSH_USER_DATA,
            payload: error,
        })
        if(callback) callback(error);
        throw error
    })

}

export const retrieveUserData = (callback) => (dispatch) => {
    API_GET('/api/v1/insurance/show_insurance_data').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const resetUserInsuredData = (criteria) => (dispatch) => {
    dispatch({
        type:RESET_INSURED_DATA,
        payload:criteria
    })
}

export const cancelInsurance = (callback) => (dispatch) => {
    API_GET('/api/v1/insurance/cancel').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const cancelledInsuranceDetails = (callback) => (dispatch) => {
    API_GET('/api/v1/insurance/cancel-master').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}