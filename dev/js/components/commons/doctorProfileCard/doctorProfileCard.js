import React from 'react';
import { connect } from 'react-redux';

import EmotiIcon from 'material-ui-icons/AccountCircle';
import HomeIcon from 'material-ui-icons/Home';
import ClockIcon from 'material-ui-icons/AvTimer';
import LocationsIcon from 'material-ui-icons/LocationOn';


class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    cardClick(){
        this.context.router.history.push('/doctorprofile')
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="doctorCard" onClick={this.cardClick.bind(this)}>
                <div className="detailsDiv">
                    <div className="subOptionsImage">
                        <EmotiIcon className="doctorImage" />
                    </div>
                    <div className="subOptionsContent">
                        <span className="name">Dr. Steve Ray</span>
                        <span className="qualification">MBBS,MD - General Medicine</span>
                        <span className="designation">General Physician</span>
                        <span className="experience">12 years of experience</span>
                    </div>
                    <div className="subOptionsInteract">
                        <button className="bookNow">
                            Book Now
                            </button>
                        <span className="price">Fee: Rs. 250</span>
                    </div>
                </div>
                {
                    !!this.props.hideBottom ? '' :
                        <div className="bottomOptions">
                            <div className="subOptions">
                                <HomeIcon className="clinicIcon" />
                                <span className="clinicName">Dr. Gupta Clinic</span>
                            </div>
                            <div className="subOptions">
                                <ClockIcon className="clinicIcon" />
                                <span className="timeEntry">09:00 to 14:00</span>
                                <span className="timeEntry">17:00 to 22:00</span>
                            </div>
                            <div className="subOptions">
                                <LocationsIcon className="clinicIcon" />
                                <span className="clinicName">Sector 5,Gurgaon</span>
                            </div>
                        </div>
                }
            </div>
        );
    }
}


export default DoctorProfileCard
