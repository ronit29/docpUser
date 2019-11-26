import { GET_VIP_LIST, SELECT_VIP_CLUB_PLAN, USER_SELF_DETAILS, SAVE_CURRENT_VIP_MEMBERS, SELECT_VIP_USER_PROFILE, RESET_VIP_CLUB, VIP_CLUB_DASHBOARD_DATA, SAVE_VIP_MEMBER_PROOFS, DELETE_VIP_MEMBER_PROOF, SHOW_VIP_MEMBERS_FORM, CLEAR_VIP_SELECTED_PLAN, CLEAR_VIP_MEMBER_DATA, GET_OPD_VIP_GOLD_PLANS, GET_LAB_VIP_GOLD_PLANS
 } from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getVipList = (is_endorsement,data,callback) => (dispatch) => {
    let is_vip_gold = false
    let lat
    let long
    let latitude = 28.644800
    let longitude = 77.216721
    if (data.selectedLocation) {
        lat = data.selectedLocation.geometry.location.lat
        long = data.selectedLocation.geometry.location.lng

        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

    }
    if(latitude != lat && longitude != long){
        latitude = latitude
        longitude = longitude
    }
    let url = '/api/v1/plus/list?lat='+latitude+'&long='+longitude
    if(data.isSalesAgent){
        url +='&utm_source='+data.isSalesAgent
    }
    if(data.isAgent){
        url += '&is_agent='+data.isAgent
    }
    if(data.is_gold){
        url += '&is_gold='+data.is_gold
        is_vip_gold = data.is_gold
    }
    if(data.all){
        url += '&all='+data.all
        is_vip_gold = data.all
    }
    return API_GET(url).then(function (response) {
        dispatch({
            type: GET_VIP_LIST,
            payload: response,
            is_vip_gold: is_vip_gold
        })
        if(callback) callback(response)
    }).catch(function (error) {
        dispatch({
            type: GET_VIP_LIST,
            payload: error,
            is_vip_gold: is_vip_gold
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

export const generateVipClubLead = (selectedPlan, number,lead_data,selectedLocation,user_name,extraParams={}, callback) => (dispatch) => {
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
    if(extraParams && extraParams.city_id) {
        plan.city_id = extraParams.city_id
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

export const pushMembersData = (criteria, callback) => (dispatch) =>{
    let url  = `/api/v1/plus/push_dummy_data`

    if(criteria && criteria.is_single_flow_opd) {
        url+=`?is_single_flow_opd=${true}`
    }

    if(criteria && criteria.is_single_flow_lab) {
        url+=`?is_single_flow_lab=${true}`
    }

    if(criteria && criteria.dummy_data_type){
        url+=`&dummy_data_type=${criteria.dummy_data_type}`
    }
    return API_POST(url, criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })
}

export const retrieveMembersData = (type,extraParams={},callback) => (dispatch) =>{
    let url = `api/v1/plus/show_dummy_data?dummy_data_type=${type}`
    if(extraParams && extraParams.dummy_id) {
        url+=`&dummy_id=${extraParams.dummy_id}`
    }
    API_GET(url).then(function (response) {
        dispatch({
            type:SHOW_VIP_MEMBERS_FORM,
            payload:response
        })
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const vipPlusLead = (data) => (dispatch) => {
    API_POST(`api/v1/plus/push_vip_lead`, data).then(function (response) {
    })
}

export const clearVipSelectedPlan = () =>(dispatch) =>{
    dispatch({
        type: CLEAR_VIP_SELECTED_PLAN
    })
}
export const clearVipMemeberData = () =>(dispatch) =>{
    dispatch({
        type: CLEAR_VIP_MEMBER_DATA
    })
}

export const getOpdVipGoldPlans = (extraParams ={}, cb) =>(dispatch) => {

    return API_POST(`/api/v1/common/predicted-price-via-plan/opd`, extraParams).then((response) =>{
        dispatch({
            type: GET_OPD_VIP_GOLD_PLANS,
            payload: response.vip_plans
        })
        let defaultSelectedPlan = []
        if(extraParams && extraParams.already_selected_plan) {
            defaultSelectedPlan = response.vip_plans && response.vip_plans.filter(x=>x.id== extraParams.already_selected_plan);
        }
        if(defaultSelectedPlan && defaultSelectedPlan.length==0){
            defaultSelectedPlan = response.vip_plans && response.vip_plans.filter(x=>x.is_selected);
        }  
        dispatch({
            type: SELECT_VIP_CLUB_PLAN,
            payload: {
                selected_vip_plan: defaultSelectedPlan && defaultSelectedPlan.length?defaultSelectedPlan[0]:[],
            }
        })
    })
}

export const getLabVipGoldPlans = (extraParams ={}, cb) =>(dispatch) => {

    return API_POST(`/api/v1/common/predicted-price-via-plan/lab`, extraParams).then((response) =>{
        dispatch({
            type: GET_LAB_VIP_GOLD_PLANS,
            payload: response.vip_plans
        })
        let defaultSelectedPlan = []
        if(extraParams && extraParams.already_selected_plan) {
            defaultSelectedPlan = response.vip_plans && response.vip_plans.filter(x=>x.id== extraParams.already_selected_plan);
        }
        if(defaultSelectedPlan && defaultSelectedPlan.length==0){
            defaultSelectedPlan = response.vip_plans && response.vip_plans.filter(x=>x.is_selected);
        }  
        dispatch({
            type: SELECT_VIP_CLUB_PLAN,
            payload: {
                selected_vip_plan: defaultSelectedPlan && defaultSelectedPlan.length?defaultSelectedPlan[0]:[],
            }
        })
    })
}