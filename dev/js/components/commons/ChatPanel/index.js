import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, setChatRoomId } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import { getChatDoctorById, resetFilters, clearExtraTests, selectLocation, loginViaChat, startLiveChat, toggleDiagnosisCriteria, toggleOPDCriteria, unSetCommonUtmTags } from '../../../actions/index.js'

import ChatPanelView from './ChatPanel'

class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ssrFlag: this.props.homePage
        }
    }

    componentDidMount() {
        this.setState({ ssrFlag: true })
    }

    render() {
        let ct_style = this.props.homePage ? "col-md-7 mb-3" : this.props.colClass ? "col-lg-4 col-md-5 mb-3" : this.props.newChatBtnAds ? '' : "col-md-5 mb-3"
        if (this.props.homePage && !this.props.chatPage)
            ct_style = "col-md-7 mb-3 d-none d-md-block"
        return (
            <div className={ct_style}>
                {
                    this.state.ssrFlag ?
                        <ChatPanelView {...this.props} /> : ''
                }
            </div>
        )
    }
}

const mapStateToProps = (state, passedProps = {}) => {
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
        USER, DOCTORS, doctor_search_data, lab_search_data, ...passedProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChatDoctorById: (doctorId, roomId, cb) => dispatch(getChatDoctorById(doctorId, roomId, cb)),
        resetFilters: () => dispatch(resetFilters()),
        clearExtraTests: () => dispatch(clearExtraTests()),
        selectLocation: (location) => dispatch(selectLocation(location)),
        loginViaChat: (token) => dispatch(loginViaChat(token)),
        setChatRoomId: (roomId) => dispatch(setChatRoomId(roomId)),
        startLiveChat: (started, deleteRoomId) => dispatch(startLiveChat(started, deleteRoomId)),
        toggleDiagnosisCriteria: (type, test, forceAdd, filters) => dispatch(toggleDiagnosisCriteria(type, test, forceAdd, filters)),
        toggleOPDCriteria: (type, test, forceAdd, filters) => dispatch(toggleOPDCriteria(type, test, forceAdd, filters)),
        unSetCommonUtmTags: (type, tags) => dispatch(unSetCommonUtmTags(type, tags))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatPanel))
