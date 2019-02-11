import React from 'react';

import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'
import Footer from '../../commons/Home/footer'

class LabView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            expandClick: true,
            expandText: 'Expand All'
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
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

    bookNowClicked(url, trackingName) {

        let data = {
            'Category': 'ConsumerApp', 'Action': trackingName, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': trackingName
        }
        GTM.sendEvent({ data: data })
        if (window) {
            window.location.href = url
        }
    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <h4 className="mrng-top-12">Top full body checkup packages</h4>
                            <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                <div className="static-pk-container sticky-pk-container">
                                    <div className="static-pkg-top-column">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Good Health Package</p>
                                            <p className="stc-price-cut">₹ 360 <span>₹ 400</span></p>
                                        </div>
                                    </div>
                                    <div className="static-pkg-top-column">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam B
                                                                (Thyrocare)</p>
                                            <p className="stc-price-cut">₹ 560 <span>₹ 700</span></p>
                                        </div>
                                    </div>
                                    {/*<div className="static-pkg-top-column stc-mid-mrgn">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">MET Healthy Youth (25 YRS & Above)
                                            </p>
                                            <p className="stc-price-cut">₹ 999 <span>₹ 3,640</span></p>
                                        </div>
                                    </div>*/}
                                    <div className="static-pkg-top-column stc-mid-mrgn">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">MET Healthy Youth (25 YRS & Above)</p>
                                            <p className="stc-price-cut">₹ 999 <span>₹ 1,450</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="static-pk-container">
                                    <div className="static-pkg-top-column">
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                10% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=12349" onClick={(e) => {
                                            e.preventDefault()
                                            this.bookNowClicked('/lab/searchresults?test_ids=12349', 'TopbookNowClickedBlock1')
                                        }} className="stc-book-btn">Book Now</a>
                                    </div>
                                    <div className="static-pkg-top-column stc-mid-mrgn">
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">72% OFF + ₹ 100 OFF Coupon</p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=12227" onClick={(e) => {
                                            e.preventDefault()
                                            this.bookNowClicked('/lab/searchresults?test_ids=12227', 'TopbookNowClickedBlock2')
                                        }}
                                            className="stc-book-btn">Book Now</a>
                                    </div>
                                    <div className="static-pkg-top-column">
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                20% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=11722"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                this.bookNowClicked('/lab/searchresults?test_ids=11722', 'TopbookNowClickedBlock3')
                                            }}
                                            className="stc-book-btn">Book Now</a>
                                    </div>
                                </div>
                                <div className="stc-acrdn-contaniner">
                                    <h5 className="stc-expnd-btn" onClick={this.expandAll.bind(this)}>{this.state.expandText}</h5>
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
                                                    35
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    56
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    68
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
                                                    29
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    28
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    28
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
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 15)}>
                                            <p>Cholesterol-Total Serum</p>
                                            {/*<img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />*/}
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[15] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    {/*<p>A "male hormone" -- a sex hormone produced by the testes that encourages the development of male sexual characteristics, stimulates the activity of the male secondary sex characteristics, and prevents changes in them following castration.
                                                                        </p>*/}
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 16)}>
                                            <p>SGPT ALT</p>
                                            {/*<img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />*/}
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[16] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    {/*<p>A "male hormone" -- a sex hormone produced by the testes that encourages the development of male sexual characteristics, stimulates the activity of the male secondary sex characteristics, and prevents changes in them following castration.
                                                                        </p>*/}
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 17)}>
                                            <p>Routine Urine Analysis (RUA)</p>
                                            {/*<img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />*/}
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[17] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    {/*<p>A "male hormone" -- a sex hormone produced by the testes that encourages the development of male sexual characteristics, stimulates the activity of the male secondary sex characteristics, and prevents changes in them following castration.
                                                                        </p>*/}
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 18)}>
                                            <p>Serum Creatinine</p>
                                            {/*<img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />*/}
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    1
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[18] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    {/*<p>A "male hormone" -- a sex hormone produced by the testes that encourages the development of male sexual characteristics, stimulates the activity of the male secondary sex characteristics, and prevents changes in them following castration.
                                                                        </p>*/}
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 1)}>
                                            <p>Liver Function Test</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
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
                                                    <div>
                                                        <span>Liver function tests are blood tests used to help diagnose and monitor liver disease or damage. The tests measure the levels of certain enzymes and proteins in your blood.</span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Liver function tests are blood tests used to help diagnose and monitor liver disease or damage. The tests measure the levels of certain enzymes and proteins in your blood. 
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li>
                                                                    <p>
                                                                        Gamma Glutamyl Transferase
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
                                                                        Bilirubin-Total
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
                                                            {/*<p>Liver function tests are blood tests used to help diagnose and monitor liver disease or damage. The tests measure the levels of certain enzymes and proteins in your blood. 
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li>
                                                                    <p>
                                                                        Gamma Glutamyl Transferase
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
                                                                        Bilirubin-Total
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
                                                            {/*<p>Liver function tests are blood tests used to help diagnose and monitor liver disease or damage. The tests measure the levels of certain enzymes and proteins in your blood. 
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li>
                                                                    <p>
                                                                        Gamma Glutamyl Transferase
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
                                                                        Bilirubin-Total
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
                                            <p>Lipid Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
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
                                            this.state.collapse[2] ?
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
                                            <p>Kidney Function Test</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
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
                                            this.state.collapse[3] ?
                                                <div>
                                                    <div>
                                                        <span>Kidneys play an important role in the removal of waste products and maintenance of water and electrolyte balance in the body. Kidney Function Test (KFT) includes a group of blood tests to determine how well the kidneys are working.</span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Kidneys play an important role in the removal of waste products and maintenance of water and electrolyte balance in the body. Kidney Function Test (KFT) includes a group of blood tests to determine how well the kidneys are working.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Creatinine</p></li>
                                                                <li><p>Uric Acid (UA)</p></li>
                                                                <li><p>Blood Urea Nitrogen (BUN)</p></li>
                                                                <li><p>BUN/ Serum Creatinine Ratio</p></li>
                                                                <li><p>Calcium</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Kidneys play an important role in the removal of waste products and maintenance of water and electrolyte balance in the body. Kidney Function Test (KFT) includes a group of blood tests to determine how well the kidneys are working.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Creatinine</p></li>
                                                                <li><p>Uric Acid (UA)</p></li>
                                                                <li><p>Blood Urea Nitrogen (BUN)</p></li>
                                                                <li><p>BUN/ Serum Creatinine Ratio</p></li>
                                                                <li><p>Calcium</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Kidneys play an important role in the removal of waste products and maintenance of water and electrolyte balance in the body. Kidney Function Test (KFT) includes a group of blood tests to determine how well the kidneys are working.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Creatinine</p></li>
                                                                <li><p>Uric Acid (UA)</p></li>
                                                                <li><p>Blood Urea Nitrogen (BUN)</p></li>
                                                                <li><p>BUN/ Serum Creatinine Ratio</p></li>
                                                                <li><p>Calcium</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 4)}>
                                            <p>Thyroid Panel 1</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
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
                                                    <div>
                                                        <span>Thyroid function tests (TFTs) is a collective term for blood tests used to check the function of the thyroid. A TFT panel typically includes thyroid hormones such as thyroid-stimulating hormone (TSH, thyrotropin) and thyroxine (T4), and triiodothyronine (T3).</span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Thyroid function tests (TFTs) is a collective term for blood tests used to check the function of the thyroid. A TFT panel typically includes thyroid hormones such as thyroid-stimulating hormone (TSH, thyrotropin) and thyroxine (T4), and triiodothyronine (T3).
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>TriIodothyronine (T3)</p></li>
                                                                <li><p>Thyroxine - T4 Total</p></li>
                                                                <li><p>TSH - Thyroid Stimulating Hormone</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Thyroid function tests (TFTs) is a collective term for blood tests used to check the function of the thyroid. A TFT panel typically includes thyroid hormones such as thyroid-stimulating hormone (TSH, thyrotropin) and thyroxine (T4), and triiodothyronine (T3).
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>TriIodothyronine (T3)</p></li>
                                                                <li><p>Thyroxine - T4 Total</p></li>
                                                                <li><p>TSH - Thyroid Stimulating Hormone</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Thyroid function tests (TFTs) is a collective term for blood tests used to check the function of the thyroid. A TFT panel typically includes thyroid hormones such as thyroid-stimulating hormone (TSH, thyrotropin) and thyroxine (T4), and triiodothyronine (T3).
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>TriIodothyronine (T3)</p></li>
                                                                <li><p>Thyroxine - T4 Total</p></li>
                                                                <li><p>TSH - Thyroid Stimulating Hormone</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 5)}>
                                            <p>Iron</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    3
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[5] ?
                                                <div>
                                                    <div>
                                                        <span>Iron tests are groups of clinical chemistry laboratory blood tests that are used to evaluate body iron stores or the iron level in blood serum. Other terms used for the same tests are iron panel, iron profile, iron indices or iron status.
                                                </span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Iron tests are groups of clinical chemistry laboratory blood tests that are used to evaluate body iron stores or the iron level in blood serum. Other terms used for the same tests are iron panel, iron profile, iron indices or iron status.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Total Iron Binding Capacity (TIBC)</p></li>
                                                                <li><p>Iron</p></li>
                                                                <li><p>Transferrin Saturation</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Iron tests are groups of clinical chemistry laboratory blood tests that are used to evaluate body iron stores or the iron level in blood serum. Other terms used for the same tests are iron panel, iron profile, iron indices or iron status.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Total Iron Binding Capacity (TIBC)</p></li>
                                                                <li><p>Iron</p></li>
                                                                <li><p>Transferrin Saturation</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Iron tests are groups of clinical chemistry laboratory blood tests that are used to evaluate body iron stores or the iron level in blood serum. Other terms used for the same tests are iron panel, iron profile, iron indices or iron status.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Total Iron Binding Capacity (TIBC)</p></li>
                                                                <li><p>Iron</p></li>
                                                                <li><p>Transferrin Saturation</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 6)}>
                                            <p>Diabetes Screen, Profile</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    2
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[6] ?
                                                <div>
                                                    <div>
                                                        <span>Definition: insulin resistance. This test is ordered for a patient who newly diagnosed with diabetes type-2 to monitor the status of beta cell production of insulin and while the insulin injection is required for the patient. The expected value: Normal or high level of C-peptide will be detected.
                                                </span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Definition: insulin resistance. This test is ordered for a patient who newly diagnosed with diabetes type-2 to monitor the status of beta cell production of insulin and while the insulin injection is required for the patient. The expected value: Normal or high level of C-peptide will be detected.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>HbA1c Glycated Haemoglobin</p></li>
                                                                <li><p>Average Blood Glucose (ABG)</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Definition: insulin resistance. This test is ordered for a patient who newly diagnosed with diabetes type-2 to monitor the status of beta cell production of insulin and while the insulin injection is required for the patient. The expected value: Normal or high level of C-peptide will be detected.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>HbA1c Glycated Haemoglobin</p></li>
                                                                <li><p>Average Blood Glucose (ABG)</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Definition: insulin resistance. This test is ordered for a patient who newly diagnosed with diabetes type-2 to monitor the status of beta cell production of insulin and while the insulin injection is required for the patient. The expected value: Normal or high level of C-peptide will be detected.
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>HbA1c Glycated Haemoglobin</p></li>
                                                                <li><p>Average Blood Glucose (ABG)</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 7)}>
                                            <p>Cardiac Risk Profile, Marker</p>
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
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[7] ?
                                                <div>
                                                    <div>
                                                        <span>A cardiac risk profile—or CRP—gives you information about some of the factors that can put you at risk for heart disease—things like elevated blood levels of cholesterol, triglycerides, and glucose (blood sugar).
                                                </span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <p></p>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            <p></p>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>A cardiac risk profile—or CRP—gives you information about some of the factors that can put you at risk for heart disease—things like elevated blood levels of cholesterol, triglycerides, and glucose (blood sugar).
                                                                        </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Lipoprotein (A)</p></li>
                                                                <li><p>Apolipoproteins A1</p></li>
                                                                <li><p>High Sensitivity C-Reactive Protein (HSCRP)</p></li>
                                                                <li><p>Apolipoproteins B</p></li>
                                                                <li><p>Apolipoproteins B/A1</p></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 8)}>
                                            <p>Homocysteine</p>
                                            <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p className="acrd-stc-red">X
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
                                                    <div>
                                                        <span>Homocysteine is an amino acid that is produced by the human body, usually as a byproduct of consuming meat. Homocysteine is normally converted into other amino acids. An abnormal accumulation of homocysteine, which can be measured in the blood, can be a marker for the development of heart disease.
                                                </span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <p>
                                                            </p>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Homocysteine is an amino acid that is produced by the human body, usually as a byproduct of consuming meat. Homocysteine is normally converted into other amino acids. An abnormal accumulation of homocysteine, which can be measured in the blood, can be a marker for the development of heart disease.
                                                                        </p>*/}
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            {/*<p>Homocysteine is an amino acid that is produced by the human body, usually as a byproduct of consuming meat. Homocysteine is normally converted into other amino acids. An abnormal accumulation of homocysteine, which can be measured in the blood, can be a marker for the development of heart disease.
                                                                        </p>*/}
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 9)}>
                                            <p>Vitamin D Profile</p>
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
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[9] ?
                                                <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                    <div className="acrd-stc-data">
                                                        <p>
                                                        </p>
                                                    </div>
                                                    <div className="acrd-stc-data mid-border-mrgn">
                                                        {/*<p>Vitamin D Total-25 Hydroxy
                                                                        </p>*/}
                                                    </div>
                                                    <div className="acrd-stc-data">
                                                        {/*<p>Vitamin D Total-25 Hydroxy
                                                                        </p>*/}
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 10)}>
                                            <p>Vitamin B Complex</p>
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
                                                <p className="acrd-stc-red">X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[10] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    {/*<p>Vitamin B12, active Holo Transcobalamin
                                                                        </p>*/}
                                                </div>
                                                <div className="acrd-stc-data">
                                                    {/*<p>Vitamin B12, active Holo Transcobalamin
                                                                        </p>*/}
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 11)}>
                                            <p>Electrolytes</p>
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
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[11] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    <p>
                                                    </p>
                                                    <ul className="stc-data-ul-list">
                                                        <li><p>Sodium</p></li>
                                                        <li><p>Chloride</p></li>
                                                    </ul>
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 12)}>
                                            <p>Testosterone Total</p>
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
                                                <p className="acrd-stc-red">
                                                    X
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[12] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    {/*<p>A "male hormone" -- a sex hormone produced by the testes that encourages the development of male sexual characteristics, stimulates the activity of the male secondary sex characteristics, and prevents changes in them following castration.
                                                                        </p>*/}
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>
                                                    </p>
                                                </div>
                                            </div> : ''
                                        }
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 13)}>
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
                                                <p className="acrd-stc-red">
                                                    X
                                                                            </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[13] ?
                                                <div>
                                                    <div>
                                                        <span>Acute pancreatitis or acute pancreatic necrosis is a sudden inflammation of the pancreas. It can have severe complications and high mortality despite treatment.
                                                </span>
                                                    </div>
                                                    <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                        <div className="acrd-stc-data">
                                                            <p>
                                                            </p>
                                                        </div>
                                                        <div className="acrd-stc-data mid-border-mrgn">
                                                            {/*<p>Acute pancreatitis or acute pancreatic necrosis is a sudden inflammation of the pancreas. It can have severe complications and high mortality despite treatment.
                                                                            </p>*/}
                                                            <ul className="stc-data-ul-list">
                                                                <li><p>Amylase</p></li>
                                                                <li><p>Lipase</p></li>
                                                            </ul>
                                                        </div>
                                                        <div className="acrd-stc-data">
                                                            <p>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                </div>
                                <div className="static-pk-container">
                                    <div className="static-pkg-top-column">
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                10% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=12349" onClick={(e) => {
                                            e.preventDefault()
                                            this.bookNowClicked('/lab/searchresults?test_ids=12349', 'TopbookNowClickedBlock1')
                                        }} className="stc-book-btn">Book Now</a>
                                    </div>
                                    <div className="static-pkg-top-column stc-mid-mrgn">
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">72% OFF + ₹ 100 OFF Coupon</p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=12227" onClick={(e) => {
                                            e.preventDefault()
                                            this.bookNowClicked('/lab/searchresults?test_ids=12227', 'TopbookNowClickedBlock2')
                                        }}
                                            className="stc-book-btn">Book Now</a>
                                    </div>
                                    <div className="static-pkg-top-column">
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                20% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <a href="/lab/searchresults?test_ids=11722"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                this.bookNowClicked('/lab/searchresults?test_ids=11722', 'TopbookNowClickedBlock3')
                                            }}
                                            className="stc-book-btn">Book Now</a>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                <div className="stc-scn-listing">
                                    <h5>Our Popular Comparison:</h5>
                                    <p>Top vitamin profile packages</p>
                                    <p>Top packages for senior citizens</p>
                                    <p> Popular low cost packages for diabetes</p>
                                </div>
                            </div> */}
                        </div>
                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>

                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default LabView
