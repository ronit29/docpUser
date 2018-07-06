import React from 'react';
import { connect } from 'react-redux';

import { getLabById, getUserProfile, selectLabAppointmentType, getUserAddress, selectPickupAddress, createLABAppointment } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryView from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=${this.props.location.pathname}`)
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
            let tests = this.props.selectedCriterias.filter(x => x.type == "test").map(x => x.id)
            this.props.getLabById(this.props.match.params.id, tests)
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
    } = state.SEARCH_CRITERIA_LABS
    const { selectedProfile, profiles, address } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType, selectedAddress } = state.LAB_SEARCH

    return {
        selectedCriterias,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType, address, selectedAddress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        getUserAddress: () => dispatch(getUserAddress()),
        selectPickupAddress: (address) => dispatch(selectPickupAddress(address)),
        createLABAppointment: (postData, callback) => dispatch(createLABAppointment(postData, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
