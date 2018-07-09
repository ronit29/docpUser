import React from 'react';

import ProfieCard from './ProfileCard'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

let counter = 0;
let txtString = 'I am suffering from Headache';
let speed = 80;
let interval;

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symptoms: [
                'Headache', 'Cold & Cough', 'Hairfall', 'Abdominal Pain'
            ],
            selectedSymptoms: [

            ]
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.textAnimationAdd();
    }

    toggleSymptom(name) {
        if (this.state.selectedSymptoms.indexOf(name) > -1) {
            this.state.selectedSymptoms.splice(this.state.selectedSymptoms.indexOf(name), 1)
        } else {
            this.state.selectedSymptoms.push(name)
        }

        this.setState(this.state, () => {
            if (this.state.selectedSymptoms.length > 0) {
                clearInterval(interval)
            } else {
                this.textAnimationAdd();
            }
        })
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    getAge(birthday) {
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    textAnimationAdd() {
        if (counter <= txtString.length) {
            if (document.getElementById('animation-input')) {
                document.getElementById('animation-input').placeholder += txtString.charAt(counter);
                counter++;
                setTimeout(this.textAnimationAdd.bind(this), speed);
            }
        }
        else {
            this.getInterval();
        }
    }

    getInterval() {
        interval = setInterval(this.textAnimationDel.bind(this), speed);
    }

    textAnimationDel() {
        if (!document.getElementById('animation-input')) {
            clearInterval(interval);
        }
        else {
            if (txtString.length > 0) {
                document.getElementById('animation-input').placeholder = txtString;
                txtString = txtString.substring(0, txtString.length - 1);
            }
            else {
                clearInterval(interval);
                txtString = 'I am suffering from Cold';
                counter = 0;
                document.getElementById('animation-input').placeholder = '';
                this.textAnimationAdd();
            }
        }
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
                <header className="profile-header" style={{ display: 'block' }}>
                    <div className="smiley-img-div">
                        <img src="/assets/img/customer-icons/smiley.png" />
                    </div>
                    <div className="container">
                        <div className="row header-row">
                            <div className="col-3 logo-icon-div">
                                <a href="javascript:;"><img src="/assets/img/doc-prime-logo.png" className="logo-icon" /></a>
                            </div>
                            {/* for Desktop Only */}
                            {
                                profileData ? <div className="col-lg-4 d-none d-lg-block header-items-rt">
                                    <div className="header-item" onClick={this.navigateTo.bind(this, '/notifications')}>
                                        <img src="/assets/img/customer-icons/bell-white.svg" className="header-icons bell-web-icon" />
                                        <span className="header-item-label">Notifications</span>
                                        <img src="/assets/img/customer-icons/down-filled.svg" className="header-icons down-web-icon" />
                                    </div>
                                    <div className="header-item logout-item">
                                        <img src="/assets/img/customer-icons/logout.svg" className="header-icons logout-web-icon" />
                                        <span className="header-item-label">Logout</span>
                                    </div>
                                </div> : ""
                            }

                            {/* for Desktop Only Ends*/}
                            {/* for mobile only */}
                            {/* this section will only visible when the user is logged out */}
                            <div className="col-3 d-lg-none login-btn-div">
                                {
                                    this.props.profiles[this.props.selectedProfile] ? "" : <button className="login-btn fw-500" onClick={this.navigateTo.bind(this, '/user')}>Login</button>
                                }

                            </div>
                            {/*  logged out section ends */}
                            <div className="col-3 col-sm-1 d-lg-none bell-icon-div">
                                <img src="/assets/img/customer-icons/bell-white.svg" className="bell-mobile-icon" onClick={this.navigateTo.bind(this, '/notifications')} />
                                {
                                    this.props.newNotification ? <span className="notification-alert">{this.props.notifications.length}</span> : ""
                                }
                            </div>
                            {/* for mobile only ends */}
                        </div>
                        {/* for mobile only */}
                    </div>
                </header>

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
                                        <p className="logout-text fw-500">After login your details will be visible here. You can consult with the doctor, book appoinments and your medical tests</p>
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
                            {/* only for mobile */}

                            {/* <div className="book-widget appointment-widget">
                                <div className="row">
                                    <div className="col-3 col-sm-2 appointment-img-col">
                                        <img src="/assets/img/customer-icons/mobile-appointment.svg" />
                                    </div>
                                    <div className="col-6 col-sm-8 appointment-content-col">
                                        <p className="fw-500">Appoinment for Arun Kumar</p>
                                        <p className="appointment-date">On 29th April 2017</p>
                                        <p className="appointment-doc">With Dr. Angela Smith</p>
                                    </div>
                                    <div className="col-3 col-sm-2">
                                        <div className="navigate-img">
                                            <img src="/assets/img/customer-icons/navigate.svg" />
                                        </div>
                                        <p className="navigate-text">Navigate</p>
                                    </div>
                                </div>
                            </div> */}

                            {/* only for mobile ends */}
                            <div className="book-widget">
                                <ul className="book-list">
                                    <a href="javascript:;"><li className="book-list-last-item">
                                        <div className="book-list-img-div">
                                            <img src="/assets/img/customer-icons/consultation.svg" className="book-list-img" />
                                        </div>
                                        <div className="book-list-label-div">
                                            <p className="book-list-label">Get instant Consultation right now for <span>FREE</span></p>
                                        </div>
                                        <div className="book-list-arrow">
                                            <img src="/assets/img/customer-icons/right-arrow.svg" className="list-arrow-rt" />
                                        </div>
                                    </li></a>
                                </ul>
                                <div className="symptoms-div">
                                    <div className="scroll-arrow-div-rt symptoms-rt">
                                        <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                                    </div>
                                    <div className="scroll-arrow-div-lt symptoms-lt">
                                        <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                                    </div>
                                    <p className="symptoms-label">Select Symptom</p>
                                    <div className="symptoms-list-div">
                                        <ul className="symptoms-list">
                                            {
                                                this.state.symptoms.map((symp, i) => {
                                                    return <li className={this.state.selectedSymptoms.indexOf(symp) > -1 ? "selectedSymp" : ""} key={i} onClick={this.toggleSymptom.bind(this, symp)}>
                                                        <p className={this.state.selectedSymptoms.indexOf(symp) > -1 ? "selectedSympP symptoms-list-item" : "symptoms-list-item"}>{symp}</p>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="input-symptom-div">
                                    <div className="send-btn">
                                        {
                                            selectedSympsStr ? <img src="/assets/img/icons/send-orange.svg" /> : ""
                                        }
                                    </div>

                                    {
                                        selectedSympsStr ? <input type="text" className="input-symptom" placeholder={selectedSympsStr} /> : <input type="text" id="animation-input" className="input-symptom" placeholder="" />
                                    }

                                </div>
                            </div>
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
                            <div className="horizontal-widget">
                                <div className="view-all-div">
                                    <a href="javascript:;"><p className="view-all-text">View All</p></a>
                                </div>
                                <div className="scroll-arrow-div-rt">
                                    <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                                </div>
                                <div className="scroll-arrow-div-lt">
                                    <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                                </div>
                                <div className="hr-widget-head-div">
                                    <p className="hr-widget-head">Know about Diseases</p>
                                </div>
                                <div className="select-item-div">
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
                                </div>
                            </div>
                            <div className="horizontal-widget">
                                <div className="view-all-div">
                                    <a href="javascript:;"><p className="view-all-text">View All</p></a>
                                </div>
                                <div className="scroll-arrow-div-rt">
                                    <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                                </div>
                                <div className="scroll-arrow-div-lt">
                                    <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                                </div>
                                <div className="hr-widget-head-div">
                                    <p className="hr-widget-head">Know about Medicines</p>
                                </div>
                                <div className="select-item-div">
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
                                </div>
                            </div>
                        </div>

                        <RightBar />
                    </div>
                </section>

            </div>
        );
    }
}

export default HomeView
