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
import STORAGE from '../../../helpers/storage'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

//import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.selectedDoctor
        let hospital_id = this.props.selectedClinic

        this.state = {
            selectedDoctor: doctor_id,
            selectedClinic: hospital_id,
            reschedule: this.props.location.search.includes('reschedule'),
            goback: this.props.location.search.includes('goback'),
            timeSlots: null,
            doctor_leaves: [],
            enableProceed: false,
            selectedTimeSlot: {},
            upcoming_slots: null,
            showPopup: false
        }
    }

    proceed(e) {
        //user select the timeslot & click the button to proceed
        e.preventDefault()
        e.stopPropagation()

        let data = {
            'Category':'ConsumerApp','Action':'UserCickedSelectedButton','CustomerID':GTM.getUserId()||'','leadid':0,'event':'user-clicked-select-button'}
        GTM.sendEvent({ data: data })

        if(this.state.selectedTimeSlot){
            this.selectTimeSlot(this.state.selectedTimeSlot)    
        }


        //Create IPD Lead on Time slot selection for login user & for ipd hospital(potential + congot)
        if(STORAGE.checkAuth() && this.props.DOCTORS && this.props.DOCTORS[this.props.selectedDoctor]) {

            //Check for ipd hospital for the selected Clinic
            let hospital = {}
            let hospitals = this.props.DOCTORS[this.props.selectedDoctor].hospitals
            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.props.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }

            /*if(hospital && hospital.is_ipd_hospital) {
                let formData = {
                    phone_number: this.props.primaryMobile,
                    doctor: this.props.selectedDoctor,
                    hospital: this.props.selectedClinic,
                    source: 'dropoff',
                    is_valid: false,
                    first_name: this.props.userName||'unknown'
                }
                this.props.submitIPDForm(formData, this.props.selectedLocation)
            }*/
        }


        // in case of reschedule go to reschedule page , else push
        if (this.state.reschedule) {
            const parsed = queryString.parse(this.props.location.search)
            return this.props.history.replace(`/opd/reschedule/${parsed.reschedule}`)
        }
        // go back for goback
        if (this.state.goback) {
            this.props.history.go(-1)
            return
        }
        if (this.state.selectedTimeSlot) {
            let data = {
            'Category':'ConsumerApp','Action':'OpdAppointmentDate','CustomerID':GTM.getUserId()||'','leadid':0,'event':'opd-appointment-date','appointmentTime':this.props.selectedSlot.date}
            GTM.sendEvent({ data: data })

            return this.props.history.push(`/opd/doctor/${this.props.selectedDoctor}/${this.props.selectedClinic}/bookdetails`)
        }
    }

    selectTimeSlot(slot) {
        //user select time 
        const parsed = queryString.parse(this.props.location.search)
        slot.selectedDoctor = this.props.selectedDoctor
        slot.selectedClinic = this.props.selectedClinic
        let extraTimeParams = null
        if(this.state.selectedTimeSlot && this.state.selectedTimeSlot.date) {
            extraTimeParams = this.getFormattedDate(this.state.selectedTimeSlot.date)
        }
        this.props.selectOpdTimeSLot(slot, this.state.reschedule, parsed.reschedule, extraTimeParams)
    }

    getFormattedDate(date) {
        //function which return date in yyyy-mm-dd format
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        }

        var today = yyyy+'-'+mm+'-'+dd;
        return today
    }

    componentDidMount() {
        let selectedDate = new Date()
        //when component load ,it check if any timeslot selected earlier by user for the lab/doctor,if selected then bydefault we select them on page load
        if(this.props.selectedDateFormat){
            selectedDate = this.props.selectedDateFormat
        }else{
            selectedDate = this.getFormattedDate(selectedDate)
        }
        this.getOpdTimeSlot(selectedDate)

        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedSlot.time && this.props.selectedSlot.time.text) {
            this.setState({ selectedTimeSlot: this.props.selectTimeSlot })
        }

        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.state.reschedule) {
            this.setState({ showPopup: true })
        }

    }

    getOpdTimeSlot(selectedDate){
        let clinicId = this.props.selectedClinic
        let doctorId = this.props.selectedDoctor

        let extraParams = {
            selectedDate: selectedDate
        }
        this.props.getTimeSlots(doctorId, clinicId, extraParams, (timeSlots) => {
            this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves, upcoming_slots: timeSlots.upcoming_slots || {} })
        })
    }

    enableProceed(enable, slot = {}) {
        //function which keep on checking on every time selection that whether time is selected or not
        if (enable) {
            this.setState({ enableProceed: true })
        } else {
            if (Object.values(slot).length) {
                this.setState({ enableProceed: true, selectedTimeSlot: slot })
            } else {
                this.setState({ enableProceed: false })
            }
        }
    }

    popupBtnClick(flag) {
        const parsed = queryString.parse(this.props.location.search);
        if (!flag) {
            this.props.history.push(`/opd/reschedule/${parsed.reschedule}`);
        }
        this.setState({ showPopup: false })
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        {
                            this.state.showPopup ?
                                <div className="search-el-popup-overlay" >
                                    <div className="search-el-popup">
                                        <div className="widget">
                                            <div className="widget-content padiing-srch-el">
                                                <p className="srch-el-conent">Are you sure you want to reschedule this appointment?</p>
                                                <div className="search-el-btn-container">
                                                    <button onClick={() => this.popupBtnClick(true)}>Yes</button>
                                                    <button onClick={() => this.popupBtnClick(false)}>No</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : ''
                        }

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
                                this.props.DOCTORS[this.props.selectedDoctor] ?
                                    <section className="dr-profile-screen">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    {/*<SelectedClinic
                                                        selectedDoctor={this.props.DOCTORS[this.props.selectedDoctor]}
                                                        selectedClinic={this.props.selectedClinic}
                                                    />*/}

                                                    {
                                                        this.state.timeSlots ?
                                                            <TimeSlotSelector
                                                                {...this.props}
                                                                timeSlots={this.state.timeSlots}
                                                                selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                selectedSlot={this.state.reschedule ? this.props.rescheduleSlot : this.props.selectedSlot}
                                                                doctor_leaves={this.state.doctor_leaves || []}
                                                                enableProceed = {this.enableProceed.bind(this)} 
                                                                upcoming_slots= {this.state.upcoming_slots} getOpdTimeSlot={this.getOpdTimeSlot.bind(this)}
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
                <Disclaimer />
            </div>
        );
    }
}


export default AppointmentSlot
