
import { TOGGLE_404, SET_SERVER_RENDER_LAB, SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, LAB_SEARCH, ADD_LAB_COUPONS, REMOVE_LAB_COUPONS, APPLY_LAB_COUPONS, RESET_LAB_COUPONS, SEARCH_HEALTH_PACKAGES, SAVE_PRESCRIPTION, DELETE_PRESCRIPTION,  CLEAR_PRESCRIPTION, SAVE_IS_PRESCRIPTION_NEED, CLEAR_LAB_COUPONS, SHOW_RETAIL_VIP_CARD_LAB_SUMMARY, SELECT_LAB_PAYMENT_TYPE } from '../../constants/types';

const defaultState = {
    labList: [],
    count: 0,
    LOADED_LABS_SEARCH: false,
    selectedSlot: { time: {} },
    rescheduleSlot: { time: {} },
    selectedAppointmentType: {
        r_pickup: 'home',
        p_pickup: 'home' 
    },
    selectedAddress: null,
    SET_FROM_SERVER: false,
    labCoupons: {},
    disCountedLabPrice: 0,  
    couponAutoApply: true,
    curr_page: null,
    packagesList: [],
    seoData: {},
    test_data: [],
    show404: false,
    user_prescriptions:[],
    is_prescription_needed:null,
    selectedDateFormat: null,
    show_vip_non_login_card: false,
    payment_type: 6
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case TOGGLE_404: {
            let newState = { ...state }
            newState.show404 = false
            return newState
        }

        case LAB_SEARCH_START: {
            let newState = { ...state }

            newState.LOADED_LABS_SEARCH = false

            return newState
        }

        case LAB_SEARCH: {
            let newState = {
                ...state,
                labList: [].concat(state.labList)
            }

            if (action.payload.page === 1) {
                newState.labList = action.payload.result.map(lab => lab.id)
            } else {
                let dedupe = {}
                newState.labList = newState.labList
                    .concat(action.payload.result.map(lab => lab.id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            if (action.payload.page === 1 || (newState.count == 0 && action.payload.count)) {
                newState.count = action.payload.count
            }

            newState.LOADED_LABS_SEARCH = true
            newState.curr_page = action.payload.page
            newState.seoData = action.payload.seo
            newState.test_data = action.payload.tests
            newState.show404 = action.payload.show404 || false
            return newState
        }

        case SELECT_LAB_TIME_SLOT: {
            let newState = {
                ...state/*,
                selectedSlot: { ...state.selectedSlot },
                rescheduleSlot: { ...state.rescheduleSlot }*/
            }

            if (action.payload.reschedule) {
                newState.rescheduleSlot = { ...action.payload.slot }
            }
            newState.selectedSlot = { ...action.payload.slot }
            newState.selectedDateFormat = action.payload.dateParams


            return newState
        }

        case SELECR_APPOINTMENT_TYPE_LAB: {
            let newState = { ...state }
            newState.selectedAppointmentType = {...action.payload}
            return newState
        }

        case SELECT_USER_ADDRESS: {
            let newState = { ...state }
            newState.selectedAddress = action.payload
            return newState
        }

        case SET_SERVER_RENDER_LAB: {
            let newState = { ...state }
            newState.SET_FROM_SERVER = action.payload
            return newState
        }

        case ADD_LAB_COUPONS: {
            let newState = {
                ...state,
                labCoupons: { ...state.labCoupons }
            }
            /*
                        if(state.labCoupons[action.labId]){
                            newState.labCoupons[action.labId] = [].concat(state.labCoupons[action.labId])
                        } else {
                            newState.labCoupons[action.labId] = []
                        }*/
            newState.labCoupons[action.labId] = []
            newState.labCoupons[action.labId].push(action.payload)

            return newState
        }

        case REMOVE_LAB_COUPONS: {
            let newState = {
                ...state,
                labCoupons: { ...state.labCoupons }
            }
            if (action.couponId) {
                newState.labCoupons[action.labId] = newState.labCoupons[action.labId].filter((coupon) => { coupon.coupon_id != action.couponId })
            }

            newState.disCountedLabPrice = 0
            newState.couponAutoApply = false
            return newState
        }

        case APPLY_LAB_COUPONS: {
            let newState = {
                ...state
            }
            if (action.payload.status == 1) {
                newState.disCountedLabPrice = parseInt(action.payload.discount)
            }

            return newState
        }

        case RESET_LAB_COUPONS: {
            let newState = {
                ...state
            }
            newState.disCountedLabPrice = 0

            return newState
        }
        case SEARCH_HEALTH_PACKAGES: {
            let newState = {
                ...state,
                packagesList: {...state.packagesList}
            }
            if(action.page == 1){
                newState.packagesList = action.payload
            }else{
                newState.packagesList.result =  newState.packagesList.result.concat(action.payload.result)        
            }
            newState.LOADED_LABS_SEARCH = true
            return newState
        }
        case SAVE_PRESCRIPTION:{
            let newState = {
                ...state,
                user_prescriptions: [].concat(state.user_prescriptions)
            }
            if(newState.user_prescriptions.length > 0){

                let found = []
                newState.user_prescriptions = newState.user_prescriptions.filter((data)=> {

                    if(data.id == action.payload.id) {
                        found.push(data)
                        return false
                    }
                    return true
                })

                if(found) {
                    let data = Object.assign({}, found[0], action.payload)    
                    newState.user_prescriptions.push(data)
                }else{
                    newState.user_prescriptions.push(action.payload)
                }
            }else{
                newState.user_prescriptions.push(action.payload)
            }
            return newState
        }
        case DELETE_PRESCRIPTION:{
            let newState = {
                ...state,
                user_prescriptions: [].concat(state.user_prescriptions)
            }
            let currentSelectedMember
            if(newState.user_prescriptions && newState.user_prescriptions.length>0){
                currentSelectedMember = newState.user_prescriptions
                let currentProofs =  currentSelectedMember[0].img_path_ids.filter(x=>x.image !== action.payload) 
                currentSelectedMember[0].img_path_ids = currentProofs
            }
            newState.user_prescriptions = currentSelectedMember
            return newState
        }
        case CLEAR_PRESCRIPTION:{
            let newState = {
                ...state
            }
            newState.user_prescriptions = []
            newState.is_prescription_needed=null
            return newState   
        }
        case SAVE_IS_PRESCRIPTION_NEED:{
            let newState = {
                ...state
            }
            newState.is_prescription_needed =action.payload.prescription_needed
            return newState
        }

        case CLEAR_LAB_COUPONS :{
            let newState = {
                ...state
            }
            newState.labCoupons = {}
            return newState
        }

        case SHOW_RETAIL_VIP_CARD_LAB_SUMMARY :{
            let newState = {
                ...state
            }
            newState.show_vip_non_login_card = action.payload
            return newState
        }

        case SELECT_LAB_PAYMENT_TYPE: {
            let newState = {
                ...state
            }
            newState.payment_type = action.payload
            return newState

        }
        
    }

    return state
}