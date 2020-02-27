import React from 'react';
import { connect } from 'react-redux';

//import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'
import TimeSlotSelector from '../LabDateTimePicker.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
const queryString = require('query-string');
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

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
            selectedAppointmentType:parsed.selectedType && parsed.selectedType=='seperately'?'seperately':'all',
            timeSlotsData:null
        }
    }

    proceed(e) {
        //user select the timeslot & click the button to proceed
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
        //user select time 
        let extraTimeParams = {
            type: this.state.selectedAppointmentType
        }
        if(this.state.selectedTimeSlot && this.state.selectedTimeSlot.date) {
            extraTimeParams = this.getFormattedDate(this.state.selectedTimeSlot.date)
        }
        let selectedTestsSlot = {...slot}
        let tests = {}
        const parsed = queryString.parse(this.props.location.search)
        let finalSelectedSlot = {}
        if(this.state.selectedAppointmentType=='all') {
            if(this.state.timeSlotsData['all'] && this.state.timeSlotsData['all'].tests) {
                let is_home_pickup = false
                if(parsed.p_pickup && parsed.p_pickup=="home"){
                    is_home_pickup = true
                }
                if(parsed.r_pickup && parsed.r_pickup=="home"){
                    is_home_pickup = true
                }
                this.state.timeSlotsData['all'].tests.map((test)=>{
                    tests[test.id]= {...selectedTestsSlot['all'], test_id:test.id, test_name: test.name, is_home_pickup: is_home_pickup }
                })
                finalSelectedSlot['all'] = selectedTestsSlot['all']
            }
        }else {
            if(this.state.timeSlotsData['pathology'] && this.state.timeSlotsData['pathology'].tests) {
                this.state.timeSlotsData['pathology'].tests.map((test)=>{
                    tests[test.id] = {...selectedTestsSlot['pathology'], test_id:test.id, test_name: test.name, is_home_pickup: parsed.p_pickup && parsed.p_pickup=="home"?true:false}
                })
                finalSelectedSlot['pathology'] = selectedTestsSlot['pathology']
            }
            if(selectedTestsSlot['radiology'] && this.state.timeSlotsData['radiology'] && this.state.timeSlotsData['radiology'].tests && this.state.timeSlotsData['radiology'].tests.length) {
                tests = {...tests, ...selectedTestsSlot['radiology'] }
                finalSelectedSlot['radiology'] = selectedTestsSlot['radiology']
            }    
        }
        
        finalSelectedSlot['selectedTestsTimeSlot'] = tests
        this.props.selectLabTimeSLot(finalSelectedSlot, this.state.reschedule, extraTimeParams)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if(this.props.selectedSlot && this.props.selectedSlot.date){
            //when component load ,it check if any timeslot selected earlier by user for the lab/doctor,if selected then bydefault we select them on page load
            this.getTimeSlots(new Date(this.props.selectedSlot.date))
        }else{

            const parsed = queryString.parse(this.props.location.search)
            if(parsed.is_thyrocare && parsed.is_thyrocare.includes('true')){
                    
                let nextDate = new Date()
                if(this.props.selectedDateFormat && false) {
                    
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
            p_pickup:parsed.p_pickup && parsed.p_pickup=="home"?1:0,
            r_pickup:parsed.r_pickup && parsed.r_pickup=="home"?1:0
        }
        this.props.getLabTimeSlots(selectedLab, this.state.pickupType, pincode||'', date, extraParams, (data) => {
            this.setState({ timeSlotsData: data})
        })
    }

    getFormattedDate(date){
        //function which return date in yyyy-mm-dd format
        date = new Date(date)
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
        //function which keep on checking on every time selection that whether time is selected or not
        const parsed = queryString.parse(this.props.location.search)
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
                    slotData[slot.type][slot.test_id] = {...slot, is_home_pickup:parsed.r_pickup && parsed.r_pickup=="home"?true:false}
                }
                isAllTimeSelected = this.getTimeSlotStatus(slotData)
                this.setState({enableProceed: isAllTimeSelected, selectedTimeSlot: slotData})
            }else{
                this.setState({enableProceed: false})
            }
        }
    }

    handleToggleType(type) {
        //function which get timeslot for particular toggle type e.g all, seperately
        this.setState({ selectedAppointmentType: type })
    }

    getTimeSlotStatus(slotData=null){
        //In case of tests selected by user 'seperately', this function will return if all the times of selected tests are selected by the user or not
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
            let totalSelectedTests = 0
            if(this.state.timeSlotsData.pathology && selectedSlot['pathology']) {
                totalSelectedTests=this.state.timeSlotsData.pathology.tests.length||0
                isAllTimeSelected = true
            }
            
            if(this.state.timeSlotsData.radiology && this.state.timeSlotsData.radiology.tests && this.state.timeSlotsData.radiology.tests.length) {

                this.state.timeSlotsData.radiology.tests.map((test)=>{
                    if(slotData['radiology'] && slotData['radiology'][test.tests_id]){
                        totalSelectedTests++
                    }else{

                    }
                })
                if(totalSelectedTests==totalTests.length){
                    isAllTimeSelected = true
                }else {
                    isAllTimeSelected = false
                }
            }
        }
        return isAllTimeSelected
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
        let timeSlots = null
        let selectedSlot = null
        let type = ''
        let radiologyTimeSlot = null
        if(this.state.timeSlotsData) {
            if(this.state.selectedAppointmentType=='all' && this.state.timeSlotsData.all && this.state.timeSlotsData.all.tests && this.state.timeSlotsData.all.tests.length) {
                timeSlots = this.state.timeSlotsData.all
                type = 'all'
                selectedSlot = this.state.selectedTimeSlot && this.state.selectedTimeSlot['all']?this.state.selectedTimeSlot['all']:null
            }else if(this.state.selectedAppointmentType=='seperately' && this.state.timeSlotsData.pathology && this.state.timeSlotsData.pathology.tests && this.state.timeSlotsData.pathology.tests.length) {
                timeSlots = this.state.timeSlotsData.pathology
                type='pathology'
                selectedSlot = this.state.selectedTimeSlot && this.state.selectedTimeSlot['pathology']?this.state.selectedTimeSlot['pathology']:null
            }
        }

        if(this.state.selectedTimeSlot && this.state.selectedTimeSlot['radiology']){
            radiologyTimeSlot = this.state.selectedTimeSlot['radiology']
        }
        let test_count = parsed.test_ids?parsed.test_ids.split(',').length:0
        let hide_toggle = !(this.state.timeSlotsData && this.state.timeSlotsData['pathology'] && this.state.timeSlotsData['pathology'].tests && this.state.timeSlotsData['pathology'].tests.length == test_count) && test_count>1 && !(parsed.reschedule && parsed.reschedule=='true')
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
                            <div className="new-time-slot-outer">
                                {
                                    hide_toggle && 
                                    <div className="top-sticky-radio-btn">
                                        <div className="ins-form-radio">
                                            <div className="dtl-radio">
                                                <label className="container-radio">Book all tests together
                                                    <input type="radio" onChange={()=>this.handleToggleType('all')} checked={this.state.selectedAppointmentType == 'all'} name="type" value='m' />
                                                    <span className="doc-checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="dtl-radio">
                                                <label className="container-radio">Book separately
                                                    <input type="radio" onChange={()=>this.handleToggleType('seperately')} checked={this.state.selectedAppointmentType == 'seperately'} name="type" value='f' />
                                                    <span className="doc-checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                }
                                {/*
                                    type=='all'?

                                    <div className="time-slot-wrng-cont">
                                        <img src={ASSETS_BASE_URL + "/img/tm-wrng.png"} />
                                        <p>Both test can’t be book for the same time. You can <span>Book Separately</span></p>
                                    </div>
                                    :''
                                */}
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
                                                                nameHeading={timeSlots.tests}
                                                                toggle = {this.handleToggleType.bind(this)}
                                                                test_id= {timeSlots.tests && timeSlots.tests.length?timeSlots.tests[0].id:''}
                                                                hide_toggle={hide_toggle}
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
                                                                nameHeading={timeSlots.tests}
                                                                toggle = {this.handleToggleType.bind(this)}
                                                                test_id= {timeSlots.tests && timeSlots.tests.length?timeSlots.tests[0].id:''}
                                                                hide_toggle={false}
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
                                                                        is_radiology={true}
                                                                        nameHeading={tests.name}
                                                                        toggle = {this.handleToggleType.bind(this)}
                                                                        hide_toggle={false}
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
                        <RightBar extraClass=" chat-float-btn-2" type="lab"/>
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}


export default AppointmentSlot
