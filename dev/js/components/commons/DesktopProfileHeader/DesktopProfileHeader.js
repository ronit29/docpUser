import React from 'react';
import InitialsPicture from '../initialsPicture'

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
                <div className="smiley-img-div">
                    <img src={ASSETS_BASE_URL + "/img/customer-icons/smiley.png"} />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-1 " onClick={() => {
                            this.props.history.push('/')
                        }}>
                            <a href="javascript:void(0);">
                                <img src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} width={70} />
                            </a>
                        </div>
                        <div className="col-10 d-none d-lg-block ml-auto text-right">
                            <div className="head-links" onClick={() => {
                                this.props.history.push('/opd')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/doc.svg"} />
                                <span>Book to Visit a Doctor</span>
                            </div>
                            <div className="head-links" onClick={() => {
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
                        <div className="col-10 ml-auto text-right  d-lg-none ">
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
                                this.props.history.push('/opd')
                            }}>
                                <img src={ASSETS_BASE_URL + "/images/doc.svg"} />
                                <span>Book to Visit a Doctor</span>
                            </div>
                            <div className="head-links" onClick={() => {
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
