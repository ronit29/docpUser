import React from 'react';
import { connect } from 'react-redux';

import EmotiIcon from 'material-ui-icons/AccountCircle';
import HomeIcon from 'material-ui-icons/Home';
import ClockIcon from 'material-ui-icons/AvTimer';
import LocationsIcon from 'material-ui-icons/LocationOn';

import DoctorProfileCard from '../../commons/doctorProfileCard/index.js'

class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let { DOCTORS, doctorList } = this.props
        
        return (
            <div className="doctorsList">
                {
                    doctorList.map((docId, i) => {
                        return <DoctorProfileCard details={DOCTORS[docId]} selectDoctor={this.props.selectDoctor} key={i}/>
                    })
                }
            </div>
        );
    }
}


export default DoctorsList
