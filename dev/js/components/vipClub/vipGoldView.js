import React from 'react';

import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
import VipLoginPopup from './vipClubPopup.js'
const queryString = require('query-string');
import Disclaimer from '../commons/Home/staticDisclaimer.js'
import CarouselView from '../opd/searchResults/carouselView.js'

class VipGoldView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13]
        }
    }

    ButtonHandler(field, event) {
        let tabs = [].concat(this.state.tabsValue)
        let self = this
        let found = false
        tabs = tabs.filter((x) => {
            if (x == field) {
                found = true
                return false
            }
            return true
        })
        if (!found) {
            tabs.push(field)
        }

        self.setState({ tabsValue: tabs })
    }
    goBack() {
       this.props.history.go(-1)
    }
    render() {
        let self = this

        let is_gold_selected = false
        {
            this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 ?
                Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                    if (parseInt(value.id) == parseInt(self.props.selected_plan_data.id)) {
                        is_gold_selected = true
                    }
                })
                : ''
        }

        return (

            this.props.vipClubList && Object.keys(this.props.vipClubList).length > 0 && this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 ?
                <section className={`container container-top-margin sub-pdng-add ${this.props.toggleTabType ? 'sub-pdng-rmv' : ''}`}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid ">
                                <div className="vip-new-container font-analyze">
                                    <div className="vip-tabs-container">
                                        {
                                            this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.is_vip_gold && this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 ?
                                                <p onClick={this.props.selectGoldPlan.bind(this, true)} className={`vp-sb-txt ${is_gold_selected ? 'vp-act' : ''}`}>Gold <span>
                                                    {`(₹ ${this.props.selected_plan_data.deal_price})`}
                                                </span></p>
                                                : ''
                                        }
                                        {
                                            this.props.is_vip_gold && this.props.vipClubList && this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0 ?

                                                Object.entries(this.props.vipClubList.plans).map(function ([key, value]) {
                                                    return <p onClick={self.props.selectPlan.bind(self, value)} key={key} className={`vp-sb-txt ${value.id == self.props.selected_plan_id ? 'vp-act' : ''}`}>{value.plan_name} <span>
                                                        {`(₹ ${value.deal_price})`}
                                                    </span>
                                                        {/*value.is_selected ? <b className="vip-popluer">POPULAR</b> : ''*/}
                                                    </p>
                                                })
                                                : ''
                                        }

                                    </div>
                                    {/* ================== gold benifits  ================== */}
                                    <div className="gold-white-bg-container mb-24">
                                        <h4 className="vip-card-heading">Gold Benefits</h4>
                                        <div className="gold-benifi-cards-cont">
                                            <div className="gold-benifi-cards">
                                                <img src={ASSETS_BASE_URL + '/img/gl1.png'} />
                                                <p>Exclusive rates on<br /><strong>30,000</strong> Doctors</p>
                                            </div>
                                            <div className="gold-benifi-cards">
                                                <img src={ASSETS_BASE_URL + '/img/gl2.png'} />
                                                <p>Discounts on <br /><strong>5,000</strong> Labs</p>
                                            </div>
                                            <div className="gold-benifi-cards">
                                                <img src={ASSETS_BASE_URL + '/img/medlife-med.png'} />
                                                <p> Save 23% <br/> on medicines</p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* ================== gold benifits  ================== */}
                                    {/* ================== gold HTML select  ================== */}
                                    <div className="mb-24">
                                        <h4 className="vip-card-heading">Select Your Plan</h4>
                                        <div className="vip-offer-cards p-12">
                                            <div className="gold-offer-cont">
                                                <h4 className="gold-ofr-hdng">LIMITED PERIOD OFFER</h4>
                                                <div className="gold-list-container">
                                                    {this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 ?
                                                        Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                                                            return <div key={key} className={`gold-ofr-lising ${value.id == self.props.selected_plan_id ? 'gold-select' : ''}`} onClick={self.props.selectGoldPlan.bind(self, value, false)}>
                                                                <div className="gold-mnthplan">
                                                                    <p className="mnth-plan-gld">
                                                                    Coverage: {value.total_allowed_members} {parseInt(value.total_allowed_members)>1?'Members':'Member'}
                                                                    </p>
                                                                    <p className="gld-cvr-txt">Valid for {value.tenure} Months {value.is_selected ? <span>POPULAR</span> : ''}</p>
                                                                </div>
                                                                <div className="gold-price">
                                                                    <p className="gld-prc"><span className="gold-prc-cut">₹{value.mrp}</span> ₹{value.deal_price}</p>
                                                                    <div className="gold-pln-slct-radio">
                                                                        <div className="gd-rdio-gray"></div>
                                                                        <img className="gd-rdio-chk" src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                        : ''}

                                                </div>
                                                {
                                                    this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.is_vip_gold && this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 && this.props.selected_plan_data.show_consultation_text ?
                                                        <p className="gld-lst-foot-txt">Includes Unlimited Online Consultation <span>(General
                                                            Physician)</span></p>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================== gold HTML select  ================== */}
                                    {/* ================== gold slider ================== */}
                                    <div className="gold-white-bg-container">
                                        <div className="gold-slider-container">
                                            {
                                                this.props.topHospitals && this.props.topHospitals.top_hospitals && this.props.topHospitals.top_hospitals.length > 0 &&
                                                <div className="pakg-slider-container mb-10">
                                                    <div className="pkgSliderHeading">
                                                        <h5 style={{ fontSize: '14px' }}>Key Hospital Partners</h5>
                                                        <span style={{ fontSize: '13px' }} onClick={() => this.props.viewDocprimeNetworkClicked()}>View Docprime Gold Network</span>
                                                    </div>
                                                    <div className="pkgSliderContainer">
                                                        <div className="pkgCardsList d-inline-flex sub-wd-cards home_top_hsptl_list">
                                                            {
                                                                this.props.topHospitals.top_hospitals.map((data, key) => {
                                                                    return <a key={`${key}_${data.id}`} href={data.url ? data.url : data.id} className="pkgcustCards" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        this.props.hospitalCardClicked(true, data)
                                                                    }}>
                                                                        <div className="pkgcardImgCont">
                                                                            {
                                                                                data.logo && <img style={{ width: '82px' }} className="img-fluid" src={data.logo} />
                                                                            }
                                                                        </div>
                                                                        {
                                                                            data.vip_percentage ?
                                                                                <p className="gold-upto-offer">Upto {parseInt(data.vip_percentage)}% OFF</p> : ''
                                                                        }
                                                                    </a>
                                                                })
                                                            }



                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                this.props.nearbyHospitals && this.props.nearbyHospitals.hospitals && this.props.nearbyHospitals.hospitals.length > 0 &&
                                                <div className="pakg-slider-container mb-10">
                                                    <div className="pkgSliderHeading">
                                                        <h5>Hospitals Near You</h5>
                                                    </div>
                                                    <div className="pkgSliderContainer">
                                                        <div className="pkgCardsList d-inline-flex sub-wd-cards home_top_hsptl_list">
                                                            {
                                                                this.props.nearbyHospitals.hospitals.map((data, key) => {
                                                                    return <a key={`${key}_${data.id}`} href={data.url ? data.url : data.id} className="pkgcustCards" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        this.props.hospitalCardClicked(false, data)
                                                                    }}>
                                                                        <div className="pkgcardImgCont">
                                                                            {
                                                                                data.logo && <img style={{ width: '82px' }} className="img-fluid" src={data.logo} />
                                                                            }
                                                                        </div>
                                                                        {
                                                                            data.vip_percentage ?
                                                                                <p className="gold-upto-offer">Upto {parseInt(data.vip_percentage)}% OFF</p> : ''
                                                                        }
                                                                    </a>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {/* ================== gold benifits  ================== */}
                                            <div className="pakg-slider-container mb-10">
                                                <div className="pkgSliderHeading">
                                                    <h5>Top Labs</h5>
                                                </div>
                                                <div className="pkgSliderContainer">
                                                    <div className="pkgCardsList d-inline-flex sub-wd-cards home_top_hsptl_list">
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/Thyrocare_JthRqFf.png" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 50% OFF</p>
                                                        </a>
                                                        
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/9be7c3c53ed30877c1433bf6d9f7d916_GjgCeik.jpg" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 50% OFF</p>
                                                        </a>
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 70% OFF</p>
                                                        </a>
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/2c25c272c61b8b646301741f1c980387.jpg" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 20% OFF</p>
                                                        </a>
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/45ae4aff8b1b9bf6d1dff2e86e97400a.jpg" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 50% OFF</p>
                                                        </a>
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/da7ccb6125dda7b3eba1c38d7bd9c0b9_Zp0O1EX.jpg" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 70% OFF</p>
                                                        </a>
                                                        
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/healtiens.png" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 18% OFF</p>
                                                        </a>
                                                        <a className="pkgcustCards">
                                                            <div className="pkgcardImgCont">
                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/c2748b2e22e2f8e3ed90cb3ca5ea29be_i3PE0Ya.jpg" style={{ width: '82px' }} />
                                                            </div>
                                                            <p className="gold-upto-offer">Upto 40% OFF</p>
                                                        </a>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="vip-offer-cards mb-24">
                                                <div className="vip-free-doc vip-medlife-bg">
                                                    <h4 className="vip-card-heading">Upto 23% Discounts on Medicines <span className="medlife-col"><span className="powered-col text-left">Powered By</span><img src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" /></span> </h4>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Exclusive for Gold members</p>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No minimum order values </p>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimted usage with no maximum cap </p>
                                                    <p className="text-left"><a className="tc-apply" onClick={this.props.toggle.bind(this,true)}>T&amp;C Apply</a></p>
                                                </div>
                                            </div>
                                            {/* ================== gold benifits  ================== */}
                                            <div className="gold-accordion-container">
                                                <div className="gold-acrd-main">
                                                    <div className="acdn-title" onClick={this.ButtonHandler.bind(this, 0)}>
                                                        <h2 className="fw-500" style={{ fontSize: '15px' }}>Frequently asked questions</h2>
                                                        <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(0) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                    </div>
                                                    {/* ===================inner accordion container=================== */}
                                                    <div className={`inneracord-container ${this.state.tabsValue.indexOf(0) > -1 ? 'd-none' : ''}`}>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 1)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">What are the benefits of being a gold member? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(1) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(1) > -1 ? 'd-none' : ''}`}>
                                                                You can avail exclusive discounts on Doctor and Lab test appointments for the covered members in the plan. Additionally, you can get upto 23% discount on prescribed medicines on Medlife.com. The membership will last till the duration of the plan.
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 2)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">How can i avail discounts on medicines? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(2) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(2) > -1 ? 'd-none' : ''}`}>
                                                                You can visit <a style={{color:'#f78631',cursor:'pointer'}} href="https://www.medlife.com/"> www.medlife.com</a> website or mobile application and use the exclusive coupon code provided to you once you become a gold member. You can get upto 23% discount on prescription drugs. Promo code can be used multiple times for 1 year without any minimum order value.
                                                                <br />
                                                                <span> For more details  <span style={{color:'#f78631',cursor:'pointer'}} onClick={this.props.toggle.bind(this,true)}>click here</span></span>
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 3)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Whom can I add members under the plan? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(3) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(3) > -1 ? 'd-none' : ''}`}>
                                                                You can add your family, extended family or friends under the plan
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 4)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">How do I become a gold member?</h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(4) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(4) > -1 ? 'd-none' : ''}`}>
                                                                Select the gold plan which suits you the best. Proceed with adding the primary member details and complete the payment. Post successful payment, you can continue adding other members or can start booking appointments at special discounted prices
                                                                </p>
                                                        </div>

                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 5)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Is the fee recurring? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(5) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(5) > -1 ? 'd-none' : ''}`}>
                                                                It is a one-time fee plan and the fee is not recurring. Post the expiry of the plan, you can renew or buy another plan
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 6)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Once I become a gold member, will I get discounts on all Doctor and Lab appointments? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(6) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(6) > -1 ? 'd-none' : ''}`}>
                                                                You can get discounts on all the labs and hospitals which are part of the gold network. Please note that the Gold network is dynamic in nature and might change from time to time. To view gold network, click here (view network url link)
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 7)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Can I use the gold plan benefit against any profile from my account?  </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(7) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(7) > -1 ? 'd-none' : ''}`}>
                                                                Different gold plans are valid for different number of users.  You can avail the benefits for only the users added against the purchased plan. While booking the new appointment, the patient profile should be one of the profiles added against the Gold plan to avail the benefit
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 8)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">What is the maximum number of appointments that I can make with the gold membership? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(8) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(8) > -1 ? 'd-none' : ''}`}>
                                                                Once you become a gold member, you will be able to avail discounts on all labs and hospitals which are part of the Gold network. There is no upper cap on the number of discounted appointments if all are made within the Gold network
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 9)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Can I use gold membership to book Cash on Delivery appointments? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(9) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(9) > -1 ? 'd-none' : ''}`}>
                                                                No, you can enjoy the special discounts through gold membership only on prepaid appointments booked under Docprime’s gold network
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 10)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Can I use Docprime’s wallet promotional balance to buy gold plan? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(10) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(10) > -1 ? 'd-none' : ''}`}>
                                                                No, you can’t pay for membership fee using Docprime’s wallet promotional balance
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 11)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">I want to cancel my gold membership and get refund for the same. How do I cancel my membership? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(11) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(11) > -1 ? 'd-none' : ''}`}>
                                                                We have a no questions asked refund policy within 15 days of purchase given no benefits have been availed under this bought plan. You can send us an email at customercare@docprime.com with your membership id and contact no. The refund will be credited in the original payment mode within 5- 7 working days.
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 12)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Will I get any tax benefit? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(12) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(12) > -1 ? 'd-none' : ''}`}>
                                                                No, there is no tax benefit on Gold plans purchase
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 13)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Is Gold an insurance plan? </h2>
                                                                <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(13) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(13) > -1 ? 'd-none' : ''}`}>
                                                                No, Gold plans are not insurance products. It is membership to get discounts on doctor and lab appointments that will help you reduce your healthcare expenses.
                                                                </p>
                                                        </div>
                                                    </div>
                                                    {/* ===================inner accordion container=================== */}
                                                </div>
                                            </div>
                                            <p className="gold-trms-cnd" onClick={() => this.props.history.push('/terms')}>Terms of Use</p>
                                        </div>
                                    </div>
                                    {/* ================== gold slider ================== */}

                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.is_booking_page !== '' && (this.props.is_booking_page == 'opd' || this.props.is_booking_page == 'lab')?
                        <button className="vip-foot-btn p-3" onClick={this.goBack.bind(this)}>
                            <p>Continue Booking</p>
                        </button>
                        :
                        <button className="vip-foot-btn p-3" onClick={this.props.proceed.bind(this)}>
                            <p>Continue</p>
                        </button>
                    }
                </section>
                : <div></div>
        );
    }
}

export default VipGoldView