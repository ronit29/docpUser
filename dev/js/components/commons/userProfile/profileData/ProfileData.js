import React from 'react';
import TermsConditions from '../../couponSelectionView/termsConditions.js'
import GTM from '../../../../helpers/gtm'


class ProfileData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openTermsConditions: false
        }
    }

    componentDidMount() {

    }

    gotTo(where) {
        this.props.history.push(`/user/${where}`)
    }

    toggleTandC() {
        this.setState({ openTermsConditions: !this.state.openTermsConditions });
    }

    searchLab(coupon) {
        this.props.setCorporateCoupon(coupon)
        this.props.clearExtraTests()

        let test_ids = []
        let network_id = ""
        if (coupon && coupon.tests) {
            test_ids = coupon.tests
        }
        if (coupon && coupon.network_id) {
            network_id = coupon.network_id
        }
        window.location.href = `/lab/searchresults?test_ids=${test_ids.join(',')}&network_id=${network_id}`
    }

    isDocCare(){
        if(this.props.isUserCared && this.props.isUserCared.has_active_plan){
            this.props.history.push('/prime/success?user_plan='+this.props.isUserCared.user_plan_id) 
        }else{
            this.props.history.push('/prime/plans') 
        }
    }

    gotToInsurance(isUserLoginInsured){
        if(isUserLoginInsured){
            this.props.history.push('/insurance/certificate')   
        }else{
            this.props.generateInsuranceLead()
            this.props.history.push('/insurance/insurance-plans')
        }
    }    

    render() {

        let currentRoomId = this.props.USER.currentRoomId
        let coupon = null
        let memberClass = 'float-right memNew'
        let memStatus = 'New'
        if (this.props.applicableCoupons && this.props.applicableCoupons.length) {
            coupon = this.props.applicableCoupons[0]
        }

        let isUserLoginInsured = this.props.USER.profiles && this.props.USER.defaultProfile && this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)]?this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].is_insured && this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].is_default_user:false
        
        if(this.props.isUserCared && this.props.isUserCared.has_active_plan){
            memberClass = 'float-right memAct'
            memStatus = 'Active'
        }

        return (
            <div className="widget no-round no-shadow skin-transparent profile-nav new-profile-header-margin">
                <div className="widget-content padding-remove">
                    <ul className="list nav-items dp-user-list bg-lst">
                        <li className="my-profile-item padding-remove">
                            <p className="usr-dtls-name pdng-usr-dtls-slots">{`Welcome to docprime${this.props.USER.userName ? `, ${this.props.USER.userName}! ` : ''} `}</p>
                            {/* <p className="usr-dtls-benf pdng-usr-dtls-slots">docprime benefits</p> */}
                            <div className="usr-dtls-startup">
                                <p className="usr-dtls-strt-txt pdng-usr-dtls-slots"><img src={ASSETS_BASE_URL + "/img/customer-icons/pinkarw.svg"} className="img-fluid" /> GETTING STARTED</p>
                                <div className="row no-gutters pdng-bttm">
                                    <div className="col-4 mbl-usr-grd">
                                        <span className="usr-dtls-free">FREE</span>
                                        <a className="usr-dtls-anchor" href="javascript:void(0);" onClick={(e) => {
                                            let data = {
                                                'Category': 'ConsumerApp', 'Action': 'ChatNowProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'chat-now-profile-clicked'
                                            }
                                            GTM.sendEvent({ data: data })
                                            this.props.history.push(`/`)
                                        }}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/su-chat.svg"} className="img-fluid usr-frst-ico" />
                                            <p>
                                                <span>Chat Now </span>
                                                with qualified doctors
                                            </p>
                                        </a>
                                    </div>
                                    <div className="col-4 mbl-usr-grd" onClick={(e) => {

                                        let data = {
                                            'Category': 'ConsumerApp', 'Action': 'FindDoctorsProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'find-doctors-profile-clicked'
                                        }
                                        GTM.sendEvent({ data: data })
                                        this.props.history.push(`/search?from=profile_banner_click`)
                                    }}>
                                        <a className="usr-dtls-anchor lft-rgt-brdr" href="javascript:void(0);">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/book-doctor.svg"} className="img-fluid" />
                                            <p>
                                                <span>Find Doctors </span>
                                                Upto 50% OFF
                                            </p>
                                        </a>
                                    </div>
                                    <div className="col-4 mbl-usr-grd" onClick={(e) => {
                                        let data = {
                                            'Category': 'ConsumerApp', 'Action': 'BookTestsProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'book-tests-profile-clicked'
                                        }
                                        GTM.sendEvent({ data: data })
                                        this.props.history.push(`/search?from=profile_banner_click`)
                                    }}>
                                        <a className="usr-dtls-anchor" href="javascript:void(0);">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/bk-tst.svg"} className="img-fluid" />
                                            <p>
                                                <span>Book Tests </span>
                                                Upto 50% OFF
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {
                            coupon ? <li className="my-profile-item" style={{ cursor: 'auto' }}>
                                <div className="usr-dtls-off-act">
                                    <p className="usr-dtls-strt-txt"><img src={ASSETS_BASE_URL + "/img/customer-icons/stmp.svg"} className="img-fluid" />OFFERS
                                    </p>
                                    {
                                        coupon.is_corporate ?
                                            <span onClick={this.searchLab.bind(this, coupon)} className="usr-dtls-plan-act">Avail Now <img style={{ height: '10px' }} src={ASSETS_BASE_URL + "/img/customer-icons/rgt-arw.svg"} className="img-fluid" /></span>
                                            : ""
                                    }
                                </div>
                                <div className="ofr-img-txt">
                                    <div className="box-img-cont"><img src={ASSETS_BASE_URL + "/img/customer-icons/vector-smart-object.png"} className="img-fluid" /></div>
                                    <div className="ofr-contnt">
                                        <p className="ofr-bkg"><b className="fw-500 drk-blk">{coupon.heading}</b> {coupon.desc}</p>
                                        <div>
                                            <p className="mrt-10" style={{ color: '#757575' }}>Use Coupon : <b className="fw-700" style={{ color: '#000000' }}>{coupon.code}</b></p>
                                            <div className="mrt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <p onClick={() => this.toggleTandC()} className="text-xs fw-500" style={{ color: '#f78631', cursor: 'pointer' }}>Terms & Conditions</p>
                                            </div>
                                        </div>
                                        <p className="view-more-coupons" onClick={() => {
                                            this.props.history.push('/user/coupons')
                                        }}>View more offers</p>
                                    </div>
                                </div>
                            </li> : ""
                        }

                        <li className="my-profile-item" style={{ cursor: 'auto' }} onClick={() => {
                            this.props.history.push('/referral')
                        }}>
                            <div className="usr-dtls-off-act">
                                <p className="usr-dtls-strt-txt">
                                    <img src="/assets/img/customer-icons/refer.svg" className="img-fluid" />REFER &amp; EARN</p>
                            </div>
                            <div className="ofr-img-txt">
                                <div className="box-img-cont"><img src="/assets/img/step-2.png" className="img-fluid" /></div>
                                <div className="ofr-contnt">
                                    <p className="ofr-bkg">
                                        Invite your friends on docprime.com and earn <b className="fw-500 drk-blk"><img style={{ width: '8px', marginTop: '4px', marginRight: '0px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} /> 50</b> on completion of their first order</p>
                                    <div>
                                        <div className="mrt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <p className="text-xs fw-500" style={{ color: 'rgb(247, 134, 49)', cursor: 'pointer' }}>Know more</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* <li>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/consultant.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">OPD Insurance</h4>
                                </div>
                            </a>
                        </li> */}
                        {/* <li className="my-profile-item" onClick={() => {
                            this.props.history.push('/chathistory')
                        }}>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/message.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Online Consultation</h4>
                                </div>
                            </a>
                        </li> */}
                        
                        <li onClick={this.gotToInsurance.bind(this, isUserLoginInsured)} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/ins.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">OPD Insurance
                                        {/* <span className="float-right badge badge-warning">1</span> */}
                                    </h4>
                                </div>
                            </a>
                            {
                                isUserLoginInsured?<button className="ins-userdetails-active">Active</button>:<button className="ins-userdetails-buy">Buy Now</button>
                            }
                        </li>

                        <li onClick={this.isDocCare.bind(this)} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/primecae.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content" style={{width:'100%'}}>
                                    <h4 className="title app-title">Docprime Care 
                                        <span className={memberClass}>{memStatus}</span>
                                    </h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={this.gotTo.bind(this, 'onlinePrescriptions')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/onlnpres.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Online Prescriptions
                                        {/* <span className="float-right badge badge-warning">1</span> */}
                                    </h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={this.gotTo.bind(this, 'appointments')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/apoitm.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Appointments
                                        {/* <span className="float-right badge badge-warning">1</span> */}
                                    </h4>
                                </div>
                            </a>
                        </li>
                        {/* <li className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/medical-history.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Medical History
                                        <span className="float-right badge badge-warning">2</span>
                                    </h4>
                                </div>
                            </a>
                        </li> */}
                        {/* <li>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/opd-visit.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Test Report <span className="float-right badge badge-warning">5</span></h4>
                                </div>
                            </a>
                        </li> */}
                        <li onClick={this.gotTo.bind(this, 'family')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/fmly.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Family</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => this.props.history.push(`/myratings`)} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/review.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Reviews</h4>
                                </div>
                            </a>
                        </li>
                        {/* <li>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/opd-visit.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Life Style</h4>
                                </div>
                            </a>
                        </li> */}
                        <li onClick={() => {
                            this.props.history.push('/wallet')
                        }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/rp-ico.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Wallet</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/user/address')
                        }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/addmang.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Manage Address</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/notifications')
                        }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/bl-bell.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Notifications</h4>
                                </div>
                            </a>
                            {
                                this.props.USER.unread_count ?
                                    <div className="notification-count">
                                        <span className="fw-500 text-xs">{this.props.USER.unread_count}</span>
                                    </div> : ''
                            }
                        </li>
                        <li onClick={() => {
                            this.props.logout(currentRoomId)
                        }} className="my-profile-item lst-spcng ">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/log-out.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Logout</h4>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                {
                    this.state.openTermsConditions ? <TermsConditions toggle={() => this.toggleTandC()} tnc={coupon.tnc} /> : ""
                }
                {/* <div className="logout-div d-md-none" onClick={() => { this.props.logout(currentRoomId) }}>
                    <p className="fw-500">Logout</p>
                </div> */}
            </div>
        );
    }
}


export default ProfileData
