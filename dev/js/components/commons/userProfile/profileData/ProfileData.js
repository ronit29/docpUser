import React from 'react';

class ProfileData extends React.Component {
    constructor(props) {
        super(props)
    }

    openAppointments(profileId) {
        this.context.router.history.push(`/user/${profileId}/appointments`)

    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let {name, gender, age, mobile, medicalHistoryCount, medicalTestCount, onlineConsultationCount, opdVisitCount, profileId} = this.props.profileData

        return (
            <div>                
                <div className="userDeail">
                    <p>{name}</p>
                    <p>{age} Years</p>
                    <p>{gender}</p>
                    <p>{mobile}</p>
                </div>
                <div className="profileBtns">
                    <button>Profile Not Verified</button>
                    <button>No OPD Insurance</button>
                    <button>Online Consultations({onlineConsultationCount})</button>
                    <button onClick={this.openAppointments.bind(this,profileId)}>OPD Visits ({opdVisitCount})</button>
                    <button>Medical History ({medicalHistoryCount})</button>
                    <button>Test Reports ({medicalTestCount})</button>
                </div>
            </div>
        );
    }
}


export default ProfileData
