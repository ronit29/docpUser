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
                    <section className="top-hospitals-row">
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
                            <div className="slider-card-column">
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
                            <div className="slider-card-column">
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
                            <div className="slider-card-column">
                                <div className="slide-img-col d-flex justify-content-center align-item-center">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/images/banner-forties.jpg"}/>
                                </div>
                                <h5 className="card-name">Medanta - The Medicity, Gurgaon Sector 38</h5>
                                <h5 className="off-txt">30% OFF</h5>
                            </div>
                        </div>
                    </section>

                    <Accordian></Accordian>
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