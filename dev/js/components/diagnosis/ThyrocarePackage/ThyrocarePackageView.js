import React from 'react';
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import Footer from '../../commons/Home/footer'
import BannerCarousel from '../../commons/Home/bannerCarousel';
import HelmetTags from '../../commons/HelmetTags';
import NonIpdPopupView from '../../commons/nonIpdPopup.js'
const queryString = require('query-string');

class ThyrocarePackageView extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            collapse: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            expandClick: true,
            expandText: 'Expand All',
            showNonIpdPopup: parsed.show_popup,
            to_be_force:1,
            is_lead_enabled:true
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        let selectedLocation = ''
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation) {
            selectedLocation = this.props.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }

        this.props.getOfferList(lat, long);
    }

    toggle(index) {
        let collapse = [...this.state.collapse]
        collapse[index] = !collapse[index]
        this.setState({ collapse })
    }

    expandAll() {
        if (this.state.expandClick) {
            let collapse = this.state.collapse.map((x) => true)
            this.setState({ collapse })
            this.setState({ expandClick: !this.state.expandClick, expandText: 'Collapse All' });
        } else {
            let collapse = this.state.collapse.map((x) => false)
            this.setState({ collapse })
            this.setState({ expandClick: !this.state.expandClick, expandText: 'Expand All' });
        }
    }

    bookNowClicked(url, trackingName) { // book now

        let data = {
            'Category': 'ConsumerApp', 'Action': trackingName, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': trackingName
        }
        GTM.sendEvent({ data: data })
        if (window) {
            window.location.href = url
        }
    }

    viewAllClick() {
        this.props.history.push('/tax-saver-health-packages?package_category_ids=59')
    }

    goldClicked(pkg_id) { // gold click
        let data = {
            'Category': 'ConsumerApp', 'Action': 'VipGoldThyrocareClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-gold-thyrocare-clicked', 'pkgId': pkg_id
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/vip-gold-details?is_gold=true&source=thyrocarePkgListing&lead_source=Docprime')
    }

    nonIpdLeads(phone_number){ // leads for matrix for the packages searched by user
        const parsed = queryString.parse(this.props.location.search)
        let data =({phone_number:phone_number,lead_source:'Labads',source:parsed,lead_type:'LABADS',test_name:'thyrocare aarogyam packages',exitpoint_url : 'http://docprime.com' + this.props.location.pathname})

        if(this.props.common_utm_tags && this.props.common_utm_tags.length){
            data.utm_tags = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
        }

        let visitor_info = GTM.getVisitorInfo()
        if(visitor_info && visitor_info.visit_id){
            data.visit_id = visitor_info.visit_id
            data.visitor_id = visitor_info.visitor_id
        }
        
        let gtm_data = {
            'Category': 'ConsumerApp', 'Action': 'NonIpdThyrocareSubmitClick', 'CustomerID': GTM.getUserId() || '', 'event': 'non-ipd-thyrocare-submit-click'
        }
        GTM.sendEvent({ data: gtm_data })
        this.props.saveLeadPhnNumber(phone_number)
       if(this.state.is_lead_enabled){
            this.setState({is_lead_enabled:false})
            this.props.NonIpdBookingLead(data)
            setTimeout(() => {
                this.setState({is_lead_enabled:true})
            }, 5000)
        } 
       this.setState({to_be_force:0})
    }

    closeIpdLeadPopup(from){
        if(from){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'NonIpdThyrocareCrossClick', 'CustomerID': GTM.getUserId() || '', 'event': 'non-ipd-thyrocare-cross-click'
        }
        GTM.sendEvent({ data: data })
            this.setState({to_be_force:0})
        }
    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <HelmetTags tagsData={{
                            title: 'Compare top Aarogyam packages from Thyrocare | Book Online & Save upto 50%',
                            description: 'Compare and book Aarogyam full body health checkup packages from Thyrocare at docprime.com. Avail exclusive discounts & save upto 50%. Get free home sample collection and online reports on time.'
                        }} />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'thyrocare_aarogyam_packages_page').length ?
                                    <div className="col-12">
                                        <BannerCarousel {...this.props} sliderLocation="thyrocare_aarogyam_packages_page" />
                                    </div> : ''
                            }
                            <div className="d-flex justify-content-between mrt-10" style={{ padding: '0 15px' }} >
                                <h4 className="fw-500" style={{ fontSize: 16, flex: 1, marginRight: 4 }}>Top full body checkup packages</h4>
                                <button onClick={() => this.viewAllClick()} className="vw-all-static text-primary fw-500">View all</button>
                            </div>
                            <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                <div className="static-pk-container sticky-pk-container">
                                    <div className="static-pkg-top-column">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam B<br />(Includes 56 tests)</p>
                                            <p className="stc-price-cut">₹ 750{/*634 <span>₹ 750</span>*/}</p>
                                        </div>
                                    </div>
                                    <div className="static-pkg-top-column stc-mid-mrgn">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam C <br />(Includes 59 tests)</p>
                                            <p className="stc-price-cut">₹ 1500{/*950 <span>₹ 1100</span>*/}</p>
                                        </div>
                                    </div>
                                    <div className="static-pkg-top-column">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam 1.3 <br />(Includes 90 tests)</p>
                                            <p className="stc-price-cut">₹ 2000{/*1440 <span>₹ 1600</span>*/}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="static-pk-container sticky-pk-container-2" style={{ paddingTop: 0, paddingBottom: 30 }} >
                                    <div className="static-pkg-top-column">
                                        {/*<div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                Includes ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>*/}

                                        <div className="d-flex align-items-center justify-content-center goldCard mt-0" onClick={this.goldClicked.bind(this,12227)}>
                                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
                                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ 540</span>
                                        </div>

                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=12227" onClick={(e) => {
                                            e.preventDefault()
                                            this.bookNowClicked('/lab/searchresults?test_ids=12227', 'TopbookNowClickedBlock1')
                                        }} className="stc-book-btn">Book Now</a>
                                    </div>
                                    <div className="static-pkg-top-column stc-mid-mrgn" style={{ position: 'relative' }} >
                                        {/*<div className="stc-offr-cpn">
                                            <p className="stc-off-para">Includes ₹ 150 OFF Coupon</p>
                                        </div>*/}
                                        <div className="d-flex align-items-center justify-content-center goldCard mt-0" onClick={this.goldClicked.bind(this,12213)}>
                                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
                                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ 840</span>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=12213" onClick={(e) => {
                                            e.preventDefault()
                                            this.bookNowClicked('/lab/searchresults?test_ids=12213', 'TopbookNowClickedBlock2')
                                        }} className="stc-book-btn">
                                            Book Now
                                        </a>
                                        <div className="popular-txt" style={{ top: 'unset', right: 'unset', bottom: '-26px', left: '50%', transform: 'translateX(-50%)' }} >
                                            <span className="fw-500">Popular</span>
                                        </div>
                                    </div>
                                    <div className="static-pkg-top-column">
                                        {/*<div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                Includes ₹ 160
                                                OFF Coupon
                                                                </p>
                                        </div>*/}
                                        <div className="d-flex align-items-center justify-content-center goldCard mt-0" onClick={this.goldClicked.bind(this,14947)}>
                                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
                                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ 1437</span>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=14947"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                this.bookNowClicked('/lab/searchresults?test_ids=14947', 'TopbookNowClickedBlock3')
                                            }}
                                            className="stc-book-btn">Book Now</a>
                                    </div>
                                </div>
                                <div className="stc-acrdn-contaniner">
                                    <h5 className="stc-expnd-btn mrt-10" onClick={this.expandAll.bind(this)}>{this.state.expandText}</h5>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading stc-no-cursor">
                                            <p>Preparation</p>
                                        </div>
                                        <div className="stc-acrd-content">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    8-10 hrs of fasting required before sample collection
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    8-10 hrs of fasting required before sample collection
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    8-10 hrs of fasting required before sample collection
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading stc-no-cursor">
                                            <p>Tests Included </p>
                                        </div>
                                        <div className="stc-acrd-content text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    56
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    59
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    90
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 0)}>
                                            <p>CBC Haemogram Tests</p>
                                            {
                                                this.state.collapse[0] ? <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                            }
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    24
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    24
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    24
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[0] ?
                                                <div>
                                                    <div><span>Complete Blood Count (CBC) is a blood test that measures Red blood cells (RBC), White blood cells (WBC), Platelets (PLTs), Hemoglobin (Hb), and Hematocrit (Hct) in the blood. This test is used to determine the overall health and screen for any diseases that affect the blood cells.</span></div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Complete Blood Count (CBC) is a blood test that measures Red blood cells (RBC), White blood cells (WBC), Platelets (PLTs), Hemoglobin (Hb), and Hematocrit (Hct) in the blood. This test is used to determine the overall health and screen for any diseases that affect the blood cells.

                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">


                                                                <li><p>Total RBC</p></li>
                                                                <li><p>Red Cell Distribution Width (RDW-CV)</p></li>
                                                                <li><p>Red Cell Distribution Width - SD(RDW-SD)</p></li>
                                                                <li><p>Platelet To Large Cell Ratio (PLCR)</p></li>

                                                                <li>
                                                                    <p>
                                                                        Platelet Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corpuscular Hemoglobin (MCH)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corp.Hemo.Conc (MCHC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corpuscular Volume (MCV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Monocytes
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Platelet Volume (MPV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Neutrophils (NP)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Nucleated Red Blood Cells (NRBC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Plateletcrit (PCT)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Hematocrit (PCV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Platelet Distribution Width (PDW)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Hemoglobin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Eosinophils (EP)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Immature Granulocytes (IG)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Basophils - Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Eosinophils - Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Lymphocytes- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Monocytes- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Neutrophils- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Basophils (BS)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Lymphocyte Percentage (LC%)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Total Leucocytes Count (TLC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Nucleated Red Blood Cells (NRBC%)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Immature Granulocyte Percentage(IG%)
                                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Complete Blood Count (CBC) is a blood test that measures Red blood cells (RBC), White blood cells (WBC), Platelets (PLTs), Hemoglobin (Hb), and Hematocrit (Hct) in the blood. This test is used to determine the overall health and screen for any diseases that affect the blood cells.

                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">


                                                                <li><p>Total RBC</p></li>
                                                                <li><p>Red Cell Distribution Width (RDW-CV)</p></li>
                                                                <li><p>Red Cell Distribution Width - SD(RDW-SD)</p></li>
                                                                <li><p>Platelet To Large Cell Ratio (PLCR)</p></li>

                                                                <li>
                                                                    <p>
                                                                        Platelet Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corpuscular Hemoglobin (MCH)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corp.Hemo.Conc (MCHC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corpuscular Volume (MCV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Monocytes
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Platelet Volume (MPV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Neutrophils (NP)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Nucleated Red Blood Cells (NRBC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Plateletcrit (PCT)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Hematocrit (PCV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Platelet Distribution Width (PDW)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Hemoglobin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Eosinophils (EP)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Immature Granulocytes (IG)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Basophils - Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Eosinophils - Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Lymphocytes- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Monocytes- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Neutrophils- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Basophils (BS)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Lymphocyte Percentage (LC%)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Total Leucocytes Count (TLC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Nucleated Red Blood Cells (NRBC%)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Immature Granulocyte Percentage(IG%)
                                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Complete Blood Count (CBC) is a blood test that measures Red blood cells (RBC), White blood cells (WBC), Platelets (PLTs), Hemoglobin (Hb), and Hematocrit (Hct) in the blood. This test is used to determine the overall health and screen for any diseases that affect the blood cells.

                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">


                                                                <li><p>Total RBC</p></li>
                                                                <li><p>Red Cell Distribution Width (RDW-CV)</p></li>
                                                                <li><p>Red Cell Distribution Width - SD(RDW-SD)</p></li>
                                                                <li><p>Platelet To Large Cell Ratio (PLCR)</p></li>

                                                                <li>
                                                                    <p>
                                                                        Platelet Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corpuscular Hemoglobin (MCH)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corp.Hemo.Conc (MCHC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Corpuscular Volume (MCV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Monocytes
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Mean Platelet Volume (MPV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Neutrophils (NP)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Nucleated Red Blood Cells (NRBC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Plateletcrit (PCT)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Hematocrit (PCV)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Platelet Distribution Width (PDW)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Hemoglobin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Eosinophils (EP)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Immature Granulocytes (IG)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Basophils - Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Eosinophils - Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Lymphocytes- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Monocytes- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Neutrophils- Absolute Count
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Basophils (BS)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Lymphocyte Percentage (LC%)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Total Leucocytes Count (TLC)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Nucleated Red Blood Cells (NRBC%)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Immature Granulocyte Percentage(IG%)
                                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 1)}>
                                            <p>Liver Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    11
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    11
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    11
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[1] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Gamma glutamyl Transferase
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Alkaline Phosphate
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-Direct
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-total
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-Indirect
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Protein -total
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Albumin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Globulin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        SGOT(AST)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        SGPT(ALT)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Albumin /Globulin Ratio
                                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Gamma glutamyl Transferase
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Alkaline Phosphate
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-Direct
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-total
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-Indirect
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Protein -total
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Albumin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Globulin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        SGOT(AST)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        SGPT(ALT)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Albumin /Globulin Ratio
                                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Gamma glutamyl Transferase
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Alkaline Phosphate
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-Direct
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-total
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Bilirubin-Indirect
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Protein -total
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Albumin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Globulin
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        SGOT(AST)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        SGPT(ALT)
                                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Albumin /Globulin Ratio
                                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 2)}>
                                            <p>Renal Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    5
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    5
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    5
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[2] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Calcium
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Uric Acid
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Blood Urea Nitrogen
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Creatine
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        BUN/Serum Creatinine Ratio
                                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Calcium
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Uric Acid
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Blood Urea Nitrogen
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Creatine
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        BUN/Serum Creatinine Ratio
                                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Calcium
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Uric Acid
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Blood Urea Nitrogen
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Creatine
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        BUN/Serum Creatinine Ratio
                                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 11)}>
                                            <p>Lipid Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    8
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    8
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    8
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[11] ?
                                                <div> <span>Lipid profile test is a set of tests used to measure the amount of cholesterol and other types of fats present in your blood. This test is helpful in assessing the risk of cardiovascular diseases (CVD).</span>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">

                                                        <div className="acrd-stc-data">
                                                            {/*} <p>Lipid profile test is a set of tests used to measure the amount of cholesterol and other types of fats present in your blood. This test is helpful in assessing the risk of cardiovascular diseases (CVD).

                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>LDL Cholestrol</p></li>
                                                                <li><p>Total Cholesterol</p></li>
                                                                <li><p>HDL Cholesterol</p></li>
                                                                <li><p>Triglycerides</p></li>
                                                                <li><p>VLDL Cholesterol</p></li>
                                                                <li><p>LDL/HDL Ratio</p></li>
                                                                <li><p>Non - HDL Cholesterol</p></li>
                                                                <li><p>TC/HDL Cholesterol Ratio</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*} <p>Lipid profile test is a set of tests used to measure the amount of cholesterol and other types of fats present in your blood. This test is helpful in assessing the risk of cardiovascular diseases (CVD).

                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>LDL Cholestrol</p></li>
                                                                <li><p>Total Cholesterol</p></li>
                                                                <li><p>HDL Cholesterol</p></li>
                                                                <li><p>Triglycerides</p></li>
                                                                <li><p>VLDL Cholesterol</p></li>
                                                                <li><p>LDL/HDL Ratio</p></li>
                                                                <li><p>Non - HDL Cholesterol</p></li>
                                                                <li><p>TC/HDL Cholesterol Ratio</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*} <p>Lipid profile test is a set of tests used to measure the amount of cholesterol and other types of fats present in your blood. This test is helpful in assessing the risk of cardiovascular diseases (CVD).

                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>LDL Cholestrol</p></li>
                                                                <li><p>Total Cholesterol</p></li>
                                                                <li><p>HDL Cholesterol</p></li>
                                                                <li><p>Triglycerides</p></li>
                                                                <li><p>VLDL Cholesterol</p></li>
                                                                <li><p>LDL/HDL Ratio</p></li>
                                                                <li><p>Non - HDL Cholesterol</p></li>
                                                                <li><p>TC/HDL Cholesterol Ratio</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 3)}>
                                            <p>Iron Deficiency</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[3] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Total Iron Binding Capacity
                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Iron
                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        % Transerrin Saturation
                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Total Iron Binding Capacity
                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Iron
                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        % Transerrin Saturation
                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Total Iron Binding Capacity
                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Serum Iron
                                                                        </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        % Transerrin Saturation
                                                                        </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 4)}>
                                            <p>Thyroid Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[4] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Trilodothyronine(T3)
                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Total Thyroxine(T4)
                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Thyroid Stimulating Hormone(TSH)
                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Trilodothyronine(T3)
                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Total Thyroxine(T4)
                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Thyroid Stimulating Hormone(TSH)
                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p>
                                                                        Trilodothyronine(T3)
                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Total Thyroxine(T4)
                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p>
                                                                        Thyroid Stimulating Hormone(TSH)
                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 5)}>
                                            <p >CARDIAC RISK MARKER</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    5
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[5] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">

                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">

                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li>
                                                                    <p >
                                                                        LIPOPROTEIN(A)
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p >
                                                                        APOLIPOPROTEIN-A1
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p >
                                                                        APOLIPOPROTEIN-B
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p >
                                                                        C- REACTIVE PROTEIN (HSCRP)
                                                                                </p>
                                                                </li>
                                                                <li>
                                                                    <p >
                                                                        APO B/ APO A1 RATIO
                                                                                </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 6)}>
                                            <p >HOMOCYSTEIN</p>
                                            {/* <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> */}
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                        {/* {
                                            this.state.collapse[6] ?
                                                <div> <span>Lipid profile test is a set of tests used to measure the amount of cholesterol and other types of fats present in your blood. This test is helpful in assessing the risk of cardiovascular diseases (CVD).</span>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">

                                                        <div className="acrd-stc-data">
                                                            
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        } */}
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 7)}>
                                            <p>Diabetic Screen</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    2
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    2
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    2
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[7] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li><p>Hba1c</p></li>
                                                                <li><p>Average blood Glucose</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li><p>Hba1c</p></li>
                                                                <li><p>Average blood Glucose</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list mt-0">
                                                                <li><p>Hba1c</p></li>
                                                                <li><p>Average blood Glucose</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 8)}>
                                            <p >VITAMIN D PROFILE</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[8] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">

                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Vitamin D Total-25 Hydroxy</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Vitamin D Total-25 Hydroxy</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 9)}>
                                            <p >VITAMIN B COMPLEX</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[9] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">

                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Vitamin B-12</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Vitamin B-12</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 10)}>
                                            <p>TESTOSTERONE</p>
                                            {/* <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> */}
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 11)}>
                                            <p >Cystatin C</p>
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 12)}>
                                            <p >Copper Serum</p>
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 13)}>
                                            <p >Zinc - Serum</p>
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 14)}>
                                            <p>Elements</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    22
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[14] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">

                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">

                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Aluminium</p></li>
                                                                <li><p>Arsenic</p></li>
                                                                <li><p>Barium</p></li>
                                                                <li><p>Cadmium</p></li>
                                                                <li><p>Caesium</p></li>
                                                                <li><p>Mercury</p></li>
                                                                <li><p>Lead</p></li>
                                                                <li><p>Tin</p></li>
                                                                <li><p>Bismuth</p></li>
                                                                <li><p>Beryllium</p></li>
                                                                <li><p>Antimony</p></li>
                                                                <li><p>Strontium</p></li>
                                                                <li><p>Thallium</p></li>
                                                                <li><p>Uranium</p></li>
                                                                <li><p>Cobalt</p></li>
                                                                <li><p>Chromium</p></li>
                                                                <li><p>Molybdenum</p></li>
                                                                <li><p>Silver</p></li>
                                                                <li><p>Vanadium</p></li>
                                                                <li><p>Selenium</p></li>
                                                                <li><p>Nickel</p></li>
                                                                <li><p>Magnesium</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    {/*                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 15)}>
                                            <p>Pancreatic (Acute) Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    2
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[15] ?
                                                <div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">

                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">

                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>AMYLASE</p></li>
                                                                <li><p>LIPASE</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                        <RightBar extraClass=" chat-float-btn-2" msgTemplate="gold_general_template"/>
                    </div>
                    {
                            /*(this.state.showNonIpdPopup == 1 || this.state.showNonIpdPopup == 2) && this.state.to_be_force == 1?
                            <NonIpdPopupView {...this.props} nonIpdLeads={this.nonIpdLeads.bind(this)} closeIpdLeadPopup = {this.closeIpdLeadPopup.bind(this)} is_force={this.state.showNonIpdPopup} is_lab={false}/>
                            :''*/
                        }
                </section>
                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default ThyrocarePackageView