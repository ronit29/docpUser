import React from 'react';

import Loader from '../Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CartItem from './cartItem'
import BookingError from '../../opd/patientDetails/bookingErrorPopUp'
const queryString = require('query-string');
import STORAGE from '../../../helpers/storage'
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm';
import BookingConfirmationPopup from '../../diagnosis/bookingSummary/BookingConfirmationPopup.js'
import PaymentForm from '../paymentForm'

class CartView extends React.Component {
    constructor(props) {

        const parsed = queryString.parse(props.location.search)

        super(props)
        this.state = {
            use_wallet: true,
            error: parsed.error_message || "",
            showConfirmationPopup:false,
            paymentData: null,
            isMatrix:parsed.is_matrix
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    closeErrorPopup = () => {
        this.setState({ error: '' })
    }

    toggleWalletUse(e) {
        this.setState({ use_wallet: e.target.checked })
    }

    getPriceBreakup(cart_items) {
        if (!cart_items) {
            cart_items = []
        }
        let total_mrp = 0
        let total_deal_price = 0
        let total_home_pickup_charges = 0
        let total_coupon_discount = 0
        let total_coupon_cashback = 0
        let coupon_breakup = {}
        let cashback_breakup = {}
        let platformConvFees = 0
        let total_amnt = 0
        let dd = 0
        for (let item of cart_items) {
            if (item.valid && item.actual_data.payment_type == 1) {
                

                //For Insured Appointments Do not add deal price to Amount Payable
                if(item.actual_data.is_appointment_insured){

                }else{
                    total_mrp += item.mrp
                    if(item.consultation && item.consultation.fees == 0){
                        dd = item.mrp
                    }else{
                        dd = item.mrp - item.deal_price
                    }
                    console.log('dd='+dd)
                    total_deal_price += dd
                    console.log(total_deal_price)
                    // total_deal_price += item.deal_price  
                    total_home_pickup_charges += item.home_pickup_charges || 0
                    if (item.data.coupons && item.data.coupons.length) {
                        total_coupon_discount += item.coupon_discount
                        total_coupon_cashback += item.coupon_cashback
                        if (item.coupon_cashback <= 0) {
                            if (coupon_breakup[item.data.coupons[0].code]) {
                                coupon_breakup[item.data.coupons[0].code] += item.coupon_discount
                            } else {
                                coupon_breakup[item.data.coupons[0].code] = item.coupon_discount
                            }
                        } else {
                            if (cashback_breakup[item.data.coupons[0].code]) {
                                cashback_breakup[item.data.coupons[0].code] += item.coupon_cashback
                            } else {
                                cashback_breakup[item.data.coupons[0].code] = item.coupon_cashback
                            }
                        }
                    }
                    if(item.consultation && item.consultation.fees == 0){
                        platformConvFees += parseInt(item.deal_price)
                    }
                }

            }
        }
        total_amnt = total_mrp - total_deal_price + platformConvFees - total_coupon_discount + total_home_pickup_charges
        return {
            total_mrp,
            total_deal_price,
            total_home_pickup_charges,
            total_coupon_discount,
            total_coupon_cashback,
            coupon_breakup,
            cashback_breakup,
            platformConvFees,
            total_amnt
        }
    }

    processCart(total_price,is_selected_user_insurance_status) {

        if(is_selected_user_insurance_status && is_selected_user_insurance_status == 4){
            SnackBar.show({ pos: 'bottom-center', text: "Your documents from the last claim are under verification.Please write to customercare@docprime.com for more information." });
            window.scrollTo(0, 0)
            return
        }

        if(!this.state.showConfirmationPopup && total_price == 0){
            this.setState({showConfirmationPopup:true})
            return
        }
        this.props.processCartItems(this.state.use_wallet).then((data) => {
            if (data.payment_required) {
                // this.props.history.push(`/payment/${data.data.orderId}?refs=lab`)
                this.processPayment(data)
            } else {
                this.props.history.replace(`/order/summary/${data.data.orderId}`)
            }
        }).catch((e) => {
            let error_message 
                if(e.error){
                    error_message = e.error
                }else{
                    error_message = "Error Processing cart"
                }
            if(e.message){
                error_message = e.message
            }
            SnackBar.show({ pos: 'bottom-center', text: error_message });
        })

        let data = {
            'Category': 'ConsumerApp', 'Action': 'continueToPay', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'continue-to-pay'
        }

        GTM.sendEvent({ data: data })
    }

    getBookingButtonText(total_wallet_balance, price_to_pay) {
        let price_from_wallet = 0
        let price_from_pg = 0

        if (this.state.use_wallet && total_wallet_balance) {
            price_from_wallet = Math.min(total_wallet_balance, price_to_pay)
        }

        price_from_pg = price_to_pay - price_from_wallet

        if (price_from_pg) {
            return `Continue to pay (₹ ${price_from_pg})`
        }

        return `Confirm Booking`
    }

    sendAgentBookingURL() {
        this.props.sendAgentBookingURL(null, 'sms', '',(err, res) => {
            if (err) {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SEND ERROR" })
            } else {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SENT SUCCESSFULY" })
            }
        })
    }

    priceConfirmationPopup(choice){
        if(!choice){
            this.setState({showConfirmationPopup:choice})
        }else{
            this.setState({showConfirmationPopup:''})
            if(document.getElementById('confirm_booking')){
                document.getElementById('confirm_booking').click()
            }
        }
    }
    
    processPayment(data) {
        if (data && data.status) {
            this.setState({ paymentData: data.data }, () => {
                setTimeout(()=>{
                    if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
                        let form = document.getElementById('paymentForm')
                        form.submit()
                    }
                },500)
            })
        }
    }

    render() {

        let { cart } = this.props
        let {
            total_mrp,
            total_deal_price,
            total_home_pickup_charges,
            total_coupon_discount,
            total_coupon_cashback,
            coupon_breakup,
            cashback_breakup,
            platformConvFees,
            total_amnt
        } = this.getPriceBreakup(cart)

        let total_wallet_balance = 0
        if (this.props.userWalletBalance >= 0 && this.props.userCashbackBalance >= 0) {
            total_wallet_balance = this.props.userWalletBalance + this.props.userCashbackBalance
        }
        
        let invalid_items = false
        let valid_items = false
        let all_appointments_insured = true
        let is_cod_applicable = true
        let is_platform_conv_fees = 0
        let is_default_user_insured = false
        let is_selected_user_insurance_status
        if (Object.keys(this.props.profiles).length > 0 && this.props.defaultProfile && this.props.profiles[this.props.defaultProfile]) {
            is_default_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
            is_selected_user_insurance_status = this.props.profiles[this.props.defaultProfile].insurance_status
        }


        if (cart && cart.length) {
            cart.map((cart_item, i) => {
                if (!cart_item.valid) {
                    invalid_items = true
                } else {
                    valid_items = true
                    if(cart_item.actual_data && !cart_item.actual_data.is_appointment_insured){
                        all_appointments_insured = false
                    }
                    if(cart_item.consultation && cart_item.consultation.fees == 0 && cart_item.actual_data.payment_type == 1){
                        is_platform_conv_fees++
                    }
                    //Check if COD applicable for all appointments
                    if( cart_item.actual_data && cart_item.actual_data.payment_type && cart_item.actual_data.payment_type!=2 ){
                        is_cod_applicable = false
                    }
                }
            })
        }
        is_cod_applicable = is_cod_applicable && cart && cart.length && cart.filter(x => x.valid).length==1
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                {
                    this.state.showConfirmationPopup && is_selected_user_insurance_status !=4?
                    <BookingConfirmationPopup priceConfirmationPopup={this.priceConfirmationPopup.bind(this)}/>
                    :''
                }
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div>
                                {
                                    cart && cart.length ? <section className="dr-profile-screen booking-confirm-screen">
                                        <div className="container-fluid">
                                            <div className="row mrb-20">
                                                <div className="col-12">

                                                    {
                                                        invalid_items ? <h4 className="cart-warnig-icon-text"><img style={{ width: '20px' }} src={ASSETS_BASE_URL + "/img/capaWarning.png"} />
                                                            <span>
                                                                {cart.filter(x => !x.valid).length} appointment{cart.filter(x => !x.valid).length > 1 ? "s" : ''} in your cart have become invalid. Please Edit/Remove {cart.filter(x => !x.valid).length > 1 ? "them" : 'it'}.
                                                        </span></h4> : ""
                                                    }

                                                    <h4 className="shoping-cart-main-heading">My Cart</h4>

                                                    {
                                                        cart.filter(x => x.valid).map((cart_item, i) => {
                                                            return <CartItem key={i + "v"} {...this.props} {...cart_item} />
                                                        })
                                                    }

                                                    {
                                                        invalid_items ? <h4 className="shoping-cart-main-heading">Invalid Items</h4> : ""
                                                    }

                                                    {
                                                        cart.filter(x => !x.valid).map((cart_item, i) => {
                                                            return <CartItem key={i + "iv"} {...this.props} {...cart_item} />
                                                        })
                                                    }


                                                    {
                                                        valid_items ? <div className="widget mrb-15">
                                                            <div className="widget-content">
                                                                <h4 className="title mb-20">Payment Summary</h4>
                                                                {
                                                                    parseInt(total_mrp)?

                                                                    <div className="payment-summary-content">
                                                                        <div className="payment-detail d-flex">
                                                                            <p>Total Fees</p>
                                                                            <p>&#8377; {parseInt(total_mrp)}</p>
                                                                        </div>
                                                                        {
                                                                            is_platform_conv_fees>0?
                                                                            <div className="payment-detail d-flex">
                                                                                <p>Platform Convenience Fee</p>
                                                                                <p>&#8377; {parseInt(platformConvFees)}</p>
                                                                            </div>
                                                                            :''
                                                                        }
                                                                        {total_deal_price !=0 && total_mrp !=total_deal_price?
                                                                            <div className="payment-detail d-flex">
                                                                                <p>Docprime Discount</p>
                                                                                <p>- &#8377; {parseInt(total_deal_price)}</p>
                                                                            </div>
                                                                        :''}

                                                                        {
                                                                            total_home_pickup_charges ? <div className="payment-detail d-flex">
                                                                                <p>Home pickup charges</p>
                                                                                <p>+ &#8377; {parseInt(total_home_pickup_charges)}</p>
                                                                            </div> : ""
                                                                        }

                                                                        {
                                                                            total_coupon_discount ? <div>
                                                                                {
                                                                                    Object.keys(coupon_breakup).map((cp, j) => {
                                                                                        return <div className="payment-detail d-flex" key={j}>
                                                                                            <p style={{ color: 'green' }}>Coupon Discount ({cp})</p>
                                                                                            <p style={{ color: 'green' }}>-&#8377; {coupon_breakup[cp]}</p>
                                                                                        </div>
                                                                                    })
                                                                                }
                                                                            </div> : ''
                                                                        }

                                                                    </div>
                                                                    :''
                                                                }
                                                                <hr />


                                                                <div className="test-report payment-detail mt-20">
                                                                    <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                    <h5 className="payment-amt-value">&#8377; {total_amnt}</h5>
                                                                </div>

                                                                {
                                                                    total_coupon_cashback ? <div className="csh-back-applied-container">
                                                                        {
                                                                            Object.keys(cashback_breakup).map((key, i) => {
                                                                                return <p key={i} className="csh-mny-applied">+ &#8377; {cashback_breakup[key]} Cashback Applied ({key})</p>
                                                                            })
                                                                        }
                                                                        <p className="csh-mny-applied-content">Cashback will be added to your docprime wallet balance on appointment completion</p>
                                                                    </div> : ""
                                                                }

                                                            </div>
                                                        </div> : ""
                                                    }


                                                    {
                                                        !all_appointments_insured && valid_items && total_wallet_balance && total_wallet_balance > 0 ? <div className="widget mrb-15">
                                                            <div className="widget-content">
                                                                <div className="select-pt-form">
                                                                    <div className="referral-select">
                                                                        <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Use docprime wallet money<input type="checkbox" onChange={this.toggleWalletUse.bind(this)} checked={this.state.use_wallet} /><span className="checkmark"></span></label>
                                                                        <span className="rfrl-avl-balance">Available <img style={{ width: '9px', marginTop: '4px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} />{total_wallet_balance}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : ""
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        {
                                            ( (STORAGE.isAgent() && is_cod_applicable) || !STORAGE.isAgent() ) && !this.state.isMatrix && valid_items ? 
                                            <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container">
                                                <button className="add-shpng-cart-btn" onClick={() => {
                                                    this.props.history.push('/search?from=cart');

                                                    let data = {
                                                        'Category': 'ConsumerApp', 'Action': 'addMoreToCart', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'add-more-to-cart'
                                                    }
                                                    GTM.sendEvent({ data: data });

                                                }}>Add more to cart</button>
                                                <button className="v-btn-primary book-btn-mrgn-adjust" id="confirm_booking" onClick={this.processCart.bind(this, total_amnt,is_selected_user_insurance_status)}>{this.getBookingButtonText(total_wallet_balance, total_amnt)}</button>
                                            </div> : ""
                                        }

                                        {
                                            (STORAGE.isAgent() || this.state.isMatrix) && !is_cod_applicable ? <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container">
                                                <button className="add-shpng-cart-btn" onClick={this.sendAgentBookingURL.bind(this)}>Send SMS EMAIL</button>
                                            </div> : ""
                                        }

                                        {
                                            this.state.error ? <BookingError heading={"Transaction Error"} message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                                        }


                                    </section> : <div className="container-fluid">
                                            <div className="norf widget" style={{ marginTop: '10px', height: '69vh' }}>
                                                {
                                                    cart == null ? "" : <div className="text-center">
                                                        <img style={{ width: '150px' }} src={ASSETS_BASE_URL + "/img/emptyCart1.png"} />
                                                        <p className="emptyCardText">Your Cart is Empty!</p>
                                                        <button onClick={() => { this.props.history.push('/search') }} className="emptyCartRedirect">Book Appointments Now</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        <RightBar noChatButton={true} />
                    </div>
                </section>
                {
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='lab'/> : ""
                }
            </div >
        );
    }
}


export default CartView
