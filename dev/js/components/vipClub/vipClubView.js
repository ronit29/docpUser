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

class VipClubView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
            showPopup: false,
            isLead: '',
            selected_plan_id: '',
            toggleTabType: false
        }
    }

    componentDidMount() {
        let plan = []
        if (this.props.selected_vip_plan && this.props.vipClubList && this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0) {
            let resp = this.props.selected_vip_plan
            this.setState({ selected_plan_data: resp, selected_plan_id: resp.id })
        }
        let loginUser
        let lead_data = queryString.parse(this.props.location.search)
        if (STORAGE.checkAuth() && !this.props.isSalesAgent && !this.props.isAgent) {
            if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
                loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
                if (Object.keys(loginUser).length > 0) {
                    this.props.generateVipClubLead(this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', loginUser.phone_number, lead_data, this.props.selectedLocation, loginUser.name,(resp)=>{
                        let LeadIdData = {
                                'Category': 'ConsumerApp', 'Action': 'VipLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id?resp.lead_id:0, 'event': 'vip-lead-clicked', 'source': lead_data.source || ''
                            }
                        GTM.sendEvent({ data: LeadIdData })
                    })
                }
            }
        }

        let self = this
        if (window && document) {
            window.onscroll = function () {
                var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop

                if (self.refs['vipHeaderBar']) {

                    if (scrollPosition > 10) {
                        self.setState({ toggleTabType: true })
                    } else {
                        self.setState({ toggleTabType: false })
                    }
                }
            }
        }
    }

    selectPlan(plan_to_toggle) {
        let plan = plan_to_toggle
        plan_to_toggle.is_selected = true
        this.props.selectVipClubPlan('plan', plan, (resp) => {
            this.setState({ selected_plan_data: resp, selected_plan_id: resp.id })
        })
    }

    hideLoginPopup() {
        this.setState({ showPopup: false })
    }

    closeLeadPopup() {
        this.setState({ showPopup: false })
    }

    proceed() {
        let loginUser
        let lead_data = queryString.parse(this.props.location.search)
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'VipClubBuyNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-buynow-clicked', 'selected': ''
        }
        GTM.sendEvent({ data: gtmData })
        if(!this.props.isSalesAgent && !this.props.isAgent ){
            if (STORAGE.checkAuth()) {
                if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
                    loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
                    if (Object.keys(loginUser).length > 0) {
                        this.props.generateVipClubLead(this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', loginUser.phone_number, lead_data, this.props.selectedLocation, loginUser.name,(resp)=>{
                            let LeadIdData = {
                                    'Category': 'ConsumerApp', 'Action': 'VipLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id?resp.lead_id:0, 'event': 'vip-lead-clicked', 'source': lead_data.source || ''
                                }
                            GTM.sendEvent({ data: LeadIdData })
                        })
                    }
                    this.props.history.push('/vip-club-member-details')
                }
            }else {
                this.setState({ showPopup: true })
            }
        }else{
            if (STORAGE.checkAuth()) {
                // if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
                //     loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
                //     if (Object.keys(loginUser).length > 0) {
                //         if(this.props.vipPlusLead && lead_data && lead_data.utm_source) {
                //             let data = {
                //                 name: loginUser.name,
                //                 phone_number: loginUser.phone_number,
                //                 utm_source: lead_data.utm_source || '',
                //                 utm_spo_tags : lead_data || ''
                //             }
                //             this.props.vipPlusLead(data)
                //         }
                //     }
                // }
                this.props.history.push('/vip-club-member-details?utm_source='+this.props.isSalesAgent+'&is_agent='+this.props.isAgent)
            } else {
                this.setState({ showPopup: true })
            }
        }
    }

    navigateTo(data, e) {
        e.preventDefault()
        e.stopPropagation()
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'VipClubWidgetHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-widget-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
        }
        GTM.sendEvent({ data: gtmData })
        let redirectUrl = ''

        if (data.url) {
            redirectUrl = `/${data.url}?showPopup=true`
        } else {
            redirectUrl = `/ipd/hospital/${data.id}?showPopup=true`
        }

        this.props.history.push(redirectUrl)
    }

    render() {
        let self = this

        return (

            this.props.vipClubList && Object.keys(this.props.vipClubList).length > 0 && this.state.selected_plan_data && Object.keys(this.state.selected_plan_data).length > 0 ?
                <div className="profile-body-wrap" style={{ background: "" }}>
                    {/* <ProfileHeader /> */}
                    <HelmetTags tagsData={{
                        canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}`,
                        title: `${'Docprime Vip' || ''}`,
                        // description: `${this.props.data.description || ''}`
                    }} noIndex={false} />
                    <div className={`vipHeaderBar ${this.state.toggleTabType ? 'hed-curv-rmove' : ''}`} ref="vipHeaderBar">
                        {
                            this.props.isSalesAgent && this.props.isAgent?''
                            :<div className="vipBackIco" onClick={() => this.props.history.push('/')}>
                                <img src={ASSETS_BASE_URL + "/img/vip-home.svg"} />
                            </div>
                        }
                        <div className={`vip-logo-cont ${this.state.toggleTabType ? 'header-scroll-change' : ''}`} ref="">
                            <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/vip-logo.png"} />
                            <p className="scrl-cont-dat">Save 70% on your family's medical bills</p>
                            <h1 className="scrl-cont-dat">for just <span className="vip-prc-cut">₹{this.state.selected_plan_data.mrp}</span> <span className="vip-main-price">₹{this.state.selected_plan_data.deal_price}</span>  </h1>
                            {/*<p>{`${this.state.selected_plan_data.tenure} year upto ${this.state.selected_plan_data.total_allowed_members} members`}</p>*/}
                        </div>
                    </div>
                    {
                        this.state.showPopup ?
                            <VipLoginPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} isLead={this.state.isLead} closeLeadPopup={this.closeLeadPopup.bind(this)} /> : ''
                    }
                    <section className={`container container-top-margin sub-pdng-add ${this.state.toggleTabType ? 'sub-pdng-rmv' : ''}`}>
                        <div className="row main-row parent-section-row">
                            <LeftBar />
                            <div className="col-12 center-column">
                                <div className="container-fluid ">
                                    <div className="vip-new-container font-analyze">
                                        <div className="vip-tabs-container">
                                            {
                                                this.props.vipClubList && this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0 ?

                                                    Object.entries(this.props.vipClubList.plans).map(function ([key, value]) {
                                                        return <p onClick={self.selectPlan.bind(self, value)} key={key} className={`vp-sb-txt ${value.id == self.state.selected_plan_id ? 'vp-act' : ''}`}>{value.plan_name} <span>
                                                            {`(₹ ${value.deal_price})`}
                                                        </span>
                                                        {/*value.is_selected ? <b className="vip-popluer">POPULAR</b> : ''*/}
                                                        </p>
                                                    })
                                                    : ''
                                            }
                                        </div>
                                        <div className="mb-24">
                                            <div className="vip-cvpmem-main">
                                                <div className="vip-cvpmem">
                                                    <p className="vip-vld">
                                                        <img src={ASSETS_BASE_URL + '/img/vipcal.svg'} /><span>Validity: <b>1 Year</b></span>
                                                    </p>
                                                    <p className="vip-vld">
                                                        <img src={ASSETS_BASE_URL + '/img/vipuser.svg'} /><span>Covers upto: <b>4 Members</b></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="cpm-lst">
                                                <ul className="lst-vpp">
                                                    {
                                                        Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.doctor_consult_amount != '' ?
                                                            <li>In-Clinic Consults: ₹{this.state.selected_plan_data.worth.doctor_consult_amount}  </li>
                                                            : ''
                                                    }
                                                    {
                                                        Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.health_checkups_amount != '' ?
                                                            <li>Health Checkups: ₹{this.state.selected_plan_data.worth.health_checkups_amount}</li>
                                                            : ''
                                                    }
                                                </ul>
                                                <ul className="lst-vpp">
                                                    {
                                                        Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.online_chat_amount != '' ?
                                                            <li>Unlimited Online Consult: ₹{this.state.selected_plan_data.worth.online_chat_amount}</li>
                                                            : ''
                                                    }
                                                    {
                                                        Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.tax_rebate != '' ?
                                                            <li>Tax Benefit (80D): ₹{this.state.selected_plan_data.worth.tax_rebate}</li>
                                                            : ''
                                                    }
                                                </ul>
                                            </div>
                                        </div>


                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.doctor_consult_amount != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-docbg">
                                                        <h4 className="vip-card-heading">Free In-Clinic Doctor Consultations</h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />30,000 verified doctors </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />All specializations included </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹ {this.state.selected_plan_data.worth.doctor_consult_amount}  </span>
                                                </div>
                                                : ''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.enabled_hospital_networks && this.state.selected_plan_data.enabled_hospital_networks.length > 0 ?
                                                <div className="pakg-slider-container mb-24">
                                                    {
                                                        this.props.isSalesAgent && this.props.isAgent?''
                                                        :<div className="pkgSliderHeading">
                                                            <h5>Key Hospital Partners</h5>
                                                            <span onClick={() => this.props.history.push('/opd/searchresults')}>View Docprime Network</span>
                                                        </div>
                                                    }
                                                    <div className="pkgSliderContainer">
                                                        <div className="pkgCardsList d-inline-flex sub-wd-cards top_pkgCat">
                                                            {
                                                                Object.entries(this.state.selected_plan_data.enabled_hospital_networks).map(function ([key, value]) {
                                                                    return <div onClick={self.navigateTo.bind(self, value)} key={key} className="pkgcustCards vip-hsp-card-mn">
                                                                        <div className="vip-hsp-img">
                                                                            <img className="img-fluid" src={value.logo} />
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.online_chat_amount != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-mem-bg">
                                                        <h4 className="vip-card-heading">Free Docprime Care Membership  </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimited online consult <span> (General Physician)</span> </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Priority Queue - No wait times </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.state.selected_plan_data.worth.online_chat_amount}  </span>
                                                </div>
                                                : ''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.health_checkups_amount != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-chek-bg">
                                                        <h4 className="vip-card-heading">Free Full Body Preventive Health Checkup </h4>
                                                        {
                                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.members_covered_in_package ?
                                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />{this.state.selected_plan_data.worth.members_covered_in_package} {this.state.selected_plan_data.worth.members_covered_in_package == 1 ? 'member' : 'members'} covered</p>
                                                                : ''
                                                        }
                                                        {
                                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.total_test_covered_in_package ?
                                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />{this.state.selected_plan_data.worth.total_test_covered_in_package} tests included </p>
                                                                : ''
                                                        }
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.state.selected_plan_data.worth.health_checkups_amount}  </span>
                                                </div>
                                                : ''
                                        }
                                        <div className="vip-ins-act-cont mb-24">
                                            <h4 className="ins-dcnt-hdng"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/vip-ins-act.png"} />Instant Activation Upon Purchase</h4>
                                            <div className="ins-dc-lstng">
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Pre-existing diseases covered</p>
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No medical tests required for plan activation </p>
                                            </div>
                                        </div>

                                        <div className="vip-offer-cards mb-24">
                                            <div className="vip-free-doc vip-bkdiscount-bg">
                                                <div className="bkdiscount-text">
                                                    <h4 className="vip-card-heading">25% Discount on Lab Bookings </h4>
                                                    <p>Maximum discount upto ₹200</p>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.tax_rebate != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-benft-bg">
                                                        <h4 className="vip-card-heading">Tax Benefits </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Cover under section 80D</p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Tax proof certificate will be provided </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.state.selected_plan_data.worth.tax_rebate}  </span>
                                                </div>
                                                : ''
                                        }

                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.you_get && Object.keys(this.state.selected_plan_data.you_get).length > 0 && this.state.selected_plan_data.you_pay && Object.keys(this.state.selected_plan_data.you_pay).length > 0 ?
                                                <div className="vip-price-summery mb-24">
                                                    <div className="vip-prc-summry-hdng">
                                                        <p>Price Summary</p>
                                                    </div>
                                                    <div className="vip-prc-cards-cont">
                                                        <div className="vip-prc-cards">
                                                            <h5 className="vip-prc-hdng">You Get</h5>
                                                            <ul className="vip-prc-lst">
                                                                <li><p>In-Clinic Consult: <span>₹{this.state.selected_plan_data.you_get.doctor_consult_amount}</span></p></li>
                                                                <li><p>Online Consult: <span>₹{this.state.selected_plan_data.you_get.online_chat_amount}</span></p></li>
                                                                <li><p>Health Checkup: <span>₹{this.state.selected_plan_data.you_get.health_checkups_amount}</span></p></li>
                                                                <li className="ttl-benft"><p>Total Benefits: <span>₹{this.state.selected_plan_data.you_get.effective_price}</span></p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="vip-prc-cards">
                                                            <h5 className="vip-prc-hdng">You Pay</h5>
                                                            <ul className="vip-prc-lst">
                                                                <li><p>Plan Price: <span>₹{this.state.selected_plan_data.you_pay.mrp}</span></p></li>
                                                                <li><p>Offer Price: <span>₹{this.state.selected_plan_data.you_pay.deal_price}</span></p></li>
                                                                <li><p>Tax Rebate (80D): <span>₹{this.state.selected_plan_data.you_pay.tax_rebate}</span></p></li>
                                                                <li className="effective-prc"><p>Effective Price: <span>₹{this.state.selected_plan_data.you_pay.effective_price}</span></p></li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                    <p className="vip-no-cost"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/coinico.png"} /> No Cost EMI Starts @ <span>  ₹{Math.round(parseInt(this.state.selected_plan_data.deal_price) / 12)}</span></p>
                                                </div>
                                                : ''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.content && Object.keys(this.state.selected_plan_data.content).length > 0 && this.state.selected_plan_data.content.salient_features && this.state.selected_plan_data.content.salient_features.length > 0 ?
                                                <div className="vip-note-lst">
                                                    <p>A few things to note... </p>
                                                    <ul>
                                                        {
                                                            Object.entries(this.state.selected_plan_data.content.salient_features).map(function ([key, value]) {
                                                                return <li key={key}>{value}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </div> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="vip-foot-btn" onClick={this.proceed.bind(this)}><p>Become a Docprime VIP @ ₹{this.state.selected_plan_data.deal_price}</p>
                            <p className="vipbtn-sub-txt">No Cost EMI Starts @ ₹{Math.round(parseInt(this.state.selected_plan_data.deal_price) / 12)}</p>
                        </button>
                    </section>
                </div>
                : <div></div>
        );
    }
}

export default VipClubView