import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import DoctorProfileCard from '../components/commons/doctorProfileCard/index.js'
import AboutDoctor from '../components/doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../components/doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../components/commons/clinicSelector/index.js'

class DoctorProfile extends React.Component {
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

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
