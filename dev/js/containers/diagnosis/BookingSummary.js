import React from 'react';
import { connect } from 'react-redux';

import { selectLabTimeSLot, getLabById, getUserProfile, selectLabAppointmentType, getUserAddress, selectPickupAddress, createLABAppointment, sendAgentBookingURL } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryView from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=${this.props.location.pathname}&login=lab`)
        }
    }

    // static loadData(store, match) {
    //     return Promise.all([store.dispatch(getLabById(match.params.id)), store.dispatch(getUserProfile())])
    // }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {

            let testIds = this.props.lab_test_data[this.props.match.params.id] || []
            testIds = testIds.map(x => x.id)

            this.props.getLabById(this.props.match.params.id, testIds)
            this.props.getUserProfile()
            this.props.getUserAddress()
        }
    }

    render() {

        return (
            <BookingSummaryView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedCriterias,
        lab_test_data
    } = state.SEARCH_CRITERIA_LABS
    const { selectedProfile, profiles, address } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType, selectedAddress } = state.LAB_SEARCH

    return {
        selectedCriterias,
        lab_test_data,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType, address, selectedAddress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        getUserProfile: () => dispatch(getUserProfile()),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        getUserAddress: () => dispatch(getUserAddress()),
        selectPickupAddress: (address) => dispatch(selectPickupAddress(address)),
        createLABAppointment: (postData, callback) => dispatch(createLABAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
