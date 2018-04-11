import React from 'react';
import { connect } from 'react-redux';

import ClockIcon from 'material-ui-icons/AvTimer';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';
import MoneyIcon from 'material-ui-icons/AttachMoney';


class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    selectClinic() {
        this.context.router.history.push('/doctorprofile/appointmentslot')
    }

    static contextTypes = {
        router: () => null
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    getAvailability(availability) {
        let { nextAvailable } = availability
        let date = new Date(nextAvailable.from).toDateString()
        let timeStart = this.getTime(nextAvailable.from)
        let timeEnd = this.getTime(nextAvailable.to)
        return {
            date, timeStart, timeEnd
        }
    }

    render() {

        let { availability } = this.props.details

        availability = availability.map((clinic) => {
            clinic.timeAvailable = this.getAvailability(clinic)
            return clinic
        })
        

        return (
            <div className="clinicSelector">
                <h5>Dr. Steve is available at</h5>

                {
                    availability.map((clinic, i) => {
                        return <div key={i} className="clinic" onClick={this.selectClinic.bind(this)}>
                            <div className="name">{clinic.name + ", " + clinic.address}</div>
                            <div className="details">
                                <ClockIcon className="clockIcon" />
                                <MoneyIcon className="moneyIcon" />
                                <p>
                                    <span>S</span>
                                    <span>M</span>
                                    <span>T</span>
                                    <span>W</span>
                                    <span>T</span>
                                    <span>F</span>
                                    <span>S</span>
                                </p>
                                <p>
                                    {clinic.timeAvailable.timeStart} to {clinic.timeAvailable.timeEnd}
                                </p>
                                <p>{`Fee: Rs.${clinic.fee.amount}`}</p>
                            </div>
                            <div className="book">
                                <span className="text">Book</span>
                                <RightArrowIcon className="bookIcon" />
                            </div>
                        </div>
                    })

                }

            </div>
        );
    }
}


export default ClinicSelector
