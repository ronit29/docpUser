import React from 'react';

import { getTime, getDayName } from '../../../utils/dateTimeUtils.js'

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

class TimeSlotSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeSeries: [],
            selectedMonth: "",
            selectedDay: ""
        }
    }

    componentDidMount() {
        this.generateDays()
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    generateDays() {
        let days = []

        for (let i = 0; i < DAYS_TO_SHOW; i++) {
            let offsetDay = new Date()
            offsetDay.setDate(offsetDay.getDate() + i)
            let weekDay = offsetDay.getDay()

            days.push({
                tag: WEEK_DAYS[weekDay],
                dateNumber: offsetDay.getDate(),
                actualDate: offsetDay,
                month: MONTHS[offsetDay.getMonth()]
            })
        }

        let selctedDate = this.props.selectedSlot.date
        let ts_selected = null
        if (selctedDate) {
            selctedDate = new Date(selctedDate).toDateString()
            for (let ts of days) {
                let curr_date = new Date(ts.actualDate).toDateString()
                if (curr_date == selctedDate) {
                    ts_selected = ts
                    break
                }
            }
        }

        if (ts_selected && this.isTimeSlotAvailable(this.props.selectedSlot.time, selctedDate, true, ts_selected)) {
            this.setState({
                timeSeries: days,
                selectedDay: ts_selected,
                selectedMonth: ts_selected.month
            })
        } else {
            let foundTs = this.getAvailableTS(days, null)
            this.setState({
                timeSeries: days,
                selectedDay: foundTs,
                selectedMonth: foundTs.month
            }, () => {
                let slot = { time: {} }
                slot.month = this.state.selectedMonth
                this.props.selectTimeSlot(slot)
            })
        }

    }

    selectDay(day, is_available) {
        if (is_available) {
            this.setState({ selectedDay: day })
            let slot = { time: {} }
            slot.month = this.state.selectedMonth
            this.props.selectTimeSlot(slot)
        }
    }

    selectMonth(month, e) {
        e.stopPropagation()

        let foundTs = this.getAvailableTS(this.state.timeSeries, month)
        this.setState({ selectedMonth: month, selectedDay: foundTs }, () => {
            let slot = { time: {} }
            slot.month = this.state.selectedMonth
            this.props.selectTimeSlot(slot)
        })

    }

    selectSlot(slot) {
        if (slot.time.is_available) {
            slot.date = this.state.selectedDay.actualDate
            slot.month = this.state.selectedMonth
            this.props.selectTimeSlot(slot)
        }
    }

    getAvailableTS(allSlots, month) {
        let selectedSchedule = []
        let foundTs = ""

        for (let ts of allSlots) {
            if (ts && ts.actualDate && (ts.month == month || month == null)) {
                let weekDayNumber = ts.actualDate.getDay()
                weekDayNumber = weekDayNumber == 0 ? 6 : weekDayNumber - 1
                selectedSchedule = this.props.timeSlots[weekDayNumber]
            }
            if (selectedSchedule && selectedSchedule.length) {
                foundTs = ts
                break
            }
        }
        return foundTs
    }

    isTimeSlotAvailable(ts, selectedDate, checkInTimslots = false, ts_selected) {
        if (ts.is_available === false) {
            return false
        }

        if (checkInTimslots) {
            let weekDayNumber = ts_selected.actualDate.getDay()
            weekDayNumber = weekDayNumber == 0 ? 6 : weekDayNumber - 1
            let selectedSchedule = this.props.timeSlots[weekDayNumber]

            let found = false
            if (selectedSchedule && selectedSchedule.length) {
                selectedSchedule.map((sch, i) => {
                    sch.timing.map((t, j) => {
                        if (this.props.selectedSlot.slot == j && this.props.selectedSlot.time.value == t.value) {
                            found = true
                        }
                    })
                })
            }

            if (!found) {
                return false
            }
        }

        if (this.props.doctor_leaves && this.props.doctor_leaves.length) {
            let blocked = false
            this.props.doctor_leaves.map((leave) => {
                let start_date = new Date(leave.start_date)
                start_date = start_date.setHours(0, 0, 0, 0)
                let end_date = new Date(leave.end_date)
                end_date = end_date.setHours(0, 0, 0, 0)
                let curr_date = new Date(selectedDate)
                curr_date = curr_date.setHours(0, 0, 0, 0)
                if (curr_date >= start_date && curr_date <= end_date) {
                    if (ts.value >= leave.leave_start_time && ts.value <= leave.leave_end_time) {
                        blocked = true
                    }
                }
            })

            if (blocked) {
                return false
            }
        }



        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (today.toDateString() == selectedDate && this.props.today_min) {
            if (this.props.today_max) {
                return ts.value > this.props.today_min && ts.value < this.props.today_max
            }
            return ts.value > this.props.today_min
        }

        if (tomorrow.toDateString() == selectedDate && this.props.tomorrow_min) {
            return ts.value > this.props.tomorrow_min
        }

        // base case if nothing works :)
        if (today.toDateString() == selectedDate) {
            return ts.value > (today.getHours() + 1)
        }

        return true
    }


    render() {
        let selectedSchedule = []
        if (this.state.selectedDay && this.state.selectedDay.actualDate) {
            let weekDayNumber = this.state.selectedDay.actualDate.getDay()
            weekDayNumber = weekDayNumber == 0 ? 6 : weekDayNumber - 1
            selectedSchedule = this.props.timeSlots[weekDayNumber]
        }

        // let monthNum = (new Date).getMonth()
        let thisMonth = MONTHS[(new Date).getMonth()]
        let nextMonth = MONTHS[(new Date).getMonth() + 1]
        // let selctedDate = this.props.selectedSlot.date || this.state.selectedDay.actualDate
        let selctedDate = this.state.selectedDay.actualDate
        selctedDate = selctedDate ? new Date(selctedDate).toDateString() : null

        // let selectedMonth = this.props.selectedSlot.month || this.state.selectedMonth
        let selectedMonth = this.state.selectedMonth
        // debugger
        return (
            <div>
                <div className="widget no-shadow no-round skin-transparent">
                    <div className="widget-content">
                        <div className="add-new-time mrb-10">
                            <h4 className="text-md fw-700 mrb-10">Select Date &amp; Time:
                            <span onClick={this.selectMonth.bind(this, thisMonth)} style={{ cursor: 'pointer' }} className={"float-right text-md fw-700 text-" + (thisMonth === selectedMonth ? "primary" : "light")}>{thisMonth}
                                    <span onClick={this.selectMonth.bind(this, nextMonth)} style={{ marginLeft: 4 }} className={"text-" + (nextMonth === selectedMonth ? "primary" : "light")}> {nextMonth}</span></span></h4>
                            <div className="choose-time">
                                <ul className="inline-list datetime-items">

                                    {
                                        this.state.timeSeries.filter((ts) => {
                                            return ts.month === selectedMonth
                                        }).map((ts, i) => {
                                            let is_available = false
                                            let weekDayNumber = ts.actualDate.getDay()
                                            weekDayNumber = weekDayNumber == 0 ? 6 : weekDayNumber - 1
                                            let currSchedule = this.props.timeSlots[weekDayNumber]
                                            if (currSchedule && currSchedule.length) {
                                                is_available = true
                                            }
                                            let curr_date = new Date(ts.actualDate).toDateString()
                                            return <li
                                                className={(selctedDate == curr_date ? 'active' : "") + (is_available ? "" : " disableddaypill")}
                                                key={i}
                                                onClick={this.selectDay.bind(this, ts, is_available)}
                                            >
                                                {ts.dateNumber} <span>{ts.tag}</span>
                                            </li>
                                        })
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget">
                    <div className="widget-content">
                        {
                            selectedSchedule.length == 0 ? <p style={{ textAlign: 'center' }}>Not available on this day.</p> : ""
                        }
                        {
                            selectedSchedule.filter(schedule => schedule.timing && schedule.timing.length).map((schedule, i) => {
                                return <div key={i}>
                                    <h4 className="report-on mrb-10">{schedule.title}</h4>
                                    <ul className="inline-list time-items">
                                        {
                                            schedule.timing.map((time, i) => {
                                                return <li key={i} onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    if (this.isTimeSlotAvailable(time, selctedDate)) {
                                                        this.selectSlot.call(this, {
                                                            slot: i,
                                                            time: time
                                                        })
                                                    }
                                                }}><a href="" className={"v-btn v-btn-primary btn-sm " + (this.props.selectedSlot.slot == i && this.props.selectedSlot.time.value == time.value ? "" : "outline ") + (this.isTimeSlotAvailable(time, selctedDate) ? "time-slot-btn" : "diabledtspill")}>{time.text} </a></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default TimeSlotSelector
