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

        this.setState({
            timeSeries: days,
            selectedDay: days[0],
            selectedMonth: days[0].month
        })
    }

    selectDay(day) {
        this.setState({ selectedDay: day })
        this.props.selectTimeSlot({ time: {} })
    }

    selectMonth(month, e) {
        e.stopPropagation()
        this.setState({ selectedMonth: month })
        this.props.selectTimeSlot({ time: {} })
    }

    selectSlot(slot, e) {
        e.stopPropagation()
        e.preventDefault()
        slot.date = this.state.selectedDay.actualDate
        this.props.selectTimeSlot(slot)
    }

    render() {
        let selectedSchedule = []
        if (this.state.selectedDay && this.state.selectedDay.actualDate) {
            let weekDayNumber = this.state.selectedDay.actualDate.getDay()
            selectedSchedule = this.props.timeSlots[weekDayNumber]
        }

        // let monthNum = (new Date).getMonth()
        let thisMonth = MONTHS[(new Date).getMonth()]
        let nextMonth = MONTHS[(new Date).getMonth() + 1]

        return (
            <div>
                <div className="widget no-shadow no-round skin-transparent">
                    <div className="widget-content">
                        <div className="add-new-time mrb-10">
                            <h4 className="text-md fw-700 mrb-10">Select Date &amp; Time:
                            <span onClick={this.selectMonth.bind(this, thisMonth)} className={"float-right text-md fw-700 text-" + (thisMonth === this.state.selectedMonth ? "primary" : "light")}>{thisMonth}
                                    <span onClick={this.selectMonth.bind(this, nextMonth)} className={"text-" + (nextMonth === this.state.selectedMonth ? "primary" : "light")}>{nextMonth}</span></span></h4>
                            <div className="choose-time">
                                <ul className="inline-list datetime-items">

                                    {
                                        this.state.timeSeries.filter((ts) => {
                                            return ts.month === this.state.selectedMonth
                                        }).map((ts, i) => {
                                            return <li
                                                className={this.state.selectedDay == ts ? 'active' : ""}
                                                key={i}
                                                onClick={this.selectDay.bind(this, ts)}
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
                            selectedSchedule.map((schedule, i) => {
                                return <div key={i}>
                                    <h4 className="report-on mrb-10">{schedule.title}</h4>
                                    <ul className="inline-list time-items">
                                        {
                                            schedule.timing.map((time, i) => {
                                                return <li key={i} onClick={this.selectSlot.bind(this, {
                                                    slot: i,
                                                    time: time
                                                })}><a href="" className={"v-btn v-btn-primary btn-sm " + (this.props.selectedSlot.slot == i && this.props.selectedSlot.time.value == time.value ? "" : "outline")}>{time.text} </a></li>
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
