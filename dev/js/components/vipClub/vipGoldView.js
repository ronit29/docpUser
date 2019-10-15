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
        }
    }
    render() {
        let self = this

        let is_gold_selected = false
            {
                this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0?
                    Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                        if(parseInt(value.id) == parseInt(self.props.selected_plan_data.id)){
                            is_gold_selected = true
                        }
                })
                :''
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
                                                    <p onClick={this.props.selectGoldPlan.bind(this,true)} className={`vp-sb-txt ${is_gold_selected ? 'vp-act' : ''}`}>Gold <span>
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
                                                                return <div key={key} className={`gold-ofr-lising ${value.id == self.props.selected_plan_id ? 'gold-select' : ''}`} onClick={self.props.selectGoldPlan.bind(self, value,false)}>
                                                                    <div className="gold-mnthplan">
                                                                        <p className="mnth-plan-gld">{value.tenure} Months {value.is_selected?<span>POPULAR</span>:''}</p>
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
                                                        :''}

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
                                                    <div className="pakg-slider-container mb-10  d-none">
                                                        <div className="pkgSliderHeading">
                                                            <h5>Top hospitals</h5>
                                                            <span onClick={() => this.navigateTo()}>View Docprime Gold Network</span>
                                                        </div>
                                                        <div className="pkgSliderContainer">
                                                            <div className="pkgCardsList d-inline-flex sub-wd-cards home_top_hsptl_list">
                                                                <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                    <div className="pkgcardImgCont">
                                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                    </div>
                                                                    <p className="gold-upto-offer">Upto 70% OFF</p>
                                                                </a>
                                                                {
                                                                    this.props.topHospitals.top_hospitals.map((data, key)=>{
                                                                        <a key={`${key}_${data.id}`} href='' className="pkgcustCards"  onClick={()=>this.carouselCardClicked(topHospital?true:false,data)}>
                                                                            <div className="pkgcardImgCont">
                                                                                {
                                                                                    data.logo && <img style={{width: '82px'}} className="img-fluid" src={data.logo} />
                                                                                }
                                                                            </div>
                                                                            <p className="gold-upto-offer">
                                                                                {data.name}
                                                                            </p>
                                                                        </a>
                                                                    })
                                                                }
                                                                
                                                                

                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="pakg-slider-container mb-10 d-none">
                                                    <div className="pkgSliderHeading">
                                                        <h5>Top Labs</h5>

                                                    </div>
                                                    <div className="pkgSliderContainer">
                                                        <div className="pkgCardsList d-inline-flex sub-wd-cards home_top_hsptl_list">
                                                            <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                <div className="pkgcardImgCont">
                                                                    <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                </div>
                                                                <p className="gold-upto-offer">Upto 70% OFF</p>
                                                            </a>
                                                            <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                <div className="pkgcardImgCont">
                                                                    <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                </div>
                                                                <p className="gold-upto-offer">Upto 70% OFF</p>
                                                            </a>
                                                            <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                <div className="pkgcardImgCont">
                                                                    <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                </div>
                                                                <p className="gold-upto-offer">Upto 70% OFF</p>
                                                            </a>
                                                            <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                <div className="pkgcardImgCont">
                                                                    <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                </div>
                                                                <p className="gold-upto-offer">Upto 70% OFF</p>
                                                            </a>
                                                            <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                <div className="pkgcardImgCont">
                                                                    <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                </div>
                                                                <p className="gold-upto-offer">Upto 70% OFF</p>
                                                            </a>
                                                            <a href="/ck-birla-hospital-for-women-in-sector-50-gurgaon-hpp" className="pkgcustCards">
                                                                <div className="pkgcardImgCont">
                                                                    <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" style={{ width: '82px' }} />
                                                                </div>
                                                                <p className="gold-upto-offer">Upto 70% OFF</p>
                                                            </a>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="gold-accordion-container">
                                                    <div className="gold-acrd-main">
                                                        <div className="acdn-title">
                                                            <h2 className="fw-500" style={{ fontSize: '15px' }}>Frequently asked questions</h2>
                                                            <img className="acdn-arrow acdn-arrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                        </div>
                                                        {/* ===================inner accordion container=================== */}
                                                        <div className="inneracord-container">
                                                            <div className="gold-sub-acrd">
                                                                <div className="acdn-title">
                                                                    <h2 className="fw-500">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt</h2>
                                                                    <img className="acdn-arrow acdn-arrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                                                </div>
                                                                <p className="gold-sub-acrd-content">
                                                                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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