import React from 'react';
import GTM from '../../../helpers/gtm';
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
// const moment = require('moment');

class VisitTimeNew extends React.Component {
    constructor(props) {
        super(props)
    }

    selectTime(time, selectedTimeSlotDate) {

        let eventData = {
            'Category': 'ConsumerApp', 'Action': 'EarlyTimeSlotClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'early-time-slot-clicked'
        }
        GTM.sendEvent({ data: eventData })

        let self = this
        let timeSpan = Object.assign({}, time)
        timeSpan.title = time.title
        let data = {
            date: selectedTimeSlotDate,
            month: MONTHS[new Date(selectedTimeSlotDate).getMonth()],
            slot: '',
            time: timeSpan,
            summaryPage: true
        }
        this.props.selectTimeSlot(data)
    }

    isTimeSlotAvailable(timeSlot, currentDate) {

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)

        let dateAfterOneHour = new Date(currentDate).setHours(today.getHours() + 1)

        if (timeSlot.on_call && today.toDateString() == new Date(currentDate).toDateString()) {
            return false
        }

        if (new Date(dateAfterOneHour).toDateString() == today.toDateString() && (new Date(dateAfterOneHour).getHours() + new Date(dateAfterOneHour).getMinutes() / 60) > timeSlot.value) {
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

    viewAllClicked() {

        this.props.navigateTo('time')
    }

    render() {
        let upcomingDate = null
        if (this.props.upcoming_slots && Object.keys(this.props.upcoming_slots) && Object.keys(this.props.upcoming_slots).length) {
            upcomingDate = Object.keys(this.props.upcoming_slots)[0]
            upcomingDate = new Date(upcomingDate)
        }

        let { date, time } = this.props.selectedSlot

        if (date) {
            date = new Date(date).toDateString()
        }
        return (
            <div className={`widget mrb-15 ${this.props.timeError ? 'rnd-error-nm' : ''}`}>
                <div className="widget-content pos-relative">
                    <div className="lab-visit-time d-flex jc-spaceb mb-0">
                        <h4 className="title mb-0"><span><img src={ASSETS_BASE_URL + "/img/watch-date.svg"} className="visit-time-icon" /></span>Visit Time</h4>
                    </div>
                    <p className="apnt-doc-dtl">The appointment is subject to confirmation from the Doctor. </p>
                    {
                        ((this.props.selectedSlot && this.props.selectedSlot.summaryPage) || !date) ?
                            <div className='nw-timeslot-container'>
                                {
                                    this.props.upcoming_slots && Object.values(this.props.upcoming_slots) && Object.values(this.props.upcoming_slots).length ?
                                        <div>
                                            <p className="avl-time-slot">Next available on <span className="">{WEEK_DAYS[upcomingDate.getDay()]}, {upcomingDate.getDate()} {MONTHS[upcomingDate.getMonth()]}:</span></p>
                                            <div className="select-time-listing-container align-flex-sp-bt">
                                                <div className="time-slot-main-listing">
                                                    <ul className="inline-list nw-time-st">
                                                        {
                                                            Object.values(this.props.upcoming_slots)[0].map((time, i) => {
                                                                return <li key={i} className="nw-time-slot-li" onClick={
                                                                    this.selectTime.bind(this, time, upcomingDate)}>
                                                                    <p className={`time-slot-timmings ${this.props.selectedSlot && this.props.selectedSlot.time ? `${this.props.selectedSlot.time.value == time.value ? " time-active" : ''}` : ''}`}
                                                                    >{time.text} {time.text ? (time.value >= 12 ? 'PM' : 'AM') : ''}</p>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                {
                                                    ((this.props.selectedSlot && this.props.selectedSlot.summaryPage) || !date) ?
                                                        <div className="new-all-slot-cont">
                                                            <a href="" className="text-primary fw-700 text-sm" onClick={(e) => {
                                                                e.preventDefault()
                                                                this.viewAllClicked()
                                                            }}><img className="sl-cal-img" src={ASSETS_BASE_URL + "/img/cal.svg"}/> View all</a>
                                                        </div>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                        : <div>No time slots Available</div>
                                }
                            </div>
                            : <div className="timeAfterSelect text-right">
                                <h4 className="date-time title">{date ? `${WEEK_DAYS[new Date(date).getDay()]}, ${new Date(date).getDate()} ${MONTHS[new Date(date).getMonth()]}` : ''} {time.text ? "|" : ""} {time.text} {time.text ? (time.value >= 12 ? 'PM' : 'AM') : ''}</h4>
                                {
                                    !this.props.hideChangeTime ? <a href="" onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        this.props.navigateTo('time')
                                    }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Select"} Time</a> : ""
                                }
                            </div>
                    }
                </div>
                {
                    /*  this.props.timeError ? <span className="fw-500 time-error nw-error">Required</span> : ''*/
                }
            </div>
        );
    }
}


export default VisitTimeNew
