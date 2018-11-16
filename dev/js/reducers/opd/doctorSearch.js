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
                ...state,
                selectedDoctorProcedure: JSON.parse(JSON.stringify(state.selectedDoctorProcedure))
            }
            let hospitals = action.payload.hospitals.length?action.payload.hospitals:[]
            //newState.selectedDoctorProcedure = hospitals
            let data = {

            }
            newState.selectedDoctorProcedure = {}
            newState.selectedDoctorProcedure[action.doctorId] = {}
                       hospitals.map((hospital) => {

                if(hospital.procedure_categories.length>0){
                    //newState.selectedDoctorProcedure[action.doctorId] = Object.assign({}, newState.selectedDoctorProcedure[action.doctorId] ,hospital.hospital_id )
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id] = {'categories':{}, 'moreProcedures': 0, 'price': {}}
                }
                let deal_price = 0
                let mrp = 0
                let unselectedCount = 0
                let selectedProcedureIds = []
                hospital.procedure_categories.map((procedure) => {
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].categories[procedure.procedure_category_id] = []
                    data['category_name'] = procedure.name
                    data['category_id'] = procedure.procedure_category_id
                    procedure.procedures.map((pids) => {
                        data['agreed_price'] = pids.agreed_price
                        data['deal_price'] = pids.deal_price
                        data['mrp'] = pids.mrp

                        data['procedure_id'] = pids.procedure.id
                        data['duration'] = pids.procedure.duration
                        data['procedure_name'] = pids.procedure.name
                        if(pids.is_selected || action.commonProcedurers.indexOf(pids.procedure.id)!=-1){

                            data['is_selected'] = true
                            selectedProcedureIds.push(pids.procedure.id)
                            deal_price = deal_price + pids.deal_price
                            mrp = mrp + pids.mrp
                        }else{

                            data['is_selected'] = false
                            unselectedCount++
                        }

                        newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].categories[procedure.procedure_category_id].push({...data})     
                    })
                    let price = {
                        deal_price: deal_price,
                        mrp: mrp
                    }
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].price = price
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].moreProcedures = unselectedCount
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
            console.log(Object.values(newState.selectedDoctorProcedure[action.doctor_id]));
            try{

                Object.values(newState.selectedDoctorProcedure[action.doctor_id]).map((hospital, i) => {

                Object.values(hospital.categories).map((category, j) => {

                        let deal_price = newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].price.deal_price
                        let mrp = newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].price.mrp 

                    if(category){
                        category.map((procedure, k) => {

                            if(action.procedure.procedure_id == procedure.procedure_id){
                                let found = newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].categories[procedure.category_id][k].is_selected
                                if(found){
                                    deal_price = deal_price - newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].categories[procedure.category_id][k].deal_price
                                    mrp = mrp - newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].categories[procedure.category_id][k].mrp
                                }else{
                                    deal_price = deal_price + newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].categories[procedure.category_id][k].deal_price
                                    mrp = mrp + newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].categories[procedure.category_id][k].mrp
                                }
                                newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].categories[procedure.category_id][k].is_selected = !found
                                let price = {
                                    deal_price: deal_price,
                                    mrp: mrp
                                }
                                newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].price = price
                            }


                        })
                    }                    

                    })

                })    
            }
            catch(e){
                console.log(e)
            }
            /*
                newState.selectedDoctorProcedure[action.doctor_id][action.hospital_id].procedures.map((procedure, i) => {
                    
                    
                }) 
            })*/
            return newState

        }

    }

    return state
}