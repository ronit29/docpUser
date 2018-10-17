import React from 'react';


import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import TermsConditions from './termsConditions.js'



class CouponSelectionView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coupon:'',
            appointmentType: '',
            id: '',
            couponName:'',
            errorMsg: '',
            openTermsConditions:false,
        }
    }

    toggle(which,tnc='') {
        this.setState({ [which]: !this.state[which], tnc:tnc })
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
        this.props.applyCoupons(this.state.appointmentType, coupon.code ,coupon.coupon_id,this.state.id )
        this.props.history.go(-1)
    }

    applyCoupon(){
        /*if(this.state.coupon){  
            this.props.applyCoupons(this.state.appointmentType, this.state.couponName ,this.state.coupon,this.state.id )
            this.props.history.go(-1)   
        }else{
            this.setState({errorMsg:'Please Select Coupon'})
        }   */
    }

    getDots(no,used){
        let dots = []
        for(let i = 1; i<=no; i++){
            if(i <= used )
                dots.push(<li className="active"><span className="dot">{i}</span></li>)
            else
                dots.push(<li className=""><span className="dot">{i}</span></li>)
        }
        return dots
    }

    render() {
        console.log(this.props.applicableCoupons + 'tncccccccccccccc')

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
                                        
                                                {/*<div className="widget-content">
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

                                                              
                                                </div>*/}

                                                {
                                                    this.props.applicableCoupons.length?
                                                
                                                        <div className="coupons-list">
                                                            <p className="pd-12">Select</p>
                                                            <ul>
                                                                {
                                                                    this.props.applicableCoupons.map((coupons,index)=>{
                                                                        return <li key = {index} className="coupon-style search-list-radio pd-12">
                                                                                <input type="radio" id={coupons.coupon_id} name="radio-group" checked={this.state.coupon === coupons.coupon_id} value={coupons.code} onClick = {this.toggleButtons.bind(this,coupons)}/>
                                                                                 <label className="fw-700 text-md" for={coupons.coupon_id}>{coupons.code}</label>
                                                                                <div className="coupon-input col-12">
                                                                                <p>{coupons.desc}</p>
                                                                                <div className="coupon-timeline book-confirmed-timeline">
                                                                                        <p className="text-sm text-primary">can be used {coupons.coupon_count - coupons.used_count} times per user</p>
                                                                                        <ul className="coupon-inline-list">
                                                                                            {
                                                                                                    this.getDots(coupons.coupon_count,coupons.used_count)
                                                                                            }
                                                                                        </ul>                                 
                                                                                     </div>
                                                                                <p className="text-sm text-primary" onClick={this.toggle.bind(this, 'openTermsConditions',coupons.tnc)}>Terms & Conditions</p>
                                                                                
                                                                            </div>
                                                                    
                                                                        </li>
                                                                    })                                                            
                                                                }   
                                                                {
                                                                    this.state.openTermsConditions ?<TermsConditions toggle={this.toggle.bind(this, 'openTermsConditions')} tnc={this.state.tnc} /> : ""
                                                                }
                                                            </ul>
                                                        </div>
                                                        :<div>
                                                            <p className="no-coupon">No coupons available</p>
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