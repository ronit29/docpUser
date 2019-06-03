import React from 'react';

import AppointmentList from './appointmentList/index.js'
import Loader from '../../Loader'

class UserAppointmentsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getProfileAppointments(this.props.USER.selectedProfile)
    }

    componentWillReceiveProps(props) {
        if (this.props.USER.selectedProfile != props.USER.selectedProfile) {
            this.props.getProfileAppointments(props.USER.selectedProfile)
        }
    }

    render() {

        let { appointments, selectedProfile } = this.props.USER

        return (
            <div className="widget-content pl-0 pr-0">
                {
                    appointments[selectedProfile] ? <ul className="list online-consultant-list dp-user-list" style={{ marginTop: 15, marginBottom: 70 }}>
                        {
                            (appointments[selectedProfile] && appointments[selectedProfile].length) ?
                                appointments[selectedProfile].map((app, i) => {
                                    return ((app.type == 'lab' && app.lab) || app.type == 'doctor') ?
                                        <AppointmentList key={i} {...this.props} data={app} />
                                        : ''

                                }) : <div className="text-center pd-20">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/no-appointment.png"} />
                                    <p className="fw-500 text-lg mrt-20">No Appointments !!</p>
                                </div>
                        }
                    </ul> : <Loader />
                }
                <div class="search-el-popup-overlay cancel-overlay-zindex">
                    <div class="search-el-popup ipd-pop-width">
                        <div class="widget p-12">
                            <div class="p-relative">
                                <span class="ipd-pop-cls">
                                    <img src="/assets/img/icons/close.png" />
                                </span>
                                <p class="ipd-needHelp">View Report</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserAppointmentsView
