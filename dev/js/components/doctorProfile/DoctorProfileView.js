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
                <DoctorProfileCard 
                    hideBottom={true}
                />
                <AboutDoctor />
                <ClinicSelector />
                <ProfessionalGraph />   
            </div>
        );
    }
}

export default DoctorProfileView
