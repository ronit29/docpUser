import React from 'react';

import ProfieCard from './ProfileCard'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'
import Articles from './articles'
import ChatSymptoms from './chatSymptom.js'
import InitialsPicture from '../initialsPicture'
// import HealthTips from './healthTipMobile.js'
import HealthTip from '../RightBar/healthTip.js'


const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    navigateTo(where, data, e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (where == '/chat') {
            this.props.history.push(where, data)
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

        let articles = this.props.articles || []

        return (
            <div className="profile-body-wrap">

                <ProfileHeader homePage={true} />

                {
                    profileData ? <div className="row mobile-profile-row d-lg-none" onClick={this.navigateTo.bind(this, '/user')}>
                        <div className="container mobile-profile-row-container">
                            <div className="row mobile-profile-inside-row">
                                <div className="profile-icon-div">
                                    <InitialsPicture name={profileData.name} has_image={!!profileData.profile_image} className="initialsPicture" style={{ fontSize: 24 }}>
                                        <img src={profileData.profile_image || (ASSETS_BASE_URL + "/img/icons/drIcon.jpg")} className="profile-icon" />
                                    </InitialsPicture>
                                </div>
                                <div className="profile-info-div">
                                    <p className="profile-info profile-name">{profileData.name}</p>
                                    {
                                        !profileData.isDummyUser ? <p className="profile-info">{GENDER[profileData.gender]}, {this.getAge(profileData.dob)} Years</p> : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : <div className="row mobile-profile-row d-lg-none">
                        </div>
                }

                <div className="subheader d-none d-lg-block"></div>
                <section className="container">
                    <div className="row main-row">
                        <LeftBar hideStickyTemp={true} />

                        <div className={"col-12 col-md-10 offset-md-1 offset-lg-0 col-lg-6 profile-main-section" + (profileData ? "" : " profile-main-section-logout")}>

                            <ChatSymptoms navigateTo={this.navigateTo.bind(this)} />

                            <div className="row mrt-20 row-eq-height" style={{ height: 140 }} >
                                <div className="col-6 bk-widget-col-left">
                                    <div className="bk-widget text-center" onClick={this.navigateTo.bind(this, '/opd')}>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/book-doctor.svg"} className="book-list-img" />
                                        <p className="fw-500 mrt-10">Book and Visit a Doctor</p>
                                    </div>
                                </div>
                                <div className="col-6 bk-widget-col-right">
                                    <div className="bk-widget text-center" onClick={this.navigateTo.bind(this, '/dx')}>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/medical-test.svg"} className="book-list-img" />
                                        <p className="fw-500 mrt-10">Book Medical Test</p>
                                    </div>
                                </div>
                            </div>

                            {
                                articles.map((article, i) => {
                                    if (article.data && article.data.length) {
                                        return <Articles title={`Know about ${article.title}`} key={i}>
                                            <ul className="select-item-list">
                                                {
                                                    article.data.map((curr, j) => {
                                                        return <li key={j} onClick={this.navigateTo.bind(this, `/article/${curr.id}`)}>
                                                            <div className="item-img">
                                                                <img src={curr.icon} style={{ width: 50 }} />
                                                            </div>
                                                            <div className="item-name">
                                                                <p>{curr.title}</p>
                                                            </div>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Articles>
                                    } else {
                                        return ""
                                    }
                                })
                            }

                            {/* <HealthTip healthTips={this.props.healthTips} customClass="d-lg-none" /> */}

                        </div>

                        <RightBar hideStickyTemp={true} />
                    </div>
                </section>

                <Footer/>

            </div >
        );
    }
}

export default HomeView
