import React from 'react';

import Transactions from './transactions'

class WalletView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="body-wrap">

                <div className="modal-overlay" />
                <div className="wallet-confirmation-modal">
                    <div className="confirmation-head-div">
                        <p className="confirmation-head fw-500">Confirmation</p>
                    </div>
                    <div className="confirmation-msg-div">
                        <p className="confirmation-msg fw-500">Your payment will be reflected in 5-8 days in your back account.</p>
                        <p className="confirmation-msg fw-500">Confirm refund?</p>
                    </div>
                    <div className="confirmation-btn-div">
                        <p className="confirmation-btn fw-500">CANCEL</p>
                        <p className="confirmation-btn fw-500">CONFIRM</p>
                    </div>
                </div>
                
                <header className="wallet-header">
                    <div className="container-fluid">
                        <div className="row header-row">
                            <div className="col-3">
                                <img src="/assets/img/icons/back-orange.svg" className="back-icon-orange" />
                            </div>
                            <div className="col-6 logo-col">
                                <img src="/assets/img/icons/logo.png" className="wallet-logo" />
                                <p className="wallet-title fw-500">WALLET</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="col-12 col-md-10 col-lg-6">
                    <div className="container-fluid main-container">

                        <div className="row refund-info-row">
                            <div className="col-12 balance-info-col">
                                <img src="/assets/img/icons/rupee-black.svg" className="rupee-icon" />
                                <p className="current-balance fw-500">00.00</p>
                            </div>
                            <div className="col-12">
                                <div className="refund-status bg-grey">
                                    <p className="refund-status-text fw-500">Refund Initiated</p>
                                </div>
                            </div>
                            <div className="col-12 refund-info-text-col">
                                <p className="refund-info-text fw-500">It will take around 2-4 working days to get your balance reflected in your account</p>
                            </div>
                            <div className="col-12">
                                <div className="remaining-time-div">
                                    <p className="remaining-time">23 hrs 59 mins</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="refund-text-info">
                                    <p className="refund-info-text fw-500">You could use this money to book appoinments with Doctors or Diagnostic Centers</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="row">
                            <div className="col-12 transactions-head-col">
                                <p className="transactions-head fw-500">Transactions</p>
                            </div>
                        </div>

                        <Transactions />
                        <Transactions />
                        <Transactions />
                        <Transactions />
                        <Transactions />
                        <Transactions />

                    </div>
                </div>
            </div>
        );
    }
}


export default WalletView
