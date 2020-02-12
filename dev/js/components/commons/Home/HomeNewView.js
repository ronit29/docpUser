import React from 'react'
import DesktopProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'
import ChatPanel from '../ChatPanel'
import HelmetTags from '../HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'
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
import HomePageWidget from '../HomeNewView/HomePageWidget.js'

class MainView extends React.Component{
    
    constructor(props) {
        super(props);
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            specialityFooterData: footerData,
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

    searchLab = (test, isPackage = false) =>{
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

    searchDoctor = (speciality) =>{
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

    sbiBannerClicked= ()=>{
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

    
    render(){

        const parsed = queryString.parse(this.props.location.search)
        let topSpecializations = []
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

        let articles = this.props.articles || []
        
        let isSBI = this.props.mergeState && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')

        let showPackageStrip = this.props.compare_packages && this.props.compare_packages.length > 0 && !this.props.isPackage

        let defaultUserProfile = null
        if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
            defaultUserProfile = this.props.profiles[this.props.defaultProfile];
        }

        return(
            <div className="container-fluid p-0">
                {/****** Header *********/}
                <DesktopProfileHeader/>

                {/* header */}
                {/****** Header *********/}
                {/****** homepage  view *********/}
                <div className="new-main-view">
                    {/******  full width banner *********/}
                    <section className="full-banner-section">
                        <img  className="img-fluid" src={ASSETS_BASE_URL + "/img/banners/banner-home.png"} onClick={(e) => {
                            let data = {
                              'Category': 'ConsumerApp', 'Action': 'MobileLeftMenuGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-leftmenu-gold-clicked'
                            }
                            GTM.sendEvent({ data: data })
                            e.preventDefault()
                            this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-leftmenu-gold-clicked&lead_source=Docprime')
                          }} />
                        <a href="">
                            <span>Special plans available for Corporates 
                                <span className="down-icon-yellow">&gt;</span>
                            </span>
                        </a>
                    </section>
                
                    {/******  top hospitals *********/}
                    <HomePageWidget
                        heading="Top Hospitals"
                        list={this.props.top_hospitals}
                        dataType='home_top_hsptl'
                        historyObj ={this.props.history}
                    />

                    {/******  doctor apointment section *********/}
                    <HomePageWidget
                        heading="Book Doctor Appointments"
                        rightText= "Search more specializations"
                        rightButtonClicked = {()=>this.props.history.push('/')}
                        list={topSpecializations}
                        dataType='home_top_specz'
                        discount="50%"
                        historyObj ={this.props.history}
                    />
                    
                    {/******  Popular health packages section *********/}      
                    <HomePageWidget
                        heading="Popular Health Packages"
                        rightText= "View all"
                        rightButtonClicked = {()=>this.props.history.push('/')}
                        list={topPackages}
                        dataType='home_top_pckg'
                        historyObj ={this.props.history}
                    />
  
                    {/******  Book lab test *********/}  
                    {/*<HomePageWidget
                        heading="Hospitals Near you"
                        list={this.props.nearbyHospitals.hospitals}
                        dataType='home_nearby-hsptl'
                        historyObj ={this.props.history}
                    />*/}

                    <HomePageWidget
                        heading="Book Lab Tests"
                        rightText= "Search more test"
                        rightButtonClicked = {()=>this.props.history.push('/')}
                        list={topTests}
                        dataType='home_top_specz'
                        discount="50%"
                        historyObj ={this.props.history}
                    />
    
                    <Accordian/>
                    {/******  Our Partners section *********/}
                    <section className="card-block-row">
                        <h6 className="text-center fw-500 our-partner-heading-text">Our Partners</h6>
                        <div className="card-slider-container partner-section d-flex justify-content-center align-item-center flex-wrap">
                            <div className="partner-img-block">
                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/medanta-the-medicity.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/indraprastha-apollo-hospital_sbxKZBF.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/artemis-hospital_o9URBGQ.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/blk-super-speciality-hospital_yJRgqOP.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/608573a2d2a6c760ccccc70773ab3e56.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid transform-sc-1" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/Thyrocare_JthRqFf.png" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid transform-sc-1" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/metropolis.jpg" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid transform-sc-1" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife.png" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid transform-sc-1" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/healtiens.png" alt="Partners"/>   
                            </div>
                            <div className="partner-img-block">
                                <img className="img-fluid transform-sc-1" src={ASSETS_BASE_URL + "/img/mahajan-imaging.png"}  alt="Partners"/>   
                            </div>
                        </div>
                    </section>
                    {/******  Our Partners section *********/}
                    {/******  Where we are *********/}
                    <section className="card-block-row">
                        <div className="card-slider-container d-flex justify-content-between milestone-section">
                            <div className="round-col d-flex justify-content-center align-item-center flex-column">
                                <ul className="d-flex">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <h3>we are here <br/>so far</h3>  
                            </div>
                            <div className="consultation-col">
                                <h3 className="fw-500 text-right">
                                    <span>1 Lakh +</span><br/>
                                    <span>Doctor and Lab Appointments</span>
                                </h3>
                                <h3 className="fw-500 text-right">
                                    <span>10 Lakh +</span><br/>
                                    <span>Online Consultation</span>
                                </h3>
                            </div>
                            <div className="consultation-col left-border">
                                <h4 className="fw-500 text-left">
                                    <span>30,000 +</span><br/>
                                    <span>Doctor Network</span>
                                </h4>
                                <h4 className="fw-500 text-left">
                                    <span>2 Lakh +</span><br/>
                                    <span>Prescription Generated</span>
                                </h4>
                                <h4 className="fw-500 text-left">
                                    <span>5,000 +</span><br/>
                                    <span>Lab Network</span>
                                </h4>
                            </div>
                        </div>
                    </section>
                    {/******  Where we are *********/} 
                    {/******  customer review *********/}
                    <section className="card-block-row ">
                        <h6 className="text-center fw-500 customer-review-heading">Our Customer Says</h6>
                        <div className="card-slider-container cust-review d-flex justify-content-between cust-feedback-col">
                            <div className="col-12 col-sm-4 text-center">
                                <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                    <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/>
                                    {/* <span>CNR</span> */}
                                </div>
                                <h3>Customer Name Reviewed</h3>
                                <ul className="d-flex justify-content-center align-item-center mb-2">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <p className="text-center mb-2">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                                <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/>
                            </div>
                            <div className="col-12 col-sm-4 text-center">
                                <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                    {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                                    <span>CNR</span>
                                </div>
                                <h3>Customer Name Reviewed</h3>
                                <ul className="d-flex justify-content-center align-item-center mb-2">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <p className="text-center mb-2">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                                <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/>
                            </div>
                            <div className="col-12 col-sm-4 text-center">
                                <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                    {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                                    <span>CNR</span>
                                </div>
                                <h3>Customer Name Reviewed</h3>
                                <ul className="d-flex justify-content-center align-item-center mb-2">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <p className="text-center mb-2">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                                <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/>
                            </div>
                        </div>

                        {/* slider buttons */}
                        <a className="pkg-btnlft"> 
                            <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left"/>
                        </a>
                        <a className="pkg-btnrgt"> 
                            <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-right"/>
                        </a>
                    </section>       
                    {/******  customer review *********/}
                </div>
                {/******  other details *********/}
                <section className="card-block-row detail-row">
                    <h6>Download the App Now</h6>
                    <div className="row m-0">
                        <div className="col-12 col-sm-6 col-lg-5 other-details p-0">
                            <ul>
                                <li>Online Consultations</li>
                                <li>Book Doctor Appointments the Prime Way</li>
                                <li>Doctors: For you, Near you</li>
                                <li>Book Lab Tests and Free Health Check-Ups</li>
                                <li>Store Medical Records</li>
                            </ul>
                            <div className="download-links d-flex align-item-center">
                                <a href="">
                                    <img width="180" style={{ marginLeft: "-12px"}} src={ASSETS_BASE_URL + "/img/google-play.png"} alt="Android"/>
                                </a>
                                <a href="">
                                    <img width="160" src={ASSETS_BASE_URL + "/img/ios.png"} alt="ios"/>     
                                </a>   
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-7 demo-mbl-screen-col">
                            <img className="img-fluid" src={ASSETS_BASE_URL + "/img/demo-mbl.png"} alt="ios"/> 
                        </div>
                    </div>
                </section>
                {/******  other details *********/}
                {/****** homepage  view *********/}
                {/****** footer *********/}
                <Footer></Footer>
                {/****** footer *********/}

                {/****** chat view button  *********/}
                <div className="new-chat-box">
                    <input type="checkbox"/>
                    <div className="chatbox-main mb-3">
                        <ChatPanel  key="chat" />
                    </div>
                    <div className="chat-box-circle d-flex justify-content-center align-items-center text-center flex-column">
                        <img height="17" className="img-fluid" src={ASSETS_BASE_URL + "/img/chat.svg"} alt="chat"/>   
                        <h6>Doctor <br/>Consultation</h6> 
                        <h3 className="align-items-center justify-content-center">
                          <img src={ASSETS_BASE_URL + "/img/cancel.svg"} alt="cancel"/>
                        </h3>
                    </div>
                </div>
                {/****** chat view button  *********/}
            </div>
        )
    }
}

export default MainView;