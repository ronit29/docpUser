import React from 'react';

import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
import VipLoginPopup from './vipClubPopup.js'

class VipClubView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: 'one',
            is_checked: this.props.selected_plan ? this.props.selected_plan.id : '',
            selected_plan_deal_price: '',
            gst: 'Inclusive of 18% GST',
            selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
            showPopup: false,
            shortURL: "",
            isLead: '',
            checkIdleTimeout:true,
            popupClass: '',
            overlayClass: '',
            identifyUserClick:'',
            selected_plan_id:'',
            selected_plan_mrp:''
        }
    }

    componentDidMount() {
        
        let plan =[]
        if(this.props.selected_vip_plan && this.props.vipClubList && this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0){
                let resp = this.props.selected_vip_plan
                this.setState({selected_plan_data:resp,selected_plan_id:resp.id})
        }
    }

    selectPlan(plan_to_toggle) {
        let plan = plan_to_toggle
        plan_to_toggle.is_selected = true
        this.props.selectVipClubPlan('plan', plan,(resp)=>{
            this.setState({selected_plan_data:resp,selected_plan_id:resp.id})
        })
    }

    hideLoginPopup() {
        this.setState({ showPopup: false })
    }

    closeLeadPopup(){
        this.setState({ showPopup: false })
    }

    proceed(){
        if (STORAGE.checkAuth()) {
            this.props.history.push('/vip-club-member-details')
        }else{
          this.setState({ showPopup: true })  
        }
    }

    render() {
        console.log(this.state.selected_plan_data)
        let self = this

        return (

            this.props.vipClubList && Object.keys(this.props.vipClubList).length>0 && this.state.selected_plan_data && Object.keys(this.state.selected_plan_data).length>0?
                <div className="profile-body-wrap" style={{ background: "#ffffff" }}>
                    {/* <ProfileHeader /> */}
                    <div className="vipHeaderBar">
                        <div className="vipBackIco">
                            <img src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                        </div>
                        <div className="vip-logo-cont">
                            <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                            <h1>in Just <span className="vip-prc-cut">₹{this.state.selected_plan_data.mrp}</span> <span className="vip-main-price">₹{this.state.selected_plan_data.deal_price}</span>  </h1>
                                <p>{`${this.state.selected_plan_data.tenure} year upto ${this.state.selected_plan_data.total_allowed_members} members`}</p>
                        </div>
                    </div>
                    {
                        this.state.showPopup?
                        <VipLoginPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} isLead={this.state.isLead} closeLeadPopup={this.closeLeadPopup.bind(this)} popupClass={this.state.popupClass} overlayClass={this.state.overlayClass} identifyUserClick={this.state.identifyUserClick}/> : ''
                    }
                    <section className="container container-top-margin" style={{ paddingTop: '140px' }}>
                        <div className="row main-row parent-section-row">
                            <LeftBar />
                            <div className="col-12 center-column">
                                <div className="container-fluid ">
                                    <div className="care-new-container font-analyze">
                                        <div className="vip-tabs-container">
                                        {
                                            this.props.vipClubList && this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0?

                                                Object.entries(this.props.vipClubList.plans).map(function ([key, value]) {
                                                    return <p onClick={self.selectPlan.bind(self,value)} key={key} className= {`vp-sb-txt ${value.id == self.state.selected_plan_id? 'vp-act':''}`}>{value.plan_name} <span>
                                                    {`(₹ ${value.deal_price})`}
                                                    </span></p>
                                                })
                                            :''
                                        }
                                        </div>
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.doctor_consult_amount != ''?
                                                <div className="vip-offer-cards mb-3">
                                                    <div className="vip-free-doc vip-docbg">
                                                        <h4 className="vip-card-heading">Free Doctor Consultations</h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />30,000 verified doctors </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />All specializations included </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹ {this.state.selected_plan_data.worth.doctor_consult_amount}  </span>
                                                </div>
                                                :''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.enabled_hospital_networks && this.state.selected_plan_data.enabled_hospital_networks.length > 0 ?
                                                <div className="pakg-slider-container mb-3">
                                                    <div className="pkgSliderHeading">
                                                        <h5>Key Hospital Partners</h5>
                                                        <span>View Docprime Network</span>
                                                    </div>
                                                    <div className="pkgSliderContainer">
                                                        <div className="pkgCardsList d-inline-flex sub-wd-cards top_pkgCat">
                                                            {
                                                                Object.entries(this.state.selected_plan_data.enabled_hospital_networks).map(function ([key, value]) {
                                                                    return <div key={key} className="pkgcustCards vip-hsp-card-mn">
                                                                            <div className="vip-hsp-img">
                                                                                <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" />
                                                                            </div>
                                                                        </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            :''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.health_checkups_amount != ''?
                                                <div className="vip-offer-cards mb-3">
                                                    <div className="vip-free-doc vip-mem-bg">
                                                        <h4 className="vip-card-heading">Free Docprime Care Membership  </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimited online consult <span>(General Physician)</span> </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Priority Queue - No wait times </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.state.selected_plan_data.worth.health_checkups_amount}  </span>
                                                </div>
                                            :''
                                        }
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.online_chat_amount != ''?
                                                <div className="vip-offer-cards mb-3">
                                                    <div className="vip-free-doc vip-chek-bg">
                                                        <h4 className="vip-card-heading">Free Full Body Health Checkup </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />2 members covered</p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />60 tests included </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.state.selected_plan_data.worth.online_chat_amount}  </span>
                                                </div>
                                            :''
                                        }
                                        <div className="vip-ins-act-cont mb-3">
                                            <h4 className="ins-dcnt-hdng"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/vip-ins-act.png"} />Instant Activation Upon Purchase</h4>
                                            <div className="ins-dc-lstng">
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Pre-existing diseases covered</p>
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No medical tests required for plan activation </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.worth && Object.keys(this.state.selected_plan_data.worth).length > 0 && this.state.selected_plan_data.worth.online_chat_amount != ''?
                                                <div className="vip-offer-cards mb-3">
                                                    <div className="vip-free-doc vip-benft-bg">
                                                        <h4 className="vip-card-heading">Tax Benefits </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Cover under section 80D</p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Tax proof certificate will be provided </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹1,500  </span>
                                                </div>
                                            :''
                                        }

                                        {
                                            this.state.selected_plan_data && this.state.selected_plan_data.you_get && Object.keys(this.state.selected_plan_data.you_get).length > 0 && this.state.selected_plan_data.you_pay && Object.keys(this.state.selected_plan_data.you_pay).length > 0 ?
                                                <div className="vip-price-summery mb-3">
                                                    <div className="vip-prc-summry-hdng">
                                                        <p>Price Summary</p>
                                                    </div>
                                                    <div className="vip-prc-cards-cont">
                                                        <div className="vip-prc-cards">
                                                            <h5 className="vip-prc-hdng">You Pay</h5>
                                                            <ul className="vip-prc-lst">
                                                                <li><p>Plan Price: <span>₹{this.state.selected_plan_data.you_pay.mrp}</span></p></li>
                                                                <li><p>Offer Price: <span>₹{this.state.selected_plan_data.you_pay.deal_price}</span></p></li>
                                                                <li><p>Tax Rebate: <span>₹{this.state.selected_plan_data.you_pay.tax_rebate}</span></p></li>
                                                                <li className="effective-prc"><p>Effective Price: <span>₹{this.state.selected_plan_data.you_pay.effective_price}</span></p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="vip-prc-cards">
                                                            <h5 className="vip-prc-hdng">You Get</h5>
                                                            <ul className="vip-prc-lst">
                                                                <li><p>Doctor Consult: <span>₹{this.state.selected_plan_data.you_get.doctor_consult_amount}</span></p></li>
                                                                <li><p>Online Chat: <span>₹{this.state.selected_plan_data.you_get.online_chat_amount}</span></p></li>
                                                                <li><p>Health Checkup: <span>₹{this.state.selected_plan_data.you_get.health_checkups_amount}</span></p></li>
                                                                <li className="ttl-benft"><p>Effective Price: <span>₹{this.state.selected_plan_data.you_get.effective_price}</span></p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <p className="vip-no-cost"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/vip-ins-act.png"} /> No Cost EMI starts at <span>₹417</span></p>
                                                </div>
                                            :''
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
                                        </div>:''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="vip-foot-btn" onClick={this.proceed.bind(this)}><p>Become a Docprime VIP @ ₹{this.state.selected_plan_data.mrp}</p>
                            <p className="vipbtn-sub-txt">Effective Price ₹{this.state.selected_plan_data.deal_price}</p>
                        </button>
                        </section>
                </div>
            :<div></div>
        );
    }
}

export default VipClubView