import React from 'react';
import GTM from '../../../helpers/gtm.js'
import { connect } from 'react-redux';

import { getDownloadAppBannerList } from '../../../actions/index.js'


class FixedMobileFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        if (this.props.app_download_list && !this.props.app_download_list.length) {

            this.props.getDownloadAppBannerList((resp) => {
                if (resp && resp.length && resp[0].data) {
                    this.showDownloadAppWidget(resp[0].data)
                }
            })
        } else {
            this.showDownloadAppWidget(this.props.app_download_list)
        }

    }

    showDownloadAppWidget(dataList) {
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }

        let downloadAppButtonData = {}

        if (landing_page && dataList && dataList.length) {

            dataList.map((banner) => {
                if (banner.isenabled && (this.props.match.url.includes(banner.ends_with) || this.props.match.url.includes(banner.starts_with))) {
                    downloadAppButtonData = banner
                }
            })
        }


        if (Object.values(downloadAppButtonData).length) {

            let gtmTrack = {
                'Category': 'ConsumerApp', 'Action': 'DownloadAppButtonVisible', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'download-app-button-visible', 'starts_with': downloadAppButtonData.starts_with ? downloadAppButtonData.starts_with : '', 'ends_with': downloadAppButtonData.ends_with ? downloadAppButtonData.ends_with : '', 'device': this.props.device_info
            }
            GTM.sendEvent({ data: gtmTrack })
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

    downloadButton(data) {
        let gtmTrack = {
            'Category': 'ConsumerApp', 'Action': 'DownloadAppButtonClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'download-app-button-clicked', 'starts_with': data.starts_with ? data.starts_with : '', 'ends_with': data.ends_with ? data.ends_with : '', 'device': this.props.device_info
        }
        GTM.sendEvent({ data: gtmTrack })
        if (window) {
            window.open(data.URL, '_self')
        }
    }

    render() {
        // check if this was the landing page
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }

        let downloadAppButtonData = {}

        if (landing_page && this.props.app_download_list && this.props.app_download_list.length) {

            this.props.app_download_list.map((banner) => {
                if (banner.isenabled && (this.props.match.url.includes(banner.ends_with) || this.props.match.url.includes(banner.starts_with))) {
                    downloadAppButtonData = banner
                }
            })
        }
        let hide_footer = this.props.ipd_chat && this.props.ipd_chat.showIpdChat ? this.props.ipd_chat.showIpdChat : false
        return (
            <div className={`mobileViewStaticChat d-md-none ${hide_footer ? 'd-none' : ''}`}>
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

                    {
                        downloadAppButtonData && Object.values(downloadAppButtonData).length ?
                            <a className="downloadBtn" href="javascript:void(0);" onClick={this.downloadButton.bind(this, downloadAppButtonData)}>
                                <button className="dwnlAppBtn">
                                    {
                                        !this.props.device_info ? ''
                                            : (this.props.device_info.toLowerCase().includes('iphone') || this.props.device_info.toLowerCase().includes('ipad')) ?
                                                <img style={{ width: '13px', marginRight: '5px', marginTop: '-1px' }} src={ASSETS_BASE_URL + "/img/appl1.svg"} />
                                                : <img style={{ width: '13px', marginRight: '5px' }} src={ASSETS_BASE_URL + "/img/andr1.svg"} />
                                    }

                                    Download App</button>
                            </a>
                            : ''
                    }

                    {
                    this.props.common_settings && this.props.common_settings.insurance_availability?
                        <div className="chat-div-containers" style={this.props.selectedSearchType === 'lab' ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookTestClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-insurance-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/insurance/insurance-plans?source=mobile-footer-insurance-clicked')
                        }}>
                            <div className="nw-img-with-content">
                                <img style={{ width: '20px' }} className="opdUpico" src={ASSETS_BASE_URL + "/img/opdNewIco.svg"} />
                            </div>
                            <span>OPD Insurance</span>
                            {/* <p className="opdNewShow">New</p> */}
                        </div>
                    :<div className="chat-div-containers" style={this.props.selectedSearchType === 'lab' ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterBookDoctorsClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-book-doctors-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/search?from=home', 'lab')
                    }}>
                        <div className="nw-img-with-content">
                            <img width="22px" src={ASSETS_BASE_URL + "/img/flask.svg"} />
                        </div>
                        <span>Book Lab Tests</span>
                    </div>}

                    <div className="chat-div-containers" style={{ width: "36%", paddingTop: 0 }} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterChatClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-chat-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/mobileviewchat')
                    }}>
                        {/* <img className="footbgRound" src={ASSETS_BASE_URL + "/img/chatFoot_new.svg"} /> */}
                        <div className="nw-mid-container-with-img">
                            <div>
                                <img style={{ width: 28 }} src={ASSETS_BASE_URL + "/img/chatbt_new.svg"} />
                            </div>
                            <p style={{ fontSize: 11 }}>Free Online</p>
                            <p style={{ fontSize: 11 }}>Doctor Consult</p>
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

const mapStateToProps = (state) => {
    const {
        app_download_list,
        device_info,
        ipd_chat
    } = state.USER
    return {
        app_download_list,
        device_info,
        ipd_chat
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getDownloadAppBannerList: (cb) => dispatch(getDownloadAppBannerList(cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FixedMobileFooter)