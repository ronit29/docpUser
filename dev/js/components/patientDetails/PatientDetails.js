import React from 'react';
import { connect } from 'react-redux';

import DoctorProfileCard from '../commons/doctorProfileCard/index.js'
import DetailsForm from './detailsForm/index.js'
import SelectedClinic from '../commons/selectedClinic/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: null,
            selectedClinic: null,
            selectedSlot: null
        }
    }

    proceed(){
        this.context.router.history.push('/payment')
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    componentDidMount() {
        try {
            let doctorId = this.props.match.params.id
            let clinicId = this.props.match.params.clinicId
            let selectedSlot = this.getLocationParam('t')
            selectedSlot = new Date(parseFloat(selectedSlot))
                        
            if (doctorId && clinicId && selectedSlot) {
                this.setState({
                    selectedDoctor: doctorId,
                    selectedClinic: clinicId,
                    selectedSlot: selectedSlot.toString()
                })
                this.props.getDoctorById(doctorId)
            }
        } catch (e) {

        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="patientDetails">

                {
                    this.props.DOCTORS[this.state.selectedDoctor] ?
                        <div>
                            <DoctorProfileCard
                                hideBottom={true}
                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                            />
                            <SelectedClinic
                                selectedDoctor={this.props.DOCTORS[this.state.selectedDoctor]}
                                selectedClinic={this.state.selectedClinic}
                            />
                            <div className="selectedAppointmentSlot">
                                <h5>Selected Appointment Slot</h5>
                                <span className="appdate">Appointment Date</span>
                                <span className="date">{ this.state.selectedSlot }</span>
                            </div>
                            <DetailsForm />
                            <button className="proceedbtn" onClick={this.proceed.bind(this)}>Confirm Booking</button>
                        </div> : ""
                }

            </div>
        );
    }
}


export default PatientDetails
