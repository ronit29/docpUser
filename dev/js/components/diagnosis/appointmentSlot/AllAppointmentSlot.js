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
            goback: this.props.location.search.includes('goback'),
            pickupType: this.props.location.search.includes('type=lab') ? 0 : 1,
            enableProceed: false,
            selectedTimeSlot: this.props.selectedSlot||{},
            selectedAppointmentType:'all',
            timeSlotsData:null
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
        //if (this.props.selectedSlot.date) {
            return this.props.history.push(`/lab/${this.props.selectedLab}/book`)
        //}
    }

    selectTimeSlot(slot) {
        let extraTimeParams = {
            type: this.state.selectedAppointmentType
        }
        if(this.state.selectedTimeSlot && this.state.selectedTimeSlot.date) {
            extraTimeParams = this.getFormattedDate(this.state.selectedTimeSlot.date)
        }
        let selectedTestsSlot = {...slot}
        let tests = {}
        if(this.state.timeSlotsData['all'] && this.state.timeSlotsData['all'].tests && false) {
            this.state.timeSlotsData['all'].tests.map((test)=>{
                tests[test.id]= {...selectedTestsSlot['all'], test_id:test.id, test_name: test.name}
            })
        }
        if(this.state.timeSlotsData['pathology'] && this.state.timeSlotsData['pathology'].tests) {
            this.state.timeSlotsData['pathology'].tests.map((test)=>{
                tests[test.id] = {...selectedTestsSlot['pathology'], test_id:test.id, test_name: test.name}
            })
        }
        if(selectedTestsSlot['radiology']) {
            tests = {...tests, ...selectedTestsSlot['radiology']}
        }
        selectedTestsSlot['selectedTestsTimeSlot'] = tests
        this.props.selectLabTimeSLot(selectedTestsSlot, this.state.reschedule, extraTimeParams)
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
        let extraParams = {
            test_ids: parsed.test_ids||'',
            p_pickup:1,
            r_pickup:1
        }
        this.props.getLabTimeSlots(selectedLab, this.state.pickupType, pincode||'', date, extraParams, (data) => {
            this.setState({ timeSlotsData: data})
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
        let isAllTimeSelected = false
        if(this.state.timeSlotsData) {
            isAllTimeSelected = this.getTimeSlotStatus(this.state.selectedTimeSlot)
        }
        if(enable){
            this.setState({enableProceed: isAllTimeSelected})
        }else{
            if(Object.values(slot).length){
                let slotData = {...this.state.selectedTimeSlot}
                if(slot.type=='all' || slot.type=='pathology') {
                    slotData[slot.type]= slot
                }else if(slot.type=='radiology') {
                    slotData[slot.type]= slotData[slot.type]?{...slotData[slot.type]}:{}
                    slotData[slot.type][slot.test_id] = slot
                }
                isAllTimeSelected = this.getTimeSlotStatus(slotData)
                console.log(slotData)
                this.setState({enableProceed: isAllTimeSelected, selectedTimeSlot: slotData})
            }else{
                this.setState({enableProceed: false})
            }
        }
    }

    handleToggleType(type) {
        this.setState({ selectedAppointmentType: type })
    }

    getTimeSlotStatus(slotData=null){
        let isAllTimeSelected = false
        let selectedSlot = this.props.selectedSlot
        if(slotData) {
            selectedSlot = slotData
        }
        if(this.state.selectedAppointmentType=='all' && selectedSlot && selectedSlot['all']) {
            isAllTimeSelected = true
        }else if(this.state.selectedAppointmentType=='seperately'){
            const parsed = queryString.parse(this.props.location.search)
            let totalTests = parsed.test_ids?parsed.test_ids.split(','):[]
            let totalPathologyTests = 0
            if(this.state.timeSlotsData.pathology) {
                if(selectedSlot['pathology']){
                    totalPathologyTests=this.state.timeSlotsData.pathology.tests.length||0
                    isAllTimeSelected = true
                }
            }
            
            if(this.state.timeSlotsData.radiology && this.state.timeSlotsData.radiology.tests && this.state.timeSlotsData.radiology.tests.length) {

                if(selectedSlot['radiology'] && (Object.keys(selectedSlot['radiology']).length+totalPathologyTests)==totalTests.length){
                    isAllTimeSelected = true
                }else {
                    isAllTimeSelected = false
                }
            }
        }
        return isAllTimeSelected
    }

    render() {
        let timeSlots = null
        let selectedSlot = null
        let type = ''
        let radiologyTimeSlot = null
        if(this.state.timeSlotsData) {
            if(this.state.selectedAppointmentType=='all' && this.state.timeSlotsData.all) {
                timeSlots = this.state.timeSlotsData.all
                type = 'all'
                selectedSlot = this.state.selectedTimeSlot && this.state.selectedTimeSlot['all']?this.state.selectedTimeSlot['all']:null
            }else if(this.state.selectedAppointmentType=='seperately' && this.state.timeSlotsData.pathology) {
                timeSlots = this.state.timeSlotsData.pathology
                type='pathology'
                selectedSlot = this.state.selectedTimeSlot && this.state.selectedTimeSlot['pathology']?this.state.selectedTimeSlot['pathology']:null
            }
        }

        if(this.state.selectedTimeSlot && this.state.selectedTimeSlot['radiology']){
            radiologyTimeSlot = this.state.selectedTimeSlot['radiology']
        }
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
                            <div className="test-lab-radio widget-content test-report lab-appointment-div row">

                                <ul className="inline-list booking-type search-list-radio">
                                    <li><input type="radio" id="all" name="radio-group" onChange={()=>this.handleToggleType('all')} checked={this.state.selectedAppointmentType == 'all'} /> <label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="all">Book all tests together</label></li>
                                    <li><input type="radio" id="seperately" name="radio-group" onChange={()=>this.handleToggleType('seperately')} checked={this.state.selectedAppointmentType == 'seperately'} /> <label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="seperately">Book seperately</label></li>
                                </ul>
                            </div>
                            {
                                this.props.LABS[this.props.selectedLab] && this.state.timeSlotsData?
                                    <section className="dr-profile-screen">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">


                                                    {
                                                        timeSlots && this.state.selectedAppointmentType=='all'?
                                                            <TimeSlotSelector
                                                                {...this.props}
                                                                timeSlots={timeSlots.timeslots}
                                                                selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                selectedSlot={selectedSlot}
                                                                type={type}
                                                                enableProceed = {this.enableProceed.bind(this)}
                                                                getFormattedDate={this.getFormattedDate.bind(this)}
                                                                getTimeSlots= {this.getTimeSlots.bind(this)}
                                                                upcoming_slots= {timeSlots.upcoming_slots}
                                                                is_thyrocare = {timeSlots.is_thyrocare}
                                                            />
                                                        : ''
                                                    }

                                                    {
                                                        timeSlots && this.state.selectedAppointmentType=='seperately'?
                                                            <TimeSlotSelector
                                                                {...this.props}
                                                                timeSlots={timeSlots.timeslots}
                                                                selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                selectedSlot={selectedSlot}
                                                                type={type}
                                                                enableProceed = {this.enableProceed.bind(this)}
                                                                getFormattedDate={this.getFormattedDate.bind(this)}
                                                                getTimeSlots= {this.getTimeSlots.bind(this)}
                                                                upcoming_slots= {timeSlots.upcoming_slots}
                                                                is_thyrocare = {timeSlots.is_thyrocare}
                                                            />
                                                        : ''
                                                    }

                                                    {
                                                        //For Radiology Tests
                                                        this.state.selectedAppointmentType=='seperately' && this.state.timeSlotsData && this.state.timeSlotsData.radiology && this.state.timeSlotsData.radiology.tests?
                                                        this.state.timeSlotsData.radiology.tests.map((tests, key)=>{
                                                            return <TimeSlotSelector
                                                                        key={key}
                                                                        {...this.props}
                                                                        timeSlots={tests.timings.timeslots}
                                                                        selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                        selectedSlot={radiologyTimeSlot && radiologyTimeSlot[tests.tests_id]?radiologyTimeSlot[tests.tests_id]:null}
                                                                        type='radiology'
                                                                        enableProceed = {this.enableProceed.bind(this)}
                                                                        getFormattedDate={this.getFormattedDate.bind(this)}
                                                                        getTimeSlots= {this.getTimeSlots.bind(this)}
                                                                        upcoming_slots= {tests.timings.upcoming_slots}
                                                                        is_thyrocare = {tests.timings.is_thyrocare}
                                                                        test_name = {tests.name}
                                                                        test_id ={tests.tests_id}
                                                                    />
                                                        }):''
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
