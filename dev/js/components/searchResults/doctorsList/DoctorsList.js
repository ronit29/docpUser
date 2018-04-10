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

        return (
            <div className="doctorsList">
                <DoctorProfileCard />
                <DoctorProfileCard />
                <DoctorProfileCard />
            </div>
        );
    }
}


export default DoctorsList
