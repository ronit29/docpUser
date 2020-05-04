import { GET_VIP_LIST, SELECT_VIP_CLUB_PLAN, USER_SELF_DETAILS, SAVE_CURRENT_VIP_MEMBERS, SELECT_VIP_USER_PROFILE, RESET_VIP_CLUB, VIP_CLUB_DASHBOARD_DATA, SAVE_VIP_MEMBER_PROOFS, DELETE_VIP_MEMBER_PROOF, SHOW_VIP_MEMBERS_FORM, CLEAR_VIP_SELECTED_PLAN, CLEAR_VIP_MEMBER_DATA, GET_OPD_VIP_GOLD_PLANS, GET_LAB_VIP_GOLD_PLANS, REMOVE_VIP_COUPONS, SELECT_LAB_PAYMENT_TYPE, SELECT_OPD_PAYMENT_TYPE, REMOVE_ADD_MEMBER_FORM, DIGIT_PLAN_LIST, SELECT_DIGIT_PLAN, DIGIT_SELF_DETAILS, SAVE_CURRENT_DIGIT_MEMBERS, DIGIT_INSURANCE_DATA
 } from '../../constants/types';
import { API_GET,API_POST } from '../../api/api.js';

export const getVipList = (is_endorsement,data,callback) => (dispatch) => { // to get vip plan list
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
        if(!data.fromWhere){
            dispatch({
                type: GET_VIP_LIST,
                payload: response,
                is_vip_gold: is_vip_gold
            })
        }
        if(callback) callback(response)
    }).catch(function (error) {
        if(!data.fromWhere){
            dispatch({
                type: GET_VIP_LIST,
                payload: error,
                is_vip_gold: is_vip_gold
            })
        }
        if(callback) callback(error)
        throw error
    })

}

export const selectVipClubPlan = (type, selected_vip_plan,callback) => (dispatch) => { // toggle/select vip plan
    dispatch({
        type: SELECT_VIP_CLUB_PLAN,
        payload: {
            type, selected_vip_plan
        }
    })
    if(callback) callback(selected_vip_plan)
}

export const userDetails = (type, vipClubMemberDetails, forceAdd = false, previousProfile='') => (dispatch) => { // to save user form details in store
    dispatch({
        type: USER_SELF_DETAILS,
        payload: {
            type, forceAdd
        },
        vipClubMemberDetails:[vipClubMemberDetails],
        previousProfile: previousProfile
    })

}
export const saveCurrentSelectedVipMembers = (membersId,callback) => (dispatch) => { // save current visible form member or selected user profile id
    dispatch({
        type: SAVE_CURRENT_VIP_MEMBERS,
        payload: membersId
    })
    if(callback) callback(true) 
}

export const selectVipUserProfile = (newProfileid,member_id,newProfile,param_id) => (dispatch) => { // select profile from option
    dispatch({
        type: SELECT_VIP_USER_PROFILE,
        payload: {
            newProfileid,member_id,newProfile,param_id
        },
    })

}

export const vipClubPay = (criteria,callback) => (dispatch) => { // to request for payment
    return API_POST('/api/v1/plus/create',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const addVipMembersData = (criteria,callback) => (dispatch) => { // to add member details
    return API_POST('/api/v1/plus/add/members',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const generateVipClubLead = (data,/*selectedPlan, number,lead_data,selectedLocation,user_name,extraParams={}*/ cb) => (dispatch) => { // to create vip or gold member lead for matrix
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
    let plan={}
        plan.plan_id= data.selectedPlan
        plan.phone_number=''
        plan.name = data.user_name
        plan.source=''
        if(data.lead_data && data.lead_data.source){
            plan.source = data.lead_data.source
        }
        if(data.number == '' && data.lead_data &&  data.lead_data.phone_number){
            plan.phone_number = data.lead_data.phone_number
        }else{
            plan.phone_number = data.number
        }
        plan.lead_data = data.lead_data
        plan.lead_source = data.lead_data.lead_source
        if(latitude != lat && longitude != long){
            plan.latitude = latitude
            plan.longitude = longitude
        }
    if(data.extraParams && data.extraParams.city_id) {
        plan.city_id = data.extraParams.city_id
    }
    if(data.extraParams && Object.keys(data.extraParams).length){
        plan.lead_data = {...data.lead_data, ...data.extraParams}
    }
    return API_POST(`/api/v1/plus/lead/create`, plan).then(function (response) {
        if(data.cb) data.cb(response)
    }).catch(function (error) {
       if(data.cb) cb(error)
    })
}

export const getVipDashboardList = (user_id,is_dashboard,callback) => (dispatch) => { // to retrive vip or gold dashboard data

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
                payload: null
            })
        if(callback) callback(error)
        throw error
    })

}

