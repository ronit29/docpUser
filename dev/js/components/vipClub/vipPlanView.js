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
import VipReviewSection from './vipReviewSection.js'

class VipPlanView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
        }
    }

    render() {
        let self = this
        let is_gold_selected = false
        let selected_gold_plan_price 
            {
                this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length?
                Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                    if(value.is_selected){
                        selected_gold_plan_price = value.deal_price
                    }
                    if(parseInt(value.id) == parseInt(self.props.selected_plan_data.id)){
                        is_gold_selected = true
                    }
                })
                :''
            }

        return (

            this.props.vipClubList && Object.keys(this.props.vipClubList).length > 0 && this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 ?
                    
                    <section className={`container container-top-margin  ${this.props.toggleTabType ? '' : ''}`}>
                        <div className="row main-row parent-section-row">
                            <LeftBar />
                            <div className="col-12 center-column">
                                <div className="container-fluid ">
                                    <div className="vip-new-container font-analyze">
                                        <div className="vip-tabs-container">
                                            {
                                                this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.is_vip_gold && this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 ?
                                                    <p onClick={this.props.selectGoldPlan.bind(this,true)} className={`vp-sb-txt ${is_gold_selected ? 'vp-act' : ''}`}>Gold 
                                                        <span> {`(₹ ${selected_gold_plan_price})`}</span>
                                                    </p>
                                                : ''
                                            }
                                            {
                                                this.props.vipClubList && this.props.vipClubList.plans && this.props.vipClubList.plans.length > 0 ?
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
                                        <div className="mb-24">
                                            <div className="vip-cvpmem-main">
                                                <div className="vip-cvpmem">
                                                    <p className="vip-vld">
                                                        <img src={ASSETS_BASE_URL + '/img/vipcal.svg'} /><span>Validity: <b>365 Days</b></span>
                                                    </p>
                                                    <p className="vip-vld">
                                                        <img src={ASSETS_BASE_URL + '/img/vipuser.svg'} /><span>Covers upto: <b>4 Members</b></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="cpm-lst">
                                                <ul className="lst-vpp">
                                                    {
                                                        Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.doctor_consult_amount != '' ?
                                                            <li>In-Clinic Consults: ₹{this.props.selected_plan_data.worth.doctor_consult_amount}  </li>
                                                            : ''
                                                    }
                                                    {
                                                        Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.health_checkups_amount != '' ?
                                                            <li>Health Checkups: ₹{this.props.selected_plan_data.worth.health_checkups_amount}</li>
                                                            : ''
                                                    }
                                                </ul>
                                                <ul className="lst-vpp">
                                                    {
                                                        Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.online_chat_amount != '' ?
                                                            <li>Unlimited Online Consult: ₹{this.props.selected_plan_data.worth.online_chat_amount}</li>
                                                            : ''
                                                    }
                                                    {
                                                        Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.tax_rebate != '' ?
                                                            <li>Tax Benefit (80D): ₹{this.props.selected_plan_data.worth.tax_rebate}</li>
                                                            : ''
                                                    }
                                                </ul>
                                            </div>
                                        </div>


                                        {
                                            this.props.selected_plan_data && this.props.selected_plan_data.worth && Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.doctor_consult_amount != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-docbg">
                                                        <h4 className="vip-card-heading">In-Clinic Doctor Consultations</h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />30,000 + associated doctors </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />All specializations included </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹ {this.props.selected_plan_data.worth.doctor_consult_amount}  </span>
                                                </div>
                                                : ''
                                        }
                                        {
                                            this.props.topHospitals && this.props.topHospitals.top_hospitals && this.props.topHospitals.top_hospitals.length > 0 &&
                                            <div className="pakg-slider-container mb-24">
                                                    <CarouselView topHeading='Key Hospital Partners' dataList={this.props.topHospitals.top_hospitals} dataType='top_vip_Hospitals' carouselCardClicked={(data,top) => this.props.hospitalCardClicked(data,top)} topHospital={true} extraHeading='View Docprime Network' navigateTo= {()=>this.props.viewDocprimeNetworkClicked(is_gold_selected)} viewAll={true}/>
                                            </div>
                                        }
                                        {
                                            this.props.nearbyHospitals && this.props.nearbyHospitals.hospitals && this.props.nearbyHospitals.hospitals.length > 0 &&
                                            <div className="pakg-slider-container mb-24">
                                                    <CarouselView topHeading='Hospitals Near You' dataList={this.props.nearbyHospitals.hospitals} dataType='nearby_vip_Hospitals' carouselCardClicked={(top, data) => this.props.hospitalCardClicked(top, data)} />
                                            </div>

                                        }
                                        {
                                            this.props.selected_plan_data && this.props.selected_plan_data.worth && Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.online_chat_amount != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-mem-bg">
                                                        <h4 className="vip-card-heading">Docprime Care Membership  </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimited online consult <span> (General Physician)</span> </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Priority Queue </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.props.selected_plan_data.worth.online_chat_amount}  </span>
                                                </div>
                                                : ''
                                        }
                                        {
                                            this.props.selected_plan_data && this.props.selected_plan_data.worth && Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.health_checkups_amount != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-chek-bg">
                                                        <h4 className="vip-card-heading">Full Body Preventive Health Checkup </h4>
                                                        {
                                                            this.props.selected_plan_data && this.props.selected_plan_data.worth && Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.members_covered_in_package ?
                                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />{this.props.selected_plan_data.worth.members_covered_in_package} {this.props.selected_plan_data.worth.members_covered_in_package == 1 ? 'member' : 'members'} covered</p>
                                                                : ''
                                                        }
                                                        {
                                                            this.props.selected_plan_data && this.props.selected_plan_data.worth && Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.total_test_covered_in_package ?
                                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />{this.props.selected_plan_data.worth.total_test_covered_in_package} tests included </p>
                                                                : ''
                                                        }
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.props.selected_plan_data.worth.health_checkups_amount}  </span>
                                                </div>
                                                : ''
                                        }
                                        <div className="vip-ins-act-cont mb-24">
                                            <h4 className="ins-dcnt-hdng"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/vip-ins-act.png"} />Instant Activation</h4>
                                            <div className="ins-dc-lstng">
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Pre-existing diseases covered</p>
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No medical tests required for plan activation </p>
                                            </div>
                                        </div>

                                        <div className="vip-offer-cards mb-24">
                                            <div className="vip-free-doc vip-bkdiscount-bg">
                                                <div className="bkdiscount-text">
                                                    <h4 className="vip-card-heading">Flat 25% discount on lab bookings </h4>
                                                    <p>Maximum discount of ₹1000 per booking</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="vip-offer-cards mb-24">
                                            <div className="vip-free-doc vip-medlife-bg">
                                                <h4 className="vip-card-heading">Flat 23% Discounts on Medicines <span className="medlife-col"><span className="powered-col text-left">Powered By</span><img src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" /></span> </h4>
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Exclusive for Gold members</p>
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No minimum order values </p>
                                                <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimited usage with no maximum cap </p>
                                                <p className="text-left"><a className="tc-apply" onClick={this.props.toggle.bind(this,true)}>T&amp;C Apply</a></p>
                                            </div>
                                        </div>
                                        {
                                            this.props.selected_plan_data && this.props.selected_plan_data.worth && Object.keys(this.props.selected_plan_data.worth).length > 0 && this.props.selected_plan_data.worth.tax_rebate != '' ?
                                                <div className="vip-offer-cards mb-24">
                                                    <div className="vip-free-doc vip-benft-bg">
                                                        <h4 className="vip-card-heading">Tax Benefits </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Cover under section 80D</p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Tax proof certificate will be provided </p>
                                                    </div>
                                                    <span className="vip-card-tag">Worth ₹{this.props.selected_plan_data.worth.tax_rebate}  </span>
                                                </div>
                                                : ''
                                        }

                                        {
                                            this.props.selected_plan_data && this.props.selected_plan_data.you_get && Object.keys(this.props.selected_plan_data.you_get).length > 0 && this.props.selected_plan_data.you_pay && Object.keys(this.props.selected_plan_data.you_pay).length > 0 ?
                                                <div className="vip-price-summery mb-24">
                                                    <div className="vip-prc-summry-hdng">
                                                        <p>Price Summary</p>
                                                    </div>
                                                    <div className="vip-prc-cards-cont">
                                                        <div className="vip-prc-cards">
                                                            <h5 className="vip-prc-hdng">You Get</h5>
                                                            <ul className="vip-prc-lst">
                                                                <li><p>In-Clinic Consult: <span>₹{this.props.selected_plan_data.you_get.doctor_consult_amount}</span></p></li>
                                                                <li><p>Online Consult: <span>₹{this.props.selected_plan_data.you_get.online_chat_amount}</span></p></li>
                                                                <li><p>Health Checkup: <span>₹{this.props.selected_plan_data.you_get.health_checkups_amount}</span></p></li>
                                                                <li className="ttl-benft"><p>Benefits Worth: <span>₹{this.props.selected_plan_data.you_get.effective_price}</span></p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="vip-prc-cards">
                                                            <h5 className="vip-prc-hdng">You Pay</h5>
                                                            <ul className="vip-prc-lst">
                                                                <li><p>Plan Price: <span>₹{this.props.selected_plan_data.you_pay.mrp}</span></p></li>
                                                                <li><p>Offer Price: <span>₹{this.props.selected_plan_data.you_pay.deal_price}</span></p></li>
                                                                <li><p>Tax Rebate (80D): <span>₹{this.props.selected_plan_data.you_pay.tax_rebate}</span></p></li>
                                                                <li className="effective-prc"><p>Effective Price: <span>₹{this.props.selected_plan_data.you_pay.effective_price}</span></p></li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                    <p className="vip-no-cost"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/coinico.png"} /> No Cost EMI Starts @ <span>  ₹{Math.round(parseInt(this.props.selected_plan_data.deal_price) / 12)}</span></p>
                                                </div>
                                                : ''
                                        }
                                        <VipReviewSection />
                                        {
                                            this.props.selected_plan_data && this.props.selected_plan_data.content && Object.keys(this.props.selected_plan_data.content).length > 0 && this.props.selected_plan_data.content.salient_features && this.props.selected_plan_data.content.salient_features.length > 0 ?
                                                <div className="vip-note-lst">
                                                    <p>A few things to note... </p>
                                                    <ul>
                                                        {
                                                            Object.entries(this.props.selected_plan_data.content.salient_features).map(function ([key, value]) {
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
                        <button className="vip-foot-btn" onClick={this.props.proceed.bind(this)}><p>Buy Now @ ₹{this.props.selected_plan_data.deal_price}</p>
                            <p className="vipbtn-sub-txt">Inclusive of GST</p>
                        </button>
                    </section>
                : <div></div>
        );
    }
}

export default VipPlanView