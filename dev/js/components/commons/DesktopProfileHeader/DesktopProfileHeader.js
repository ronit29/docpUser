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

    openSearch() {
        let search_back = false
        if (this.props.location.state && this.props.location.state.search_back) {
            search_back = true
        }

        if (search_back) {
            this.props.history.go(-1)
        } else {
            this.props.history.push('/search')
        }
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

        let headerClass = "doc-header header-overflow"

        if (this.props.homePage) {
            headerClass = "doc-header header-relative"
        }

        if (!this.props.showSearch) {
            headerClass += " remove-header-height"
        }

        let hideSearch = false
        if (this.props.history.location.pathname == '/search') {
            hideSearch = true
        }

        return (
            <header className={headerClass} style={styles}>

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
                                <img className="logo-size d-none d-lg-block" src={ASSETS_BASE_URL + "/img/doc-logo.svg"} alt="docprime" />
                                <img style={{ width: '45px', marginBottom: '5px' }} className="d-lg-none" src={ASSETS_BASE_URL + "/img/doc-logo-small.png"} alt="docprime" />
                            </a>
                        </div>


                        <div className="col-lg-9 col-md-8 col-8 d-none d-lg-block ml-auto text-right pl-0">
                            <div className="header-search-full-widht">
                                {/* <div className="head-links" onClick={() => {
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
                            </div> */}

                                {
                                    hideSearch ? "" : <div className="head-links hed-links-search-flex">
                                        <div className="serch-nw-inputs new-home-full-widht" onClick={this.openSearch.bind(this)}>
                                            <input className="new-srch-inp" placeholder="Search Doctors, Tests, & Procedures" id="doc-input-field" />
                                            <img style={{ width: '18px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                            <button style={{ paddingLeft: '0' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} /> {location}</button>
                                        </div>
                                    </div>
                                }


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
                                            <img src={ASSETS_BASE_URL + "/images/user-logged-in.png"} style={{ width: 24 }} />
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

                                {/* <div className="head-links location-item" onClick={() => {
                                this.goToLocation()
                            }}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/location-white.svg"} style={{ marginRight: 0, width: 12 }} />
                                <span className="header-loc-text">{location}</span>
                            </div> */}
                            </div>
                        </div>


                        <div className="col-lg-9 col-md-8 col-8 ml-auto text-right d-lg-none pl-0">
                            <div className="head-links">
                                <img width={19} src={ASSETS_BASE_URL + "/img/articals.svg"} onClick={(e) => { this.setState({ medicinePopup: !this.state.medicinePopup, headerButtonsState: false }) }} />
                            </div>
                            {
                                this.props.showSearch ? "" : <div className="head-links" onClick={this.openSearch.bind(this)}>
                                    <img width={19} src={ASSETS_BASE_URL + "/images/search.svg"} />
                                </div>
                            }

                            {
                                profileData ? <div className="head-links" onClick={() => {
                                    this.props.history.push('/user')
                                }}>
                                    {/* <InitialsPicture name={profileData.name} has_image={!!profileData.profile_image} className="initialsPicture img-fluid hed-usr-img" style={{ fontSize: 14, position: 'relative' }} notificationNew={this.props.newNotification > 0 ? true : false}>
                                        <img src={profileData.profile_image} className="img-fluid hed-usr-img" />
                                    </InitialsPicture> */}
                                    <img src={ASSETS_BASE_URL + "/images/user-logged-in.png"} style={{ width: 24 }} />
                                </div> : <div className="head-links" onClick={() => {
                                    this.props.homePage ? this.props.history.push('/user?ref=home') :
                                        this.props.history.push('/user')
                                }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                    </div>
                            }
                            {/* <div className="head-links location-item" onClick={() => {
                                this.goToLocation()
                            }}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/location-white.svg"} style={{ marginRight: 0, width: 12 }} />
                                <span className="header-loc-text">{location}</span>
                            </div> */}



                        </div>
                        <div className="col-12 d-lg-none">
                            {
                                this.props.showSearch ? <div className="serch-nw-inputs search-input-for-mobile" onClick={this.openSearch.bind(this)}>
                                    <input className="new-srch-inp" placeholder="Search Doctors, Tests & Procedures" id="doc-input-field" />
                                    <img style={{ width: '18px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                    <button style={{ paddingLeft: '0' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />{location}</button>
                                </div> : ""
                            }
                        </div>


                    </div>

                    {
                        this.state.medicinePopup ?
                            <div className="search-show art-padding d-lg-none">
                                <a className="article-list border-rgt" href="/all-medicines" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.history.push("/all-medicines")
                                }}>
                                    <span>All Medicines</span>
                                </a>

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
