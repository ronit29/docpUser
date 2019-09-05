import React from 'react';


import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
// import LocationElements from '../../../containers/commons/locationElements'
// import CommonSearch from '../../../containers/commons/CommonSearch.js'


class VipClub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    AddMemberDetails(){
        this.props.history.push('/vip-club-member-details?is_from_payment=true')
    }

    render() {

        return (


            <div className="profile-body-wrap" style={{ background: "" }}>
                {/* <ProfileHeader /> */}
                <div className="vipHeaderBar">
                    <div className="vipBackIco">
                        <img src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                    </div>
                    <div className="vip-logo-cont">
                        <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/vip-logo.png"} />
                        <h1>in Just <span className="vip-prc-cut">₹4,999</span> <span className="vip-main-price">₹3,999</span>  </h1>
                        <p>1 year upto 4 members</p>
                    </div>
                </div>
                {/* last screen design */}
                <section className="container container-top-margin sub-pdng-add" style={{ marginTop: '' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid ">
                                <div className="care-new-container font-analyze">
                                    <div className="vip-act-pop mb-3">
                                        <div className="vip-wrn-img">
                                            <img src={ASSETS_BASE_URL + "/img/vip-warning.svg"} />
                                            <div className="vip-wrn-content">
                                                <h5>Activate your subscription now</h5>
                                                <p>
                                                    Add remaining 3 members details to activate
                                                    your subscription</p>
                                            </div>
                                        </div>
                                        <button onClick={this.AddMemberDetails.bind(this)}>Click here</button>
                                    </div>
                                    <div className="vip-dsh-main-cont mb-3">
                                        <div className="vip-acnt-heading">
                                            <h5>Your Account</h5>
                                            <span>View Appointments</span>
                                        </div>
                                        <div className="doc-onln-cnslt">
                                            <div className="vip-cnslt-card">
                                                <h5 className="vip-brder-hdng">Doctor Consultation</h5>
                                                <ul>
                                                    <li><p>Total Limit: <span>₹6,500  </span></p></li>
                                                    <li><p>Utilized: <span>₹6,500  </span></p></li>
                                                    <li><p>Available: <span className="vip-crd-avl-grn">₹6,500  </span></p></li>
                                                </ul>
                                            </div>
                                            <div className="vip-cnslt-card">
                                                <h5 className="vip-brder-hdng">Doctor Consultation</h5>
                                                <p className="vip-un-mem">Unlimited for 8 members</p>
                                                <p className="vip-cnsl-act"><img src={ASSETS_BASE_URL + '/img/vip-chk.svg'} />Activated </p>
                                                <div className="text-right">
                                                    <button className="vip-crd-btn">Chat Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-sbs-crd">
                                            <h5 className="vip-brder-hdng">Doctor Consultation</h5>
                                            <div className="vip-sbs-crd-content">
                                                <div className="vip-sbs-crd-lft">
                                                    <p>Includes 60 Tests, can be used by 2 members</p>
                                                </div>
                                                <div className="vip-sbs-crd-rgt">
                                                    <p className="rmng-pnt">2 <span>remaining </span></p>
                                                    <button className="vip-btn-sbs">Book Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-sbs-crd">
                                            <h5 className="vip-brder-hdng">Tax Benefit</h5>
                                            <div className="vip-sbs-crd-content">
                                                <div className="vip-sbs-crd-lft">
                                                    <p>Under Section 80D</p>
                                                </div>
                                                <div className="vip-sbs-crd-rgt">
                                                    <button className="vip-btn-sbs">Download Invoice</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vip-offer-cards mb-3">
                                        <div className="vip-sbs-crd">
                                            <h5 className="vip-brder-hdng">Tax Benefit</h5>
                                            <div className="vip-accord-container">
                                                <ul className="vip-acr-lst">
                                                    <li>
                                                        <h4 className="vip-acrd-hdng"><span>Rishabh Mehrotra <br /><b>(Primary)</b></span><img className="acdn-arrow acdn-arrow-up" src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} /></h4>
                                                        <div className="vip-sn-tbl">
                                                            <table className="vip-acrd-content">
                                                                <tr>
                                                                    <th>Relationship</th>
                                                                    <th>Gender</th>
                                                                    <th>DOB</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Friend</td>
                                                                    <td>Male</td>
                                                                    <td>25/07/1994</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <h4 className="vip-acrd-hdng">Rishabh Mehrotra<img className="acdn-arrow acdn-arrow-up" src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} /></h4>
                                                    </li>
                                                    <li>
                                                        <h4 className="vip-acrd-hdng">Rishabh Mehrotra<img className="acdn-arrow acdn-arrow-up" src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} /></h4>
                                                    </li>
                                                    <li onClick={this.AddMemberDetails.bind(this)}>
                                                        <h4 className="vip-acrd-add-member"><img className="vip-add-img" src={ASSETS_BASE_URL + '/img/vip-mem.svg'} />Add Members</h4>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="vip-contact mb-3">
                                        <div className="vip-sbs-crd">
                                            <h5 className="vip-brder-hdng">Contact Support</h5>
                                            <div className="vip-coct-content">
                                                <p>Need help with booking? <span>Call us at 1800-123-9419</span></p>
                                                <p>Have a query? <span>Email us at customercare@docprime.com</span></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default VipClub