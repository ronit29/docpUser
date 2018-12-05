import React from 'react'

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


class DateTimeSelector extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            daySeries:[],
            timeSlots: {},
            doctor_leaves: {},
            currentDate: new Date().getDate(),
            currentDay : new Date().getDay(),
            currentTime: {}
        }
    }

    componentDidMount(){
        console.log(this.props)
        let clinicId = 2097
        let doctorId = 114

        this.props.getTimeSlots(doctorId, clinicId, (timeSlots) => {
            this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves })
        })
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
        let currentDate = new Date()
        for(let i =0;i<5;i++){

            offset.setDate(currentDate.getDate() + i)
            console.log(offset);console.log(i)
            daySeries.push({
                tag: WEEK_DAYS[offset.getDay()],
                dateNumber: offset.getDate(),
                day: offset.getDay(),
                month: MONTHS[offset.getMonth()],
                date: new Date(offset).toDateString(),
                year: offset.getFullYear()
            })
        }
        console.log(daySeries)
        this.setState({daySeries:daySeries})        
    }

    selectDate(date){
        this.setState({date: date})
    }

    selectTime(time){
        let self = this
        this.setState({currentTime:time}, () => {

            //let date = new Date(self.state.date.year, self.state.date.month, self.state.date.day)
            
        })
    }

    isTimeSlotAvailable(timeSlot, selctedDate){
        let currentTime = new Date().getHours() + new Date().getMinutes()/60
        if(currentTime> timeSlot.value){
            return false
        }else{
            return true
        }

    }

    render(){console.log(this.props);console.log(this.state)
        let currentDate  = new Date().getDate()
        
        return(
            <div>
                <div className="widget no-shadow no-round skin-transparent">
                    <div className="widget-content">
                        <div className="add-new-time mrb-10">
                            <h4 className="text-md fw-700 mrb-10">Select Date &amp; Time:
                            <span  style={{ cursor: 'pointer' }} className={"float-right text-md fw-700 text-" + (true ? "primary" : "light")}>December
                                    <span style={{ marginLeft: 4 }} className={"text-" + (false ? "primary" : "light")}> JanuarY</span></span></h4>
                            <div className="choose-time">
                                <ul className="inline-list datetime-items">
                                {
                                    this.state.daySeries.map((day,key) => {

                                        return <li key={key} onClick = {this.selectDate.bind(this,day)} className={day.dateNumber == this.state.currentDate || (this.state.timeSlots && this.state.timeSlots[day.day] && this.state.timeSlots[day.day].length)?'active' :" disableddaypill"} >
                                                {day.dateNumber}<span>{day.tag}</span>
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
                            this.state.timeSlots && this.state.timeSlots[this.state.currentDay] && this.state.timeSlots[this.state.currentDay].length?
                            this.state.timeSlots[this.state.currentDay].map((schedule, key) => {
                                return <div key={key}>
                                    <h4 className="report-on mrb-10">{schedule.title}</h4>
                                    <ul className="inline-list time-items">
                                        {
                                            schedule.timing.map((time, i) => {
                                                return <li key={i} onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    this.selectTime.bind(this, time)
                                                }}><a href="" className={"v-btn v-btn-primary btn-sm " + (this.props.selectedSlot.slot == i && this.props.selectedSlot.time.value == time.value  ? "" : "outline ") + (this.isTimeSlotAvailable(time) ? "time-slot-btn" : "diabledtspill")}>{time.text} </a></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            })
                            :<p style={{ textAlign: 'center' }}>Not available on this day.</p> 
                        }
                    </div>
                </div>
            </div>
            )
    }
}

export default DateTimeSelector
