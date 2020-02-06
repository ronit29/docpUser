import React from 'react'
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
                <ProfileHeader></ProfileHeader>
                {/* header */}
                
                {/* homepage  view */}
                <div className="new-main-view">
                    {/* full width banner */}
                    <section className="full-banner-section">
                        <a href="">special plans available for Corporates</a>
                    </section>

                    {/* top hospitals */}
                    <section className="top-hospitals-row">
                        
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