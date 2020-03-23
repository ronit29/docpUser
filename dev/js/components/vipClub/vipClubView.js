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
import VipPlanView from './vipPlanView.js'
import VipGoldView from './vipGoldView.js'
import VipTnC from './vipTncView.js'

class VipClubView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
            showPopup: false,
            isLead: '',
            selected_plan_id: this.props.selected_plan && Object.keys(this.props.selected_plan).length ? this.props.selected_plan.id:'',
            toggleTabType: false,
            is_gold_clicked:this.props.is_vip_gold?this.props.is_vip_gold:false,
            openMedlifeTnC:false,
            is_lead_enabled:false
        }
    }

    componentDidMount() {
        let plan = []
        if (!this.props.is_gold && this.props.selected_vip_plan && this.props.vipClubList && ((this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0) || (this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0))) {
            let resp = this.props.selected_vip_plan
            this.setState({ selected_plan_data: resp, selected_plan_id: resp.id })
        }

        let loginUser
        let lead_data = queryString.parse(this.props.location.search)
        let extraParams = {}
        if(this.props.common_utm_tags && this.props.common_utm_tags.length >0){
            extraParams = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
        }
        let visitor_info = GTM.getVisitorInfo()
            if(visitor_info && visitor_info.visit_id){
                lead_data.visit_id = visitor_info.visit_id
                lead_data.visitor_id = visitor_info.visitor_id
            }
        if (STORAGE.checkAuth() && !this.props.isSalesAgent && !this.props.isAgent && !STORAGE.isAgent()) {
            if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
                loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
                if (Object.keys(loginUser).length > 0) {
                    if(this.props.common_utm_tags && this.props.common_utm_tags.length >0){
                        extraParams = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
                    }
                    let visitor_info = GTM.getVisitorInfo()
                        if(visitor_info && visitor_info.visit_id){
                            lead_data.visit_id = visitor_info.visit_id
                            lead_data.visitor_id = visitor_info.visitor_id
                        }
                    if(this.state.is_lead_enabled){
                        /*this.setState({is_lead_enabled:false})
                        this.props.generateVipClubLead({selectedPlan:this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', number:loginUser.phone_number, lead_data:lead_data, selectedLocation:this.props.selectedLocation, user_name:loginUser.name, extraParams:extraParams,
                            cb: (resp) => {
                                let LeadIdData = {
                                'Category': 'ConsumerApp', 'Action': 'VipAutoLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id ? resp.lead_id : 0, 'event': 'vip-auto-lead-clicked', 'source': lead_data.source || ''
                                }
                                GTM.sendEvent({ data: LeadIdData })
                            }
                        })
                        setTimeout(() => {
                         this.setState({is_lead_enabled:true})
                        }, 5000)*/
                    }
                }
            }
        }
        if(!STORAGE.checkAuth() && this.props.user_loggedIn_number && !this.props.is_from_organic && this.state.is_lead_enabled){
            /*this.props.generateVipClubLead({selectedPlan:this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', number:this.props.user_loggedIn_number, lead_data:lead_data, selectedLocation:this.props.selectedLocation, user_name:'', extraParams:extraParams,
                cb: (resp) => {
                    let LeadIdData = {
                    'Category': 'ConsumerApp', 'Action': 'VipAutoLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id ? resp.lead_id : 0, 'event': 'vip-auto-lead-clicked', 'source': lead_data.source || ''
                    }
                    GTM.sendEvent({ data: LeadIdData })
                }
            })
            setTimeout(() => {
                 this.setState({is_lead_enabled:true})
            }, 5000)*/
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
        this.setState({is_gold_clicked:false})
        let plan = plan_to_toggle
        plan.isForceUpdate = false
        this.props.selectVipClubPlan('plan', plan, (resp) => { // toggle/select vip plan
            this.setState({ selected_plan_data: resp, selected_plan_id: resp.id })
        })
    }

    toggle(){
        this.setState({openMedlifeTnC:true})
    }

    closeTncPopup(){
       this.setState({openMedlifeTnC:false}) 
    }

    selectGoldPlan(plan_to_toggle,isHeader,is_desktop_view) {
        this.setState({is_gold_clicked:true})
        let plan
        if(isHeader && this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0){
            plan =  this.props.vipClubList.gold_plans.filter((x => x.is_selected))[0]
        }else{
            plan = plan_to_toggle
        }
        plan.isForceUpdate = false
        this.props.selectVipClubPlan('plan', plan, (resp) => { // toggle/select gold plan
            this.setState({ selected_plan_data: resp, selected_plan_id: resp.id })
            if(is_desktop_view){
                this.proceed()
            }
        })
    }

    hideLoginPopup() {
        this.setState({ showPopup: false })
    }

    closeLeadPopup() {
        this.setState({ showPopup: false })
    }

    proceed() {
        SnackBar.show({ pos: 'bottom-center', text: 'We have currently stopped Gold subscriptions for new users. Sorry for the inconvenience caused.' })
        return;
        let loginUser
        let lead_data = queryString.parse(this.props.location.search)
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'VipClubBuyNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-buynow-clicked', 'selected': ''
        }
        GTM.sendEvent({ data: gtmData })
            
        if (STORAGE.checkAuth()) {
            if (this.props.USER && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.defaultProfile) {
                loginUser = this.props.USER.profiles[this.props.USER.defaultProfile]
                let extraParams = {}
                if(this.props.common_utm_tags && this.props.common_utm_tags.length >0){
                    extraParams = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
                }
                if (Object.keys(loginUser).length > 0 && !STORAGE.isAgent()) {
                                        
                    // to create vip or gold member lead for matrix
                    let visitor_info = GTM.getVisitorInfo()
                        if(visitor_info && visitor_info.visit_id){
                            lead_data.visit_id = visitor_info.visit_id
                            lead_data.visitor_id = visitor_info.visitor_id
                        }
                    if(this.state.is_lead_enabled){
                        /*this.setState({is_lead_enabled:false})
                        this.props.generateVipClubLead({selectedPlan:this.props.selected_vip_plan ? this.props.selected_vip_plan.id : '', number:loginUser.phone_number, lead_data:lead_data, selectedLocation:this.props.selectedLocation, user_name:loginUser.name, extraParams:extraParams,
                            cb: (resp) => {
                                let LeadIdData = {
                                'Category': 'ConsumerApp', 'Action': 'VipLeadClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': resp.lead_id ? resp.lead_id : 0, 'event': 'vip-lead-clicked', 'source': lead_data.source || ''
                                }
                                GTM.sendEvent({ data: LeadIdData })
                            }
                        })
                        setTimeout(() => {
                            // this.setState({is_lead_enabled:true})
                        }, 5000)*/
                    }
                }
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
                if (lead_data.is_gold) {
                    url += '&is_gold=' + lead_data.is_gold
                }
                this.props.history.push(url)
                // this.props.history.push('/vip-club-member-details')
            }
        } else {
            this.props.citiesData()
            this.setState({ showPopup: true })
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

    hospitalCardClicked = (data,top = true) => {    
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

    viewDocprimeNetworkClicked(gold=false){
        let is_gold = this.props.is_gold || this.state.is_gold_clicked || gold
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': `Vip${is_gold?'gold':''}DoctorNetworkClicked`, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': `vip-${is_gold?'gold-':''}doctor-network-clicked`
        }
        GTM.sendEvent({ data: gtmData })
        let url = '/opd/searchresults?fromVip=true'
        if(is_gold){
            url = '/opd/searchresults?fromGoldVip=true'
        }
        this.props.history.push(url)
    }

    render() {
        let self = this
        return (

            this.props.vipClubList && Object.keys(this.props.vipClubList).length > 0 && this.state.selected_plan_data && Object.keys(this.state.selected_plan_data).length > 0 ?
                <div className="profile-body-wrap" style={{ background: "" }}>
                    <ProfileHeader bookingPage={true} />
                    <HelmetTags tagsData={{
                        canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}`,
                        title: `${'Docprime Vip' || ''}`,
                        // description: `${this.props.data.description || ''}`
                    }} noIndex={false} />
                    <div className={`vipHeaderBar ${this.state.toggleTabType ? 'hed-curv-rmove' : ''} d-none`} ref="vipHeaderBar">
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
                        {
                            this.props.is_gold?
                                <div className={`vip-logo-cont d-none ${this.state.toggleTabType ? 'header-scroll-change' : ''}`} ref="">
                                    <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/docgold.png"} />
                                    <p className="scrl-cont-dat gld-hd-txt-algn">Membership plan for </p>
                                    <h1 className="scrl-cont-dat">exclusive discounts</h1>
                                    
                                </div>
                            :
                                <div className={`vip-logo-cont d-none ${this.state.toggleTabType ? 'header-scroll-change' : ''}`} ref="">
                                    <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/vip-logo.png"} />
                                    <p className="scrl-cont-dat">Save 70% on your family's medical bills</p>
                                    <h1 className="scrl-cont-dat">for just <span className="vip-prc-cut">₹{this.state.selected_plan_data.mrp}</span> <span className="vip-main-price">₹{this.state.selected_plan_data.deal_price}</span>  </h1>
                                    
                                </div>
                        }
                    </div>
                    {
                        this.state.showPopup ?
                            <VipLoginPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} isLead={this.state.isLead} closeLeadPopup={this.closeLeadPopup.bind(this)} is_see_more={false}/> : ''
                    }
                    {!this.props.is_gold && !this.state.is_gold_clicked?
                         <VipPlanView {...this.props} 
                            isSalesAgent={this.props.isSalesAgent} 
                            isAgent={this.props.isAgent} 
                            source={this.props.source} 
                            is_gold={this.props.is_gold} 
                            is_vip_gold={this.props.is_vip_gold} 
                            selectPlan={this.selectPlan.bind(this)} 
                            proceed={this.proceed.bind(this)} 
                            selected_plan_id={this.state.selected_plan_id} 
                            selected_plan_data={this.state.selected_plan_data} 
                            viewDocprimeNetworkClicked={(data)=>this.viewDocprimeNetworkClicked(data,this)} 
                            hospitalCardClicked={this.hospitalCardClicked} 
                            toggleTabType={this.state.toggleTabType} 
                            selectGoldPlan={this.selectGoldPlan.bind(this)} 
                            toggle = {this.toggle.bind(this)}
                            />
                        :''}

                    {this.props.is_gold || this.state.is_gold_clicked?
                        <VipGoldView {...this.props} 
                            isSalesAgent={this.props.isSalesAgent} 
                            isAgent={this.props.isAgent} 
                            source={this.props.source} 
                            is_gold={this.props.is_gold} 
                            is_vip_gold={this.props.is_vip_gold} 
                            selectPlan={this.selectPlan.bind(this)} 
                            proceed={this.proceed.bind(this)} 
                            selected_plan_id={this.state.selected_plan_id} 
                            selected_plan_data={this.state.selected_plan_data} 
                            viewDocprimeNetworkClicked={(data=false)=>this.viewDocprimeNetworkClicked(data,this)} 
                            hospitalCardClicked={this.hospitalCardClicked} 
                            toggleTabType={this.state.toggleTabType} 
                            selectGoldPlan={this.selectGoldPlan.bind(this)} 
                            toggle = {this.toggle.bind(this)}
                            />
                        :''
                    }
                    {
                        this.state.openMedlifeTnC ? <VipTnC props={this.props} toggle={this.closeTncPopup.bind(this)} is_insurance_applicable={false}/> : ""
                    }
                    <Disclaimer isVip={true}/>
                </div>
                : <div></div>
        );
    }
}

export default VipClubView