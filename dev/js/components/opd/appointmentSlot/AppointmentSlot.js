import React from 'react';
import { connect } from 'react-redux';

import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import SelectedClinic from '../commons/selectedClinic/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            timeSlots: null,
            selectedSlot: null
        }
    }

    proceed() {
        // if (this.state.selectedSlot) {
        //     this.context.router.history.push(`/doctorprofile/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails?t=${this.state.selectedSlot.start}`)
        // }
    }

    selectTimeSlot(slot) {
        this.setState({ selectedSlot: slot })
    }

    componentDidMount() {
        let clinicId = this.props.match.params.clinicId
        let doctorId = this.props.match.params.id

        this.props.getTimeSlots(doctorId, clinicId, (timeSlots) => {
            this.setState({ timeSlots })
        })

    }

    render() {

        return (
            <div>

                <header className="skin-primary fixed horizontal top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <span className="icon back-icon" onClick={() => {
                                    this.props.history.go(-1)
                                }}><img src="/assets/img/customer-icons/back-white.png" className="img-fluid" /></span>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-white text-center">Select Date and Time</div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </header>

                {
                    this.props.DOCTORS[this.state.selectedDoctor] ?
                        <div>

                            <section className="wrap dr-profile-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <SelectedClinic
                                                selectedDoctor={this.props.DOCTORS[this.state.selectedDoctor]}
                                                selectedClinic={this.state.selectedClinic}
                                            />

                                            {
                                                this.state.timeSlots ?
                                                    <TimeSlotSelector
                                                        timeSlots={this.state.timeSlots}
                                                        selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                    /> : ''
                                            }

                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div> : ""
                }

                <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg">Select</button>

            </div>
        );
    }
}


export default AppointmentSlot
