import React from 'react';

import DoctorProfileCard from '../../components/commons/doctorProfileCard/index.js'
import AboutDoctor from '../../components/doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../../components/doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../../components/commons/clinicSelector/index.js'

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor : null
        }
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id
        if (doctorId) {
            this.setState({selectedDoctor : doctorId})
            this.props.getDoctorById(doctorId)
        }
    }

    render() {

        return (
            <div className="doctorProfile">

                {
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
                }

            </div>
        );
    }
}

export default DoctorProfileView
