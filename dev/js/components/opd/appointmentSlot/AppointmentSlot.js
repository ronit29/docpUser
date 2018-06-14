import React from 'react';
import { connect } from 'react-redux';

import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import SelectedClinic from '../commons/selectedClinic/index.js'
import Loader from '../../commons/Loader'


class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            reschedule: this.props.location.search.includes('reschedule'),
            timeSlots: null
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()
        // in case of reschedule go back , else push
        if(this.state.reschedule){
            this.props.history.go(-1)
        }
        if (this.props.selectedSlot.date) {
            this.props.history.push(`/opd/doctor/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails`)
        }
    }

    selectTimeSlot(slot) {
        this.props.selectOpdTimeSLot(slot, this.state.reschedule)
    }

    componentDidMount() {
        let clinicId = this.props.match.params.clinicId
        let doctorId = this.props.match.params.id

        this.props.getTimeSlots(doctorId, clinicId, (timeSlots) => {
            this.setState({ timeSlots: timeSlots.timeslots })
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
                                                        selectedSlot={this.props.selectedSlot}
                                                    /> : <Loader />
                                            }

                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div> : <Loader />
                }

                <button disabled={!this.props.selectedSlot.date} onClick={this.proceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg">Select</button>

            </div>
        );
    }
}


export default AppointmentSlot
