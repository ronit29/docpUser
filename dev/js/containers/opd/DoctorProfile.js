import React from 'react';
import { connect } from 'react-redux';

import { getDoctorNumber, getDoctorByUrl, getDoctorById, selectOpdTimeSLot, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentRating, closeAppointmentPopUp, getFooterData, mergeOPDState, toggleProfileProcedures, saveProfileProcedures } from '../../actions/index.js'

import DoctorProfileView from '../../components/opd/doctorProfile/index.js'
const queryString = require('query-string');


class DoctorProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id || null,
            is_procedure: false,
            hospital_id: ''
        }
    }

    static loadData(store, match,queryData={}) {
        if (match.params.id) {
            return store.dispatch(getDoctorById(match.params.id,queryData.hospital_id || '',queryData.procedure_ids || [], queryData.category_ids ||[]))
        } else {
            let url = match.url
            if (url) {
                url = url.split("/")[1]
            }
            return new Promise((resolve, reject) => {
                store.dispatch(getDoctorByUrl(url, queryData.hospital_id ||'', queryData.procedure_ids || [], queryData.category_ids ||[] , (doctor_id, url) => {
                    if (doctor_id) {
                        if (match.url.includes('-dpp')) {
                            getFooterData(match.url.split("/")[1])().then((footerData) => {
                                footerData = footerData || null
                                resolve({ doctor_id, footerData })
                            }).catch((e) => {
                                resolve({ doctor_id })
                            })
                        } else {
                            resolve({ doctor_id })
                        }
                    } else {
                        reject({
                            url: url
                        })
                    }
                }))
            })
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(window.location.search)
        let hospital_id = ''
        let is_procedure = false
        let category_ids = []
        let procedure_ids = []
        
        if (parsed) {
            hospital_id = parsed.hospital_id || ''
            is_procedure = parsed.is_procedure || false
            category_ids = parsed.category_ids || []
            procedure_ids = parsed.procedure_ids || []
        }

        if (this.props.match.params.id) {
            this.props.getDoctorById(this.props.match.params.id, hospital_id, procedure_ids, category_ids)
            this.setState({ hospital_id: hospital_id, is_procedure: is_procedure })
        } else {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getDoctorByUrl(url, hospital_id, procedure_ids, category_ids, (doctor_id) => {
                if (doctor_id) {
                    this.setState({ selectedDoctor: doctor_id, hospital_id: hospital_id, is_procedure: is_procedure })
                }
            })
        }

        //always clear selected time at doctor profile
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)
    }

    componentWillReceiveProps(props) {
        if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
            if (window) {
                window.scrollTo(0, 0)
            }
        }
    }

    render() {

        return (
            <DoctorProfileView {...this.props} selectedDoctor={this.state.selectedDoctor} {...this.state}/>
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    let DOCTORS = state.DOCTOR_PROFILES
    let { rated_appoinments, profiles, selectedProfile } = state.USER

    const {
        selectedCriterias,
        fetchNewResults,
        commonProcedurers
    } = state.SEARCH_CRITERIA_OPD

    const {
        selectedDoctorProcedure,
        profileCommonProcedures
    } = state.DOCTOR_SEARCH

    return {
        DOCTORS, initialServerData, rated_appoinments, profiles, selectedProfile, selectedCriterias, fetchNewResults, commonProcedurers, selectedDoctorProcedure, profileCommonProcedures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorByUrl: (doctr_url, hospitalId, procedure_ids, category_ids, cb) => dispatch(getDoctorByUrl(doctr_url, hospitalId, procedure_ids, category_ids, cb)),
        getDoctorById: (doctorId, hospitalId, procedure_ids, category_ids) => dispatch(getDoctorById(doctorId, hospitalId, procedure_ids, category_ids)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        getDoctorNumber: (doctorId, hospital_id, callback) => dispatch(getDoctorNumber(doctorId, hospital_id, callback)),
        closeAppointmentRating: (doctorId, callback) => dispatch(closeAppointmentRating(doctorId, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        toggleProfileProcedures: (procedure_to_toggle, doctor_id, hospital_id) => dispatch(toggleProfileProcedures(procedure_to_toggle, doctor_id, hospital_id)),
        saveProfileProcedures: (doctor_id, clinic_id) => dispatch(saveProfileProcedures(doctor_id, clinic_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
