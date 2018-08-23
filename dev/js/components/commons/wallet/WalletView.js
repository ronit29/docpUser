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
                <section className="container parent-section book-appointment-section">
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
                                this.state.loading ? <Loader /> : <div className="container-fluid transaction-column">
                                    <div className="row refund-info-row">
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
