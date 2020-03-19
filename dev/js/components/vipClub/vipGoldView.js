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
import HomePageWidget from '../commons/HomeNewView/HomePageWidget.js'

class VipGoldView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            showPopup: false
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
        const parsed = queryString.parse(this.props.location.search)
        let selectPlan = this.props.selected_plan_data && this.props.selected_plan_data.id
        if (selectPlan) {

            let plan = []
            if (this.props.is_booking_page == 'opd' && this.props.odpGoldPredictedPrice && this.props.odpGoldPredictedPrice.length) {
                plan = this.props.odpGoldPredictedPrice.filter(x => x.id == selectPlan)

            } else if (this.props.is_booking_page == 'lab' && this.props.labGoldPredictedPrice && this.props.labGoldPredictedPrice.length) {
                plan = this.props.labGoldPredictedPrice.filter(x => x.id == selectPlan)
            }

            if (plan && plan.length) {
                this.props.selectVipClubPlan('', plan[0]) // toggle/select gold plan
            }

        }
        if (this.props.is_from_organic) {
            let url
            if (parsed.callBackUrl) {
                url = parsed.callBackUrl
                if (parsed.hospital_id && !url.includes('hospital_id')) {
                    url += `?hospital_id=${parsed.hospital_id}`
                }
                if (parsed.doctor_id) {
                    url += `&doctor_id=${parsed.doctor_id}`
                }
                this.props.history.push(url)
            }
        } else {
            this.props.history.go(-1)
        }
    }

    closeLeadPopup() {
        this.setState({ showPopup: false })
    }

    //this function is linked video player iframe
    playVideo = () => {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'goldVideoClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'gold-video-clicked'
        }
        GTM.sendEvent({ data: data });
        const frameVideo = document.getElementById("goldVideo");
        const playIcon = document.getElementById('player-icon');
        frameVideo.ontimeupdate = () => {
            videoTimer()
        }
        function videoTimer() {
            let t = frameVideo.currentTime;
            vidTimer.innerHTML = Math.round(t) + 's';
        }
        let vidTimer = document.getElementById('video-time');
        vidTimer.style.display = "block";
        document.addEventListener('scroll', () => {
            frameVideo.pause();
            playIcon.style.opacity = 1;

        })
        frameVideo.addEventListener('ended', () => {
            playIcon.style.opacity = 1;

        })
        if (frameVideo.paused) {
            frameVideo.play();
            playIcon.style.opacity = 0;
        } else {
            frameVideo.pause();
            playIcon.style.opacity = 1;
        }
    }

    sendPageUrl = () => {
        let data = {
            callback: window.location.pathname.split('/')[1] + window.location.search.replace(/&/g, '*'),
            template: 'gold_template_1'
        }
        this.props.sendAgentWhatsupPageURL(data).then((resp) => {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Sent Successfully" })
            }, 500)
        }).catch((e) => {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Try again!" })
            }, 500)
        })
    }

    scroll(type) {
        let dataType = 'static_review_blck'
        var elmnt = document.getElementById(dataType)

        if (elmnt) {
            let outerDivWidth = elmnt.offsetWidth
            let cardCount = elmnt.children && elmnt.children.length ? elmnt.children.length : 6;
            let childDivWidth = elmnt.scrollWidth ? elmnt.scrollWidth : 3000;
            let cardWidth = Math.ceil(childDivWidth / cardCount)

            let leftScroll = elmnt.scrollLeft

            if (type == 'right') {
                elmnt.scroll({ left: leftScroll + outerDivWidth, behavior: 'smooth' })
                if (childDivWidth <= (leftScroll + 2 * outerDivWidth)) {
                    document.getElementById(`${dataType}_leftArrow_hsptl`).classList.add("d-none")
                }
                document.getElementById(`${dataType}_RightArrow_hsptl`).classList.remove("d-none")
            } else {
                elmnt.scroll({ left: leftScroll - outerDivWidth, behavior: 'smooth' })
                if (leftScroll - outerDivWidth <= 0) {
                    document.getElementById(`${dataType}_RightArrow_hsptl`).classList.add("d-none")
                }
                document.getElementById(`${dataType}_leftArrow_hsptl`).classList.remove("d-none")
            }
        }
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
                <React.Fragment>
                    {
                        this.state.showPopup ?
                            <VipLoginPopup {...this.props} closeLeadPopup={this.closeLeadPopup.bind(this)} is_see_more={true} /> : ''
                    }
                    {/*old View Starts*/}
                    <section className={`container container-top-margin sub-pdng-add d-none ${this.props.toggleTabType ? 'sub-pdng-rmv' : ''}`}>
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
                                        {
                                            this.props.is_pb ?
                                                <div>
                                                    <img src="https://cdn.docprime.com/media/web/custom_images/Pb_banner_exclusive_-min.png" className="pb-gold-banner" />
                                                </div>
                                                : ''}
                                        {/* ================== gold benifits  ================== */}
                                        <div className="gold-white-bg-container mb-24">
                                            <h4 className="vip-card-heading">Gold Benefits</h4>
                                            <div className="gold-benifi-cards-cont">
                                                <div className="gold-benifi-cards">
                                                    <img src={ASSETS_BASE_URL + '/img/gl1.png'} />
                                                    <p>Exclusive prices on <br /><strong>30,000 </strong> Doctors</p>
                                                </div>
                                                <div className="gold-benifi-cards">
                                                    <img src={ASSETS_BASE_URL + '/img/med-report.svg'} />
                                                    <p>Big Discounts on <br /><strong>5,000 </strong> Labs</p>
                                                </div>
                                                <div className="gold-benifi-cards">
                                                    <img src={ASSETS_BASE_URL + '/img/medlife-med.png'} />
                                                    <p>Save <strong>23% </strong> <br /> on Medicines </p>
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
                                                                            Coverage: {value.total_allowed_members} {parseInt(value.total_allowed_members) > 1 ? 'Members' : 'Member'}
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
                                            {/* <p className="gold-foot-bottom">You can cancel anytime within 30 days</p> */}
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
                                                        <h4 className="vip-card-heading">Flat 23% Discounts on Medicines <span className="medlife-col"><span className="powered-col text-left">Powered By</span><img src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" /></span> </h4>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Exclusive for Gold members</p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No minimum order values </p>
                                                        <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimited usage with no maximum cap </p>
                                                        <p className="text-left"><a className="tc-apply" onClick={this.props.toggle.bind(this, true)}>T&amp;C Apply</a></p>
                                                    </div>
                                                </div>
                                                {/* ================== gold benifits  ================== */}

                                                {/* ================== gold benefit video section  ================== */}
                                                {/* <div className="col-12 p-0">
                                                    <h4 className="vip-card-heading mb-24">Why Docprime Gold ?</h4>
                                                    <div className="vip-offer-cards mb-24" style={{ padding: 5 }}>
                                                        <video id="goldVideo" height="auto" src="https://cdn.docprime.com/media/web/custom_images/Gold_ad.mp4">
                                                        </video>
                                                        <a className="video-player d-flex justify-content-center align-item-center" onClick={this.playVideo}>
                                                            <img id="player-icon" width="85" src={ASSETS_BASE_URL + '/img/play.svg'} alt="Play Video" />
                                                        </a>
                                                        <h5 id="video-time" className="fw-500 text-center"></h5>
                                                    </div>
                                                </div> */}
                                                {/* ================== gold benefit Review starts ================== */}
                                                <VipReviewSection />
                                                {/* ================== gold benefit Review End ================== */}
                                                {/* ================== gold benefit video section ends ================== */}


                                            </div>
                                        </div>
                                        {/* ================== gold slider ================== */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*old View Ends*/}

                    {/* ================== new gold page view ================== */}
                    <div className="container-fluid gold-new-view">
                        {/* ================== Heading section ================== */}
                        <section className="heading-section d-flex align-items-baseline flex-column justify-content-center">
                            <h3 className="d-inline-block">
                                <span className="fw-500 pr-2 heading-name d-flex align-items-center">Docprime
                                    <img style={{ marginTop: 4 }} src={ASSETS_BASE_URL + "/img/gold-lg.png"} width="35" />
                                </span>
                            </h3>
                            <h4>Membership Plan For <br />Exclusive Discounts</h4>
                        </section>
                        {/* ================== Heading section ================== */}
                        {/* ================== Gold View Main container ================== */}
                        <section className="gold-view-main-container d-none">

                            {/* ================== Discount Listing view ================== */}
                            {/*<div className="row m-0 discount-listing-view">
                                <div className="col-sm-3 col-4 discount-list-item d-flex justify-content-center align-item-center">
                                    <img height="53"  src={ASSETS_BASE_URL + "/img/ico-1.svg"} />
                                    <h4 className="ml-3 fw-500">Exclusive Discounts <br/> On 30,000+ Doctors</h4>
                                    <h5 className="fw-500">Exclusive Prices On Doctors &amp; Labs</h5>
                                </div>
                                <div className="col-sm-3 col-4 discount-list-item d-flex justify-content-center align-item-center">
                                    <img height="53"  src={ASSETS_BASE_URL + "/img/ico-3.svg"} />
                                    <h4 className="ml-3 fw-500">Flat 23% OFF <br/>on Medicines</h4>
                                    <h5 className="fw-500">Flat 23% OFF On Medicines</h5>
                                </div>
                                <div className="col-sm-3 col-4 discount-list-item d-flex justify-content-center align-item-center">
                                    <img height="53"  src={ASSETS_BASE_URL + "/img/ico-4.svg"} />
                                    <h4 className="ml-3 fw-500">Unlimited Audio <br/>&amp; Chat Consultation</h4>
                                    <h5 className="fw-500">Unlimited Tele Consultations</h5>
                                </div>
                                <div className="col-sm-3 col-4 discount-list-item d-flex justify-content-center align-item-center">
                                    <img height="53"  src={ASSETS_BASE_URL + "/img/ico-2.svg"} />
                                    <h4 className="ml-3 fw-500">Discounts on <br/>5,000 Labs</h4>
                                </div>
                            </div>   */}
                            {/* ================== Discount Listing view ================== */}
                            {/* ================== Pricing table ================== */}
                            {this.props.vipClubList && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length > 0 ?
                                <div className="row m-0 pricing-row">
                                    <h3 className="text-center">Select your plan</h3>
                                    <div className="row m-0 desktop-view-pricing-table" style={{ width: '100%' }}>
                                        <div className="col-sm-3">
                                            <div className="price-card-list">
                                                <h5>&nbsp;</h5>
                                                <ul>
                                                    <li>Price</li>
                                                    <li>Coverage</li>
                                                    <li> Validity</li>
                                                    <li>Unlimited <br /> Online Consultation</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-sm-9">
                                            {
                                                Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                                                    return <div className={`${self.props.vipClubList.gold_plans && self.props.vipClubList.gold_plans.length < 4 ? 'col-4' : 'col-3'} pricing-card`}>
                                                        <h5>{value.internal_name}</h5>
                                                        <ul>
                                                            <li className="buy-price">₹ {value.deal_price}<br />
                                                                {value.is_selected ?
                                                                    <span className="popular-col d-inline-block">POPULAR</span>
                                                                    : <span style={{ opacity: 0 }} className="popular-col d-inline-block">&nbsp;</span>
                                                                }
                                                            </li>
                                                            <li>{value.total_allowed_members} {parseInt(value.total_allowed_members) > 1 ? 'Members' : 'Member'}</li>
                                                            <li> {value.tenure} months</li>
                                                            <li className="times-icon-list">
                                                                <span style={{ fontSize: 16, position: 'relative', top: 6, fontWeight: 500 }} >{value.chat_plan_description ? value.chat_plan_description : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <button className="cstm-book-btn" onClick={self.props.selectGoldPlan.bind(self, value, false, true)}>Buy</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="row m-0 mbl-view-pricing-table" style={{ width: '100%' }}>
                                        {
                                            Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                                                return <div className={`${self.props.vipClubList.gold_plans && self.props.vipClubList.gold_plans.length < 4 ? 'col-4' : 'col-3'} price-table d-flex justify-content-center align-items-center flex-column ${value.id == self.props.selected_plan_id ? 'active' : ''}`} onClick={self.props.selectGoldPlan.bind(self, value, false, false)}>
                                                    <div className="shadow-box">&nbsp;</div>
                                                    <div className="indicator-box d-flex justify-content-center align-items-center">
                                                        <img width="12" src={ASSETS_BASE_URL + '/img/white-check.svg'} />
                                                    </div>
                                                    <h4 className="m-0">
                                                        {value.is_selected ?
                                                            <span className="popular-col">popular</span>
                                                            : <span style={{ opacity: 0 }} className="popular-col d-inline-block">&nbsp;</span>
                                                        }
                                                        <span>{value.internal_name}</span>
                                                        <span className="price-text">₹ {value.deal_price}</span>
                                                    </h4>
                                                    {key == 0 ?
                                                        <React.Fragment>
                                                            <h3>COVERAGE (Members)</h3>
                                                            <h3 style={{ top: '13.3rem' }}>VALIDITY (Months)</h3>
                                                            <h3 style={{ top: '18.8rem' }}>UNLIMITED ONLINE CONSULTATION</h3>
                                                        </React.Fragment>
                                                        : ''}
                                                    <hr style={{ width: '100%', background: 'rgba(112, 112, 112, 0.2)' }} />
                                                    <h4 className="member-count">{value.total_allowed_members}</h4>
                                                    <hr style={{ width: '100%', background: 'rgba(112, 112, 112, 0.2)' }} />
                                                    <h4>{value.tenure}</h4>
                                                    <hr style={{ width: '100%', background: 'rgba(112, 112, 112, 0.2)' }} />
                                                    <h4>
                                                        {
                                                            value.chat_plan_description ?
                                                                <span>{value.chat_plan_description}</span>
                                                                : <span className="dashRotate">|</span>
                                                        }
                                                    </h4>
                                                </div>
                                            })
                                        }

                                    </div>
                                </div>
                                : ''}
                            {/* ================== Pricing table ================== */}
                            {/* ================== list & gold video widget ================== */}
                            {/*<div className="row m-0 d-flex flex-column video-block-row">
                                    <div className="row gold-list-row">
                                        <div className="col-sm-6 col-12 gold-video-col">
                                            <h4 className="vip-card-heading p-0" style={{marginBottom: 10,marginTop: 10}}>Gold Membership Benefits</h4>
                                            <div className="vip-offer-cards">
                                                <video id="goldVideo" height="auto" src="https://cdn.docprime.com/media/web/custom_images/Gold_ad.mp4">
                                                </video>
                                                <a className="video-player d-flex justify-content-center align-item-center" onClick={this.playVideo}>
                                                    <img id="player-icon" width="85" src={ASSETS_BASE_URL + '/img/play.svg'} alt="Play Video" />
                                                </a>
                                                <h5 id="video-time" className="fw-500 text-center"></h5>
                                            </div>            
                                        </div>
                                        <div className="col-sm-6 col-12 d-flex align-items-center justify-content-center">
                                            <div className="gold-grntee-card-container m-0">
                                                <div className="gold-grntee-card mb-3">
                                                    <div className="round-img-gld">
                                                        <img alt="rupeedown" src={ASSETS_BASE_URL + '/img/rupedwn1.svg'} />
                                                    </div>
                                                    <div className="gold-grnte-content">
                                                        <h4>100% Satisfaction Guarantee</h4>
                                                        <p>Cancel anytime within a year and get full refund. No questions asked</p>
                                                    </div>
                                                </div>
                                                <div className="gold-grntee-card mb-3">
                                                    <div className="round-img-gld">
                                                        <img style={{ width: '' }} alt="rupeedown" src={ASSETS_BASE_URL + '/img/greenrp.svg'} />
                                                    </div>
                                                    <div className="gold-grnte-content">
                                                        <h4>Potential savings of ₹6000/year on OPD, Health check-ups and Medicines</h4>
                                                        <p className="gld-see-more p-0" onClick={(e) => {
                                                            let data = {
                                                                'Category': 'ConsumerApp', 'Action': 'goldSeeHowClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'gold-see-how-click'
                                                            }
                                                            GTM.sendEvent({ data: data });
                                                            this.setState({ showPopup: true })
                                                        }
                                                        }>See how <img src={ASSETS_BASE_URL + '/img/icons/back-orange.svg'} /></p>
                                                    </div>
                                                </div>
                                                <div className="gold-grntee-card">
                                                    <div className="round-img-gld">
                                                        <img alt="rupeedown" src={ASSETS_BASE_URL + '/img/consult-report.svg'} />
                                                    </div>
                                                    <div className="gold-grnte-content">
                                                        <h4>Free Doctor Consultation after every Lab appointment</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-12" style={{display: 'flex', flex : 1}}>
                                            <div className="vip-offer-cards">
                                                <div className="vip-free-doc">
                                                    <h4 className="vip-card-heading">Flat 23% Discounts on Medicines <span className="medlife-col"><span className="powered-col text-left">Powered By</span><img src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" /></span> </h4>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/chk-2.svg'} />Exclusive for Gold members</p>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/chk-2.svg'} />No minimum order values </p>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/chk-2.svg'} />Unlimited usage with no maximum cap </p>
                                                    <p className="text-left"><a className="tc-apply" onClick={this.props.toggle.bind(this, true)}>T&amp;C Apply</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-12 d-flex">
                                            <div className="vip-offer-cards">
                                                <div className="vip-free-doc">
                                                    <h4 className="vip-card-heading">Online Doctor Consultations</h4>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/chk-2.svg'} />Online Doctor Consultations</p>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/chk-2.svg'} />Unlimited online consultations for full family</p>
                                                    <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/chk-2.svg'} />Instant connect over Chat &amp; Call</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                            {/* ================== Medlife & consulataion widget ================== */}
                            {/* <div className="row med-blocks">
                                
                            </div> */}
                            {/* ================== Medlife & consulataion widget ================== */}
                            {/* ================== list & gold video widget ================== */}
                        </section>
                        <section className="gold-view-main-container">
                            <h3 className="mt-10 gldhdng">Gold plan</h3>
                            {
                                    Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
                                            return <div className="gold-pln-cont">
                                                <div className="goldPlanSec">
                                                    <p> {`Coverage: ${value.total_allowed_members} Member`} </p>
                                                    <span> {`Valid for ${value.tenure} Month`}</span>
                                                </div>
                                                <p className="goldPrices">₹{value.deal_price}</p>
                                            </div>           
                                    })
                            }
                        </section>
                        <div className="card-block-widget">
                            {
                                this.props.topHospitals && this.props.topHospitals.top_hospitals && this.props.topHospitals.top_hospitals.length > 0 ?
                                    <HomePageWidget
                                        heading="Key Hospital Partner"
                                        list={this.props.topHospitals.top_hospitals}
                                        topHospitals={true}
                                        dataType='home_top_hsptl'
                                        historyObj={this.props.history}
                                        searchFunc={this.props.hospitalCardClicked}
                                        goldNetwork={this.props.viewDocprimeNetworkClicked.bind()}
                                        fromGold={true}
                                    />
                                    : ''
                            }
                            {
                                this.props.selected_plan && Object.keys(this.props.selected_plan).length ?
                                    <div className="fixed p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container">
                                        {
                                            this.props.is_booking_page !== '' && (this.props.is_booking_page == 'opd' || this.props.is_booking_page == 'lab') ?
                                                <button className="v-btn-primary book-btn-mrgn-adjust desk-cont-btn" onClick={this.goBack.bind(this)}>
                                                    <p>Continue Booking</p>
                                                </button>
                                                : this.props.is_from_organic ?
                                                    <button className="desk-cont-btn" onClick={this.goBack.bind(this)}>
                                                        <p>Continue Booking</p>
                                                    </button>
                                                    : <button className="v-btn-primary book-btn-mrgn-adjust " style={{ background: '#1b97fd', borderColor: "#1b97fd" }} onClick={this.props.proceed.bind(this)}>
                                                        <p>Continue with {`${this.props.selected_plan.internal_name} ₹ ${this.props.selected_plan.deal_price}`}</p>
                                                    </button>
                                        }
                                        {
                                            STORAGE.isAgent() ? <button className="add-shpng-cart-btn" style={{ borderColor: "#1b97fd", color: "#1b97fd" }} onClick={this.sendPageUrl}><img className="img-fluid" src={ASSETS_BASE_URL + '/img/wa-logo-sm.png'} />Send on Whatsapp</button> : ''
                                        }
                                    </div>
                                    : ''}
                        </div>
                        <div className="card-block-widget pt-0">
                            <section className="card-block-row">
                                <div className="top-card-row">
                                    <h6>Top Labs</h6>
                                </div>
                                {/* card slider */}
                                <div className="card-slider-container">
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/Thyrocare_JthRqFf.png" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 50% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/9be7c3c53ed30877c1433bf6d9f7d916_GjgCeik.jpg" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 50% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/medlife_hDQxilJ.png" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 70% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/2c25c272c61b8b646301741f1c980387.jpg" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 20% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/45ae4aff8b1b9bf6d1dff2e86e97400a.jpg" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 50% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/da7ccb6125dda7b3eba1c38d7bd9c0b9_Zp0O1EX.jpg" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 70% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/healtiens.png" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 18% OFF</h5>
                                    </div>
                                    <div className="slider-card-column" id="cardBlock">
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src="https://cdn.docprime.com/media/lab/images/90x60/c2748b2e22e2f8e3ed90cb3ca5ea29be_i3PE0Ya.jpg" alt="Partners" />
                                        </div>
                                        <h5 className="off-txt" style={{ position: 'relative', bottom: 0 }}> Upto 40% OFF</h5>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/******  customer review *********/}
                        <div className="card-block-widget pt-0">
                            <section className="card-block-row">
                                <h6 className="fw-500" style={{ fontSize: 14, paddingBottom: 5 }}>Our Happy Gold Customers</h6>
                                <div className="card-slider-container cust-review d-flex justify-content-between cust-feedback-col" id="static_review_blck">
                                    <div className="col-10 col-sm-4 text-center">
                                        <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                            {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                                            <span>KP</span>
                                        </div>
                                        <h3>Kritika Pandey</h3>
                                        <p className="text-center mb-2">Can you imagine having a discount on doctor's fee. Yeah, I was surprised too. But with Docprime Gold membership, i got heavy discounts on doctor fees, lab tests and full-body health packages. Definitely saved some good money here.</p>
                                        {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                                    </div>
                                    <div className="col-10 col-sm-4 text-center">
                                        <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                            {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                                            <span>PS</span>
                                        </div>
                                        <h3>Purnima Singla</h3>
                                        <p className="text-center mb-2">I have booked 3 full body health packages for my family. After receiving the report, I got a call from a doctor who explained each and every element of the report to me and my family. He even prescribed some medicines to my mother and directed us to take some multivitamins. I truly loved the service.</p>
                                        {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                                    </div>
                                    <div className="col-10 col-sm-4 text-center">
                                        <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                            <span>AS</span>
                                        </div>
                                        <h3>Akash Saini</h3>
                                        <p className="text-center mb-2">I didn’t believe in the Gold membership product at first. I was happy with discounts but was suspecting the network of hospitals & labs. I am happy that I took this chance and booked the membership. Docprime has partnered with most of the top hospitals and labs. I recently got a discount on Medanta’s Doctor fee.</p>
                                    </div>
                                    <div className="col-10 col-sm-4 text-center">
                                        <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                                            <span>SS</span>
                                        </div>
                                        <h3>Sonam Sinha</h3>
                                        <p className="text-center mb-2">I booked preventive health packages for my parents living in Delhi. I am so glad that I can take care of their health by sitting in Bangalore. They collected the blood sample from my parent's home and sent the report on email which was reviewed by their Doctor. He prescribed some medicines to my parents and I got 23% off on medicine online delivery. Had an overall amazing experience!</p>
                                    </div>
                                </div>
                                {/* slider buttons */}
                                <a className="pkg-btnlft d-none" id={`static_review_blck_RightArrow_hsptl`} onClick={this.scroll.bind(this, 'left')}>
                                    <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left" />
                                </a>
                                <a className="pkg-btnrgt" id={`static_review_blck_leftArrow_hsptl`} onClick={this.scroll.bind(this, 'right')}>
                                    <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-right" />
                                </a>
                            </section>
                        </div>
                        {/******  customer review *********/}
                        {/* ================== Frequently asked question widget ================== */}
                        <section className="faq-row">
                            <div className="gold-acrd-main">
                                <div className="acdn-title d-flex align-items-center justify-content-between" onClick={this.ButtonHandler.bind(this, 0)}>
                                    <h3 className="fw-700" style={{ fontSize: '15px' }}>Frequently asked questions</h3>
                                    <img className={` ${this.state.tabsValue.indexOf(0) > -1 ? '' : 'acdn-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                </div>
                                {/* ===================inner accordion container=================== */}
                                <div className={`inneracord-container ${this.state.tabsValue.indexOf(0) > -1 ? 'd-none' : ''}`}>
                                    <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 1)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500">What are the benefits of being a gold member? </h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(1) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(1) > -1 ? 'd-none' : ''}`}>
                                            You can avail exclusive discounts on Doctor and Lab test appointments for the covered members in the plan. The membership will last till the duration of the plan.
                                        </p>
                                    </div>
                                    {/*<div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 2)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500">How can I avail discounts on medicines? </h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(2) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(2) > -1 ? 'd-none' : ''}`}>
                                            You can visit <a style={{ color: '#f78631', cursor: 'pointer' }} href="https://www.medlife.com/"> www.medlife.com</a> website or mobile application and use the exclusive coupon code provided to you once you become a gold member. You will get flat 23% discount on prescription drugs. Promo code can be used multiple times for 1 year without any minimum order value.
                                        <br />
                                            <span> For more details  <span style={{ color: '#f78631', cursor: 'pointer' }} onClick={this.props.toggle.bind(this, true)}>click here</span></span>
                                        </p>
                                    </div>*/}
                                    <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 3)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500">Whom can I add members under the plan? </h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(3) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(3) > -1 ? 'd-none' : ''}`}>
                                            You can add your family, extended family or friends under the plan
                                        </p>
                                    </div>
                                   {/*
                                         <div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 4)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500">How can I avail free doctor consultations for lab appointment?</h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(4) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(4) > -1 ? 'd-none' : ''}`}>
                                            After completion of a pathology lab appointment, you will have the option to consult with our panel of doctors for free & get your lab report reviewed.
                                        </p>
                                    </div>
                                   */}

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
                                            You can get discounts on all the labs and hospitals which are part of the gold network. Please note that the Gold network is dynamic in nature and might change from time to time. To view gold network, <span style={{ color: '#f78631', cursor: 'pointer' }} onClick={() => this.props.viewDocprimeNetworkClicked()}>click here</span>
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
                                            <h2 className="fw-500">Can I use gold membership to Pay at Clinic ? </h2>
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
                                    {/*
<div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 11)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500">How can I cancel my gold membership and get refund for the same? </h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(11) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(11) > -1 ? 'd-none' : ''}`}>
                                            We assure you the best discounts and service quality on Docprime for full year. However, if you are still not satisfied for any reason, you can place a 100% refund request by sending an email at customercare@docprime.com with your contact no. The refund will be credited in the original payment mode within 5- 7 working days.
                                        </p>
                                    </div>
                                    */}
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
                                    {/*<div className="gold-sub-acrd" onClick={this.ButtonHandler.bind(this, 14)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500"> How to use online consultation? </h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(14) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(14) > -1 ? 'd-none' : ''}`}>
                                            Start by clicking on 'Online Consultation' at the bottom of the website/app and when prompted provide the primary mobile number registered with Docprime Gold and your consultation will be absolutely free. However, it is not for emergencies.
                                        </p>
                                    </div>
                                    <div className="gold-sub-acrd" style={{ borderBottom: 'none' }} onClick={this.ButtonHandler.bind(this, 15)}>
                                        <div className="acdn-title">
                                            <h2 className="fw-500 m-0"> How will online doctor solve my medical issue?
                                            </h2>
                                            <img className={`acdn-arrow  ${this.state.tabsValue.indexOf(15) > -1 ? '' : 'acdn-arrow-up'}`} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <p className={`gold-sub-acrd-content ${this.state.tabsValue.indexOf(15) > -1 ? 'd-none' : ''}`}>
                                            We have built features like image sharing and audio calling along with chat to ensure doctors can get all the required information for diagnosis. You just need to answer a few questions and our doctors will give you qualified medical advice on your health issues.
                                        </p>
                                    </div>
                                */}
                                </div>

                                {/* ===================inner accordion container=================== */}
                            </div>
                        </section>
                        {/* ================== Frequently asked question widget ================== */}
                        <p className="gold-trms-cnd gold-tnc" onClick={() => this.props.history.push('/terms')}>Terms of Use</p>
                        {/* ================== Gold View Main container ================== */}

                    </div>
                </React.Fragment>
                : <div></div>
        );
    }
}

export default VipGoldView