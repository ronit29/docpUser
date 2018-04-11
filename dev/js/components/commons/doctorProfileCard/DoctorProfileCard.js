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

    cardClick(id) {
        this.props.selectDoctor(id)
        this.context.router.history.push(`/doctorprofile/${id}`)
    }

    static contextTypes = {
        router: () => null
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.qualification}`
            if (curr.specialization) {
                str += ` - ${curr.specialization}`
            }
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    getAvailability(availability) {
        if(availability){
            let { nextAvailable } = availability
            if(nextAvailable[0]){
                let date = new Date(nextAvailable[0].from).toDateString()
                let timeStart = this.getTime(nextAvailable[0].from)
                let timeEnd = this.getTime(nextAvailable[0].to)
                return {
                    date, timeStart, timeEnd, fee:nextAvailable[0].fee
                }
            }
        }

        return { date:'', timeStart:'', timeEnd:'', fee: { amount : '' } }
    }

    render() {

        let { id, name, profile_img, practice_duration, qualificationSpecialization, consultationCount, availability, pastExperience } = this.props.details

        let qualificationString = this.getQualificationStr(qualificationSpecialization)
        let timeAvailable = this.getAvailability(availability[0])

        return (
            <div className="doctorCard" onClick={this.cardClick.bind(this,id)}>
                <div className="detailsDiv">
                    <div className="subOptionsImage">
                        <img src={profile_img} className="doctorImage" />
                    </div>
                    <div className="subOptionsContent">
                        <span className="name">{name}</span>
                        <span className="qualification">{qualificationString}</span>
                        <span className="designation">{pastExperience}</span>
                        <span className="experience">{practice_duration} years of experience</span>
                    </div>
                    <div className="subOptionsInteract">
                        <button className="bookNow">
                            Book Now
                            </button>
                        <span className="price">Fee: Rs. {timeAvailable.fee.amount}</span>
                    </div>
                </div>
                {
                    !!this.props.hideBottom ? '' :
                        <div className="bottomOptions">
                            <div className="subOptions">
                                <HomeIcon className="clinicIcon" />
                                <span className="clinicName">{availability[0].name}</span>
                            </div>
                            <div className="subOptions">
                                <ClockIcon className="clinicIcon" />
                                <span className="timeEntry">{ timeAvailable.date }</span>
                                <span className="timeEntry">{ timeAvailable.timeStart } to { timeAvailable.timeEnd }</span>
                            </div>
                            <div className="subOptions">
                                <LocationsIcon className="clinicIcon" />
                                <span className="clinicName">{availability[0].address}</span>
                            </div>
                        </div>
                }
            </div>
        );
    }
}


export default DoctorProfileCard
