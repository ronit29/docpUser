import React from 'react';
import InitialsPicture from '../initialsPicture'
import GTM from '../../../helpers/gtm'
import LeftMenu from '../LeftMenu/LeftMenu.js'

class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headerButtonsState: false,
            medicinePopup: false,
            toggleHamburger: this.props.toggleLeftMenu || false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.toggleHamburger != nextProps.toggleLeftMenu) {
            this.setState({ toggleHamburger: nextProps.toggleLeftMenu }, () => {
                if (this.state.toggleHamburger) {
                    document.body.style.overflow = "hidden"
                } else {
                    document.body.style.overflow = ""
                }
            })
        }
    }

    navigateTo(where, type) {
        if (type) {
            this.props.selectSearchType(type)
        }
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
            this.props.history.push('/search?from=header')
        }
    }

    toggleLeftMenu() {
        this.props.toggleLeftMenuBar()
    }

    render() {
        console.log(this.props)
        let profileData = ''
        if (this.props.profiles && this.props.defaultProfile) {
            profileData = this.props.profiles[this.props.defaultProfile]
        }

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

        let cart_count = 0
        if (this.props.cart && this.props.cart.length) {
            cart_count = this.props.cart.length
        }

        return (
            <header id="is_header" className={headerClass} style={styles}>

                <div className={"ofr-top-header d-lg-block" + (!this.props.homePage ? " d-none" : "")}>
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="d-none">
                                <span className="top-head-link" onClick={() => this.props.history.push('/doctorsignup')}>Add your clinic or hospital</span>
                                <span className="top-head-link-divider">|</span>
                                <span className="top-head-link" onClick={() => this.props.history.push('/doctorsignup')}>Add your lab</span>
                            </div>
                            {/* <div className="head_text_container">
                                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/search?from=footer", 'opd')
                                        }}>Find Doctor</p>
                                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/search?from=footer", 'lab')
                                        }}>Lab Tests</p>
                                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo('/searchpackages')
                                        }}>Health Package</p>
                                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.props.history.push('/')
                                        }}>Online Consultation</p>
                                <p onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo('/contact')
                                        }}>Contact us</p>
                            </div> */}
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
                    {
                        this.state.toggleHamburger ?
                            <div className="cancel-overlay cl-overlay" onClick={(e) => {
                                e.stopPropagation()
                                this.toggleLeftMenu()
                            }}>
                            </div>
                            : ''
                    }

                    <LeftMenu {...this.props} {...this.state} toggleLeftMenu={this.toggleLeftMenu.bind(this)} />

                    <div className="row align-items-center">

                        <div className="col-lg-1 col-md-4 col-5 align-items-center pr-0" onClick={() => {
                            this.props.history.push('/')
                        }}>
                            <div className="ham-menu" onClick={(e) => {
                                e.stopPropagation()
                                document.body.style.overflow = "hidden"
                                this.toggleLeftMenu()
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/ic-hamburger.png"} alt="menu" />
                            </div>
                            <a className="logo-ancher logo-width-cut" href="/" onClick={(e) => e.preventDefault()}>
                                <img className="logo-size d-none d-lg-block" src={ASSETS_BASE_URL + "/img/doc-logo.svg"} alt="docprime" />
                                <img style={{ width: '45px', marginBottom: '5px' }} className="d-lg-none" src={ASSETS_BASE_URL + "/img/doc-logo-small.png"} alt="docprime" />
                            </a>
                        </div>


                        <div className="col-lg-11 col-md-8 col-8 d-none d-lg-block ml-auto text-right p-0 pl-0">
                            <div className="header-search-full-widht ml-20">
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
                                            <div className="header-serach-input-div">
                                                <span>Search Doctors &amp; Tests</span>
                                            </div>
                                            {/* <input className="new-srch-inp" placeholder="Search Doctors, Tests, & Procedures" id="doc-input-field" /> */}
                                            <img style={{ width: '18px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                            <button style={{ paddingLeft: '0', top: '0px' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} /> {location}</button>
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
                                <div className="head-links" onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo('/contact')
                                        }}>
                                    <img className="cart-icon-mbl" src={ASSETS_BASE_URL + "/img/call-header.png"} style={{ width: '18px' }} />
                                    <span>Contact Us</span>
                                </div>

                                {
                                    profileData ? <div className="head-links" onClick={() => {
                                        this.props.history.push('/cart')
                                    }}>
                                        <div className="p-relative">
                                            <img src={ASSETS_BASE_URL + "/images/cart-ico.svg"} style={{ width: 24 }} />
                                            {
                                                cart_count > 0 ? <span className="cart-count-notify">{cart_count}</span> : ""
                                            }
                                        </div>
                                        <span>Cart</span>
                                    </div> : ""
                                }

                            </div>
                        </div>


                        <div className="col-lg-9 col-md-8 col-7 ml-auto text-right d-lg-none pl-0">
                            {
                                this.props.showSearch ? "" : <div className="head-links" onClick={this.openSearch.bind(this)}>
                                    <img width={19} src={ASSETS_BASE_URL + "/images/search.svg"} />
                                </div>
                            }

                            <div className="head-links" onClick={() => {
                                this.props.history.push('/contact')
                            }}>
                                <img src={ASSETS_BASE_URL + "/img/call-header.png"} style={{ width: 22 }} />
                            </div>

                            <div className="head-links d-none">
                                <img width={19} src={ASSETS_BASE_URL + "/img/articals.svg"} onClick={(e) => { this.setState({ medicinePopup: !this.state.medicinePopup, headerButtonsState: false }) }} />
                            </div>

                            {
                                profileData ? <div className="head-links d-none" onClick={() => {
                                    this.props.history.push('/user')
                                }}>
                                    {/* <InitialsPicture name={profileData.name} has_image={!!profileData.profile_image} className="initialsPicture img-fluid hed-usr-img" style={{ fontSize: 14, position: 'relative' }} notificationNew={this.props.newNotification > 0 ? true : false}>
                                        <img src={profileData.profile_image} className="img-fluid hed-usr-img" />
                                    </InitialsPicture> */}
                                    <img src={ASSETS_BASE_URL + "/images/user-logged-in.png"} style={{ width: 24 }} />
                                </div> : <div className="head-links " onClick={() => {
                                    this.props.homePage ? this.props.history.push('/user?ref=home') :
                                        this.props.history.push('/user')
                                }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                    </div>
                            }

                            {
                                profileData ? <div className="head-links" onClick={() => {
                                    this.props.history.push('/cart')
                                }}>
                                    <div className="p-relative">
                                        <img className="cart-icon-mbl" src={ASSETS_BASE_URL + "/images/cart-ico.svg"} style={{ width: '24px', marginRight: '8px' }} />
                                        {
                                            cart_count > 0 ? <span className="cart-count-notify">{cart_count}</span> : ""
                                        }
                                    </div>
                                </div> : ""
                            }


                        </div>


                        {

                            this.state.medicinePopup ?
                                <div className='col-12 mrb-15'>
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
                                </div>
                                : ''
                        }

                        <div className="col-12 d-lg-none">
                            {
                                this.props.showSearch ? <div className="serch-nw-inputs search-input-for-mobile" onClick={this.openSearch.bind(this)}>
                                    <div className="header-serach-input-div">
                                        <span>Search Doctors &amp; Tests</span>
                                    </div>
                                    {/* <input className="new-srch-inp home-top-input" placeholder="Search Doctors &amp; Tests" id="doc-input-field" /> */}
                                    <img style={{ width: '18px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                    <button style={{ paddingLeft: '0', top: '0px' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />{location}</button>
                                </div> : ""
                            }
                        </div>


                    </div>



                </div>
            </header >
        );
    }
}

export default DesktopProfileHeader
