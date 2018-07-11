import React from 'react';

import ProfieCard from './ProfileCard'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'

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
        this._ismounted = true
        this.txtAnimation();
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    toggleSymptom(name) {
        if (this.state.selectedSymptoms.indexOf(name) > -1) {
            this.state.selectedSymptoms.splice(this.state.selectedSymptoms.indexOf(name), 1)
        } else {
            this.state.selectedSymptoms.push(name)
        }

        this.setState(this.state)
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
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

    delay() {
        return new Promise((resolve) => {
            setTimeout(resolve, 100)
        })
    }

    async txtAnimation() {
        while (true) {
            let txt = 'I am suffering from Headache.'
            for (let chr of txt) {
                if (!this._ismounted) {
                    break
                }
                await this.delay()
                if (document.getElementById('animation-input')) {
                    document.getElementById('animation-input').placeholder += chr
                }
            }
            for (let chr of txt) {
                if (!this._ismounted) {
                    break
                }
                await this.delay()
                txt = txt.substring(0, txt.length - 1)
                if (document.getElementById('animation-input')) {
                    document.getElementById('animation-input').placeholder = txt
                }
            }
            if (!this._ismounted) {
                break
            }
        }
        return
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
                                <div className="input-symptom-div" onClick={this.navigateTo.bind(this, '/chat')}>
                                    <div className="send-btn">
                                        {
                                            selectedSympsStr ? <img src="/assets/img/icons/send-orange.svg" /> : ""
                                        }
                                    </div>

                                    {
                                        selectedSympsStr ? <input disabled type="text" className="input-symptom" placeholder={selectedSympsStr} /> : <input disabled type="text" id="animation-input" className="input-symptom" placeholder="" />
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

                <Footer />

            </div>
        );
    }
}

export default HomeView
