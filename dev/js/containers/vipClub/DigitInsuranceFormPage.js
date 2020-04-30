import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile } from '../../actions/index.js'
import DigitInsuranceForm from '../../components/vipClub/digitInsuranceForm.js'
import DigitStaticDataView from '../../components/vipClub/digitStaticDataView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class DigitInsuranceFormPage extends React.Component{

    constructor(props) {    
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            source:parsed.source,
            is_from_organic:parsed.fromOrganic,
            is_pb:parsed.utm_source?parsed.utm_source && parsed.utm_source.includes('policybazaar.com'):false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <div className="profile-body-wrap">
                    <ProfileHeader showPackageStrip={true} />
                        <section className="container article-container bottomMargin">
                            <div className="row main-row parent-section-row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-10 center-column">
                                    <div className="container-fluid mt-20">
                                        <div>
                                            {/* ==================== top section with icons and listing ==================== */}
                                            <DigitStaticDataView /> 
                                            {/* ==================== top section with icons and listing ==================== */}
                                            {/* ==================== Steps Container ==================== */}
                                            <div className="widget mrb-10 digi-step">
                                                <div className="ins-status-container">
                                                    <div className="navigation_menu" id="">
                                                        <ul className="navigation_tabs" id="">
                                                            <li className="tab_inactive">
                                                                <a href="#">Choose Your Plan</a>
                                                            </li>
                                                            <li className='tab_inactive'>
                                                                <a href="#">Fill Member Details</a>
                                                            </li>
                                                            <li className="tab_disabled">
                                                                <a href="#">Payment</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <DigitInsuranceForm />
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            {/* ==================== Common button ==================== */}
                            <div className="sticky-btn fixed insuBtnsContainer">
                                <button className="insu-right-orng-btn ins-buy-btn">Buy Now</button>
                            </div>
                            {/* ==================== Common button ==================== */}
                        </section>
                    </div>
                </div >
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { common_utm_tags, user_loggedIn_number } = state.USER


    return {
        USER,  common_utm_tags, user_loggedIn_number
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        getUserProfile: () => dispatch(getUserProfile()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp,extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(DigitInsuranceFormPage)