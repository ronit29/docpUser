import React from 'react';

import LeftBar from '../../commons/LeftBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import GTM from '../../../helpers/gtm'
import InitialsPicture from '../initialsPicture';
import STORAGE from '../../../helpers/storage';
// import CommentBox from './ArticleCommentBox.js'
import SnackBar from 'node-snackbar'
// import Reply from './Reply.js'
import BannerCarousel from '../Home/bannerCarousel';
import ArticleAuthor from '../articleAuthor/articleAuthor';
import LocationElements from '../../../containers/commons/locationElements'
import CommonSearch from '../../../containers/commons/CommonSearch.js'

class VipClub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {

        return (


            <div className="profile-body-wrap" style={{ background: "#ffffff" }}>
                {/* <ProfileHeader /> */}
                <div className="vipHeaderBar">
                    <div className="vipBackIco">
                        <img src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                    </div>
                    <div className="vip-logo-cont">
                        <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                        <h1>in Just <span className="vip-prc-cut">₹4,999</span> <span className="vip-main-price">₹3,999</span>  </h1>
                        <p>1 year upto 4 members</p>
                    </div>
                </div>
                <section className="container container-top-margin" style={{ marginTop: '' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid ">
                                <div className="care-new-container font-analyze">
                                    <div className="vip-tabs-container">
                                        <p className="vp-sb-txt">VIP 1 <span>(₹2,499)</span></p>
                                        <p className="vp-sb-txt">VIP 2 <span>(₹3,999)</span></p>
                                        <p className="vp-sb-txt vp-act">VIP 3 <span>(₹4,999)</span></p>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-free-doc vip-docbg">
                                            <h4 className="vip-card-heading">Free Doctor Consultations</h4>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />30,000 verified doctors </p>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />All specializations included </p>
                                        </div>
                                        <span className="vip-card-tag">Worth ₹6,500  </span>
                                    </div>
                                    <div className="pakg-slider-container mb-3">
                                        <div className="pkgSliderHeading">
                                            <h5>Key Hospital Partners</h5>
                                            <span>View Docprime Network</span>
                                        </div>
                                        <div className="pkgSliderContainer">
                                            <div className="pkgCardsList d-inline-flex sub-wd-cards top_pkgCat">
                                                <div className="pkgcustCards vip-hsp-card-mn">
                                                    <div className="vip-hsp-img">
                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" />
                                                    </div>
                                                </div>
                                                <div className="pkgcustCards vip-hsp-card-mn">
                                                    <div className="vip-hsp-img">
                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/medanta-the-medicity.jpg" />
                                                    </div>
                                                </div>
                                                <div className="pkgcustCards vip-hsp-card-mn">
                                                    <div className="vip-hsp-img">
                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/artemis-hospital_o9URBGQ.jpg" />
                                                    </div>
                                                </div>
                                                <div className="pkgcustCards vip-hsp-card-mn">
                                                    <div className="vip-hsp-img">
                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/ca207923c622386d761c29fa46396bf7_LhrYNu7.jpg" />
                                                    </div>
                                                </div>
                                                <div className="pkgcustCards vip-hsp-card-mn">
                                                    <div className="vip-hsp-img">
                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/medanta-the-medicity.jpg" />
                                                    </div>
                                                </div>
                                                <div className="pkgcustCards vip-hsp-card-mn">
                                                    <div className="vip-hsp-img">
                                                        <img className="img-fluid" src="https://cdn.docprime.com/media/hospital/documents/artemis-hospital_o9URBGQ.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-free-doc vip-mem-bg">
                                            <h4 className="vip-card-heading">Free Docprime Care Membership  </h4>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Unlimited online consult <span>(General Physician)</span> </p>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Priority Queue - No wait times </p>
                                        </div>
                                        <span className="vip-card-tag">Worth ₹1,999  </span>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-free-doc vip-chek-bg">
                                            <h4 className="vip-card-heading">Free Full Body Health Checkup </h4>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />2 members covered</p>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />60 tests included </p>
                                        </div>
                                        <span className="vip-card-tag">Worth ₹1,500  </span>
                                    </div>
                                    <div className="vip-ins-act-cont mb-3">
                                        <h4 className="ins-dcnt-hdng"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/vip-ins-act.png"} />Instant Activation Upon Purchase</h4>
                                        <div className="ins-dc-lstng">
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Pre-existing diseases covered</p>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />No medical tests required for plan activation </p>
                                        </div>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-free-doc vip-benft-bg">
                                            <h4 className="vip-card-heading">Tax Benefits </h4>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Cover under section 80D</p>
                                            <p className="vip-card-list"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Tax proof certificate will be provided </p>
                                        </div>
                                        <span className="vip-card-tag">Worth ₹1,500  </span>
                                    </div>
                                    <div className="vip-price-summery mb-3">
                                        <div className="vip-prc-summry-hdng">
                                            <p>Price Summary</p>
                                        </div>
                                        <div className="vip-prc-cards-cont">
                                            <div className="vip-prc-cards">
                                                <h5 className="vip-prc-hdng">You Pay</h5>
                                                <ul className="vip-prc-lst">
                                                    <li><p>Plan Price: <span>₹5,999</span></p></li>
                                                    <li><p>Offer Price: <span>₹5,999</span></p></li>
                                                    <li><p>Tax Rebate: <span>₹5,999</span></p></li>
                                                    <li className="effective-prc"><p>Effective Price: <span>₹5,999</span></p></li>
                                                </ul>
                                            </div>
                                            <div className="vip-prc-cards">
                                                <h5 className="vip-prc-hdng">You Get</h5>
                                                <ul className="vip-prc-lst">
                                                    <li><p>Doctor Consult: <span>₹5,999</span></p></li>
                                                    <li><p>Offer Price: <span>₹5,999</span></p></li>
                                                    <li><p>Health Checkup: <span>₹5,999</span></p></li>
                                                    <li className="ttl-benft"><p>Effective Price: <span>₹5,999</span></p></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="vip-no-cost"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/vip-ins-act.png"} /> No Cost EMI starts at <span>₹417</span></p>
                                    </div>
                                    <div className="vip-note-lst">
                                        <p>A few things to note... </p>
                                        <ul>
                                            <li>All procedures (dental, daycare etc..) and sessions (therapy, counselling etc.. ) fee is not included</li>
                                            <li>Our doctor and hospital network is dynamic in nature and may change from time to time</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <button className="vip-foot-btn"><p>Become a Docprime VIP @ ₹4,999</p>
                    <p className="vipbtn-sub-txt">Effective Price ₹3,499</p>
                </button>
            </div>
        );
    }
}

export default VipClub