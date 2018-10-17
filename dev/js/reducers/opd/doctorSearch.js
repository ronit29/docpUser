import { SET_SERVER_RENDER_OPD, SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH, DOCTOR_SEARCH_START, ADD_OPD_COUPONS, REMOVE_OPD_COUPONS, APPLY_OPD_COUPONS } from '../../constants/types';

const defaultState = {
    doctorList: [],
    count: 0,
    LOADED_DOCTOR_SEARCH: false,
    selectedSlot: { time: {} },
    rescheduleSlot: { time: {} },
    appointmentId: null,
    SET_FROM_SERVER: false,
    doctorCoupons: {},
    disCountedOpdPrice: 0
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case DOCTOR_SEARCH_START: {
            let newState = { ...state }

            newState.LOADED_DOCTOR_SEARCH = false

            return newState
        }

        case DOCTOR_SEARCH: {
            let newState = {
                ...state,
                doctorList: [].concat(state.doctorList)
            }

            if (action.payload.page === 1) {
                newState.doctorList = action.payload.result.map(doc => doc.id)
            } else {
                let dedupe = {}
                newState.doctorList = newState.doctorList
                    .concat(action.payload.result.map(doc => doc.id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            newState.count = action.payload.count
            newState.LOADED_DOCTOR_SEARCH = true

            return newState
        }

        case SELECT_OPD_TIME_SLOT: {
            let newState = {
                ...state,
                selectedSlot: { ...state.selectedSlot },
                rescheduleSlot: { ...state.rescheduleSlot }
            }

            if (action.payload.reschedule) {
                newState.rescheduleSlot = { ...action.payload.slot }
                newState.appointmentId = action.payload.appointmentId
            }

            newState.selectedSlot = { ...action.payload.slot }

            return newState
        }

        case SET_SERVER_RENDER_OPD: {
            let newState = { ...state }
            newState.SET_FROM_SERVER = action.payload
            return newState
        }

        case ADD_OPD_COUPONS: {

            let newState = {
                ...state,
                doctorCoupons : { ...state.doctorCoupons }
            }

            if(state.doctorCoupons[action.hospitalId]){
                newState.doctorCoupons[action.hospitalId] = [].concat(state.doctorCoupons[action.hospitalId])
            } else {
                newState.doctorCoupons[action.hospitalId] = []
            }

            newState.doctorCoupons[action.hospitalId].push(action.payload)
            
            return newState
        }

        case REMOVE_OPD_COUPONS: {

            let newState = {
                ...state,
                doctorCoupons : { ...state.doctorCoupons }
            }

            newState.doctorCoupons[action.hospitalId] = newState.doctorCoupons[action.hospitalId].filter((coupon) => { coupon.coupon_id != action.couponId })
            newState.disCountedOpdPrice = 0
            return newState

        }

        case APPLY_OPD_COUPONS: {
            let newState = {
                ...state
            }

            if(action.payload.status == 1){
                newState.disCountedOpdPrice = parseInt(action.payload.discount)
            }
            
            return newState
        }

    }

    return state
}