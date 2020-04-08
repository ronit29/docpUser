import React from 'react'
import { connect } from 'react-redux'
import { submitIPDForm, ipdPopupFired, saveIpdPopupData } from '../../actions/index.js'
import SnackBar from 'node-snackbar'
import GTM from '../../helpers/gtm.js'
const queryString = require('query-string')

class IpdLeadForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			first_name: '',
			last_name: '',
			phone_number: '',
			showForm: true,
			comments: '',
			gender: ''
			/*			gender: '',
						comments: '',
						whatsapp_optin: true*/
		}
	}

	inputHandler(e) {
		e.stopPropagation()
		if (e.target.name == 'phone_number') {
			e.target.value.length <= 10
				? e.target.value.length == 10
					? this.setState({
						[e.target.name]: e.target.value
					})
					: this.setState({
						[e.target.name]: e.target.value
					})
				: ''
		} else {
			this.setState({ [e.target.name]: e.target.value })
		}

	}

	submitLeadForm() {
		if (!this.state.first_name.match(/^[a-zA-Z ]+$/)) {
			setTimeout(() => {
				if (!this.state.first_name) {
					SnackBar.show({ pos: 'bottom-center', text: "Please enter patient's name." })
				} else {
					SnackBar.show({ pos: 'bottom-center', text: "Name should only contain alphabets." })
				}
			}, 500)
			return
		}

		if (this.state.phone_number.match(/^[56789]{1}[0-9]{9}$/)) {

		} else {
			SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Mobile No" })
			return
		}

		if (!this.state.gender) {
			SnackBar.show({ pos: 'bottom-center', text: "Please select your Gender" })
			return
		}

		if (!this.state.comments) {
			SnackBar.show({ pos: 'bottom-center', text: "Please enter your Comment" })
			return
		}

		const parsed = queryString.parse(this.props.location.search)

		let formData = {
			...this.state
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

		this.props.submitIPDForm(formData, this.props.selectedLocation, (error, response) => {
			if (!error && response) {
				//Save popup data for doctor profile data auto filled
				if (this.props.is_booking_page) {
					this.props.saveIpdPopupData('popup1', formData)
				}
				this.props.ipdPopupFired()
				if (this.props.saveLeadIdForUpdation && typeof (this.props.saveLeadIdForUpdation) == 'function') {
					this.props.saveLeadIdForUpdation(response)
				}
				if (this.state.first_name && this.state.first_name.includes('test')) {

				} else {
					let gtmData = {
						'Category': 'ConsumerApp', 'Action': 'IPD-popup-lead', 'CustomerID': GTM.getUserId() || '', 'leadid': response.id || '', 'event': 'IPD-popup-lead', selectedId: '', 'hospitalId': '', 'from': 'leadForm', 'mobileNo': this.state.phone_number
					}
					GTM.sendEvent({ data: gtmData })
				}

				if (this.props.noToastMessage) {

				} else {
					setTimeout(() => {
						SnackBar.show({ pos: 'bottom-center', text: "Your request has been submitted sucessfully" })
					}, 500)
				}
				this.setState({ showForm: false })
			} else {
				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
				}, 500)
			}
			this.props.submitLeadFormGeneration(this.state)
		})

	}

	closePopUpClicked(skip = false) {
		if (skip) {
			let gtmData = {
				'Category': 'ConsumerApp', 'Action': 'IPD-1popup-skip-clicked', 'CustomerID': GTM.getUserId() || '', 'event': 'IPD-1popup-skip-clicked', 'formNo': '1'
			}
			GTM.sendEvent({ data: gtmData })
		}
		const parsed = queryString.parse(this.props.location.search)
		if ((parsed.get_feedback && parsed.get_feedback == '1') || this.props.forcedPopup) {
			SnackBar.show({ pos: 'bottom-center', text: "Please fill the feedback form" })
		} else {
			this.redirectToChat()
			this.props.submitLeadFormGeneration(this.state)
		}
	}

	redirectToChat() {
		/*let params = JSON.stringify(this.state)
		this.props.history.push(`/mobileviewchat?product=IPD&params=${params}&source=${this.props.hospital_id}`)*/
	}

	toggleWhatsap(e) {
		this.setState({ whatsapp_optin: !this.state.whatsapp_optin })
	}

	getSpecializationNames(specializationData) {
		try {
			return specializationData.map(x => x.name).join(',')
		} catch (e) {

		}
	}

	render() {
		const parsed = queryString.parse(this.props.location.search)
		let specialization_name = null
		let vowels = 'aeiou'
		let is_vowel = false
		if (this.props.specialization_data && this.props.specialization_data.length) {
			specialization_name = this.getSpecializationNames(this.props.specialization_data) || ''

			if (specialization_name && specialization_name.length && vowels.includes(specialization_name[0].toLowerCase())) {
				is_vowel = true
			}
		}


		return (
			<div className="search-el-popup-overlay cancel-overlay-zindex" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				this.closePopUpClicked()
			}}>
				<div className="search-el-popup ipd-pop-width booking-popup" onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()

				}}>
					<div className="widget p-12">
						{
							this.state.showForm ?
								<div className="p-relative">
									{
										/*(parsed.get_feedback && parsed.get_feedback == '1') || this.props.forcedPopup ? ''
											: <span className="ipd-pop-cls" onClick={(e) => {
												e.stopPropagation()
												e.preventDefault()
												this.closePopUpClicked()
											}}><img src={ASSETS_BASE_URL + "/img/icons/close.png"} />
											</span>*/
									}
									{
										specialization_name ?
											<p className="ipd-needHelp">{`Need an appointment with ${is_vowel ? 'an' : 'a'} ${specialization_name} ${this.props.hospital_name ? `at ${this.props.hospital_name}?` : ''}`}</p>
											: this.props.doctor_name ?
												<p className="ipd-needHelp">{`Need to book an appointment with ${this.props.doctor_name} ${this.props.hospital_name ? `at ${this.props.hospital_name}?` : ''}`}</p>
												: this.props.hospital_name ?
													<p className="ipd-needHelp">{`Need help with an appointment ${this.props.hospital_name ? `at ${this.props.hospital_name}?` : ''}`}</p>
													: ''
									}

									{
										this.props.procedure_name ? <section>
											<p className="ipd-needHelp">{`Need help with ${this.props.procedure_name}?`}</p></section>
											: ''
									}

									{/*
										parsed.type && parsed.type.includes('offers')?
										<React.Fragment>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>Upto 30% Off on Surgery (with Implants)</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>1st Doctor Booking & X-ray FREE</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>50% Off on Physiotherapy (Post Operation)</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>Dedicated Doctor for Medical Advice</span></p>
										</React.Fragment>:''
									*/}

									{
										!parsed.type || true ?
											<React.Fragment>
												<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span>{this.props.procedure_name ? 'Book the right Doctor/Hospital' : 'Get upto 30% Off on Appointments'}</span></p>
												<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span>{this.props.procedure_name ? 'Compare Surgery Cost across Hospitals' : 'Instant Booking Confirmation'}</span></p>
												<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span className="d-block">{this.props.procedure_name ? 'Special Prices for Docprime Customers' : 'Dedicated Doctor for Advice'}</span></p>
											</React.Fragment>
											: ''
									}

									{
										!parsed.type && this.props.procedure_name ?
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} /> <span className="d-block">Dedicated Doctor for Medical Advice</span></p>
											: ''
									}

									{/*<div className="ipd-inp-section" onClick={(e) => {
										e.stopPropagation()
										e.preventDefault()
									}}>
										<input type="text" value={this.state.name} name='name' placeholder="*Name" onChange={this.inputHandler.bind(this)} />
										<input type="Number" value={this.state.phone_number} name='phone_number' placeholder="*Mobile Number" onChange={this.inputHandler.bind(this)} />
										<div className="ipd-lead-textarea">
											<textarea placeholder="*How can we help you?" style={{fontWeight:500}} rows='1' value={this.state.comments} name='comments' onChange={this.inputHandler.bind(this)}></textarea>
										</div>
					                	<div className="skip-btn-sgn">
											<button className="ipd-inp-sbmt" onClick={(e) => {
												e.stopPropagation()
												e.preventDefault()
												this.submitLeadForm()
											}}>Click to Proceed</button>
											{
												(parsed && parsed.get_feedback && parsed.get_feedback == '1') || this.props.forcedPopup ?''
												:<p onClick={(e) => {
													e.stopPropagation()
													e.preventDefault()
													this.closePopUpClicked()
												}}>Skip</p>
											}
											
										</div>
									</div>*/}
									<div className="ipd-pop-scrl" onClick={(e) => {
										e.stopPropagation()
										e.preventDefault()
									}}>
										<div className="ipd-inp-section">
											<div className="nm-lst-inputcnt">
												<input style={{ marginRight: '8px' }} type="text" value={this.state.first_name} name='first_name' placeholder="*First Name" onChange={this.inputHandler.bind(this)} />
												<input type="text" value={this.state.last_name} name='last_name' placeholder="Last Name" onChange={this.inputHandler.bind(this)} />
											</div>
											<input type="text" value={this.state.phone_number} name='phone_number' placeholder="*Mobile Number" onChange={this.inputHandler.bind(this)} />
											<div className="slt-nw-input radio-mbl mb-10">
												<label className="slt-label text-left" htmlFor="male" >*Gender:</label>
												<div className="slt-label-radio ml-2">
													<div className="dtl-radio">
														<label className="container-radio" onClick={() => this.setState({ gender: 'm' })}>Male
				                                                        <input type="radio" name="gender" name="gender" checked={this.state.gender === 'm'} />
															<span className="doc-checkmark"></span>
														</label>
													</div>
													<div className="dtl-radio">
														<label className="container-radio" onClick={() => this.setState({ gender: 'f' })}>Female
				                                                        <input type="radio" name="gender" value="m" name="gender" checked={this.state.gender === 'f'} />
															<span className="doc-checkmark"></span>
														</label>
													</div>
												</div>
											</div>
											{/*<div className="select-date-container">
														<h5>*Preferred Date:</h5>
														<div className="vertical-date-select-container" style={{marginBottom:0}}>
															<div className="slect-date-heading">
																<div className="vertical-date-listing">
																	<ul className="ver-date-list-ul">
																		<li>
																			<p className="date-list-active">22<span>Fri</span></p>
																		</li>
																		<li>
																			<p className="">29<span>Fri</span></p>
																		</li>
																		<li>
																			<p className="">6<span>Fri</span></p>
																		</li>
																		<li style={{padding:0}}>
																			<a>
																				<img  src={ASSETS_BASE_URL + '/img/calnext.svg'} style={{width:22, marginTop:10}}/>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<div className="select-date-container">
														<h5>Preferred Time</h5>
														<select>
															<option>option 1</option>
															<option>option 2</option>
															<option>option 3</option>
														</select>
													</div>*/}
											<div className="ipd-lead-textarea">
												<textarea placeholder="*How can we help you?" style={{ fontWeight: 500 }} rows='1' name='comments' value={this.state.comments} onChange={this.inputHandler.bind(this)}></textarea>
											</div>
											<div className="skip-btn-sgn">
												<button className="ipd-inp-sbmt" onClick={(e) => {
													e.stopPropagation()
													e.preventDefault()
													this.submitLeadForm()
												}}>Click to Proceed</button>
												{
													(parsed && parsed.get_feedback && parsed.get_feedback == '1') || this.props.forcedPopup ? ''
														: <p onClick={(e) => {
															e.stopPropagation()
															e.preventDefault()
															this.closePopUpClicked(true)
														}}>Skip</p>
												}
											</div>
											<div className="popUp-whtsappEnable-ipd">
												<div className="whtsappEnable-container">
													{/*<p className="wtsapp-chk-txt"><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/tick.svg'} /> Enable Whatsapp for seamless communication</p>
													*/}<p className="text-center fw-500" style={{ fontSize: 9, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
												</div>
											</div>
										</div>
									</div>
								</div>
								: ''
						}
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
		submitIPDForm: (formData, selectedLocation, cb) => dispatch(submitIPDForm(formData, selectedLocation, cb)),
		ipdPopupFired: () => dispatch(ipdPopupFired()),
		saveIpdPopupData: (type, data) => dispatch(saveIpdPopupData(type, data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdLeadForm)