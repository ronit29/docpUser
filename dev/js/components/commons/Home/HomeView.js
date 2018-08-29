import React from 'react';

import ProfieCard from './ProfileCard'
// import LeftBar from '../LeftBar'
// import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'
// import Articles from './articles'
// import ChatSymptoms from './chatSymptom.js'
import InitialsPicture from '../initialsPicture'
// import HealthTips from './healthTipMobile.js'
import HealthTip from '../RightBar/healthTip.js'
import ChatPanel from '../ChatPanel'

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

    searchLab(test) {
        test.type = 'test'
        let searchData = {
            selectedCriterias: [test],
            selectedLocation: this.props.selectedLocation,
        }

        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria_lab))
        this.props.history.push(`/lab/searchresults?search=${searchData}&filter=${filterData}&lab_name=`, {
            scrollTop: true
        })
    }

    searchDoctor(speciality) {
        speciality.type = 'speciality'
        let searchData = {
            selectedCriterias: [speciality],
            selectedLocation: this.props.selectedLocation,
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria_opd))
        this.props.history.push(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=&hospital_name=`, {
            scrollTop: true
        })
    }

    render() {

        let profileData = this.props.profiles[this.props.selectedProfile]

        let articles = this.props.articles || []

        return (
            <div className="profile-body-wrap">

                <ProfileHeader homePage={true} />

                {/* {
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
                } */}

                <div className="sub-header mrg-top"></div>

                <div className="chat-main-container">
                    <div className="container">
                        <div className="row">

                            <ChatPanel homePage={true} />

                            <div className="col-md-5">
                                <div className="right-card-container">


                                    {/* <div className="card cstm-card mb-3">
                                        <div className="card-header">
                                            Get a Deal
                                            <a href="javascript:void(0);">View all</a>
                                        </div>
                                        <div className="card-body pt-0 pb-0">
                                            <div className="deal-listing">
                                                <ul className="deal-ul">
                                                    <li><a href="javascript:void(0);">Book CBC Test Starting just   <span>₹ 250 only</span></a></li>
                                                    <li><a href="javascript:void(0);"><span>Get 40%</span>    OFF on ENT Specialists</a></li>
                                                    <li><a href="javascript:void(0);"><span>Get upto 70%</span>    OFF on full body checkup</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}



                                    {/* Find a doctor */}
                                    <div className="card cstm-card mb-3">
                                        <div className="card-header" style={{ justifyContent: 'normal' }}>
                                            Find a Doctor <span className="ofr-ribbon">Upto 50% Off</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mb-2">

                                                {
                                                    this.props.specializations.map((sp, i) => {
                                                        return <div className="col-4" key={i} onClick={this.searchDoctor.bind(this, sp)}>
                                                            <div className="grid-img-cnt brdr-btm brdr-btm">
                                                                <a href="javascript:void(0);">
                                                                    <img className="img-fluid" src={sp.icon} />
                                                                    <span>{sp.name}</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    })
                                                }

                                                <div className="col-4">
                                                    <div className="grid-img-cnt brdr-btm">
                                                        <a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/opd')}>
                                                            <img className="img-fluid" src="/assets/images/vall.png" />
                                                            <span>Search more specializations</span>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>



                                    {/* Book a test */}
                                    <div className="card cstm-card mb-3">
                                        <div className="card-header" style={{ justifyContent: 'normal' }}>
                                            Book a Test <span className="ofr-ribbon">Upto 50% Off</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mb-2">

                                                {
                                                    this.props.common_tests.map((ct, i) => {
                                                        return <div className="col-4" key={i} onClick={this.searchLab.bind(this, ct)}>
                                                            <div className="grid-img-cnt brdr-btm">
                                                                <a href="javascript:void(0);">
                                                                    <img className="img-fluid" src={ct.icon} />
                                                                    <span> {ct.name} </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    })
                                                }

                                                <div className="col-4">
                                                    <div className="grid-img-cnt brdr-btm">
                                                        <a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/lab')}>
                                                            <img className="img-fluid" src="/assets/images/vall.png" />
                                                            <span>Search more tests</span>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* <section className="container">
                    <div className="row main-row">

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
                                    <div className="bk-widget text-center" onClick={this.navigateTo.bind(this, '/lab')}>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/medical-test.svg"} className="book-list-img" />
                                        <p className="fw-500 mrt-10">Book Medical Test</p>
                                    </div>
                                </div>
                            </div>

                            <HealthTip healthTips={this.props.healthTips} customClass="d-lg-none" />

                        </div>

                    </div>
                </section> */}


                <Footer />

            </div >
        );
    }
}

export default HomeView
