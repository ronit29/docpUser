import React from 'react';

import ProfileHeader from '../DesktopProfileHeader'
import Footer from './footer'
import ChatPanel from '../ChatPanel'
import HelmetTags from '../HelmetTags'
import GTM from '../../../helpers/gtm.js'
import CONFIG from '../../../config'
import HomePageWidget from './HomePageWidget'
const queryString = require('query-string');

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class HomeChatView extends React.Component {
    constructor(props) {
        super(props);
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            specialityFooterData: footerData
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        this.props.getSpecialityFooterData((cb) => {
            this.setState({ specialityFooterData: cb });
        });

        let selectedLocation = ''
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation) {
            selectedLocation = this.props.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }

        this.props.getOfferList(lat, long);
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

    searchLab(test, isPackage = false) {
        test.type = 'test'
        this.props.toggleDiagnosisCriteria('test', test, true)
        let data
        if (isPackage) {
            data = {
                'Category': 'ConsumerApp', 'Action': 'SelectedHealthPackage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-health-package', 'selected': test.name || '', 'selectedId': test.id || ''
            }
        } else {
            data = {
                'Category': 'ConsumerApp', 'Action': 'SelectedBookTest', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-book-test', 'selected': test.name || '', 'selectedId': test.id || ''
            }
        }

        GTM.sendEvent({ data: data })

        setTimeout(() => {
            this.props.history.push('/lab/searchresults')
        }, 100)
    }

    searchDoctor(speciality) {
        speciality.type = 'speciality'
        this.props.toggleOPDCriteria('speciality', speciality, true)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'SelectedDoctorSpecializations', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'selected-doctor-specializations', 'selected': speciality.name || '', 'selectedId': speciality.id || ''
        }
        GTM.sendEvent({ data: data })

        setTimeout(() => {
            this.props.history.push('/opd/searchresults')
        }, 100)
    }

    gotToSignup() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'HomepageBannerSignupClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'homepage-banner-signup-clicked'
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/user?ref=home')
    }

    gotToDoctorSignup(isLab) {
        let data
        if (isLab) {
            data = {
                'Category': 'ConsumerApp', 'Action': 'RunLabBannerClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'run-lab-banner-clicked'
            }
        } else {
            data = {
                'Category': 'ConsumerApp', 'Action': 'RunClinicBannerClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'run-clinic-banner-clicked'
            }
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/doctorsignup')
    }

    render() {

        let topSpecializations = []
        if (this.props.specializations && this.props.specializations.length && this.props.specializations.length > 5) {
            topSpecializations = this.props.specializations.slice(0, 5)
        } else {
            topSpecializations = this.props.specializations
        }

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

            slabOrder.push(<ChatPanel homePage={true} chatPage={true} offerList={this.props.offerList} />)
            slabOrder.push(
                <div className="col-md-5">
                    <div className="right-card-container">

                        <HomePageWidget
                            heading="Find a Doctor"
                            discount="50%"
                            list={topSpecializations}
                            searchFunc={(sp) => this.searchDoctor(sp)}
                            searchType="specializations"
                            {...this.props}
                            navTo="/search?from=home"
                            type="opd"
                        />

                        <div className="fw-500 doc-lap-link d-md-none">
                            <span className="top-head-link card-lab-link" onClick={() => this.props.history.push('/doctorsignup')}>Register your clinic or Hospital <img width="18px" src={ASSETS_BASE_URL + "/img/arrow-link.svg"} />  </span>
                        </div>
                    </div>
                </div>)

            slabOrder.push(
                <div className="col-md-5">
                    <div className="right-card-container">

                        <HomePageWidget
                            heading="Book a Test"
                            discount="50%"
                            list={this.props.common_tests}
                            searchFunc={(ct) => this.searchLab(ct, false)}
                            searchType="tests"
                            {...this.props}
                            navTo="/search?from=home"
                            type="lab"
                        />

                        {
                            this.props.common_package && this.props.common_package.length ?
                                <HomePageWidget
                                    heading="Health Packages"
                                    discount="50%"
                                    list={this.props.common_package}
                                    searchFunc={(ct) => this.searchLab(ct, true)}
                                    type="package"
                                    searchType="packages"
                                    {...this.props}
                                    linkTo="/full-body-checkup-health-packages?from=home"
                                    // navTo="/health-package-advisor"
                                    navTo="/searchpackages"
                                /> : ""
                        }
                    </div>
                </div>)

            let temp
            for (var j = SlabSequence; j > 0; j--) {
                temp = slabOrder[j]
                slabOrder[j] = slabOrder[j - 1]
                slabOrder[j - 1] = temp
            }

        } else {

            slabOrder.push(<ChatPanel homePage={true} chatPage={true} offerList={this.props.offerList} />)
            slabOrder.push(
                <div className="col-md-5">
                    <div className="right-card-container">

                        {/* {
                            !!!profileData ?
                                <div className="home-signup-banner" onClick={this.gotToSignup.bind(this)}>
                                    <div className="banner-content-home">
                                        <div className="banner-lft-content">
                                            <span className="bn-up-txt">
                                                Get extra
                                         </span>
                                            <p className="sign-up-offer">
                                                ₹ 300 OFF
                                            </p>
                                            <span className="bn-down-offer">
                                                on bookings
                                         </span>
                                        </div>
                                        <button className="signup-btn-banner">
                                            Signup Now <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} />
                                        </button>
                                    </div>
                                </div> : ''
                        } */}

                        <HomePageWidget
                            heading="Find a Doctor"
                            discount="50%"
                            list={topSpecializations}
                            searchFunc={(sp) => this.searchDoctor(sp)}
                            searchType="specializations"
                            {...this.props}
                            navTo="/search?from=home"
                            type="opd"
                        />

                        <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, false)}>
                            <p className="top-head-link card-lab-link">Run a clinic? Increase your<span>reach & brand NOW!</span> </p>
                            <button className="lap-doc-btn" >Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
                        </div>

                        {
                            this.props.common_package && this.props.common_package.length ?
                                <HomePageWidget
                                    heading="Health Packages"
                                    discount="50%"
                                    list={this.props.common_package}
                                    searchFunc={(ct) => this.searchLab(ct, true)}
                                    type="package"
                                    searchType="packages"
                                    {...this.props}
                                    linkTo="/full-body-checkup-health-packages?from=home"
                                    // navTo="/health-package-advisor"
                                    navTo="/searchpackages"
                                /> : ""
                        }

                        <div className="fw-500 doc-lap-link" onClick={this.gotToDoctorSignup.bind(this, true)}>
                            <p className="top-head-link card-lab-link">Run a lab? Reach more<span>customers near you</span></p>
                            <button className="lap-doc-btn">Join us <img className="img-arwp" src={ASSETS_BASE_URL + "/img/rgtarw.png"} /> </button>
                        </div>

                        <HomePageWidget
                            heading="Book a Test"
                            discount="50%"
                            list={this.props.common_tests}
                            searchFunc={(ct) => this.searchLab(ct, false)}
                            searchType="tests"
                            {...this.props}
                            navTo="/search?from=home"
                            type="lab"
                        />

                    </div>
                </div>)
        }

        return (
            <div className="profile-body-wrap">

                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
                    title: 'Free Online Doctor Consultation: Ask a Doctor & Get Answers for free',
                    description: 'Online Doctor Consultation: Chat with a verified doctor from anywhere for Free & get answers within minutes.'
                }} />

                <ProfileHeader homePage={true} chatPage={true} showSearch={true} />

                <div className="onln-cnslt-head"></div>
                <div className="chat-main-container">
                    <div className="container">
                        <div className="row">
                            {slabOrder}
                        </div>
                    </div>
                </div>

                <Footer specialityFooterData={this.state.specialityFooterData} />

            </div>
        );
    }
}

export default HomeChatView