import React from 'react';
import InitialsPicture from '../initialsPicture'
import GTM from '../../../helpers/gtm'

class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headerButtonsState: false
        }
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    toggleHeaderButtons() {
        let data = {
        'Category':'ConsumerApp','Action':'SearchButtonClickedMobile','CustomerID':GTM.getUserId(),'leadid':0,'event':'search-button-clicked-mobile'}
        GTM.sendEvent({ data: data })
        this.setState({ headerButtonsState: !this.state.headerButtonsState })
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
                                <span className="top-head-text">A group company of </span>
                                <img className="pb-img-sized pb-window" src={ASSETS_BASE_URL + "/img/pb-logo-window.png"} />
                                <img className="pb-img-size pb-mbl" src={ASSETS_BASE_URL + "/img/pb-logo.png"} />

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
                            <a className="logo-ancher" href="javascript:void(0);">
                                <img className="logo-size" src={ASSETS_BASE_URL + "/img/doc-logo.png"} />
                                
                            </a>
                            {/* <p className="d-none d-md-inline-block d-lg-inline-block lgo-text">Family Doctor <span>for Life</span></p> */}
                        </div>
                        <div className="col-lg-9 col-md-8 col-8 d-none d-lg-block ml-auto text-right pl-0">
                            <div className="head-links" onClick={() => {
                                let data = {
                                'Category':'ConsumerApp','Action':'BookDoctorVisitClicked','CustomerID':GTM.getUserId(),'leadid':0,'event':'book-doctor-visit-clicked'}
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/opd')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/doc.svg"} />
                                <span>Book to Visit a Doctor</span>
                            </div>
                            <div className="head-links" onClick={() => {
                                let data = {
                                'Category':'ConsumerApp','Action':'BookMedicalTestClicked','CustomerID':GTM.getUserId(),'leadid':0,'event':'book-medical-test-clicked'}
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/lab')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/flask.svg"} />
                                <span>Book Medical Test</span>
                            </div>

                            {
                                profileData ? <div className="head-links">
                                    <div className="head-links" onClick={() => {
                                        this.props.history.push('/user')
                                    }}>
                                        <InitialsPicture name={profileData.name} has_image={!!profileData.profile_image} className="initialsPicture img-fluid hed-usr-img mr-2" style={{ fontSize: 14 }}>
                                            <img src={profileData.profile_image} className="img-fluid hed-usr-img" />
                                        </InitialsPicture>
                                        <span className>{profileData.name}</span>
                                    </div>
                                    <div className="head-links" onClick={() => {
                                        this.props.history.push('/notifications')
                                    }}>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/bell-white.svg"} style={{ width: 16 }} /><span className>Notifications</span>
                                        {
                                            this.props.newNotification > 0 ? <span className="notification-alert-desktop">{this.props.newNotification}</span> : ""
                                        }
                                    </div>
                                </div> : <div className="head-links" onClick={() => {
                                    this.props.history.push('/user')
                                }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                        <span>Login</span>
                                    </div>
                            }

                            <div className="head-links location-item" onClick={() => {
                                this.props.history.push('/locationsearch')
                            }}>
                                <i className="fa fa-map-marker" aria-hidden="true" />
                                <span>{location}</span>
                                <img src={ASSETS_BASE_URL + "/images/edit.svg"} />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-8 ml-auto text-right  d-lg-none pl-0">
                            <div className="head-links" onClick={this.toggleHeaderButtons.bind(this)}>
                                <img width={19} src={ASSETS_BASE_URL + "/images/search.svg"} />
                            </div>
                            {
                                profileData ? <div className="head-links" onClick={() => {
                                    this.props.history.push('/user')
                                }}>
                                    <InitialsPicture name={profileData.name} has_image={!!profileData.profile_image} className="initialsPicture img-fluid hed-usr-img" style={{ fontSize: 14 }}>
                                        <img src={profileData.profile_image} className="img-fluid hed-usr-img" />
                                    </InitialsPicture>
                                </div> : <div className="head-links" onClick={() => {
                                    this.props.history.push('/user')
                                }}>
                                        <img src={ASSETS_BASE_URL + "/images/user.svg"} style={{ width: 17 }} />
                                    </div>

                            }
                            <div className="head-links location-item" onClick={() => {
                                this.props.history.push('/locationsearch')
                            }}>
                                <i className="fa fa-map-marker" aria-hidden="true" />
                                <span>{location}</span>
                                <img src={ASSETS_BASE_URL + "/images/edit.svg"} />
                            </div>
                        </div>
                    </div>
                    {
                        this.state.headerButtonsState ? <div className="search-show d-lg-none">
                            <div className="head-links" onClick={() => {
                                let data = {
                                'Category':'ConsumerApp','Action':'BookDoctorVisitClicked','CustomerID':GTM.getUserId(),'leadid':0,'event':'book-doctor-visit-clicked'}
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/opd')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/doc.svg"} />
                                <span>Book to Visit a Doctor</span>
                            </div>
                            <div className="head-links" onClick={() => {
                                let data = {
                                'Category':'ConsumerApp','Action':'BookMedicalTestClicked','CustomerID':GTM.getUserId(),'leadid':0,'event':'book-medical-test-clicked'}
                                GTM.sendEvent({ data: data })
                                this.props.history.push('/lab')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/flask.svg"} />
                                <span>Book Medical Test</span>
                            </div>
                        </div> : ""
                    }

                </div>
            </header>
        );
    }
}

export default DesktopProfileHeader
