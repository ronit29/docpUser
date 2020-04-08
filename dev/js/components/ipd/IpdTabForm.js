import React from 'react'
import Calendar from 'rc-calendar';
const moment = require('moment');
import SnackBar from 'node-snackbar'
import ThankyouPoup from './ipdThankYouScreen.js'
const queryString = require('query-string')
import GTM from '../../helpers/gtm.js'
import WhatsAppOptinView from '../commons/WhatsAppOptin/WhatsAppOptinView.js'
import NewDateSelector from '../commons/newDateSelector.js'

class IpdTabForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			phone_number: '',
			email: '',
			gender: '',
			dob: '',
			validateError: [],
			dateModal: false,
			formattedDate: '',
			submitFormSuccess: false,
			whatsapp_optin: false,
			isDobValidated:false
		}
	}

	componentDidMount() {
		if (this.props.defaultProfile && !this.state.name && this.props.profiles && this.props.profiles[this.props.defaultProfile] && !this.props.profiles[this.props.defaultProfile].isDummyUser) {
			let userData = this.props.profiles[this.props.defaultProfile]
			this.setState({ name: userData.name || '', phone_number: userData.phone_number + '' || '', email: userData.email || '', gender: userData.gender || '', dob: userData.dob || '', formattedDate: userData.dob || '', isDobValidated:userData.dob?true:false })
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultProfile && !this.state.name && nextProps.profiles && nextProps.profiles[nextProps.defaultProfile] && !nextProps.profiles[nextProps.defaultProfile].isDummyUser) {
			let userData = nextProps.profiles[nextProps.defaultProfile]
			this.setState({ name: userData.name || '', phone_number: userData.phone_number + '' || '', email: userData.email || '', gender: userData.gender || '', dob: userData.dob || '', formattedDate: userData.dob || '', isDobValidated:userData.dob?true:false })
		}
	}

	selectDateFromCalendar(date) {
		if (date) {
			date = date.toDate()
			let formattedDate = this.getFormattedDate(date)
			date = new Date(date).toISOString().split('T')[0]
			this.setState({ dob: date, formattedDate: formattedDate, dateModal: false })
		} else {
			this.setState({ dateModal: false })
		}
	}

	inputHandler(e) {
		if (e.target.name == 'phone_number') {
			e.target.value.length > 10
				? ''
				: this.setState({
					[e.target.name]: e.target.value
				})
		} else {
			this.setState({ [e.target.name]: e.target.value })
		}

	}

	getFormattedDate(date) {
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		var today = yyyy + '-' + mm + '-' + dd;
		return today
	}

	openCalendar() {
		this.setState({ dateModal: true })
	}

	submitClicked() {
		let self = this
		let validateError = []
		if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
			validateError.push('name')
		}


		if (this.state.phone_number.match(/^[56789]{1}[0-9]{9}$/)) {

		} else {
			validateError.push('phone_number')
		}

		if (this.state.email == '') {

			validateError.push('email')
		}

		if (this.state.gender == '') {

			validateError.push('gender')
		}

		if (!this.state.email.match(/\S+@\S+\.\S+/)) {
			validateError.push('email')
		}

		if (this.state.dob == '') {

			validateError.push('dob')
		}

		if(this.state.dob && !this.state.isDobValidated){
			validateError.push('dob')
		}
		
		if (validateError.length) {

			this.setState({ validateError: validateError })
		} else {

			const parsed = queryString.parse(this.props.location.search)


			this.setState({ validateError: validateError })
			let ipd_id = this.props.match.params.id
			if (!ipd_id || ipd_id.includes('price')) {
				ipd_id = ''
			}
			let formData = {
				...this.state,
				ipd_procedure: ipd_id,

			}

			if (parsed.hospital_id) {
				formData.hospital = parsed.hospital_id
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
	        formData.data.formSource = this.props.formSource || 'LeadForm'
	        formData.source = 'Costestimate'
			this.props.submitIPDForm(formData, this.props.selectedLocation, (error, response) => {
				if (!error && response) {
					this.props.ipdPopupFired()
					let gtmData = {
						'Category': 'ConsumerApp', 'Action': 'IpdLeadGenerationSuccess', 'CustomerID': GTM.getUserId() || '', 'leadid': response.id || '', 'event': 'ipd-lead-generation-success', selectedId: ipd_id, 'hospitalId': parsed.hospital_id ? parsed.hospital_id : '','mobileNo': this.state.phone_number
					}
					GTM.sendEvent({ data: gtmData })
					this.setState({ submitFormSuccess: true })
				} else {
					setTimeout(() => {
						SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
					}, 500)
				}
			})
		}


	}

	togglePopup(toggle){
		let formData = {
			name: '',
			phone_number: '',
			email: '',
			gender: '',
			dob: '',
			validateError: [],
			dateModal: false,
			formattedDate: '',
			submitFormSuccess: false
		}
		this.setState({...formData})
		setTimeout(() => {
			SnackBar.show({ pos: 'bottom-center', text: "Record Submitted Successfully" })
		}, 500)
	}

	toggleWhatsap(e) {
        this.setState({ whatsapp_optin: !this.state.whatsapp_optin })
    }

    getNewDate(type,newDate,isValidDob){
        this.setState({ dob: newDate,isDobValidated:isValidDob},()=>{
        })
    }

	render(){
		let { ipd_info } = this.props

		if(this.props.tabView || !(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length))  {
			ipd_info = null
		}

		return(
			<div className={`${this.props.tabView?'':'ipd-section ipd-form-view'}`} style={{ 'marginTop': '11px' }}>
				{
					this.props.match.params.id != 'price' && ipd_info && ipd_info.about && ipd_info.about.name ?
						<h4 className="section-heading pt-0">{`Get Cost Estimate of ${ipd_info.about.name}`}</h4>
						: ''
				}
				{
					( this.props.tabView || !(ipd_info && ipd_info.about && ipd_info.about.name) )?
					<div className="lead-form">
						<h2 className="section-heading hd-mrgn-top">Get Help from Medical Experts</h2>
					
					</div>
					:''	
				}
				
				<div className="info-popup">
					<div className="form-group fm-grp mt-0">
						<div className="lbl-txt">Name:</div>
						<div className="input-form"><input type="text" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('name') > -1 ? 'error-on' : ''}`} name="name" value={this.state.name} onChange={this.inputHandler.bind(this)} /></div>
						{
							this.state.validateError.indexOf('name') > -1 ?
								<span className="error-msg">Required</span>
								: ''
						}
					</div>
					<div className="form-group fm-grp">
						<div className="lbl-txt">Mobile No:</div>
						<div className="input-form"><input type="number" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('phone_number') > -1 ? 'error-on' : ''}`} name="phone_number" value={this.state.phone_number} onChange={this.inputHandler.bind(this)} /></div>
						{
							this.state.validateError.indexOf('phone_number') > -1 ?
								<span className="error-msg">Required</span>
								: ''
						}
					</div>
					<div className="form-group fm-grp emailForm">
						<div className="lbl-txt">Email Id:</div>
						<div className="input-form"><input type="text" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('email') > -1 ? 'error-on' : ''}`} name="email" value={this.state.email} onChange={this.inputHandler.bind(this)} /></div>
						{
							this.state.validateError.indexOf('email') > -1 ?
								<span className="error-msg">Required</span>
								: ''
						}

					</div>
					<div className="form-group fm-grp mrg-mb0">
						<div className="lbl-txt gender-label">Gender:</div>
						<div className="input-form dis-flx">
							<div className="dtl-radio">
								<label className="container-radio">Male
								<input type="radio" name="gender" value="on" checked={this.state.gender == 'm'} onChange={() => this.setState({ gender: 'm' })} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">Female
								<input type="radio" name="gender" value="on" checked={this.state.gender == 'f'} onClick={() => this.setState({ gender: 'f' })} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							<div className="dtl-radio">
								<label className="container-radio">Others
								<input type="radio" name="gender" value="on" checked={this.state.gender == 'o'} onClick={() => this.setState({ gender: 'o' })} />
									<span className="doc-checkmark"></span>
								</label>
							</div>
							{
								this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
									<Calendar
										showWeekNumber={false}
										defaultValue={moment(new Date())}
										disabledDate={(date) => {
											return date.diff(moment((new Date)), 'days') > -1
										}}
										showToday
										onSelect={this.selectDateFromCalendar.bind(this)}
									/>
								</div></div> : ""
							}
						</div>
						{
							this.state.validateError.indexOf('gender') > -1 ?
								<span className="error-msg gender-error-msg">Required</span>
								: ''
						}
					</div>
					<div className="form-group fm-grp mrg-mt0 slt-nw-input summery-dob-cont">
						<div className="lbl-txt">DOB:
						<p className="dob-input-sub">dd/mm/yyyy</p>
						</div>
						<div className="input-form">
							{/*<input type="text" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('dob') > -1 ? 'error-on' : ''}`} name="dob" value={this.state.formattedDate} onClick={this.openCalendar.bind(this)} onFocus={this.openCalendar.bind(this)} />*/}
							<NewDateSelector {...this.props} getNewDate={this.getNewDate.bind(this)} is_dob_error={this.state.is_dob_error} old_dob={this.state.dob} is_summary={true}/>
							</div>
						{
							!this.state.dob && this.state.validateError.indexOf('dob') > -1 ?
								<span className="error-msg">Required</span>
								: ''
						}
					</div>
					{/*<div className="mrb-15">
                         <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Enable <span className="sm-wtsp-img"><img src={ASSETS_BASE_URL + "/img/wa-logo-sm.png"} />WhatsApp</span> notification<input type="checkbox" onChange={this.toggleWhatsap.bind(this)} checked={this.state.whatsapp_optin} /><span className="checkmark"></span>
                         </label>
                	</div>*/}
					{
					this.props.tabView?
						<div className={`${this.props.tabView?'text-center':'btn-search-div btn-apply-div btn-sbmt btncallback'}`}>
							<a href="javascript:void(0);" className="ipd-frm-btn" onClick={this.submitClicked.bind(this)}>Submit</a>
						</div>
						:''
					}
				</div>
				{
					this.props.tabView?''
					:<div className={`${this.props.tabView?' btn-apply-div  mt-20':'btn-search-div btn-apply-div btn-sbmt btncallback'}`}>
						<a href="javascript:void(0);" className="btn-search" onClick={this.submitClicked.bind(this)}>Submit</a>
					</div>
				}
				{
					this.state.submitFormSuccess ?
						<ThankyouPoup {...this.props} togglePopup={this.togglePopup.bind(this)}/>
						: ''
				}

			</div>
			)
	}
}

export default IpdTabForm