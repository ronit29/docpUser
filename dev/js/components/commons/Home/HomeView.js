import React from 'react';

import ProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'
import ChatPanel from '../ChatPanel'
import HelmetTags from '../HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'
import HomePageWidget from './HomePageWidget'
import Accordian from './Accordian'
import FixedMobileFooter from './FixedMobileFooter'
import BannerCarousel from './bannerCarousel';
import UpComingAppointmentView from './upComingAppointment.js'
import PackageCompareStrip from '../../diagnosis/searchPackages/packageCompare/packageCompareStrip.js'
import HomePagePackageWidget from './HomePagePackageWidget.js'
const queryString = require('query-string');
import CRITEO from '../../../helpers/criteo.js'
import HomePageTopHospitals from './HomePageTopHospitals.js'
import HomePageTopProcedures from './HomePageProcedureWidgets.js'
import HomePagePackageCategory from './HomePagePackageCategory.js'
import TopChatWidget from './HomePageChatWidget';
import DemoWidget from './DemoWidget.js'
import BookingConfirmationPopup from '../../diagnosis/bookingSummary/BookingConfirmationPopup';
import Loader from '../Loader';
import VipLoginPopup from '../../vipClub/vipClubPopup.js'
import PrescriptionUpload from '../../../containers/commons/PrescriptionUpload.js'
import SnackBar from 'node-snackbar'
import GoldHomePageBanner from './GoldHomePageBanner.js'
import STORAGE from '../../../helpers/storage'


const GENDER = {
	"m": "Male",
	"f": "Female",
	"o": "Other"
}

class HomeView extends React.Component {
	constructor(props) {
		super(props);
		// let footerData = null
		// if (this.props.initialServerData) {
		// 	footerData = this.props.initialServerData.footerData
		// }
		this.state = {
			//specialityFooterData: this.props.static_footer_data,
			showPopup: false,
			clickedOn: '',
			show_popup:false,
			is_user_insurance_active: false
		}
	}

	componentDidMount() {
		if (window) {
			window.scrollTo(0, 0)
		}

		let user_insurance_status = null
		if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
			user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
		}
		user_insurance_status = (user_insurance_status==1 || user_insurance_status==5 || user_insurance_status==4 || user_insurance_status==7)
		this.setState({is_user_insurance_active: user_insurance_status})

		// this.props.getSpecialityFooterData((cb) => {
		// 	this.setState({ specialityFooterData: cb });
		// });
		if(!this.props.static_footer_data) {
			this.props.getSpecialityFooterData();
		}

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

		let data = { 'event': "viewHome" }

