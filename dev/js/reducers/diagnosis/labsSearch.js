
import { SET_SERVER_RENDER_LAB, SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, LAB_SEARCH, ADD_LAB_COUPONS , REMOVE_LAB_COUPONS, APPLY_LAB_COUPONS, RESET_LAB_COUPONS} from '../../constants/types';

const defaultState = {
    labList: [],
    count: 0,
    LOADED_LABS_SEARCH: false,
    selectedSlot: { time: {} },
    rescheduleSlot: { time: {} },
    selectedAppointmentType: 'lab',
    selectedAddress: null,
    SET_FROM_SERVER: false,
    labCoupons: {},
    disCountedLabPrice: 0
}

export default function (state = defaultState, action) {

    switch (action.type) {

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
                newState.labList = action.payload.result.map(lab => lab.lab.id)
            } else {
                let dedupe = {}
                newState.labList = newState.labList
                    .concat(action.payload.result.map(lab => lab.lab.id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            newState.count = action.payload.count
            newState.LOADED_LABS_SEARCH = true

            return newState
        }

        case SELECT_LAB_TIME_SLOT: {
            let newState = {
                ...state,
                selectedSlot: { ...state.selectedSlot },
                rescheduleSlot: { ...state.rescheduleSlot }
            }

            if (action.payload.reschedule) {
                newState.rescheduleSlot = { ...action.payload.slot }
            }
            newState.selectedSlot = { ...action.payload.slot }


            return newState
        }

        case SELECR_APPOINTMENT_TYPE_LAB: {
            let newState = { ...state }
            newState.selectedAppointmentType = action.payload
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
                labCoupons : { ...state.labCoupons }
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
                labCoupons : { ...state.labCoupons }
            }

            newState.labCoupons[action.labId] = newState.labCoupons[action.labId].filter((coupon) => { coupon.coupon_id != action.couponId })
            newState.disCountedLabPrice = 0
            return newState
        }

        case APPLY_LAB_COUPONS: {
            let newState = {
                ...state
            }
            if(action.payload.status == 1){
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

    }

    return state
}