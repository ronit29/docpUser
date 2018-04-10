import React from 'react';
import { connect } from 'react-redux';

import ClockIcon from 'material-ui-icons/AvTimer';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';
import MoneyIcon from 'material-ui-icons/AttachMoney';


class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    selectClinic(){
        this.context.router.history.push('/doctorprofile/appointmentslot')
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="clinicSelector">
                <h5>Dr. Steve is available at</h5>

                <div className="clinic" onClick={this.selectClinic.bind(this)}>
                    <div className="name">Sarvodaya Clinic Sector 50, Gurgaon</div>
                    <div className="details">
                        <ClockIcon className="clockIcon"/>
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
                            17:00 to 20:00
                        </p>
                        <p>
                            Fee: Rs.400
                        </p>
                    </div>
                    <div className="book">
                        <span className="text">Book</span>
                        <RightArrowIcon className="bookIcon"/>
                    </div>
                </div>

                <div className="clinic" onClick={this.selectClinic.bind(this)}>
                    <div className="name">Sarvodaya Clinic Sector 50, Gurgaon</div>
                    <div className="details">
                        <ClockIcon className="clockIcon"/>
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
                            17:00 to 20:00
                        </p>
                        <p>
                            Fee: Rs.400
                        </p>
                    </div>
                    <div className="book">
                        <span className="text">Book</span>
                        <RightArrowIcon className="bookIcon"/>
                    </div>
                </div>
            </div>
        );
    }
}


export default ClinicSelector