export const resetVipData = () =>(dispatch) =>{ // to set vip or gold sotre to initial state
    dispatch({
        type: RESET_VIP_CLUB
    })
}


export const uploadVipProof = (profileData, memberId,imgType,cb) => (dispatch) => { // store selected proof to database
    API_POST(`/api/v1/common/upload/document-proof?type=${imgType}`,profileData).then(function (response) {
        if (cb) cb(response,null);
    }).catch(function (error) {
        if (cb) cb(error, null);
    })
}

export const storeVipMemberProofs = (imgUrl,cb) => (dispatch) => { // to store member proof ids to the user store
    dispatch({
        type:SAVE_VIP_MEMBER_PROOFS,
        payload:imgUrl
    })
}

export const removeVipMemberProof = (criteria) => (dispatch) => { // to remove cancelled uploaded image
    dispatch({
        type:DELETE_VIP_MEMBER_PROOF,
        payload:criteria
    })
}

export const pushMembersData = (criteria, callback) => (dispatch) =>{ // to save proposer/self data to the dummy table in case of agent or proposer self
    let url  = `/api/v1/plus/push_dummy_data`

    if(criteria && criteria.is_single_flow_opd) {
        url+=`?is_single_flow_opd=${true}`
    }

    if(criteria && criteria.is_single_flow_lab) {
        url+=`?is_single_flow_lab=${true}`
    }

    if(criteria && criteria.dummy_data_type){
        url+=`?dummy_data_type=${criteria.dummy_data_type}`
    }
    return API_POST(url, criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })
}

export const retrieveMembersData = (type,extraParams={},callback) => (dispatch) =>{ // to retrieve already pushed member data in case of agent or proposer it self
    let url = `api/v1/plus/show_dummy_data?dummy_data_type=${type}`
    if(extraParams && extraParams.dummy_id) {
        url+=`&dummy_id=${extraParams.dummy_id}`
    }
    API_GET(url).then(function (response) {
        dispatch({
            type:SHOW_VIP_MEMBERS_FORM,
            payload:response,
            extraParams: extraParams
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

export const clearVipSelectedPlan = () =>(dispatch) =>{  // reset vip or gold selected plan to initial state
    dispatch({
        type: CLEAR_VIP_SELECTED_PLAN
    })
}
export const clearVipMemeberData = () =>(dispatch) =>{  // reset vip or gold store to initial state
    dispatch({
        type: CLEAR_VIP_MEMBER_DATA
    })
}

export const getOpdVipGoldPlans = (extraParams ={}, cb) =>(dispatch) => { // to get gold/vip plans specific to particular doctor/hospital

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
            defaultSelectedPlan = response.vip_plans && response.vip_plans.filter(x=>x.default_single_booking);
        }  
        dispatch({
            type: SELECT_VIP_CLUB_PLAN,
            payload: {
                selected_vip_plan: defaultSelectedPlan && defaultSelectedPlan.length?defaultSelectedPlan[0]:[],
            }
        })

        if(extraParams && extraParams.payment_type==6){
           dispatch({
                type: SELECT_OPD_PAYMENT_TYPE,
                payload: extraParams.payment_type
            }) 
        }
    })
}

export const getLabVipGoldPlans = (extraParams ={}, cb) =>(dispatch) => { // to get gold/vip plans specific to particular lab

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
            defaultSelectedPlan = response.vip_plans && response.vip_plans.filter(x=>x.default_single_booking);
        }  
        dispatch({
            type: SELECT_VIP_CLUB_PLAN,
            payload: {
                selected_vip_plan: defaultSelectedPlan && defaultSelectedPlan.length?defaultSelectedPlan[0]:[],
            }
        })
        if(extraParams && extraParams.payment_type==6){
            dispatch({
                type: SELECT_LAB_PAYMENT_TYPE,
                payload: extraParams.payment_type
             })
        }
    })
}

