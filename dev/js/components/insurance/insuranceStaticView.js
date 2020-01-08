import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import ChatPanel from '../commons/ChatPanel'
import SnackBar from 'node-snackbar'
import InsurPopup from './insurancePopup.js'
import InsurCommon from './insuranceCommonSection.js'
import STORAGE from '../../helpers/storage'
import Loader from '../commons/Loader'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AssertionError } from 'assert';
const queryString = require('query-string');
import HelmetTags from '../commons/HelmetTags'
import CONFIG from '../../config'
import GTM from '../../helpers/gtm.js'

class InsuranceStaticView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			//insuranceResults:this.props.insurnaceData,
			toggle: 'one',
			is_checked: this.props.selected_plan ? this.props.selected_plan.id : '',
			selected_plan_price: this.props.selected_plan ? this.props.selected_plan.amount : '',
			gst: 'Inclusive of 18% GST',
			selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
			showPopup: false,
			shortURL: "",
			isLead: 'proceed',
			checkIdleTimeout: true,
			popupClass: '',
			overlayClass: '',
			identifyUserClick: ''
		}
	}
	componentDidMount() {
		// if (STORAGE.checkAuth()) {
		// 	this.props.getUserProfile()
		// }
		let lead_data = queryString.parse(this.props.location.search)
		let phoneNumber = ''
		if (!STORAGE.checkAuth() && lead_data.page_source == 'banner') {
			// this.setState({checkIdleTimeout:false, showPopup:true, popupClass: 'translucent-popup', overlayClass: 'white-overlay', identifyUserClick:'bannerClick'})
			this.setState({ checkIdleTimeout: false, showPopup: true, popupClass: '', overlayClass: '', identifyUserClick: 'bannerClick' })
			let data = {
				'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopup', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-click', 'click_value': 'bannerClick'
			}

			GTM.sendEvent({ data: data })
		}
		if (STORAGE.checkAuth() && this.props.USER && this.props.USER.primaryMobile != '') {
			phoneNumber = this.props.USER.primaryMobile
		}
		this.props.generateInsuranceLead('', phoneNumber, lead_data, this.props.selectedLocation) // to create insurance lead for matrix
		let selectedId = this.props.selected_plan ? this.props.selected_plan.id : ''
		if (selectedId) {
			this.selectPlan(this.props.selected_plan)
		}
		else {
			if (this.textInput) {
				this.textInput.click()
			}
		}
		if (this.state.checkIdleTimeout && !STORAGE.checkAuth()) {
			// this.setState({popupClass: 'translucent-popup', overlayClass: 'white-overlay'})
			this.inactivityTime()
		}
	}

	inactivityTime() {
		var time;
		let self = this
		window.onload = resetTimer;
		document.onmousemove = resetTimer;
		document.onkeypress = resetTimer;
		resetTimer()
		function stop() {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopup', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-click', 'click_value': 'AutoClick'
			}
			GTM.sendEvent({ data: data })
			if (document.getElementById('proceedLead')) {
				document.getElementById('proceedLead').click()
				self.setState({ checkIdleTimeout: false, identifyUserClick: 'AutoClick' })
			}
		}

	    function resetTimer() {
	        clearTimeout(time);
	        if(self.state.checkIdleTimeout){
	        	time = setTimeout(stop, 20000)	
	        }
	    }
	}

	componentWillReceiveProps(props) {
		// let self = this
		// let selectedId = this.props.selected_plan?this.props.selected_plan.id:''
		// let newSelectedId = props.selected_plan?props.selected_plan.id:''
		// if(selectedId){
		// 	this.setState({ selected_plan_data: props.selected_plan , selected_plan_price: `(₹ ${props.selected_plan.amount})`, is_checked: selectedId })
		// }
		// if(!newSelectedId){
		// 	if(this.textInput){
		// 		this.textInput.click()
		// 	}
		// }
	}
	selectPlan(plan_to_toggle) {
		let plan = plan_to_toggle
		plan_to_toggle.is_selected = true
		// plan_to_toggle.plan_name = this.props.insurnaceData['insurance'][0].name
		// plan_to_toggle.logo = this.props.insurnaceData['insurance'][0].logo 
		// plan_to_toggle.insurer_document = this.props.insurnaceData['insurance'][0].insurer_document
		// plan_to_toggle.insurer = this.props.insurnaceData['insurance'][0].id
		// plan_to_toggle.stateData = this.props.insurnaceData['state'] 
		this.props.selectInsurancePlan('plan', plan) // save user selected plan
		this.setState({ is_checked: plan_to_toggle.id, selected_plan_data: plan_to_toggle, selected_plan_price: `(₹ ${plan_to_toggle.amount})`, toggle: this.state.toggle == 'two' ? 'one' : 'one' })
	}

	proceedPlan() {
		let parsed = queryString.parse(this.props.location.search)
		let plan = Object.assign({}, this.state.selected_plan_data)
		let lead_data
		let phoneNumber = ''
		if (STORAGE.checkAuth()) {
			if (this.props.USER && this.props.USER.primaryMobile != '') {
				phoneNumber = this.props.USER.primaryMobile
			}
			if (Object.keys(plan).length > 0) {
				lead_data = parsed
				this.props.generateInsuranceLead(plan.id, phoneNumber, lead_data, this.props.selectedLocation) // to create insurance lead for matrix
			}
			this.props.history.push('/insurance/insurance-plan-view')
		} else {
			this.setState({ showPopup: true })
		}
	}
	proceedPlan1() {
		let self = this
		let parsed = queryString.parse(this.props.location.search)
		let plan = Object.assign({}, this.state.selected_plan_data)
		let profileLength
		let memberStoreDataLength
		let membersArray = []
		let profilesArray = []
		let lead_data
		// plan.plan_name = this.props.insurnaceData['insurance'][0].name
		// plan.logo = this.props.insurnaceData['insurance'][0].logo 
		// plan.insurer_document = this.props.insurnaceData['insurance'][0].insurer_document   	
		// plan.insurer = this.props.insurnaceData['insurance'][0].id
		// plan.stateData = this.props.insurnaceData['state']
		// this.props.selectInsurancePlan('plan', plan)
		this.props.resetSelectedPlans() // to reset user selected plan
		if (STORAGE.checkAuth()) {
			let phoneNumber = ''
			if (this.props.USER && this.props.USER.primaryMobile != '') {
				phoneNumber = this.props.USER.primaryMobile
			}
			if (Object.keys(plan).length > 0) {
				lead_data = parsed
				this.props.generateInsuranceLead(plan.id, phoneNumber, lead_data, this.props.selectedLocation) // to create insurance lead for matrix
			}
			profileLength = Object.keys(this.props.USER.profiles).length
			memberStoreDataLength = Object.keys(this.props.self_data_values).length
			if (profileLength > 0 && memberStoreDataLength > 0) {
				Object.entries(this.props.self_data_values).map(function ([key, self_data_values]) {
					Object.entries(self.props.USER.profiles).map(function ([k, profiles]) {
						if (self_data_values.id == profiles.id) {
							membersArray.push(self_data_values)
							profilesArray.push(profiles)
						}
					})
				})
				if (membersArray.length == profilesArray.length) {
					Object.entries(membersArray).map(function ([key, values]) {
						if (membersArray[key].id == profilesArray[key].id) {
							let memberNewdata = values
							let newName = profilesArray[key].name.split(" ")
							if (newName.length == 3) {
								memberNewdata.name = newName[0]
								memberNewdata.middle_name = newName[1]
								memberNewdata.last_name = newName[2]
							} else if (newName.length == 2) {
								memberNewdata.name = newName[0]
								memberNewdata.last_name = newName[1]
							} else {
								memberNewdata.name = newName[0]
							}
							if (membersArray[key].email != '') {
								memberNewdata.email = membersArray[key].email
							} else {
								memberNewdata.email = profilesArray[key].email
							}

							if (membersArray[key].dob != null || membersArray[key].dob != '') {
								memberNewdata.dob = membersArray[key].dob
							} else {
								memberNewdata.dob = profilesArray[key].dob
							}
							if (membersArray[key].gender != '') {
								memberNewdata.gender = membersArray[key].gender
							} else {
								memberNewdata.gender = profilesArray[key].gender
							}
							self.props.userData('memberNewdata', memberNewdata)
						}
					})
					this.props.history.push('/insurance/insurance-user-details')
				} else {
					this.props.history.push('/insurance/insurance-user-details')
				}
			} else {
				this.props.history.push('/insurance/insurance-user-details')
			}
		} else {
			this.setState({ showPopup: true })
		}
	}

	proceedLead(type) {
		if (!this.state.checkIdleTimeout) {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopup', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-click', 'click_value': 'userClick', type: type
			}
			this.setState({ popupClass: '', overlayClass: '' })
			GTM.sendEvent({ data: data })
		}
		this.setState({ isLead: type, showPopup: true, identifyUserClick: 'userClick' })
	}

	closeLeadPopup() {
		this.setState({ showPopup: false})
	}

	hideLoginPopup() {
		this.setState({showPopup: false})
	}

	shortenUrl() {
		if (window) {
			let url = window.location.href + '&force_location=true'
			this.props.urlShortner(url, (err, data) => {
				if (!err) {
					this.setState({ shortURL: data.tiny_url })
				}
			})
		}
	}

	render() {
		let parsed = queryString.parse(this.props.location.search)
		
		if (this.props.LOAD_INSURANCE) {
			return (
				<div>
					<div className="profile-body-wrap">
						<ProfileHeader showPackageStrip={true} />

						<section className="container article-container">
							<div className="row main-row parent-section-row justify-content-center">
								<div className="col-12 col-md-10 col-lg-10 center-column">
									<div className="container-fluid article-column ins-landing-shadow">
										<div className="ins-landing-container">
											<div>
												<div className="ins-steps-section">
													<div className="doc-usr-only">
														<h1>Group OPD Insurance exclusively for <span>Docprime</span> users only </h1>
														<div className="doc-pwdby">
															<p>Powered by</p>
															<img style={{ width: '130px' }} src="https://cdn.docprime.com/media/insurer/images/AMHI_Logo-01.png" />
														</div>
													</div>
												</div>
												<div className="ins-steps-section">
													<div className="row align-item-center">
														<div className="col-6">
															<div className="lft-cntn-algn">
																<img className="ins-step-img" src={ASSETS_BASE_URL + "/img/ins-hosp.png"} />
															</div>
														</div>
														<div className="col-6">
															<div className="lft-para-algn">
																<p className="step-blk-para">Unlimited</p>
																<p className="step-blk-para">Doctor</p>
																<p className="step-orng-para">Consultation</p>
																<p className="step-qut-para">with <span>20,000+</span> Doctors*</p>
															</div>
														</div>
													</div>
												</div>
												<div className="ins-steps-section">
													<div className="row align-item-center">
														<div className="col-6">
															<div className="lft-para-algn">
																<p className="step-blk-para">Unlimited</p>
																<p className="step-orng-para">Lab Tests</p>
																<p className="step-qut-para">at <span>2,000+</span> Diagnostic Labs*</p>
															</div>
														</div>
														<div className="col-6">
															<img className="ins-step-img" src={ASSETS_BASE_URL + "/img/isn-lab.png"} />
														</div>
													</div>
												</div>
												<div className="ins-steps-section">
													<div className="row align-item-center">
														<div className="col-6">
															<div className="lft-cntn-algn">
																<img className="ins-step-img" src={ASSETS_BASE_URL + "/img/ins-act.png"} />
															</div>
														</div>
														<div className="col-6">
															<div className="lft-para-algn">
																<p className="step-orng-para">Instant Activation</p>
																<p className="step-blk-para">Upon Purchase</p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="ins-land-listing">
												<p><img src={ASSETS_BASE_URL + '/img/ins-hrt.png'} />Pre existing diseases covered</p>
												<p><img src={ASSETS_BASE_URL + '/img/ins-rprt.png'} />No medical test required for policy issuance</p>
												<p><img src={ASSETS_BASE_URL + '/img/ins-yr.png'} />Valid for 1 year from policy issuance</p>
											</div>
											<div className="ins-network-cont">
												<div className="ins-netwrk-heading-cont">
													<p>Only available on Docprime network* </p>
													<span href='/insurance/network' onClick={(e) => {
														e.preventDefault();
														let data = {
															'Category': 'ConsumerApp', 'Action': 'InsuranceNetwork', 'CustomerID': GTM.getUserId() || '', 'event': 'insurance-network', 'click_value': 'insurance-network'
														}

														GTM.sendEvent({ data: data })
														this.props.history.push('/insurance/network')
													}}>View network</span>
												</div>
												<p className="ins-nw-note">A few things to note... </p>
												<ul className="ins-nw-listing">
													<li>All procedures (dental, daycare etc..) and sessions (therapy, counselling etc..) are not covered</li>
													<li>Any lab test or doctor appointments with MRP more than ₹1500 are not covered</li>
													<li>Only 5 oncology and 5 Gynecology doctor appointments are covered in a policy year</li>
													<li>Docprime's Insurance network is dynamic in nature and may change from time to time</li>
												</ul>
											</div>
										</div>
									</div>
									{parsed.show_button ?
										<div className="sticky-btn fixed insuBtnsContainer">
											<button className="insu-left-white-btn" onClick={() => this.props.history.go(-1)}>Back to Booking
								</button>
											<button className="insu-right-orng-btn" onClick={this.proceedPlan.bind(this)}>Buy Now
								</button>
										</div>
										:
										<div className="sticky-btn fixed insuBtnsContainer">
											<button id="proceedLead" className="insu-right-orng-btn ins-buy-btn" onClick={this.proceedPlan.bind(this)}>Buy Now</button>
										</div>
									}
								</div>
							</div>
						</section>
						{
							this.state.showPopup ?
							<InsurPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} isLead={this.state.isLead} closeLeadPopup={this.closeLeadPopup.bind(this)} popupClass={this.state.popupClass} overlayClass={this.state.overlayClass} identifyUserClick={this.state.identifyUserClick} /> : ''
						}
					</div>
				</div>
			)
		}
	}
}

export default InsuranceStaticView