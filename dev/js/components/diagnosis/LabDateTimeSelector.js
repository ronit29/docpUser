import React from 'react'
import Calendar from 'rc-calendar';
const moment = require('moment');

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const queryString = require('query-string');
import STORAGE from './../../helpers/storage'
import Loader from '../commons/Loader'

class LabDateTimeSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            daySeries: [],
            currentDate: props.selectedSlot && props.selectedSlot.date ? new Date(props.selectedSlot.date).getDate() : new Date().getDate(),
            currentFormattedDate: props.selectedSlot && props.selectedSlot.date ? this.props.getFormattedDate(new Date(props.selectedSlot.date) ):this.props.getFormattedDate( new Date()),

            currentTimeSlot: props.selectedSlot && props.selectedSlot.time ? props.selectedSlot.time : {},
            selectedSlot: props.selectedSlot && props.selectedSlot.time ? props.selectedSlot.time.value: '',
            selectedDateSpan: props.selectedSlot && props.selectedSlot.date ? new Date(props.selectedSlot.date) : new Date(),
            selectedMonth: props.selectedSlot && props.selectedSlot.date ? new Date(props.selectedSlot.date).getMonth() : new Date().getMonth(),
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
            this.generateDays(true, this.props.selectedSlot.date)
        } else {
            this.generateDays()
        }

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
        let formattedDate;
        for (let i = 0; i < 5; i++) {
            
            offset.setDate(currentDate.getDate() + i)
            daySeries.push({
                tag: WEEK_DAYS[offset.getDay()],
                dateNumber: offset.getDate(),
                day: offset.getDay(),
                month: offset.getMonth(),
                dateString: new Date(offset).toDateString(),
                year: offset.getFullYear(),
                dateFormat: new Date(offset),
                formattedDate: this.props.getFormattedDate(new Date(offset))
            })
            offset = new Date(currentDate)
        }
        this.setState({ daySeries: daySeries })
    }

    selectDate(date, formattedDate, dateString, month, dateFormat) {
        /*if(date == this.state.currentDate  || (this.props.timeSlots && this.props.timeSlots[formattedDate] && this.props.timeSlots[formattedDate].length > 0) ){
   
        }*/

        if(this.props.timeSlots && this.props.timeSlots[formattedDate]){

        } else{
            this.props.getTimeSlots(dateFormat)

        }
        this.setState({ currentDate: date, currentFormattedDate: formattedDate, selectedDateSpan: dateFormat, selectedMonth: month, currentTimeSlot: {} })
        this.props.enableProceed(false, [])
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
            let formattedDate = this.props.getFormattedDate(new Date(this.state.pickedDate))
            this.generateDays(true, selectedDate)
            this.selectDate(selectedDate.getDate(), formattedDate, new Date(selectedDate).toDateString(), selectedDate.getMonth(), selectedDate)
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

    isTimeSlotAvailable(timeSlot) {

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        if(timeSlot.on_call && today.toDateString() == new Date(this.state.selectedDateSpan).toDateString()){
            return false
        }
        if (this.props.doctor_leaves && this.props.doctor_leaves.length) {

            let blocked = false
            this.props.doctor_leaves.map((leave) => {
                let start_date = new Date(leave.start_date)
                start_date = start_date.setHours(0, 0, 0, 0)
                let end_date = new Date(leave.end_date)
                end_date = end_date.setHours(0, 0, 0, 0)
                let curr_date = new Date(this.state.selectedDateSpan)
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

        if (today.toDateString() == new Date(this.state.selectedDateSpan).toDateString() && this.props.today_min) {
            if (this.props.today_max) {
                return timeSlot.value > this.props.today_min && timeSlot.value < this.props.today_max
            }
            return timeSlot.value > this.props.today_min
        }

        if (tomorrow.toDateString() == new Date(this.state.selectedDateSpan).toDateString() && this.props.tomorrow_min) {
            return timeSlot.value > this.props.tomorrow_min
        }

        // base case if nothing works :)
        if (today.toDateString() == new Date(this.state.selectedDateSpan).toDateString()) {
            return timeSlot.value > (today.getHours() + 1)
        }

        return true

    }

    render() {

        let currentDate = this.props.getFormattedDate(new Date())
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

                                            return <li key={key} onClick={this.selectDate.bind(this, day.dateNumber, day.formattedDate, day.dateString, day.month, day.dateFormat)}>
                                                <p className={day.formattedDate == this.state.currentFormattedDate ? 'date-list-active' : (this.props.timeSlots && this.props.timeSlots[day.formattedDate] && this.props.timeSlots[day.formattedDate].length > 0) ? '' : ""}>{day.dateNumber}
                                                    <span>{day.formattedDate == currentDate ? 'Today' : day.tag}</span>
                                                </p>
                                            </li>
                                        })
                                    }
                                    <li className="scrll-date" onClick={this.openDateModal.bind(this)}>
                                        <img src={ASSETS_BASE_URL + "/img/right-sc.svg"} />
                                    </li>
                                </ul>

                                {
                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
                                        <Calendar
                                            showWeekNumber={false}
                                            defaultValue={moment(this.state.selectedDateSpan)}
                                            disabledDate={(date) => {
                                                return date.diff(moment((new Date)), 'days') < 0 || date.diff(moment((new Date)), 'days') > 400
                                            }}
                                            showToday
                                            onSelect={this.selectDateFromCalendar.bind(this)}
                                        />
                                    </div></div> : ""
                                }

                            </div>
                        </div>
                    </div>
                    <div className="select-time-slot-container">
                        {
                            this.props.timeSlots && this.props.timeSlots[this.state.currentFormattedDate]?
                                this.props.timeSlots[this.state.currentFormattedDate].length ?
                                    <div className="slect-date-img-content mb-0">
                                        <div className="date-text-img">
                                            <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                                            <p>Select Time Slot</p>
                                        </div>
                                    </div>
                                    : <p style={{ textAlign: 'center' }}>Not available on this day.</p>
                            :<Loader/>
                        }

                        {
                            this.props.timeSlots && this.props.timeSlots[this.state.currentFormattedDate] && this.props.timeSlots[this.state.currentFormattedDate].length ?
                                this.props.timeSlots[this.state.currentFormattedDate].map((schedule, key) => {

                                    return schedule.timing.length ?
                                    <div key={key} className="select-time-listing-container">
                                        <div className="time-shift">
                                            {schedule.title}
                                        </div>
                                        <div className="time-slot-main-listing">
                                            <ul className="inline-list time-items">
                                                {
                                                    schedule.timing.map((time, i) => {
                                                        return <li key={i} className="time-slot-li-listing" onClick={
                                                            this.selectTime.bind(this, time, time.value, schedule.title,this.isTimeSlotAvailable(time))}>
                                                            <p className={"time-slot-timmings" + (this.isTimeSlotAvailable(time) ? this.state.currentTimeSlot.value == time.value? " time-active" : ''
                                                                : " time-disable")}>{time.text}</p>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    : ''
                                })
                                : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default LabDateTimeSelector
