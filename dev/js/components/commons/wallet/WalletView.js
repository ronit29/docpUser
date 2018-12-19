import React from 'react';

import Transactions from './transactions'
import Loader from '../Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class WalletView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    refund() {
        this.setState({ loading: true })
        this.props.refundWallet((err, data) => {
            this.setState({ loading: false })
        })
    }

    render() {

        let { userWalletBalance, userTransactions } = this.props

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {/* <header className="wallet-header sticky-header skin-primary">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2">
                                            <img src={ASSETS_BASE_URL + "/img/icons/back.png"} style={{ width: 20, marginTop: 4, cursor: 'pointer' }} className="img-fluid" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>
                                        <div className="col-8 logo-col">
                                            <p className="header-title fw-700 capitalize text-center text-white">My Transactions</p>
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            {
                                this.state.loading ? <Loader /> : <div className="container-fluid  new-profile-header-margin">
                                    <div className="widget">
                                        <div className="widget-content">
                                            <div className="row ">
                                                <div className="col-12 transactions-head-col text-center">
                                                    <p className="transactions-head">Total Credits</p>
                                                </div>
                                                <div className="col-12 balance-info-col">
                                                    <p className="current-balance fw-500">{userWalletBalance}</p>
                                                </div>
                                                <div className="col-12 credit-tip text-center">
                                                    <p>You could use this credit to book Appointments with Doctors or Diagnostic Centers</p>
                                                </div>
                                                {
                                                    (userWalletBalance > 0) ? <div className="refund-btn-div">
                                                        <button className="refund-btn" onClick={this.refund.bind(this)}>Refund</button>
                                                    </div> : ""
                                                }
                                                <div className="col-12 credit-tip text-center">
                                                    <p>You can refund manually else your money will be automatically refunded to your bank account in 24 hours</p>
                                                </div>
                                            </div>
                                            <p style={{
                                                position: 'absolute',
                                                bottom: -20,
                                                right: 10,
                                                fontSize: 12
                                            }}>1 credit = 1 Rupee</p>
                                            {/* <div className="row">
                                    <div className="col-12 transactions-head-col">
                                        <p className="transactions-head fw-500">Transactions</p>
                                    </div>
                                </div>

                                <Transactions />
                                <Transactions />
                                <Transactions />
                                <Transactions />
                                <Transactions /> */}

                                        </div>
                                    </div>
                                    <div className="widget mt-20">
                                        <div className="widget-content">
                                            <div className="wallet-cashback-container">
                                                <p className="csh-wallet-bal">Wallet Balance</p>
                                                <span className="csh-wallet-val">₹ 1,210</span>
                                                <div className="cashback-balacne-val">
                                                    <p className="csh-rfnd-text">Refundable Balance : <span>₹ 1,000</span></p>
                                                    <span className="cashback-withdraw">Withdraw</span>
                                                </div>
                                                <div className="cashback-balacne-val">
                                                    <p className="csh-rfnd-text">Pramotional Balance : <span>₹ 200</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cashback-transactions-section">

                                            <h4 className="csh-trns-heading">
                                                Transactions
                                                    </h4>
                                            <div className="cash-all-transaction">
                                                <h5 className="csh-heading-bg">17th December 2018</h5>
                                                <div className="csh-trns-data">
                                                    <div className="csh-content-with-img">
                                                        <img src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
                                                        <div className="csh-booking-id-content">
                                                            <p>Paid for Doctor Appointment</p>
                                                            <span>Booking id : 12345976RTBDP</span>
                                                        </div>
                                                    </div>
                                                    <span className="csh-trns-price"><b className="pls-sgn">+</b> ₹ 190</span>
                                                </div>
                                            </div>
                                            <div className="cash-all-transaction">
                                                <h5 className="csh-heading-bg">17th December 2018</h5>
                                                <div className="csh-trns-data">
                                                    <div className="csh-content-with-img">
                                                        <img src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
                                                        <div className="csh-booking-id-content">
                                                            <p>Paid for Doctor Appointment</p>
                                                            <span>Booking id : 12345976RTBDP</span>
                                                        </div>
                                                    </div>
                                                    <span className="csh-trns-price"><b className="pls-sgn">+</b> ₹ 190</span>
                                                </div>
                                            </div>
                                            <div className="cash-all-transaction">
                                                <h5 className="csh-heading-bg">17th December 2018</h5>
                                                <div className="csh-trns-data">
                                                    <div className="csh-content-with-img">
                                                        <img className="minus-img" src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
                                                        <div className="csh-booking-id-content">
                                                            <p>Paid for Doctor Appointment</p>
                                                            <span>Booking id : 12345976RTBDP</span>
                                                        </div>
                                                    </div>
                                                    <span className="csh-trns-price"><b className="mns-sgn">-</b> ₹ 190</span>
                                                </div>
                                            </div>
                                            <div className="cash-all-transaction">
                                                <h5 className="csh-heading-bg">17th December 2018</h5>
                                                <div className="csh-trns-data">
                                                    <div className="csh-content-with-img">
                                                        <img src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
                                                        <div className="csh-booking-id-content">
                                                            <p>Paid for Doctor Appointment</p>
                                                            <span>Booking id : 12345976RTBDP</span>
                                                        </div>
                                                    </div>
                                                    <span className="csh-trns-price"><b className="pls-sgn">+</b> ₹ 190</span>
                                                </div>
                                            </div>
                                            <div className="cash-all-transaction">
                                                <h5 className="csh-heading-bg">17th December 2018</h5>
                                                <div className="csh-trns-data">
                                                    <div className="csh-content-with-img">
                                                        <img src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
                                                        <div className="csh-booking-id-content">
                                                            <p>Paid for Doctor Appointment</p>
                                                            <span>Booking id : 12345976RTBDP</span>
                                                        </div>
                                                    </div>
                                                    <span className="csh-trns-price"><b className="pls-sgn">+</b> ₹ 190</span>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="widget mt-20 mb-10">
                                        <div className="widget-content">
                                            <h4 className="title mb-20">Payment Summary</h4>
                                            <div className="payment-summary-content">
                                                <div className="payment-detail d-flex">
                                                    <p>Subtotal</p>
                                                    <p>₹ 500</p>
                                                </div>
                                                <div className="payment-detail d-flex">
                                                    <p>docprime discount</p>
                                                    <p>- ₹ 250</p>
                                                </div>
                                                <div className="payment-detail d-flex">
                                                    <p style={{ color: 'green' }}>Coupon discount</p>
                                                    <p style={{ color: 'green' }}>-₹ 30</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="test-report payment-detail mt-20">
                                                <h4 className="title payment-amt-label">Amount Payable</h4>
                                                <h5 className="payment-amt-value">₹ 220</h5>
                                            </div>
                                            <div className="csh-back-applied-container">
                                                <p className="csh-mny-applied">+ Rs 100 Cashback Applied</p>
                                                <p className="csh-mny-applied-content">Cashback will be added to your docprime wallet balance on appointent completion</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget mb-10">
                                        <div className="common-search-container">
                                            <p className="srch-heading">
                                                Wallet</p>
                                            <div className="common-listing-cont">
                                                <ul>
                                                    <li className="align-items-center">
                                                        <p className="flex-1">
                                                            <span><img style={{ width: '45px' }} src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} /></span>
                                                            Paytm</p>
                                                        <span className="link-account-span">Link Account</span>
                                                    </li>
                                                    <li className="align-items-center">
                                                        <p className="flex-1">
                                                            <span><img style={{ width: '45px' }} src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} /></span>
                                                            Paytm</p>
                                                        <span className="link-account-span">Link Account</span>
                                                    </li>
                                                    <li className="align-items-center">
                                                        <p className="flex-1">
                                                            <span><img style={{ width: '45px' }} src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} /></span>
                                                            Paytm</p>
                                                        <span className="link-account-span">Link Account</span>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget mb-10">
                                        <div className="common-search-container">
                                            <p className="srch-heading">
                                                Online Paymeny</p>
                                            <div className="common-listing-cont">
                                                <ul>
                                                    <li className="align-items-center">
                                                        <p className="flex-1">
                                                            <span><img style={{ width: '45px' }} src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} /></span>
                                                            Netbanking</p>
                                                        <img style={{ width: '8px' }} src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} />
                                                    </li>
                                                    <li className="align-items-center">
                                                        <p className="flex-1">
                                                            <span><img style={{ width: '45px' }} src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} /></span>
                                                            Debit Card</p>
                                                        <img style={{ width: '8px' }} src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} />
                                                    </li>
                                                    <li className="align-items-center">
                                                        <p className="flex-1">
                                                            <span><img style={{ width: '45px' }} src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} /></span>
                                                            Credit Card</p>
                                                        <img style={{ width: '8px' }} src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} />
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }

                        </div>
                        <RightBar />
                    </div>
                </section>
            </div >
        );
    }
}


export default WalletView
