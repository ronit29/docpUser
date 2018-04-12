import React from 'react';
import { connect } from 'react-redux';

import DoctorProfileCard from '../commons/doctorProfileCard/index.js'
import TimeSlotSelector from './timeSlotSelector/index.js'
import SelectedClinic from '../commons/selectedClinic/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: null,
            selectedClinic: null,
            timeSlots: null,
            selectedSlot : null
        }
    }

    proceed() {
        if(this.state.selectedSlot){
            this.context.router.history.push(`/doctorprofile/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails?t=${this.state.selectedSlot.start}`)
        }
    }

    selectTimeSlot(slot){
        this.setState({ selectedSlot: slot })
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id
        let clinicId = this.props.match.params.clinicId
        if (doctorId && clinicId) {
            this.setState({ selectedDoctor: doctorId, selectedClinic: clinicId })
            this.props.getDoctorById(doctorId)

            this.props.getTimeSlots(doctorId, clinicId, (timeSlots) => {
                this.setState({ timeSlots })
            })
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="appointmentSlot">

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
                            {
                                this.state.timeSlots ?
                                    <TimeSlotSelector
                                        timeSlots={this.state.timeSlots}
                                        selectTimeSlot= {this.selectTimeSlot.bind(this)}
                                    /> : ''
                            }
                            <button className="proceedbtn" onClick={this.proceed.bind(this)}>Proceed</button>
                        </div> : ""
                }

            </div>
        );
    }
}


export default AppointmentSlot
