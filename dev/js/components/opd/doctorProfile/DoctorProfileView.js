import React from 'react';

import Loader from '../../commons/Loader'
import ReviewList from '../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../commons/ratingsProfileView/RatingGraph.js'
import RatingProfileCard from '../../commons/ratingsProfileView/RatingProfileCard.js'
import ComplimentListView from '../../commons/ratingsProfileView/ComplimentListView.js'
import DoctorProfileCard from '../commons/doctorProfileCard'
import AboutDoctor from '../doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'
import Footer from '../../commons/Home/footer'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            footerData,
            seoFriendly: this.props.match.url.includes('-dpp')
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        let schema = {}
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
            schema = seoData.schema
        }
        return { title, description, schema }
    }

    render() {

        let doctor_id = this.props.selectedDoctor
        if (this.props.initialServerData && this.props.initialServerData.doctor_id) {
            doctor_id = this.props.initialServerData.doctor_id
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {/* <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="header-title fw-700 capitalize text-white">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li>
                                                        <span className="ct-img ct-img-sm arrow-img">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='col-8'>
                                            <div className="header-title fw-700 capitalize text-white text-center">Doctor Details</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }} onClick={() => {
                                            this.props.history.push('/')
                                        }}>
                                            <div className="mobile-home-icon-div" >
                                                <img src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            {
                                this.props.DOCTORS[doctor_id] ?

                                    <section className="dr-profile-screen">

                                        <HelmetTags tagsData={{
                                            title: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).title,
                                            description: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).description,
                                            canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
                                            schema: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).schema
                                        }} noIndex={!this.state.seoFriendly} />

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    {
                                                        this.props.DOCTORS[doctor_id].unrated_appointment
                                                            ? <RatingProfileCard {...this.props} details={this.props.DOCTORS[doctor_id].unrated_appointment} /> : ""
                                                    }
                                                    <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                                        {
                                                            this.props.DOCTORS[doctor_id].is_gold ?
                                                                <img className="gold-card-img" src={ASSETS_BASE_URL + "/img/gold.svg"} />
                                                                : ''
                                                        }
                                                        <DoctorProfileCard
                                                            details={this.props.DOCTORS[doctor_id]}
                                                            getDoctorNumber={this.props.getDoctorNumber}
                                                        />
                                                        <div className="widge-content pd-0">
                                                            {
                                                                this.props.DOCTORS[doctor_id].about ? <AboutDoctor
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                /> : ""
                                                            }

                                                            {
                                                                (this.props.DOCTORS[doctor_id].hospitals && this.props.DOCTORS[doctor_id].hospitals.length) ? <ClinicSelector
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                    {...this.props} doctorId={doctor_id}
                                                                /> : ""
                                                            }

                                                            <ProfessionalGraph
                                                                details={this.props.DOCTORS[doctor_id]}
                                                            />
                                                            {this.props.DOCTORS[doctor_id].display_rating_widget ?
                                                                <div className="widget-panel">
                                                                    <h4 className="panel-title mb-rmv">Patient Feedback</h4>
                                                                    <div className="panel-content pd-0 border-bottom-panel">
                                                                        <RatingGraph details={this.props.DOCTORS[doctor_id]} />
                                                                        <div className="user-satisfaction-section">
                                                                            <div className="row no-gutters">
                                                                                {(typeof (this.props.DOCTORS[doctor_id].rating_graph) != "undefined" && this.props.DOCTORS[doctor_id].rating_graph != null && this.props.DOCTORS[doctor_id].rating_graph) ?
                                                                                    this.props.DOCTORS[doctor_id].rating_graph.top_compliments.map(compliment =>
                                                                                        <ComplimentListView key={compliment.id} details={compliment} />
                                                                                    ) : <div></div>}

                                                                            </div>
                                                                        </div>
                                                                        <ReviewList details={this.props.DOCTORS[doctor_id]} />
                                                                    </div>
                                                                </div> :
                                                                ""}

                                                                {/* dummy book now */}
                                                            <div className="widget-panel">
                                                                <h4 className="panel-title mb-rmv">Select Clinic</h4>
                                                                <div className="panel-content pnl-bottom-border">
                                                                    <div className="dtl-radio">
                                                                        <label className="container-radio">Veritaas Multispeciality  Clinic Diagnostic Centre
                                                                            <input type="radio" checked name="radio" />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="dtl-cnslt-fee pb-list">
                                                                        <div class="clearfix"><span class="test-price txt-ornage">₹ 300<span class="test-mrp">₹ 600</span></span><span class="fw-500 test-name-item">Consultation Fee</span></div>
                                                                    </div>
                                                                    <div className="row row-marginTop">
                                                                        <div className="col-10">
                                                                             <div className="add-content">
                                                                                <span className="add-span">Address:</span>
                                                                                <p>Huda city center, Gurgaon</p>
                                                                             </div>
                                                                             <div className="add-content">
                                                                                <span className="add-span">Timings:</span>
                                                                                <p>Mon to Wed - 10:20 AM to 1:00 PM
                                                                                    <span className="ad-sub-content">Thu - 2:00 PM to 6:00 PM</span>
                                                                                </p>
                                                                             </div>
                                                                        </div>
                                                                        <div>
                                                                        <img style={{width: "30px"}} src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="panel-content pnl-bottom-border">
                                                                    <div className="dtl-radio">
                                                                        <label className="container-radio">Veritaas Multispeciality  Clinic Diagnostic Centre
                                                                            <input type="radio" checked name="radio" />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="dtl-cnslt-fee pb-list">
                                                                        <div class="clearfix"><span class="test-price txt-ornage">₹ 300<span class="test-mrp">₹ 600</span></span><span class="fw-500 test-name-item">Consultation Fee</span></div>
                                                                    </div>
                                                                    <div className="row row-marginTop">
                                                                        <div className="col-10">
                                                                             <div className="add-content">
                                                                                <span className="add-span">Address:</span>
                                                                                <p>Huda city center, Gurgaon</p>
                                                                             </div>
                                                                             <div className="add-content">
                                                                                <span className="add-span">Timings:</span>
                                                                                <p>Mon to Wed - 10:20 AM to 1:00 PM
                                                                                    <span className="ad-sub-content">Thu - 2:00 PM to 6:00 PM</span>
                                                                                </p>
                                                                             </div>
                                                                        </div>
                                                                        <div>
                                                                        <img style={{width: "30px"}} src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section> : <Loader />
                            }
                        </div>

                        <RightBar />
                    </div>
                </section>

                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default DoctorProfileView
