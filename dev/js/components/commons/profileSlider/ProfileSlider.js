import React from 'react';

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class ProfileSlider extends React.Component {
    constructor(props) {
        super(props)
    }

    getAge(birthday) {
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    render() {

        let { profiles, selectedProfile } = this.props.USER

        return (
            <div className="widget profile-info hidden-md-up text-center mrt-10 clearfix">
                    {
                        Object.keys(profiles).map((id, key) => {
                            return <div className="widget-content profile-slider " key={key} onClick={() => {
                                this.props.selectProfile(id)
                            }}>
                                <div className="avtar avtar-md consumer-icon">
                                    <img src={ profiles[id].profile_image || "/assets/img/icons/drIcon.jpg" } className="img-fluid img-round " />
                                </div>
                                <div>
                                    <h4 className="title">{profiles[id].name}</h4>
                                    <p className="fw-500 text-light mrb-5">{this.getAge(profiles[id].dob)} Years | {GENDER[profiles[id].gender]}</p>
                                    {/* <p className="fw-500 text-light">+919560519761 <a href="#" className="link-text text-warning">Verify Now</a></p> */}
                                </div>
                            </div>
                        })
                    }
            </div>
        );
    }
}



export default ProfileSlider


