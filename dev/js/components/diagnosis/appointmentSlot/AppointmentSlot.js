import React from 'react';
import { connect } from 'react-redux';

//import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import TimeSlotSelector from '../LabDateTimePicker.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
const queryString = require('query-string');

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let lab_id = this.props.selectedLab

        this.state = {
            selectedLab: lab_id,
            reschedule: this.props.location.search.includes('reschedule'),
            timeSlots: null,
            goback: this.props.location.search.includes('goback'),
            pickupType: this.props.location.search.includes('type=lab') ? 0 : 1,
            enableProceed: false,
            selectedTimeSlot: {},
            upcoming_slots: null,
            is_thyrocare: false
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()
        let selectedDate = null
        // in case of reschedule go back , else push
        if(Object.values(this.state.selectedTimeSlot).length){
            this.selectTimeSlot(this.state.selectedTimeSlot)
            selectedDate = this.state.selectedTimeSlot.date
        }

        let data = {}
        let selected_test_id = []
        const parsed = queryString.parse(this.props.location.search)
        let patient = null
        let profile = null
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            profile = patient.id
        }
        // in case of upload prescription
        if(parsed.is_insurance && parsed.is_insurance == 'true'){
            if(this.props.selectedCriterias && this.props.selectedCriterias.length > 0){
                this.props.selectedCriterias.map((twp, i) => {
                    selected_test_id.push(twp.id)
                })
            }
            data.start_date = selectedDate?selectedDate:this.props.selectedSlot && this.props.selectedSlot.date?this.props.selectedSlot.date:new Date()
            data.lab_test = selected_test_id
            data.lab = this.props.selectedLab
            data.profile = profile
            this.props.preBooking(data)
        }

        if (this.state.reschedule) {
            return this.props.history.go(-1)
        }
        // go back for goback
        if (this.state.goback) {
            return this.props.history.go(-1)
        }
        if (this.props.selectedSlot.date) {
            return this.props.history.push(`/lab/${this.props.selectedLab}/book`)
        }
    }

    selectTimeSlot(slot) {
        let extraTimeParams = null
        if(this.state.selectedTimeSlot && this.state.selectedTimeSlot.date) {
            extraTimeParams = this.getFormattedDate(this.state.selectedTimeSlot.date)
        }
        this.props.selectLabTimeSLot(slot, this.state.reschedule, extraTimeParams)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if(this.props.selectedSlot && this.props.selectedSlot.date){
            this.getTimeSlots(new Date(this.props.selectedSlot.date))
        }else{

            const parsed = queryString.parse(this.props.location.search)
            if(parsed.is_thyrocare && parsed.is_thyrocare.includes('true')){
                    
                let nextDate = new Date()
                if(this.props.selectedDateFormat) {
                    
                    if(new Date().toDateString()==new Date(this.props.selectedDateFormat).toDateString()){
                        nextDate.setDate(new Date().getDate() + 1)
                    }else {
                        nextDate = new Date(this.props.selectedDateFormat)
                    }
                }else {
                    nextDate.setDate(new Date().getDate() + 1)
                }
                this.getTimeSlots(nextDate)
                
                
            }else{
                this.getTimeSlots(new Date())
            }
                
        }
        

    }

    getTimeSlots(date){
        //2325
        let selectedLab = this.props.selectedLab
        date = this.getFormattedDate(date)
        let pincode = this.props.pincode
        const parsed = queryString.parse(this.props.location.search)
        if(parsed.is_thyrocare && parsed.is_thyrocare.includes('true')){
            
        }else{
            pincode = ''
            date = ''
        }
        let extraParams = {}
        this.props.getLabTimeSlots(selectedLab, this.state.pickupType, pincode||'', date, extraParams, (data) => {
            this.setState({ timeSlots: data.timeslots ||null, upcoming_slots: data.upcoming_slots|| null, is_thyrocare: data.is_thyrocare})
        })
    }

    getFormattedDate(date){
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

        var today = yyyy+'-'+mm+'-'+dd
        return today
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
                                this.props.LABS[this.props.selectedLab] ?
                                    <section className="dr-profile-screen">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">


                                                    {
                                                        this.state.timeSlots ?
                                                            <TimeSlotSelector
                                                                {...this.props}
                                                                timeSlots={this.state.timeSlots}
                                                                selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                selectedSlot={this.props.selectedSlot}
                                                                enableProceed = {this.enableProceed.bind(this)}
                                                                getFormattedDate={this.getFormattedDate.bind(this)}
                                                                getTimeSlots= {this.getTimeSlots.bind(this)}
                                                                upcoming_slots= {this.state.upcoming_slots}
                                                                is_thyrocare = {this.state.is_thyrocare}
                                                            /> : <Loader />
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </section> : <Loader />
                            }

                            <button disabled={!this.state.enableProceed} onClick={this.proceed.bind(this)} className="p-3 mrt-10 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Select</button>

                        </div>
                        <RightBar extraClass=" chat-float-btn-2" type="lab"/>
                    </div>
                </section>
            </div>
        );
    }
}


export default AppointmentSlot
