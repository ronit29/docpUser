import React from 'react';

import LabDetails from '../commons/labDetails/index.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'
import Footer from '../../commons/Home/footer'

class LabView extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            footerData,
            seoFriendly: this.props.match.url.includes('-lpp')
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }
    }

    bookLab() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabBookingClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-booking-clicked'
        }
        GTM.sendEvent({ data: data })
        /*
                let testIds = this.props.LABS[this.props.selectedLab] || []
        
                testIds = testIds.tests.map(x => x.test_id)
        
                this.props.getLabById(this.props.selectedLab, testIds)
        */
        if (this.state.seoFriendly) {
            this.props.history.push(`${window.location.pathname}/booking?lab_id=${this.props.selectedLab}`)
        } else {
            this.props.history.push(`/lab/${this.props.selectedLab}/book`)
        }
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {

        let lab_id = this.props.selectedLab
        if (this.props.initialServerData && this.props.initialServerData.labId) {
            lab_id = this.props.initialServerData.labId
        }
        let seo_url = ""
        if (this.props.LABS[lab_id]) {
            seo_url = this.props.LABS[lab_id].lab.url
            if (seo_url) {
                seo_url = "/" + seo_url
            }
        }
        let is_plan_applicable = false
        let is_insurance_applicable = false
        let hide_price = false
        let is_user_insured = false
        let is_vip_applicable = false
        let is_user_gold_vip = false
        let is_covered_under_gold = false
        let is_user_vip = false

        //For Insured Person Remove unselected Tests/Packages

        if (this.props.profiles && this.props.profiles[this.props.defaultProfile]) {
            is_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
            is_user_vip = this.props.profiles[this.props.defaultProfile].is_vip_member
            is_user_gold_vip = this.props.profiles[this.props.defaultProfile].is_vip_gold_member
        }
        if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {

            let selectedTests = this.props.currentLabSelectedTests.filter(x => x.is_selected)
            is_plan_applicable = selectedTests.length ? true : false
            is_insurance_applicable = selectedTests.length ? true : false
            is_plan_applicable = selectedTests.length ? true : false

            this.props.currentLabSelectedTests.map((test, i) => {

                if (test.is_selected) {

                    //Check Selected Tests for Insurance

                    if (test.insurance && test.insurance.is_insurance_covered && test.insurance.insurance_threshold_amount >= parseInt(test.deal_price) && test.insurance.is_user_insured) {

                    } else {
                        is_insurance_applicable = false
                    }

                    //Check for User Plans

                    if (test.included_in_user_plan) {

                    } else {
                        is_plan_applicable = false
                    }

                    if(test.vip && test.vip.covered_under_vip){
                        is_vip_applicable = is_user_gold_vip
                    }else{

                    }
                    if(test.vip && test.vip.is_gold_member) {
                        is_covered_under_gold = is_user_insured
                    }
                }

                if (test.hide_price) {
                    hide_price = true
                }



            })
        }

        // check if this was the landing page
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {/* <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="header-title fw-700 capitalize text-white">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li>
                                                        <span className="ct-img ct-img-sm arrow-img">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-white text-center">Lab Details</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }} >
                                            <div className="mobile-home-icon-div" >
                                                <img onClick={() => {
                                                    this.props.history.push('/')
                                                }} src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            {
                                (this.props.LABS[lab_id] && this.props.LABS[lab_id].tests)?
                                    <div>
                                        {
                                            this.props.LABS[lab_id] && this.props.LABS[lab_id].lab && 
                                            <HelmetTags tagsData={{
                                                title: this.getMetaTagsData(this.props.LABS[lab_id].lab.seo).title,
                                                description: this.getMetaTagsData(this.props.LABS[lab_id].lab.seo).description,
                                                canonicalUrl: `${CONFIG.API_BASE_URL}${seo_url || this.props.match.url}`
                                            }} noIndex={this.props.location && this.props.location.pathname && this.props.location.pathname.includes('ck-birla-hospital-for-women-in-sector-50-gurgaon-lpp')} />
                                        }

                                        <LabDetails {...this.props} is_insurance_applicable={is_insurance_applicable} data={this.props.LABS[lab_id]} is_plan_applicable={is_plan_applicable} hide_price={hide_price} is_user_insured={is_user_insured} seoFriendly={this.state.seoFriendly} is_vip_applicable={is_vip_applicable} is_covered_under_gold={is_covered_under_gold} is_user_vip={is_user_vip} is_user_gold_vip={is_user_gold_vip}/>

                                        <button disabled={
                                            this.props.currentLabSelectedTests.filter(x => x.is_selected).length < 1
                                        } onClick={this.bookLab.bind(this)} className="ratbtn-btn p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn">
                                            {
                                                is_insurance_applicable || is_plan_applicable || true? ''
                                                    : <span className="coupon-auto-applied-lab">*Coupon auto applied on checkout</span>
                                            }
                                            Book
                                            <span className="text-xs selected-option static-btn book-right-align-text" style={{ verticalAlign: 2, marginRight: 8, marginLeft: 10 }}>({this.props.currentLabSelectedTests.filter(x => x.is_selected).length} Selected) </span>

                                        </button>

                                    </div> : <Loader />
                            }

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" type="lab" msgTemplate="gold_general_template"/>
                    </div>
                </section>

                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default LabView
