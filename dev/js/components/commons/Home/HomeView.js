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
const queryString = require('query-string');
import CRITEO from '../../../helpers/criteo.js'

const GENDER = {
	"m": "Male",
	"f": "Female",
	"o": "Other"
}

class HomeView extends React.Component {
	constructor(props) {
		super(props);
		let footerData = null
		if (this.props.initialServerData) {
			footerData = this.props.initialServerData.footerData
		}
		this.state = {
			specialityFooterData: footerData
		}
	}

	componentDidMount() {
		if (window) {
			window.scrollTo(0, 0)
		}

		this.props.getSpecialityFooterData((cb) => {
			this.setState({ specialityFooterData: cb });
		});

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

		let slabOrder = []
		if (this.props.device_info != "desktop" && SlabSequence) {

			slabOrder.push(<ChatPanel homePage={true} offerList={this.props.offerList} />)
			slabOrder.push(
				<div className="col-md-5">
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
							this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
								<BannerCarousel {...this.props} hideClass="d-md-none" sliderLocation="home_page" /> : ''
						}

						<div className="fw-500 doc-lap-link d-md-none">
							<span className="top-head-link card-lab-link" onClick={() => this.props.history.push('/doctorsignup')}>Register your clinic or Hospital <img width="18px" src={ASSETS_BASE_URL + "/img/arrow-link.svg"} /></span>
						</div>
					</div>
				</div>)

			slabOrder.push(
				<div className="col-md-5">
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
								<HomePageWidget
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

					</div>
				</div>)

			let temp
			for (var j = SlabSequence; j > 0; j--) {
				temp = slabOrder[j]
				slabOrder[j] = slabOrder[j - 1]
				slabOrder[j - 1] = temp
			}

		} else {

			slabOrder.push(<ChatPanel homePage={true} offerList={this.props.offerList} />)
			slabOrder.push(
				<div className="col-md-5">
					<div className="right-card-container">
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
							this.props.common_package && this.props.common_package.length ?
								<HomePageWidget
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

						<div className="banner-cont-height">
							<div className="hidderBanner banner-carousel-div d-md-none">
								<div className="divHeight"></div>
							</div>
							{
								this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
									<BannerCarousel {...this.props} hideClass="d-md-none home-slider-position" sliderLocation="home_page" /> : ''
							}
						</div>


						{/* <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, false)}>
							<p className="top-head-link card-lab-link">Run a clinic? Increase your<span>reach & brand NOW!</span> </p>
							<button className="lap-doc-btn" >Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
						</div> */}

						<HomePageWidget
							heading="Book Doctor Appointment"
							discount="50%"
							list={topSpecializations}
							searchFunc={(sp) => this.searchDoctor(sp)}
							searchType="specializations"
							{...this.props}
							navTo="/search?from=home"
							type="opd"
						/>

						{/* <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, true)}>
							<p className="top-head-link card-lab-link">Run a lab? Reach more<span>customers near you</span></p>
							<button className="lap-doc-btn">Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
						</div> */}

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

					</div>
				</div>)
		}

		return (
			<div className="profile-body-wrap">

				<HelmetTags tagsData={{
					canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
				}} setDefault={true} />

				<ProfileHeader homePage={true} showSearch={true} />

				{/* <div className="sub-header mrg-top"></div> */}
				<div className="headerSubLinkContainer">
					<div className="container">
						<div className="head_text_container">
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
							{/* <p onClick={(e) => {
								e.preventDefault();
								this.navigateTo('/contact')
							}}>Contact us</p> */}
						</div>
					</div>
				</div>
				<div className="chat-main-container">
					<div className="container">
						<div className="row">
							{slabOrder}
						</div>
					</div>

					<Accordian />
					{
						this.props.compare_packages && this.props.compare_packages.length > 0 && !this.props.isPackage ?
							<PackageCompareStrip {...this.props} />
							:
							<FixedMobileFooter {...this.props} />
					}

				</div>
				<Footer specialityFooterData={this.state.specialityFooterData} />
			</div>
		);
	}
}

export default HomeView