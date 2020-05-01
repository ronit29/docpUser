import React from 'react'
import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import DigitStaticDataView from './digitStaticDataView.js'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
// const queryString = require('./node_modules/query-string');
import CarouselView from '../opd/searchResults/carouselView.js'

class DigitPlanView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
        }
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
    render() {
        let self = this
        let is_gold_selected = false
        // let selected_gold_plan_price 
        //     {
        //         this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length?
        //         Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
        //             if(value.is_selected){
        //                 selected_gold_plan_price = value.deal_price
        //             }
        //             if(parseInt(value.id) == parseInt(self.props.selected_plan_data.id)){
        //                 is_gold_selected = true
        //             }
        //         })
        //         :''
        //     }

        return (
            // && Object.keys(this.props.vipClubList).length > 0 && this.props.selected_plan_data &&
            this.props.plans && Object.keys(this.props.plans).length > 0 ? 
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
                                                            <li className='tab_disabled'>
                                                                <a href="#">Fill Member Details</a>
                                                            </li>
                                                            <li className="tab_disabled">
                                                                <a href="#">Payment</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ==================== Steps Container ==================== */}
                                            {/* ==================== table Container ==================== */}
                                            <div className="widget mrb-10">
                                                <table className="table table-bordered insurance-tbl insurance-checkboxes digitTbl">
                                                    <thead>
                                                        <tr>
                                                            <th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
                                                            <th className="tbl-second-head"><p>Annual Premium</p></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><p className="ins-dtls-members-edit">{this.props.is_edit ? 'Coverage Amounts' : 'Coverage Amounts'}
                                                            </p>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        {this.props.plans.map(plan=>
                                                            <tr key={plan.id}>
                                                                <td>
                                                                    <div className="dtl-radio">
                                                                        <label className="container-radio">{plan.name}
                                                                            <input type="radio" />
                                                                            <span className="doc-checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td><span>₹ {plan.amount}</span></td>
                                                            </tr>
                                                        )}
                                                        
                                                            
                                                    </tbody>
                                                </table>
                                            
                                            {/* <div className="term-cont-digi">
                                                <label className="ck-bx" htmlform="test11" style={{ 'fontWeight': '500', 'fontSize': '13px' }}>
                                                    <input type="checkbox" defaultChecked className="ins-chk-bx" value="" id="test11" name="fruit-1" />
                                                    <span className="checkmark"></span>I Agree to the </label>
                                                <p onClick={this.openPopup}>Terms and Conditions</p>
                                            </div> */}
                                        </div>
                                            <div className="bottomMargin"></div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            {/* ==================== Common button ==================== */}
                            <div className="sticky-btn fixed insuBtnsContainer">
                                <button onClick={this.state.handlePlanSelect} className="insu-right-orng-btn ins-buy-btn">Proceed</button>
                            </div>
                            {/* ==================== Common button ==================== */}
                        </section>
                    </div>
                </div >
            </React.Fragment>
            : <div></div>
        );
    }
}

export default DigitPlanView