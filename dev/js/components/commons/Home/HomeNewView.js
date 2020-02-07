import React from 'react'
import DesktopProfileHeader from '../DesktopProfileHeader'
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
			clickedOn: ''
		}
	}

    
    render(){
        return(
            <div className="container-fluid p-0">
                {/****** Header *********/}
                <DesktopProfileHeader></DesktopProfileHeader>
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
                            <span>Special plans available for Corporates</span>
                        </a>
                    </section>
                    {/******  top hospitals *********/}
                    <section className="card-block-row">
                        <h6>Top Hospitals</h6>
                        {/* card slider */}
                        <div className="card-slider-container">
                            <div className="slider-card-column" id="cardBlock">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                            <div className="slider-card-column">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                        </div>
                    </section>
                    {/******  doctor apointment section *********/}
                    <section className="card-block-row">
                        <h6>Book Doctor Appointments</h6>
                        {/* card slider */}
                        <div className="card-slider-container">
                            <div className="slider-card-column" id="cardBlock">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                            <div className="slider-card-column">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                        </div>
                    </section>
                    {/******  doctor apointment section *********/}
                    {/******  Popular health packages section *********/}      
                    <section className="card-block-row">
                        <h6>Popular health Packages</h6>
                        {/* card slider */}
                        <div className="card-slider-container">
                            <div className="slider-card-column" id="cardBlock">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                            <div className="slider-card-column">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                        </div>
                    </section>    
                    {/******  Popular health packages section *********/} 
                    {/******  Book lab test *********/}      
                    <section className="card-block-row">
                        <h6>Popular health Packages</h6>
                        {/* card slider */}
                        <div className="card-slider-container">
                            <div className="slider-card-column" id="cardBlock">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                            </div>
                            <div className="slider-card-column">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                            </div>
                        </div>
                    </section>    
                    {/******  Book lab test *********/}            
                    <Accordian></Accordian>
                    {/******  Our Partners section *********/}
                    <section className="card-block-row">
                        <h6 className="text-center" style={{fontSize: 20}}>Our Partners</h6>
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
                        <div className="card-slider-container d-flex justify-content-between milestone-section" style={{padding: 25}}>
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
                        <h6 className="text-center" style={{fontSize: 20}}>Our Customer Says</h6>
                        <div className="card-slider-container cust-review d-flex justify-content-between milestone-section">
                            <div className="col-sm-4 text-center">
                                <div className="cust-img-block">
                                    <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/>
                                </div>
                                <h3>Customer Name Reviewed</h3>
                                <ul className="d-flex justify-content-center align-item-center mb-3">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <p className="text-center">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                            </div>
                            <div className="col-sm-4 text-center">
                                <div className="cust-img-block">
                                    <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/>
                                </div>
                                <h3>Customer Name Reviewed</h3>
                                <ul className="d-flex justify-content-center align-item-center mb-3">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <p className="text-center">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                            </div>
                            <div className="col-sm-4 text-center">
                                <div className="cust-img-block">
                                    <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/>
                                </div>
                                <h3>Customer Name Reviewed</h3>
                                <ul className="d-flex justify-content-center align-item-center mb-3">
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                    <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                                </ul>
                                <p className="text-center">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                            </div>
                        </div>
                    </section>       
                    {/******  customer review *********/}
                    {/******  other details *********/}
                    <section className="card-block-row">
                        <h6 className="text-center" style={{fontSize: 20}}>Download the App Now</h6>
                        <div className="row m-0">
                            <div className="col-sm-5">
                                <ul>
                                    <li>Online Consultations</li>
                                    <li>Book Doctor Appointments the Prime Way</li>
                                    <li>Doctors: For you, Near you</li>
                                    <li>Book Lab Tests and Free Health Check-Ups</li>
                                    <li>Store Medical Records</li>
                                </ul>
                                <div className="download-links d-flex align-item-center">
                                    <a href="">
                                        <img className="img-fluid" src={ASSETS_BASE_URL + "/img/google-play.png"} alt="Android"/>
                                    </a>
                                    <a href="">
                                        <img className="img-fluid" src={ASSETS_BASE_URL + "/img/ios.png"} alt="ios"/>     
                                    </a>   
                                </div>
                            </div>
                        </div>
                    </section>
                    {/******  other details *********/}
                </div>
                {/****** homepage  view *********/}
                {/****** footer *********/}
                <Footer></Footer>
                {/****** footer *********/}
            </div>
        )
    }
}

export default MainView;