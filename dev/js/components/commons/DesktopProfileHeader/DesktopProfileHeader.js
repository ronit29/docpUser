import React from 'react';


class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <header className="profile-header">
                <div className="smiley-img-div">
                    <img src="/assets/img/customer-icons/smiley.png" />
                </div>
                <div className="container">
                    <div className="row header-row">
                        <div className="col-3 logo-icon-div">
                            <a href="javascript:;"><img src="/assets/img/doc-prime-logo.png" className="logo-icon" /></a>
                        </div>
                        {/* for Desktop Only */}
                        <div className="col-lg-4 d-none d-lg-block header-items-rt">
                            <div className="header-item">
                                <img src="/assets/img/customer-icons/bell-white.svg" className="header-icons bell-web-icon" />
                                <span className="header-item-label">Notifications</span>
                                <img src="/assets/img/customer-icons/down-filled.svg" className="header-icons down-web-icon" />
                            </div>
                            <div className="header-item logout-item">
                                <img src="/assets/img/customer-icons/logout.svg" className="header-icons logout-web-icon" />
                                <span className="header-item-label">Logout</span>
                            </div>
                        </div>
                        {/* for Desktop Only Ends*/}
                        {/* for mobile only */}
                        <div className="col-3 d-lg-none bell-icon-div">
                            <img src="/assets/img/customer-icons/bell-white.svg" className="bell-mobile-icon" />
                        </div>
                        {/* for mobile only ends */}
                    </div>
                    {/* for mobile only */}
                    <div className="row mobile-profile-row d-lg-none">
                        <div className="profile-icon-div">
                            <img src="/assets/img/profile-img.png" className="profile-icon" />
                        </div>
                        <div className="profile-info-div">
                            <p className="profile-info">Welcome</p>
                            <p className="profile-info profile-name">Rishabh Mehrotra</p>
                            <p className="profile-info">Male, 33 Years</p>
                        </div>
                    </div>
                    {/* for mobile only ends */}
                </div>
            </header>
        );
    }
}

export default DesktopProfileHeader