		CRITEO.sendData(data)
	}


	navigateTo(where, type, data, e) {
		if (e) {
			e.preventDefault()
			e.stopPropagation()
		}
		if (type) {
			this.props.selectSearchType(type)
		}
		if (where == '/chat') {
			this.props.history.push(where, data)
		} else {
			this.props.history.push(where)
		}
	}

	getAge(birthday) {
		birthday = new Date(birthday)
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	searchLab = (test, isPackage = false) => {
		let data
		if (isPackage) {
			test.type = 'package'
			this.props.setPackageId(test.id, true)
			data = {
				'Category': 'ConsumerApp', 'Action': 'SelectedHealthPackage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-health-package', 'selected': test.name || '', 'selectedId': test.id || ''
			}
		} else {
			test.type = 'test'
			this.props.toggleDiagnosisCriteria('test', test, true)
			data = {
				'Category': 'ConsumerApp', 'Action': 'SelectedBookTest', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-book-test', 'selected': test.name || '', 'selectedId': test.id || ''
			}
		}

		GTM.sendEvent({ data: data })

		if (isPackage) {
			setTimeout(() => {
				this.props.history.push('/searchpackages')
			}, 100)
		} else {
			setTimeout(() => {
				this.props.history.push('/lab/searchresults')
			}, 100)
		}
	}

	searchDoctor = (speciality) => {
		if (speciality.url) {
			this.props.history.push(`/${speciality.url}`)
		}
		else {
			speciality.type = 'speciality'
			this.props.toggleOPDCriteria('speciality', speciality, true)
			setTimeout(() => {
				this.props.history.push('/opd/searchresults')
			}, 100)
		}
		let data = {
			'Category': 'ConsumerApp', 'Action': 'SelectedDoctorSpecializations', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-doctor-specializations', 'selected': speciality.name || '', 'selectedId': speciality.id || ''
		}
		GTM.sendEvent({ data: data })
	}

	gotToSignup() {
		let data = {
			'Category': 'ConsumerApp', 'Action': 'HomepageBannerSignupClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'homepage-banner-signup-clicked'
		}
		GTM.sendEvent({ data: data })
		this.props.history.push('/user?ref=home')
	}

	gotToDoctorSignup(isLab) {
		let data
		if (isLab) {
			data = {
				'Category': 'ConsumerApp', 'Action': 'RunLabBannerClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'run-lab-banner-clicked'
			}
		} else {
			data = {
				'Category': 'ConsumerApp', 'Action': 'RunClinicBannerClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'run-clinic-banner-clicked'
			}
		}
		GTM.sendEvent({ data: data })
		this.props.history.push('/doctorsignup')
	}

	getTopList(list) {
		let topList = []
		if (list.length > 5) {
			topList = list.slice(0, 5)
		} else {
			topList = list
		}
		return topList
	}

	orderMedClick(source) {
		this.setState({ showPopup: true, clickedOn: source }, () => {
			setTimeout(() => this.continueClick(), 1000);
		})
		if (source === 'newOrder') {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'DesktopNewOrderClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'desktop-new-order-click'
			}
			GTM.sendEvent({ data: data })
		}
		else if (source === 'prevOrder') {
			let data = {
				'Category': 'ConsumerApp', 'Action': 'DesktopPreviousOrderClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'desktop-previous-order-click'
			}
			GTM.sendEvent({ data: data })
		}
	}

	continueClick() {
		if (typeof navigator === 'object') {
			if (/mobile/i.test(navigator.userAgent)) {

			}
			else {
				if (this.state.clickedOn === 'newOrder') {
					window.open(CONFIG.PHARMEASY_NEW_ORDER_IFRAME_URL, '_blank')
				}
				else {
					window.open(CONFIG.PHARMEASY_PREV_ORDER_IFRAME_URL, '_blank')
				}
			}
		}
		setTimeout(() => {
			this.setState({
				showPopup: false
			})
		}, 1000)
	}

	hidePopup() {
		this.setState({ showPopup: false })
	}

	sbiBannerClicked = () => {
		let data = {
			'Category': 'ConsumerApp', 'Action': 'SBIGOLDBANNER', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'sbi-gold-banner'
		}
		GTM.sendEvent({ data: data })
		this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-sbi-gold-clicked&lead_source=Docprime')
	}

	closeLeadPopup() {
        this.setState({ show_popup: false })
	}
	
	nearbyHospitalViewAllClicked = ()=>{
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'HomeWidgetHospitalViewAllClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-hospital-view-all-clicked'
		}
		GTM.sendEvent({ data: gtmData })
		this.props.mergeIpdCriteria({
			commonSelectedCriterias: [],
			nextSelectedCriterias: []
		})
		this.props.history.push(`/ipd/searchHospitals`)
	}

	clickedGoldBanner = ()=>{
		this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-home-page-gold-banner&lead_source=Docprime')
	}

	afterUserLogin = ()=>{
		let is_user_insurance_active = false;
		let user_insurance_status = null;
		if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
			user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
		}
		is_user_insurance_active = (user_insurance_status==1 || user_insurance_status==5 || user_insurance_status==4 || user_insurance_status==7)
		if(is_user_insurance_active){
			setTimeout(() => {
	            SnackBar.show({ pos: 'bottom-center', text: "For insured customers, prescription upload is required at the time of booking" })
	        }, 1000)
			this.setState({is_user_insurance_active: true })
		}
	}

	render() {

		let topSpecializations = []
		let user_insurance_status = null
		let is_user_insurance_active = null;
		if (this.props.specializations && this.props.specializations.length) {
			topSpecializations = this.props.specializations;//.slice(0, 9)//this.getTopList(this.props.specializations)
		}

		let topTests = []
		if (this.props.common_tests && this.props.common_tests.length) {
			topTests = this.props.common_tests;//.slice(0, 9)//this.getTopList(this.props.common_tests)
		}

		let topPackages = []
		if (this.props.common_package && this.props.common_package.length) {
			topPackages = this.props.common_package//this.getTopList(this.props.common_package)
		}

		let profileData = this.props.profiles[this.props.selectedProfile]
		let defaultUser = this.props.profiles && this.props.defaultProfile && this.props.profiles[this.props.defaultProfile];
		
		let showGoldBanner = false;

		if(this.props.user_detail_fetched) {

			if(defaultUser && Object.keys(defaultUser).length) {

				showGoldBanner = !(this.props.is_any_user_buy_gold || defaultUser.insurance_status == 1 || defaultUser.insurance_status == 5 || defaultUser.insurance_status == 4|| defaultUser.insurance_status == 7)
			}else {
				showGoldBanner = true;
			}
		}

		if(!STORAGE.checkAuth()){
			showGoldBanner = true;
		}

		let articles = this.props.articles || []
		const parsed = queryString.parse(this.props.location.search)
		let SlabSequence = 0
		if (parsed) {
			if (parsed.journey_type == 'doctor') {
				SlabSequence = 1
			} else if (parsed.journey_type == 'lab') {
				SlabSequence = 2
			}
		}
		let isSBI = this.props.mergeState && document && typeof document == 'object' && document.location && document.location.host && document.location.host.includes('sbi')

		let showPackageStrip = this.props.compare_packages && this.props.compare_packages.length > 0 && !this.props.isPackage

		let slabOrder = []

		//Check user for insurance 
		if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
			user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
		}
		is_user_insurance_active = user_insurance_status==1 || user_insurance_status==5 || user_insurance_status==4 || user_insurance_status==7
		//For desktop View, get home page views
		if (this.props.device_info != "desktop" && SlabSequence) {

			slabOrder.push(<ChatPanel homePage={true} offerList={this.props.offerList} key="chat" />)
			slabOrder.push(
				<div className="col-md-7" key="spez">
					<div className="right-card-container">
						<UpComingAppointmentView {...this.props} />
						<HomePageWidget
							heading="Find a Doctor"
							discount="50%"
							list={topSpecializations}
							searchFunc={this.searchDoctor}
							searchType="specializations"
							historyObj={this.props.history}
							navTo="/search?from=home"
							type="opd"
							selectSearchType={this.props.selectSearchType}
						/>

						{
							!isSBI && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
								<BannerCarousel {...this.props} hideClass="d-md-none" sliderLocation="home_page" /> : ''
						}

						<div className="fw-500 doc-lap-link d-md-none">
							<span className="top-head-link card-lab-link" onClick={() => this.props.history.push('/doctorsignup')}>Register your clinic or Hospital <img width="18px" src={ASSETS_BASE_URL + "/img/arrow-link.svg"} /></span>
						</div>
					</div>
				</div>)

			slabOrder.push(
				<div className="col-md-7" key="test">
					<div className="right-card-container">
						<UpComingAppointmentView {...this.props} />
						<HomePageWidget
							heading="Book a Test"
							discount="50%"
							list={topTests}
							searchFunc={this.searchLab}
							searchType="tests"
							historyObj={this.props.history}
							navTo="/search?from=home"
							type="lab"
							selectSearchType={this.props.selectSearchType}
						/>
						
						{
							this.props.common_package && this.props.common_package.length ?
								<HomePagePackageWidget
									heading="Health Packages"
									discount="50%"
									list={topPackages}
									searchFunc={this.searchLab}
									type="package"
									searchType="packages"
									linkTo="/full-body-checkup-health-packages?from=home"
									// navTo="/health-package-advisor"
									navTo="/searchpackages"
									historyObj={this.props.history}
									selectSearchType={this.props.selectSearchType}
								/> : ""
						}

						{
							this.props.ipd_procedures && this.props.ipd_procedures.length ?
								<HomePageTopProcedures top_data={this.props.ipd_procedures} historyObj={this.props.history} mergeState={this.props.mergeState} toggleIPDCriteria={this.props.toggleIPDCriteria} />
								: ''
						}
						{
							this.props.package_categories && this.props.package_categories.length ?
								<HomePagePackageCategory top_data={this.props.package_categories} historyObj={this.props.history} />
								: ''
						}

						{
							this.props.top_hospitals && this.props.top_hospitals.length ?
								<HomePageTopHospitals top_data={this.props.top_hospitals} topHeading='Top hospitals' topHospital={true} dataType='home_top_hsptl' historyObj={this.props.history} nearbyHospitalViewAllClicked={this.nearbyHospitalViewAllClicked} />
								: ''
						}

						{
							this.props.nearbyHospitals && this.props.nearbyHospitals.hospitals && this.props.nearbyHospitals.hospitals.length ?
								<HomePageTopHospitals top_data={this.props.nearbyHospitals.hospitals} topHeading='Hospitals Near you' dataType='home_nearby-hsptl' showViewAll={true} historyObj={this.props.history} nearbyHospitalViewAllClicked={this.nearbyHospitalViewAllClicked} />
								: ''
						}

					</div>
				</div>)

			let temp
			for (var j = SlabSequence; j > 0; j--) {
				temp = slabOrder[j]
				slabOrder[j] = slabOrder[j - 1]
				slabOrder[j - 1] = temp
			}

		} else {

			slabOrder.push(<ChatPanel homePage={true} offerList={this.props.offerList} key="chat" />)
			slabOrder.push(
				<div className="col-md-7" key="upcom">
					<div className="right-card-container">
						{
							showGoldBanner?<GoldHomePageBanner clickedGoldBanner={this.clickedGoldBanner}/>:''
						}
						
						<UpComingAppointmentView {...this.props} />
						{/* {
                            !!!profileData ?
                                <div className="home-signup-banner" onClick={this.gotToSignup.bind(this)}>
                                    <div className="banner-content-home">
                                        <div className="banner-lft-content">
                                            <span className="bn-up-txt">
                                                Get extra
                                         </span>
                                            <p className="sign-up-offer">
                                                ₹ 300 OFF
                                            </p>
                                            <span className="bn-down-offer">
                                                on bookings
                                         </span>
                                        </div>
                                        <button className="signup-btn-banner">
                                            Signup Now <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} />
                                        </button>
                                    </div>
                                </div> : ''
						} */}

						{
							/*this.props.history ?
								<TopChatWidget {...this.props} history={this.props.history} /> : ''*/
						}
						{
							showGoldBanner?''
							:!isSBI ?
								<div className="banner-cont-height home-page-banner-div">
									<div className="hidderBanner banner-carousel-div d-md-none">
										<div className="divHeight m-0" style={{ marginBottom: "5px!important" }}></div>
									</div>
									{
										this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
											<BannerCarousel {...this.props} hideClass="d-md-none" sliderLocation="home_page" /> : ''
									}
								</div>
								: <div className="banner-cont-height home-page-banner-div d-md-block sbi-ban-top" onClick={this.sbiBannerClicked}>
									<div className="hidderBanner banner-carousel-div d-md-none">
										<div className="divHeight-sbi mt-0" style={{ marginBottom: "8px!important" }}></div>
									</div>
									<div className=" banner-home-scrollable mrt-20 mrb-20" style={{ position: 'absolute' }}>
										<img className="img-fluid m-0" src="https://cdn.docprime.com/media/web/custom_images/SBIG_banner-min.png" />
									</div>
								</div>
						}

						{
							this.props.top_hospitals && this.props.top_hospitals.length ?
								<HomePageTopHospitals top_data={this.props.top_hospitals} topHeading='Top hospitals' topHospital={true} dataType='home_top_hsptl' historyObj={this.props.history} nearbyHospitalViewAllClicked={this.nearbyHospitalViewAllClicked} />
								: ''
						}

						{
							this.props.nearbyHospitals && this.props.nearbyHospitals.hospitals && this.props.nearbyHospitals.hospitals.length ?
								<HomePageTopHospitals top_data={this.props.nearbyHospitals.hospitals} topHeading='Hospitals Near you' dataType='home_nearby-hsptl' showViewAll={true} historyObj={this.props.history} nearbyHospitalViewAllClicked={this.nearbyHospitalViewAllClicked} />
								: ''
						}

						<HomePageWidget
							heading="Book Doctor Appointment"
							discount="50%"
							list={topSpecializations}
							searchFunc={this.searchDoctor}
							searchType="specializations"
							historyObj={this.props.history}
							navTo="/search?from=home"
							type="opd"
							selectSearchType={this.props.selectSearchType}
						/>

						{
							showGoldBanner && !isSBI?
							<div className="banner-cont-height home-page-banner-div">
								<div className="hidderBanner banner-carousel-div d-md-none">
									<div className="divHeight m-0" style={{ marginBottom: "5px!important" }}></div>
								</div>
								{
									this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
										<BannerCarousel {...this.props} hideClass="d-md-none" sliderLocation="home_page" /> : ''
								}
							</div>
							:''
						}

						{
							this.props.common_package && this.props.common_package.length ?
								<HomePagePackageWidget
									heading="Health Packages"
									discount="50%"
									list={topPackages}
									searchFunc={this.searchLab}
									type="package"
									searchType="packages"
									linkTo="/full-body-checkup-health-packages?from=home"
									// navTo="/health-package-advisor"
									navTo="/searchpackages"
									historyObj={this.props.history}
									selectSearchType={this.props.selectSearchType}
								/> : ""
						}

						{/* x ray landing page cards */}
						{/* <div className="xray-container">
							<h1 className="xray-heading">Chest X-rays</h1>
							<div className="xray-cards">
								<div className="row no-gutters">
									<div className="col-7">
										<p className="xrayCardMainHeading">AP & LAT  View</p>
										<p className="xrayCardSubHeading">Available in 224 Labs </p>
									</div>
									<div className="col-5 text-right">
										<p className="xray-strtng">Starting at</p>
										<p className="xray-pffer">Save upto 40% <span className="xray-price">₹ 700</span></p>
										<button className="xrayBtn">Select Lab</button>
									</div>
								</div>
							</div>
						</div> */}
						{/* x ray landing page cards */}


						{/* <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, false)}>
							<p className="top-head-link card-lab-link">Run a clinic? Increase your<span>reach & brand NOW!</span> </p>
							<button className="lap-doc-btn" >Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
						</div> */}

						{/* <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, true)}>
							<p className="top-head-link card-lab-link">Run a lab? Reach more<span>customers near you</span></p>
							<button className="lap-doc-btn">Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
						</div> */}

						<HomePageWidget
							heading="Book a Test"
							discount="50%"
							list={topTests}
							searchFunc={this.searchLab}
							searchType="tests"
							historyObj={this.props.history}
							navTo="/search?from=home"
							type="lab"
							selectSearchType={this.props.selectSearchType}
						/>
						{
							this.state.is_user_insurance_active?''
							:<PrescriptionUpload historyObj={this.props.history} is_home_page={true} locationObj = {this.props.location} profiles={this.props.profiles} afterUserLogin={this.afterUserLogin}/>	
						}

						{
							// this.state.showPrescriptionInsuranceError?
							// <div className="health-advisor-col d-flex p-2 align-items-start">
							// 	<img width="17" className="info-detail-icon" src={ASSETS_BASE_URL + "/img/info-icon.svg"} />
							// 	<p className="ml-2"> For insured customers, prescription upload is required at the time of booking</p>
							// 	<img className="cursor-pntr" width="15" src={ASSETS_BASE_URL + "/img/red-times-icon.svg"} onClick={ ()=>this.setState({showPrescriptionInsuranceError: false}) } />
							// </div>:''

						}
						
						{
							this.props.package_categories && this.props.package_categories.length ?
								<HomePagePackageCategory top_data={this.props.package_categories} historyObj={this.props.history} />
								: ''
						}

						{
							this.props.ipd_procedures && this.props.ipd_procedures.length ?
								<HomePageTopProcedures top_data={this.props.ipd_procedures} historyObj={this.props.history} mergeState={this.props.mergeState} toggleIPDCriteria={this.props.toggleIPDCriteria} />
								: ''
						}

					</div>
				</div>)
		}

		return (
			<div className="profile-body-wrap">
				<HelmetTags tagsData={{
					canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
					ogUrl: 'https://docprime.com',
					ogType: 'website',
					ogTitle: 'Book Doctor Online | 50% Off on Doctor Appointment & Lab Tests',
					ogDescription: 'Book Doctor Appointment at Docprime & get 50% off. Find & Book Doctor online, find & Book best Labs, and & Hospitals.',
					ogImage: 'https://cdn.docprime.com/media/banner/images/1200X628.png'
				}} setDefault={true} />

				<ProfileHeader homePage={true} showSearch={true} showPackageStrip={showPackageStrip} new_fixed_header={1} />

				{/* {
					this.state.showPopup ?
						<BookingConfirmationPopup continueClick={() => this.continueClick()} iFramePopup={true} hidePopup={() => this.hidePopup()} /> : ''
				} */}

				{
					this.state.showPopup ?
						<Loader continueClick={() => this.continueClick()} iFramePopup={true} hidePopup={() => this.hidePopup()} /> : ''
				}

				{/* <div className="sub-header mrg-top"></div> */}
				<div className="headerSubLinkContainer">
					<div className="container">
						<div className="head_text_container">
							{/* {this.props.common_settings && this.props.common_settings.insurance_availability?
								<a href="/insurance/insurance-plans" onClick={(e) => {
									let data = {
										'Category': 'ConsumerApp', 'Action': 'MobileFooterBookTestClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'desktop-navbar-insurance-clicked'
									}
									GTM.sendEvent({ data: data })
									e.preventDefault();
									this.navigateTo("/insurance/insurance-plans?source=desktop-navbar-insurance-clicked")
								}}>OPD Insurance
								<span className="opdNewHeaderOfr">New</span>
								</a>
							:''} */}
							<a href="/vip-club-details" onClick={(e) => {
								let data = {
									'Category': 'ConsumerApp', 'Action': 'vipClickSubheader', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-click-subheader'
								}
								GTM.sendEvent({ data: data })
								e.preventDefault();
								this.props.clearVipSelectedPlan()
								this.navigateTo("/vip-gold-details?is_gold=true&source=desktop-submenu-gold-clicked&lead_source=Docprime", 'opd')
							}}>Docprime <img src={ASSETS_BASE_URL + '/img/gold-lg.png'} style={{ width: 35, marginLeft: 2, verticalAlign: 'middle' }} /><span className="opdNewHeaderOfr">New</span></a>
							<a href="/search" onClick={(e) => {
								e.preventDefault();
								this.navigateTo("/search", 'opd')
							}}>Find a Doctor</a>
							<a href="/search" onClick={(e) => {
								e.preventDefault();
								this.navigateTo("/search", 'lab')
							}}>Lab Tests</a>
							<a href="/full-body-checkup-health-packages" onClick={(e) => {
								e.preventDefault();
								this.navigateTo('/full-body-checkup-health-packages')
							}}>Health Packages</a>
							<a href="/online-consultation" onClick={(e) => {
								e.preventDefault();
								this.navigateTo('/online-consultation')
							}}>Online Doctor Consultation</a>
							{/* <a href="/online-consultation" className="order-med-list-link" onClick={(e) => {
								e.preventDefault();
							}}>Order Medicines
								<ul className="order-med-list">
									<li><a href="" onClick={(e) => {
										e.preventDefault();
										this.orderMedClick('newOrder')
									}}>New Order</a></li>
									<li><a href="" onClick={(e) => {
										e.preventDefault();
										this.orderMedClick('prevOrder')
									}}>Previous Order</a></li>
								</ul>
							</a> */}
							{/* <p onClick={(e) => {
								e.preventDefault();
								this.navigateTo('/contact')
							}}>Contact us</p> */}
						</div>
					</div>
				</div>
				<div className="chat-main-container">
					<div className="container">
					{
                        this.state.show_popup ?
                            <VipLoginPopup {...this.props}  hideLoginPopup={this.closeLeadPopup.bind(this)}  closeLeadPopup={this.closeLeadPopup.bind(this)} /> : ''
                    }
						<div className="row">
							{slabOrder}
						</div>
					</div>

					<Accordian />
					{
						showPackageStrip ?
							<PackageCompareStrip {...this.props} />
							:
							<FixedMobileFooter {...this.props} />
					}

				</div>
				<Footer specialityFooterData={this.props.static_footer_data} />
			</div>
		);
	}
}

export default HomeView