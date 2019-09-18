import { GET_VIP_LIST, SELECT_VIP_CLUB_PLAN, USER_SELF_DETAILS, SAVE_CURRENT_VIP_MEMBERS, SELECT_VIP_USER_PROFILE, RESET_VIP_CLUB, VIP_CLUB_DASHBOARD_DATA, SAVE_VIP_MEMBER_PROOFS, DELETE_VIP_MEMBER_PROOF
 } from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getVipList = (is_endorsement,selectedLocation,callback) => (dispatch) => {
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
    if(latitude != lat && longitude != long){
        latitude = latitude
        longitude = longitude
    }
    return API_GET('/api/v1/plus/list?lat='+latitude+'&long='+longitude).then(function (response) {
        dispatch({
            type: GET_VIP_LIST,
            payload: response
        })
        if(callback) callback(response)
    }).catch(function (error) {
        dispatch({
            type: GET_VIP_LIST,
            payload: error
        })
        if(callback) callback(error)
        throw error
    })

}

export const selectVipClubPlan = (type, selected_vip_plan,callback) => (dispatch) => {
    dispatch({
        type: SELECT_VIP_CLUB_PLAN,
        payload: {
            type, selected_vip_plan
        }
    })
    if(callback) callback(selected_vip_plan)
}

export const userDetails = (type, vipClubMemberDetails, forceAdd = false, previousProfile='') => (dispatch) => {
    dispatch({
        type: USER_SELF_DETAILS,
        payload: {
            type, forceAdd
        },
        vipClubMemberDetails:[vipClubMemberDetails],
        previousProfile: previousProfile
    })

}
export const saveCurrentSelectedVipMembers = (membersId,callback) => (dispatch) => {
    dispatch({
        type: SAVE_CURRENT_VIP_MEMBERS,
        payload: membersId
    })
    if(callback) callback(true) 
}

export const selectVipUserProfile = (newProfileid,member_id,newProfile,param_id) => (dispatch) => {
    dispatch({
        type: SELECT_VIP_USER_PROFILE,
        payload: {
            newProfileid,member_id,newProfile,param_id
        },
    })

}

export const vipClubPay = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/plus/create',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const addVipMembersData = (criteria,callback) => (dispatch) => {
    return API_POST('/api/v1/plus/add/members',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const generateVipClubLead = (selectedPlan, number,lead_data,selectedLocation,user_name,callback) => (dispatch) => {
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
        plan.name = user_name
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
        plan.lead_source = lead_data.lead_source
        if(latitude != lat && longitude != long){
            plan.latitude = latitude
            plan.longitude = longitude
        }
    return API_POST(`/api/v1/plus/lead/create`, plan).then(function (response) {
        if(callback) callback(response)
    }).catch(function (error) {
       if(callback) callback(error)
    })
}

export const getVipDashboardList = (user_id,is_dashboard,callback) => (dispatch) => {

    return API_GET('/api/v1/plus/dashboard?id='+user_id+'&is_dashboard='+is_dashboard).then(function (response) {
        if(response){
            let selected_vip_plan = response.data.plan[0]
                dispatch({
                type: SELECT_VIP_CLUB_PLAN,
                payload: {
                    selected_vip_plan
                    }
                })
                dispatch({
                    type: VIP_CLUB_DASHBOARD_DATA,
                    payload: response
                })
        }
        if(callback) callback(response)
    }).catch(function (error) {
            dispatch({
                type: VIP_CLUB_DASHBOARD_DATA,
                payload: error
            })
        if(callback) callback(error)
        throw error
    })

}

export const resetVipData = () =>(dispatch) =>{
    dispatch({
        type: RESET_VIP_CLUB
    })
}


export const uploadVipProof = (profileData, memberId,imgType,cb) => (dispatch) => {
    API_POST(`/api/v1/common/upload/document-proof?type=${imgType}`,profileData).then(function (response) {
        if (cb) cb(response,null);
    }).catch(function (error) {
        if (cb) cb(error, null);
    })
}

export const storeVipMemberProofs = (imgUrl,cb) => (dispatch) => {
    dispatch({
        type:SAVE_VIP_MEMBER_PROOFS,
        payload:imgUrl
    })
}

export const removeVipMemberProof = (criteria) => (dispatch) => {
    dispatch({
        type:DELETE_VIP_MEMBER_PROOF,
        payload:criteria
    })
}

