import React from 'react';

import Transactions from './transactions'
import Loader from '../Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

class WalletView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            openWithdraw: false
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    toggleWithdraw() {
        this.setState({ openWithdraw: !this.state.openWithdraw })
    }

    refund() {
        this.setState({ loading: true })
        this.props.refundWallet((err, data) => {
            this.setState({ loading: false, openWithdraw: false })
        })
    }

    render() {

        let { userWalletBalance, userTransactions, userCashbackBalance } = this.props

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {
                                this.state.loading ? <Loader /> : <div className="container-fluid  new-profile-header-margin">

                                    <div className="widget mt-20">
                                        <div className="widget-content">
                                            <div className="wallet-cashback-container">
                                                <p className="csh-wallet-bal">Wallet Balance</p>
                                                <span className="csh-wallet-val">₹ {userWalletBalance + userCashbackBalance}</span>
                                                <div className="cashback-balacne-val">
                                                    <p className="csh-rfnd-text">Refundable Balance : <span>₹ {userWalletBalance}</span></p>
                                                    {userWalletBalance > 0 ? <span onClick={this.toggleWithdraw.bind(this)} className="cashback-withdraw">Withdraw</span> : ""}

                                                </div>
                                                <div className="cashback-balacne-val">
                                                    <p className="csh-rfnd-text">Promotional Balance : <span>₹ {userCashbackBalance}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            userTransactions && userTransactions.length ? <div className="cashback-transactions-section">

                                                <h4 className="csh-trns-heading">
                                                    Transactions
                                                </h4>

                                                {
                                                    userTransactions.map((transaction, i) => {
                                                        return <Transactions key={i} {...this.props} data={transaction} />
                                                    })
                                                }


                                            </div> : ""
                                        }


                                    </div>

                                    {
                                        this.state.openWithdraw ? <div>
                                            <div className="cancel-overlay" onClick={this.toggleWithdraw.bind(this)}></div>
                                            <div className="widget cancel-appointment-div cancel-popup">
                                                <div className="widget-header text-center action-screen-header">
                                                    <p className="fw-500 cancel-appointment-head">Withdraw Balance</p>
                                                    <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={this.toggleWithdraw.bind(this)} />
                                                    <hr />
                                                </div>
                                                <div className="" style={{ padding: '0px 15px' }}>
                                                    <p className="popUp-contetn">
                                                        Your balance of <b>₹ {userWalletBalance}</b> will be credited to you in 5-7 working days
                                                    </p>
                                                    <button className="PopUp-Btn" onClick={this.refund.bind(this)}>Confirm</button>
                                                </div>
                                            </div>
                                        </div> : ""
                                    }


                                    {/* <div className="widget mb-10">
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
                                    </div> */}

                                </div>
                            }

                        </div>
                        <RightBar noChatButton={true} />
                    </div>
                </section>
                <Disclaimer />
            </div >
        );
    }
}


export default WalletView
