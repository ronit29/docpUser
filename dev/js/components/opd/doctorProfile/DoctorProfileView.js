import React from 'react';

import Loader from '../../commons/Loader'

import DoctorProfileCard from '../commons/doctorProfileCard'
import AboutDoctor from '../doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">

                            <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="header-title fw-700 capitalize text-white">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li>
                                                        <span className="ct-img ct-img-sm arrow-img">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='col-8'>
                                            <div className="header-title fw-700 capitalize text-white text-center">Doctor Details</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }} onClick={() => {
                                            this.props.history.push('/')
                                        }}>
                                            <div className="mobile-home-icon-div" >
                                                <img src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                            {/* <ul className="inline-list float-right user-notification-action">
                                                <li><span className="icon icon-md text-middle"><img src={ASSETS_BASE_URL + "/img/customer-icons/user.svg"} className="img-fluid" /></span></li>
                                    <li><span className="icon icon-md text-middle notification-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/notification.svg"} className="img-fluid" /> <span className="notification-alert" /></span></li> 
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {
                                this.props.DOCTORS[this.state.selectedDoctor] ?

                                    <section className="dr-profile-screen">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="widget mrt-10 ct-profile skin-white">
                                                        <DoctorProfileCard
                                                            details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                        />
                                                        <div className="widge-content pd-0">
                                                            {
                                                                this.props.DOCTORS[this.state.selectedDoctor].about ? <AboutDoctor
                                                                    details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                                /> : ""
                                                            }

                                                            {
                                                                (this.props.DOCTORS[this.state.selectedDoctor].hospitals && this.props.DOCTORS[this.state.selectedDoctor].hospitals.length) ? <ClinicSelector
                                                                    details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                                    {...this.props}
                                                                /> : ""
                                                            }

                                                            <ProfessionalGraph
                                                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section> : <Loader />
                            }
                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}

export default DoctorProfileView
