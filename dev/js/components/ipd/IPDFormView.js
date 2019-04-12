import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Footer from '../commons/Home/footer'
import SnackBar from 'node-snackbar'
import ThankyouPoup from './ipdThankYouScreen.js'
const queryString = require('query-string')
import GTM from '../../helpers/gtm.js'
import BannerCarousel from '../commons/Home/bannerCarousel';
import Calendar from 'rc-calendar';
const moment = require('moment');

class IPDFormView extends React.Component {

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
			submitFormSuccess: false
		}
	}

	componentDidMount() {
		const parsed = queryString.parse(this.props.location.search)
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdLeadGenerationPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-lead-generation-page-landed', selectedId: this.props.match.params.id, 'hospitalId': parsed.hospital_id ? parsed.hospital_id : ''
		}
		GTM.sendEvent({ data: gtmData })

		let selectedLocation = ''
		let lat = 28.644800
		let long = 77.216721
		if (this.props.selectedLocation) {
			selectedLocation = this.props.selectedLocation;
			lat = selectedLocation.geometry.location.lat
			long = selectedLocation.geometry.location.lng
			if (typeof lat === 'function') lat = lat()
			if (typeof long === 'function') long = long()
		}

		this.props.getOfferList(lat, long);
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultProfile && !this.state.name && nextProps.profiles && nextProps.profiles[nextProps.defaultProfile] && !nextProps.profiles[nextProps.defaultProfile].isDummyUser) {
			let userData = nextProps.profiles[nextProps.defaultProfile]
			this.setState({ name: userData.name || '', phone_number: userData.phone_number + '' || '', email: userData.email || '', gender: userData.gender || '', dob: userData.dob || '' })
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
		var today = dd + '-' + mm + '-' + yyyy;
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

		if (validateError.length) {

			this.setState({ validateError: validateError })
		} else {

			const parsed = queryString.parse(this.props.location.search)


			this.setState({ validateError: validateError })
			let formData = {
				...this.state,
				ipd_procedure: this.props.match.params.id
			}

			if (parsed.hospital_id) {
				formData.hospital = parsed.hospital_id
			}

			this.props.submitIPDForm(formData, (error, response) => {
				if (!error && response) {
					let gtmData = {
						'Category': 'ConsumerApp', 'Action': 'IpdLeadGenerationSuccess', 'CustomerID': GTM.getUserId() || '', 'leadid': response.id || '', 'event': 'ipd-lead-generation-success', selectedId: this.props.match.params.id, 'hospitalId': parsed.hospital_id ? parsed.hospital_id : ''
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

	render() {
		let { ipd_info } = this.props
		return (
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container container-top-margin">

					<div className="row main-row parent-section-row">
						<LeftBar />
						{
							this.props.IPD_INFO_LOADED ?
								<div className="col-12 col-md-7 col-lg-7 center-column">
									{
										this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'ipd_lead_form').length ?
											<div className="col-12 mrb-20">
												<BannerCarousel {...this.props} sliderLocation="ipd_lead_form" />
											</div> : ''
									}
									<div className="ipd-section ipd-form-view mt-0">
										<h4 className="section-heading pt-0">{`Get Cost Estimate of ${ipd_info.about.name}`}</h4>
										<div className="lead-form">
											<p>Please provide your details below and our Medical Experts will contact you shortly</p>
											{/*<ul class="med-help">
			                    			 <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Find the right Doctor and Hospital </li>
			                    			 <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Comparing Surgery/Procedure cost</li>
			                    			 <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Managing Hospital Process</li>
		                    			 </ul>*/}
										</div>
										<div className="info-popup">
											{/*<div className="pop-head">{ipd_info.about.name}</div>*/}
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
												</div>
												{
													this.state.validateError.indexOf('gender') > -1 ?
														<span className="error-msg gender-error-msg">Required</span>
														: ''
												}
											</div>
											<div className="form-group fm-grp mrg-mt0">
												<div className="lbl-txt">Date of birth:</div>
												<div className="input-form"><input type="text" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('dob') > -1 ? 'error-on' : ''}`} name="dob" value={this.state.formattedDate} onClick={this.openCalendar.bind(this)} onFocus={this.openCalendar.bind(this)} /></div>
												{
													this.state.validateError.indexOf('dob') > -1 ?
														<span className="error-msg">Required</span>
														: ''
												}
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
										<div className="btn-search-div btn-apply-div btn-sbmt btncallback">
											<a href="javascript:void(0);" className="btn-search" onClick={this.submitClicked.bind(this)}>Submit</a>
										</div>
										{
											this.state.submitFormSuccess ?
												<ThankyouPoup {...this.props} />
												: ''
										}

									</div>
								</div>
								: ''
						}
						<RightBar extraClass=" chat-float-btn-2" />
					</div>
				</section>
			</div>

		)
	}
}

export default IPDFormView