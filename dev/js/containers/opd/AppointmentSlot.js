import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getTimeSlots, selectOpdTimeSLot,OTTLogin } from '../../actions/index.js'

import AppointmentSlotView from '../../components/opd/appointmentSlot/index.js'

import SnackBar from 'node-snackbar'
import Loader from '../../components/commons/Loader'
const queryString = require('query-string');
import STORAGE from '../../helpers/storage'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            isLoggedIn: false, 
            isCompleted: false,
            hasComplete: parsed.complete || false
        }
    }

    static loadData(store, match) {
        return store.dispatch(getDoctorById(match.params.id, match.params.clinicId))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        let OTT = parsed.token
        
        if(OTT){
            if (STORAGE.checkAuth()) {
                this.setToken(this.props)
            }else{
                this.setToken(this.props)  
            }
        }else{
            if (STORAGE.checkAuth()) {
                this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, this.props.commonProfileSelectedProcedures)
                this.setState({isLoggedIn: true})
            }else{
                this.props.history.push('/')
            }
        }
    }

    setToken(props) {
        const parsed = queryString.parse(props.location.search)
        let OTT = parsed.token

        if (OTT) {
            props.OTTLogin(OTT).then(() => {
                this.setState({isLoggedIn: true})
                this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, this.props.commonProfileSelectedProcedures)
            }).catch(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Token Expired." });
                props.history.push('/')
            })
        } 
    }
    
    render() {

        return (
            <div>
                {this.state.isLoggedIn? <AppointmentSlotView {...this.props} />:<Loader />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES

    let { selectedSlot, rescheduleSlot, selectedDoctorProcedure, commonProfileSelectedProcedures } = state.DOCTOR_SEARCH

    let { commonProcedurers } = state.SEARCH_CRITERIA_OPD
    return {
        DOCTORS, selectedSlot, rescheduleSlot, commonProcedurers, selectedDoctorProcedure, commonProfileSelectedProcedures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById: (doctorId, clinicId, procedure_ids, category_ids) => dispatch(getDoctorById(doctorId, clinicId, procedure_ids, category_ids)),
        getTimeSlots: (doctorId, clinicId, callback) => dispatch(getTimeSlots(doctorId, clinicId, callback)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        OTTLogin: (ott) => dispatch(OTTLogin(ott)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
