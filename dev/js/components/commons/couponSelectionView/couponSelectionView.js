import React from 'react';


import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'


class CouponSelectionView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coupon:'',
            appointmentType: '',
            id: '',
            couponName:''
        }
    }

    componentDidMount(){
        let appointmentType = this.props.match.params.type;
        let id = this.props.match.params.id;
        if(appointmentType == 'opd'){
            appointmentType = 1 
        }else if (appointmentType == 'lab'){
            appointmentType = 2
        }else {
            appointmentType = ''
        }
        this.setState({appointmentType: appointmentType, id: id})
    }

    toggleButtons(couponId,e){
        this.setState({coupon: couponId,couponName:e.target.value})
    }

    applyCoupon(){
        this.props.applyCoupons(this.state.appointmentType, this.state.couponName ,'3',this.state.id, '20')
        this.props.history.go(-1)
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
                                        
                                                <div className="widget-content">
                                                    <h4 className="title">Apply Coupon</h4> 
                                                    <div className="search-coupon-input">
                                                        <input type="text" id="disease-search"  className="coupon-searchbar" placeholder={this.state.couponName} />           
                                                        <p className="text-sm text-primary apply-button" onClick={this.applyCoupon.bind(this)}>Apply</p>
                                                    </div>

                                                              
                                                </div>
                                                <div className="coupons-list">
                                                <p className="pd-12">Select</p>
                                                    <ul>
                                                        <li className="coupon-style d-flex pd-12">
                                                            <input type="radio" name ="coupons" checked={this.state.coupon == '1'} value='FIRST' onChange = {this.toggleButtons.bind(this,'1')}/>
                                                            <div className="coupon-input">
                                                                
                                                                <p className="fw-700 text-md">FIRST</p>
                                                                <p>100% discount on your first booking on doctor & diagnostics</p>
                                                                <p className="text-sm text-primary">Terms & Conditions</p>
                                                            </div>
                                                        </li>
                                                        <li className="coupon-style d-flex pd-12">
                                                        <input type="radio" name ="coupons" checked={this.state.coupon == '2'}  value='SECOND' onChange = {this.toggleButtons.bind(this,'2')}/>

                                                            <div className="coupon-input">
                                                                <p className="fw-700 text-md">SECOND</p>
                                                                <p>100% discount on your first booking on doctor & diagnostics</p>
                                                                <p className="text-sm text-primary">Terms & Conditions</p>

                                                            </div>
                                                        </li>
                                                        <li  className="coupon-style d-flex pd-12">
                                                        <input type="radio" name ="coupons" checked = {this.state.coupon == '3'} value='THIRD' onChange = {this.toggleButtons.bind(this,'3')}/>

                                                            <div className="coupon-input">
                                                                <p className="fw-700 text-md">THIRD</p>
                                                                <p>100% discount on your first booking on doctor & diagnostics</p>
                                                                <p className="text-sm text-primary">Can be used 3 times per user</p>
                                                                <div className="coupon-timeline book-confirmed-timeline">
                                                                    <ul className="inline-list">
                                                                        <li className="active">
                                                                            <span className="dot">1</span>
                                                                        </li>
                                                                        <li >
                                                                            <span className="dot">2</span>
                                                                        </li>
                                                                        <li >
                                                                            <span className="dot">3</span>
                                                                        </li>
                                                                    </ul>                                 
                                                                 </div>
                                                                <p className="text-sm text-primary">Terms & Conditions</p>

                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                           
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
