import React from 'react';

import Loader from '../../commons/Loader'

import DoctorProfileCard from '../commons/doctorProfileCard'
import AboutDoctor from '../doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {

        let doctor_id = this.props.initialServerData || this.props.selectedDoctor
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
                                            canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
                                        }} />

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="widget mrt-10 ct-profile skin-white">
                                                        <DoctorProfileCard
                                                            details={this.props.DOCTORS[doctor_id]}
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
                                                            <div className="widget-panel">
                                                                <h4 className="panel-title mb-rmv">Patient Feedback</h4>
                                                                <div className="panel-content pd-0">
                                                                    <div className="feed-back-container">
                                                                        <div className="row flx-center">
                                                                            <div className="col-4">
                                                                                <div className="feedback-rating-text">
                                                                                    <p className="feedback-rate">4.5</p>
                                                                                    <p className="feedback-rate-status">
                                                                                        2033 ratings and
                                                                                        <span>245 reviews</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-8">
                                                                                <div className="feed-status-container">
                                                                                    <span className="feed-progress-point">5<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                                                                                    <div className="rating-progress">
                                                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '70%' }}>
                                                                                            <span className="sr-only">70% Complete</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span className="feed-progress-count">800</span>
                                                                                </div>
                                                                                <div className="feed-status-container">
                                                                                    <span className="feed-progress-point">4<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                                                                                    <div className="rating-progress">
                                                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}>
                                                                                            <span className="sr-only">70% Complete</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span className="feed-progress-count">800</span>
                                                                                </div>
                                                                                <div className="feed-status-container">
                                                                                    <span className="feed-progress-point">3<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                                                                                    <div className="rating-progress">
                                                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}>
                                                                                            <span className="sr-only">70% Complete</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span className="feed-progress-count">800</span>
                                                                                </div>
                                                                                <div className="feed-status-container">
                                                                                    <span className="feed-progress-point">2<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                                                                                    <div className="rating-progress">
                                                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}>
                                                                                            <span className="sr-only">70% Complete</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span className="feed-progress-count">20</span>
                                                                                </div>
                                                                                <div className="feed-status-container">
                                                                                    <span className="feed-progress-point">1<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                                                                                    <div className="rating-progress">
                                                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}>
                                                                                            <span className="sr-only">70% Complete</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span className="feed-progress-count">80</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-satisfaction-section">
                                                                        <div className="row">
                                                                            <div className="col-4">
                                                                                <div className="user-satisfaction-images">
                                                                                    <img className="img-fluid" src="/assets/img/customer-icons/frndly.png" />
                                                                                    <p>Friendly</p>
                                                                                    <span>29</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <div className="user-satisfaction-images">
                                                                                    <img className="img-fluid" src="/assets/img/customer-icons/tret-satis.png" />
                                                                                    <p>Treatment Satisfaction</p>
                                                                                    <span>17</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <div className="user-satisfaction-images">
                                                                                    <img className="img-fluid" src="/assets/img/customer-icons/value-money.png" />
                                                                                    <p>Value of Money</p>
                                                                                    <span>35</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* list comment loop */}
                                                                    <div className="usr-feed-comment">
                                                                        <div className="comment-status-content">
                                                                            <span>4.5 <img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /></span>
                                                                            <p className="feed-sts-heading">Friendly, Value of Money, Treatment Satisfaction</p>
                                                                        </div>
                                                                        <p className="usr-comments-pera">
                                                                            Doctor listened about our queries patiently and advised best solutions
                                                                        </p>
                                                                        <p className="comment-para-status">By Rishabh Mehrotra | 20 Sept 2018</p>
                                                                    </div>
                                                                    <div className="usr-feed-comment">
                                                                        <div className="comment-status-content">
                                                                            <span>4.5 <img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /></span>
                                                                            <p className="feed-sts-heading">Friendly, Value of Money, Treatment Satisfaction</p>
                                                                        </div>
                                                                        <p className="usr-comments-pera">
                                                                            Doctor listened about our queries patiently and advised best solutions
                                                                        </p>
                                                                        <p className="comment-para-status">By Rishabh Mehrotra | 20 Sept 2018</p>
                                                                    </div>
                                                                    <div className="usr-feed-comment">
                                                                        <div className="comment-status-content">
                                                                            <span>4.5 <img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /></span>
                                                                            <p className="feed-sts-heading">Friendly, Value of Money, Treatment Satisfaction</p>
                                                                        </div>
                                                                        <p className="usr-comments-pera">
                                                                            Doctor listened about our queries patiently and advised best solutions
                                                                        </p>
                                                                        <p className="comment-para-status">By Rishabh Mehrotra | 20 Sept 2018</p>
                                                                    </div>
                                                                    <div className="usr-feed-comment">
                                                                        <div className="comment-status-content">
                                                                            <span>4.5 <img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /></span>
                                                                            <p className="feed-sts-heading">Friendly, Value of Money, Treatment Satisfaction</p>
                                                                        </div>
                                                                        <p className="usr-comments-pera">
                                                                            Doctor listened about our queries patiently and advised best solutions
                                                                        </p>
                                                                        <p className="comment-para-status">By Rishabh Mehrotra | 20 Sept 2018</p>
                                                                    </div>
                                                                    <div className="usr-feed-comment">
                                                                        <div className="comment-status-content">
                                                                            <span>4.5 <img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /></span>
                                                                            <p className="feed-sts-heading">Friendly, Value of Money, Treatment Satisfaction</p>
                                                                        </div>
                                                                        <p className="usr-comments-pera">
                                                                            Doctor listened about our queries patiently and advised best solutions
                                                                        </p>
                                                                        <p className="comment-para-status">By Rishabh Mehrotra | 20 Sept 2018</p>
                                                                    </div>
                                                                    {/* list comment loop */}
                                                                </div>
                                                            </div>
                                                            {/* rating popup */}
                                                            <div className="raiting-popup">
                                                                <div className="home-rating-card" style={{ display: 'none' }}>
                                                                    <div className="rate-card-header">
                                                                        Rate your Experience
                                                                    <span><img src="/assets/img/customer-icons/rt-close.svg" className="img-fluid" /></span>
                                                                    </div>
                                                                    <div className="rate-card-doc-dtls">
                                                                        <img src="/assets/img/customer-icons/user.png" className="img-fluid img-round " />
                                                                        <div className="rate-doc-dtl">
                                                                            <p className="rt-doc-nm">
                                                                                Dr. Pallavi Kumar
                                                                            </p>
                                                                            <span>MBBS | General Physician</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rate-star-icon">
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                    </div>
                                                                </div>

                                                                {/* Complete rate container */}
                                                                <div className="home-rating-card">
                                                                    <div className="rate-card-header">
                                                                        Share your Feedback
                                                                    <span><img src="/assets/img/customer-icons/rt-close.svg" className="img-fluid" /></span>
                                                                    </div>
                                                                    <div className="rate-card-doc-dtls">
                                                                        <img src="/assets/img/customer-icons/user.png" className="img-fluid img-round " />
                                                                        <div className="rate-doc-dtl">
                                                                            <p className="rt-doc-nm">
                                                                                Dr. Pallavi Kumar
                                                                            </p>
                                                                            <span>MBBS | General Physician</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rate-star-icon">
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                        <img className="img-fluid" src="/assets/img/customer-icons/unselected-star.svg" />
                                                                    </div>
                                                                    <div className="rate-compliment-section">
                                                                        <p className="cmplmnt-para">Give your compliment</p>
                                                                        <ul className="compliment-lising">
                                                                            <li>
                                                                                <label className="ck-bx">
                                                                                    <span className="rate-feed-text">Friendly</span>
                                                                                    <input type="checkbox" />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <label className="ck-bx">
                                                                                    <span className="rate-feed-text">Treatment Satisfaction</span>
                                                                                    <input type="checkbox" />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <label className="ck-bx">
                                                                                    <span className="rate-feed-text">Value of Money</span>
                                                                                    <input type="checkbox" />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <label className="ck-bx">
                                                                                    <span className="rate-feed-text">Health issue explaination</span>
                                                                                    <input type="checkbox" />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <label className="ck-bx">
                                                                                    <span className="rate-feed-text">Lesser wait time</span>
                                                                                    <input type="checkbox" />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="rate-submit-cmnnt-box">
                                                                            <textarea placeholder="Leave a review" rows="1">
                                                                               
                                                                            </textarea>

                                                                            <button className="rate-submit-btn">Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Complete rate container */}
                                                            </div>
                                                            {/* rating popup */}
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
            </div>
        );
    }
}

export default DoctorProfileView
