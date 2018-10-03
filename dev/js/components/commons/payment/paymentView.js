import React from 'react';

import PaymentForm from '../../commons/paymentForm'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'

class PaymentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPayment: "DC",
            paymentData: {},
            paymentEnabled: false
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        let orderId = this.props.match.params.id
        this.props.fetchPgData(orderId, (err, data) => {
            if (data && data.status) {
                this.setState({ paymentEnabled: true, paymentData: data.data })
            }
        })
    }

    selectPaymentType(e) {
        this.setState({ selectedPayment: e.target.value })
    }

    proceed() {

        let data = {
            'Category':'ConsumerApp','Action':'ContinueClicked','CustomerID':GTM.getUserId()||'','leadid':0,'event':'continue-clicked'}

        GTM.sendEvent({ data: data })

        let form = document.getElementById('paymentForm')
        form.submit()
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {/* <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <ul className="inline-list">
                                                <li onClick={() => {
                                                    this.props.history.go(-1)
                                                }}><span className="icon icon-sm text-middle back-icon-white"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-center">Select Payment Method</div>
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            <section className="booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="widget mrt-10">
                                                <div className="widget-content">
                                                    <ul className="list payment-method">
                                                        <li>
                                                            <label htmlFor="pay" className="paytm-label"> <img src={ASSETS_BASE_URL + "/img/customer-icons/paytm-logo.png"} className="img-fluid" /> Paytm</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'PPI'} value="PPI" className="radio-inline" name="gender" id="pay" /></span>
                                                        </li>
                                                        {/* <li id="oneclick-label">
                                                            <label htmlFor="click"> <img src={ASSETS_BASE_URL + "/img/customer-icons/oneclick-payment.png"} className="img-fluid" id="click-icon" /> One Click Pay</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == ''} value="" className="radio-inline" name="gender" id="click"/></span>
                                                        </li> */}
                                                        <li>
                                                            <label htmlFor="NB"> <img src={ASSETS_BASE_URL + "/img/customer-icons/i-banking.svg"} className="img-fluid" /> Internet Banking</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'NB'} value="NB" className="radio-inline" name="gender" id="NB" /></span>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="CC"> <img src={ASSETS_BASE_URL + "/img/customer-icons/credit-card.svg"} className="img-fluid" /> Credit Card</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'CC'} value="CC" className="radio-inline" name="gender" id="CC" /></span>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="DC"> <img src={ASSETS_BASE_URL + "/img/customer-icons/debit-card.svg"} className="img-fluid" /> Debit Card</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'DC'} value="DC" className="radio-inline" name="gender" id="DC" /></span>
                                                        </li>
                                                        {/* <li>
                                                            <label htmlFor="cdc"> <img src={ASSETS_BASE_URL + "/img/customer-icons/capa-1.jpg"} className="img-fluid" /> Pay in Cash</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == ''} value="" className="radio-inline" name="gender" id="cdc" /></span>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <PaymentForm paymentData={this.state.paymentData} mode={this.state.selectedPayment} />

                            <button onClick={this.proceed.bind(this)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" disabled={!this.state.paymentEnabled}>Continue</button>

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );
    }
}


export default PaymentView
