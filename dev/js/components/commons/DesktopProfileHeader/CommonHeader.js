import React from 'react';
import InitialsPicture from '../initialsPicture'
import GTM from '../../../helpers/gtm'
import LeftMenu from '../LeftMenu/LeftMenu.js'
import IpdChatPanel from '../ChatPanel/ChatIpdPanel.js'
import STORAGE from '../../../helpers/storage'
import { toggleProfileProcedures } from '../../../actions/opd/doctorSearch';

class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headerButtonsState: false,
            medicinePopup: false,
            toggleHamburger: this.props.toggleLeftMenu || false,
            showLeftMenu: false,
            showSBI: false
        }
    }

    componentDidMount() {
        this.setState({ showLeftMenu: true })
        
        if(this.props.new_fixed_header && this.props.new_fixed_header == 1){
            window.addEventListener('scroll', () => {
                const scrollHeight = window.pageYOffset;
                if (window.innerWidth < 767){
                    const gHeader = document.getElementById('is_header');
                    if(gHeader){
                        const gHeaderHeight = gHeader.clientHeight;
                        if(document.getElementById('listing-header')){
                            const lvHeader = document.getElementById('listing-header');             
                            if(scrollHeight >= gHeaderHeight/2){
                                lvHeader.classList.add('listing-header')
                            }else{
                                lvHeader.classList.remove('listing-header')
                            }
                        }
                    }
                }  
            })
        }
        this.setState({ showLeftMenu: true})
        setTimeout(()=>{
            this.setState({showSBI: true })
        }, 100)
        
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
            this.props.history.push(`/search?from=header&pageType=${this.props.pageType ? this.props.pageType : ''}`)
        }
    }

    openLocation() {
        this.props.history.push('/locationsearch')
    }

    toggleLeftMenu() {
        this.props.toggleLeftMenuBar()
    }

    logoClick = () => {
        if (this.props.homePage && !!!this.props.chatPage) {
            if (window) {
                window.scrollTo(0, 0);
            }
        }
        else {
            this.props.history.push('/');
        }
    }

    render() {
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
            headerClass = "doc-header"
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
            <header id="is_header"  className="new-common-header">
                {
                    this.props.showPackageStrip || !this.props.ipd_chat ? ''
                        : <IpdChatPanel {...this.props} />
                }
                {/* top header */}
                {this.props.homePage?   
                    <div className="container-fluid d-flex justify-content-between align-item-center top-header" id="headerTop">
                        <h6>
                            <span>Group company of </span>
                            <img src={ASSETS_BASE_URL + "/img/logo-pg.png"}  height="18px"/>
                        </h6>
                        <ul id="listView">
                            {/*<li className="text-capitalize"  onClick={(e) => {
                                let data = {
                                    'Category': 'ConsumerApp', 'Action': 'vipClickSubheader', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-click-subheader'
                                }
                                GTM.sendEvent({ data: data })
                                e.preventDefault();
                                this.props.clearVipSelectedPlan()
                                this.navigateTo("/vip-gold-details?is_gold=true&source=desktop-submenu-gold-clicked&lead_source=Docprime", 'opd')}}>
                                <img src={ASSETS_BASE_URL + "/img/gold-lg.png"}  width="35" />
                                <span className="ml-2">docprime gold</span>
                            </li>*/}
                            <li className="text-capitalize" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/search", 'opd')}}>find a doctor</li>
                            <li className="text-capitalize" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/search", 'lab')}}>lab test</li>
                            <li className="text-capitalize" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo('/full-body-checkup-health-packages')}}>Health packages</li>
                            <li className="text-capitalize" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo('/online-consultation')}}>Online consultation</li>
                        </ul>
                        
                    </div> : ''
                }     
                {/* top header */}
                {/* new main header */}
                <div className= {` container-fluid main-header d-flex ${this.props.new_fixed_header && this.props.new_fixed_header == 1?'':'lw-fixed-header'} ${this.props.isSearchList?'pkgComp':''}`}>
                    {/* on click left menu */}
                    {
                        this.state.toggleHamburger ?
                            <div className="cancel-overlay cl-overlay" onClick={(e) => {
                                e.stopPropagation()
                                this.toggleLeftMenu()
                            }}>
                            </div>
                            : ''
                    }
                    {
                        this.state.showLeftMenu ? <LeftMenu {...this.props} {...this.state} toggleLeftMenu={this.toggleLeftMenu.bind(this)} /> : ""
                    }
                    {/* on click left menu */}
                    <div className="row align-items-center m-0" id="lw-header" style={{width:'100%'}}>
                        <div className="d-flex align-item-center main-header-left-col">
                            {/* hamburger menu icon */}
                            
                            <div className="menu-icon" onClick={(e) => {
                                e.stopPropagation()
                                document.body.style.overflow = "hidden"
                                this.toggleLeftMenu()}}>
                                <ul>
                                    <li>&nbsp;</li>
                                    <li>&nbsp;</li>
                                    <li>&nbsp;</li>
                                </ul>
                            </div>
                            {/* hamburger menu icon */}

                            {/* header logo click event */}
                            <a className="sbi-iconfx" href="/" onClick={(e) =>{
                                e.preventDefault();
                                e.stopPropagation();
                                this.logoClick() }}>
                                <div className="d-none d-lg-block">
                                    <img  style={{transform:'scale(1.5)'}} src="https://cdn.docprime.com/media/web/custom_images/LOGO-01.svg" alt="docprime" height="36" />
                                </div>
                                {
                                    this.state.showSBI && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')?
                                    <React.Fragment>
                                        {
                                            this.props.homePage?
                                            <div className="d-lg-none" >
                                                <img style={{ width: '95px', marginRight: '5px', marginLeft: 10, marginTop: 10 }} src={ASSETS_BASE_URL + "/img/SBI_Logo1.png"} alt="docprime" />
                                            </div>
                                            :''
                                        }
                                        <div className="d-lg-none" >
                                            <img height="50" style={{marginLeft: 6}} src="https://cdn.docprime.com/media/web/custom_images/LOGO-01.svg" alt="docprime" />
                                            
                                        </div>
                                    </React.Fragment>
                                    :<div className="d-lg-none" >
                                        <img height="50" style={{marginLeft: 6}} src="https://cdn.docprime.com/media/web/custom_images/LOGO-01.svg" alt="docprime" />
                                    </div>
                                }
                            </a>
                            {/* header logo click event */}
                        </div>
                        <div className="d-flex align-item-center justify-content-between main-header-right-col">
                            {/* desktop header search */}
                            <div className="header-search-full-width d-none d-lg-flex align-items-center justify-content-end">
                                {
                                    hideSearch ? "" : <div className="head-links hed-links-search-flex">
                                        <div className="serch-nw-inputs new-home-full-widht" >
                                            <div onClick={this.openSearch.bind(this)}>
                                                <div className="header-serach-input-div">
                                                    <span>Search Doctors &amp; Tests</span>
                                                </div>
                                                {/* <input className="new-srch-inp" placeholder="Search Doctors, Tests, & Procedures" id="doc-input-field" /> */}
                                                <img style={{ width: '18px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                            </div>
                                            <button onClick={this.openLocation.bind(this)} style={{ paddingLeft: '0', top: '0px' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} /> {location}</button>
                                        </div>
                                    </div>
                                }
                            </div>
                            {/* desktop header search */}

                            {/* header list items    */}
                            <ul className="d-flex align-item-center header-list-items">
                                <li className="mbl-search-box no-border">
                                    {
                                        this.props.showSearch ? "" : <div className="mbl-head-search" onClick={this.openSearch.bind(this)}>
                                            <img width={19} src={ASSETS_BASE_URL + "/images/search-dark.svg"} />
                                        </div>
                                    }
                                </li>
                                <li>
                                    <a className="d-flex align-item-center" onClick={(e) => {
                                    e.preventDefault();
                                    this.navigateTo('/contact') }}>
                                        {
                                            this.state.showSBI && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')?
                                            <img height="26px" src={ASSETS_BASE_URL + "/img/contact-us-sbi.svg"} />
                                            :<img height="26px" src={ASSETS_BASE_URL + "/img/contact-us.svg"} />

                                        }
                                        <span className="d-none d-sm-block d-lg-block">contact us</span>
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="https://www.policybazaar.com/health-insurance/health-insurance-india/?utm_source=docprime&utm_medium=top-navigation&utm_term=health-insurance" target="_blank" className="d-flex align-item-center" onClick={(e) => {
                                    // e.preventDefault();
                                    // this.navigateTo('/covid-plans');
                                    let data = {
                                        'Category': 'DesktopHealth', 'Action': 'insuranceNavbar', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'insurance-link-clicked'
                                    }
                                    GTM.sendEvent({ data: data })
                                     }}>
                                        <img height="26px" src={ASSETS_BASE_URL + "/img/customer-icons/ins.png"} />
                                        <span className="d-none d-sm-block d-lg-block">Health Insurance</span>
                                    </a>
                                </li> */}
                                <li className="d-none d-sm-block d-lg-block">
                                    <a className="d-flex align-item-center head-dropdowns">
                                        {
                                            this.state.showSBI && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')?
                                            <img height="19px" src={ASSETS_BASE_URL + "/img/file-format-sbi.svg"} />
                                            :<img height="19px" src={ASSETS_BASE_URL + "/img/file-format.svg"} />

                                        }
                                        <span className="d-none d-sm-block d-lg-block">resources</span>
                                        <img height="10" className="down-caret-img" src={ASSETS_BASE_URL + "/img/caret-down.svg"} alt="caret-down" />
                                        <ul className="list-sub-menu d-none d-sm-block d-lg-block">
                                            <li><a href="/all-medicines" onClick={(e) => {
                                                e.preventDefault();
                                                this.props.history.push("/all-medicines")
                                            }}>Medicines</a></li>
                                            {/* <li><a href="javascript:void(0);">Articles</a></li> */}
                                            <li><a href="/all-diseases" onClick={(e) => {
                                                e.preventDefault();
                                                this.props.history.push("/all-diseases")
                                            }}>Diseases</a></li>
                                            <li><a href="/tests" onClick={(e) => {
                                                e.preventDefault();
                                                this.props.history.push("/tests")
                                            }}>Tests</a></li>
                                            <li><a href="/ipd-procedures" onClick={(e) => {
                                                e.preventDefault();
                                                this.props.history.push("/ipd-procedures")
                                            }}>Procedures</a></li>
                                            <li><a href="/hospitals" onClick={(e) => {
                                                e.preventDefault();
                                                this.props.history.push("/hospitals")
                                            }}>Hospitals</a></li>
                                        </ul>
                                    </a>
                                </li>
                                <li>
                                    {
                                        profileData ? <a style={{position:'relative'}} className="d-flex align-item-center" onClick={() => {
                                            this.props.history.push('/cart')
                                        }}>
                                            <span className="d-flex align-item-center m-0">
                                                {
                                                    this.state.showSBI && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')?
                                                    <img height="19px" src={ASSETS_BASE_URL + "/img/cart_sbi.svg"} />
                                                    :<img height="19px" src={ASSETS_BASE_URL + "/img/cart.svg"} />

                                                }
                                                 
                                                {
                                                    cart_count > 0 ? <span className="cart-count-notify">{cart_count}</span> : ""
                                                }
                                            </span>
                                            <span className="d-none d-sm-block d-lg-block">cart</span>
                                        </a> : ""
                                    }
                                </li>
                                <li className="d-none d-sm-block d-lg-block">
                                    <a className="d-flex align-item-center no-border" style={{position: 'relative'}} onClick={() => {
                                            this.props.history.push('/notifications')
                                        }}>
                                        {
                                            this.state.showSBI && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')?
                                            <img height="19px" src={ASSETS_BASE_URL + "/img/notification-sbi.svg"} />
                                            :<img height="19px" src={ASSETS_BASE_URL + "/img/notification.svg"} />

                                        }
                                        <span className="d-none d-sm-block d-lg-block">notifications</span>
                                        {
                                            this.props.newNotification > 0 ? <span className="cart-count-notify m-0" style={{left: -8, top: -4}}>{this.props.newNotification}</span> : ""
                                        }
                                    </a>
                                </li>
                                <li className="p-0">
                                    {profileData ? <a className="d-flex align-item-center no-border user-name-col" onClick={() => {
                                            this.props.history.push('/user')
                                        }}>
                                            {/* <span className="user-name-initials d-flex justify-content-center align-item-center">{profileData.name[0]}</span> */}
                                            <InitialsPicture name={profileData.name} className="user-name-initials d-flex justify-content-center align-item-center">
                                            </InitialsPicture> 
                                            <span className="d-none d-sm-block d-lg-block user-name-span">{profileData.name}</span>
                                        </a>
                                        : <a className="d-flex align-item-center no-border" onClick={() => {
                                        this.props.homePage ? this.props.history.push('/user?ref=home') : this.props.history.push('/user')
                                        }}>
                                            {
                                                this.state.showSBI && document && typeof document=='object' && document.location && document.location.host && document.location.host.includes('sbi')?
                                                <img height="24px" src={ASSETS_BASE_URL + "/img/login-sbi.svg"} />
                                                :<img height="24px" src={ASSETS_BASE_URL + "/img/login.svg"} />

                                            }
                                            <span className="d-none d-sm-block d-lg-block user-name-span">login</span>
                                        </a>
                                    }
                                </li>
                            </ul>
                            {/* header list items    */}
                        </div>
                        {/* {
                            this.props.summaryPage?
                            <p className="coronaVirus">Due to Coronavirus outbreak, our team is working from home. Our toll free no will be unresponsive. Please accept apologies for the possible delay in service. For any urgent queries, please write to us  <a href="mailto:customercare@docprime.com">customercare@docprime.com</a></p>
                            :''
                        } */}
                    </div>
                    {/* mobile view search box */}
                    <div className="col-12 mbl-search-box d-lg-none">
                        {
                            this.props.showSearch ? <div className="serch-nw-inputs search-input-for-mobile">
                                <div onClick={this.openSearch.bind(this)}>
                                    <div className="header-serach-input-div" style={{marginBottom: 10, marginTop: 10}}>
                                        <span>Search Doctors &amp; Tests</span>
                                    </div>
                                    {/* <input className="new-srch-inp home-top-input" placeholder="Search Doctors &amp; Tests" id="doc-input-field" /> */}
                                    <img style={{ width: '13px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                </div>
                                <button onClick={this.openLocation.bind(this)} style={{ paddingLeft: '0', top: '0px' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />{location}</button>
                            </div> : ""
                        }
                    </div>

                    {this.props.new_fixed_header && this.props.new_fixed_header == 1?
                        <div className={`row listing-view-header visible-col ${this.props.isSearchList?'pkgComp':''}`} id="listing-header">
                            <div className="col-1 pr-0 menu-icon" onClick={(e) => {
                                e.stopPropagation()
                                document.body.style.overflow = "hidden"
                                this.toggleLeftMenu()}} style={{paddingLeft: 0}}>
                                <ul>
                                    <li>&nbsp;</li>
                                    <li>&nbsp;</li>
                                    <li className="m-0">&nbsp;</li>
                                </ul>
                            </div>
                            <div className="col-11 d-lg-none pr-0 pl-0">
                                {
                                    this.props.showSearch ? <div className="serch-nw-inputs new-listing-search search-input-for-mobile" >
                                        <div onClick={this.openSearch.bind(this)}>
                                            <div className="header-serach-input-div">
                                                <span>Search Doctors &amp; Tests</span>
                                            </div>
                                            <img style={{ width: '13px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                        </div>
                                        <button onClick={this.openLocation.bind(this)} style={{ paddingLeft: '0', top: '0px' }} className="srch-inp-btn-img"><img style={{ marginRight: '8px', width: '10px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />{location}</button>
                                    </div> : ""
                                }
                            </div>
                        </div>
                    :''}
                    {/* mobile view search box ends */}
                    
                </div>
                {/* new main header */}
                {/* {
                    this.props.homePage?
                    <p className="coronaVirus">Due to Coronavirus outbreak, our team is working from home. Our toll free no will be unresponsive. Please accept apologies for the possible delay in service. For any urgent queries, please write to us  <a href="mailto:customercare@docprime.com">customercare@docprime.com</a></p>
                    :''
                } */}
            </header>
        );
    }
}

export default DesktopProfileHeader
