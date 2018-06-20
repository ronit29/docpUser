import React from 'react';

import Loader from '../../commons/Loader'

import DoctorProfileCard from '../commons/doctorProfileCard'
import AboutDoctor from '../doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id
        }
    }

    render() {

        return (
            <div>

                <header className="skin-primary fixed horizontal top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4">
                                <div className="header-title fw-700 capitalize text-white">
                                    <ul className="inline-list top-nav alpha-bx text-white"
                                        onClick={() => {
                                            this.props.history.go(-1)
                                        }}
                                    >
                                        <li>
                                            <span className="ct-img ct-img-sm arrow-img">
                                                <img src="/assets/img/customer-icons/left-arrow.svg" className="img-fluid" />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <ul className="inline-list float-right user-notification-action">
                                    {/* <li><span className="icon icon-md text-middle"><img src="/assets/img/customer-icons/user.svg" className="img-fluid" /></span></li>
                                    <li><span className="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" className="img-fluid" /> <span className="notification-alert" /></span></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                {
                    this.props.DOCTORS[this.state.selectedDoctor] ?
                        <div>
                            <section className="wrap dr-profile-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">
                                                <DoctorProfileCard
                                                    details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                />
                                                <div className="widge-content pd-0">
                                                    <AboutDoctor
                                                        details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                    />

                                                    <ClinicSelector
                                                        details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                        {...this.props}
                                                    />

                                                    <ProfessionalGraph
                                                        details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div> : <Loader />
                }
            </div>
        );
    }
}

export default DoctorProfileView
