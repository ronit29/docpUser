import React from 'react';

import Loader from '../Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CartItem from './cartItem'
import BookingError from '../../opd/patientDetails/bookingErrorPopUp'
const queryString = require('query-string');

class CartView extends React.Component {
    constructor(props) {

        const parsed = queryString.parse(props.location.search)

        super(props)
        this.state = {
            use_wallet: true,
            error: parsed.error_message || ""
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
        for (let item of cart_items) {
            if (item.valid) {
                total_mrp += item.mrp
                total_deal_price += item.deal_price
                total_home_pickup_charges += item.total_home_pickup_charges || 0
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
            }
        }
        return {
            total_mrp,
            total_deal_price,
            total_home_pickup_charges,
            total_coupon_discount,
            total_coupon_cashback,
            coupon_breakup,
            cashback_breakup
        }
    }

    processCart() {
        this.props.processCartItems(this.state.use_wallet).then((data) => {
            if (data.payment_required) {
                this.props.history.push(`/payment/${data.data.orderId}?refs=lab`)
            } else {
                this.props.history.replace(`/order/summary/${data.data.orderId}`)
            }
        }).catch((e) => {
            SnackBar.show({ pos: 'bottom-center', text: "Error Processing cart" });
        })
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

    render() {

        let { cart } = this.props
        let {
            total_mrp,
            total_deal_price,
            total_home_pickup_charges,
            total_coupon_discount,
            total_coupon_cashback,
            coupon_breakup,
            cashback_breakup
        } = this.getPriceBreakup(cart)

        let total_wallet_balance = 0
        if (this.props.userWalletBalance >= 0 && this.props.userCashbackBalance >= 0) {
            total_wallet_balance = this.props.userWalletBalance + this.props.userCashbackBalance
        }

        let invalid_items = false
        let valid_items = false
        if (cart && cart.length) {
            cart.map((cart_item, i) => {
                if (!cart_item.valid) {
                    invalid_items = true
                } else {
                    valid_items = true
                }
            })
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
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
                                                                <div className="payment-summary-content">
                                                                    <div className="payment-detail d-flex">
                                                                        <p>Total Fees</p>
                                                                        <p>&#8377; {parseInt(total_mrp)}</p>
                                                                    </div>
                                                                    <div className="payment-detail d-flex">
                                                                        <p>Docprime Discount</p>
                                                                        <p>- &#8377; {parseInt(total_mrp) - parseInt(total_deal_price)}</p>
                                                                    </div>
                                                                    {
                                                                        total_home_pickup_charges ? <div className="payment-detail d-flex">
                                                                            <p>Home pickup charges</p>
                                                                            <p>- &#8377; {parseInt(total_home_pickup_charges)}</p>
                                                                        </div> : ""
                                                                    }

                                                                    {
                                                                        total_coupon_discount ? <div>
                                                                            {
                                                                                Object.keys(coupon_breakup).map((cp, j) => {
                                                                                    return <div className="payment-detail d-flex">
                                                                                        <p style={{ color: 'green' }}>Coupon Discount ({cp})</p>
                                                                                        <p style={{ color: 'green' }}>-&#8377; {coupon_breakup[cp]}</p>
                                                                                    </div>
                                                                                })
                                                                            }
                                                                        </div> : ''
                                                                    }

                                                                </div>
                                                                <hr />


                                                                <div className="test-report payment-detail mt-20">
                                                                    <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                    <h5 className="payment-amt-value">&#8377; {total_deal_price - total_coupon_discount}</h5>
                                                                </div>

                                                                {
                                                                    total_coupon_cashback ? <div className="csh-back-applied-container">
                                                                        {
                                                                            Object.keys(cashback_breakup).map((key, i) => {
                                                                                return <p className="csh-mny-applied">+ &#8377; {cashback_breakup[key]} Cashback Applied ({key})</p>
                                                                            })
                                                                        }
                                                                        <p className="csh-mny-applied-content">Cashback will be added to your docprime wallet balance on appointment completion</p>
                                                                    </div> : ""
                                                                }

                                                            </div>
                                                        </div> : ""
                                                    }


                                                    {
                                                        valid_items && total_wallet_balance && total_wallet_balance > 0 ? <div className="widget mrb-15">
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
                                            valid_items ? <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container">
                                                <button className="add-shpng-cart-btn" onClick={() => {
                                                    this.props.history.push('/search?from=cart')
                                                }}>Add more to cart</button>
                                                <button className="v-btn-primary book-btn-mrgn-adjust" onClick={this.processCart.bind(this)}>{this.getBookingButtonText(total_wallet_balance, total_deal_price - total_coupon_discount)}</button>
                                            </div> : ""
                                        }

                                        {
                                            this.state.error ? <BookingError heading={"Transaction Error"} message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                                        }


                                    </section> : <div className="container-fluid">
                                            <div className="norf widget" style={{ marginTop: '10px', height: '69vh' }}>
                                                {
                                                    cart == null ? "" : <div className="text-center">
                                                        <img style={{width: '150px'}} src={ASSETS_BASE_URL + "/img/emptyCart1.png"} />
                                                        <p className="emptyCardText">Your Cart is Empty!</p>
                                                        <button onClick={() => {this.props.history.push('/search')}} className="emptyCartRedirect">Book Appointments Now</button>
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
            </div >
        );
    }
}


export default CartView
