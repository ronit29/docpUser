import React from 'react';

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class LeftBar extends React.Component {
    constructor(props) {
        super(props)
    }

    gotTo(where) {
        this.props.history.push(`/user/${where}`)
    }

    getAge(birthday) {
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    render() {

        let profileData = this.props.profiles[this.props.selectedProfile]

        return (
            <div className="col-lg-3 profile-section d-none d-lg-block">
                {
                    profileData ? <div className="sticky-div sticky-div-temp">
                        <div className="profile-img-section">
                            <img src={profileData.profile_image || "/assets/img/profile-img.png"} className="profile-icon" />
                        </div>
                        <div className="profile-name-section">
                            <p className="profile-name">{profileData.name}</p>
                            <div className="profile-info-section">
                                <img src="/assets/img/customer-icons/gender.svg" className="gender-icon" />
                                <span className="profile-info-web">{GENDER[profileData.gender]}, {this.getAge(profileData.dob)}</span>
                            </div>
                        </div>
                        <div className="profile-feature-list-section">
                            <ul className="profile-feature-list">
                                {/* <li>
                                <div className="list-inline-div list-img-div">
                                    <img src="/assets/img/customer-icons/insurance.svg" className="profile-list-icons" />
                                </div>
                                <div className="list-inline-div">
                                    <p className="profile-feature-name">OPD Insurance</p>
                                    <p className="list-small-text">Renew on 1st June 2018</p>
                                </div>
                                <div className="last-list-div">
                                    <p className="last-list-div-text">Active</p>
                                </div>
                            </li> */}
                                <li>
                                    <div className="list-inline-div list-img-div">
                                        <img src="/assets/img/customer-icons/consultation.svg" className="profile-list-icons" />
                                    </div>
                                    <div className="list-inline-div">
                                        <p className="profile-feature-name">Online Consultation</p>
                                    </div>
                                    {/* <div className="last-list-div list-no-div">
                                    <p className="list-no">8</p>
                                </div> */}
                                </li>
                                <li onClick={this.gotTo.bind(this, 'appointments')}>
                                    <div className="list-inline-div list-img-div">
                                        <img src="/assets/img/customer-icons/opd-visit.svg" className="profile-list-icons" />
                                    </div>
                                    <div className="list-inline-div">
                                        <p className="profile-feature-name">OPD Visits</p>
                                    </div>
                                    {/* <div className="last-list-div list-no-div">
                                    <p className="list-no">8</p>
                                </div> */}
                                </li>
                                <li>
                                    <div className="list-inline-div list-img-div">
                                        <img src="/assets/img/customer-icons/medical.svg" className="profile-list-icons" />
                                    </div>
                                    <div className="list-inline-div">
                                        <p className="profile-feature-name">Medical History</p>
                                    </div>
                                    {/* <div className="last-list-div list-no-div">
                                    <p className="list-no">8</p>
                                </div> */}
                                </li>
                                {/* <li>
                                <div className="list-inline-div list-img-div">
                                    <img src="/assets/img/customer-icons/test-report.svg" className="profile-list-icons" />
                                </div>
                                <div className="list-inline-div">
                                    <p className="profile-feature-name">Test Reports</p>
                                </div>
                                <div className="last-list-div list-no-div">
                                    <p className="list-no">8</p>
                                </div>
                            </li> */}
                                <li onClick={this.gotTo.bind(this, 'family')}>
                                    <div className="list-inline-div list-img-div">
                                        <img src="/assets/img/customer-icons/family.svg" className="profile-list-icons" />
                                    </div>
                                    <div className="list-inline-div">
                                        <p className="profile-feature-name">My Family</p>
                                    </div>
                                </li>
                                {/* <li>
                                <div className="list-inline-div list-img-div">
                                    <img src="/assets/img/customer-icons/lifestyle.svg" className="profile-list-icons" />
                                </div>
                                <div className="list-inline-div">
                                    <p className="profile-feature-name">Lifestyle</p>
                                </div>
                            </li> */}
                            </ul>
                        </div>
                    </div> : ""
                }


            </div>
        );
    }
}

export default LeftBar
