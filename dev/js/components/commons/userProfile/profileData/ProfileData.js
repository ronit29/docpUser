import React from 'react';

class ProfileData extends React.Component {
    constructor(props) {
        super(props)
    }

    gotTo(where) {
        this.props.history.push(`/user/${where}`)
    }

    render() {

        return (
            <div className="widget no-round no-shadow skin-transparent profile-nav">
                <div className="widget-content">
                    <ul className="list nav-items">
                        {/* <li>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/consultant.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">OPD Insurance</h4>
                                </div>
                            </a>
                        </li> */}
                        {/* <li className="my-profile-item" onClick={() => {
                            this.props.history.push('/chathistory')
                        }}>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/message.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Online Consultation</h4>
                                </div>
                            </a>
                        </li> */}
                        <li onClick={this.gotTo.bind(this, 'appointments')} className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/opd-visit.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Appointments
                                        {/* <span className="float-right badge badge-warning">1</span> */}
                                    </h4>
                                </div>
                            </a>
                        </li>
                        {/* <li className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/medical-history.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Medical History
                                        <span className="float-right badge badge-warning">2</span>
                                    </h4>
                                </div>
                            </a>
                        </li> */}
                        {/* <li>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/opd-visit.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Test Report <span className="float-right badge badge-warning">5</span></h4>
                                </div>
                            </a>
                        </li> */}
                        <li onClick={this.gotTo.bind(this, 'family')} className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/family.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Family</h4>
                                </div>
                            </a>
                        </li>
                        {/* <li>
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/opd-visit.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Life Style</h4>
                                </div>
                            </a>
                        </li> */}
                        <li onClick={() => {
                            this.props.history.push('/wallet')
                        }} className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/transaction.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Transactions</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/user/address')
                        }} className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/address.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Manage Address</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/notifications')
                        }} className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img style={{height:25}} className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/notificagtion.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Notifications</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.logout()
                        }} className="my-profile-item">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img style={{height:25}} className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/logout_orange.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Logout</h4>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default ProfileData
