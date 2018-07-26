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
            <div className="widget-content">
                {
                    appointments[selectedProfile] ? <ul className="list online-consultant-list" style={{ marginTop: 5 }}>
                        {
                            (appointments[selectedProfile] && appointments[selectedProfile].length) ?
                                appointments[selectedProfile].map((app, i) => {
                                    return <AppointmentList key={i} {...this.props} data={app} />
                                }) : <div className="text-center pd-20">
                                        <img src="/assets/img/customer-icons/no-appointment.png" />
                                        <p className="fw-500 text-lg mrt-20">No Appointments !!</p>
                                    </div>
                        }
                    </ul> : <Loader />
                }
            </div>
        );
    }
}


export default UserAppointmentsView
