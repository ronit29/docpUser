import React from 'react';

import PaymentForm from '../../commons/paymentForm'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import Lightbox from '../../../helpers/lightbox';

const queryString = require('query-string');

const images = [
    ASSETS_BASE_URL + "/img/customer-icons/image2-min.jpg",
    ASSETS_BASE_URL + "/img/customer-icons/image1-min.jpg",
    ASSETS_BASE_URL + "/img/customer-icons/image3-min.jpg",
];
class PaymentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPayment: "",
            paymentData: {},
            paymentEnabled: false,
            photoIndex: 0,
            isOpen: false,
            gateway: '',
            mode: '',
            payment_options: []
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

        this.props.fetchPaymentOptions((err, data)=> {
            if(data){
                let selectedPayment = data.filter(x=>x.is_selected)
                this.setState({payment_options: data, selectedPayment: selectedPayment.length?selectedPayment[0].action:'', gateway: selectedPayment.length?selectedPayment[0].payment_gateway:'', mode:selectedPayment.length?selectedPayment[0].action:''})
            }
        })
    }

    selectPaymentType(e) {
        let gateway = 'paytm';
        let mode = '';
        if (e.target.dataset && e.target.dataset.gateway) {
            gateway = e.target.dataset.gateway
        }
        if (e.target.dataset && e.target.dataset.mode) {
            mode = e.target.dataset.mode
        }
        this.setState({ selectedPayment: e.target.value, gateway, mode })
    }

    proceed() {
        const parsed = queryString.parse(window.location.search)

        if (parsed.refs) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ContinueClicked', 'pageSource': parsed.refs, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'continue-clicked'
            }

            GTM.sendEvent({ data: data })

        } else {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ContinueClicked', 'pageSource': 'UNKNOWN', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'continue-clicked'
            }

            GTM.sendEvent({ data: data })
        }

        let form = document.getElementById('paymentForm')
        if (this.state.mode != '') {
            form.submit()
        }
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        let totalAmount = ''
        if (this.state.paymentData && this.state.paymentData.txAmount) {
            totalAmount = parseInt(this.state.paymentData.txAmount);
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
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
                                                        {
                                                            this.state.payment_options.map((paymentType, key) => {
                                                            
                                                                return <li key={key} style={{ position: 'relative' }}>
                                                                    <label htmlFor={`S{paymentType.action}_${paymentType.payment_gateway}`} className="paytm-label"> <img src={paymentType.image} className="img-fluid" /> {paymentType.name}
                                                                    </label>
                                                                    {
                                                                        totalAmount && totalAmount >= 100 ?
                                                                            <span className="fw-500" style={{ position: 'absolute', color: 'green', fontSize: 12, top: 35, left: 74 }}>{paymentType.description}</span> : ''
                                                                    }
                                                                    <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={!!(this.state.selectedPayment == paymentType.action && this.state.gateway == paymentType.payment_gateway)} value={paymentType.action} className="radio-inline" name="gender" id={`S{paymentType.action}_${paymentType.payment_gateway}`} data-mode={paymentType.action} data-gateway={paymentType.payment_gateway}/></span>
                                                                </li>        
                                                            })
                                                        }
                                                        
                                                        {/* <li id="oneclick-label">
                                                            <label htmlFor="click"> <img src={ASSETS_BASE_URL + "/img/customer-icons/oneclick-payment.png"} className="img-fluid" id="click-icon" /> One Click Pay</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == ''} value="" className="radio-inline" name="gender" id="click"/></span>
                                                        </li> 
                                                        <li>
                                                            <label htmlFor="NB"> <img src={ASSETS_BASE_URL + "/img/customer-icons/i-banking.svg"} className="img-fluid" /> Internet Banking</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'NB'} value="NB" className="radio-inline" name="gender" id="NB" data-mode="NB" /></span>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="CC"> <img src={ASSETS_BASE_URL + "/img/customer-icons/credit-card.svg"} className="img-fluid" /> Credit Card</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'CC'} value="CC" className="radio-inline" name="gender" id="CC" data-mode="CC" /></span>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="DC"> <img src={ASSETS_BASE_URL + "/img/customer-icons/debit-card.svg"} className="img-fluid" /> Debit Card</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'DC'} value="DC" className="radio-inline" name="gender" id="DC" data-mode="DC" /></span>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="AP"> <img src={ASSETS_BASE_URL + "/img/customer-icons/amazon_pay.png"} className="img-fluid" /> Amazon Pay</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'AP'} value="AP" className="radio-inline" name="gender" id="AP" data-gateway="payu" data-mode="PPI" /></span>
                                                        </li>
                                                        {/* <li>
                                                            <label htmlFor="AP"> <img src={ASSETS_BASE_URL + "/img/customer-icons/ola_money.png"} className="img-fluid" /> Ola Money</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == 'OM'} value="OM" className="radio-inline" name="gender" id="OM" data-gateway="olamoney" data-mode="PPI" /></span>
                                                        </li> */
                                                        /* <li>
                                                            <label htmlFor="cdc"> <img src={ASSETS_BASE_URL + "/img/customer-icons/capa-1.jpg"} className="img-fluid" /> Pay in Cash</label>
                                                            <span className="float-right"><input type="radio" onChange={this.selectPaymentType.bind(this)} checked={this.state.selectedPayment == ''} value="" className="radio-inline" name="gender" id="cdc" /></span>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="widget mt-21">
                                                <div className="widget-content p-3">
                                                    <div className="crdblty-container">
                                                        <div className="crdblty">
                                                            <img className="crdblty-img" src={ASSETS_BASE_URL + "/img/customer-icons/group-98.png"} />
                                                            <p className="trst-txt">Trust docprime!</p>
                                                        </div>
                                                        <ul className="rsk-lstng ptmnt-lst">
                                                            <li className="lst-bfr">100% money back guarantee -  No questions! </li>
                                                            <li className="lst-bfr">Part of Policybazaar group valued at over $1 billion :</li>
                                                        </ul>

                                                        <h4 className="md-coverage">Media Coverage</h4>
                                                        <div className="row">
                                                            <div className="col-4 text-center">
                                                                <div className="">
                                                                    <img onClick={() => this.setState({ isOpen: true, photoIndex: 0 })} className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/image2-min.jpg"} />
                                                                    {isOpen && (
                                                                        <Lightbox
                                                                            mainSrc={images[photoIndex]}
                                                                            nextSrc={images[(photoIndex + 1) % images.length]}
                                                                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                                                            onMovePrevRequest={() =>
                                                                                this.setState({
                                                                                    photoIndex: (photoIndex + images.length - 1) % images.length,
                                                                                })
                                                                            }
                                                                            onMoveNextRequest={() =>
                                                                                this.setState({
                                                                                    photoIndex: (photoIndex + 1) % images.length,
                                                                                })
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-4 text-center">
                                                                <div className="">
                                                                    <img onClick={() => this.setState({ isOpen: true, photoIndex: 1 })} className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/image1-min.jpg"} />

                                                                </div>
                                                            </div>

                                                            <div className="col-4 text-center">
                                                                <div className="">
                                                                    <img onClick={() => this.setState({ isOpen: true, photoIndex: 2 })} className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/image3-min.jpg"} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <PaymentForm paymentData={this.state.paymentData} mode={this.state.mode} gateway={this.state.gateway} />

                            <button onClick={this.proceed.bind(this)} className="p-2 v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" disabled={!this.state.paymentEnabled}>Continue</button>

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" noChatButton={true} />
                    </div>
                </section>
            </div>
        );
    }
}


export default PaymentView
