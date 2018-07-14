import React from 'react';


class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    render() {

        let profileData = this.props.profiles[this.props.selectedProfile]
        let styles = {}
        if (this.props.homePage) {
            styles = { display: 'block' }
        }
        return (
            <header className="profile-header" style={styles}>
                <div className="smiley-img-div">
                    <img src="/assets/img/customer-icons/smiley.png" />
                </div>
                <div className="container">
                    <div className="row header-row">
                        <div className="col-3 logo-icon-div" onClick={() => {
                            this.props.history.push('/')
                        }}>
                            <a href="javascript:;"><img src="/assets/img/doc-prime-logo.png" className="logo-icon" /></a>
                        </div>
                        {/* for Desktop Only */}
                        {
                            profileData ? <div className="col-lg-4 d-none d-lg-block header-items-rt">
                                <div className="header-item" onClick={this.navigateTo.bind(this, '/notifications')}>
                                    <img src="/assets/img/customer-icons/bell-white.svg" className="header-icons bell-web-icon" />
                                    <span className="header-item-label">Notifications</span>
                                    {
                                        this.props.newNotification ? <span className="notification-alert">{this.props.notifications.length}</span> : ""
                                    }
                                    <img src="/assets/img/customer-icons/down-filled.svg" className="header-icons down-web-icon" />
                                </div>
                                <div className="header-item logout-item" onClick={() => {
                                    this.props.logout()
                                }}>
                                    <img src="/assets/img/customer-icons/logout.svg" className="header-icons logout-web-icon" />
                                    <span className="header-item-label">Logout</span>
                                </div>
                            </div> : ""
                        }

                        {/* for Desktop Only Ends*/}
                        {/* for mobile only */}
                        {/* this section will only visible when the user is logged out */}
                        <div className="col-3 d-lg-none login-btn-div">
                            {
                                this.props.profiles[this.props.selectedProfile] ? "" : <button className="login-btn fw-500" onClick={this.navigateTo.bind(this, '/user')}>Login</button>
                            }

                        </div>
                        {/*  logged out section ends */}
                        <div className="col-3 col-sm-1 d-lg-none bell-icon-div">
                            <img src="/assets/img/customer-icons/bell-white.svg" className="bell-mobile-icon" onClick={this.navigateTo.bind(this, '/notifications')} />
                            {
                                this.props.newNotification ? <span className="notification-alert">{this.props.notifications.length}</span> : ""
                            }
                        </div>
                        {/* for mobile only ends */}
                    </div>

                </div>
            </header>
        );
    }
}

export default DesktopProfileHeader
