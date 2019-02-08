import React from 'react';
import InitialsPicture from '../initialsPicture'
import STORAGE from '../../../helpers/storage';

class LeftMenu extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      toggleProfile:false,
      toggleArticles: false
    }
  }
  render(){

    let user = this.props.defaultProfile && this.props.profiles && this.props.profiles[this.props.defaultProfile]?this.props.profiles[this.props.defaultProfile]:null
    let thumbnail = null
    return(
           
            <section>
                  <div className="row">
                     <div className={`col-xs-12 col-d-width ${this.props.toggleHamburger?'col-d-width-ease':''}`}>
                        <div className="left-menu">
                            {
                              user?
                              <div className="header-box" onClick={()=>{
                                this.props.toggleLeftMenu()
                                this.props.history.push(`/user`)} }>
                                {/*<img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />*/}
                                <InitialsPicture name={user.name} has_image={!!thumbnail} className="initialsPicture-dp">
                                    <img src={thumbnail} className="img-fluid img-round" alt={user.name} title={user.name} />
                                </InitialsPicture>
                                <span className="user-name">{user.name}</span>
                                <span className="right-arrow r-arrow"></span>
                              </div>
                              :<div className="header-box" onClick={()=>{
                                this.props.toggleLeftMenu()
                                this.props.history.push('/user')} }>
                                {/*<img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />*/}
                                <span className="user-name">Login</span>
                                <span className="right-arrow r-arrow"></span>
                              </div>
                            }
                            <ul className="drop-list-menu list_1">
                              {/*<li><a href="#"><img src="/assets/images/insurance.png" alt="" className="" />Insurance</a> <a href="#" class="btn-buy-now">Buy Now</a></li>
                              */}
                              <li><a onClick={(e)=>{
                                e.preventDefault()
                                this.props.toggleLeftMenu()
                                this.props.history.push('/user/onlinePrescriptions')} } href="#"><img src="/assets/images/online-prescription.png" alt="" className="" />My Online Prescription</a></li>

                              <li><a onClick={(e)=>{
                                e.preventDefault()
                                this.props.toggleLeftMenu()
                                this.props.history.push('/user/appointments')} } href="#"><img src="/assets/images/my-appointment.png" alt="" className="" />My Appoinments</a></li>
                              
                              <li><a onClick={(e)=>{
                                e.preventDefault()
                                this.props.toggleLeftMenu()
                                this.props.history.push('/wallet')} } href="#"><img src="/assets/images/my-wallet.png" alt="" className="" />My Wallet</a>
                                  {/*<span className="wallet-amnt"><img src="/assets/images/rupees-icon.png" />212</span>*/}
                              </li>

                              <li ><a onClick={(e)=>{
                                e.preventDefault()
                                this.props.toggleLeftMenu()
                                this.props.history.push('/referral')} }  href="#"><img src="/assets/images/refer-and-earn.png" alt="" className="" />Refer and Earn</a></li>

                              <li><a onClick={(e)=>{
                                e.preventDefault()
                                this.props.toggleLeftMenu()
                                this.props.history.push('/notifications')} } href="#"><img src="/assets/images/notification.png" alt="" className="" />Notification</a></li>
                            </ul>
                            
                            <ul className="drop-list-menu list_2">
                              <li><a onClick={(e)=>{
                                e.preventDefault()
                                this.setState({toggleProfile:!this.state.toggleProfile })} } href="#" className=""><img src="/assets/images/myprofile.png" alt="" className="pad-B0" />My Profile 
                                {
                                  this.state.toggleProfile?
                                  <img className="up-down-arw" src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="docprime" />  
                                  :<img className="up-down-arw" src={ASSETS_BASE_URL + "/images/down-arrow.png"} alt="docprime" />
                                }
                                </a></li>

                                {
                                  this.state.toggleProfile?
                                  <div className="profile-list">
                                    <li><a onClick={(e)=>{
                                      e.preventDefault()
                                      this.props.toggleLeftMenu()
                                      this.props.history.push('/user/family')} } href="#" className="pad-B0 my-fm">My Family</a></li>

                                    <li><a onClick={(e)=>{
                                      e.preventDefault()
                                      this.props.toggleLeftMenu()
                                      this.props.history.push('/user/address')} }  href="#">My Address</a></li>
                                  </div>
                                  :''    
                                }
                              
                            </ul>

                            <ul className="drop-list-menu list_2">
                              <li><a onClick={(e)=>{
                                e.preventDefault()
                                this.setState({toggleArticles:!this.state.toggleArticles })} } href="#" ><img src="/assets/images/articles.png" alt="" className="" />Articles
                                {
                                  this.state.toggleArticles?
                                  <img className="up-down-arw" src={ASSETS_BASE_URL + "/images/up-arrow.png"} alt="docprime" />
                                  :<img className="up-down-arw" src={ASSETS_BASE_URL + "/images/down-arrow.png"} alt="docprime" />
                                }
                                </a></li>
                              {
                                this.state.toggleArticles?
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
                                  }}  href="#">All Mediciness</a></li>
                                </div>
                                :''
                              }
                            </ul>

                            {/*
                            <ul className="drop-list-menu">
                              <li onClick={()=>this.props.history.push('/user/address')}><a href="#"><img src="/assets/images/rate-us.png" alt="" className="" />Rate us</a></li>
                            </ul>*/}
                            
                            <ul className="final-list">
                              <li><a onClick={(e) => {
                                      e.preventDefault();
                                      this.props.toggleLeftMenu()
                                      this.props.history.push("/about")
                                  }} href="#">About Us</a></li>

                              <li><a onClick={(e) => {
                                      e.preventDefault();
                                      this.props.toggleLeftMenu()
                                      this.props.history.push("/howitworks")
                                  }} href="#">Terms and Condition</a></li>
                                {
                                  STORAGE.checkAuth()?
                                  <li className="logout" ><a onClick={(e)=>{
                                    e.preventDefault()
                                    this.props.toggleLeftMenu()
                                    this.props.logout(this.props.currentRoomId)} } href="#">Logout</a></li>
                                  :<li className="logout"><a onClick={(e)=>{
                                    e.preventDefault()
                                    this.props.toggleLeftMenu()
                                    this.props.history.push('/user')}} href="#">Login</a></li>
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