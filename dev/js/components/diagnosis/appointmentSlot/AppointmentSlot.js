import React from 'react';
import { connect } from 'react-redux';

import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id,
            reschedule: this.props.location.search.includes('reschedule'),
            timeSlots: null,
            goback: this.props.location.search.includes('goback'),
            pickupType: this.props.location.search.includes('type=lab') ? 0 : 1
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()
        // in case of reschedule go back , else push
        if (this.state.reschedule) {
            return this.props.history.go(-1)
        }
        // go back for goback
        if (this.state.goback) {
            return this.props.history.go(-1)
        }
        if (this.props.selectedSlot.date) {
            return this.props.history.push(`/lab/${this.state.selectedLab}/book`)
        }
    }

    selectTimeSlot(slot) {
        this.props.selectLabTimeSLot(slot, this.state.reschedule)
    }

    componentDidMount() {
        let selectedLab = this.props.match.params.id

        this.props.getLabTimeSlots(selectedLab, this.state.pickupType, (timeSlots) => {
            this.setState({ timeSlots: timeSlots })
        })

    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section time-picker-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

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
                                this.props.LABS[this.state.selectedLab] ?
                                    <section className="dr-profile-screen">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">


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
