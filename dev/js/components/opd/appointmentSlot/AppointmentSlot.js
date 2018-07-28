import React from 'react';
import { connect } from 'react-redux';
const queryString = require('query-string');

import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import SelectedClinic from '../commons/selectedClinic/index.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'


class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            reschedule: this.props.location.search.includes('reschedule'),
            goback: this.props.location.search.includes('goback'),
            timeSlots: null,
            doctor_leaves: []
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()
        // in case of reschedule go to reschedule page , else push
        if (this.state.reschedule) {
            const parsed = queryString.parse(this.props.location.search)
            return this.props.history.replace(`/opd/reschedule/${parsed.reschedule}`)
        }
        // go back for goback
        if (this.state.goback) {
            return this.props.history.go(-1)
        }
        if (this.props.selectedSlot.date) {
            return this.props.history.push(`/opd/doctor/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails`)
        }
    }

    selectTimeSlot(slot) {
        const parsed = queryString.parse(this.props.location.search)
        slot.selectedDoctor = this.state.selectedDoctor
        slot.selectedClinic = this.state.selectedClinic
        this.props.selectOpdTimeSLot(slot, this.state.reschedule, parsed.reschedule)
    }

    componentDidMount() {
        let clinicId = this.props.match.params.clinicId
        let doctorId = this.props.match.params.id

        this.props.getTimeSlots(doctorId, clinicId, (timeSlots) => {
            this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves })
        })

        if (window) {
            window.scrollTo(0, 0)
        }

    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section time-picker-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">
                            <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <span className="icon back-icon" onClick={() => {
                                                this.props.history.go(-1)
                                            }}><img src={ASSETS_BASE_URL + "/img/customer-icons/back-white.png"} className="img-fluid" /></span>
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
                                    <section className="dr-profile-screen">
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
                                                                doctor_leaves={this.state.doctor_leaves || []}
                                                            /> : <Loader />
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </section> : <Loader />
                            }

                            <button disabled={!this.props.selectedSlot.date} onClick={this.proceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn">Select</button>
                        </div>
                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default AppointmentSlot
