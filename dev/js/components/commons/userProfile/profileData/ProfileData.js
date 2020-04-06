import React from 'react';
import TermsConditions from '../../couponSelectionView/termsConditions.js'
import GTM from '../../../../helpers/gtm'
import CONFIG from '../../../../config'


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

    isDocCare() { // redirect to care page or to care dashboard
        if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
            this.props.history.push('/prime/success?user_plan=' + this.props.isUserCared.user_plan_id)
        } else {
            this.props.history.push('/prime/plans')
        }
    }

    goToInsurance(isUserLoginInsured) { // redirect to insurance plan page or to insured dashboard
        if (isUserLoginInsured) {
            if (this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 1 ||
                this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 4 || this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 5) {
                this.props.history.push('/insurance/certificate')
            } else {
                this.props.history.push('/insurance/insurance-plans?source=profile-insurance-clicked')
            }
        } else {
            this.props.generateInsuranceLead()
            this.props.history.push('/insurance/insurance-plans?source=profile-insurance-clicked')
        }
    }

    getInsuranceBtnText() {
        // set button text as person user policy status active/inactive/ cancelled
        let isUserLoginInsured = this.props.USER.profiles && this.props.USER.defaultProfile && this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].is_default_user ? this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].is_default_user : false
        if (isUserLoginInsured) {
            if (this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 1 ||
                this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 4 ||
                this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 5) {
                return <button className="ins-userdetails-active">Active</button>
            } else {
                return <button className="ins-userdetails-buy">Buy Now</button>
            }
        }
    }

    render() {
        let currentRoomId = this.props.USER.currentRoomId
        let coupon = null
        let memberClass = 'float-right ins-userdetails-buy'
        let memStatus = 'New'
        if (this.props.applicableCoupons && this.props.applicableCoupons.length) {
            coupon = this.props.applicableCoupons[0]
        }

        let isUserLoginInsured = this.props.USER.profiles && this.props.USER.defaultProfile && this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].is_default_user ? this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].is_default_user : false

        if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
            memberClass = 'float-right ins-userdetails-active'
            memStatus = 'Active'
        }

        let is_care = false
        let care_user_profile ={}

        let defaultProfile = this.props.USER.profiles && this.props.USER.defaultProfile && this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)]?this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)]:null;

        if(this.props.USER.profiles && Object.keys(this.props.USER.profiles).length){
             Object.entries(this.props.USER.profiles).map(function([key, value]) { 
                  if(value.is_care){
                      care_user_profile = value
                  } 
              })
             if(care_user_profile && Object.keys(care_user_profile).length){
                is_care = true
             }
        }

        return (
            <div className="widget no-round no-shadow skin-transparent profile-nav new-profile-header-margin">
                <div className="widget-content padding-remove">
                    <ul className="list nav-items dp-user-list bg-lst">
                        <li className="my-profile-item padding-remove">
                            <p className="usr-dtls-name pdng-usr-dtls-slots">{`Welcome to Docprime${this.props.USER.userName ? `, ${this.props.USER.userName}! ` : ''} `}</p>
                            {
                                defaultProfile && defaultProfile.is_vip_gold_member && defaultProfile.vip_data?
                                <div className="gold-white-bg-container card-container m-0" onClick={()=>this.props.history.push('/vip-club-activated-details')}>
                                    <div className="gold-card-section">
                                        <img className="vipLogiImg-2 pd-12" style={{ paddingBottom: 7 }} src="/assets/img/docgold.png" width="80px" />
                                        <div className="gold-card-user text-right text-white pd-12" style={{ paddingTop: 0 }}>
                                            <h5>{defaultProfile.name}</h5>
                                            <h6>(Primary)</h6>
                                        </div>
                                        <div className="membership-validity-column pd-12 text-black text-center">
                                            <h4>Docprime Gold Member</h4>
                                            <h6>Valid till <strong>{defaultProfile.vip_data.expiry_date||''} </strong></h6>
                                        </div>
                                    </div>
                                </div>
                                :<div className="usr-dtls-startup">
                                        {/*<p className="usr-dtls-strt-txt pdng-usr-dtls-slots fw-500"><img src={ASSETS_BASE_URL + "/img/viplog.png"} className="img-fluid" />Become a Docprime VIP member and get below benefits</p>*/}
                                        {/*<div className="row no-gutters pdng-bttm">
                                            <div className="col-4 mbl-usr-grd">
                                                <span className="usr-dtls-free">FREE</span>
                                                <a className="usr-dtls-anchor" href="javascript:void(0);" onClick={(e) => {
                                                    let data = {
                                                        'Category': 'ConsumerApp', 'Action': 'ChatNowProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'chat-now-profile-clicked'
                                                    }
                                                    GTM.sendEvent({ data: data })
                                                    this.props.clearVipSelectedPlan()
                                                    this.props.history.push(`/vip-club-details`)
                                                }}>
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/su-chat.svg"} className="img-fluid usr-frst-ico" />
                                                    <p>
                                                        <span>Unlimited chats</span>
                                                        with qualified doctors
                                                    </p>
                                                </a>
                                            </div>
                                            <div className="col-4 mbl-usr-grd" onClick={(e) => {

                                                let data = {
                                                    'Category': 'ConsumerApp', 'Action': 'FindDoctorsProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'find-doctors-profile-clicked'
                                                }
                                                GTM.sendEvent({ data: data })
                                                this.props.clearVipSelectedPlan()
                                                this.props.history.push(`/vip-club-details`)
                                            }}>
                                                <a className="usr-dtls-anchor lft-rgt-brdr" href="javascript:void(0);">
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/book-doctor.svg"} className="img-fluid" />
                                                    <p>
                                                        <span>Book Doctors </span>
                                                        Save 70%
                                                    </p>
                                                </a>
                                            </div>
                                            <div className="col-4 mbl-usr-grd" onClick={(e) => {
                                                let data = {
                                                    'Category': 'ConsumerApp', 'Action': 'BookTestsProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'book-tests-profile-clicked'
                                                }
                                                GTM.sendEvent({ data: data })
                                                this.props.clearVipSelectedPlan()
                                                this.props.history.push(`/vip-club-details`)
                                            }}>
                                                <a className="usr-dtls-anchor" href="javascript:void(0);">
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/bk-tst.svg"} className="img-fluid" />
                                                    <p>
                                                        <span>Book Tests </span>
                                                        25% OFF
                                                    </p>
                                                </a>
                                            </div>
                                        </div>*/}
                                        {
                                            <React.Fragment>
                                                {
                                                    defaultProfile && (defaultProfile.insurance_status==1 || defaultProfile.insurance_status==4 || defaultProfile.insurance_status==5 || defaultProfile.is_vip_member)?''
                                                    :<div className="usr-dtls-strt-txt pdng-usr-dtls-slots "><p className="fw-500">
                                                        Become a Docprime <img style={{ width: '40px' }} src={ASSETS_BASE_URL + "/img/gold-sm.png"} className="img-fluid mr-0" /> member and get Discounts like never before</p>
                                                    </div>
                                                }
                                                
                                                <div className="gold-benifi-cards-cont pdng-usr-dtls-slots mb-3 pr-0" style={{paddingLeft: '8px'}}>
                                                    <div className="gold-benifi-cards" onClick={(e) => {

                                                        let data = {
                                                            'Category': 'ConsumerApp', 'Action': 'FindDoctorsProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'find-doctors-profile-clicked'
                                                        }
                                                        GTM.sendEvent({ data: data })
                                                        this.props.clearVipSelectedPlan() // reset gld or vip store to default state
                                                        this.props.history.push(`/vip-gold-details?is_gold=true&source=user-profile-page`)
                                                    }}>
                                                        <img src={ASSETS_BASE_URL + '/img/gl1.png'} />
                                                        <p>Exclusive price on<br /><strong>30,000</strong> Doctors</p>
                                                    </div>
                                                    <div className="gold-benifi-cards" onClick={(e) => {
                                                        let data = {
                                                            'Category': 'ConsumerApp', 'Action': 'BookTestsProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'book-tests-profile-clicked'
                                                        }
                                                        GTM.sendEvent({ data: data })
                                                        this.props.clearVipSelectedPlan() // reset gld or vip store to default state
                                                        this.props.history.push(`/vip-gold-details?is_gold=true&source=user-profile-page`)
                                                    }}>
                                                        <img src={ASSETS_BASE_URL + '/img/gl2.png'} />
                                                        <p>Discounts on <br /><strong>5,000</strong> Labs</p>
                                                    </div>
                                                    <div className="gold-benifi-cards" onClick={(e) => {
                                                        let data = {
                                                            'Category': 'ConsumerApp', 'Action': 'SaveMedicinesProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'save-medicines-profile-clicked'
                                                        }
                                                        GTM.sendEvent({ data: data })
                                                        this.props.clearVipSelectedPlan() // reset gld or vip store to default state
                                                        this.props.history.push(`/all-medicines`)
                                                    }}>
                                                        <img src={ASSETS_BASE_URL + '/img/medlife-med.png'} />
                                                        <p> Save 23% <br/> on medicines</p>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }
                                </div>
                            }
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
                                                <p onClick={() => this.toggleTandC()} className="text-xs fw-500" style={{ color: `var(--text--dark--all)`, cursor: 'pointer' }}>Terms & Conditions</p>
                                            </div>
                                        </div>
                                        <p className="view-more-coupons" onClick={() => { // redirect to more available coupons
                                            this.props.history.push('/user/coupons')
                                        }}>View more offers</p>
                                    </div>
                                </div>
                            </li> : ""
                        }

                        {/*<li className="my-profile-item" style={{ cursor: 'auto' }} onClick={() => { // redirect to referral section
                            this.props.history.push('/referral')
                        }}>
                            <div className="usr-dtls-off-act">
                                <p className="usr-dtls-strt-txt">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/refer.svg"} className="img-fluid" />REFER &amp; EARN</p>
                            </div>
                            <div className="ofr-img-txt">
                                <div className="box-img-cont"><img src={ASSETS_BASE_URL + "/img/step-2.png"} className="img-fluid" /></div>
                                <div className="ofr-contnt">
                                    <p className="ofr-bkg">
                                        Invite your friends on docprime.com and earn <b className="fw-500 drk-blk"><img style={{ width: '8px', marginTop: '4px', marginRight: '0px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} /> 200</b> on completion of their first order</p>
                                    <div>
                                        <div className="mrt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <p className="text-xs fw-500" style={{ color: `var(--text--dark--all)` , cursor: 'pointer' }}>Know more</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>*/}

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
                        {
                        CONFIG.ENABLE_INSURANCE && isUserLoginInsured && this.props.USER && this.props.USER.profiles && Object.keys(this.props.USER.profiles).length > 0 && this.props.USER.profiles[parseInt(this.props.USER.defaultProfile)].insurance_status == 1 ?
                            <li onClick={this.goToInsurance.bind(this, isUserLoginInsured)} className="my-profile-item lst-spcng">
                                <a>
                                    <span className="icon icon-md nav-icon">
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/ins.png"} className="img-fluid" />
                                    </span>
                                    <div className="nav-content">
                                        <h4 className="title app-title">OPD Insurance
                                        </h4>
                                        </div>
                                    </a>
                                    {this.getInsuranceBtnText()}
                                </li>
                                : ''
                        }

                        {CONFIG.ENABLE_VIP_CLUB && defaultProfile && defaultProfile.is_vip_member && !defaultProfile.is_vip_gold_member?
                            // redirect to  vip plan page
                            <li onClick={(e) => {
                                let data = {
                                'Category': 'ConsumerApp', 'Action': 'ProfileMenuVipClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'profile-menu-vip-clicked'
                              }
                              GTM.sendEvent({ data: data })
                                e.preventDefault()
                                this.props.clearVipSelectedPlan() // reset gld or vip store to default state
                                this.props.history.push('/vip-club-details?source=profile-menu-vip-clicked&lead_source=Docprime')
                              }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/viplog.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content" style={{width:'100%'}}>
                                    <h4 className="title app-title">Docprime Vip 
                                        {/* <button className="float-right ins-userdetails-buy">{memStatus}</button> */}
                                    </h4>
                                </div>
                            </a>
                        </li>
                        :''}
                        {CONFIG.ENABLE_VIP_GOLD ?
                            // redirect to  vip gold page
                            <li onClick={(e) => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'ProfileMenuGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'profile-menu-gold-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                e.preventDefault()
                                this.props.clearVipSelectedPlan() // reset gld or vip store to default state
                                this.props.history.push('/vip-gold-details?is_gold=true&source=profile-menu-gold-clicked&lead_source=Docprime')
                            }} className="my-profile-item lst-spcng">
                                <a>
                                    <span className="icon icon-md nav-icon">
                                        <img src={ASSETS_BASE_URL + "/img/gold-sm.png"} className="img-fluid" />
                                    </span>
                                    <div className="nav-content" style={{ width: '100%' }}>
                                        <h4 className="title app-title">Docprime Gold
                                        {/*<button className="float-right ins-userdetails-buy">{memStatus}</button>*/}
                                        </h4>
                                    </div>
                                </a>
                            </li>
                            : ''}
                            {/* redirect to  docprime care page*/}
                        {
                            is_care?
                            <li onClick={this.isDocCare.bind(this)} className="my-profile-item lst-spcng">
                                <a>
                                    <span className="icon icon-md nav-icon">
                                        <img src={ASSETS_BASE_URL + "/img/primecae.png"} className="img-fluid" />
                                    </span>
                                    <div className="nav-content" style={{ width: '100%' }}>
                                        <h4 className="title app-title">Docprime Care
                                            <button className="ins-userdetails-active">Active</button>
                                        </h4>
                                    </div>
                                </a>
                            </li>
                            :''
                        }
                        {/*Prescriptions page 
                        <li onClick={this.gotTo.bind(this, 'onlinePrescriptions')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/onlnpres.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Online Prescriptions
                                    </h4>
                                </div>
                            </a>
                        </li> */}
                        {/*Appointments page*/}
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
                        {/*user family section*/}
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
                        {/* user reviews*/}
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
                        {/* user wallet section*/}
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
                    { /*user address section*/}
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
                    {/*user notifications*/}
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
                    {/*logout*/}
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
