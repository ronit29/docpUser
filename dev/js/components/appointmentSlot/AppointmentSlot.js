import React from 'react';
import { connect } from 'react-redux';

import DoctorProfileCard from '../commons/doctorProfileCard/index.js'
import TimeSlotSelector from './timeSlotSelector/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    proceed() {
        this.context.router.history.push('/doctorprofile/patientdetails')
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="appointmentSlot">
                {
                    this.props.selectedDoctor ?
                        <DoctorProfileCard
                            hideBottom={true}
                            details={this.props.DOCTORS[this.props.selectedDoctor]}
                        /> : ''
                }

                <div className="selectedClinic">
                    <h5>Selected Clinic</h5>
                    <span className="clinicName">Sarvodaya Clinic Sector 50, Gurgaon</span>
                    <span className="fee">Fee: Rs.300</span>
                </div>

                <TimeSlotSelector />


                <button className="proceedbtn" onClick={this.proceed.bind(this)}>Proceed</button>

            </div>
        );
    }
}


export default AppointmentSlot
