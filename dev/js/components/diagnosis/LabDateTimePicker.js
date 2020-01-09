import React from 'react'
import Calendar from 'rc-calendar';
const moment = require('moment');

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const queryString = require('query-string');
import STORAGE from '../../helpers/storage'
import Loader from '../commons/Loader'
import GTM from '../../helpers/gtm.js'

class DateTimePicker extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			selectedDateSpan: props.selectedSlot && props.selectedSlot.date?new Date(props.selectedSlot.date):new Date(),
			currentTimeSlot: props.selectedSlot && props.selectedSlot.time ? props.selectedSlot.time : {},
			dateModal: false,
			daySeries:[]
		}
	}

	componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        //If time is already selected by user , then on every page load we by default select that time 
        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedSlot.time && this.props.selectedSlot.time.text) {
            this.props.enableProceed(true)
            
            this.generateDays(true, this.props.selectedSlot.date)
        } else {
            this.props.enableProceed(false)
            let getUpcomingDate= false
            let upcoming_time = null

/*            if(this.props.selectedDateFormat) {
                upcoming_time = this.props.selectedDateFormat
            
            }else{
                
            }*/
            upcoming_time = this.getFormattedDate(new Date())
            /*else if(this.props.upcoming_slots && Object.keys(this.props.upcoming_slots).length){
                upcoming_time = Object.keys(this.props.upcoming_slots)[0]
            }*/


            if(upcoming_time && this.props.timeSlots[upcoming_time]){
                getUpcomingDate = true
                this.setState({selectedDateSpan: new Date(upcoming_time)})
                this.generateDays(true, new Date(upcoming_time))
            }

            if(!getUpcomingDate){
                if(this.props.is_thyrocare){
                    let nextDate = new Date()
                    nextDate.setDate(new Date().getDate() + 1)
                    this.setState({selectedDateSpan: nextDate})
                }
                this.generateDays()   
            }
        }

    }

    generateDays(getNewDates = false, selectedDate = ''){
        //This function will generate dummy dates ,starting from the getNewDates parameter
        let offset= new Date()
        let currentDate = new Date()
        
        let dateCount = 1
        let totalDateVisited = 1
        let daySeries = []

        if (getNewDates) {
            offset = new Date(selectedDate)
            currentDate = new Date(selectedDate)

        } else {

            if(this.props.is_thyrocare){
                offset.setDate(new Date().getDate() + 1)
                currentDate.setDate(new Date().getDate() + 1)
            }
        }
        let formattedDate = this.getFormattedDate(offset)
        daySeries.push({
            dateFormat: new Date(offset),
            formattedDate: formattedDate
        })

        if(!this.props.is_thyrocare){
            while(dateCount!=3 && totalDateVisited<30){
                offset.setDate(currentDate.getDate() + totalDateVisited)
                let formattedDate = this.getFormattedDate(offset)

                if(this.props.timeSlots && this.props.timeSlots[formattedDate] && this.props.timeSlots[formattedDate].length){

                    daySeries.push({
                        dateFormat: new Date(offset),
                        formattedDate: formattedDate
                    })
                    dateCount++
                }
                totalDateVisited++
                offset = new Date(currentDate)
            }
        }else{
            //Day 2 for thyrocare
            offset.setDate(offset.getDate() + 1)
            let formattedDate = this.getFormattedDate(offset)
            daySeries.push({
                dateFormat: new Date(offset),
                formattedDate: formattedDate
            })

            //Day 3 for thyrocare
            offset.setDate(offset.getDate() + 1)
            formattedDate = this.getFormattedDate(offset)
            daySeries.push({
                dateFormat: new Date(offset),
                formattedDate: formattedDate
            })            
        }
        this.setState({ daySeries: daySeries  })
    }

	openDateModal() {
        //open calendar modal
        this.setState({ dateModal: !this.state.dateModal })
    }

    selectDate(dateFormat) {
        //funciton calls when user select the date 
        let formattedDate = this.getFormattedDate(dateFormat)

    	if(new Date(this.state.selectedDateSpan).toDateString() != new Date(dateFormat).toDateString()){
    		
            if(this.props.timeSlots && this.props.timeSlots[formattedDate]){

            } else{
                this.props.getTimeSlots(dateFormat)

            }
            this.setState({ selectedDateSpan: dateFormat, currentTimeSlot: {} })
        	this.props.enableProceed(false, [], this.props.type)	
    	}else {
            
        }
	    
    }

    selectDateFromCalendar(date) {
        //funciton calls when user select the date from the date calendar
        if (date) {
            date = date.toDate()
            this.setState({ dateModal: false }, () => {
                //this.props.enableProceed(false, [])
                this.pickDate(new Date(date))
            })
        } else {
            this.setState({ dateModal: false })
        }
    }

    pickDate(date) {
        if (date) {
            let selectedDate = new Date(date)
            this.generateDays(true, selectedDate)
            this.selectDate(selectedDate)
        }
    }

    selectTime(time, title) {
        //function calls when user select the time
        let self = this
        let timeSpan = Object.assign({}, time)
        timeSpan.title = title
        this.setState({ currentTimeSlot: timeSpan }, () => {
            let data = {
                date: self.state.selectedDateSpan,
                month: MONTHS[new Date(self.state.selectedDateSpan).getMonth()],
                slot: '',
                time: self.state.currentTimeSlot,
                type: this.props.type||'',
                test_id: this.props.test_id || '',
                test_name: this.props.test_name
            }
            self.props.enableProceed(false, data, this.props.type)
        })
    }

     getFormattedDate(date){
        //generate date in yyyy-mm-dd format
        date = new Date(date)
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        }

        var today = yyyy+'-'+mm+'-'+dd;
        return today
    }

    toggleOptions(isAvailable = false){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'BookSeperatelyClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'book-seperately-clicked', 'isAvailable': isAvailable
        }

        GTM.sendEvent({ data: data })
        this.props.toggle('seperately')
    }

	render(){

        let upperDisableDateLimit = this.props.is_thyrocare?7:30
        let nextDate = new Date()
        nextDate.setDate(nextDate.getDate() + 1)
        let lowerDisableDateLimit = this.props.is_thyrocare?nextDate:new Date()

        let selectedFormattedDate = this.getFormattedDate(this.state.selectedDateSpan)

		return(
            <React.Fragment>
            {
                this.props.hide_toggle?
                    this.state.daySeries.length && this.props.timeSlots && this.props.timeSlots[selectedFormattedDate] && this.props.timeSlots[selectedFormattedDate].length || true?
                    <div className="time-slot-wrng-cont">
                        <img src={ASSETS_BASE_URL + "/img/tm-wrng.png"} />
                        <p>Showing common time slots where all tests are available.For more options you can <span className="cursor-pntr" onClick={()=>this.toggleOptions(true)}>Book Separately</span></p>
                    </div>
                    :<div className="time-slot-wrng-cont">
                        <img src={ASSETS_BASE_URL + "/img/tm-wrng.png"} />
                        <p>Both test can’t be book for the same time. You can <span className="cursor-pntr" onClick={()=>this.toggleOptions()}>Book Separately</span></p>
                    </div>
                :''
            }
			<div className="widget mrng-top-12">
                {
                    this.props.is_radiology?
                    <span className="tm-slot-hdng">{this.props.nameHeading}</span>
                    :this.props.nameHeading && Array.isArray(this.props.nameHeading)?
                        this.props.nameHeading.map((test, i)=>{
                            return <span key={i} className="tm-slot-hdng">{test.name}</span>
                        })
                    :''
                }
                <div className="time-slot-container">
                    <div className="vertical-date-select-container">
                        <div className="slect-date-heading">
                            <div className="slect-date-img-content">
                                <div className="date-text-img">
                                    <img src={ASSETS_BASE_URL + "/img/new-cal.svg"} />
                                    <p>Select Appointment Date</p>
                                </div>
                            </div>
                            <div className="vertical-date-listing">
                                <ul className="ver-date-list-ul">
                                    {
                                        this.state.daySeries && this.state.daySeries.length && this.state.daySeries[0].dateFormat > new Date()
                                        ?<li className="scrll-date" onClick={this.openDateModal.bind(this)}>
                                            <img src={ASSETS_BASE_URL + "/img/right-sc.svg"} style={{transform:'rotate(180deg)'}} />
                                        </li>
                                        :''    
                                    }
                                    
                                    {
                                        this.state.daySeries.map((day, key) => {

                                            return <li key={key} onClick={this.selectDate.bind(this, day.dateFormat)}>
                                                <p className={new Date(day.dateFormat).toDateString() == new Date(this.state.selectedDateSpan).toDateString() ? 'date-list-active':''}>{new Date(day.dateFormat).getDate()}
                                                    <span>{new Date(day.dateFormat).toDateString() == new Date().toDateString() ? 'Today' : WEEK_DAYS[(new  Date(day.dateFormat)).getDay()]}</span>
                                                </p>
                                            </li>
                                        })
                                    }
                                    <li className="scrll-date" onClick={this.openDateModal.bind(this)}>
                                        <img style={{width:'22px', top:'10px'}} src={ASSETS_BASE_URL + "/img/calnext.svg"} />
                                    </li>
                                </ul>

                                {
                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
                                        <Calendar
                                            showWeekNumber={false}
                                            defaultValue={moment(this.state.selectedDateSpan)}
                                            disabledDate={(date) => {
                                                return date.diff(moment((lowerDisableDateLimit)), 'days') < 0 || date.diff(moment((new Date)), 'days') > upperDisableDateLimit
                                            }}
                                            showToday
                                            onSelect={this.selectDateFromCalendar.bind(this)}
                                        />
                                    </div></div> : ""
                                }

                            </div>
                        </div>
                    </div>

                    {
                    	this.state.daySeries.length?
                    	<div className="select-time-slot-container">
				            <div className="slect-date-img-content mb-0">
                                {
                                    this.props.timeSlots && this.props.timeSlots[selectedFormattedDate] && this.props.timeSlots[selectedFormattedDate].length
                                        ?<div className="date-text-img">
                                            <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                                            <p>Select Time Slot</p>
                                        </div>
                                        :<div className="select-time-slot-container">
                                            <p style={{ textAlign: 'center' }}>Not available on this day.</p>
                                        </div>
                                }
				                
				            </div>
				            {
				            	this.props.timeSlots && this.props.timeSlots[selectedFormattedDate]?
				            	this.props.timeSlots[selectedFormattedDate].map((schedule, key) => {

				            		return schedule.timing && schedule.timing.length?
				            		<div key={key} className="select-time-listing-container">
					                    <div className="time-shift">
					                        {schedule.title}
					                    </div>
					                    <div className="time-slot-main-listing">
					                        
					                        <ul className="inline-list time-items">
					                            {
					                            	schedule.timing.map((time, i)=> {
					                            		return <li key={i} className="time-slot-li-listing" onClick={
									                        this.selectTime.bind(this, time, schedule.title) }>
									                        <p className={`time-slot-timmings ${this.state.currentTimeSlot.value == time.value? " time-active" : ''}`}>{time.text}</p>
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
				        :<div className="select-time-slot-container">
				            <p style={{ textAlign: 'center' }}>Not available on this day.</p>
				        </div>

                    }
                </div>
            </div>
            </React.Fragment>
			)
	}
}

export default DateTimePicker
