import React from 'react';
import InitialsPicture from '../initialsPicture'
import STORAGE from '../../../helpers/storage';
import CONFIG from '../../../config'

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
    if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
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
    if (this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]) {

      user = this.props.profiles[this.props.defaultProfile]
      thumbnail = this.props.profiles[this.props.defaultProfile].profile_image || null
      user_insurance_status = this.props.profiles[this.props.defaultProfile].is_insured
    }
    if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
      memberClass = 'float-right memAct'
      memStatus = 'Active'
    }

    return (

      <section>
        <div className="row">
          <div className={`col-xs-12 col-d-width ${this.props.toggleHamburger ? 'col-d-width-ease' : ''}`}>
            <div className="left-menu">
              {
                user ?
                  <div className="header-box" onClick={() => {
                    this.props.toggleLeftMenu()
                    this.props.history.push(`/user`)
                  }}>
                    {/*<img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />*/}
                    <InitialsPicture name={user.name} has_image={!!thumbnail} className="initialsPicture-dp leftIntiaspic">
                      <img src={thumbnail} className="img-fluid img-round" alt={user.name} title={user.name} style={{ width: '60px', height: '60px', float: 'left' }} />
                    </InitialsPicture>
                    <span className="user-name">{user.name}</span>
                    <span className="right-arrow r-arrow" style={{ marginTop: '25px' }}></span>
                  </div>
                  : <div className="header-box" onClick={() => {
                    this.props.toggleLeftMenu()
                    this.props.history.push('/user')
                  }}>
                    {/*<img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />*/}
                    <span className="user-name">Login</span>
                    <span className="right-arrow r-arrow" style={{ marginTop: '24px' }}></span>
                  </div>
              }
              <ul className="drop-list-menu list_1">
                {/*<li><a href="#"><img src="/assets/images/insurance.png" alt="" className="" />Insurance</a> <a href="#" class="btn-buy-now">Buy Now</a></li>
                              */}

                {
                  CONFIG.ENABLE_INSURANCE ?
                    <li><a onClick={(e) => {
                      e.preventDefault()
                      this.props.toggleLeftMenu()
                      this.props.history.push('/insurance/insurance-plans')
                    }} href="#"><img src={ASSETS_BASE_URL + "/img/customer-icons/ins.png"} alt="" className="" />OPD Insurance<span className={user_insurance_status ? 'float-right memAct' : 'float-right memNew'}>{user_insurance_status ? 'Active' : 'New'}</span></a></li>
                    : ''
                }
                <li><a onClick={this.isDocCare.bind(this)}><img src="/assets/img/primecae.png" alt="" className="" />Docprime Care
                                  <span className={memberClass}>{memStatus}</span></a></li>

                <li><a onClick={(e) => {
                  e.preventDefault()
                  this.props.toggleLeftMenu()
                  this.props.history.push('/user/onlinePrescriptions')
                }} href="#"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/onlnpres.svg" alt="" className="" />My Online Prescriptions</a></li>

                <li><a onClick={(e) => {
                  e.preventDefault()
                  this.props.toggleLeftMenu()
                  this.props.history.push('/user/appointments')
                }} href="#"><img src="/assets/images/my-appointment.png" alt="" className="" />My Appointments</a></li>

                <li><a onClick={(e) => {
                  e.preventDefault()
                  this.props.toggleLeftMenu()
                  this.props.history.push('/wallet')
                }} href="#"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/rp-ico.png" alt="" className="" />My Wallet</a>
                  {/*<span className="wallet-amnt"><img src="/assets/images/rupees-icon.png" />212</span>*/}
                </li>

                <li ><a onClick={(e) => {
                  e.preventDefault()
                  this.props.toggleLeftMenu()
                  this.props.history.push('/referral')
                }} href="#"><img src="/assets/images/refer-and-earn.png" alt="" className="" />Refer and Earn</a></li>

                <li className="pos-rel"><a onClick={(e) => {
                  e.preventDefault()
                  this.props.toggleLeftMenu()
                  this.props.history.push('/notifications')
                }} href="#"><img src="/assets/images/notification.png" alt="" className="" />Notifications</a>
                  {
                    this.props.unread_count ?
                      <div className="notification-count">
                        <span className="fw-500 text-xs">{this.props.unread_count}</span>
                      </div> : ''
                  }
                </li>
              </ul>

              <ul className="drop-list-menu list_2">
                <li><a onClick={(e) => {
                  e.preventDefault()
                  this.setState({ toggleProfile: !this.state.toggleProfile })
                }} href="#" className=""><img src="/assets/images/myprofile.png" alt="" className="pad-B0" />My Profile
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
                    </div>
                    : ''
                }

              </ul>

              <ul className="drop-list-menu list_2">
                <li><a onClick={(e) => {
                  e.preventDefault()
                  this.setState({ toggleArticles: !this.state.toggleArticles })
                }} href="#" ><img src="/assets/images/articles.png" alt="" className="" />Articles
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
                      }} href="#" className="pad-B0">All Diseases</a></li>

                      <li ><a onClick={(e) => {
                        e.preventDefault();
                        this.props.toggleLeftMenu()
                        this.props.history.push("/all-medicines")
                      }} href="#">All Medicines</a></li>
                    </div>
                    : ''
                }
              </ul>
              <div className="seoSetText-container">
                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/search?from=footer")
                                        }}>Find Doctor</p>
                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/search?from=footer")
                                        }}>Lab Tests</p>
                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.props.history.push('/searchpackages')
                                        }}>Health Package</p>
                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo('/')
                                        }}>Online Consultation</p>
                <p onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/contact")
                                    }}>Contact us</p>
              </div>

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
          </div>
        </div>
        {/*<div className="container">
                  <div className="row">
                     <div className="col-xs-12 col-d-width">
                       <div className="lm-card clearfix">
                          <div className="float-l">
                            <h2>Call</h2>
                            <p>Lorem Ipsum is simply dummy text</p>
                          </div>
                          <div className="float-r">
                            <img src="/assets/images/ic-tele.png" alt="" />
                          </div>
                       </div>
                       <div className="lm-card clearfix">
                          <div className="float-l">
                            <h2>Chat with us</h2>
                            <p>Lorem Ipsum is simply dummy text</p>
                          </div>
                          <div className="float-r">
                            <img src="/assets/images/ic-chat.png" alt="" />
                          </div>
                       </div>
                       <div className="lm-card clearfix">
                          <div className="float-l">
                            <h2>Write to us</h2>
                            <p>Lorem Ipsum is simply dummy text</p>
                          </div>
                          <div className="float-r">
                            <img src="/assets/images/ic-edit.png" alt="" />
                          </div>
                          <div className="wrtus-frm clearfix">
                            <div className="form-group">
                                <input type="text" className="form-write" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-write" placeholder="E-mail" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-write" placeholder="Mobile number" />
                            </div>
                            <div className="form-group">
                                <textarea className="form-write" placeholder="Message"></textarea>
                            </div>
                            <a href="javascript:void(0);" className="btn-wrt-submit">Submit</a>
                          </div>
                       </div>
                     </div>
                  </div>
              </div>*/}
      </section>

    )
  }
}
export default LeftMenu