import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getUserProfile, createOPDAppointment, selectOpdTimeSLot, sendAgentBookingURL, removeCoupons, applyOpdCoupons, resetOpdCoupons, getCoupons, applyCoupons } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import PatientDetailsView from '../../components/opd/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=${this.props.location.pathname}&login=opd`)
        }
    }

    // static loadData(store, match) {
    //     return Promise.all([store.dispatch(getDoctorById(match.params.id)), store.dispatch(getUserProfile())])
    // }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            let procedure_ids = []
            if(this.props.selectedDoctorProcedure[this.props.match.params.id] && this.props.selectedDoctorProcedure[this.props.match.params.id][this.props.match.params.clinicId] && this.props.selectedDoctorProcedure[this.props.match.params.id][this.props.match.params.clinicId].categories){

                Object.values(this.props.selectedDoctorProcedure[this.props.match.params.id][this.props.match.params.clinicId].categories).map((procedure) => {

                    procedure_ids =  procedure_ids.concat(procedure.filter(x=>x.is_selected).map(x=>x.procedure_id))    
                })

            }
            this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, procedure_ids)
            this.props.getUserProfile()
        }
    }

    render() {

        return (
            <PatientDetailsView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES
    const { selectedProfile, profiles } = state.USER
    let { selectedSlot, doctorCoupons, disCountedOpdPrice, selectedDoctorProcedure } = state.DOCTOR_SEARCH

    return {
        selectedProfile, profiles, DOCTORS, selectedSlot, doctorCoupons, disCountedOpdPrice , selectedDoctorProcedure
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        getUserProfile: () => dispatch(getUserProfile()),
        getDoctorById: (doctorId, hospitalId, procedure_ids) => dispatch(getDoctorById(doctorId, hospitalId, procedure_ids)),
        createOPDAppointment: (postData, callback) => dispatch(createOPDAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb)),
        removeCoupons: (hospitalId, couponId) => dispatch(removeCoupons(hospitalId, couponId)),
        applyOpdCoupons: (productId, couponCode, couponId, hospitalId, dealPrice) => dispatch(applyOpdCoupons(productId, couponCode, couponId, hospitalId, dealPrice)),
        applyCoupons: (productId, couponCode, couponId, hospitalId) => dispatch(applyCoupons(productId, couponCode, couponId, hospitalId)),
        resetOpdCoupons: () => dispatch(resetOpdCoupons()),
        getCoupons: (productId, deal_price, cb) => dispatch(getCoupons(productId, deal_price, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
