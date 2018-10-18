import React from 'react';

class ProfileData extends React.Component {
    constructor(props) {
        super(props)
    }

    gotTo(where) {
        this.props.history.push(`/user/${where}`)
    }

    pushUrl(where) {
        this.props.history.push(`/${where}`)   
    }

    render() {

        let currentRoomId = this.props.USER.currentRoomId

        return (
            <div className="widget no-round no-shadow skin-transparent profile-nav">
                <div className="widget-content padding-remove">
                    <ul className="list nav-items dp-user-list bg-lst">
                        <li className="my-profile-item padding-remove">
                            <p className="usr-dtls-name pdng-usr-dtls-slots">{`Welcome to docprime ${this.props.USER.userName ?`, ${this.props.USER.userName}! `:''} `}</p>
                            <p className="usr-dtls-benf pdng-usr-dtls-slots">docprime benefits</p>
                            <div className="usr-dtls-startup">
                                <p className="usr-dtls-strt-txt pdng-usr-dtls-slots"><img src={ASSETS_BASE_URL + "/img/customer-icons/pinkarw.svg"} className="img-fluid" /> GETTING STARTED</p>
                                <div className="row no-gutters pdng-bttm">
                                    <div className="col-4 mbl-usr-grd">
                                    <span className="usr-dtls-free">FREE</span>
                                        <a className="usr-dtls-anchor" href="javascript:void(0);" onClick={this.pushUrl.bind(this ,'')}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/su-chat.png"} className="img-fluid usr-frst-ico" />
                                            <p>
                                                <span>Chat Now </span>
                                                with qualified doctors
                                    </p>
                                        </a>
                                    </div>
                                    <div className="col-4 mbl-usr-grd" onClick={this.pushUrl.bind(this, 'opd')}>
                                    <a className="usr-dtls-anchor lft-rgt-brdr" href="javascript:void(0);">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/book-doctor.svg"} className="img-fluid" />
                                            <p>
                                                <span>Find Doctors </span>
                                                Upto 50% OFF
                                    </p>
                                        </a>
                                    </div>
                                    <div className="col-4 mbl-usr-grd" onClick={this.pushUrl.bind(this, 'lab')}>
                                    <a className="usr-dtls-anchor" href="javascript:void(0);">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/bk-tst.svg"} className="img-fluid" />
                                            <p>
                                                <span>Book Tests </span>
                                                Upto 50% OFF
                                    </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="my-profile-item">
                            <p className="usr-dtls-strt-txt"><img src={ASSETS_BASE_URL + "/img/customer-icons/stmp.svg"} className="img-fluid" />OFFERS</p>

                            <div className="ofr-img-txt">
                                <div className="box-img-cont"><img src={ASSETS_BASE_URL + "/img/customer-icons/vector-smart-object.png"} className="img-fluid" /></div>
                                <div className="ofr-contnt">
                                    <p className="ofr-bkg"><b className="fw-500 drk-blk">Flat Rs 100 off</b> on your first 3 bookings 
                                        on doctor and diagnostics
 </p>
                                </div>
                            </div>
                        </li>
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
                        <li onClick={this.gotTo.bind(this, 'onlinePrescriptions')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/onlnpres.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Online Prescriptions
                                        {/* <span className="float-right badge badge-warning">1</span> */}
                                    </h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={this.gotTo.bind(this, 'appointments')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/apoitm.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Appointments
                                        {/* <span className="float-right badge badge-warning">1</span> */}
                                    </h4>
                                </div>
                            </a>
                        </li>
                        {/* <li className="my-profile-item lst-spcng">
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
                        <li onClick={this.gotTo.bind(this, 'family')} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/fmly.svg"} className="img-fluid" />
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
                        }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/rp-ico.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">My Transactions</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/user/address')
                        }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/addmang.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Manage Address</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/notifications')
                        }} className="my-profile-item lst-spcng">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img  className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/bl-bell.png"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Notifications</h4>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => {
                            this.props.logout(currentRoomId)
                        }} className="my-profile-item lst-spcng ">
                            <a>
                                <span className="icon icon-md nav-icon">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/log-out.svg"} className="img-fluid" />
                                </span>
                                <div className="nav-content">
                                    <h4 className="title app-title">Logout</h4>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                {/* <div className="logout-div d-md-none" onClick={() => { this.props.logout(currentRoomId) }}>
                    <p className="fw-500">Logout</p>
                </div> */}
            </div>
        );
    }
}


export default ProfileData
