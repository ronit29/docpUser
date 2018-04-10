import React from 'react';
import { connect } from 'react-redux';

import DoctorProfileCard from '../commons/doctorProfileCard/index.js'
import DetailsForm from './detailsForm/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="patientDetails">
                <DoctorProfileCard
                    hideBottom={true}
                />

                <div className="selectedClinic">
                    <h5>Selected Clinic</h5>
                    <span className="clinicName">Sarvodaya Clinic Sector 50, Gurgaon</span>
                    <span className="fee">Fee: Rs.300</span>
                </div>

                <div className="selectedAppointmentSlot">
                    <h5>Selected Appointment Slot</h5>
                    <span className="appdate">Appointment Date</span>
                    <span className="date">Wednesday, 28 December, 2018 at 11:00 AM</span>
                </div>
            
                <DetailsForm/>

                <button className="proceedbtn">Confirm Booking</button>
                
            </div>
        );
    }
}


export default PatientDetails
