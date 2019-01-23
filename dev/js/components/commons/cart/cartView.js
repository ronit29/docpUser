import React from 'react';

import Loader from '../Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CartItem from './cartItem'

class CartView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            use_wallet: true
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    toggleWalletUse(e) {
        this.setState({ use_wallet: e.target.checked })
    }

    getPriceBreakup(cart_items) {
        let total_mrp = 0
        let total_deal_price = 0
        let total_home_pickup_charges = 0
        let total_coupon_discount = 0
        let total_coupon_cashback = 0
        let coupon_breakup = []
        for (let item of cart_items) {
            if (item.valid) {
                total_mrp += item.mrp
                total_deal_price += item.deal_price
                total_home_pickup_charges += item.total_home_pickup_charges || 0
                if (item.data.coupons && item.data.coupons.length) {
                    total_coupon_discount += item.coupon_discount
                    total_coupon_cashback += item.coupon_cashback
                    coupon_breakup.push({
                        code: item.data.coupons[0].code,
                        value: item.coupon_discount
                    })
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
        }
    }

    processCart() {
        this.props.processCartItems().then((data) => {
            if (data.payment_required) {
                this.props.history.push(`/payment/${data.data.orderId}?refs=lab`)
            } else {
                this.props.history.replace(`/user/appointments`)
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
        } = this.getPriceBreakup(cart)

        let total_wallet_balance = 0
        if (this.props.userWalletBalance >= 0 && this.props.userCashbackBalance >= 0) {
            total_wallet_balance = this.props.userWalletBalance + this.props.userCashbackBalance
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
                                                    <h4 className="shoping-cart-main-heading">My Cart</h4>
                                                    {
                                                        cart.map((cart_item, i) => {
                                                            return <CartItem key={i} {...this.props} {...cart_item} />
                                                        })
                                                    }
                                                    <div className="widget mrb-15">
                                                        <div className="widget-content">
                                                            <h4 className="title mb-20">Payment Summary</h4>
                                                            <div className="payment-summary-content">
                                                                <div className="payment-detail d-flex">
                                                                    <p>Total fees</p>
                                                                    <p>&#8377; {parseInt(total_mrp)}</p>
                                                                </div>
                                                                <div className="payment-detail d-flex">
                                                                    <p>docprime discount</p>
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
                                                                        {coupon_breakup.map((cp, j) => {
                                                                            return <div className="payment-detail d-flex">
                                                                                <p style={{ color: 'green' }}>Coupon Discount ({cp.code})</p>
                                                                                <p style={{ color: 'green' }}>-&#8377; {cp.value}</p>
                                                                            </div>
                                                                        })}
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
                                                                    <p className="csh-mny-applied">+ &#8377; {total_coupon_cashback} Cashback Applied</p>
                                                                    <p className="csh-mny-applied-content">Cashback will be added to your docprime wallet balance on appointment completion</p>
                                                                </div> : ""
                                                            }

                                                        </div>
                                                    </div>

                                                    {
                                                        total_wallet_balance && total_wallet_balance > 0 ? <div className="widget mrb-15">
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

                                        <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container">
                                            <button className="add-shpng-cart-btn" onClick={() => {
                                                this.props.history.push('/search?from=cart')
                                            }}>Continue Booking</button>
                                            <button className="v-btn-primary book-btn-mrgn-adjust" onClick={this.processCart.bind(this)}>{this.getBookingButtonText(total_wallet_balance, total_deal_price - total_coupon_discount)}</button>
                                        </div>

                                    </section> : ""
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
