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
                {/* header */}
                <DesktopProfileHeader></DesktopProfileHeader>
                {/* header */}
                
                {/* homepage  view */}
                <div className="new-main-view">
                    {/* full width banner */}
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

                    {/* top hospitals */}
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
                    <section className="card-block-row milestone-section">
                        <div className="col-sm-4 left-circle-col">
                          <h3>where are here so far</h3>
                        </div>
                        <div className="col-sm-8"></div>
                    </section>
                    {/******  Where we are *********/}       

                </div>
                {/* homepage  view */}

                {/* footer */}
                <Footer></Footer>
                {/* footer */}
            </div>
        )
    }
}

export default MainView;