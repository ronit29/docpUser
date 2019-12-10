import React from 'react'
import SnackBar from 'node-snackbar'

class ContactPoupView extends React.Component {

	constructor(props) {
		super(props)
		this.state = { validateNo: false, phoneNumber: '' }
	}

	inputHandler(e) {
		if (e.target.name == 'phoneNumber') {
			e.target.value.length <= 10
				? e.target.value.length == 10
					? this.setState({
						[e.target.name]: e.target.value, validateNo: true
					})
					: this.setState({
						[e.target.name]: e.target.value
					})
				: this.setState({ validateNo: true })
		}

	}

	componentDidMount() {
		if (this.props.mobileNo) {
			this.setState({ phoneNumber: this.props.mobileNo, validateNo: true })
		}
	}
	componentWillReceiveProps(nextProps) {
		//    	if(nextProps)
	}

	handleContinuePress(e) {
		if (e.key === 'Enter') {
			this.submit()
		}
	}

	submit() {
		if (this.state.validateNo) {
			this.props.getDoctor(this.state.phoneNumber)
		} else {
			SnackBar.show({ pos: 'bottom-center', text: "Please provide a valid number (10 digits)" })
		}

	}

	render() {
		return (
			<div>
				<div className="cancel-overlay" onClick={this.props.toggle}></div>
				<div className="widget cancel-appointment-div cancel-popup">
					<img src={ASSETS_BASE_URL + "/img/icons/close.png"} style={{ cursor: 'pointer', zIndex: '9' }} className="close-modal" onClick={this.props.toggle} />
					<div className="widget-header text-center action-screen-header" style={{ position: 'relative', paddingTop: '28px' }} >
						<p className="fw-500 cancel-appointment-head">Please enter your mobile number to view contact details. You will only be able to call this number from the entered mobile number.</p>
					</div>
					<div className="">
						<div className="slt-nw-input policyNumbeInput">
							<label className="numLabel" htmlFor="male">+91</label>
							<input className="slt-text-input" type="number" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this.handleContinuePress.bind(this)} />
						</div>
						<button className="mobileNumber-fill-btn" onClick={this.submit.bind(this)}>Submit</button>
					</div>
					<p className="text-center fw-500 p-3 imptnt-cls" style={{ fontSize: 12, color: '#8a8a8a'}} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
				</div>
			</div>
		)
	}
}

export default ContactPoupView