import React from 'react';

import DoctorProfileCard from '../../components/commons/doctorProfileCard/index.js'
import ClinicSelector from '../../components/commons/clinicSelector/index.js'

class ClinicListView extends React.Component {
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
                {
                    this.props.selectedDoctor ?
                        <ClinicSelector
                            details={this.props.DOCTORS[this.props.selectedDoctor]}
                            {...this.props}
                        /> : ''
                }
            </div>
        );
    }
}


export default ClinicListView
