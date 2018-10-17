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
            couponName:'',
            errorMsg: ''
        }
    }

    componentDidMount(){
        let appointmentType = this.props.match.params.type;
        let id = this.props.match.params.id;
        let clinicId = this.props.match.params.cid
        if(appointmentType == 'opd'){
            appointmentType = 1 
        }else if (appointmentType == 'lab'){
            appointmentType = 2
        }else {
            appointmentType = ''
        }
        this.props.getCoupons(appointmentType)
        this.setState({appointmentType: appointmentType, id: id, clinicId: clinicId})
    }

    toggleButtons(coupon,e){
        this.setState({coupon: coupon.coupon_id, couponName: coupon.code, errorMsg: ''})
    }

    applyCoupon(){
        if(this.state.coupon){  
            this.props.applyCoupons(this.state.appointmentType, this.state.couponName ,this.state.coupon,this.state.id )
            this.props.history.go(-1)   
        }else{
            this.setState({errorMsg:'Please Select Coupon'})
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
                                        
                                                <div className="widget-content">
                                                    <h4 className="title">Apply Coupon</h4> 
                                                    {
                                                        this.state.errorMsg?
                                                        <p style={{color:'red'}}>{this.state.errorMsg}</p>
                                                        :''
                                                    }
                                                    <div className="search-coupon-input">
                                                        <input type="text" id="disease-search"  className="coupon-searchbar" placeholder={this.state.couponName} value = {this.state.couponName}/>           
                                                        <p className="text-sm text-primary apply-button" onClick={this.applyCoupon.bind(this)}>Apply</p>
                                                    </div>

                                                              
                                                </div>

                                                {
                                                    this.props.applicableCoupons.length?
                                                
                                                        <div className="coupons-list">
                                                            <p className="pd-12">Select</p>
                                                            <ul>
                                                                {
                                                                    this.props.applicableCoupons.map((coupons,index)=>{
                                                                        return <li key = {index} className="coupon-style search-list-radio pd-12">
                                                                                <input type="radio" id="coupon-label" name="radio-group" checked={this.state.coupon == coupons.coupon_id} value={coupons.code} onChange = {this.toggleButtons.bind(this,coupons)}/>
                                                                                 <label className="fw-700 text-md" for="coupon-label">{coupons.code}</label>
                                                                                <div className="coupon-input col-12">
                                                                                <p>{coupons.desc}</p>
                                                                                <div className="coupon-timeline book-confirmed-timeline">
                                                                                        <ul className="coupon-inline-list">
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
                                                                    })                                                            
                                                                }   
                                                            </ul>
                                                        </div>
                                                        :<div>
                                                            <p>No coupons available</p>
                                                        </div>
                                                    }
                                           
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
