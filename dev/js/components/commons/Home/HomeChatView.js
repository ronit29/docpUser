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
import HomePageTopHospitals from './HomePageTopHospitals.js'
import HomePageTopProcedures from './HomePageProcedureWidgets.js'

const GENDER = {
	"m": "Male",
	"f": "Female",
	"o": "Other"
}

class HomeChatView extends React.Component {
	constructor(props) {
		super(props);
		// let footerData = null
		// if (this.props.initialServerData) {
		// 	footerData = this.props.initialServerData.footerData
		// }
		this.state = {
			specialityFooterData: this.props.static_footer_data
		}
	}

	componentDidMount() {
		if (window) {
			window.scrollTo(0, 0)
		}

		// this.props.getSpecialityFooterData((cb) => {
		// 	this.setState({ specialityFooterData: cb });
		// });

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

	searchLab(test, isPackage = false) {
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

	searchDoctor(speciality) {
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

	render() {

		let topSpecializations = []
		if (this.props.specializations && this.props.specializations.length) {
			topSpecializations = this.getTopList(this.props.specializations)
		}

		let topTests = []
		if (this.props.common_tests && this.props.common_tests.length) {
			topTests = this.getTopList(this.props.common_tests)
		}

		let topPackages = []
		if (this.props.common_package && this.props.common_package.length) {
			topPackages = this.getTopList(this.props.common_package)
		}

		let profileData = this.props.profiles[this.props.selectedProfile]
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

		let showPackageStrip = this.props.compare_packages && this.props.compare_packages.length > 0 && !this.props.isPackage

		let slabOrder = []
		if (this.props.device_info != "desktop" && SlabSequence) {

			slabOrder.push(<ChatPanel key="1" homePage={true} chatPage={true} offerList={this.props.offerList} webChatPage={true}/>)
			/*slabOrder.push(
				<div key="2" className="col-md-5">
					<div className="right-card-container">
						<UpComingAppointmentView {...this.props} />
						<HomePageWidget
							heading="Find a Doctor"
							discount="50%"
							list={topSpecializations}
							searchFunc={(sp) => this.searchDoctor(sp)}
							searchType="specializations"
							{...this.props}
							navTo="/search?from=home"
							type="opd"
						/>

						{
							this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'online_consultation').length ?
								<BannerCarousel {...this.props} hideClass="d-md-none" sliderLocation="online_consultation" /> : ''
						}

						<div className="fw-500 doc-lap-link d-md-none">
							<span className="top-head-link card-lab-link" onClick={() => this.props.history.push('/doctorsignup')}>Register your clinic or Hospital <img width="18px" src={ASSETS_BASE_URL + "/img/arrow-link.svg"} /></span>
						</div>
					</div>
				</div>)*/

			/*slabOrder.push(
				<div key="3" className="col-md-5">
					<div className="right-card-container">
						<UpComingAppointmentView {...this.props} />
						<HomePageWidget
							heading="Book a Test"
							discount="50%"
							list={topTests}
							searchFunc={(ct) => this.searchLab(ct, false)}
							searchType="tests"
							{...this.props}
							navTo="/search?from=home"
							type="lab"
						/>

						{
							this.props.common_package && this.props.common_package.length ?
								<HomePagePackageWidget
									heading="Health Packages"
									discount="50%"
									list={topPackages}
									searchFunc={(ct) => this.searchLab(ct, true)}
									type="package"
									searchType="packages"
									{...this.props}
									linkTo="/full-body-checkup-health-packages?from=home"
									// navTo="/health-package-advisor"
									navTo="/searchpackages"
								/> : ""
						}

						{
							this.props.ipd_procedures && this.props.ipd_procedures.length ?
								<HomePageTopProcedures {...this.props} top_data={this.props.ipd_procedures} />
								: ''
						}

						{
							this.props.top_hospitals && this.props.top_hospitals.length ?
								<HomePageTopHospitals {...this.props} top_data={this.props.top_hospitals} />
								: ''
						}

					</div>
				</div>)

			let temp
			for (var j = SlabSequence; j > 0; j--) {
				temp = slabOrder[j]
				slabOrder[j] = slabOrder[j - 1]
				slabOrder[j - 1] = temp
			}*/

		} else {

			slabOrder.push(<ChatPanel key="12" homePage={true} chatPage={true} offerList={this.props.offerList} webChatPage={true} />)
			//slabOrder.push(
				{/*<div key="22" className="col-md-5">*/}
					{/*<div className="right-card-container">*/}
						{/*<UpComingAppointmentView {...this.props} />*/}
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
							/*this.props.top_hospitals && this.props.top_hospitals.length ?
								<HomePageTopHospitals {...this.props} top_data={this.props.top_hospitals} />
								: ''*/
						}

						{
							/*this.props.ipd_procedures && this.props.ipd_procedures.length ?
								<HomePageTopProcedures {...this.props} top_data={this.props.ipd_procedures} />
								: ''*/
						}

						{
							/*this.props.common_package && this.props.common_package.length ?
								<HomePagePackageWidget
									heading="Health Packages"
									discount="50%"
									list={topPackages}
									searchFunc={(ct) => this.searchLab(ct, true)}
									type="package"
									searchType="packages"
									{...this.props}
									linkTo="/full-body-checkup-health-packages?from=home"
									// navTo="/health-package-advisor"
									navTo="/searchpackages"
								/> : ""*/
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

						{/*<div className="banner-cont-height home-page-banner-div">
							<div className="hidderBanner banner-carousel-div d-md-none">
								<div className="divHeight"></div>
							</div>
							{
								this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'online_consultation').length ?
									<BannerCarousel {...this.props} hideClass="d-md-none" sliderLocation="online_consultation" /> : ''
							}
						</div>*/}

						{/* <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, false)}>
							<p className="top-head-link card-lab-link">Run a clinic? Increase your<span>reach & brand NOW!</span> </p>
							<button className="lap-doc-btn" >Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
						</div> */}

						{/*<HomePageWidget
							heading="Book Doctor Appointment"
							discount="50%"
							list={topSpecializations}
							searchFunc={(sp) => this.searchDoctor(sp)}
							searchType="specializations"
							{...this.props}
							navTo="/search?from=home"
							type="opd"
						/>*/}

						{/* <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, true)}>
							<p className="top-head-link card-lab-link">Run a lab? Reach more<span>customers near you</span></p>
							<button className="lap-doc-btn">Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
						</div> */}

						{/*<HomePageWidget
							heading="Book a Test"
							discount="50%"
							list={topTests}
							searchFunc={(ct) => this.searchLab(ct, false)}
							searchType="tests"
							{...this.props}
							navTo="/search?from=home"
							type="lab"
						/>*/}

					/*</div>
				</div>*/
				//)
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

				<ProfileHeader homePage={true} chatPage={true} showSearch={true} showPackageStrip={showPackageStrip} />

				{/* <div className="sub-header mrg-top"></div> */}
				{/* <div className="headerSubLinkContainer">
					<div className="container">
						<div className="head_text_container">
							<a href="/vip-club-details" onClick={(e) => {
								let data = {
									'Category': 'ConsumerApp', 'Action': 'vipClickSubheader', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-click-subheader'
								}
								GTM.sendEvent({ data: data })
								e.preventDefault();
								this.props.clearVipSelectedPlan()
								this.navigateTo("/vip-gold-details?is_gold=true&source=mobile-leftmenu-gold-clicked&lead_source=Docprime", 'opd')
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
						</div>
					</div>
				</div> */}
				<div className="chat-main-container">
					<div className="container">
						<div className="row justify-content-center">
							{slabOrder}
						</div>
					</div>

					{/*<Accordian />*/}
					{
						/*showPackageStrip ?
							<PackageCompareStrip {...this.props} />
							:
							<FixedMobileFooter {...this.props} />*/
					}

				</div>
				{/*<Footer specialityFooterData={this.state.specialityFooterData} />*/}
			</div>
		);
	}
}

export default HomeChatView