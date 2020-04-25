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
import CorporateLeadPopup from './CorporateLeadPopup.js'
import StaticContent from '../HomeNewView/StaticHomePageContent.js'

import GoldHomePageBanner from './GoldHomePageBanner.js'
import STORAGE from '../../../helpers/storage'



class MainView extends React.Component{
    
    constructor(props) {
        super(props);
        // let footerData = null
        // if (this.props.initialServerData) {
        //     footerData = this.props.initialServerData.footerData
        // }
        this.state = {
            // specialityFooterData: footerData,
            showPopup: false,
            clickedOn: '',
            show_popup:false,
            is_user_insurance_active: false,
            openCorporateBlock: false
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
        //     this.setState({ specialityFooterData: cb });
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
        
        //background circle animation
        if(window){
            const mView = document.getElementById('mainView');
            window.addEventListener('scroll',  () => {
                
                //background circle animatiom
                var positionY = window.pageYOffset/2;
                mView.style.backgroundPosition = `0 -${positionY}px`;
            });
            
        }
        //background circle animation

        //count animation
        
        const cVal1 = document.getElementById('countNum');
        const cVal2 = document.getElementById('countNum2');
        this.animateValue(cVal1);
        this.animateValue(cVal2); 
        //count animation
        CRITEO.sendData(data)
    }

    animateValue = (obj) => {
        let start = 25000;
        let end = null;
        let duration = 3000;
        if (obj) {
            // save starting text for later (and as a fallback text if JS not running and/or google)
            let textStarting = obj.innerHTML;
    
            // remove non-numeric from starting text if not specified
            //end = end || parseInt(textStarting.replace(/\D/g, ""));
            end = end || parseFloat(textStarting);

            let range = end - start;
    
            // no timer shorter than 50ms (not really visible any way)
            let minTimer = 100;
    
            // calc step time to show all interediate values
            let stepTime = Math.abs(Math.floor(duration / range));
    
            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);
    
            // get current time and calculate desired end time
            let startTime = new Date().getTime();
            let endTime = startTime + duration;
            let timer;
            //const posY = window.pageYOffset;
            const run = () => {
                let now = new Date().getTime();
                let remaining = Math.max((endTime - now) / duration, 0);
                let value = Math.round(end - (remaining * range));
                // replace numeric digits only in the original string
                obj.innerHTML = textStarting.replace(/([0-9]+)/g, value);
                if (value == end) {
                    clearInterval(timer);
                }
            }
            window.addEventListener('scroll', ()=>{
                if ( window.pageYOffset >= 1000){
                    timer = setInterval(run, stepTime);
                    run();
                }
            })
        }
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

    searchLab = (test ) =>{
        let data
        if (test.topPackages) {
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

        if (test.topPackages) {
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

    goToSearch = (data)=>{
        if (data.type) {
            this.props.selectSearchType(data.type)
        }
        this.props.history.push(data.where)
    }

    searchHospitals = (data) => {
        
        let gtmData = {}
        if(data.topHospitals) {
            gtmData = {
               'Category': 'ConsumerApp', 'Action': 'HomeWidgetHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
            }
        }else{
            gtmData = {
               'Category': 'ConsumerApp', 'Action': 'HomeWidgetNearbyHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-nearby-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
            }
        }
        
        GTM.sendEvent({ data: gtmData })

        let redirectUrl = ''

        if(data.url) {
            redirectUrl = `/${data.url}`
        }else {
            redirectUrl = `/ipd/hospital/${data.id}`
        }

        if(data.is_ipd_hospital) {
            redirectUrl+= `?showPopup=true`
        }
        this.props.history.push(redirectUrl)
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

    getCorporateLead = ()=>{
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'CorporateHomePageClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'corporate-home-page-clicked'
        }
        GTM.sendEvent({ data: gtmData })
        this.setState({openCorporateBlock: true})
    }

    cancelOverlay = ()=>{
        this.setState({openCorporateBlock: false})   
    }

    pushLeads = (data)=>{
        const parsed = queryString.parse(window.location.search)
        let params = {...data};
        if(parsed){
            params['source'] = {
                utm_source: parsed.utm_source||'',
                utm_term: parsed.utm_term||'',
                utm_medium: parsed.utm_medium||'',
                utm_campaign: parsed.utm_campaign||''
            }
        }
        this.props.NonIpdBookingLead(params).then(()=>{
            SnackBar.show({ pos: 'bottom-center', text: "Response Submitted Successfully" });
            this.cancelOverlay();
        })
        
    }

    clickedGoldBanner = ()=>{
        let data = {
        'Category': 'ConsumerApp', 'Action': 'MobileHomePageGoldBannerClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-homepage-gold-banner-clicked'
        }
        GTM.sendEvent({ data: data });
        this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-home-page-gold-banner&lead_source=Docprime')
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

        let showGoldBanner = false;

        if(this.props.user_detail_fetched) {

            if(defaultUserProfile && Object.keys(defaultUserProfile).length) {

                showGoldBanner = !(this.props.is_any_user_buy_gold || defaultUserProfile.insurance_status == 1 || defaultUserProfile.insurance_status == 5 || defaultUserProfile.insurance_status == 4|| defaultUserProfile.insurance_status == 7)
            }else {
                showGoldBanner = true;
            }
        }

        if(!STORAGE.checkAuth()){
            showGoldBanner = true;
        }

        return(
            <React.Fragment>
                <div className="container-fluid p-0">
                    {/****** Header *********/}
                    <DesktopProfileHeader homePage={true} showSearch={true} showPackageStrip={showPackageStrip} new_fixed_header={1}/>

                    {
                        this.state.openCorporateBlock?
                        <CorporateLeadPopup cancelOverlay={this.cancelOverlay} pushLeads={this.pushLeads}/>
                        :''
                    }
                    {/****** homepage  view *********/}
                    <div className="new-main-view" id="mainView">
                    {
                            showGoldBanner?
                            <section className="card-block-row banner-slider-row mbl-banner">
                                {
                                    !isSBI && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
                                        <BannerCarousel {...this.props} sliderLocation="home_page" /> : ''
                                }
                                
                            </section>
                            :''
                        }
                        {/******  desktop banner *********/}
                        <section className="card-block-row banner-slider-row d-banner">
                                {
                                    !isSBI && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
                                        <BannerCarousel {...this.props} sliderLocation="home_page" /> : ''
                                }
                            </section>
                        {/******  desktop banner *********/}  

                        {/******  full width banner *********/}
                        <UpComingAppointmentView {...this.props} />
                        <section className="d-none full-banner-section">
                            <img style={{width:'100%'}} className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Gold_home-min_1.png" onClick={(e) => {
                                let data = {
                                'Category': 'ConsumerApp', 'Action': 'MobileLeftMenuGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-leftmenu-gold-clicked'
                                }
                                GTM.sendEvent({ data: data });
                                this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-leftmenu-gold-clicked&lead_source=Docprime')
                            }} />
                            <a href="" onClick={(e)=>e.preventDefault()}>
                                <span onClick={this.getCorporateLead} >Special plans available for Corporates 
                                    <span className="down-icon-yellow">&gt;</span>
                                </span>
                            </a>
                        </section>
                        {/******  mbl banner *********/}
                        {
                            showGoldBanner?'':
                            <section className="card-block-row banner-slider-row mbl-banner">
                                {
                                    !isSBI && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
                                        <BannerCarousel {...this.props} sliderLocation="home_page" /> : ''
                                }
                                
                            </section>  
                        }
                            
                        {/******  mbl banner *********/}

                        {/******  top hospitals *********/}

                        {
                            showGoldBanner?<GoldHomePageBanner clickedGoldBanner={this.clickedGoldBanner}/>:''
                        }

                        {
                            this.props.top_hospitals && this.props.top_hospitals.length?
                            <HomePageWidget
                                heading="Top Hospitals"
                                list={this.props.top_hospitals}
                                topHospitals={true}
                                dataType='home_top_hsptl'
                                historyObj ={this.props.history}
                                searchFunc={this.searchHospitals}
                            />
                            :''
                        }
                        

                        {
                            this.props.nearbyHospitals && this.props.nearbyHospitals.hospitals && this.props.nearbyHospitals.hospitals.length?
                            <HomePageWidget
                                heading="Hospitals Near you"
                                list={this.props.nearbyHospitals.hospitals}
                                dataType='home_nearby-hsptl'
                                historyObj ={this.props.history}
                                searchFunc={this.searchHospitals}
                            />
                            :''
                        }
                        

                        {/******  doctor apointment section *********/}
                        {
                            topSpecializations && topSpecializations.length?
                            <HomePageWidget
                                heading="Book Doctor Appointments"
                                rightText= "Search more specializations"
                                rightButtonClicked = {this.goToSearch}
                                searchFunc={this.searchDoctor}
                                list={topSpecializations}
                                dataType='home_top_specz'
                                discount="50%"
                                historyObj ={this.props.history}
                                type="opd"
                                navTo="/search?from=home"
                                count={10}
                                searchType="specializations"
                                historyObj={this.props.history}
                                locationObj={this.props.location}
                                selectSearchType={this.props.selectSearchType}
                            />
                            :''
                        }
                        

                        
                        
                        {/******  Popular health packages section *********/}    
                        {
                            topPackages && topPackages.length?
                            <HomePageWidget
                                heading="Popular Health Packages"
                                rightText= "View all"
                                rightButtonClicked = {this.goToSearch}
                                topPackages= {true}
                                list={topPackages}
                                searchFunc={this.searchLab}
                                dataType='home_top_pckg'
                                historyObj ={this.props.history}
                                type="package"
                                navTo="/searchpackages"
                                //count={8} 
                                // searchType="packages"
                                // historyObj={this.props.history}
                                // locationObj={this.props.location}
                                // selectSearchType={this.props.selectSearchType}
                            />
                            :''
                        }  
                        
                          
                        {/******  Book lab test *********/}  
                        
                        {
                            topTests && topTests.length?
                            <HomePageWidget
                                heading="Book Lab Tests"
                                rightText= "Search more test"
                                rightButtonClicked = {this.goToSearch}
                                list={topTests}
                                searchFunc={this.searchLab}
                                dataType='home_top_tests'
                                discount="50%"
                                historyObj ={this.props.history}
                                type="lab"
                                navTo="/search?from=home"
                                count={10}
                                is_user_insurance_active={this.state.is_user_insurance_active}
                                historyObj={this.props.history}
                                locationObj={this.props.location}
                                afterUserLogin={this.afterUserLogin}
                                profiles={this.props.profiles}
                                searchType="tests"
                                selectSearchType={this.props.selectSearchType}
                            />
                            :''
                        }
                        
                        

                        {
                            this.state.is_user_insurance_active?''
                            :<PrescriptionUpload historyObj={this.props.history} is_home_page={true} locationObj = {this.props.location} profiles={this.props.profiles} afterUserLogin={this.afterUserLogin}/>  
                        }


        
                        <StaticContent />
                        <Accordian/>
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
                                    <a href="https://docprimeapp.page.link/HomepageAppInstallAndroid" target="_blank">
                                        <img width="180" style={{ marginLeft: "-12px"}} src={ASSETS_BASE_URL + "/img/google-play.png"} alt="Android"/>
                                    </a>
                                    <a href="https://docprimeapp.page.link/HomepageAppInstalliOS" target="_blank">
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
                    <FixedMobileFooter {...this.props} />
                    <Footer specialityFooterData={this.props.static_footer_data}/>
                    {/****** footer *********/}
                </div>
                {/****** chat view button  *********/}
                <div className="d-none new-chat-box">
                    <input type="checkbox"/>
                    <div className="chatbox-main mb-3">

                        <ChatPanel  key="chat" homePage={true} offerList={this.props.offerList}/>
                    </div>
                    <div className="chat-box-circle d-flex justify-content-center align-items-center text-center flex-column">
                        <img height="17" className="img-fluid" src={ASSETS_BASE_URL + "/img/chat.svg"} alt="chat"/>   
                        <h6>Doctor <br/>Consultation</h6> 
                        <h3 className="align-items-center justify-content-center">
                        <img src={ASSETS_BASE_URL + "/img/minimize.svg"} alt="cancel"/>
                        </h3>
                    </div>
                </div>
                {/****** chat view button  *********/}
            </React.Fragment>

        )
    }
}

export default MainView;