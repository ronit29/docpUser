import React from 'react';

import Upcoming from './upcoming.js'
import ContinueBooking from './continue.js'
import HealthTip from './healthTip.js'

class RightBar extends React.Component {
    constructor(props) {
        super(props)
    }

    openAppointment(type, id) {
        this.props.history.push(`/${type}/appointment/${id}`)
    }

    render() {

        let profileData = this.props.profiles[this.props.selectedProfile]

        return (
            <div className="col-lg-3 right-section d-none d-lg-block">
                <div className="sticky-div sticky-div-temp">
                    {
                        profileData ? this.props.userUpcomingAppointments.map((app, i) => {
                            return <Upcoming key={i} {...app} openAppointment={this.openAppointment.bind(this)}/>
                        }) : ""
                    }

                    <HealthTip />

                    {/* {
                        profileData ? <ContinueBooking /> : ""
                    } */}

                </div>
            </div>
        );
    }
}

export default RightBar