export const applyCouponDiscount = ({productId,couponCode,couponId,plan_id,deal_price,cb})  => (dispatch) => { // get coupon discount
    API_POST(`/api/v1/coupon/discount`, {
        coupon_code: [couponCode],
        deal_price: deal_price,
        product_id: productId,
        plan:plan_id
    }).then(function (response) {
        if (cb) cb(response)
    }).catch(function (error) {
        if (cb) cb(null)
    })
}

export const removeVipCoupons =() =>(dispatch)=>{ // to reset coupons to intial state
    dispatch({
        type:REMOVE_VIP_COUPONS
    })
}

export const removeMembers =(data) =>(dispatch)=>{
    dispatch({
        type: REMOVE_ADD_MEMBER_FORM,
        payload:data
    })
}

export const retrieveDigitPlanData = (type,callback) => (dispatch) =>{ // to retrieve digit insurance plans
    let url = `/api/v1/covid_insurance/plans`
  
    API_GET(url).then(function (response) {
        dispatch({
            type:DIGIT_PLAN_LIST,
            payload:response,
        })
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(null)
    })
}

export const selectDigitPlan = (selected_vip_plan,callback) => (dispatch) => { // toggle/select vip plan
    dispatch({
        type: SELECT_DIGIT_PLAN,
        payload: {
            selected_vip_plan
        }
    })
    if(callback) callback(selected_vip_plan)
}
export const saveUserDetails = (type, digit_self_details, forceAdd = false, previousProfile='') => (dispatch) => { // to save user form details in store
    console.log(digit_self_details)
    dispatch({
        type: DIGIT_SELF_DETAILS,
        payload: {
            type, forceAdd
        },
        digit_self_details:[digit_self_details],
        previousProfile: previousProfile
    })

}

export const saveCurrentSelectedDigitMembers = (membersId,callback) => (dispatch) => { // save current visible form member or selected user profile id
    dispatch({
        type: SAVE_CURRENT_DIGIT_MEMBERS,
        payload: membersId
    })
    if(callback) callback(true) 
}

export const digitPay = (criteria,callback) => (dispatch) => { // to request for payment for Digit Insurance
    console.log(criteria)
    return API_POST('/api/v1/covid_insurance/create_order',criteria).then(function (response) {
        if(callback) callback(response);
    }).catch(function (error) {
        if(callback) callback(error);
        throw error
    })

}

export const retrieveDigitInsuranceData = (dataParams, cb) => (dispatch) =>{ // to retrieve digit insurance data by ID
    let url = '';
    if(dataParams && dataParams.id) {
        url = `/api/v1/covid_insurance/retrieve/`+dataParams.id
    }
    return API_GET(url).then((data)=> {
        if(cb)cb(null, data)
    }).catch((e)=>{
         if(cb)cb(e, null)
    })
}

export const retrieveUserDigitInsuranceData = (cb) => (dispatch) =>{ // to retrieve digit insurance data by USER
    let url = '/api/v1/covid_insurance/user_retrieve'
    return API_GET(url).then((data)=> {
        if(cb)cb(null, data)
    }).catch((e)=>{
         if(cb)cb(e, null)
    })
}