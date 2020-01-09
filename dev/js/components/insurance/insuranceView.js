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

class Insurance extends React.Component {
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
			isLead: '',
			checkIdleTimeout:true,
			popupClass: '',
			overlayClass: '',
			identifyUserClick:''
		}
	}
	componentDidMount() {
		// if (STORAGE.checkAuth()) {
		// 	this.props.getUserProfile()
		// }
		let lead_data = queryString.parse(this.props.location.search)
		let phoneNumber = ''
		if (!STORAGE.checkAuth() && lead_data.page_source == 'banner') {
			//this.setState({checkIdleTimeout:false, showPopup:true, popupClass: 'translucent-popup', overlayClass: 'white-overlay', identifyUserClick:'bannerClick'})
		let data = {
				'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopup', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-click', 'click_value': 'bannerClick'
			}

		GTM.sendEvent({ data: data })
		}
		if (STORAGE.checkAuth() && this.props.USER && this.props.USER.primaryMobile != '') {
            phoneNumber = this.props.USER.primaryMobile
        }
        // this.props.generateInsuranceLead('',phoneNumber,lead_data,this.props.selectedLocation)
		let selectedId = this.props.selected_plan ? this.props.selected_plan.id : ''
		if (selectedId) {
			this.selectPlan(this.props.selected_plan)
		}
		else {
			if (this.textInput) {
				this.textInput.click()
			}
		}
		if(this.state.checkIdleTimeout && !STORAGE.checkAuth()){
			//this.setState({popupClass: 'translucent-popup', overlayClass: 'white-overlay'})
			this.inactivityTime() 
		}
	}

	inactivityTime() { // to check user inactive time on page and ask for login
    var time;
    let self =  this
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    resetTimer()
	    function stop() {
	    	let data = {
				'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopup', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-click', 'click_value': 'AutoClick'
				}
				GTM.sendEvent({ data: data })
	        if(document.getElementById('proceedLead')){
	        	document.getElementById('proceedLead').click()
	        	self.setState({checkIdleTimeout:false, identifyUserClick:'AutoClick'})
	        }
	    }

	    function resetTimer() {
	        clearTimeout(time);
	        if(self.state.checkIdleTimeout){
	        	time = setTimeout(stop, 12000)	
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
		this.props.selectInsurancePlan('plan', plan)
		this.setState({ is_checked: plan_to_toggle.id, selected_plan_data: plan_to_toggle, selected_plan_price: `(₹ ${plan_to_toggle.amount})`, toggle: this.state.toggle == 'two' ? 'one' : 'one' })
	}
	proceedPlan() { // to save user agreed plan and redirect to ask user details for policy
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
			// if (Object.keys(plan).length > 0) {
			// 	lead_data = parsed
			// 	this.props.generateInsuranceLead(plan.id, phoneNumber,lead_data,this.props.selectedLocation)
			// }
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
		if(!this.state.checkIdleTimeout){
			let data = {
				'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopup', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-click', 'click_value': 'userClick', type:type
			}
			this.setState({popupClass: '', overlayClass: ''})
			GTM.sendEvent({ data: data })
		}
		this.setState({ isLead: type, showPopup: true, identifyUserClick:'userClick' })
	}

	closeLeadPopup(){
		this.setState({ showPopup: false })
	}

	hideLoginPopup() {
		this.setState({
			showPopup: false
		});
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
			let parsed = queryString.parse(this.props.location.search)
			return (
				<div className="profile-body-wrap">
					<ProfileHeader showPackageStrip={true}/>
					<HelmetTags tagsData={{
                    	canonicalUrl: `${CONFIG.API_BASE_URL}/insurance/insurance-view`,
                    	title: 'OPD Insurance | Buy OPD Insurance Cover | OPD Cover',
                    	description: 'OPD Insurance: Buy OPD insurance cover & get cashless benefits on lab tests & doctor consultation with a network of over 15000 doctors and 2000 labs.'
                	}} noIndex={false} />                
					<section className="container container-top-margin cardMainPaddingRmv">
						<div className="row no-gutters dsktp-row-gutter">
							<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
								<section className="profile-book-screen" style={{position:'relative'}}>
									<div>
										{
											/*<div>
			                                    <span style={{ cursor: 'pointer' }} onClick={this.shortenUrl.bind(this)}>
			                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/url-short.svg"} style={{ width: 80 }} />
			                                    </span>
		                                	</div>*/
		                            	}
										{
											this.state.shortURL ? <div className="shareLinkpopupOverlay" onClick={() => {
												this.setState({ shortURL: "" })
											}}>
												<div className="shareLinkpopup" onClick={(e) => {
													e.stopPropagation()
												}}>
													<p>{this.state.shortURL}</p>
													<CopyToClipboard text={this.state.shortURL}
														onCopy={() => {
															SnackBar.show({ pos: 'bottom-center', text: "Shortened URL Copied." });
															this.setState({ shortURL: "" })
														}}>
														<span className="shrelinkBtn">
															<button>Copy</button>
														</span>
													</CopyToClipboard>
												</div>
											</div> : ""
										}
										<InsurCommon {...this.props} isSelectPlan={true} is_checked={this.state.is_checked} />
										{/* coverage listing */}
										<div className="widget mrt-20">
											<div className="coverage-list-container border-bg-transprant">
												<table className="table table-bordered insurance-tbl insurance-checkboxes">
													<thead>
														<tr>
															<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
															<th className="tbl-second-head"><p>Annual Premium</p></th>
														</tr>
													</thead>
													<tbody>
														{
															this.props.insurnaceData['insurance'][0].plans.map((result, i) => {
																return <tr id={result.id} key={i} onClick={this.selectPlan.bind(this, result)} ref={result.adult_count == 2 && result.child_count == 2 ? (input) => { this.textInput = input } : 'ref_0'}>
																	<td>
																		<label className="container-radio" htmlform={i} >{result.name}
																			<input type="radio" name="gender" id={i} value={i} checked={this.state.is_checked ? this.state.is_checked === result.id : result.is_selected} />
																			<span className="doc-checkmark"></span>
																		</label>
																	</td>
																	<td><span>₹ {result.amount}</span></td>
																</tr>
															})
														}
													</tbody>
												</table>
											</div>
										</div>
										{/* coverage listing */}										
									</div>
										<div style={{position:'absolute', bottom:'-40px', right:'15px'}}>
											<a className="fw-500" href="/terms" style={{color:"#f78631"}} onClick={(e) => {e.preventDefaut();
															this.props.history.push('/terms')}}>
															Website T&C Apply</a>
										</div>
								</section>

								{
									this.state.showPopup ?
									<InsurPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} isLead={this.state.isLead} closeLeadPopup={this.closeLeadPopup.bind(this)} popupClass={this.state.popupClass} overlayClass={this.state.overlayClass} identifyUserClick={this.state.identifyUserClick}/> : ''
								}
								{
									parsed.show_button?
									<div className="sticky-btn fixed insuBtnsContainer">
											<button className="insu-left-white-btn" onClick={()=>this.props.history.go(-1)}>Back to Booking
											</button>
											{
												STORAGE.checkAuth()?
												<button className="insu-right-orng-btn" onClick={this.proceedPlan.bind(this)}>Proceed {this.state.selected_plan_price} <span className="foot-btn-sub-span">{this.state.gst}</span>
												</button>
												:
												<button className="insu-right-orng-btn" id="proceedLead" onClick={this.proceedLead.bind(this, 'proceed')}>Proceed {this.state.selected_plan_price} <span className="foot-btn-sub-span">{this.state.gst}</span>
												</button>
											}
									</div>	
									:STORAGE.checkAuth()?
										<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.proceedPlan.bind(this)}>Proceed {this.state.selected_plan_price} <span className="foot-btn-sub-span">{this.state.gst}</span>
										</button>
										:
										<div className="sticky-btn fixed insuBtnsContainer">
											<button className="insu-left-white-btn" id="proceedLead" onClick={this.proceedLead.bind(this, 'interest')}>Click here to know more
											</button>
											<button className="insu-right-orng-btn" onClick={this.proceedLead.bind(this, 'proceed')}>Proceed {this.state.selected_plan_price} <span className="foot-btn-sub-span">{this.state.gst}</span>
											</button>
										</div>
								}
							</div>

							<ChatPanel />
						</div>
					</section>
				</div>
			)
		}
		// else{
		// 	if(this.props.insurnaceData.certificate){
		// 		this.props.history.push('/insurance/certificate')
		// 	}
		// 	return(
		// 	<div className="profile-body-wrap">
		//        <ProfileHeader />
		// 		<Loader />
		// 	</div>
		// 	)
		// }
	}
}

export default Insurance