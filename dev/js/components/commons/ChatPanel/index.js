import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import { getChatDoctorById, resetFilters, clearExtraTests, selectLocation, loginViaChat } from '../../../actions/index.js'

import ChatPanelView from './ChatPanel'

class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {

        return (
            <ChatPanelView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let DOCTORS = state.DOCTORS
    let doctor_search_data = {}
    let lab_search_data = {}

    doctor_search_data.selectedCriterias = state.SEARCH_CRITERIA_OPD.selectedCriterias
    doctor_search_data.selectedLocation = state.SEARCH_CRITERIA_OPD.selectedLocation
    doctor_search_data.filterCriteria = state.SEARCH_CRITERIA_OPD.filterCriteria

    lab_search_data.selectedCriterias = state.SEARCH_CRITERIA_LABS.selectedCriterias
    lab_search_data.selectedLocation = state.SEARCH_CRITERIA_LABS.selectedLocation
    lab_search_data.filterCriteria = state.SEARCH_CRITERIA_LABS.filterCriteria

    return {
        USER, DOCTORS, doctor_search_data, lab_search_data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChatDoctorById: (doctorId, roomId, cb) => dispatch(getChatDoctorById(doctorId, roomId, cb)),
        resetFilters: () => dispatch(resetFilters()),
        clearExtraTests: () => dispatch(clearExtraTests()),
        selectLocation: (location) => dispatch(selectLocation(location)),
        loginViaChat: (token) => dispatch(loginViaChat(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatPanel))