import React from 'react'
import { connect } from 'react-redux'
import { submitSecondIPDForm, ipdPopupFired } from '../../actions/index.js'
import SnackBar from 'node-snackbar'
import GTM from '../../helpers/gtm.js'
const queryString = require('query-string')
import DateSelector from '../../components/commons/DateSelector'
import Calendar from 'rc-calendar';
const moment = require('moment');

class IpdDoctorCityPopup extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedDoctor: '',
			selectedDoctorId:'',
			selectedCity:this.props.all_cities && this.props.all_cities.length?this.props.all_cities[0].name:'',
			dob:'',
			requested_date_time: new Date().toDateString(),
			timeSlot: '',
			dateModal: false,
			requestedDateFormat: this.getFormattedDate(new Date()),
			requested_date_format: new Date()
		}
	}

	submitClicked(){
		this.isDateSelected()
		setTimeout(()=>{
			this.submitLeadForm()
		},0)
	}

	submitLeadForm() {

		let doctor=''
		let city=''

		if (!this.state.selectedDoctor && this.props.hospitalProfilePage) {
			setTimeout(() => {
				SnackBar.show({ pos: 'bottom-center', text: "Please select the Doctor" })
			}, 500)
			return
		}else {
			doctor = this.props.all_doctors.filter(x=>x.name==this.state.selectedDoctor).map(x=>x.id)
		}

		if(!this.state.requested_date_format){
			setTimeout(() => {
				SnackBar.show({ pos: 'bottom-center', text: "Please select the Date" })
			}, 500)
			return
		}

		if(!this.state.timeSlot || !(parseInt(this.state.timeSlot))){
			setTimeout(() => {
				SnackBar.show({ pos: 'bottom-center', text: "Please select the Time Slots" })
			}, 500)
			return
		}

		if (!this.state.dob) {
			setTimeout(() => {
				SnackBar.show({ pos: 'bottom-center', text: "Please enter DOB" })
			}, 500)
			return
		}

		if (!this.state.selectedCity) {
			setTimeout(() => {
				SnackBar.show({ pos: 'bottom-center', text: "Please select the City" })
			}, 500)
			return
		}else {
			city = this.props.all_cities.filter(x=>x.name==this.state.selectedCity).map(x=>x.id)
		}

		const parsed = queryString.parse(this.props.location.search)

		let formData = {
			dob:this.state.dob,
			doctor:doctor.length?doctor[0]:'',
			matrix_city: city.length?city[0]:'',
			city: this.state.selectedCity,
			id: this.props.firstLeadId
		}

		if(this.state.requested_date_format) {
			let requestedDate = new Date(this.state.requested_date_format)
			let month = parseInt(requestedDate.getMonth())+1
			let year = parseInt(requestedDate.getFullYear())
			let day = parseInt(requestedDate.getDate())
			let time = parseInt(this.state.timeSlot)
			let dateFormat = `${year}-${month>=10?month:`0${month}`}-${day>=10?day:`0${day}`}T${time>10?`${time}`:`0${time}`}:00`
			formData.requested_date_time = dateFormat
		}

		if (this.props.hospital_id) {
			formData.hospital = this.props.hospital_id
		}

		if (this.props.procedure_id) {
			formData.ipd_procedure = this.props.procedure_id
		}

		if (this.props.doctor_id) {
			formData.doctor = parseInt(this.props.doctor_id)
		}

		let utm_tags = {
			utm_source: parsed.utm_source || '',
			utm_medium: parsed.utm_medium || '',
			utm_term: parsed.utm_term || '',
			utm_campaign: parsed.utm_campaign || '',
			referrer: document.referrer || '',
			gclid: parsed.gclid || ''
		}

		formData.data = {}
		formData.data.utm_tags = utm_tags
		formData.data.url = window.location.href
		formData.data.formSource = this.props.formSource || 'PopupLeadForm'
		if (this.props.sourceTag) {
			formData.source = this.props.sourceTag
		}

		

		this.props.submitSecondIPDForm(formData, this.props.selectedLocation, (error, response) => {
			if (!error && response) {
				let gtmData = {
					'Category': 'ConsumerApp', 'Action': 'IPD-popup-lead', 'CustomerID': GTM.getUserId() || '', 'leadid': this.props.firstLeadId || '', 'event': 'IPD-popup-lead', selectedId: '', 'hospitalId': '', 'from': 'leadForm', 'mobileNo':this.state.phone_number, 'formNo':'2'
				}
				GTM.sendEvent({ data: gtmData })

				this.props.ipdPopupFired()

				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Your request has been submitted sucessfully" })
				}, 500)

			} else {
				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
				}, 500)
			}
			this.props.secondIpdFormSubmitted()
		})

	}

	closePopUpClicked() {
		this.props.secondIpdFormSubmitted()
	}

	redirectToChat() {
		/*let params = JSON.stringify(this.state)
		this.props.history.push(`/mobileviewchat?product=IPD&params=${params}&source=${this.props.hospital_id}`)*/
	}

	isDateSelected(){
		this.child.getSelectedDate()
	}

	getSelectedDate(date){
		if(!date || !date.year || !date.month || !date.day){
			return false
		}else {
			let dob = `${date.year}-${date.month>=10?date.month:`0${date.month}`}-${date.day>=10?date.day:`0${date.day}`}`
			this.setState({dob:dob})
			return true
		}
	}

	getTimeSlots(){
		let offset =  new Date()
		let currentTime = 8
		let timeSlot = []
		if(new Date(this.state.requested_date_format).toDateString() == new Date().toDateString()){
			currentTime = parseInt(new Date().toLocaleTimeString()) + 1
		}
		for(var i=currentTime ;i<=20;i++){
			offset.setHours(i)
			timeSlot.push(<option key={i} defaultValue="">{offset.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</option>)
		}
		if(!timeSlot.length) {
			timeSlot.push(<option key={'0'} defaultValue="">Choose another date</option>)	
		}
		return timeSlot
	}

	openDateModal() {
        this.setState({ dateModal: !this.state.dateModal })
    }

    selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            let dateFormat = new Date(date)
            date = this.getFormattedDate(date)
            this.setState({ dateModal: false, requestedDateFormat: date, requested_date_format:dateFormat })
        } else {
            this.setState({ dateModal: false })
        }
    }

    getFormattedDate(date){
    	date = new Date(date)
    	let month = parseInt(date.getMonth())+1
        let day = date.getDate()
    	return `${day>=10?day:`0${day}`}-${month>=10?month:`0${month}-${date.getFullYear()}`}`
    }

	render() {
		const parsed = queryString.parse(this.props.location.search)

		return (
			<div className="search-el-popup-overlay cancel-overlay-zindex" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				//this.closePopUpClicked()
			}}>
				<div className="search-el-popup ipd-pop-width">
					<div className="widget p-12">
						<div className="p-relative">
							<span className="ipd-pop-ild" onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								this.closePopUpClicked()
							}}><img src={ASSETS_BASE_URL + "/img/icons/close.png"} />
							</span>
							{/*<p className="ipd-needHelp">Need help with an appointment at Fortis Hospital?</p>*/}
							{
								this.props.doctor_name?
								<p className="ipd-needHelp">{`Need to book an appointment with ${this.props.doctor_name} ${this.props.hospital_name?`at ${this.props.hospital_name}?`:''}`}</p>
								:this.props.hospital_name?
								<p className="ipd-needHelp">{`Need help with an appointment ${this.props.hospital_name?`at ${this.props.hospital_name}?`:''}`}</p>
								:''
							}
							{/*<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span>Get upto 30% Off on Appointments</span></p>
							<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span>Instant Booking Confirmation</span></p>
							<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span>Dedicated Doctor for Advice</span></p>*/}
							<div className="ipd-pop-scrl">
								<div className="ipd-inp-section" onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()}}>
									{
										this.props.all_doctors && this.props.all_doctors.length?
										<div className="ipd-slects-doc">
											<select defaultValue={this.state.selectedDoctor} onChange={ (e)=> this.setState({'selectedDoctor': e.target.value}) }>
												<option defaultValue="">*Select Doctor</option>
												{
													this.props.all_doctors.map((doctor, key)=>{

														return <option key={key} id={doctor.id} defaultValue="">{doctor.name}</option>
													})
												}
											</select>
										</div>:''
									}
									<div className="nm-lst-inputcnt justify-content-between">
										<div className="sel-ipd-input-cnt" style={{width: '48%' }}>
											<img src={ASSETS_BASE_URL + "/img/calnext.svg"} />
											<input className="slct-inpt-cntnr-fcs" onClick={this.openDateModal.bind(this)} onChange={()=>{}} value={this.state.requestedDateFormat} />
										</div>
										{
		                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
		                                        <Calendar
		                                            showWeekNumber={false}
		                                            disabledDate={(date) => {
		                                                return date.diff(moment((new Date)), 'days') < 0 || date.diff(moment((new Date)), 'days') > 30
		                                            }}
		                                            showToday
		                                            onSelect={this.selectDateFromCalendar.bind(this)}
		                                        />
		                                    </div></div> : ""
		                                }
										<div className="sel-ipd-input-cnt" style={{width: '48%'}}>
											<img src={ASSETS_BASE_URL + "/img/calnext.svg"} />
											<div className="ipd-slects-doc">
												<select className="slct-ipn-ti" defaultValue={this.state.timeSlot} onChange={ (e)=> this.setState({'timeSlot': e.target.value}) }>
													<option defaultValue="">*Select Time</option>
													{
														this.getTimeSlots()
													}
												</select>
											</div>
										</div>
									</div>
									<div className="ipd-dob-cont">
										<div className="ipd-db-hdng">*Date of birth:</div>
										<DateSelector getSelectedDate={this.getSelectedDate.bind(this)} onRef={ref => (this.child = ref)}/>
									</div>
									{/*<div className="ipd-lead-textarea">
										<textarea placeholder="*Your City" style={{ fontWeight: 500 }} rows='1' name='comments'></textarea>
									</div>*/}
									{
										this.props.all_cities && this.props.all_cities.length?
										<div className="ipd-slects-doc">
											<select defaultValue={this.state.selectedCity} onChange={ (e)=> this.setState({'selectedCity': e.target.value}) }>
												{/*<option value="">*Select City</option>
												*/}{
													this.props.all_cities.map((city, key)=>{

														return <option key={key}  id={city.id} defaultValue="">{city.name}</option>
													})
												}
											</select>
										</div>:''
									}
									<div className="skip-btn-sgn">
										<button className="ipd-inp-sbmt" onClick={this.submitClicked.bind(this)}>Submit</button>
										<p onClick={(e) => {
											e.preventDefault()
											e.stopPropagation()
											this.closePopUpClicked()
										}}>Skip</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, passedProps) => {

	const {
		selectedLocation
	} = state.SEARCH_CRITERIA_OPD

	return {
		selectedLocation
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		submitSecondIPDForm: (formData, selectedLocation, cb) => dispatch(submitSecondIPDForm(formData, selectedLocation, cb)),
		ipdPopupFired: ()=> dispatch(ipdPopupFired())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdDoctorCityPopup)