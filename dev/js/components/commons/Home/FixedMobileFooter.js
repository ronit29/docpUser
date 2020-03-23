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
            <div className={`mobileViewStaticChat d-none d-md-none ${hide_footer ? 'd-none' : this.props.hideFooter ? 'smth-ftr-scrl' : ''}`}>
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

                    {/*<div className="chat-div-containers" onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterChatClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-chat-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/mobileviewchat')
                    }}>
                        <div className="nw-img-with-content">
                            <img style={{ width: '22px' }} src={ASSETS_BASE_URL + "/img/vip-doc.svg"} />
                        </div>
                        <span>Online Consultation</span>
                    </div>*/}
                    <div className="chat-div-containers" style={this.props.selectedSearchType === 'lab' ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
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
                        </div>

                    {/*<div className="chat-div-containers" style={{ width: "36%", paddingTop: 0 }} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterVipClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-vip-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/vip-club-details?source=mobile-footer-vip-clicked&lead_source=Docprime')
                    }}>
                        <img className="footbgRound" src={ASSETS_BASE_URL + "/img/chatFoot_newP_vip.svg"} />
                        <div className="nw-mid-container-with-img">
                            <div className="vip-foot-cont">
                                 <img style={{ width: 40 }} src={ASSETS_BASE_URL + "/img/viplog.png"} />
                            </div>
                            
                            <p className="vip-foot-txt">Save Upto 70%</p>
                        </div>
                    </div>*/}

                    <div className="chat-div-containers" style={{ width: "36%", paddingTop: 0 }} onClick={() => {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'MobileFooterGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'mobile-footer-gold-clicked'
                        }
                        GTM.sendEvent({ data: data })
                        this.navigateTo('/vip-gold-details?is_gold=true&source=mobile-footer-gold-clicked&lead_source=Docprime')
                    }}>
                        {/* <img className="footbgRound" src={ASSETS_BASE_URL + "/img/chatFoot_newP_vip.svg"} /> */}
                        <object className="footsvground">
                            <svg width="122pt" height="50pt" viewBox="0 0 148 71" version="1.1">
                                <defs>
                                    <image id="image12" width="148" height="71" href="data:image/png;base64,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" />
                                    <linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="0" y1="0.70711" x2="0.70711" y2="0" gradientTransform="matrix(142.640625,0,0,66.261719,2.078125,0.640625)">
                                        <stop offset="0" className="foot-strt"  />
                                        <stop offset="1" className="foot-end" />
                                    </linearGradient>
                                </defs>
                                <g id="surface1">
                                    <path className="fot" d="M 47.867188 0.640625 L 98.878906 0.640625 C 109.621094 0.640625 113.792969 6.117188 113.792969 16.882812 L 121.574219 53.257812 C 121.574219 58.0625 128.242188 63.078125 134.734375 63.363281 C 142.925781 63.71875 149.390625 66.640625 141.027344 66.253906 L 4.421875 66.902344 C -2.101562 66.902344 6.214844 64.160156 14.636719 62.597656 C 19.761719 61.644531 24.523438 57.488281 24.523438 53.257812 L 31.65625 16.234375 C 31.65625 5.46875 37.125 0.640625 47.867188 0.640625 Z M 47.867188 0.640625 " />
                                </g>
                            </svg>


                        </object>
                        <div className="nw-mid-container-with-img">
                            <div className="vip-foot-cont">
                                {/* <img style={{ width: 28 }} src={ASSETS_BASE_URL + "/img/chatbt_new.svg"} /> */}
                                {/* <img style={{ width: 28 }} src={ASSETS_BASE_URL + "/img/chatbt_new.svg"} /> */}
                                <img style={{ width: 50 }} src={ASSETS_BASE_URL + "/img/gold-lg.png"} />
                            </div>
                            {/* <p style={{ fontSize: 11 }}>Free Online</p>
                            <p style={{ fontSize: 11 }}>Doctor Consult</p> */}
                            <p className="vip-foot-txt">Exclusive <br />Discounts</p>
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
                    {
                        /*this.props.common_settings && this.props.common_settings.insurance_availability?
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
                        </div>*/
                    }
                    {<div className="chat-div-containers" style={this.props.offersPage ? { borderTop: '2px solid #1f62d3' } : {}} onClick={() => {
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
                    </div>}
                </div>
                <div className="nw-cht-border-btn"></div>
            </div >
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