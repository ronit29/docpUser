import React from 'react';
import { connect } from 'react-redux';

import EmotiIcon from 'material-ui-icons/AccountCircle';
import HomeIcon from 'material-ui-icons/Home';
import ClockIcon from 'material-ui-icons/AvTimer';
import LocationsIcon from 'material-ui-icons/LocationOn';

import DoctorProfileCard from '../../commons/doctorProfileCard/index.js'
import { getDoctors } from "../../../actions";


class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('DoctorsList did mount.');
        this.getDoctorList();
    }
    getDoctorList() {
        //TODO create request from state filters

        this.props.getDoctors();




    }
    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="doctorsList">
                <DoctorProfileCard />
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
        getDoctors
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoctorsList);
