import React from 'react';

import DoctorProfileCard from '../../components/commons/doctorProfileCard/index.js'
import AboutDoctor from '../../components/doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../../components/doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../../components/commons/clinicSelector/index.js'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="doctorProfile">
                {
                    this.props.selectedDoctor ?
                        <DoctorProfileCard
                            hideBottom={true}
                            details={this.props.DOCTORS[this.props.selectedDoctor]}
                        /> : ''
                }
                <AboutDoctor />
                {
                    this.props.selectedDoctor ?
                        <ClinicSelector
                            details={this.props.DOCTORS[this.props.selectedDoctor]}
                            {...this.props}
                        /> : ''
                }

                <ProfessionalGraph />
            </div>
        );
    }
}

export default DoctorProfileView
