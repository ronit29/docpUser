import { GET_INSURANCE, SELECT_INSURANCE_PLAN, APPEND_USER_PROFILES, SELF_DATA, INSURANCE_PAY, SELECT_PROFILE, INSURE_MEMBER_LIST, UPDATE_MEMBER_LIST,INSURED_PROFILE , SAVE_CURRENT_INSURED_MEMBERS, RESET_CURRENT_INSURED_MEMBERS, RESET_INSURED_PLANS, CLEAR_INSURANCE, PUSH_USER_DATA, RESET_INSURED_DATA, ENDORSED_MEMBER_LIST, SAVE_MEMBER_PROOFS, DELETE_MEMBER_PROOF, SAVE_INSURANCE_BANK_DETAILS, SAVE_AVAIL_NOW_INSURANCE, CLEAR_AVAIL_NOW_INSURANCE, CANCEL_REASON_INSURANCE, CLEAR_BANK_DETAILS_INSURANCE} from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getInsurance = (is_endorsement,callback) => (dispatch) => { // to get insurance plans

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
export const getInsuranceMemberList = (member_list_id) => (dispatch) => { // get insured member details and list of dieases(faq's)
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
export const insurancePay = (criteria,callback) => (dispatch) => { // to request payment
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
export const updateMemberList = (postData,callback) => (dispatch) => { // update members selected list
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
export const selectInsurancePlan = (type, selected_plan) => (dispatch) => { // to select insurance plan
    dispatch({
        type: SELECT_INSURANCE_PLAN,
        payload: {
            type, selected_plan
        }
    })

}
export const userData = (type, self_data_values, forceAdd = false, previousProfile='') => (dispatch) => { // to save user entered details in dummy table
    dispatch({
        type: SELF_DATA,
        payload: {
            type, forceAdd
        },
        self_data_values:[self_data_values],
        previousProfile: previousProfile
    })

}
export const selectInsuranceProfile = (newProfileid,member_id,newProfile,param_id) => (dispatch) => { // select from profile option
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
export const getInsuredProfile = (callback) => (dispatch) => { // to get insured members data and certification details
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

export const saveCurrentSelectedMembers = (membersId) => (dispatch) => { // to save current selected members data in store
    dispatch({
        type: SAVE_CURRENT_INSURED_MEMBERS,
        payload: membersId
    })
}

export const resetSelectedInsuranceMembers = (member_id) => (dispatch) => { // filter only visible forms objexts in the store
    dispatch({
        type: RESET_CURRENT_INSURED_MEMBERS,
        payload :member_id
    })
}

export const resetSelectedPlans = () => (dispatch) => { // to reset user selected plan
    dispatch({
        type:RESET_INSURED_PLANS
    })
}
export const generateInsuranceLead = (selectedPlan, number,lead_data,selectedLocation,callback) => (dispatch) => { // to create insurance lead for matrix
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
export const pushUserData = (criteria,callback) => (dispatch) => { // to save user entered details in dummy table
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

export const retrieveUserData = (callback) => (dispatch) => { // to retrieve user data in case of agent has loggedin instead of user 
    API_GET('/api/v1/insurance/show_insurance_data').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const resetUserInsuredData = (criteria) => (dispatch) => { // to reset the insurance store to initial state
    dispatch({
        type:RESET_INSURED_DATA,
        payload:criteria
    })
}

export const cancelInsurance = (data,callback) => (dispatch) => { // to submit user cancellation request
    return API_POST('/api/v1/insurance/cancel',data).then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const cancelledInsuranceDetails = (callback) => (dispatch) => { // to get user cancelled details
    API_GET('/api/v1/insurance/cancel-master').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const getEndorsedMemberList = (callback) => (dispatch) => { // to get the list of members which are allowed for endorsement
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

export const pushUserEndorsedData = (criteria,callback) => (dispatch) => { // to save user entered details in dummy table
    return API_POST('/api/v1/insurance/push_endorsement_data',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const retrieveEndorsedData = (callback) => (dispatch) => { // to retrieve user endorsement data (if user want's to update any of details in there policy details)
    API_GET('/api/v1/insurance/show_endorsement_data').then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })

}

export const createEndorsementData = (criteria,callback) => (dispatch) => { // submit endoresment data
    return API_POST('/api/v1/insurance/endorsement/create',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const uploadProof = (profileData, memberId,imgType,cb) => (dispatch) => { // store selected proof to database
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

export const removeMemberProof = (criteria) => (dispatch) => { // to remove cancelled uploaded image
    dispatch({
        type:DELETE_MEMBER_PROOF,
        payload:criteria
    })
}
export const saveUserBankDetails = (criteria) => (dispatch) => { // to save user entered bank details in store
    dispatch({
        type:SAVE_INSURANCE_BANK_DETAILS,
        payload:criteria
    })
}
export const uploadBankProof = (profileData,imgType,cb) => (dispatch) => { // to upload proofs
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

export const clearAvailNowInsurance = () => (dispatch) => { // to clear avail now from store
    dispatch({
        type:CLEAR_AVAIL_NOW_INSURANCE
    })
}
export const cancelReason = (criteria) => (dispatch) => { // ask cancellation reason
    dispatch({
        type:CANCEL_REASON_INSURANCE,
        payload:criteria
    })
}
export const clearBankDetails = () => (dispatch) => { // to reset user enterted bank details
    dispatch({
        type:CLEAR_BANK_DETAILS_INSURANCE
    })
}