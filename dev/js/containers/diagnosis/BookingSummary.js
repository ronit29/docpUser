import React from 'react';
import { connect } from 'react-redux';

import { getLabById, getUserProfile, selectLabAppointmentType } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryView from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return Promise.all([store.dispatch(getLabById(match.params.id)), store.dispatch(getUserProfile())])
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getLabById(this.props.match.params.id)
            this.props.getUserProfile()
        } else {
            this.props.history.push('/login')
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
    const { selectedProfile, profiles } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType } = state.LAB_SEARCH

    return {
        selectedCriterias,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        getLabById: (labId) => dispatch(getLabById(labId)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
