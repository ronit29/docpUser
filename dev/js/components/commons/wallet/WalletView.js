import React from 'react';

import Transactions from './transactions'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class WalletView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let { user_wallet_balance, user_transactions } = this.props

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column transaction-column">

                            <header className="wallet-header sticky-header">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2">
                                            <img src="/assets/img/icons/back-orange.svg" className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>
                                        <div className="col-8 logo-col">
                                            <p className="wallet-title fw-500">Transaction Summary</p>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <div className="container-fluid">
                                <div className="row refund-info-row">
                                    <div className="col-12 transactions-head-col text-center">
                                        <p className="transactions-head">Total Credits</p>
                                    </div>
                                    <div className="col-12 balance-info-col">
                                        <p className="current-balance fw-500">{user_wallet_balance}</p>
                                    </div>
                                    <div className="col-12 credit-tip text-center">
                                        <p>You could use this credit to book Appointments with Doctors or Diagnostic Centers</p>
                                        <p>1 credit = 1 Rupee</p>
                                    </div>
                                    <div className="refund-btn-div">
                                        <button className="refund-btn">Refund</button>
                                    </div>
                                    <div className="col-12 credit-tip text-center">
                                        <p>You can refund manually else your money will be automatically refunded to your bank account in 24 hours</p>
                                    </div>
                                </div>
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
                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default WalletView
