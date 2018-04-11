import React from 'react';

import DoctorProfileCard from '../../components/commons/doctorProfileCard/index.js'
import AboutDoctor from '../../components/doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../../components/doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../../components/commons/clinicSelector/index.js'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id
        if (doctorId) {
            this.props.getDoctorById(doctorId)
        }
    }

    render() {

        return (
            <div className="doctorProfile">

                {
                    this.props.DOCTORS[this.props.selectedDoctor] ?
                        <div>
                            <DoctorProfileCard
                                hideBottom={true}
                                details={this.props.DOCTORS[this.props.selectedDoctor]}
                            />
                            <AboutDoctor />
                            <ClinicSelector
                                details={this.props.DOCTORS[this.props.selectedDoctor]}
                                {...this.props}
                            />
                            <ProfessionalGraph />
                        </div> : ""
                }

            </div>
        );
    }
}

export default DoctorProfileView
