import { GET_INSURANCE, SELECT_INSURANCE_PLAN, APPEND_USER_PROFILES, SELF_DATA, INSURANCE_PAY, SELECT_PROFILE, INSURE_MEMBER_LIST, UPDATE_MEMBER_LIST,INSURED_PROFILE , SAVE_CURRENT_INSURED_MEMBERS, RESET_CURRENT_INSURED_MEMBERS, RESET_INSURED_PLANS, CLEAR_INSURANCE, PUSH_USER_DATA, RESET_INSURED_DATA, ENDORSED_MEMBER_LIST, SAVE_MEMBER_PROOFS, DELETE_MEMBER_PROOF, SAVE_INSURANCE_BANK_DETAILS, SAVE_AVAIL_NOW_INSURANCE} from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getInsurance = (is_endorsement,callback) => (dispatch) => {

    return API_GET('/api/v1/insurance/list?is_endorsement='+is_endorsement).then(function (response) {
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
export const generateInsuranceLead = (selectedPlan, number,lead_data,callback,selectedLocation) => (dispatch) => {
    let lat
    let long
    let latitude = 28.644800
    let longitude = 77.216721
    if (selectedLocation) {
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng

        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

    }
    let plan={}
        plan.plan_id= selectedPlan
        plan.phone_number=''
        plan.source=''
        if(lead_data && lead_data.source){
            plan.source = lead_data.source
        }
        if(number == '' && lead_data &&  lead_data.phone_number){
            plan.phone_number = lead_data.phone_number
        }else{
            plan.phone_number = number
        }
        plan.lead_data = lead_data
        if(latitude != lat && longitude != long){
            plan.latitude = latitude
            plan.longitude = longitude
        }
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

export const cancelInsurance = (data,callback) => (dispatch) => {
    return API_POST('/api/v1/insurance/cancel',data).then(function (response) {
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

export const getEndorsedMemberList = (callback) => (dispatch) => {
    return API_GET('/api/v1/insurance/endorsement').then(function (response) {
        dispatch({
            type: ENDORSED_MEMBER_LIST,
            payload: response
        })
        if(callback) callback(response)
    }).catch(function (error) {
        dispatch({
            type: ENDORSED_MEMBER_LIST,
            payload: null
        })
        if (callback) callback(null)
    })

}

export const pushUserEndorsedData = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/insurance/push_endorsement_data',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const retrieveEndorsedData = (callback) => (dispatch) => {
    API_GET('/api/v1/insurance/show_endorsement_data').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const createEndorsementData = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/insurance/endorsement/create',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const uploadProof = (profileData, memberId,imgType,cb) => (dispatch) => {
    API_POST(`/api/v1/insurance/member/${memberId}/upload?member=${memberId}&type=${imgType}`,profileData).then(function (response) {
        if (cb) cb(response,null);
    }).catch(function (error) {
        if (cb) cb(error, null);
    })
}

export const storeMemberProofs = (imgUrl,cb) => (dispatch) => {
    dispatch({
        type:SAVE_MEMBER_PROOFS,
        payload:imgUrl
    })
}

export const removeMemberProof = (criteria) => (dispatch) => {
    dispatch({
        type:DELETE_MEMBER_PROOF,
        payload:criteria
    })
}
export const saveUserBankDetails = (criteria) => (dispatch) => {
    dispatch({
        type:SAVE_INSURANCE_BANK_DETAILS,
        payload:criteria
    })
}
export const uploadBankProof = (profileData,imgType,cb) => (dispatch) => {
    API_POST(`/api/v1/insurance/bank/upload`,profileData).then(function (response) {
        if (cb) cb(response,null);
    }).catch(function (error) {
        if (cb) cb(error, null);
    })
}

export const saveAvailNowInsurance = (criteria) => (dispatch) => {
    dispatch({
        type:SAVE_AVAIL_NOW_INSURANCE,
        payload:criteria
    })
}