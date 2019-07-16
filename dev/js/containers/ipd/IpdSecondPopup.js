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
			formData.ipd_procedure = this.props.procedure_id
		}

		if(this.props.doctor_id) {
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
        if(this.props.sourceTag) {
        	formData.source = this.props.sourceTag
        }

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

	render() {
		const parsed = queryString.parse(this.props.location.search)

		return (
			<div className="search-el-popup-overlay cancel-overlay-zindex" onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				this.closePopUpClicked()
			}}>
				<div className="search-el-popup ipd-pop-width">
					

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