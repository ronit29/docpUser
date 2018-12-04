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
            collapse: [false, false, false]
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
        let collapse = this.state.collapse.map((x) => true)
        this.setState({ collapse })
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <h4>Top full body checkup packages</h4>
                            <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                <div className="static-pk-container">
                                    <div className="static-pkg-top-column">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam 1.3
                                                                (Thyrocare)</p>
                                            <p className="stc-price-cut">₹ 2,199 <span>₹ 3,299</span></p>
                                        </div>
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                30% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <button className="stc-book-btn">Book Now</button>
                                    </div>
                                    <div className="static-pkg-top-column stc-mid-mrgn">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam 1.3
                                                                (Thyrocare)</p>
                                            <p className="stc-price-cut">₹ 2,199 <span>₹ 3,299</span></p>
                                        </div>
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                30% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <button className="stc-book-btn">Book Now</button>
                                    </div>
                                    <div className="static-pkg-top-column">
                                        <div className="stc-pkg-sub">
                                            <p className="stc-sub-para">Aarogyam 1.3
                                                                (Thyrocare)</p>
                                            <p className="stc-price-cut">₹ 2,199 <span>₹ 3,299</span></p>
                                        </div>
                                        <div className="stc-offr-cpn">
                                            <p className="stc-off-para">
                                                30% OFF + ₹ 100
                                                OFF Coupon
                                                                </p>
                                        </div>
                                        <p className="stc-free-pick">Free Home Pickup</p>
                                        <button className="stc-book-btn">Book Now</button>
                                    </div>
                                </div>
                                <div className="stc-acrdn-contaniner">
                                    <h5 className="stc-expnd-btn" onClick={this.expandAll.bind(this)}>Expand All</h5>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading">
                                            <p>Prepration</p>
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
                                        <div className="stc-acrd-heading">
                                            <p>Tests Included </p>
                                        </div>
                                        <div className="stc-acrd-content text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    60
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    75
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
                                                    60
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                        </div>
                                        {
                                            this.state.collapse[0] ? <div className="stc-acrd-content stc-hide-acrd-container pt-0 text-center">
                                                <div className="acrd-stc-data">
                                                    <p>Hemogram. CBC with Differential. Complete Blood Count. The complete blood count (CBC) is a test that evaluates the cells (white blood cells, red blood cells, platelets) that circulate in blood.
                                                                        </p>
                                                    <ul className="stc-data-ul-list">
                                                        <li><p>Total RBC</p></li>
                                                        <li><p>Red Cell Distribution Width (RDW-CV)</p></li>
                                                        <li><p>Red Cell Distribution</p></li>
                                                        <li><p>Width - SD(RDW-SD)</p></li>
                                                        <li><p>Platelet To Large Cell Ratio (PLCR)</p></li>
                                                        <li><p>Platelet Count</p></li>
                                                        <li><p>Mean Corpuscular Hemoglobin (MCH)</p></li>
                                                        <li><p>Mean Corp.Hemo.Conc (MCHC)</p></li>
                                                        <li><p>Mean Corpuscular Volume (MCV)</p></li>
                                                        <li><p>Mean Platelet Volume (MPV)</p></li>
                                                        <li><p>Nucleated Red Blood Cells (NRBC)</p></li>
                                                    </ul>
                                                </div>
                                                <div className="acrd-stc-data mid-border-mrgn">
                                                    <p>Hemogram. CBC with Differential. Complete Blood Count. The complete blood count (CBC) is a test that evaluates the cells (white blood cells, red blood cells, platelets) that circulate in blood.
                                                                        </p>
                                                    <ul className="stc-data-ul-list">
                                                        <li><p>Total RBC</p></li>
                                                        <li><p>Red Cell Distribution Width (RDW-CV)</p></li>
                                                        <li><p>Red Cell Distribution</p></li>
                                                        <li><p>Width - SD(RDW-SD)</p></li>
                                                        <li><p>Platelet To Large Cell Ratio (PLCR)</p></li>
                                                        <li><p>Platelet Count</p></li>
                                                        <li><p>Mean Corpuscular Hemoglobin (MCH)</p></li>
                                                        <li><p>Mean Corp.Hemo.Conc (MCHC)</p></li>
                                                        <li><p>Mean Corpuscular Volume (MCV)</p></li>
                                                        <li><p>Mean Platelet Volume (MPV)</p></li>
                                                        <li><p>Nucleated Red Blood Cells (NRBC)</p></li>
                                                    </ul>
                                                </div>
                                                <div className="acrd-stc-data">
                                                    <p>

                                                    </p>
                                                </div>
                                            </div> : ""
                                        }

                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 1)}>
                                            <p>Vitamin D Total-25 Hydroxy</p>
                                            {
                                                this.state.collapse[1] ? <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                            }
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    60
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stc-accord-container">
                                        <div className="stc-acrd-heading" onClick={this.toggle.bind(this, 2)}>
                                            <p>Vitamin B12, active Holo Transcobalamin</p>
                                            {
                                                this.state.collapse[2] ? <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                            }
                                        </div>
                                        <div className="stc-acrd-content pb-0 text-center">
                                            <div className="acrd-stc-data">
                                                <p>
                                                    60
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data mid-border-mrgn">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                            <div className="acrd-stc-data">
                                                <p>
                                                    75
                                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                <div className="stc-scn-listing">
                                    <h5>Our Popular Comparison:</h5>
                                    <p>Top vitamin profile packages</p>
                                    <p>Top packages for senior citizens</p>
                                    <p> Popular low cost packages for diabetes</p>
                                </div>
                            </div>

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
