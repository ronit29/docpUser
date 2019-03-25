import React from 'react';
import { connect } from 'react-redux';
const queryString = require('query-string');

import TimeSlotSelector from '../../commons/DateTimeSelector/index.js'
import SelectedClinic from '../commons/selectedClinic/index.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'

//import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            reschedule: this.props.location.search.includes('reschedule'),
            goback: this.props.location.search.includes('goback'),
            timeSlots: null,
            doctor_leaves: [],
            enableProceed: false,
            selectedTimeSlot: {},
            upcoming_slots:null
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()

        let data = {
            'Category':'ConsumerApp','Action':'UserCickedSelectedButton','CustomerID':GTM.getUserId()||'','leadid':0,'event':'user-clicked-select-button'}
        GTM.sendEvent({ data: data })

        if(this.state.selectedTimeSlot){
            this.selectTimeSlot(this.state.selectedTimeSlot)    
        }
        // in case of reschedule go to reschedule page , else push
        if (this.state.reschedule) {
            const parsed = queryString.parse(this.props.location.search)
            return this.props.history.replace(`/opd/reschedule/${parsed.reschedule}`)
        }
        // go back for goback
        if (this.state.goback) {
            return this.props.history.go(-1)
        }
        if (this.state.selectedTimeSlot) {
            let data = {
            'Category':'ConsumerApp','Action':'OpdAppointmentDate','CustomerID':GTM.getUserId()||'','leadid':0,'event':'opd-appointment-date','appointmentTime':this.props.selectedSlot.date}
            GTM.sendEvent({ data: data })

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
            this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves, upcoming_slots: timeSlots.upcoming_slots||{} })
        })

        if(this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedSlot.time && this.props.selectedSlot.time.text){
            this.setState({selectedTimeSlot:this.props.selectTimeSlot})
        }

        if (window) {
            window.scrollTo(0, 0)
        }

    }

    enableProceed(enable, slot={}){
        if(enable){
            this.setState({enableProceed: true})
        }else{
            if(Object.values(slot).length){
                this.setState({enableProceed: true, selectedTimeSlot: slot})
            }else{
                this.setState({enableProceed: false})
            }
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {/* <header className="skin-primary fixed horizontal top sticky-header">
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
                            </header> */}

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
                                                                {...this.props}
                                                                timeSlots={this.state.timeSlots}
                                                                selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                selectedSlot={this.state.reschedule ? this.props.rescheduleSlot : this.props.selectedSlot}
                                                                doctor_leaves={this.state.doctor_leaves || []}
                                                                enableProceed = {this.enableProceed.bind(this)} 
                                                                upcoming_slots= {this.state.upcoming_slots}
                                                            /> : <Loader />
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </section> : <Loader />
                            }

                            <button disabled={!this.state.enableProceed} onClick={this.proceed.bind(this)} className="p-3 mrt-10 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn sticky-btn">Select</button>
                        </div>
                        <RightBar extraClass=" chat-float-btn-2" type="opd" />
                    </div>
                </section>
            </div>
        );
    }
}


export default AppointmentSlot
