import React from 'react'

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


class DateTimeSelector extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            daySeries:[],
            currentDate: props.selectedSlot && props.selectedSlot.date ?new Date(props.selectedSlot.date).getDate():new Date().getDate(),
            currentDay : props.selectedSlot && props.selectedSlot.date ?new Date(props.selectedSlot.date).getDay():new Date().getDay(),
            currentTimeSlot: props.selectedSlot && props.selectedSlot.time?props.selectedSlot.time:{},
            selectedSlot:props.selectedSlot && props.selectedSlot.slot?props.selectedSlot.slot:'',
            selectedDateSpan: props.selectedSlot && props.selectedSlot.date ?new Date(props.selectedSlot.date):new Date(), 
            selectedMonth: props.selectedSlot && props.selectedSlot.date ?new Date(props.selectedSlot.date).getMonth():new Date().getMonth()
        }
    }

    componentDidMount(){
        if(this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedSlot.time && this.props.selectedSlot.time.text){
            this.props.enableProceed(true)
            this.generateDays(true, this.props.selectedSlot.date)
        }else{
            this.generateDays()
        } 
        
    }

    generateDays(getNewDates = false, selectedDate=''){
        let daySeries = []
        let offset, currentDate
        if(getNewDates){
            offset = new Date(selectedDate)
            currentDate = new Date(selectedDate)
        
        }else{
            offset = new Date()
            currentDate = new Date()
            
        }
        for(let i =0;i<5;i++){

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
        }
        this.setState({daySeries:daySeries})        
    }

    selectDate(date, day, dateString, month, dateFormat){
        this.setState({currentDate: date ,currentDay: day, selectedDateSpan: dateFormat, selectedMonth: month, currentTimeSlot: {}})
        this.props.enableProceed(false,[])
    }

    selectDateFromCalendar(event){
        let date = event?event.target.value:''
        this.setState({pickedDate:date, selectedDateSpan: new Date(date)})
    }

    pickDate(){
        if(this.state.pickedDate){
            let selectedDate = new Date(this.state.pickedDate)
            this.generateDays(true,selectedDate)
            this.selectDate(selectedDate.getDate(), selectedDate.getDay(), new Date(selectedDate).toDateString(), selectedDate.getMonth(), selectedDate) 
        }
    }

    selectTime(time,slot,title){
        let self = this
        let timeSpan = Object.assign({}, time)
        timeSpan.title = title
        this.setState({currentTimeSlot : timeSpan, selectedSlot: slot}, () => {
            let data = {
                date: self.state.selectedDateSpan,
                month: MONTHS[self.state.selectedMonth],
                slot: self.state.selectedSlot,
                time: self.state.currentTimeSlot
            }
            self.props.enableProceed(false,data)
        })
    }

    isTimeSlotAvailable(timeSlot){

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

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (today.toDateString() == new Date(this.state.selectedDateSpan).toDateString() && this.props.today_min) {
            if (this.props.today_max) {
                return timeSlot.value > this.props.today_min && timeSlot.value < this.props.today_max
            }
            return timeSlot.value > this.props.today_min
        }

        if (tomorrow.toDateString() == new Date(this.state.selectedDateSpan).toDateString() && this.props.tomorrow_min) {
            return ts.value > this.props.tomorrow_min
        }

        // base case if nothing works :)
        if (today.toDateString() == new Date(this.state.selectedDateSpan).toDateString()) {
            return timeSlot.value > (today.getHours() + 1)
        }

        return true

    }

    render(){

        let currentDate  = new Date().getDate()

        return(
             <div className="widget">
                    <div className="time-slot-container">
                        <div className="vertical-date-select-container">
                            <div className="slect-date-heading">
                                <div className="slect-date-img-content">
                                    <div className="date-text-img">
                                        <img src={ASSETS_BASE_URL + "/img/new-cal.svg"} />
                                        <p>Select Appoinment Date</p>
                                    </div>
                                    {/* <div className="months-selctor">
                                        <span className="mnth-selcted">{this.state.daySeries && this.state.daySeries.length?MONTHS[this.state.daySeries[0].month]:''}</span>
                                    </div>  */}
                                </div>
                                <div className="vertical-date-listing">
                                    <ul className="ver-date-list-ul">

                                        {
                                            this.state.daySeries.map((day,key) => {

                                                return <li key={key} onClick = {this.selectDate.bind(this, day.dateNumber, day.day, day.dateString, day.month, day.dateFormat)}  >
                                                       <p className={day.dateNumber == this.state.currentDate ?'date-list-active':(this.props.timeSlots && this.props.timeSlots[day.day==0?6:day.day-1] && this.props.timeSlots[day.day==0?6:day.day-1].length>0)?'abc' :"time-disable"}>{day.dateNumber}
                                                            <span>{day.dateNumber == currentDate?'Today':day.tag}</span>
                                                        </p>
                                                    </li>
                                            })
                                        }
                                        <li className="scrll-date">
                                            <img src={ASSETS_BASE_URL + "/img/right-sc.svg"} />
                                        </li>
                                    </ul>

                                        <input type="date" name="bday" onChange={this.selectDateFromCalendar.bind(this)} onBlur={this.pickDate.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="select-time-slot-container">
                           {
                            this.props.timeSlots && this.props.timeSlots[this.state.currentDay==0?6:this.state.currentDay-1] && this.props.timeSlots[this.state.currentDay==0?6:this.state.currentDay-1].length?
                                <div className="slect-date-img-content">
                                    <div className="date-text-img">
                                        <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                                        <p>Select Time Slot</p>
                                    </div>
                                </div>
                                :<p style={{ textAlign: 'center' }}>Not available on this day.</p>
                           } 
                            
                            {
                                this.props.timeSlots && this.props.timeSlots[this.state.currentDay==0?6:this.state.currentDay-1] && this.props.timeSlots[this.state.currentDay==0?6:this.state.currentDay-1].length?
                                this.props.timeSlots[this.state.currentDay==0?6:this.state.currentDay-1].map((schedule, key) => {
                                    
                                return  schedule.timing.length?
                                        <div key={key} className="select-time-listing-container mt-20">
                                            <div className="time-shift">
                                                {schedule.title}
                                            </div>
                                            <div className="time-slot-main-listing">
                                                <ul className="inline-list time-items">
                                                    {
                                                        schedule.timing.map((time, i) => {
                                                            return <li key={i} className="time-slot-li-listing" onClick={
                                                                this.selectTime.bind(this, time,i, schedule.title)}>
                                                                    <p className={"time-slot-timmings"+(this.isTimeSlotAvailable(time) ? this.state.currentTimeSlot.text == time.text && this.state.selectedSlot == i && this.state.currentTimeSlot.title == schedule.title?" time-active" :''
                                                                        : " time-disable")}>{time.text}</p>
                                                                </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        :''
                                })
                                :''
                            }
                        </div>
                    </div>
                </div>
            )
    }
}

export default DateTimeSelector
