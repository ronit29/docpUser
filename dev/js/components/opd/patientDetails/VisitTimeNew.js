import React from 'react';
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

class VisitTimeNew extends React.Component {
    constructor(props) {
        super(props)
    }

    getTimeSlots(){
        let today = new Date().getDay() == 0?6:new Date().getDay()-1
        let currentTimeSlotDay = today 
        let currentTime = (new Date().getHours() + new Date().getMinutes())/60
        let availableTimeSlots = []
        let selectedTimeSlotDate = new Date()

        //Check if any timeslot available in current day
        if(this.props.timeSlots && this.props.timeSlots[today] && this.props.timeSlots[today].length){

            this.props.timeSlots[today].map((time)=>{

                time.timing.map((timeSlot)=>{
                    if(timeSlot.value> currentTime){

                        let isAvailable = this.isTimeSlotAvailable(timeSlot, selectedTimeSlotDate)
                        let time = isAvailable?timeSlot:[]
                        availableTimeSlots = availableTimeSlots.concat(time)

                    }
                })
            })
        }

        //Check for timeslots on other days, only if there is no timeslot available today
        if(availableTimeSlots.length == 0){
            currentTimeSlotDay = currentTimeSlotDay==6?0:currentTimeSlotDay+1
            
            while(currentTimeSlotDay != today && availableTimeSlots.length==0){
                selectedTimeSlotDate.setDate(selectedTimeSlotDate.getDate() + 1)

                if(this.props.timeSlots && this.props.timeSlots[currentTimeSlotDay] && this.props.timeSlots[currentTimeSlotDay].length){

                    this.props.timeSlots[currentTimeSlotDay].map((time)=>{

                        time.timing.map((timeSlot)=>{

                            if(timeSlot.value>=10.5 && timeSlot.value<=19.75){

                                let isAvailable = this.isTimeSlotAvailable(timeSlot, selectedTimeSlotDate)
                                if(isAvailable){

                                    let timeData = Object.assign({}, timeSlot)
                                    timeData.title = time.title
                                    availableTimeSlots = availableTimeSlots.concat(timeData)
                                }
                            }
                        })
                    })
                }
                currentTimeSlotDay = currentTimeSlotDay==6?0:currentTimeSlotDay+1
            }
        }

        return availableTimeSlots.slice(0,3).map((time, i)=>{
            return <li key={i} className="time-slot-li-listing" onClick={
                this.selectTime.bind(this, time, selectedTimeSlotDate)}>
                <p className={"time-slot-timmings" + this.props.selectedSlot.value == time.value? " time-active" : ''}>{time.text}</p>
            </li>
        })
    } 

    selectTime(time, selectedTimeSlotDate) {
   
        let self = this
        let timeSpan = Object.assign({}, time)
        timeSpan.title = time.title

        let data = {
            date: selectedTimeSlotDate,
            month: MONTHS[new Date(selectedTimeSlotDate).getMonth()],
            slot: '',
            time: timeSpan
        }
        this.props.selectTimeSlot(data)
    } 

    isTimeSlotAvailable(timeSlot, currentDate) {

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)

        let dateAfterOneHour = new Date(currentDate).setHours(today.getHours()+1)

        if(timeSlot.on_call && today.toDateString() == new Date(currentDate).toDateString()){
            return false
        }

        if(new Date(dateAfterOneHour).toDateString() == today.toDateString() && (new Date(dateAfterOneHour).getHours() + new Date(dateAfterOneHour).getMinutes()/60 )>timeSlot.value){
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

    render() {

        let { date, time } = this.props.selectedSlot

        if (date) {
            date = new Date(date).toDateString()
        }
        return (
            <div className={`widget mrb-15 ${this.props.timeError ? 'rnd-error-nm' : ''}`}>
                <div className="widget-content pos-relative">
                    <div className="lab-visit-time d-flex jc-spaceb">
                        <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/watch-date.svg"} className="visit-time-icon" /></span>Visit Time</h4>
                        {this.getTimeSlots()}
                        <div className="float-right  mbl-view-formatting text-right">
                            <h4 className="date-time title">{date || ""} {time.text ? "|" : ""} {time.text} {time.text ? (time.value >= 12 ? 'PM' : 'AM') : ''}</h4>
                            {
                                !this.props.hideChangeTime ? <a href="" onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    this.props.navigateTo('time')
                                }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Select"} Time</a> : ""
                            }
                        </div>
                    </div>
                    {
                        this.props.timeError ? <span className="fw-500 time-error nw-error">Required</span> : ''
                    }
                </div>
            </div>
        );
    }
}


export default VisitTimeNew
