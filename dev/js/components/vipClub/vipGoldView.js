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
            // selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
            // showPopup: false,
            // isLead: '',
            // selected_plan_id: '',
            // toggleTabType: false
            tabsValue:[2,3,4,5,6,7,8,9,10,11]
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
                                                // Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {

                                                //     return <p onClick={self.props.selectPlan.bind(self, value)} key={key} className={`vp-sb-txt ${value.id == self.props.selected_plan_id ? 'vp-act' : ''}`}>{value.plan_name} <span>
                                                //         {`(₹ ${value.deal_price})`}
                                                //     </span>
                                                //         {/*value.is_selected ? <b className="vip-popluer">POPULAR</b> : ''*/}
                                                //     </p>
                                                // })
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
                                    {/* ================== gold HTML select  ================== */}
                                    <div className="mb-24">
                                        <h4 className="vip-card-heading">Docprime Gold Membership Plan</h4>
                                        <div className="vip-offer-cards p-12">
                                            <div className="gold-offer-cont">
                                                <h4 className="gold-ofr-hdng">Limited Period Offer</h4>
                                                <div className="gold-list-container">
                                                    {this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 ?
                                                        Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                                                            return <div key={key} className={`gold-ofr-lising ${value.id == self.props.selected_plan_id ? 'gold-select' : ''}`} onClick={self.props.selectGoldPlan.bind(self, value, false)}>
                                                                <div className="gold-mnthplan">
                                                                    <p className="mnth-plan-gld">{value.tenure} Months {value.is_selected ? <span>POPULAR</span> : ''}</p>
                                                                    <p className="gld-cvr-txt">Covers upto {value.total_allowed_members} Members</p>
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
                                                <p className="gld-lst-foot-txt">Includes Unlimited Online Consultation <span>(General Physician)</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================== gold HTML select  ================== */}
                                    {/* ================== gold slider ================== */}
                                    {/*
                                            this.props.topHospitals && this.props.topHospitals.top_hospitals && this.props.topHospitals.top_hospitals.length > 0 &&
                                            <div className="pakg-slider-container mb-24">
                                                    <CarouselView topHeading='Key Hospital Partners' dataList={this.props.topHospitals.top_hospitals} dataType='top_vip_Hospitals' carouselCardClicked={(top, data) => this.hospitalCardClicked(top, data)} topHospital={true} extraHeading='View Docprime Network' navigateTo= {()=>this.viewDocprimeNetworkClicked()} viewAll={true}/>
                                            </div>
                                        */}
                                        <div className="gold-white-bg-container">
                                            <div className="gold-slider-container">
                                                {
                                                    this.props.topHospitals && this.props.topHospitals.top_hospitals && this.props.topHospitals.top_hospitals.length > 0 &&
                                                    <div className="pakg-slider-container mb-10">
                                                        <div className="pkgSliderHeading">
                                                            <h5>Top hospitals</h5>
                                                            <span onClick={() => this.props.viewDocprimeNetworkClicked()}>View Docprime Gold Network</span>
                                                        </div>
                                                        <div className="pkgSliderContainer">
                                                            <div className="pkgCardsList d-inline-flex sub-wd-cards home_top_hsptl_list">
                                                                {/*<a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                    <div className="pkgcardImgCont">
                                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                    </div>
                                                                    <p className="gold-upto-offer">Upto 70% OFF</p>
                                                                </a>*/}
                                                                {
                                                                    this.props.topHospitals.top_hospitals.map((data, key)=>{
                                                                        return <a key={`${key}_${data.id}`} href='' className="pkgcustCards"  onClick={()=>this.carouselCardClicked(true,data)}>
                                                                            <div className="pkgcardImgCont">
                                                                                {
                                                                                    data.logo && <img style={{width: '82px'}} className="img-fluid" src={data.logo} />
                                                                                }
                                                                            </div>
                                                                            {
                                                                                data.vip_percentage?
                                                                                <p className="gold-upto-offer">Upto {parseInt(data.vip_percentage)}% OFF</p>:''
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
                                                                {/*<a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                    <div className="pkgcardImgCont">
                                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                    </div>
                                                                    <p className="gold-upto-offer">Upto 70% OFF</p>
                                                                </a>*/}
                                                                {
                                                                    this.props.nearbyHospitals.hospitals.map((data, key)=>{
                                                                        return <a key={`${key}_${data.id}`} href='' className="pkgcustCards"  onClick={()=>this.carouselCardClicked(false,data)}>
                                                                            <div className="pkgcardImgCont">
                                                                                {
                                                                                    data.logo && <img style={{width: '82px'}} className="img-fluid" src={data.logo} />
                                                                                }
                                                                            </div>
                                                                            {
                                                                                data.vip_percentage?
                                                                                <p className="gold-upto-offer">Upto {parseInt(data.vip_percentage)}% OFF</p>:''
                                                                            }
                                                                        </a>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            <div className="gold-accordion-container">
                                                <div className="gold-acrd-main" onClick={this.ButtonHandler.bind(this,0)}>
                                                    <div className="acdn-title">
                                                        <h2 className="fw-500" style={{ fontSize: '15px' }}>Frequently asked questions</h2>
                                                        <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(0)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                    </div>
                                                    {/* ===================inner accordion container=================== */}
                                                    <div className= {`inneracord-container ${this.state.tabsValue.indexOf(0)>-1?'d-none':''}`}>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,1)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">How do I become a gold member?</h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(1)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(1)>-1?'d-none':''}`}>
                                                                Select the gold plan which suits you the best. Proceed with adding the primary member details and complete the payment. Post successful payment, you can continue adding other members or can start booking appointments at special discounted prices
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,2)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">What are the benefits of being a gold member? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(2)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(2)>-1?'d-none':''}`}>
                                                                You can avail exclusive discounts on Doctor and Lab test appointments for the covered members in the plan. The membership will last till the duration of the plan.
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,3)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Is the fee recurring? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(3)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(3)>-1?'d-none':''}`}>
                                                                It is a one-time fee plan and the fee is not recurring. Post the expiry of the plan, you can renew or buy another plan
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,4)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Once I become a gold member, will I get discounts on all Doctor and Lab appointments? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(4)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(4)>-1?'d-none':''}`}>
                                                                You can get discounts on all the labs and hospitals which are part of the gold network. Please note that the Gold network is dynamic in nature and might change from time to time. To view gold network, click here (view network url link)
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,5)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Can I use the gold plan benefit against any profile from my account?  </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(5)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(5)>-1?'d-none':''}`}>
                                                                Different gold plans are valid for different number of users.  You can avail the benefits for only the users added against the purchased plan. While booking the new appointment, the patient profile should be one of the profiles added against the Gold plan to avail the benefit
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,6)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">What is the maximum number of appointments that I can make with the gold membership? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(6)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(6)>-1?'d-none':''}`}>
                                                                Once you become a gold member, you will be able to avail discounts on all labs and hospitals which are part of the Gold network. There is no upper cap on the number of discounted appointments if all are made within the Gold network
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,7)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Can I use gold membership to book Cash on Delivery appointments? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(7)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(7)>-1?'d-none':''}`}>
                                                                No, you can enjoy the special discounts through gold membership only on prepaid appointments booked under Docprime’s gold network
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,8)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Can I use Docprime’s wallet promotional balance to buy gold plan? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(8)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(8)>-1?'d-none':''}`}>
                                                                No, you can’t pay for membership fee using Docprime’s wallet promotional balance
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,9)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">I want to cancel my gold membership and get refund for the same. How do I cancel my membership? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(9)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(9)>-1?'d-none':''}`}>
                                                                We have a no questions asked refund policy within 15 days of purchase given no benefits have been availed under this bought plan. You can send us an email at customercare@docprime.com with your membership id and contact no. The refund will be credited in the original payment mode within 5- 7 working days.
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,10)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Will I get any tax benefit? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(10)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(10)>-1?'d-none':''}`}>
                                                                No, there is no tax benefit on Gold plans purchase
                                                                </p>
                                                        </div>
                                                        <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this,11)}>
                                                            <div className="acdn-title">
                                                                <h2 className="fw-500">Is Gold an insurance plan? </h2>
                                                                <img className= {`acdn-arrow  ${this.state.tabsValue.indexOf(11)>-1?'':'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                            </div>
                                                            <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(11)>-1?'d-none':''}`}>
                                                                No, Gold plans are not insurance products. It is membership to get discounts on doctor and lab appointments that will help you reduce your healthcare expenses.
                                                                </p>
                                                        </div>
                                                    </div>
                                                    {/* ===================inner accordion container=================== */}
                                                </div>
                                            </div>
                                            <p className="gold-trms-cnd">Terms of Use</p>
                                        </div>
                                    </div>
                                    {/* ================== gold slider ================== */}
                                    {/* ================== last screen card ================== */}
                                    <div className="mb-24">
                                        <div className="vip-offer-cards p-12 text-center">
                                            <p className="gold-cmplt-frst">You Saved <span>₹1298</span> till now</p>
                                            <p className="gold-cmplt-second">Total Gold appointments till now </p>
                                            <div className="gld-cmplt-lst">
                                                <p className="gold-cmplt-frst"><span>12</span> Lab</p>
                                                <p className="gold-cmplt-frst"><span>10</span> Doctor</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ================== last screen card ================== */}



                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="vip-foot-btn" onClick={this.props.proceed.bind(this)}><p>Buy Now @ ₹{this.props.selected_plan_data.deal_price}</p>
                        <p className="vipbtn-sub-txt">Inclusive of GST
                            {/* ₹{Math.round(parseInt(this.state.selected_plan_data.deal_price) / 12)} */}
                        </p>
                    </button>
                </section>
                : <div></div>
        );
    }
}

export default VipGoldView