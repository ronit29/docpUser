import React from 'react';

import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import TermsConditions from './termsConditions.js'
const queryString = require('query-string');
import STORAGE from '../../../helpers/storage'
import BookingError from '../../opd/patientDetails/bookingErrorPopUp'

class CouponSelectionView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coupon: '',
            appointmentType: '',
            id: '',
            couponName: '',
            errorMsg: '',
            openTermsConditions: false,
            couponText: "",
            couponTextMessage: "",
            test_ids: null,
            procedures_ids: null,
            clinicId: null,
            deal_price: null,
            cart_item: null,
            error: null
        }
    }

    closeErrorPopup = () => {
        this.setState({ error: '' })
    }

    toggle(which, tnc = '') {
        this.setState({ [which]: !this.state[which], tnc: tnc })
    }

    inputHandler(e) {
        this.setState({ couponText: e.target.value.toUpperCase() })
    }

    initialSetCoupons(props) {
        if (window) {
            window.scrollTo(0, 0)
        }
        let appointmentType = props.match.params.type;
        let id = props.match.params.id;
        let clinicId = props.match.params.cid
        const parsed = queryString.parse(props.location.search)
        let test_ids = null
        let procedures_ids = null
        let deal_price = null
        let cart_item = parsed.cart_item || null

        if (parsed.deal_price) {
            deal_price = parseInt(parsed.deal_price)
        }
        if (appointmentType == 'opd') {
            appointmentType = 1
        } else if (appointmentType == 'lab') {
            appointmentType = 2
        } else if (appointmentType == 'vip') {
            appointmentType = 3
        } else {
            appointmentType = ''
        }

        if (appointmentType == 2) {
            if (parsed.test_ids) {
                test_ids = parsed.test_ids
            }
            props.getCoupons({
                productId: 2, lab_id: id, test_ids: test_ids, profile_id: props.selectedProfile, deal_price: deal_price, cart_item
            })
        } else if(appointmentType == 3){
             props.getCoupons({
                productId:clinicId,gold_plan_id:id, deal_price:deal_price
            })
        } else {
            if (parsed.procedures_ids) {
                procedures_ids = parsed.procedures_ids
            }
            props.getCoupons({
                productId: 1, doctor_id: id, hospital_id: clinicId, profile_id: props.selectedProfile, procedures_ids, deal_price: deal_price, cart_item
            })
        }

        this.setState({ appointmentType: appointmentType, id: id, clinicId: clinicId, test_ids, procedures_ids, deal_price, cart_item })
    }

    pushGoldData(coupon){
        const parsed = queryString.parse(this.props.location.search)
        let gold_push_data={}
        let param
        gold_push_data.plan = this.props.selected_vip_plan
        gold_push_data.dummy_data_type = 'PLAN_PURCHASE'
        gold_push_data.members = []
        gold_push_data.coupon_data = []
        gold_push_data.coupon_data.push(coupon)
        gold_push_data.utm_spo_tags = parsed
        gold_push_data.coupon_type = this.state.clinicId == 8?'gold': this.state.clinicId == 11 ? 'vip':''
        this.props.currentSelectedVipMembersId.map((val, key) => {
        if (Object.keys(this.props.vipClubMemberDetails).length > 0) {
            param = this.props.vipClubMemberDetails[val[key]]
            gold_push_data.members.push(param)
            }
        })
        if(STORAGE.isAgent()){
            gold_push_data.is_agent = true
        }else{
            gold_push_data.is_agent = false
        }
        if(STORAGE.isAgent() && gold_push_data && Object.keys(gold_push_data).length && gold_push_data.members && gold_push_data.members.length){
            if(gold_push_data.members.length ==1 && gold_push_data.members[0] == null){
                
            }else{
                this.props.pushMembersData(gold_push_data)
            }
        }
    }

    componentDidMount() {
        this.initialSetCoupons(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedProfile != nextProps.selectedProfile) {
            this.initialSetCoupons(nextProps)
        }
    }

    toggleButtons(coupon, e) {
        if (coupon.valid) {
            this.setState({ coupon: coupon.coupon_id, couponName: coupon.code, errorMsg: '' })
            if(this.state.appointmentType == 3){
                this.pushGoldData(coupon)
            }
            this.props.applyCoupons(this.state.appointmentType, coupon, coupon.coupon_id, this.state.id, (success) => {
            })
            this.props.history.go(-1)
        } else {
            // open popup
            this.setState({ error: coupon.invalidating_message })
        }
    }

    applyCoupon() {
        /*if(this.state.coupon){  
            this.props.applyCoupons(this.state.appointmentType, this.state.couponName ,this.state.coupon,this.state.id )
            this.props.history.go(-1)   
        }else{
            this.setState({errorMsg:'Please Select Coupon'})
        }   */
    }

    getDots(no, used) {
        let dots = []
        for (let i = 1; i <= no; i++) {
            if (i <= used)
                dots.push(<li key={i} className="active"><span className="dot">{i}</span></li>)
            else
                dots.push(<li key={i} className=""><span className="dot">{i}</span></li>)
        }
        return dots
    }

    applyTextCoupon(e) {
        this.setState({ couponTextMessage: "" })
        if (this.state.couponText) {
            let cb = (coupon) => {
                if (coupon && coupon[0] && coupon[0].valid) {
                    this.toggleButtons(coupon[0], e)
                } else {
                    this.setState({ couponTextMessage: "Please enter a valid coupon code" })
                }
            }
            if (this.state.appointmentType == 2) {
                this.props.getCoupons({
                    productId: 2, lab_id: this.state.id, test_ids: this.state.test_ids, profile_id: this.props.selectedProfile, save_in_store: false, coupon_code: this.state.couponText, deal_price: this.state.deal_price, cb: cb, cart_item: this.state.cart_item
                })
            }else if(this.state.appointmentType == 3){
                 this.props.getCoupons({
                    productId:this.state.clinicId,gold_plan_id:this.state.id, deal_price:this.state.deal_price, coupon_code: this.state.couponText, save_in_store: false, cb: cb,
                })
            } else {
                this.props.getCoupons({
                    productId: 1, doctor_id: this.state.id, hospital_id: this.state.clinicId, profile_id: this.props.selectedProfile, procedures_ids: this.state.procedures_ids, save_in_store: false,
                    coupon_code: this.state.couponText, deal_price: this.state.deal_price, cb: cb, cart_item: this.state.cart_item
                })
            }
        } else {
            this.setState({ couponTextMessage: "Please enter a coupon code" })
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row mrng-copn">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            <section className="dr-profile-screen booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row mrb-20">
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">

                                                <div className="coupons-list">
                                                    <p className="pd-12 select-coupon-heading">Select Coupon</p>
                                                    <div className="coupon-search-input">
                                                        <input placeholder="Enter Coupon here" style={{textTransform:'uppercase'}} onChange={this.inputHandler.bind(this)} value={this.state.couponText} />
                                                        <button onClick={this.applyTextCoupon.bind(this)}>Apply</button>
                                                        <p style={{ color: 'red' }}>{this.state.couponTextMessage}</p>
                                                    </div>
                                                    {
                                                        this.props.applicableCoupons.length ?
                                                            <ul>
                                                                {
                                                                    this.props.applicableCoupons.map((coupons, index) => {
                                                                        return <li key={index} className={"coupon-style search-list-radio pd-12"}>
                                                                            <input type="radio" id={coupons.coupon_id} name="radio-group" checked={this.state.coupon === coupons.coupon_id} value={coupons.code} onClick={this.toggleButtons.bind(this, coupons)} />
                                                                            <label className="fw-700 text-md" htmlFor={coupons.coupon_id}>{coupons.code}</label>
                                                                            <div className="coupon-input col-12">
                                                                                <p>{coupons.desc}</p>
                                                                                {
                                                                                    coupons.coupon_count > 1 ? <div className="coupon-timeline book-confirmed-timeline">
                                                                                        <p className="text-sm text-primary">can be used {coupons.coupon_count - coupons.used_count} more times</p>
                                                                                        <ul className="coupon-inline-list">
                                                                                            {
                                                                                                this.getDots(coupons.coupon_count, coupons.used_count)
                                                                                            }
                                                                                        </ul>
                                                                                    </div> : ""
                                                                                }

                                                                                {
                                                                                    coupons.tnc ?
                                                                                        <p className="text-sm text-primary" style={{ 'cursor': 'pointer' }} onClick={this.toggle.bind(this, 'openTermsConditions', coupons.tnc)}>Terms & Conditions</p>
                                                                                        : ''
                                                                                }

                                                                            </div>

                                                                        </li>
                                                                    })
                                                                }
                                                                {
                                                                    this.state.openTermsConditions ? <TermsConditions toggle={this.toggle.bind(this, 'openTermsConditions')} tnc={this.state.tnc} /> : ""
                                                                }
                                                            </ul>
                                                            : <div>
                                                                <p className="no-coupon">No coupons available</p>
                                                            </div>
                                                    }
                                                </div>


                                            </div>
                                        </div>

                                        {
                                            this.state.error ? <BookingError heading={"Invalid Coupon"} message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                                        }

                                    </div>
                                </div>
                            </section>

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" msgTemplate="gold_general_template"/>
                    </div>
                </section>
            </div>
        );
    }
}


export default CouponSelectionView
