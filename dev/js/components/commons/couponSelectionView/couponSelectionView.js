import React from 'react';


import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'


class CouponSelectionView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
            <ProfileHeader />
            <section className="container parent-section book-appointment-section">
                <div className="row main-row parent-section-row">
                    <LeftBar />
                    <div className="col-12 col-md-7 col-lg-7 center-column">
                    
                    <section className="dr-profile-screen booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row mrb-20">
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">
                                               
                                               <h4>Apply Coupon</h4> 
                                               <input/>
                                            </div>
                                        </div>
                                        
                                  
                                </div>
                            </div>
                        </section>
                    </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );
    }
}


export default CouponSelectionView
