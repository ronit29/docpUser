import React from 'react';

import ProfieCard from './ProfileCard'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'
import Articles from './articles'
import ChatSymptoms from './chatSymptom.js'

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symptoms: [
                "Fever",
                "Cough",
                "Headache",
                "Vomiting",
                "Diarrhoea",
                "Breathlessness",
                "Pain/Burning during urination",
                "Chest Pain",
                "Limb Numbness",
                "Ear Infection",
                "Eye Infection",
                "Sore Throat",
                "Acne"
            ],
            selectedSymptoms: [

            ]
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    navigateTo(where, e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (where == '/chat') {
            this.props.history.push(where, {
                symptoms: this.state.selectedSymptoms
            })
        } else {
            this.props.history.push(where)
        }
    }

    getAge(birthday) {
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    render() {

        let profileData = this.props.profiles[this.props.selectedProfile]
        let selectedSympsStr = this.state.selectedSymptoms.reduce((final, x) => {
            final += x + ', '
            return final
        }, "")

        if (selectedSympsStr) {
            selectedSympsStr = selectedSympsStr.slice(0, -2)
        }

        return (
            <div className="profile-body-wrap">

                <ProfileHeader homePage={true} />

                {
                    profileData ? <div className="row mobile-profile-row d-lg-none" onClick={this.navigateTo.bind(this, '/user')}>
                        <div className="container">
                            <div className="row mobile-profile-inside-row">
                                <div className="profile-icon-div">
                                    <img src={profileData.profile_image || "/assets/img/icons/drIcon.jpg"} className="profile-icon" />
                                </div>
                                <div className="profile-info-div">
                                    <p className="profile-info">Welcome</p>
                                    <p className="profile-info profile-name">{profileData.name}</p>
                                    <p className="profile-info">{GENDER[profileData.gender]}, {this.getAge(profileData.dob)} Years</p>
                                </div>
                            </div>
                        </div>
                    </div> : <div className="row mobile-profile-row d-lg-none">
                            <div className="container">
                                <div className="row mobile-profile-inside-row">
                                    <div className="profile-icon-div">
                                        <img src="/assets/img/icons/dummy-profile.svg" className="profile-icon-dummy" />
                                    </div>
                                    <div className="profile-info-div">
                                        <p className="logout-text fw-500">After login your details will be visible here. You can consult with the doctor, book Appointments and your medical tests</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

                <div className="subheader d-none d-lg-block"></div>
                <section className="container">
                    <div className="row main-row">
                        <LeftBar />

                        <div className="col-md-1 d-none d-md-block d-lg-none"></div>

                        <div className="col-12 col-md-10 offset-md-1 offset-lg-0 col-lg-6 profile-main-section">

                            <ChatSymptoms navigateTo={this.navigateTo.bind(this)} />

                            <div className="book-widget book-widget-2">
                                <ul className="book-list">
                                    <a href="javascript:;" onClick={this.navigateTo.bind(this, '/opd')}><li>
                                        <div className="book-list-img-div">
                                            <img src="/assets/img/customer-icons/book-doctor.svg" className="book-list-img" />
                                        </div>
                                        <div className="book-list-label-div">
                                            <p className="book-list-label">Book to Visit a Doctor</p>
                                        </div>
                                        <div className="book-list-arrow">
                                            <img src="/assets/img/customer-icons/right-arrow.svg" className="list-arrow-rt" />
                                        </div>
                                    </li></a>
                                    <a href="javascript:;" onClick={this.navigateTo.bind(this, '/dx')}><li className="book-list-last-item">
                                        <div className="book-list-img-div">
                                            <img src="/assets/img/customer-icons/medical-test.svg" className="book-list-img" />
                                        </div>
                                        <div className="book-list-label-div">
                                            <p className="book-list-label">Book Medical Test</p>
                                        </div>
                                        <div className="book-list-arrow">
                                            <img src="/assets/img/customer-icons/right-arrow.svg" className="list-arrow-rt" />
                                        </div>
                                    </li></a>
                                </ul>
                            </div>

                            <Articles title={"Know about Diseases"}>
                                <ul className="select-item-list">
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/malaria.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Malaria</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/typhoid.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Typhoid</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/hepatitis.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Hepatitis</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/malaria.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Malaria</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/typhoid.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Typhoid</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/hepatitis.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Hepatitis</p>
                                        </div>
                                    </li>
                                                                        <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/malaria.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Malaria</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/typhoid.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Typhoid</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/hepatitis.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Hepatitis</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/malaria.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Malaria</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/typhoid.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Typhoid</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/hepatitis.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Hepatitis</p>
                                        </div>
                                    </li>
                                </ul>
                            </Articles>

                            <Articles title={"Know about Medicines"}>
                                <ul className="select-item-list">
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/malaria.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Malaria</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/typhoid.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Typhoid</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/hepatitis.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Hepatitis</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/malaria.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Malaria</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/typhoid.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Typhoid</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-img">
                                            <img src="/assets/img/customer-icons/hepatitis.jpg" />
                                        </div>
                                        <div className="item-name">
                                            <p>Hepatitis</p>
                                        </div>
                                    </li>
                                </ul>
                            </Articles>

                        </div>

                        <RightBar />
                    </div>
                </section>

                <Footer />

            </div >
        );
    }
}

export default HomeView
