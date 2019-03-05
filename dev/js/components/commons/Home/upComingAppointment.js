import React from 'react';
import SnackBar from 'node-snackbar'

class UpComingAppointmentView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            whatsapp_optin_View:true
        }
    }

    render() {
        return (
            <div>
                <div className="card cstm-card aptmnt-card mb-3">
                    <div className="float-l leftBlock">
                        <div className="float-l">
                            <img src={ASSETS_BASE_URL + "/images/ic-time-date.png"} alt="" />
                        </div>
                        <div className="float-l">
                            <div>Appointment for Ravi singh</div>
                            <div className="date-time">On 18 Feb, 11:12 AM</div>
                            <div> with Dr. Anil Vardani</div>
                        </div>
                    </div>
                    <div className="rightBlock">
                        <a href="javascript:void(0);" className="anchr-img">View Detail</a>
                    </div>
                    <div className="carousel-indicators crsl-indicators cr-indicator">
                        <span className="active"></span>
                        <span className=""></span>
                        <span className=""></span>
                    </div>
                </div>
                <div className="card cstm-card aptmnt-card mb-3">
                    <div className="float-l leftBlock">
                        <div className="float-l">
                            <img src={ASSETS_BASE_URL + "/images/ic-time-date.png"} alt="" />
                        </div>
                        <div className="float-l">
                            <div>Appointment for Rishab</div>
                            <div className="date-time">On 18 Feb, 11:12 AM</div>
                            <div> with Dr. Anil Vardani</div>
                        </div>
                    </div>
                    <div className="rightBlock">
                        <a href="javascript:void(0);" className="anchr-img">View Detail</a>
                    </div>
                    <div className="carousel-indicators crsl-indicators cr-indicator">
                        <span className="active"></span>
                        <span className=""></span>
                        <span className=""></span>
                    </div>
                </div>
                <div className="card cstm-card aptmnt-card mb-3">
                    <div className="float-l leftBlock">
                        <div className="float-l">
                            <img src={ASSETS_BASE_URL + "/images/ic-time-date.png"} alt="" />
                        </div>
                        <div className="float-l">
                            <div>Appointment for mayank singh</div>
                            <div className="date-time">On 18 Feb, 11:12 AM</div>
                            <div> with Dr. Anil Vardani</div>
                        </div>
                    </div>
                    <div className="rightBlock">
                        <a href="javascript:void(0);" className="anchr-img">View Detail</a>
                    </div>
                    <div className="carousel-indicators crsl-indicators cr-indicator">
                        <span className="active"></span>
                        <span className=""></span>
                        <span className=""></span>
                    </div>
                </div>
                <div className="card cstm-card aptmnt-card mb-3">
                    <div className="float-l leftBlock">
                        <div className="float-l">
                            <img src={ASSETS_BASE_URL + "/images/ic-time-date.png"} alt="" />
                        </div>
                        <div className="float-l">
                            <div>Appointment for akash singh</div>
                            <div className="date-time">On 18 Feb, 11:12 AM</div>
                            <div> with Dr. prince Vardani</div>
                        </div>
                    </div>
                    <div className="rightBlock">
                        <a href="javascript:void(0);" className="anchr-img">View Detail</a>
                    </div>
                    <div className="carousel-indicators crsl-indicators cr-indicator">
                        <span className="active"></span>
                        <span className=""></span>
                        <span className=""></span>
                    </div>
                </div>
            </div>
        );
    }
}


export default UpComingAppointmentView
