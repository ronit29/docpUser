import React from 'react';

import LabDetails from '../commons/labDetails/index.js'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'

class LabView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    bookLab() {
        let data = {
        'Category':'ConsumerApp','Action':'LabBookingClicked','CustomerID':GTM.getUserId()||'','leadid':0,'event':'lab-booking-clicked'}
        GTM.sendEvent({ data: data })

        this.props.history.push(`/lab/${this.state.selectedLab}/book`)
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
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
                                (this.props.LABS[this.state.selectedLab] && this.props.LABS[this.state.selectedLab].tests) ?
                                    <div>

                                        <LabDetails {...this.props} data={this.props.LABS[this.state.selectedLab]} />

                                        <button disabled={
                                            this.props.LABS[this.state.selectedLab].tests.length < 1
                                        } onClick={this.bookLab.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn"><span className="text-xs selected-option sticky-btn" style={{ verticalAlign: 2, marginRight: 8 }}>({this.props.LABS[this.state.selectedLab].tests.length} Selected) </span>Book
                                        </button>

                                    </div> : <Loader />
                            }

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );
    }
}

export default LabView
