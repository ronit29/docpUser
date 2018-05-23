import React from 'react';

import { getTime, getDayName } from '../../../utils/dateTimeUtils.js'

const DAYS_TO_SHOW = 20
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

class TimeSlotSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    generateDays() {
        // let days = []

        // for (let i = 0; i < DAYS_TO_SHOW; i++) {
        //     let offsetDay = new Date()
        //     offsetDay.setDate(someDate.getDate() + DAYS_TO_SHOW)
        //     let weekDay = offsetDay.getDay()

        //     days.push({
        //         tag: WEEK_DAYS[weekDay],
        //         value: weekDay
        //     })
        // }
    }

    render() {

        return (
            <div>
                <div className="widget no-shadow no-round skin-transparent">
                    <div className="widget-content">
                        <div className="add-new-time mrb-10">
                            <h4 className="text-md fw-700 mrb-10">Select Date &amp; Time: <span className="float-right text-md fw-700 text-primary">April <span className="text-light">May</span></span></h4>
                            <div className="choose-time">
                                <ul className="inline-list datetime-items">
                                    <li>
                                        21 <span>S</span>
                                    </li>
                                    <li>
                                        22 <span>M</span>
                                    </li>
                                    <li className="active">
                                        23 <span>T</span>
                                    </li>
                                    <li>
                                        24 <span>W</span>
                                    </li>
                                    <li>
                                        25 <span>T</span>
                                    </li>
                                    <li>
                                        26 <span>F</span>
                                    </li>
                                    <li>
                                        27 <span>S</span>
                                    </li>
                                    <li>
                                        28 <span>S</span>
                                    </li>
                                    <li>
                                        29 <span>M</span>
                                    </li>
                                    <li>
                                        30 <span>T</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget">
                    <div className="widget-content">
                        <h4 className="report-on mrb-10">Morning</h4>
                        <ul className="inline-list time-items">
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">7:30 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">8:00 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">8:30 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">9:00 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">9:30 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">10:00 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">10:30 AM</a></li>
                            <li><a href="" className="v-btn v-btn-default btn-sm outline">11:00 AM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">11:30 AM</a></li>
                        </ul>
                        <h4 className="report-on mrb-10">Afternoon</h4>
                        <ul className="inline-list time-items">
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">7:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">8:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">8:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">9:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">9:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">10:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">10:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-default btn-sm outline">11:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">11:30 PM</a></li>
                        </ul>
                        <h4 className="report-on mrb-10">Evening</h4>
                        <ul className="inline-list time-items">
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">7:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">8:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">8:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">9:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">9:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">10:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">10:30 PM</a></li>
                            <li><a href="" className="v-btn v-btn-default btn-sm outline">11:00 PM</a></li>
                            <li><a href="" className="v-btn v-btn-primary btn-sm outline">11:30 PM</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


export default TimeSlotSelector
