import React from 'react'
import { connect } from 'react-redux'
import { submitIPDForm } from '../../actions/index.js'
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
			gender: '',
			comments: ''
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

		if (!this.state.gender) {
			SnackBar.show({ pos: 'bottom-center', text: "Please select your gender" })
			return
		}

		const parsed = queryString.parse(this.props.location.search)

		let formData = {
			...this.state
		}

		if(this.props.hospital_id) {
			formData.hospital = this.props.hospital_id
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

		this.props.submitIPDForm(formData, this.props.selectedLocation, (error, response) => {
			if (!error && response) {
				let gtmData = {
					'Category': 'ConsumerApp', 'Action': 'IPD-popup-lead', 'CustomerID': GTM.getUserId() || '', 'leadid': response.id || '', 'event': 'IPD-popup-lead', selectedId: '', 'hospitalId': '', 'from': 'leadForm'
				}
				GTM.sendEvent({ data: gtmData })
				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Your request has been submitted sucessfully" })
				}, 500)
				this.setState({ showForm: false })
			} else {
				setTimeout(() => {
					SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
				}, 500)
			}
			this.props.submitLeadFormGeneration()
		})

	}

	closePopUpClicked() {
		const parsed = queryString.parse(this.props.location.search)
		if (parsed.get_feedback && parsed.get_feedback == '1') {
			SnackBar.show({ pos: 'bottom-center', text: "Please fill the feedback form" })
		} else {
			this.props.submitLeadFormGeneration(true)
		}
	}

	render() {

		const parsed = queryString.parse(this.props.location.search)

		return (
			<div className="search-el-popup-overlay" onClick={(e) => {
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
										:<p className="ipd-needHelp">{`Need help with an appointment ${this.props.hospital_name?`at ${this.props.hospital_name}?`:''}`}</p>
									}
									<p className="srch-el-ipd-cont" style={{ color: '#55a740' }}>Get upto 30% Off on appointments</p>
									<div className="ipd-inp-section" onClick={(e) => {
										e.stopPropagation()
										e.preventDefault()
									}}>
										<input type="text" value={this.state.name} name='name' placeholder="Name" onChange={this.inputHandler.bind(this)} />
										<input type="Number" value={this.state.phone_number} name='phone_number' placeholder="Mobile Number" onChange={this.inputHandler.bind(this)} />
										<div className="d-flex align-items-center flex-wrap mrt-10">
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
										<div className="ipd-lead-textarea">
											<textarea placeholder="What are you looking for?" rows='3' value={this.state.comments} name='comments' onChange={this.inputHandler.bind(this)}></textarea>
										</div>
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
		submitIPDForm: (formData, selectedLocation, cb) => dispatch(submitIPDForm(formData, selectedLocation, cb))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdLeadForm)