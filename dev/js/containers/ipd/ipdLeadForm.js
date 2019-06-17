import React from 'react'
import { connect } from 'react-redux'
import { submitIPDForm, ipdPopupFired } from '../../actions/index.js'
import SnackBar from 'node-snackbar'
import GTM from '../../helpers/gtm.js'
const queryString = require('query-string')

class IpdLeadForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			phone_number: '',
			showForm: true,
			comments:''
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
		if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
			setTimeout(() => {
				if (!this.state.name) {
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

		if (!this.state.comments) {
			SnackBar.show({ pos: 'bottom-center', text: "Please enter your Comment" })
			return
		}

		const parsed = queryString.parse(this.props.location.search)

		let formData = {
			...this.state
		}

		if(this.props.hospital_id) {
			formData.hospital = this.props.hospital_id
		}

		if(this.props.procedure_id) {
			formData.procedure_id = this.props.procedure_id
		}

		let utm_tags = {
            utm_source: parsed.utm_source || '',
            utm_medium: parsed.utm_medium || '',
            utm_term: parsed.utm_term || '',
            utm_campaign: parsed.utm_campaign || '',
            referrer: document.referrer || ''
        }

        formData.data = {}
        formData.data.utm_tags = utm_tags
        formData.data.url = window.location.href
        formData.data.formSource = this.props.formSource || 'PopupLeadForm'

		this.props.submitIPDForm(formData, this.props.selectedLocation, (error, response) => {
			if (!error && response) {
				this.props.ipdPopupFired()
				if(this.state.name && this.state.name.includes('test')) {

				}else {
					let gtmData = {
						'Category': 'ConsumerApp', 'Action': 'IPD-popup-lead', 'CustomerID': GTM.getUserId() || '', 'leadid': response.id || '', 'event': 'IPD-popup-lead', selectedId: '', 'hospitalId': '', 'from': 'leadForm', 'mobileNo':this.state.phone_number
					}
					GTM.sendEvent({ data: gtmData })
				}
				
				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Your request has been submitted sucessfully" })
				}, 500)
				this.setState({ showForm: false })
			} else {
				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
				}, 500)
			}
			this.props.submitLeadFormGeneration(this.state)
		})

	}

	closePopUpClicked() {
		const parsed = queryString.parse(this.props.location.search)
		if (parsed.get_feedback && parsed.get_feedback == '1') {
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

	render() {
		const parsed = queryString.parse(this.props.location.search)

		return (
			<div className="search-el-popup-overlay cancel-overlay-zindex" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				this.closePopUpClicked()
			}}>
				<div className="search-el-popup ipd-pop-width">
					<div className="widget p-12">
						{
							this.state.showForm ?
								<div className="p-relative">
									{
										parsed.get_feedback && parsed.get_feedback == '1' ? ''
											: <span className="ipd-pop-cls" onClick={(e) => {
												e.stopPropagation()
												e.preventDefault()
												this.closePopUpClicked()
											}}><img src={ASSETS_BASE_URL + "/img/icons/close.png"} />
											</span>
									}
									{
										this.props.doctor_name?
										<p className="ipd-needHelp">{`Need to book an appointment with ${this.props.doctor_name} ${this.props.hospital_name?`at ${this.props.hospital_name}?`:''}`}</p>
										:this.props.hospital_name?
										<p className="ipd-needHelp">{`Need help with an appointment ${this.props.hospital_name?`at ${this.props.hospital_name}?`:''}`}</p>
										:''
									}

									{
										this.props.procedure_name?<section>
										<p className="ipd-needHelp">{`Need help with ${this.props.procedure_name}?`}</p></section>
										:''
									}

									{
										parsed.type && parsed.type.includes('offers')?
										<React.Fragment>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>Upto 30% Off on Surgery (with Implants)</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>1st Doctor Booking & X-ray FREE</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>50% Off on Physiotherapy (Post Operation)</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>Dedicated Doctor for Medical Advice</span></p>
										</React.Fragment>:''
									}
									
									{
										!parsed.type?
										<React.Fragment>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>{this.props.procedure_name?'Book the right Doctor/Hospital':'Get upto 30% Off on Appointments'}</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span>{this.props.procedure_name?'Compare Surgery Cost across Hospitals':'Instant Booking Confirmation'}</span></p>
											<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span className="d-block">{this.props.procedure_name?'Special Prices for Docprime Customers':'Dedicated Doctor for Advice'}</span></p>
										</React.Fragment>
										:''
									}
									
									{
										!parsed.type && this.props.procedure_name?
										<p className="srch-el-ipd-cont ipd-pop-tick-text"><img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> <span className="d-block">Dedicated Doctor for Medical Advice</span></p>
										:''
									}
									<div className="ipd-inp-section" onClick={(e) => {
										e.stopPropagation()
										e.preventDefault()
									}}>
										<input type="text" value={this.state.name} name='name' placeholder="Name" onChange={this.inputHandler.bind(this)} />
										<input type="Number" value={this.state.phone_number} name='phone_number' placeholder="Mobile Number" onChange={this.inputHandler.bind(this)} />
										<div className="ipd-lead-textarea">
											<textarea placeholder="How can we help you?" style={{fontWeight:500}} rows='1' value={this.state.comments} name='comments' onChange={this.inputHandler.bind(this)}></textarea>
										</div>
										{/*<div className="d-flex align-items-center flex-wrap mrt-10">
											<div className="dtl-radio">
												<label className="container-radio" style={{ fontSize: 14, fontWeight: 400 }} onClick={() => this.setState({ gender: 'm' })}>Male<input type="radio" checked={this.state.gender === 'm'} name="radio" value={this.state.gender} style={{ width: 10 }} />
													<span className="doc-checkmark"></span>
												</label>
											</div>
											<div className="dtl-radio">
												<label className="container-radio" style={{ fontSize: 14, fontWeight: 400 }} onClick={() => this.setState({ gender: 'f' })}>Female<input type="radio" checked={this.state.gender === 'f'} name="radio" value={this.state.gender} style={{ width: 10 }} />
													<span className="doc-checkmark"></span>
												</label>
											</div>
											<div className="dtl-radio">
												<label className="container-radio" style={{ fontSize: 14, fontWeight: 400 }} onClick={() => this.setState({ gender: 'o' })}>Other<input type="radio" checked={this.state.gender === 'o'} name="radio" value={this.state.gender} style={{ width: 10 }} />
													<span className="doc-checkmark"></span>
												</label>
											</div>
										</div>
										
										<div className="mrb-20">
					                        <label className="ck-bx p-0" style={{ fontWeight: '400', fontSize: '14px' }} onClick={this.toggleWhatsap.bind(this)}>Enable 
					                            <span className="sm-wtsp-img fw-400"><img src={ASSETS_BASE_URL + "/img/wa-logo-sm.png"} />WhatsApp</span> notification<input type="checkbox" checked={this.state.whatsapp_optin} /><span className="checkmark" style={{left: '7px'}}></span>
					                        </label>
					                	</div>*/}
										<button className="ipd-inp-sbmt" onClick={(e) => {
											e.stopPropagation()
											e.preventDefault()
											this.submitLeadForm()
										}}>Click to Proceed</button>
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
		ipdPopupFired: () => dispatch(ipdPopupFired())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdLeadForm)