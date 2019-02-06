import React from 'react';

class LeftMenu extends React.Component {
  render(){
    return(
           
            <section>
                <div className="container">
                  <div className="row">
                     <div className="col-xs-12 col-d-width">
                        <div className="left-menu">
                            <div className="header-box">
                              <img src="/assets/images/profile-photo.jpeg" alt="profile-photo" className="user-profile-img" />
                              <span className="user-name">Rishabh Malohtra</span>
                              <span className="right-arrow r-arrow"></span>
                            </div>
                            <ul className="drop-list-menu list_1">
                              <li><a href="#"><img src="/assets/images/insurance.png" alt="" className="" />Insurance</a> <a href="#" class="btn-buy-now">Buy Now</a></li>
                              <li><a href="#"><img src="/assets/images/online-prescription.png" alt="" className="" />My Online Prescription</a></li>
                              <li><a href="#"><img src="/assets/images/my-appointment.png" alt="" className="" />My Appoinments</a></li>
                              <li>
                                  <a href="#"><img src="/assets/images/my-wallet.png" alt="" className="" />My Wallet</a>
                                  <span className="wallet-amnt"><img src="/assets/images/rupees-icon.png" />212</span>
                              </li>
                              <li><a href="#"><img src="/assets/images/refer-and-earn.png" alt="" className="" />Refer and Earn</a></li>
                              <li><a href="#"><img src="/assets/images/notification.png" alt="" className="" />Notification</a></li>
                            </ul>
                            
                            <ul className="drop-list-menu list_2">
                              <li><a href="#" className="pad-B0"><img src="/assets/images/myprofile.png" alt="" className="" />My Profile</a></li>
                              <li><a href="#" className="pad-B0">My Family</a></li>
                              <li><a href="#">My Address</a></li>
                            </ul>
                            
                            <ul className="drop-list-menu">
                              <li><a href="#"><img src="/assets/images/articles.png" alt="" className="" />Articles</a></li>
                              <li><a href="#"><img src="/assets/images/rate-us.png" alt="" className="" />Rate us</a></li>
                            </ul>
                            
                            <ul className="final-list">
                              <li><a href="#">About Us</a></li>
                              <li><a href="#">Terms and Condition</a></li>
                              <li className="logout"><a href="#">Logout</a></li>
                            </ul>

                        </div>
                    </div>
                  </div>
              </div>
            </section>
  
      )
  }
}
export default LeftMenu