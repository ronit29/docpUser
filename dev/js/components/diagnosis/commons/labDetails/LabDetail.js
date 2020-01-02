import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import LabTests from '../labTests'
import RatingProfileCard from '../../../commons/ratingsProfileView/RatingProfileCard.js'
import { buildOpenBanner } from '../../../../helpers/utils.js'
import RatingReviewView from '../../../commons/ratingsProfileView/ratingReviewView.js'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'

class LabDetails extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

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

    downloadButton(data) {
        let gtmTrack = {
            'Category': 'ConsumerApp', 'Action': 'DownloadAppButtonClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'download-app-button-clicked', 'starts_with': data.starts_with ? data.starts_with : '', 'ends_with': data.ends_with ? data.ends_with : '',
            'device': this.props.device_info
        }
        GTM.sendEvent({ data: gtmTrack })
        if (window) {
            window.open(data.URL, '_self')
        }
    }

    openTests() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'UserSelectingAddRemoveLabTests', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'user-selecting-add-remove-lab-tests'
        }
        GTM.sendEvent({ data: data })
        if (this.props.seoFriendly) {
            this.props.history.push(`${window.location.pathname}/booking?lab_id=${this.props.data.lab.id}&action_page=tests`)
        } else {
            this.props.history.push(`/lab/${this.props.data.lab.id}/tests`)
        }
    }

    render() {

        let { about, address, lab_image, lat, long, name, primary_mobile, city, sublocality, locality, lab_thumbnail } = this.props.data.lab
        let { lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data, total_test_count } = this.props.data

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

        return (
            <section className="profile-book-screen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
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
                            {this.props.data.lab.unrated_appointment ? <RatingProfileCard {...this.props} details={this.props.data.lab.unrated_appointment} /> : ""}

                            <div className="widget mrb-15">
                                <div className="widget-header pb-header text-center">
                                    <div className="pb-logo">
                                        <InitialsPicture name={name} has_image={!!lab_thumbnail} className="initialsPicture-lp">
                                            <img src={lab_thumbnail} className="img-fluid" />
                                        </InitialsPicture>
                                    </div>
                                    {
                                        name && name.toLowerCase().includes('thyrocare') ?
                                            <h1 className="widget-title pb-title">{name.split('-')[0]}</h1>
                                            :
                                            <h1 className="widget-title pb-title">{name}</h1>
                                    }
                                    {
                                        name && name.toLowerCase().includes('thyrocare') ?
                                            ''
                                            :
                                            <p className="location text-black">{locality} {city}</p>
                                    }
                                    {/* <span className="ct-img ct-img-xs">
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker.svg"} className="img-fluid" />
                                    </span> */}
                                    <ul className="list time-contact">
                                        <li className="uTimingPara">
                                            <span className="fw-700 text-sm">Timing: </span>
                                            {buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}
                                        </li>
                                        {/* <li>
                                            <span className="fw-700 text-sm">Contact: -</span>
                                            {primary_mobile}
                                            <span className="open-close">{" Call Now"}</span>
                                        </li> */}
                                    </ul>
                                    {/* {
                                        STORAGE.isAgent() || (!this.props.hide_price && !this.props.is_user_insured) ?
                                            this.props.location && this.props.location.search && this.props.location.search.includes('from=insurance_network') ? "" :
                                                <div className="serch-nw-inputs mb-0" onClick={this.openTests.bind(this)}>
                                                    <input type="text" autoComplete="off" className="d-block clkInput new-srch-doc-lab" id="search_bar" value="" placeholder="Search more Tests" />
                                                    <img className="srch-inp-img" src="https://cdn.docprime.com/cp/assets/img/shape-srch.svg" style={{ width: '15px' }} />
                                                </div> : ''
                                    } */}
                                </div>
                                {
                                    // STORAGE.isAgent() || (!this.props.hide_price && !this.props.is_user_insured) ?
                                    //         this.props.location && this.props.location.search && this.props.location.search.includes('from=insurance_network') ? "" :
                                    // <div className="lb-viewmore">
                                    //     {
                                    //         !this.props.is_vip_applicable && !this.props.is_covered_under_gold true && <p onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">{`View all ${total_test_count?total_test_count:''} tests `}<img src={ASSETS_BASE_URL + '/images/right_arrow.png'}/></p>
                                    //     }
                                    // </div>
                                    // : ''
                                }

                                {
                                    this.props.is_user_vip && !this.props.is_user_gold_vip?''
                                    :<div className="lb-viewmore">
                                        <p onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">{`View all ${total_test_count?total_test_count:''} tests `}<img src={ASSETS_BASE_URL + '/images/right_arrow.png'}/></p>
                                    </div>
                                }
                                <LabTests {...this.props} />

                                {/* <div className="widget-content pb-details pb-facility">
                                    <h4 className="wc-title text-md fw-700">Facility</h4>
                                    <ul className="list pb-list facilty-list">
                                        <li>Parking Available</li>
                                        <li>Card Accepted</li>
                                        <li>E Report Available</li>
                                        <li>Home Chekup Available</li>
                                    </ul>
                                </div> */}

                                {/*this.props.data.lab.display_rating_widget ?
                                    <div className="widget-panel">
                                        <h4 className="panel-title mb-rmv">Patient Feedback<a className="rateViewAll"><span onClick={() => this.props.history.push(`/view-all-ratings?content_type=1&id=` + this.props.data.lab.id)}>View All</span></a></h4>

                                        <div className="panel-content pd-0 border-bottom-panel">
                                            <RatingGraph details={this.props.data.lab} />
                                            <div className="user-satisfaction-section">
                                                <div className="row">
                                                    {this.props.data.lab.rating_graph ? this.props.data.lab.rating_graph.top_compliments.map(compliment =>
                                                        <ComplimentListView key={compliment.id} details={compliment} />
                                                    ) : <span></span>}
                                                </div>
                                            </div>
                                            <ReviewList details={this.props.data.lab} />
                                        </div>
                                    </div> : ""*/}
                            </div>
                            <div className="widget mrb-15">
                                <div className="widget-content pb-details pb-location">
                                    <h4 className="wc-title text-md fw-700">Location</h4>
                                    <div className="address-details">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} className="link-text text-md fw-700" target="_blank">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid add-map" />
                                        </a>
                                        <p className="add-info">{address}</p>
                                    </div>
                                    <div className="pb-view text-left">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} className="link-text text-md fw-700 view-in-map" target="_blank">View in Google Map</a>
                                    </div>
                                </div>
                            </div>
                            {
                                this.props.data.lab.display_rating_widget ?
                                    <RatingReviewView id={this.props.data.lab.id} content_type={1} {...this.props} /> :
                                    ""
                            }
                            <div className="widget mrb-15">
                                <div className="widget-content pb-details pb-about">
                                    <h4 className="wc-title text-md fw-700">About</h4>
                                    <p>{about}
                                    </p>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default LabDetails
