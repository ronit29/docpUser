import React from 'react';

import Loader from '../../commons/Loader'

import DoctorProfileCard from '../commons/doctorProfileCard'
import AboutDoctor from '../doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    getMetaTitle(doctorData) {
        return `${doctorData.display_name} - Consult Online`
    }

    render() {

        let doctor_id = this.props.initialServerData || this.props.selectedDoctor
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {/* <header className="skin-primary fixed horizontal top sticky-header">
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
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            {
                                this.props.DOCTORS[doctor_id] ?

                                    <section className="dr-profile-screen">

                                        <HelmetTags tagsData={{
                                            title: this.getMetaTitle(this.props.DOCTORS[doctor_id])
                                        }} />

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="widget mrt-10 ct-profile skin-white">
                                                        <DoctorProfileCard
                                                            details={this.props.DOCTORS[doctor_id]}
                                                        />
                                                        <div className="widge-content pd-0">
                                                            {
                                                                this.props.DOCTORS[doctor_id].about ? <AboutDoctor
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                /> : ""
                                                            }

                                                            {
                                                                (this.props.DOCTORS[doctor_id].hospitals && this.props.DOCTORS[doctor_id].hospitals.length) ? <ClinicSelector
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                    {...this.props}
                                                                /> : ""
                                                            }

                                                            <ProfessionalGraph
                                                                details={this.props.DOCTORS[doctor_id]}
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
