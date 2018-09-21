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
import HelmetTags from '../HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'

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
        delete test.icon
        let searchData = {
            selectedCriterias: [test],
            selectedLocation: this.props.selectedLocation,
        }
        let data = {
            'Category': 'ConsumerApp', 'Action': 'SelectedBookTest', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-book-test', 'selected': test.name || '', 'selectedId': test.id || ''
        }
        GTM.sendEvent({ data: data })
        let url = this.buildURI_LAB([test], this.props.selectedLocation, this.props.filterCriteria_lab, "")
        this.props.history.push(url)
    }

    searchDoctor(speciality) {
        speciality.type = 'speciality'
        let data = {
            'Category': 'ConsumerApp', 'Action': 'SelectedDoctorSpecializations', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-doctor-specializations', 'selected': speciality.name || '', 'selectedId': speciality.id || ''
        }
        GTM.sendEvent({ data: data })
        delete speciality.icon

        let url = this.buildURI_OPD([speciality], this.props.selectedLocation, this.props.filterCriteria_opd, "", "")
        this.props.history.push(url)
    }

    buildURI_OPD(selectedCriterias, selectedLocation, filterCriteria, doctor_name, hospital_name) {
        let specialization_ids = selectedCriterias
            .filter((x) => {
                return x.type == "speciality"
            }).map((x) => {
                return x.id
            }).join(',')

        let condition_ids = selectedCriterias
            .filter((x) => {
                return x.type == "condition"
            }).map((x) => {
                return x.id
            }).join(',')


        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (selectedLocation) {
            place_id = selectedLocation.place_id || ""
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let min_fees = filterCriteria.priceRange[0]
        let max_fees = filterCriteria.priceRange[1]
        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let is_available = filterCriteria.is_available
        let is_female = filterCriteria.is_female

        let url = `/opd/searchresults?specializations=${specialization_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&doctor_name=${doctor_name}&hospital_name=${hospital_name}&place_id=${place_id}`

        return url
    }

    buildURI_LAB(selectedCriterias, selectedLocation, filterCriteria, lab_name) {
        let specialization_ids = selectedCriterias
            .filter((x) => {
                return x.type == "test"
            })
            .map((x) => {
                return x.id
            }).join(',')

        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (selectedLocation) {
            place_id = selectedLocation.place_id || ""
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let min_price = filterCriteria.priceRange[0]
        let max_price = filterCriteria.priceRange[1]
        let sort_on = filterCriteria.sort_on || ""

        let url = `/lab/searchresults?test_ids=${specialization_ids}&min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}`

        return url
    }

    render() {
        let profileData = this.props.profiles[this.props.selectedProfile]

        let articles = this.props.articles || []

        return (
            <div className="profile-body-wrap">

                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
                }} setDefault={true} />

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
                                            <h2>Find a Doctor</h2> <span className="ofr-ribbon">Upto 50% Off</span>
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
                                            <h2>Book a Test</h2> <span className="ofr-ribbon">Upto 50% Off</span>
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
