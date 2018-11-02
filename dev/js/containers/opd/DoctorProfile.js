import React from 'react';
import { connect } from 'react-redux';

import { getDoctorNumber, getDoctorByUrl, getDoctorById, selectOpdTimeSLot, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentRating, closeAppointmentPopUp } from '../../actions/index.js'

import DoctorProfileView from '../../components/opd/doctorProfile/index.js'

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
                store.dispatch(getDoctorByUrl(url, (doctor_id, url) => {
                    if (doctor_id) {
                        resolve(doctor_id)
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
        if (this.props.match.params.id) {
            this.props.getDoctorById(this.props.match.params.id)
        } else {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getDoctorByUrl(url, (doctor_id) => {
                if (doctor_id) {
                    this.setState({ selectedDoctor: doctor_id })
                }
            })
        }

        //always clear selected time at doctor profile
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)
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

    return {
        DOCTORS, initialServerData, rated_appoinments, profiles, selectedProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorByUrl: (doctr_url, cb) => dispatch(getDoctorByUrl(doctr_url, cb)),
        getDoctorById: (doctorId) => dispatch(getDoctorById(doctorId)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        getDoctorNumber: (doctorId, callback) => dispatch(getDoctorNumber(doctorId, callback)),
        closeAppointmentRating: (doctorId, callback) => dispatch(closeAppointmentRating(doctorId, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
