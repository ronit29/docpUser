import React from 'react'
import Calendar from 'rc-calendar';
const moment = require('moment');

const DAYS_TO_SHOW = 40
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const queryString = require('query-string');
import STORAGE from '../../../helpers/storage'

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

        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedSlot.time && this.props.selectedSlot.time.text) {
            this.props.enableProceed(true)
            
            this.generateDays(true, this.props.selectedSlot.date)
        } else {
        	this.generateDays()
        }

    }

    generateDays(getNewDates = false, selectedDate = ''){
        let offset, currentDate
        
        let dateCount = 1
        let totalDateVisited = 1
        let daySeries = []

        if (getNewDates) {
            offset = new Date(selectedDate)
            currentDate = new Date(selectedDate)

        } else {
            offset = new Date()
            currentDate = new Date()

        }
        let formattedDate = this.getFormattedDate(offset)
        daySeries.push({
            dateFormat: new Date(offset),
            formattedDate: formattedDate
        })


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
        this.setState({ daySeries: daySeries  })
    }

	openDateModal() {
        this.setState({ dateModal: !this.state.dateModal })
    }

    selectDate(dateFormat) {
    	if(new Date(this.state.selectedDateSpan).toDateString() != new Date(dateFormat).toDateString()){
    		this.setState({ selectedDateSpan: dateFormat, currentTimeSlot: {} })
        	this.props.enableProceed(false, [])	
    	}
	    
    }

    selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            this.setState({ selectedDateSpan: new Date(date), dateModal: false }, () => {
                this.pickDate()
            })
        } else {
            this.setState({ dateModal: false })
        }
    }

    pickDate() {
        if (this.state.selectedDateSpan) {
            let selectedDate = new Date(this.state.selectedDateSpan)
            this.generateDays(true, selectedDate)
            this.selectDate(selectedDate)
        }
    }

    selectTime(time, title) {
       
        let self = this
        let timeSpan = Object.assign({}, time)
        timeSpan.title = title
        this.setState({ currentTimeSlot: timeSpan }, () => {
            let data = {
                date: self.state.selectedDateSpan,
                month: MONTHS[new Date(self.state.selectedDateSpan).getMonth()],
                slot: '',
                time: self.state.currentTimeSlot
            }
            self.props.enableProceed(false, data)
        })
    }

     getFormattedDate(date){
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

	render(){

        const parsed = queryString.parse(this.props.location.search)
        let type = 1
        if(parsed.type && parsed.type == 'opd'){
            type = 0
        }

        let selectedFormattedDate = this.getFormattedDate(this.state.selectedDateSpan)

		return(
			<div className="widget mrng-top-12">
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
                                        this.props.daySeries && this.props.daySeries.length && this.state.daySeries[0].dateFormat > new Date()
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
                                                return date.diff(moment((new Date)), 'days') < 0 || date.diff(moment((new Date)), 'days') > 30
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
				                <div className="date-text-img">
				                    <img src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
				                    <p>Select Time Slot</p>
				                </div>
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
			)
	}
}

export default DateTimePicker
