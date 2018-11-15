import { SET_SERVER_RENDER_OPD, SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH, DOCTOR_SEARCH_START, ADD_OPD_COUPONS, REMOVE_OPD_COUPONS, APPLY_OPD_COUPONS , RESET_OPD_COUPONS, SET_PROCEDURES, TOGGLE_PROFILE_PROCEDURES} from '../../constants/types';

const defaultState = {
    doctorList: [],
    count: 0,
    LOADED_DOCTOR_SEARCH: false,
    selectedSlot: { time: {} },
    rescheduleSlot: { time: {} },
    appointmentId: null,
    SET_FROM_SERVER: false,
    doctorCoupons: {},
    disCountedOpdPrice: 0,
    search_content: '',
    selectedDoctorProcedure: {}
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
            newState.search_content = action.payload.search_content || ''
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
/*
            if(state.doctorCoupons[action.hospitalId]){
                newState.doctorCoupons[action.hospitalId] = [].concat(state.doctorCoupons[action.hospitalId])
            } else {
                newState.doctorCoupons[action.hospitalId] = []
            }*/
            newState.doctorCoupons[action.hospitalId] = []
            newState.doctorCoupons[action.hospitalId].push(action.payload)
            
            return newState
        }

        case REMOVE_OPD_COUPONS: {

            let newState = {
                ...state,
                doctorCoupons : { ...state.doctorCoupons }
            }

            if(action.couponId){
                newState.doctorCoupons[action.hospitalId] = newState.doctorCoupons[action.hospitalId].filter((coupon) => { coupon.coupon_id != action.couponId })  
            }
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

        case RESET_OPD_COUPONS: {
            let newState = {
                ...state
            }
            newState.disCountedOpdPrice = 0

            return newState
        }
 
        case SET_PROCEDURES: {
            let newState = {
                ...state
            }
            let hospitals = action.payload.hospitals.length?action.payload.hospitals:[]
            //newState.selectedDoctorProcedure = hospitals
            let data = {

            }
            newState.selectedDoctorProcedure = {...action.doctorId}
                       hospitals.map((hospital) => {

                if(hospital.procedure_categories.length>0){
                    newState.selectedDoctorProcedure[action.doctorId] = {...hospital.hospital_id}
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id] =  []
                }
                hospital.procedure_categories.map((procedure) => {
                    data['category_name'] = procedure.name
                    
                    procedure.procedures.map((pids) => {
                        data['agreed_price'] = pids.agreed_price
                        data['deal_price'] = pids.deal_price
                        data['is_selected'] = pids.is_selected
                        data['mrp'] = pids.mrp

                        data['procedure_id'] = pids.procedure.id
                        data['duration'] = pids.procedure.duration
                        data['procedure_name'] = pids.procedure.name
                        newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].push({...data})     
                    })
                })
            })
            return newState
        }

        case TOGGLE_PROFILE_PROCEDURES: {
            let newState = {
                ...state,
                selectedDoctorProcedure: JSON.parse(JSON.stringify(state.selectedDoctorProcedure)) 
            }
            //procedure, doctor_id, hospital_id

            newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].map((procedure, i) => {
                if(action.procedure.procedure_id == procedure.procedure_id){
                    let found = newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id][i].is_selected
                    newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id][i].is_selected = !found
                }
                
            }) 
            return newState

        }

    }

    return state
}