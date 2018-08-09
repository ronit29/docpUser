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

    openBookingSummary(data, e) {
        this.props.selectProfile(data.profile)
        if (data.type == 'lab' || data.lab) {
            this.props.clearAllTests()
            for (let curr_test of data.test_ids) {
                curr_test.extra_test = true
                curr_test.lab_id = data.lab
                this.props.toggleDiagnosisCriteria('test', curr_test, true)
            }
            //always clear selected time at lab profile
            let slot = { time: {} }
            this.props.selectLabTimeSLot(slot, false)
            setTimeout(() => {
                this.props.history.push(`/lab/${data.lab}/book`)
            }, 100)
        } else {
            //always clear selected time at doctor profile
            let slot = { time: {} }
            this.props.selectOpdTimeSLot(slot, false)
            this.props.history.push(`/opd/doctor/${data.doctor}/${data.hospital}/bookdetails`)
        }
    }

    render() {

        let profileData = this.props.profiles[this.props.selectedProfile]

        return (
            <div className="col-lg-3 right-section d-none d-lg-block">
                <div className={"sticky-div" + (!this.props.hideStickyTemp ? " sticky-div-temp" : "")}>
                    <HealthTip healthTips={this.props.healthTips} />
                    {
                        profileData ? this.props.userUpcomingAppointments.map((app, i) => {
                            return <Upcoming key={i} {...app} openAppointment={this.openAppointment.bind(this)} />
                        }) : ""
                    }

                    {
                        profileData ? this.props.orderHistory.map((odHistory, i) => {
                            return <ContinueBooking key={i} {...odHistory} openBookingSummary={this.openBookingSummary.bind(this, odHistory)} />
                        }) : ""
                    }
                </div>
            </div>
        );
    }
}

export default RightBar
