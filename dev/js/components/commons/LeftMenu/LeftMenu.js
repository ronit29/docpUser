import React from 'react';
import InitialsPicture from '../initialsPicture'
import STORAGE from '../../../helpers/storage';
import CONFIG from '../../../config'
import GTM from '../../../helpers/gtm.js'
import { relative } from 'path';

class LeftMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      toggleProfile: false,
      toggleArticles: false
    }
  }

  isDocCare() {
    this.props.toggleLeftMenu()
    if (this.props.isUserCared && this.props.isUserCared.user_plan_id) {
      this.props.history.push('/prime/success?user_plan=' + this.props.isUserCared.user_plan_id)
    } else {
      this.props.history.push('/prime/plans')
    }
  }

  render() {
    let user = null
    let thumbnail = null
    let memberClass = 'float-right memNew'
    let memStatus = 'New'
    let user_insurance_status = false
    let user_ins_status
    let is_user_gold_member = false 
    let gold_user_profile = {}
    let is_care = false
    let care_user_profile ={}
    if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {

      user = this.props.profiles[this.props.defaultProfile]
      thumbnail = this.props.profiles[this.props.defaultProfile].profile_image || null
      user_insurance_status = this.props.profiles[this.props.defaultProfile].is_insured
      user_ins_status = this.props.profiles[this.props.defaultProfile].insurance_status
    }
    if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
      memberClass = 'float-right memAct'
      memStatus = 'Active'
    }

    if(this.props.profiles && Object.keys(this.props.profiles).length){
         Object.entries(this.props.profiles).map(function([key, value]) { 
              if(value.is_vip_gold_member){
                  gold_user_profile = value
              }
              if(value.is_care){
                  care_user_profile = value
              } 
          })
         if(gold_user_profile && Object.keys(gold_user_profile).length){
            is_user_gold_member = true
            memberClass = 'float-right memAct'
            memStatus = 'Active'
         }
         if(care_user_profile && Object.keys(care_user_profile).length){
            is_care = true
         }
    }

    return (

      <section>
        <div className="row">
          <div className={`col-xs-12 col-d-width ${this.props.toggleHamburger ? 'col-d-width-ease' : ''}`}>
            <div className="left-menu">
              {
                this.props.leftMenuOpenFirstTime ?
                  <div className="">
                    {
                      user ?
                        <div className="header-box" onClick={() => {
                          this.props.toggleLeftMenu()
                          this.props.history.push(`/user`)
                        }}>
                          {/*<img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />*/}
                          <p className="d-flex align-item-center">
                            <InitialsPicture name={user.name} has_image={!!thumbnail} className="initialsPicture-dp leftIntiaspic">
                              <img src={thumbnail} className="img-fluid img-round" alt={user.name} title={user.name} style={{ width: '60px', height: '60px', float: 'left', color: '#ffffff' }} />
                            </InitialsPicture>
                            <span className="user-name">{user.name}</span>
                          </p>
                          <span className="right-arrow r-arrow" style={{ marginTop: 0 }}></span>
                        </div>
                        : <div className="header-box" onClick={() => {
                          this.props.toggleLeftMenu()
                          this.props.history.push('/user')
                        }}>
                          {/*<img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />*/}
                          <span className="user-name">Login</span>
                          <span className="right-arrow r-arrow" style={{ marginTop: 0 }}></span>
                        </div>
                    }
                    <ul className="drop-list-menu list_1">
                      {/*<li><a href="#"><img src="/assets/images/insurance.png" alt="" className="" />Insurance</a> <a href="#" class="btn-buy-now">Buy Now</a></li>
                                */}
                      {
                        CONFIG.ENABLE_VIP_GOLD && is_user_gold_member?
                          <li><a className="p-relative" onClick={(e) => {
                            let data = {
                              'Category': 'ConsumerApp', 'Action': 'MobileLeftMenuGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-leftmenu-gold-clicked'
                            }
                            GTM.sendEvent({ data: data })
                            e.preventDefault()
                            this.props.clearVipSelectedPlan()
                            this.props.toggleLeftMenu()
                            this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-leftmenu-gold-clicked&lead_source=Docprime')
                          }} href="#"><img style={{ position: 'relative', top: '15px' }} src={ASSETS_BASE_URL + '/img/gold-sm.png'} alt="" className="vip-lg-sng" />Docprime Gold {is_user_gold_member?<span className={memberClass}>{memStatus}</span>:''}<span className="vip-new-lft-tag">Membership for exclusive discounts</span></a></li>
                          : ''}
                      {
                        CONFIG.ENABLE_VIP_CLUB && user && user.is_vip_member && !user.is_vip_gold_member?
                          <li><a className="p-relative" onClick={(e) => {
                            let data = {
                              'Category': 'ConsumerApp', 'Action': 'MobileLeftMenuVipClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-leftmenu-vip-clicked'
                            }
                            GTM.sendEvent({ data: data })
                            e.preventDefault()
                            this.props.clearVipSelectedPlan()
                            this.props.toggleLeftMenu()
                            this.props.history.push('/vip-club-details?source=mobile-leftmenu-vip-clicked&lead_source=Docprime')
                          }} href="#"><img src={ASSETS_BASE_URL + '/img/viplog.png'} alt="" className="vip-lg-sng" />Docprime VIP <span className="vip-new-lft-tag">Save 70% on your family's medical bills</span></a></li>
                          : ''}



                      {
                        CONFIG.ENABLE_INSURANCE && (user_ins_status == 1 || user_ins_status == 5)?
                          <li><a onClick={(e) => {
                            let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileLeftMenuInsuranceClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-leftmenu-insurance-clicked'
                          }
                          GTM.sendEvent({ data: data })
                            e.preventDefault()
                            this.props.toggleLeftMenu()
                            this.props.history.push('/insurance/insurance-plans?source=mobile-leftmenu-insurance-clicked')
                          }} href="#"><img src={ASSETS_BASE_URL + "/img/customer-icons/ins.png"} alt="" className="" />OPD Insurance<span className={user_ins_status == 1 || user_ins_status == 5 || user_ins_status == 4 || user_ins_status == 7 ? 'float-right memAct' : 'float-right memNew'}>{user_ins_status == 1 || user_ins_status == 5 || user_ins_status == 4 || user_ins_status == 7? 'Active' : 'New'}</span></a></li>
                          : ''
                      }
                      {
                        is_care?
                        <li>
                          <a onClick={this.isDocCare.bind(this)}><img src={ASSETS_BASE_URL + "/img/primecae.png"} alt="" className="" />Docprime Care <span className="float-right memAct">Active</span>
                          </a>
                        </li>
                        :''
                      }

                     {/* <li><a onClick={(e) => {
                        e.preventDefault()
                        this.props.toggleLeftMenu()
                        this.props.history.push('/user/onlinePrescriptions')
                      }} href="#"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/onlnpres.svg" alt="" className="" />My Online Prescriptions</a></li>*/}

                      <li><a onClick={(e) => {
                        e.preventDefault()
                        this.props.toggleLeftMenu()
                        this.props.history.push('/user/appointments')
                      }} href="#"><img src={ASSETS_BASE_URL + "/images/my-appointment.png"} alt="" className="" />My Appointments</a></li>

                      {/* <li><a onClick={(e) => {
                        e.preventDefault()
                        let data = {
                          'Category': 'ConsumerApp', 'Action': 'LeftMenuOrderMedicineClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'leftmenu-order-medicine-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.props.toggleLeftMenu()
                        this.props.iFrameState('', false, true)
                        this.props.history.push('/order-medicine')
                      }} href="#" className=""><img src={ASSETS_BASE_URL + "/img/customer-icons/medicine-order1.png"} alt="" className="pad-B0" />Order Medicines</a>
                      </li> */}

                      <li><a onClick={(e) => {
                        e.preventDefault()
                        this.props.toggleLeftMenu()
                        this.props.history.push('/wallet')
                      }} href="#"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/rp-ico.png" alt="" className="" />My Wallet</a>
                        {/*<span className="wallet-amnt"><img src="/assets/images/rupees-icon.png" />212</span>*/}
                      </li>

                      {/*<li ><a onClick={(e) => {
                        e.preventDefault()
                        this.props.toggleLeftMenu()
                        this.props.history.push('/referral')
                      }} href="#"><img src={ASSETS_BASE_URL + "/images/refer-and-earn.png"} alt="" className="" />Refer <span className="refer-bonus float-right">Earn ₹ {this.props.refer_amount}</span></a></li>*/}

                      <li className="pos-rel"><a onClick={(e) => {
                        e.preventDefault()
                        this.props.toggleLeftMenu()
                        this.props.history.push('/notifications')
                      }} href="#"><img src={ASSETS_BASE_URL + "/images/notification.png"} alt="" className="" />Notifications</a>
                        {
                          this.props.unread_count ?
                            <div className="notification-count lft-notify">
                              <span className="fw-500 text-xs">{this.props.unread_count}</span>
                            </div> : ''
                        }
                      </li>
                      {/* <li className="pos-rel"><a  target="_blank" onClick={(e) => {
                        // e.preventDefault()
                        // this.props.toggleLeftMenu()
                        // this.props.history.push('/covid-plans');
                        let data = {
                          'Category': 'MobileHealth', 'Action': 'insuranceSidebar', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'insurance-sidebar-link-clicked'
                      }
                      GTM.sendEvent({ data: data })
                      }} href="https://www.policybazaar.com/health-insurance/health-insurance-india/?utm_source=docprime&utm_medium=top-navigation&utm_term=health-insurance"><img src={ASSETS_BASE_URL + "/img/customer-icons/ins.png"} alt="" className="" />Health Insurance</a>
                      </li> */}
                    </ul>

                    <ul className="drop-list-menu list_2">
                      <li><a onClick={(e) => {
                        e.preventDefault()
                        this.setState({ toggleProfile: !this.state.toggleProfile })
                      }} href="#" className=""><img src={ASSETS_BASE_URL + "/images/myprofile.png"} alt="" className="pad-B0" />My Profile
                                  {
                          this.state.toggleProfile ?
                            <img className="up-down-arw" src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="docprime" />
                            : <img className="up-down-arw" src={ASSETS_BASE_URL + "/images/down-arrow.png"} alt="docprime" />
                        }
                      </a></li>

                      {
                        this.state.toggleProfile ?
                          <div className="profile-list">
                            <li><a onClick={(e) => {
                              e.preventDefault()
                              this.props.toggleLeftMenu()
                              this.props.history.push('/user/family')
                            }} href="#" className="pad-B0 my-fm">My Family</a></li>

                            <li><a onClick={(e) => {
                              e.preventDefault()
                              this.props.toggleLeftMenu()
                              this.props.history.push('/user/address')
                            }} href="#">My Address</a></li>

                            {/* <li><a onClick={(e) => {
                              e.preventDefault()
                              this.props.toggleLeftMenu()
                              this.props.history.push('/digitinsurances')
                            }} href="#">My Digit Insurances</a></li> */}
                          </div>
                          : ''
                      }

                    </ul>

                    <ul className="drop-list-menu list_2">
                      <li><a onClick={(e) => {
                        e.preventDefault()
                        this.setState({ toggleArticles: !this.state.toggleArticles })
                      }} href="#" ><img src={ASSETS_BASE_URL + "/images/articles.png"} alt="" className="" />Resources
                                  {
                          this.state.toggleArticles ?
                            <img className="up-down-arw" src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="docprime" />
                            : <img className="up-down-arw" src={ASSETS_BASE_URL + "/images/down-arrow.png"} alt="docprime" />
                        }
                      </a></li>
                      {
                        this.state.toggleArticles ?
                          <div className="profile-list">
                            <li ><a onClick={(e) => {
                              e.preventDefault();
                              this.props.toggleLeftMenu()
                              this.props.history.push("/all-diseases")
                            }} href="#" className="pad-B0">Diseases</a></li>

                            <li ><a onClick={(e) => {
                              e.preventDefault();
                              this.props.toggleLeftMenu()
                              this.props.history.push("/all-medicines")
                            }} href="#" className="pad-B0">Medicines</a></li>

                            <li ><a className="pad-B0" onClick={(e) => {
                              e.preventDefault();
                              this.props.toggleLeftMenu()
                              this.props.history.push("/tests")
                            }} href="#">Tests</a></li>
                            <li ><a className="pad-B0" onClick={(e) => {
                              e.preventDefault();
                              this.props.toggleLeftMenu()
                              this.props.history.push("/ipd-procedures")
                            }} href="#">Procedures</a></li>
                            <li ><a onClick={(e) => {
                              e.preventDefault();
                              this.props.toggleLeftMenu()
                              this.props.history.push("/hospitals")
                            }} href="#">Hospitals</a></li>
                          </div>
                          : ''
                      }
                    </ul>

                    {/*
                              <ul className="drop-list-menu">
                                <li onClick={()=>this.props.history.push('/user/address')}><a href="#"><img src="/assets/images/rate-us.png" alt="" className="" />Rate us</a></li>
                              </ul>*/}

                    <ul className="final-list">
                      {/*<li><a onClick={(e) => {
                                        e.preventDefault();
                                        this.props.toggleLeftMenu()
                                        this.props.history.push("/about")
                                    }} href="#">About Us</a></li>

                                <li><a onClick={(e) => {
                                        e.preventDefault();
                                        this.props.toggleLeftMenu()
                                        this.props.history.push("/howitworks")
                                    }} href="#">Terms and Conditions</a></li>*/}
                      {
                        STORAGE.checkAuth() ?
                          <li className="logout" ><a onClick={(e) => {
                            e.preventDefault()
                            this.props.toggleLeftMenu()
                            this.props.logout(this.props.currentRoomId)
                          }} href="#">Logout</a></li>
                          : <li className="logout"><a onClick={(e) => {
                            e.preventDefault()
                            this.props.toggleLeftMenu()
                            this.props.history.push('/user')
                          }} href="#">Login</a></li>
                      }
                    </ul>


                  </div>
                  : <div></div>
              }
            </div>
          </div>
        </div>
      </section>

    )
  }
}
export default LeftMenu