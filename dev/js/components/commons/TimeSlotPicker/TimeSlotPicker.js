import React from 'react'

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


class TimeSlotSelector extends React.Component{

	componentDidMount(){
		console.log(this.props)
		this.generateDays()
	}

	daysInMonth(){
		return new Date(new Date().getFullYear(), 
                    new Date().getMonth()+1, 
                    0).getDate();
	}

	generateDays(){
		let daySeries = []
		let offset = new Date()
		for(i =0;i<5;i++){

			offset = offset.setDate(offset.getDate() + i)
			daySeries.push({
                tag: WEEK_DAYS[offset.getDay()],
                dateNumber: offset.getDate(),
                actualDate: offset,
                month: MONTHS[offset.getMonth()]
            })
		}
		this.setDate({daySeries: daySeries})		
	}

	render(){console.log(this.props);console.log(this.state)

	let today = new Date()
	let day = today.getDay()
	let date = today.getDate()
	let currentMonth = today.getMonth()
	let currentDaysInMonth = daysInMonth() - date
		return(
			<div>
                <div className="widget no-shadow no-round skin-transparent">
                    <div className="widget-content">
                        <div className="add-new-time mrb-10">
                            <h4 className="text-md fw-700 mrb-10">Select Date &amp; Time:
                            <span  style={{ cursor: 'pointer' }} className={"float-right text-md fw-700 text-" + (true ? "primary" : "light")}>DEcember
                                    <span style={{ marginLeft: 4 }} className={"text-" + (false ? "primary" : "light")}> JanuarY</span></span></h4>
                            <div className="choose-time">
                                <ul className="inline-list datetime-items">	
                                <li
                                    className={(true ? 'active' : "") + (false? "" : " disableddaypill")} >
	                                    {date}<span>{day>6?WEEK_DAYS[day%6]:WEEK_DAYS[day]}</span>
	                                </li>
	
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget">
                    <div className="widget-content">
                        {
                            false ? <p style={{ textAlign: 'center' }}>Not available on this day.</p> : ""
                        }
                        {/*
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
                            })*/
                        }
                    </div>
                </div>
            </div>
			)
	}
}

export default TimeSlotSelector