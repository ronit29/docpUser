import React from 'react';
import GTM from '../../../helpers/gtm.js'

class FixedMobileFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    navigateTo(where, type, e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (type) {
            this.props.selectSearchType(type)
        }
        this.props.history.push(where)
    }

    render() {
        return (
            <div className="mobileViewStaticChat d-md-none">
                <div className="nw-chat-card">
                    <div className="chat-div-containers" style={this.props.selectedSearchType === 'opd' || this.props.selectedSearchType === 'procedures' ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookDoctorsClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-doctors-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/search?from=home', 'opd')
                    }}>
                        <div className="nw-img-with-content">
                            <img width="22px" src={ASSETS_BASE_URL + "/img/general2.svg"} />
                        </div>
                        <span>Book Doctors</span>
                    </div>

                    <div className="chat-div-containers" style={this.props.selectedSearchType === 'lab' ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookTestClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-test-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/insurance/insurance-plans')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: '20px' }} className="opdUpico" src={ASSETS_BASE_URL + "/img/opdNewIco.png"} />
                        </div>
                        <span>OPD Insurance</span>
                        <p className="opdNewShow">New</p>
                    </div>

                    <div className="chat-div-containers" style={{ width: "36%" }} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterChatClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-chat-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/mobileviewchat')
                    }}>
                        <img className="footbgRound" src={ASSETS_BASE_URL + "/img/chatFoot_new.svg"} />
                        <div className="nw-mid-container-with-img" style={{ zIndex: '1', color: 'white' }}>
                            <span style={{ fontSize: 11 }}>Free Online</span>
                            <div className="">
                                <img style={{ width: 30, position:'relative', top: '-5px' }} src={ASSETS_BASE_URL + "/img/chatbt_new.svg"} />
                            </div>
                            <span style={{ fontSize: 11 }}>Doctor Consult</span>
                        </div>
                    </div>
                    <div className="chat-div-containers" style={this.props.searchPackagePage ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookPackageClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-package-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/searchpackages')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: '24px' }} src={ASSETS_BASE_URL + "/img/lab2.svg"} />
                        </div>
                        <span>Health Packages</span>
                    </div>
                    <div className="chat-div-containers" style={this.props.offersPage ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterOffersClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-offers-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/offers')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: 22 }} src={ASSETS_BASE_URL + "/img/offers.svg"} />
                        </div>
                        <span>View Offers</span>
                    </div>
                </div>
                <div className="nw-cht-border-btn"></div>
            </div>
        )
    }
}

export default FixedMobileFooter