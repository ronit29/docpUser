import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import AppointmentSlotView from '../components/appointmentSlot/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <AppointmentSlotView />
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


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
