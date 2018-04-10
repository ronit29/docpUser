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
                <DoctorProfileCard 
                    hideBottom={true}
                />
                <ClinicSelector />  
            </div>
        );
    }
}


export default ClinicListView
