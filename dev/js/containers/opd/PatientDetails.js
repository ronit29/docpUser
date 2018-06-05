import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getUserProfile, createOPDAppointment } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import PatientDetailsView from '../../components/opd/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=${this.props.location.pathname}`)
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
            this.props.getDoctorById(this.props.match.params.id)
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

    let DOCTORS = state.DOCTORS
    const { selectedProfile, profiles } = state.USER
    let { selectedSlot } = state.DOCTOR_SEARCH

    return {
        selectedProfile, profiles, DOCTORS, selectedSlot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        getDoctorById: (doctorId) => dispatch(getDoctorById(doctorId)),
        createOPDAppointment: (postData, callback) => dispatch(createOPDAppointment(postData, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
