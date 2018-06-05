import React from 'react';
import { connect } from 'react-redux';

import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import Loader from '../../commons/Loader'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id,
            timeSlots: null
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()
        if (this.props.selectedSlot.date) {
            this.props.history.push(`/lab/${this.state.selectedLab}/book`)
        }
    }

    selectTimeSlot(slot) {
        this.props.selectLabTimeSLot(slot)
    }

    componentDidMount() {
        let selectedLab = this.props.match.params.id

        this.props.getLabTimeSlots(selectedLab, 1, (timeSlots) => {
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
                    this.props.LABS[this.state.selectedLab] ?
                        <div>

                            <section className="wrap dr-profile-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">


                                            {
                                                this.state.timeSlots ?
                                                    <TimeSlotSelector
                                                        timeSlots={this.state.timeSlots}
                                                        selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                        selectedSlot={this.props.selectedSlot}
                                                    /> : ''
                                            }

                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div> : ""
                }

                <button disabled={!this.props.selectedSlot.date} onClick={this.proceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg">Select</button>

            </div>
        );
    }
}


export default AppointmentSlot
