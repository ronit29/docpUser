import React from 'react';
import { connect } from 'react-redux';

import { getDoctorNumber, getDoctorByUrl, getDoctorById, selectOpdTimeSLot, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentRating, closeAppointmentPopUp, getFooterData, mergeOPDState, toggleProceduresCriteria, toggleProfileProcedures } from '../../actions/index.js'

import DoctorProfileView from '../../components/opd/doctorProfile/index.js'
const queryString = require('query-string');


class DoctorProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id || null
        }
    }

    static loadData(store, match) {
        if (match.params.id) {
            return store.dispatch(getDoctorById(match.params.id))
        } else {
            let url = match.url
            if (url) {
                url = url.split("/")[1]
            }
            return new Promise((resolve, reject) => {
                store.dispatch(getDoctorByUrl(url, hospital_id, (doctor_id, url) => {
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
        if(parsed && parsed.hospital_id){
            hospital_id = parsed.hospital_id
        }
        let category_ids = this.props.selectedCriterias.filter(x => x.type=='procedures_category').map(x => x.id)
        let procedure_ids = this.props.selectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)
         
        if(this.props.commonProcedurers.length){

            let pids = this.props.commonProcedurers.filter((x) => {
                if(procedure_ids.indexOf(x.id) == -1){
                    return true
                }
                return false
            }).map(x => x.id)


           // let pids = this.props.commonProcedurers.map(x=>x.id)
            procedure_ids =  procedure_ids.concat(pids)
        }   

        if (this.props.match.params.id) {
            this.props.getDoctorById(this.props.match.params.id, hospital_id, procedure_ids, category_ids)
            this.setState({hospital_id: hospital_id})
        } else {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getDoctorByUrl(url, hospital_id, (doctor_id) => {
                if (doctor_id) {
                    this.setState({ selectedDoctor: doctor_id , hospital_id: hospital_id})
                }
            })
        }

        //always clear selected time at doctor profile
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)
    }

    componentWillReceiveProps(props){
        if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
           // this.buildUrl(this.state.hospital_id)
            if (window) {
                window.scrollTo(0, 0)
            }
        }
    }

    buildUrl(hospital_id){

        let category_ids = this.props.selectedCriterias.filter(x => x.type=='procedures_category').map(x => x.id)
        let procedure_ids = this.props.selectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)
         
        if(this.props.commonProcedurers){

            let pids = this.props.commonProcedurers.filter((x) => {
                if(procedure_ids.indexOf(x.id) == -1){
                    return true
                }
                return false
            }).map(x => x.id)

            //let pids = this.props.commonProcedurers.map(x=>x.id)
            procedure_ids =  procedure_ids.concat(pids)
        }   

        if (this.props.match.params.id) {
            this.props.getDoctorById(this.props.match.params.id, hospital_id, procedure_ids, category_ids)
        }

    }
    render() {

        return (
            <DoctorProfileView {...this.props} selectedDoctor={this.state.selectedDoctor} />
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

    let DOCTORS = state.DOCTORS
    let { rated_appoinments, profiles, selectedProfile } = state.USER

    const {
        selectedCriterias,
        opd_procedure,
        fetchNewResults,
        commonProcedurers
    } = state.SEARCH_CRITERIA_OPD

    const {
        selectedDoctorProcedure
    } = state.DOCTOR_SEARCH

    return {
        DOCTORS, initialServerData, rated_appoinments, profiles, selectedProfile, selectedCriterias, opd_procedure, fetchNewResults, commonProcedurers, selectedDoctorProcedure
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorByUrl: (doctr_url, hospitalId, cb) => dispatch(getDoctorByUrl(doctr_url, hospitalId, cb)),
        getDoctorById: (doctorId, hospitalId, procedure_ids, category_ids) => dispatch(getDoctorById(doctorId, hospitalId, procedure_ids, category_ids)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        getDoctorNumber: (doctorId, callback) => dispatch(getDoctorNumber(doctorId, callback)),
        closeAppointmentRating: (doctorId, callback) => dispatch(closeAppointmentRating(doctorId, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
        getFooterData: (url) => dispatch(getFooterData(url)),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        toggleProceduresCriteria: (procedure, doctorId) => dispatch(toggleProceduresCriteria(procedure, doctorId)),
        toggleProfileProcedures: (procedure_to_toggle, doctor_id, hospital_id) => dispatch(toggleProfileProcedures(procedure_to_toggle, doctor_id, hospital_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
