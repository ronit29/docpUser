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
const queryString = require('query-string');


const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordianShow: false
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

    isSelectedLocationNearDelhi(selectedLocation) {
        try {
            if (selectedLocation) {
                let { geometry } = selectedLocation

                var latitude1 = 28.644800;
                var longitude1 = 77.216721;
                var latitude2 = geometry.location.lat;
                if (typeof geometry.location.lat == 'function') {
                    latitude2 = geometry.location.lat()
                }
                var longitude2 = geometry.location.lng;
                if (typeof geometry.location.lng == 'function') {
                    longitude2 = geometry.location.lng()
                }
                var distance = 0

                if (google) {
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
                }

                return (distance / 1000) < 50
            }
            return false
        } catch (e) {
            return true
        }
    }

    toggleAccordian() {
        this.setState(prevState => ({ accordianShow: !prevState.accordianShow }));
    }

    render() {
        let profileData = this.props.profiles[this.props.selectedProfile]

        let articles = this.props.articles || []
        const parsed = queryString.parse(this.props.location.search)
        let SlabSequence = 0
        if (parsed) {
            if (parsed.journey_type == 'doctor') {
                SlabSequence = 1
            } else if (parsed.journey_type == 'lab') {
                SlabSequence = 2
            }
        }

        let slabOrder = []

        if (this.props.device_info != "desktop" && SlabSequence) {

            slabOrder.push(<ChatPanel homePage={true} />)
            slabOrder.push(
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
                        {
                            this.isSelectedLocationNearDelhi(this.props.selectedLocation) ? <div className="card cstm-card mb-3">
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

                            </div> : <div className="card cstm-card mb-3"></div>
                        }
                        <div className="fw-500 doc-lap-link d-md-none">
                            <span className="top-head-link card-lab-link" onClick={() => this.props.history.push('/doctorsignup')}>Register your clinic or Hospital <img width="18px" src={ASSETS_BASE_URL + "/img/arrow-link.svg"} />  </span>
                        </div>
                    </div>
                </div>)

            slabOrder.push(
                <div className="col-md-5">
                    <div className="right-card-container">

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
                            <p className="fw-500 doc-lap-link d-md-none">
                                <span className="top-head-link card-lab-link" onClick={() => this.props.history.push('/doctorsignup')}>Register your lab <img width="18px" src={ASSETS_BASE_URL + "/img/arrow-link.svg"} /> </span>
                            </p>
                        </div>


                    </div>
                </div>)

            let temp
            for (var j = SlabSequence; j > 0; j--) {
                temp = slabOrder[j]
                slabOrder[j] = slabOrder[j - 1]
                slabOrder[j - 1] = temp
            }


        } else {

            slabOrder.push(<ChatPanel homePage={true} />)
            slabOrder.push(
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
                        {
                            this.isSelectedLocationNearDelhi(this.props.selectedLocation) ? <div className="card cstm-card mb-3">
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

                            </div> : <div className="card cstm-card mb-3"></div>
                        }
                        <div className="fw-500 doc-lap-link d-md-none">
                            <p className="top-head-link card-lab-link">Run a clinic? Increase your<span>reach & brand NOW!</span> </p>
                            <button className="lap-doc-btn" onClick={() => this.props.history.push('/doctorsignup')}>Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
                        </div>


                        {/* Book a test */}
                        {
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

                        }
                        <div className="fw-500 doc-lap-link d-md-none">
                            <p className="top-head-link card-lab-link">Run a lab? Reach more<span>customers near you</span></p>
                            <button className="lap-doc-btn" onClick={() => this.props.history.push('/doctorsignup')} >Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
                        </div>


                    </div>
                </div>)



        }

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

                            {slabOrder}

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

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <div className="dp-accordian">
                                <div className="acdn-title" onClick={() => this.toggleAccordian()}>
                                    <h2 className="fw-500">Know more about docprime</h2>
                                    <img className={this.state.accordianShow ? "acdn-arrow-up" : "acdn-arrow"} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
                                </div>
                                <div className={this.state.accordianShow ? "acdn-body mrt-10 acdn-block" : "acdn-body mrt-10 acdn-none"}>
                                    <hr className="acdn-hr" />
                                    <h3 className="fw-500 mrb-10 acdn-heading">Free Family Doctor for Life</h3>
                                    <p className="text-sm mrb-10">
                                        The enormously low ratio of doctors to patients is one of the biggest challenges for the country’s healthcare system. And that’s why docprime endeavors to bridge the gap between doctors and patients with our cutting-edge technology powered platform to deliver high-quality healthcare anytime anywhere.
                                    </p>
                                    <p className="text-sm mrb-10">
                                        A group company of Policybazaar, docprime gives you access to a vast network of highly skilled and qualified doctors so that you can avail hospital-quality healthcare right from the comfort of your home. The company aims to bring back the concept of a family doctor with its ever-so-growing network of healthcare professionals to make high-quality medical assistance available right at your fingertips.
                                    </p>
                                    <p className="text-sm mrb-10">
                                        With a team of highly-skilled doctors, AI-enabled Chatbot technology and, an easy-to-navigate, user-friendly interface, docprime is all set to beat arduous health challenges and ensure easy access to qualified doctors for billions of people, creating an experience that’s truly delightful for both end-users and healthcare experts.
                                    </p>
                                    <h3 className="fw-500 mrb-10 acdn-heading">docprime for Patients</h3>
                                    <h2 className="acdn-subheading">Free Online Doctor Consultation</h2>
                                    <p className="text-sm mrb-10">
                                        Ask a Doctor & get answers for your health queries for free or indulge in a one-on-one online consultation, at any time and from anywhere. Simply visit our website and start interacting with best-in-class healthcare experts from various specialties.
                                    </p>
                                    <h2 className="acdn-subheading">Book Doctor Appointments Online (upto 50% off)</h2>
                                    <p className="text-sm mrb-10">
                                        Why wait in long queues to book an appointment with the doctor of your choice, when you can easily do it online and that too at a much lower price?Find some of the best doctors near you; check their doctor profiles, and book an appointment online with the doctor of your choice get 50% off on booking fees, all with just a few clicks and in a matter of a few minutes.
                                    </p>
                                    <h2 className="acdn-subheading">Book Tests at Diagnostic Centres & Labs (upto 50% off)</h2>
                                    <p className="text-sm mrb-10">
                                        Discover the best diagnostic centres near you from our huge inventory and book appointments at the diagnostic centre of your choice, in just a few clicks. So book diagnostic tests today and get up to 50% off.
                                    </p>
                                    <h3 className="fw-500 mrb-10 acdn-heading">docprime for Doctors</h3>
                                    <h2 className="acdn-subheading">Widen Your Reach</h2>
                                    <p className="text-sm mrb-10">
                                        Are you a doctor or a healthcare expert? Use docprime to increase your visibility manifold, reach out to a wider range of patients and grow your practice without having to run from pillar to post.
                                    </p>
                                    <h2 className="acdn-subheading">Simplify Your Practice</h2>
                                    <p className="text-sm mrb-10">
                                        Take the hassle out of your practice and focus better on your patients. Automate everything right from appointment management to payment tracking and just focus on providing the highest quality of treatment to their patients.
                                    </p>
                                    <h3 className="fw-500 mrb-10 acdn-heading">docprime Services</h3>
                                    <h2 className="acdn-subheading">Book Lab Test</h2>
                                    <p className="text-sm mrb-10">
                                        Book lab test right from the comfort of your home. Get amazing discounts on lab tests and get samples collected and report delivered, right at your doorsteps.
                                    </p>
                                    <h2 className="acdn-subheading">Health Feed</h2>
                                    <p className="text-sm mrb-10">
                                        Our aim to ensure a healthy lifestyle for everyone and in order to do that our knowledge-packed health feed offers information on various diseases, symptoms, and medicines.
                                    </p>
                                    <h2 className="fw-500 mrb-10 acdn-heading">Questions You May have:</h2>
                                    <h3 className="fw-500 acdn-ques">Question 1: I have a medical question. Can I ask it for free?</h3>
                                    <p className="text-sm mrb-10">
                                        <strong>Answer:</strong> Yes! You can ask your medical questions for free. Alternatively, you may also download docprime App, available at Google Play Store and App Store, for free and ask a free health question to our doctors. Typically, our doctors will answer your query within 24 working hours after receiving your query.
                                    </p>
                                    <h3 className="fw-500 acdn-ques">Question 2: Can doctors at docprime help me with my medical issues?</h3>
                                    <p className="text-sm mrb-10">
                                        <strong>Answer:</strong> Our team of doctors is dedicated to helping you understand your medical issues and identify the next steps that may include lab tests, medications, or tips to improve medical conditions. No matter what your medical questions are, our doctors will be able to point you in the right direction towards the improvement of your health.
                                    </p>
                                    <h3 className="fw-500 acdn-ques">Question 3: What if docprime doctors don’t get me a response?</h3>
                                    <p className="text-sm mrb-10">
                                        <strong>Answer:</strong> Rest assured, our team of doctors will never miss out on responding to your medical questions. If you, still, don’t get a response, do leave us a message at our social media pages or call us up at our toll-free number and our team of experts will love to assist you.
                                    </p>
                                    <h3 className="fw-500 acdn-ques">Question 4: Are doctors on your team qualified?</h3>
                                    <p className="text-sm mrb-10">
                                        <strong>Answer:</strong> We have a hand-picked highly-qualified team of doctors across various specialties. Rest assured, any doctor that you will be consulting at docprime will be a verified, highly-skilled healthcare practitioner.
                                    </p>
                                    <h3 className="fw-500 acdn-ques">Question 5: Is my personal information safe and is the consultation on docprime private?</h3>
                                    <p className="text-sm mrb-10">
                                        <strong>Answer:</strong> Yes! We respect the privacy of every individual. That’s why we make sure that all your private and personal information is not shared with any third-party. In addition, every consultation on docprime is private and confidential.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        );
    }
}

export default HomeView
