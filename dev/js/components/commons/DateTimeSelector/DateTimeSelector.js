import React from 'react'
import Calendar from 'rc-calendar';
const moment = require('moment');

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const queryString = require('query-string');
import STORAGE from '../../../helpers/storage'

class DateTimeSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            daySeries: [],
            currentDate: props.selectedSlot && props.selectedSlot.date?props.selectedSlot.date:new Date().getDate(),
            currentDay: props.selectedSlot && props.selectedSlot.date?new Date(props.selectedSlot.date).getDay():new Date().getDay(),
            currentTimeSlot: props.selectedSlot && props.selectedSlot.time ? props.selectedSlot.time : {},
            selectedSlot: props.selectedSlot && props.selectedSlot.time ? props.selectedSlot.time.value: '',
            selectedDateSpan: props.selectedSlot && props.selectedSlot.date?new Date(props.selectedSlot.date):new Date(),
            selectedMonth: props.selectedSlot && props.selectedSlot.date?new Date(props.selectedSlot.date).getMonth():new Date(props.selectedSlot.date).getMonth() ,
            dateModal: false
        }
    }

    openDateModal() {
        this.setState({ dateModal: !this.state.dateModal })
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedSlot.time && this.props.selectedSlot.time.text) {
            this.props.enableProceed(true)
            //this.saveNextAvailableDate([this.props.selectedSlot.date])
            this.getNextDates(this.props.selectedSlot.date)
            //this.generateDays(true, this.props.selectedSlot.date)
        } else {
            //this.generateDays()
            let { selectedTimeSlotDate, availableTimeSlots} = this.getNextAvailableDate()
            
            if(availableTimeSlots.length){
               // this.saveNextAvailableDate([selectedTimeSlotDate])
                this.setState({selectedDateSpan: selectedTimeSlotDate, currentDate :new Date(selectedTimeSlotDate).getDate(), currentDay: new Date(selectedTimeSlotDate).getDay(), selectedMonth: new Date(selectedTimeSlotDate).getMonth()})
                this.getNextDates(selectedTimeSlotDate)
            }else{
                this.generateDays()    
            }
            
            //this.generateDays(true, time)
        }

    }

    getNextAvailableDate(){

        let today = new Date().getDay() == 0?6:new Date().getDay()-1
        let currentTimeSlotDay = today
        let selectedTimeSlotDate = new Date()
        let sameDayTimeAvailable = false
        let availableTimeSlots = []
        const parsed = queryString.parse(this.props.location.search)
        let type = 1
        if(parsed.type && parsed.type == 'opd'){
            type = 0
        }

        if(this.props.timeSlots && !Object.values(this.props.timeSlots).length){
            return ({selectedTimeSlotDate, availableTimeSlots})
        }

        do{
            if(this.props.timeSlots && this.props.timeSlots[currentTimeSlotDay] && this.props.timeSlots[currentTimeSlotDay].length){

                this.props.timeSlots[currentTimeSlotDay].map((time)=>{

                    time.timing.map((timeSlot)=>{

                        let available = true
                        let isAvailable = this.isTimeSlotAvailable(timeSlot, selectedTimeSlotDate)
                        if(isAvailable){
                            
                            //Only for OPD
                            if(!type && new Date().toDateString() == new Date(selectedTimeSlotDate).toDateString()){

                                if(timeSlot.value>=10.5 && timeSlot.value<=19.75){
                                }else{
                                    available = false
                                    sameDayTimeAvailable = true
                                }

                            }
                            if(available){
                                availableTimeSlots = availableTimeSlots.concat(timeSlot)
                            }
                        }else{
                            sameDayTimeAvailable = true
                        }
                    })
                })
            }
            if(availableTimeSlots.length){
                break;
            }

            let currentSearch = moment(new Date())
            let lastSearchTime = moment(new Date(selectedTimeSlotDate))
            let diffDays = lastSearchTime.diff(currentSearch, 'days')
            
            if(diffDays>8 && availableTimeSlots.length==0){
                break;
            }

            currentTimeSlotDay = currentTimeSlotDay==6?0:currentTimeSlotDay+1
            selectedTimeSlotDate.setDate(selectedTimeSlotDate.getDate() + 1)

        }while((sameDayTimeAvailable || currentTimeSlotDay != today) && availableTimeSlots.length==0)


        return ({selectedTimeSlotDate, availableTimeSlots})
    }

    getNextDates(selectedTimeSlotDate){
        let dateArray = []
        dateArray.push(selectedTimeSlotDate)
        let nextDate = new Date(selectedTimeSlotDate)
        nextDate.setDate(nextDate.getDate() + 1)
        let selectedDateCount = 1
        let noTimeAvailable = false
        while(selectedDateCount!=3){

            if(this.props.timeSlots && Object.values(this.props.timeSlots).length){

                if(this.props.timeSlots[nextDate.getDay()== 0 ? 6 : nextDate.getDay() - 1].length){
                    let newDate = new Date(nextDate)
                    dateArray.push(newDate)
                    selectedDateCount++
                }else{
                    
                    let currentTime = moment(new Date(selectedTimeSlotDate))
                    let lastSearchTime = moment(new Date(nextDate))
                    let diffDays = currentTime.diff(lastSearchTime, 'days')
                    
                    if(diffDays>8 && dateArray.length==0){
                        noTimeAvailable = true
                        break;
                    }
                }
                nextDate.setDate(nextDate.getDate() + 1)    
            }else{
                noTimeAvailable = true
                break
            }
            
        }
        if(noTimeAvailable){
            this.generateDays(true, selectedTimeSlotDate)
        }else{
            this.saveNextAvailableDate(dateArray)    
        }
        
    }

    saveNextAvailableDate(dateArray){
        let daySeries = []

        for(var i =0; i<dateArray.length;i++){

            let offset = new Date(dateArray[i])
            daySeries.push({
                tag: WEEK_DAYS[offset.getDay()],
                dateNumber: offset.getDate(),
                day: offset.getDay(),
                month: offset.getMonth(),
                dateString: new Date(offset).toDateString(),
                year: offset.getFullYear(),
                dateFormat: new Date(offset)
            })    
        }
    
        this.setState({ daySeries: daySeries })
    }

    generateDays(getNewDates = false, selectedDate = '') {
        let daySeries = []
        let offset, currentDate
        if (getNewDates) {
            offset = new Date(selectedDate)
            currentDate = new Date(selectedDate)

        } else {
            offset = new Date()
            currentDate = new Date()

        }
        for (let i = 0; i < 3; i++) {

            offset.setDate(currentDate.getDate() + i)
            daySeries.push({
                tag: WEEK_DAYS[offset.getDay()],
                dateNumber: offset.getDate(),
                day: offset.getDay(),
                month: offset.getMonth(),
                dateString: new Date(offset).toDateString(),
                year: offset.getFullYear(),
                dateFormat: new Date(offset)
            })
            offset = new Date(currentDate)
        }
        this.setState({ daySeries: daySeries  })
    }

    selectDate(date, day, dateString, month, dateFormat) {
        if(date == this.state.currentDate  || (this.props.timeSlots && this.props.timeSlots[day == 0 ? 6 : day - 1] && this.props.timeSlots[day == 0 ? 6 : day - 1].length > 0) ){

            this.setState({ currentDate: date, currentDay: day, selectedDateSpan: dateFormat, selectedMonth: month, currentTimeSlot: {} })
            this.props.enableProceed(false, [])   
        }
    }

    selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            this.setState({ pickedDate: date, selectedDateSpan: new Date(date), dateModal: false, currentDate: new Date(date).getDate() }, () => {
                this.pickDate()
            })
        } else {
            this.setState({ dateModal: false })
        }
    }

    pickDate() {
        if (this.state.pickedDate) {
            let selectedDate = new Date(this.state.pickedDate)
            //this.generateDays(true, selectedDate)
            this.getNextDates(selectedDate)
            this.selectDate(selectedDate.getDate(), selectedDate.getDay(), new Date(selectedDate).toDateString(), selectedDate.getMonth(), selectedDate)
        }
    }

    selectTime(time, slot, title, isAvailable) {
        if(isAvailable){
            
            let self = this
            let timeSpan = Object.assign({}, time)
            timeSpan.title = title
            this.setState({ currentTimeSlot: timeSpan, selectedSlot: slot }, () => {
                let data = {
                    date: self.state.selectedDateSpan,
                    month: MONTHS[self.state.selectedMonth],
                    slot: self.state.selectedSlot,
                    time: self.state.currentTimeSlot
                }
                self.props.enableProceed(false, data)
            })   
        }
    }

    isTimeSlotAvailable(timeSlot, currentDate= this.state.selectedDateSpan) {

        const parsed = queryString.parse(this.props.location.search)
        let type = 1
        if(parsed.type && parsed.type == 'opd'){
            type = 0
        }

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)

        let dateAfterOneHour = new Date(currentDate).setHours(today.getHours()+1)

        if(timeSlot.on_call && today.toDateString() == new Date(currentDate).toDateString()){
            return false
        }

        if(!type && new Date(dateAfterOneHour).toDateString() == today.toDateString() && (new Date(dateAfterOneHour).getHours()+ (new Date(dateAfterOneHour).getMinutes())/60) >timeSlot.value){
            return false
        }
        if (this.props.doctor_leaves && this.props.doctor_leaves.length) {

            let blocked = false
            this.props.doctor_leaves.map((leave) => {
                let start_date = new Date(leave.start_date)
                start_date = start_date.setHours(0, 0, 0, 0)
                let end_date = new Date(leave.end_date)
                end_date = end_date.setHours(0, 0, 0, 0)
                let curr_date = new Date(currentDate)
                curr_date = curr_date.setHours(0, 0, 0, 0)
                if (curr_date >= start_date && curr_date <= end_date) {
                    if (timeSlot.value >= leave.leave_start_time && timeSlot.value <= leave.leave_end_time) {
                        blocked = true
                    }
                }
            })

            if (blocked) {
                return false
            }
        }

        if (today.toDateString() == new Date(currentDate).toDateString() && this.props.today_min) {
            if (this.props.today_max) {
                return timeSlot.value > this.props.today_min && timeSlot.value < this.props.today_max
            }
            return timeSlot.value > this.props.today_min
        }

        if (tomorrow.toDateString() == new Date(currentDate).toDateString() && this.props.tomorrow_min) {
            return timeSlot.value > this.props.tomorrow_min
        }

        // base case if nothing works :)
        if (today.toDateString() == new Date(currentDate).toDateString()) {
            return timeSlot.value > (today.getHours() + 1)
        }

        return true

    }

    getTimeSlots(type){
        let isAnyTimeAvailable = false
        let timeSlotData = []

        this.props.timeSlots[this.state.currentDay == 0 ? 6 : this.state.currentDay - 1].map((schedule, key) => {
            let timeSlots = []
            let timeSchedule = Object.assign({}, schedule)
           
            //type =0 for opd ,in case of opd only slots bw 10:30 & 7:45 will be available for current day
            if(type == 1 || STORAGE.isAgent() || new Date().toDateString() != new Date(this.state.selectedDateSpan).toDateString()){

            }else{
                timeSchedule.timing = timeSchedule.timing.filter(x=>x.value>=10.5 && x.value<=19.75)
            }
            
            timeSchedule.timing.map((time, i) => {
                //only current available time slots will be visible
                if(this.isTimeSlotAvailable(time)){
                    timeSlots.push(<li key={i} className="time-slot-li-listing" onClick={
                        this.selectTime.bind(this, time, time.value, schedule.title,this.isTimeSlotAvailable(time))}>
                        <p className={"time-slot-timmings" + (this.isTimeSlotAvailable(time) ? this.state.currentTimeSlot.value == time.value? " time-active" : ''
                            : " time-disable")}>{time.text}</p>
                    </li>)
                }
            })

            if(timeSlots.length){
                isAnyTimeAvailable = true
                timeSlotData.push(<div key={key} className="select-time-listing-container">
                    <div className="time-shift">
                        {schedule.title}
                    </div>
                    <div className="time-slot-main-listing">
                        <ul className="inline-list time-items">
                            {timeSlots}
                        </ul>
                    </div>
                </div>)
            }

        })


        return isAnyTimeAvailable?
        <div className="select-time-slot-container">
            <div className="slect-date-img-content mb-0">
                <div className="date-text-img">
                    <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                    <p>Select Time Slot</p>
                </div>
            </div>
            {timeSlotData}
        </div>
        :<div className="select-time-slot-container">
            <p style={{ textAlign: 'center' }}>Not available on this day.</p>
        </div>

    }

    render() {

        let currentDate = new Date().getDate()
        const parsed = queryString.parse(this.props.location.search)
        let type = 1
        if(parsed.type && parsed.type == 'opd'){
            type = 0
        }
        return (
            <div className="widget mrng-top-12">
                <div className="time-slot-container">
                    <div className="vertical-date-select-container">
                        <div className="slect-date-heading">
                            <div className="slect-date-img-content">
                                <div className="date-text-img">
                                    <img src={ASSETS_BASE_URL + "/img/new-cal.svg"} />
                                    <p>Select Appointment Date</p>
                                </div>
                                {/* <div className="months-selctor">
                                        <span className="mnth-selcted">{this.state.daySeries && this.state.daySeries.length?MONTHS[this.state.daySeries[0].month]:''}</span>
                                    </div>  */}
                            </div>
                            <div className="vertical-date-listing">
                                <ul className="ver-date-list-ul">
                                    {
                                        this.state.daySeries && this.state.daySeries .length && this.state.daySeries[0].dateFormat > new Date()
                                        ?<li className="scrll-date" onClick={this.openDateModal.bind(this)}>
                                            <img src={ASSETS_BASE_URL + "/img/right-sc.svg"} style={{transform:'rotate(180deg)'}} />
                                        </li>
                                        :''    
                                    }
                                    
                                    {
                                        this.state.daySeries.map((day, key) => {

                                            return <li key={key} onClick={this.selectDate.bind(this, day.dateNumber, day.day, day.dateString, day.month, day.dateFormat)}>
                                                <p className={new Date(day.dateFormat).toDateString() == new Date(this.state.selectedDateSpan).toDateString() ? 'date-list-active' : (this.props.timeSlots && this.props.timeSlots[day.day == 0 ? 6 : day.day - 1] && this.props.timeSlots[day.day == 0 ? 6 : day.day - 1].length > 0) ? '' : "time-disable"}>{day.dateNumber}
                                                    <span>{new Date(day.dateFormat).toDateString() == new Date().toDateString() ? 'Today' : day.tag}</span>
                                                </p>
                                            </li>
                                        })
                                    }
                                    <li className="scrll-date" onClick={this.openDateModal.bind(this)}>
                                        <img style={{width:'22px', top:'10px'}} src={ASSETS_BASE_URL + "/img/calnext.svg"} />
                                    </li>
                                </ul>

                                {/* <input type="date" name="bday" onChange={this.selectDateFromCalendar.bind(this)} onBlur={this.pickDate.bind(this)} /> */}

                                {
                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
                                        <Calendar
                                            showWeekNumber={false}
                                            defaultValue={moment(this.state.selectedDateSpan)}
                                            disabledDate={(date) => {
                                                return date.diff(moment((new Date)), 'days') < 0 || date.diff(moment((new Date)), 'days') > 40
                                            }}
                                            showToday
                                            onSelect={this.selectDateFromCalendar.bind(this)}
                                        />
                                    </div></div> : ""
                                }

                            </div>
                        </div>
                    </div>
                    {/*<div className="select-time-slot-container">
                        {
                            this.props.timeSlots && this.props.timeSlots[this.state.currentDay == 0 ? 6 : this.state.currentDay - 1] && this.props.timeSlots[this.state.currentDay == 0 ? 6 : this.state.currentDay - 1].length ?
                                <div className="slect-date-img-content mb-0">
                                    <div className="date-text-img">
                                        <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                                        <p>Select Time Slot</p>
                                    </div>
                                </div>
                                : <p style={{ textAlign: 'center' }}>Not available on this day.</p>
                        }

                        
                    </div>*/}
                    {
                        this.props.timeSlots && this.props.timeSlots[this.state.currentDay == 0 ? 6 : this.state.currentDay - 1] && this.props.timeSlots[this.state.currentDay == 0 ? 6 : this.state.currentDay - 1].length ?
                            this.getTimeSlots(type)
                            :''
                    }
                </div>
            </div>
        )
    }
}

export default DateTimeSelector
