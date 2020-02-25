import { SET_SERVER_RENDER_OPD, SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH, DOCTOR_SEARCH_START, ADD_OPD_COUPONS, REMOVE_OPD_COUPONS, APPLY_OPD_COUPONS, RESET_OPD_COUPONS, SET_PROCEDURES, TOGGLE_PROFILE_PROCEDURES, SAVE_PROFILE_PROCEDURES, HOSPITAL_SEARCH, TOGGLE_404, SELECT_OPD_PAYMENT_TYPE, START_FETCHING_OPD_TIME, END_FETCHING_OPD_TIME, CLEAR_OPD_COUPONS, SET_FOOTER_DATA } from '../../constants/types';

const defaultState = {
    doctorList: [],
    hospitalList: [],
    count: 0,
    ratings: null,
    reviews: null,
    ratings_title: '',
    bottom_content: '',
    LOADED_DOCTOR_SEARCH: false,
    selectedSlot: { time: {} },
    rescheduleSlot: { time: {} },
    appointmentId: null,
    SET_FROM_SERVER: false,
    doctorCoupons: {},
    disCountedOpdPrice: 0,
    search_content: '',
    selectedDoctorProcedure: {},
    profileCommonProcedures: [],
    commonProfileSelectedProcedures: [],
    couponAutoApply: true,
    curr_page: null,
    breadcrumb: [],
    seoData: {},
    show404: false,
    payment_type: 6,
    canonical_url: null,
    hospitalData: null,
    selectedDateFormat: null,
    TIMESLOT_DATA_LOADING: false,
    similar_specializations:null,
    static_footer_data: null
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case TOGGLE_404: {
            let newState = { ...state }
            newState.show404 = false
            return newState
        }

        case DOCTOR_SEARCH_START: {
            let newState = { ...state }
            /*if(newState.doctorList.length){
                
            }else{
                
            }*/
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
                newState.count = action.payload.count
            } else {
                let dedupe = {}
                newState.doctorList = newState.doctorList
                    .concat(action.payload.result.map(doc => doc.id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            newState.search_content = action.payload.search_content || ''

            if (action.payload.page === 1 || (newState.count == 0 && action.payload.count)) {
                newState.count = action.payload.count
            }

            newState.reviews = action.payload.reviews
            newState.ratings = action.payload.ratings
            newState.ratings_title = action.payload.ratings_title
            newState.bottom_content = action.payload.bottom_content
            newState.LOADED_DOCTOR_SEARCH = true
            newState.curr_page = action.payload.page
            newState.breadcrumb = action.payload.breadcrumb
            newState.seoData = action.payload.seo
            newState.show404 = action.payload.show404 || false
            newState.canonical_url = action.payload.canonical_url||null
            newState.hospitalData = action.payload.hospital || null
            newState.similar_specializations = action.payload.similar_specializations || null
            return newState
        }

        case HOSPITAL_SEARCH: {
            let newState = {
                ...state,
                hospitalList: [].concat(state.hospitalList)
            }

            if (action.payload.page === 1) {
                newState.hospitalList = action.payload.result.map(hospital => hospital.hospital_id)
            } else {
                let dedupe = {}
                newState.hospitalList = newState.hospitalList
                    .concat(action.payload.result.map(hospital => hospital.hospital_id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            if (action.payload.page === 1 || (newState.count == 0 && action.payload.count)) {
                newState.count = action.payload.count
            }

            newState.search_content = action.payload.search_content || ''
            newState.LOADED_DOCTOR_SEARCH = true
            newState.reviews = action.payload.reviews
            newState.ratings = action.payload.ratings
            newState.ratings_title = action.payload.ratings_title
            newState.bottom_content = action.payload.bottom_content
            newState.curr_page = action.payload.page
            newState.show404 = action.payload.show404 || false
            newState.canonical_url = action.payload.canonical_url || null

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

            newState.selectedDateFormat = action.payload.extraDateParams

            return newState
        }

        case SELECT_OPD_PAYMENT_TYPE: {
            let newState = {
                ...state
            }

            newState.payment_type = action.payload

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
                doctorCoupons: { ...state.doctorCoupons }
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
                doctorCoupons: { ...state.doctorCoupons }
            }

            if (action.couponId) {
                newState.doctorCoupons[action.hospitalId] = newState.doctorCoupons[action.hospitalId].filter((coupon) => { coupon.coupon_id != action.couponId })
            }
            newState.disCountedOpdPrice = 0
            newState.couponAutoApply = false
            return newState

        }

        case APPLY_OPD_COUPONS: {
            let newState = {
                ...state
            }

            if (action.payload.status == 1) {
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

            //            newState.profileCommonProcedures = action.commonProcedurers
            /* let commonProcedurers = action.commonProcedurers.split(',')
             let commonSelectedProcedures = []
             commonProcedurers.map((x) => {
                 commonSelectedProcedures.push(parseInt(x))
             })*/
            let hospitals = action.payload.hospitals.length ? action.payload.hospitals : []
            let is_procedure = false

            let data = {}

            newState.selectedDoctorProcedure = {}
            newState.selectedDoctorProcedure[action.doctorId] = {}
            hospitals.map((hospital) => {

                if (hospital.procedure_categories.length > 0) {
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id] = { 'categories': {}, 'selectedProcedures': 0, 'unselectedProcedures': 0, 'price': {}, 'categories_name': [] }
                }
                let deal_price = 0
                let mrp = 0
                let unselectedCount = 0
                let selectedCount = 0
                let selectedProcedureIds = []
                let categories_name = []
                hospital.procedure_categories.map((procedure) => {
                    is_procedure = true
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].categories[procedure.procedure_category_id] = []
                    data['category_name'] = procedure.name
                    categories_name.push(procedure.name)
                    data['category_id'] = procedure.procedure_category_id
                    procedure.procedures.map((pids) => {
                        data['agreed_price'] = pids.agreed_price
                        data['deal_price'] = pids.deal_price
                        data['mrp'] = pids.mrp

                        data['procedure_id'] = pids.procedure.id
                        data['duration'] = pids.procedure.duration
                        data['procedure_name'] = pids.procedure.name
                        data['hospital_id'] = hospital.hospital_id
                        if (pids.is_selected) {

                            data['is_selected'] = true
                            selectedProcedureIds.push(pids.procedure.id)
                            deal_price = deal_price + pids.deal_price
                            mrp = mrp + pids.mrp
                            selectedCount++
                        } else {

                            data['is_selected'] = false
                            unselectedCount++
                        }

                        newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].categories[procedure.procedure_category_id].push({ ...data })
                    })
                    let price = {
                        deal_price: deal_price,
                        mrp: mrp
                    }
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].price = price
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].selectedProcedures = selectedCount
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].unselectedProcedures = unselectedCount
                    newState.selectedDoctorProcedure[action.doctorId][hospital.hospital_id].categories_name = categories_name
                })
            })

            if (!is_procedure) {
                newState.selectedDoctorProcedure = {}
                //newState.profileCommonProcedures = []
            }

            return newState
        }

        case TOGGLE_PROFILE_PROCEDURES: {
            let newState = {
                ...state,
                selectedDoctorProcedure: JSON.parse(JSON.stringify(state.selectedDoctorProcedure))
            }

            try {

                Object.entries(newState.selectedDoctorProcedure[action.doctor_id]).map((hospital, i) => {
                    let deal_price = 0
                    let mrp = 0
                    let unselectedCount = 0
                    let selectedCount = 0

                    Object.values(hospital[1].categories).map((category, j) => {

                        if (category) {
                            category.map((procedure, k) => {

                                if (action.procedure.indexOf(procedure.procedure_id) != -1) {
                                    deal_price = deal_price + newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].categories[procedure.category_id][k].deal_price
                                    mrp = mrp + newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].categories[procedure.category_id][k].mrp
                                    selectedCount++
                                    newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].categories[procedure.category_id][k].is_selected = true

                                } else {
                                    unselectedCount++
                                    newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].categories[procedure.category_id][k].is_selected = false

                                }
                            })
                        }

                    })


                    let price = {
                        deal_price: deal_price,
                        mrp: mrp
                    }
                    newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].price = price
                    newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].selectedProcedures = selectedCount
                    newState.selectedDoctorProcedure[action.doctor_id][hospital[0]].unselectedProcedures = unselectedCount

                })
                //newState.profileCommonProcedures = action.procedure
            }
            catch (e) {
                console.log(e)
            }

            return newState

        }

        case SAVE_PROFILE_PROCEDURES: {
            let newState = {
                ...state
            }
            let selectedProcedures = []

            if (action.forceAdd) {
                newState.commonProfileSelectedProcedures = action.selectedProcedures
                return newState
            }
            if (newState.selectedDoctorProcedure[action.doctor_id] && newState.selectedDoctorProcedure[action.doctor_id][action.clinic_id] && newState.selectedDoctorProcedure[action.doctor_id][action.clinic_id].categories) {

                Object.values(newState.selectedDoctorProcedure[action.doctor_id][action.clinic_id].categories).map((procedure) => {

                    selectedProcedures = selectedProcedures.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
                })


            }

            newState.commonProfileSelectedProcedures = selectedProcedures
            return newState
        }

        case START_FETCHING_OPD_TIME: {
            let newState = {
                ...state
            }
            newState.TIMESLOT_DATA_LOADING = true
            return newState
        }

        case END_FETCHING_OPD_TIME: {
            let newState = {
                ...state
            }
            newState.TIMESLOT_DATA_LOADING = false
            return newState
        }

        case CLEAR_OPD_COUPONS: {
            let newState = {
                ...state
            }
            newState.doctorCoupons = {}
            return newState
        }

        case SET_FOOTER_DATA: {
            let newState = {
                ...state
            }
            newState.static_footer_data = action.payload;
            return newState;
        }

    }

    return state
}