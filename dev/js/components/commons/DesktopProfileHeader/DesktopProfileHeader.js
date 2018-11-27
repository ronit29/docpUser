import React from 'react';
import InitialsPicture from '../initialsPicture'
import GTM from '../../../helpers/gtm'

class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headerButtonsState: false,
            medicinePopup: false
        }
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    toggleHeaderButtons() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'SearchButtonClickedMobile', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'search-button-clicked-mobile'
        }
        GTM.sendEvent({ data: data })
        this.setState({ headerButtonsState: !this.state.headerButtonsState, medicinePopup: false })
    }

    goToLocation() {
        let redirect_to = ""
        if (window.location.pathname.includes('sptcit') || window.location.pathname.includes('sptlitcit')) {
            redirect_to = "/opd/searchresults"
        }

        if (window.location.pathname.includes('lbcit') || window.location.pathname.includes('lblitcit')) {
            redirect_to = "/lab/searchresults"
        }

        let location_url = '/locationsearch'
        if (redirect_to) {
            location_url += `?redirect_to=${redirect_to}`
        }
        this.props.history.push(location_url)
    }

    render() {

        let profileData = this.props.profiles[this.props.defaultProfile]
        let styles = {}
        // if (this.props.homePage) {
        //     styles = { display: 'block' }
        // }

        let location = "Delhi"
        if (this.props.selectedLocation) {
            location = this.props.selectedLocation.formatted_address.slice(0, 10)
        }

        return (
            <header className={this.props.homePage ? "doc-header header-relative" : "doc-header header-overflow"} style={styles}>
                <div className="ofr-top-header">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="d-none">
                                <span className="top-head-link" onClick={() => this.props.history.push('/doctorsignup')}>Add your clinic or hospital</span>
                                <span className="top-head-link-divider">|</span>
                                <span className="top-head-link" onClick={() => this.props.history.push('/doctorsignup')}>Add your lab</span>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <span className="top-head-text">A group company of </span>
                                <img src={ASSETS_BASE_URL + "/img/pb-logo-window.svg"} style={{ width: 120 }} />
                                {/* <img className="pb-img-size pb-mbl" src={ASSETS_BASE_URL + "/img/pb-logo.png"} /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="smiley-img-div">
                    <img src={ASSETS_BASE_URL + "/img/customer-icons/smiley.png"} />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-4 align-items-center pr-0" onClick={() => {
                            this.props.history.push('/')
                        }}>
                            <a className="logo-ancher" href="/" onClick={(e) => e.preventDefault()}>
                                <img className="logo-size" src={ASSETS_BASE_URL + "/img/doc-logo.svg"} alt="docprime" />
                            </a>
                            {/* <p className="d-none d-md-inline-block d-lg-inline-block lgo-text">Family Doctor <span>for Life</span></p> */}
                        </div>
                        <div className="col-lg-9 col-md-8 col-8 d-none d-lg-block ml-auto text-right pl-0">
                            <div className="head-links" onClick={() => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'BookDoctorVisitClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'book-doctor-visit-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/opd')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/doc.svg"} />
                                <span>Book Doctor</span>
                            </div>
                            <div className="head-links" onClick={() => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'BookMedicalTestClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'book-medical-test-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/lab')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/flask.svg"} />
                                <span>Book Test</span>
                            </div>
                                {/*<div className="head-links" onClick={() => {
                                    let data = {
                                        'Category': 'ConsumerApp', 'Action': 'BookDentalTreatmentClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'book-dental-treatment-clicked'
                                    }
                                    GTM.sendEvent({ data: data })
                                    this.props.history.push('/procedure')
                                }}>
                                    <img style={{ width: '17px' }} src={ASSETS_BASE_URL + "/img/customer-icons/white-teeth.svg"} />
                                    <span>Book Dental Treatment</span>
                                </div>*/}
                            <div className="head-links">
                                <div className="head-dropdowns">
                                    <img style={{ height: 20, width: 18 }} src={ASSETS_BASE_URL + "/img/articals.svg"} />
                                    <span>Articles</span>
                                    <ul className="list-sub-menu">
                                        <li><a href="/all-medicines" onClick={(e) => {
                                            e.preventDefault();
                                            this.props.history.push("/all-medicines")
                                        }}>All Medicines</a></li>
                                        {/* <li><a href="javascript:void(0);">All Articles</a></li> */}
                                        <li><a href="/all-diseases" onClick={(e) => {
                                            e.preventDefault();
                                            this.props.history.push("/all-diseases")
                                        }}>All Diseases</a></li>
                                    </ul>
                                </div>
                            </div>

                            {
                                profileData ? <div className="head-links">
                                    <div className="head-links" onClick={() => {
                                        this.props.history.push('/user')
                                    }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                        <span className="username-overflow">{profileData.name}</span>
                                    </div>
                                    <div className="head-links" onClick={() => {
                                        this.props.history.push('/notifications')
                                    }}>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/bell-white.svg"} style={{ width: 16 }} /><span>Notifications</span>
                                        {
                                            this.props.newNotification > 0 ? <span className="notification-alert-desktop">{this.props.newNotification}</span> : ""
                                        }
                                    </div>
                                </div> : <div className="head-links" onClick={() => {
                                    this.props.homePage ? this.props.history.push('/user?ref=home') : this.props.history.push('/user')
                                }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                        <span>Login</span>
                                    </div>
                            }

                            <div className="head-links location-item" onClick={() => {
                                this.goToLocation()
                            }}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/location-white.svg"} style={{ marginRight: 0, width: 12 }} />
                                <span className="header-loc-text">{location}</span>
                                {/* <img src={ASSETS_BASE_URL + "/images/edit.svg"} /> */}
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-8 ml-auto text-right d-lg-none pl-0">
                            <div className="head-links">
                                <img width={19} src={ASSETS_BASE_URL + "/img/articals.svg"} onClick={(e) => { this.setState({ medicinePopup: !this.state.medicinePopup, headerButtonsState: false }) }} />
                            </div>
                            <div className="head-links" onClick={this.toggleHeaderButtons.bind(this)}>
                                <img width={19} src={ASSETS_BASE_URL + "/images/search.svg"} />
                            </div>
                            {
                                profileData ? <div className="head-links" onClick={() => {
                                    this.props.history.push('/user')
                                }}>
                                    {/* <InitialsPicture name={profileData.name} has_image={!!profileData.profile_image} className="initialsPicture img-fluid hed-usr-img" style={{ fontSize: 14, position: 'relative' }} notificationNew={this.props.newNotification > 0 ? true : false}>
                                        <img src={profileData.profile_image} className="img-fluid hed-usr-img" />
                                    </InitialsPicture> */}
                                    <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                </div> : <div className="head-links" onClick={() => {
                                    this.props.homePage ? this.props.history.push('/user?ref=home') :
                                        this.props.history.push('/user')
                                }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                    </div>
                            }
                            <div className="head-links location-item" onClick={() => {
                                this.goToLocation()
                            }}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/location-white.svg"} style={{ marginRight: 0, width: 12 }} />
                                <span className="header-loc-text">{location}</span>
                                {/* <img src={ASSETS_BASE_URL + "/images/edit.svg"} /> */}
                            </div>
                        </div>

                    </div>

                    {
                        this.state.headerButtonsState ? <div className="search-show  d-lg-none">
                            <div className="head-links" onClick={() => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'BookDoctorVisitClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'book-doctor-visit-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/opd')
                            }}>
                                <div className="mbl-view-drop-img"><img src={ASSETS_BASE_URL + "/images/doc.svg"} /></div>
                                <span>Book Doctor</span>
                            </div>
                            <div className="head-links" onClick={() => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'BookMedicalTestClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'book-medical-test-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/lab')
                            }}>
                                <div className="mbl-view-drop-img"><img src={ASSETS_BASE_URL + "/images/flask.svg"} /></div>
                                <span>Book Test</span>
                            </div>
                            {/*<div className="head-links" onClick={() => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'BookDentalTreatmentClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'book-dental-treatment-clicked'
                                }
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/procedure')
                            }}>
                                <div className="mbl-view-drop-img"><img style={{ width: '17px' }} src={ASSETS_BASE_URL + "/img/customer-icons/white-teeth.svg"} /></div>
                                <span>Book Dental Treatment</span>
                            </div>*/}
                        </div> : ""
                    }
                    {
                        this.state.medicinePopup ?
                            <div className="search-show art-padding d-lg-none">
                                <a className="article-list border-rgt" href="/all-medicines" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.history.push("/all-medicines")
                                }}>
                                    <span>All Medicines</span>
                                </a>
                                {/* <div className="article-list mid-border">
                                <span>All Articles</span>
                            </div> */}
                                <a className="article-list" href="/all-diseases" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.history.push("/all-diseases")
                                }}>
                                    <span>All Diseases</span>
                                </a>
                            </div>
                            : ''

                    }

                </div>
            </header>
        );
    }
}

export default DesktopProfileHeader
