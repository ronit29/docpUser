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
        // if (STORAGE.checkAuth() && !this.props.isSalesAgent && !this.props.isAgent) {
        //     if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
        //         loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
        //         if (Object.keys(loginUser).length > 0) {
        //             this.props.generateVipClubLead(this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', loginUser.phone_number, lead_data, this.props.selectedLocation, loginUser.name, {}, (resp)=>{
        //                 let LeadIdData = {
        //                     'Category': 'ConsumerApp', 'Action': 'VipLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id ? resp.lead_id : 0, 'event': 'vip-lead-clicked', 'source': lead_data.source || ''
        //                 }
        //                 GTM.sendEvent({ data: LeadIdData })
        //             })
        //         }
        //     }
        // }

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
        if (!this.props.isSalesAgent && !this.props.isAgent) {
            if (STORAGE.checkAuth()) {
                if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
                    loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
                    if (Object.keys(loginUser).length > 0) {
                        this.props.generateVipClubLead(this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', loginUser.phone_number, lead_data, this.props.selectedLocation, loginUser.name, {}, (resp)=>{
                            let LeadIdData = {
                                'Category': 'ConsumerApp', 'Action': 'VipLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id ? resp.lead_id : 0, 'event': 'vip-lead-clicked', 'source': lead_data.source || ''
                            }
                            GTM.sendEvent({ data: LeadIdData })
                        })
                    }
                    this.props.history.push('/vip-club-member-details')
                }
            } else {
                this.props.citiesData()
                this.setState({ showPopup: true })
            }
        } else {
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
                let url = '/vip-club-member-details?isDummy=true'
                if (lead_data.utm_source) {
                    url += '&utm_source=' + lead_data.utm_source
                }
                if (lead_data.utm_term) {
                    url += '&utm_term=' + lead_data.utm_term
                }
                if (lead_data.utm_campaign) {
                    url += '&utm_campaign=' + lead_data.utm_campaign
                }
                if (lead_data.utm_medium) {
                    url += '&utm_medium=' + lead_data.utm_medium
                }
                if (lead_data.is_agent) {
                    url += '&is_agent=' + lead_data.is_agent
                }
                this.props.history.push(url)
            } else {
                this.props.citiesData()
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

    hospitalCardClicked(top = false, data) {
        let gtmData = {}
        if (top) {
            gtmData = {
                'Category': 'ConsumerApp', 'Action': 'vip-nearby-hospitals-clicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-nearby-hospitals-clicked'
            }

        } else {
            gtmData = {
                'Category': 'ConsumerApp', 'Action': 'vip-tophospitalsClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-top-hospitals-clicked'
            }
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

    viewDocprimeNetworkClicked(){
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'VipDoctorNetworkClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-doctor-network-clicked'
        }
        GTM.sendEvent({ data: gtmData })
        this.props.history.push('/opd/searchresults?fromVip=true')
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
                            this.props.isSalesAgent && this.props.isAgent ? '' :
                                this.props.source == 'doctorlisting' || this.props.source == 'bookingpage'
                                    ? <div className="vipBackIco" onClick={() => this.props.history.go(-1)}>
                                        <img src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                                    </div>
                                    : <div className="vipBackIco" onClick={() => this.props.history.push('/')}>
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
                                        {
                                            this.props.is_vip_gold?
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
                                            :''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="vip-foot-btn" onClick={this.proceed.bind(this)}><p>Buy Now @ ₹{this.state.selected_plan_data.deal_price}</p>
                            <p className="vipbtn-sub-txt">Inclusive of GST
                            {/* ₹{Math.round(parseInt(this.state.selected_plan_data.deal_price) / 12)} */}
                            </p>
                        </button>
                    </section>
                    <Disclaimer isVip={true}/>
                </div>
                : <div></div>
        );
    }
}

export default VipGoldView