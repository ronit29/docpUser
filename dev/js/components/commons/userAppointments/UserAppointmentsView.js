import React from 'react';

import ProfileSlider from '../profileSlider/index.js'
import AppointmentList from './appointmentList/index.js'

class UserAppointmentsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUserProfileWithAppointments()
    }

    static contextTypes = {
        router: () => null
    }

    compareDateWithToday(date){
        let today = new Date().getTime()
        date = new Date(date).getTime()
        return today > date
    }

    render() {

        let selectedUser = null
        let userProfileId = this.props.match.params.id

        if (this.props.USER.profiles[userProfileId]) {
            selectedUser = this.props.USER.profiles[userProfileId]
        } else {
            Object.keys(this.props.USER.profiles).map((profileId) => {
                if (this.props.USER.profiles[profileId].isDefaultUser) {
                    selectedUser = this.props.USER.profiles[profileId]
                }
            })
        }

        return (
            <div className="userProfile">
                {
                    ( selectedUser && selectedUser.appointments ) ? <div>
                        <ProfileSlider
                            profiles={this.props.USER.profiles}
                            subRoute="/appointments"
                        />
                        <p className="upcomingapp">Upcoming OPD Appointments</p>
                        {
                            selectedUser.appointments.filter((appointment,i) =>{
                                let date = appointment.slot ? appointment.slot.start : 0
                                return !this.compareDateWithToday(date) 
                            }).map((appointment, index) => {
                                return <AppointmentList key={index} data={appointment} />
                            })
                        }
                        <p className="prevapp">Previous OPD Appointments</p>
                        {
                            selectedUser.appointments.filter((appointment,i) =>{
                                let date = appointment.slot ? appointment.slot.start : 0
                                return this.compareDateWithToday(date) 
                            }).map((appointment, index) => {
                                return <AppointmentList key={index} data={appointment} />
                            })
                        }
                    </div> : ""
                }

            </div>
        );
    }
}


export default UserAppointmentsView
