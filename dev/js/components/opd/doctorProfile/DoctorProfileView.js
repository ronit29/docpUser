import React from 'react';

import DoctorProfileCard from '../commons/doctorProfileCard/index.js'
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
                                <div className="header-title fw-700 capitalize text-white">ICON</div>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <ul className="inline-list float-right user-notification-action">
                                    <li><span className="icon icon-md text-middle"><img src="img/customer-icons/user.svg" className="img-fluid" /></span></li>
                                    <li><span className="icon icon-md text-middle notification-icon"><img src="img/customer-icons/notification.svg" className="img-fluid" /> <span className="notification-alert" /></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                {
                    this.props.DOCTORS[this.state.selectedDoctor] ?
                        <div>


                        </div> : <Loader />
                }

                {/* {
                    this.props.DOCTORS[this.state.selectedDoctor] ?
                        <div>
                            <DoctorProfileCard
                                hideBottom={true}
                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                            />
                            <AboutDoctor />
                            <ClinicSelector
                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                                {...this.props}
                            />
                            <ProfessionalGraph />
                        </div> : ""
                } */}

            </div>
        );
    }
}

export default DoctorProfileView
