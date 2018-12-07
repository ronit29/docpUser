import React from 'react';

import LabDetails from '../commons/labDetails/index.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'
import Footer from '../../commons/Home/footer'

class LabView extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            footerData,
            seoFriendly: this.props.match.url.includes('-lpp')
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }
    }

    bookLab() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabBookingClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-booking-clicked'
        }
        GTM.sendEvent({ data: data })

        let testIds = this.props.LABS[this.props.selectedLab] || []

        testIds = testIds.tests.map(x => x.test_id)

        this.props.getLabById(this.props.selectedLab, testIds)

        this.props.history.push(`/lab/${this.props.selectedLab}/book`)
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {

        let lab_id = this.props.selectedLab
        if (this.props.initialServerData && this.props.initialServerData.labId) {
            lab_id = this.props.initialServerData.labId
        }
        return (
            <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {/* <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="header-title fw-700 capitalize text-white">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li>
                                                        <span className="ct-img ct-img-sm arrow-img">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-white text-center">Lab Details</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }} >
                                            <div className="mobile-home-icon-div" >
                                                <img onClick={() => {
                                                    this.props.history.push('/')
                                                }} src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            {
                                (this.props.LABS[lab_id] && this.props.LABS[lab_id].tests) ?
                                    <div>

                                        <HelmetTags tagsData={{
                                            title: this.getMetaTagsData(this.props.LABS[lab_id].lab.seo).title,
                                            description: this.getMetaTagsData(this.props.LABS[lab_id].lab.seo).description,
                                            canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
                                        }} noIndex={!this.state.seoFriendly} />

                                        <LabDetails {...this.props} data={this.props.LABS[lab_id]} />

                                        <button disabled={
                                            this.props.currentLabSelectedTests.filter(x=>x.is_selected).length < 1
                                        } onClick={this.bookLab.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn"><span className="text-xs selected-option static-btn" style={{ verticalAlign: 2, marginRight: 8 }}>({this.props.currentLabSelectedTests.filter(x=>x.is_selected).length} Selected) </span>Book
                                        </button>

                                    </div> : <Loader />
                            }

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>

                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default LabView
