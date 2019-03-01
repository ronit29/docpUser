import React from 'react';
import { connect } from 'react-redux';

//import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import TimeSlotSelector from '../LabDateTimeSelector.js'
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
            pickupType: this.props.location.search.includes('type=lab') ? 0 : 1,
            today_min: null,
            tomorrow_min: null, 
            today_max: null,
            enableProceed: false,
            selectedTimeSlot: {}
        }
    }

    proceed(e) {
        e.preventDefault()
        e.stopPropagation()
        // in case of reschedule go back , else push
        if(Object.values(this.state.selectedTimeSlot).length){
            this.selectTimeSlot(this.state.selectedTimeSlot)
        }
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
        if (window) {
            window.scrollTo(0, 0)
        }
        

        /*this.props.getLabTimeSlots(selectedLab, this.state.pickupType, this.props.pincode, (data) => {
            let { time_slots, today_min, tomorrow_min, today_max } = data
            this.setState({ timeSlots: time_slots, today_min: today_min || null, tomorrow_min: tomorrow_min || null, today_max: today_max || null })
        })*/

        if(this.props.selectedSlot && this.props.selectedSlot.date){
            this.getTimeSlots(new Date(this.props.selectedSlot.date))
        }else{
            this.getTimeSlots(new Date())    
        }
        

    }

    getTimeSlots(date){
        //2325
        let selectedLab = this.props.match.params.id
        date = this.getFormattedDate(date)
        let pincode = this.props.pincode
        if(this.props.LABS[selectedLab] && this.props.LABS[selectedLab].lab && !this.props.LABS[selectedLab].lab.is_thyrocare){
            pincode = ''
        }


        this.props.getNewLabTimeSlots(selectedLab, this.state.pickupType, pincode||'', date, (data) => {
            let { time_slots, today_min, tomorrow_min, today_max } = data
            this.setState({ timeSlots: time_slots, today_min: today_min || null, tomorrow_min: tomorrow_min || null, today_max: today_max || null })
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

        var today = dd+'-'+mm+'-'+yyyy;
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
                                this.props.LABS[this.state.selectedLab] ?
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
                                                                today_min={this.state.today_min}
                                                                tomorrow_min={this.state.tomorrow_min}
                                                                today_max={this.state.today_max}
                                                                enableProceed = {this.enableProceed.bind(this)}
                                                                getFormattedDate={this.getFormattedDate.bind(this)}
                                                                getTimeSlots= {this.getTimeSlots.bind(this)}
                                                            /> : <Loader />
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </section> : <Loader />
                            }

                            <button disabled={!this.state.enableProceed} onClick={this.proceed.bind(this)} className="p-3 mrt-10 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Select</button>

                        </div>
                        <RightBar extraClass=" chat-float-btn-2" type="lab" />
                    </div>
                </section>
            </div>
        );
    }
}


export default AppointmentSlot
