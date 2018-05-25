import React from 'react';

import AppointmentList from './appointmentList/index.js'

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
        if(this.props.USER.selectedProfile != props.USER.selectedProfile){
            this.props.getProfileAppointments(props.USER.selectedProfile)
        }
    }

    render() {

        let { appointments, selectedProfile } = this.props.USER

        return (
            <div className="widget-content">
                {
                    appointments[selectedProfile] ? <ul className="list online-consultant-list" style={{marginTop:5}}>
                        {
                            appointments[selectedProfile].map((app, i) => {
                                return <AppointmentList key={i} data={app} />
                            })
                        }
                    </ul> : ""
                }

            </div>
        );
    }
}


export default UserAppointmentsView
