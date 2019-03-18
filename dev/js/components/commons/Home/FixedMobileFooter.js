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
                    <div className="chat-div-containers" style={this.props.selectedSearchType === 'opd' || this.props.selectedSearchType === 'procedures' ? { borderTop: '2px solid #f78631' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookDoctorsClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-doctors-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/search?from=home', 'opd')
                    }}>
                        <div className="nw-img-with-content">
                            <img width="22px" src={ASSETS_BASE_URL + "/img/general2.svg"} />
                        </div>
                        <span>Doctors</span>
                    </div>
                    <div className="chat-div-containers" style={this.props.selectedSearchType === 'lab' ? { borderTop: '2px solid #f78631' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookTestClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-test-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/search?from=home', 'lab')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: '26px' }} src={ASSETS_BASE_URL + "/img/flask2.svg"} />
                        </div>
                        <span>Lab Tests</span>
                    </div>
                    <div className="chat-div-containers" style={{ width: "36%" }} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterChatClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-chat-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/mobileviewchat')
                    }}>
                        <img className="footbgRound" src={ASSETS_BASE_URL + "/img/chatFoot.svg"} />
                        <div className="nw-mid-container-with-img" style={{ zIndex: '1', color: 'white' }}>
                            <span style={{ fontSize: 11 }}>Free Online</span>
                            <div className="">
                                <img style={{ width: 24 }} src={ASSETS_BASE_URL + "/img/chatbt.svg"} />
                            </div>
                            <span style={{ fontSize: 11 }}>Doctor Consult</span>
                        </div>
                    </div>
                    <div className="chat-div-containers" style={this.props.searchPackagePage ? { borderTop: '2px solid #f78631' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookPackageClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-package-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/searchpackages')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: '24px' }} src={ASSETS_BASE_URL + "/img/lab2.svg"} />
                        </div>
                        <span>Packages</span>
                    </div>
                    <div className="chat-div-containers" style={this.props.offersPage ? { borderTop: '2px solid #f78631' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterOffersClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-offers-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/offers')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: 22 }} src={ASSETS_BASE_URL + "/img/offers.svg"} />
                        </div>
                        <span>Offers</span>
                    </div>
                </div>
                <div className="nw-cht-border-btn"></div>
            </div>
        )
    }
}

export default FixedMobileFooter