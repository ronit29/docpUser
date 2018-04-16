import React from 'react';

import DoctorProfileCard from '../commons/doctorProfileCard/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

class ClinicListView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: null
        }
    }

    componentDidMount() {
        let doctorId = this.props.match.params.id
        if (doctorId) {
            this.setState({ selectedDoctor: doctorId })
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
                                hideBookNow={true}
                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                            />
                            <ClinicSelector
                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                                {...this.props}
                            />
                        </div> : ""
                }
            </div>
        );
    }
}


export default ClinicListView
