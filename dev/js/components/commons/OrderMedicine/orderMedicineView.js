import React from 'react';
import DesktopProfileHeader from '../DesktopProfileHeader';
import Footer from '../Home/footer'
import RightBar from '../RightBar';
import BookingConfirmationPopup from '../../diagnosis/bookingSummary/BookingConfirmationPopup';
import GTM from '../../../helpers/gtm';
import CONFIG from '../../../config/config';
import Loader from '../Loader';

class OrderMedicineView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopup: false,
            clickedOn: ''
        }
    }

    componentDidMount() {
        let sessionId = sessionStorage.getItem('iFrameId')
        if (!sessionId) {
            this.props.iFrameState('', true)
        }
    }

    orderMedicineClick(source) {
        this.setState({ showPopup: true, clickedOn: source }, () => {
            setTimeout(() => this.continueClick(), 1000);
        })
        if (source === 'newOrder') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'OrderPageNewOrderClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'order-page-new-order-click'
            }
            GTM.sendEvent({ data: data })
        }
        else if (source === 'prevOrder') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'OrderPagePreviousOrderClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'orde-page-previous-order-click'
            }
            GTM.sendEvent({ data: data })
        }
    }

    continueClick() {
        // if (this.state.clickedOn === 'newOrder') {
        //     let data = {
        //         'Category': 'ConsumerApp', 'Action': 'OrderPageContinueClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'order-page-continue-click'
        //     }
        //     GTM.sendEvent({ data: data })
        // }
        // else if (this.state.clickedOn === 'prevOrder') {
        //     let data = {
        //         'Category': 'ConsumerApp', 'Action': 'OrderPagePreviousOrderClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'order-page-previous-order-click'
        //     }
        //     GTM.sendEvent({ data: data })
        // }

        if (typeof navigator === 'object') {
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (/mobile/i.test(navigator.userAgent) && !isSafari) {
                this.props.iFrameState(this.props.location.pathname, false)
                sessionStorage.setItem('iFrameId', 1);
            }
            else {
                if (this.state.clickedOn === 'newOrder') {
                    window.open(CONFIG.PHARMEASY_NEW_ORDER_IFRAME_URL, '_blank')
                }
                else {
                    window.open(CONFIG.PHARMEASY_PREV_ORDER_IFRAME_URL, '_blank')
                }
            }
        }

        setTimeout(() => {
            this.setState({
                showPopup: false
            })
        }, 1000)
    }

    hidePopup() {
        this.setState({ showPopup: false })
    }

    render() {
        let showIframe = false
        if (this.props.iFrameUrls.includes(this.props.location.pathname)) {
            showIframe = true
        }

        let sessionId = sessionStorage.getItem('iFrameId')
        return (

            <div className="profile-body-wrap" style={{ backgroundColor: '#fff' }}>
                <DesktopProfileHeader />
                {
                    showIframe && sessionId ?
                        <iframe src={this.state.clickedOn === 'newOrder' ? `${CONFIG.PHARMEASY_NEW_ORDER_IFRAME_URL}` : `${CONFIG.PHARMEASY_PREV_ORDER_IFRAME_URL}`} className="pharmeasy-iframe"></iframe>
                        :
                        <React.Fragment>
                            <section className="container container-top-margin">
                                {/* {
                                    this.state.showPopup ?
                                        <BookingConfirmationPopup continueClick={() => this.continueClick()} iFramePopup={true} hidePopup={() => this.hidePopup()} /> : ''
                                } */}
                                {
                                    this.state.showPopup ?
                                        <Loader iFramePopup={true} /> : ''
                                }
                                <div className="row main-row parent-section-row">
                                    <div className="col-12 col-md-7 col-lg-7 center-column">
                                        <div className="container-fluid main-container">
                                            <div className="row art-search-row">
                                                <div className="col-12 mrt-20">
                                                    <p className="fw-500 mrb-20" style={{ fontSize: 16 }}>Order Medicines</p>
                                                </div>
                                                <div className="col-12">
                                                    <div className="order-widget d-flex align-items-center" onClick={() => this.orderMedicineClick('newOrder')}>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/new-order.svg'} className="order-med-img" />
                                                        <p className="fw-500 flex-1">New Order</p>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/arrow-forward-right.svg'} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="order-widget d-flex align-items-center" onClick={() => this.orderMedicineClick('prevOrder')}>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/prev-order.svg'} className="order-med-img" />
                                                        <p className="fw-500 flex-1">Previous Order</p>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/arrow-forward-right.svg'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RightBar msgTemplate="gold_general_template"/>
                                </div>
                            </section>
                            {
                                typeof navigator === 'object' && /mobile/i.test(navigator.userAgent) ?
                                    '' :
                                    <Footer />
                            }
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default OrderMedicineView